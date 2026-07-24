#!/usr/bin/env python3
"""
Normalise the `exam` field across all six files in js/data/.

Three transformations, applied to every entry:
  1. Container shape -> array. The five files that store a "/"-separated string
     (vocab-easy, vocab-medium, vocab-hard, acronyms, oneword) become real JS
     arrays, matching what idioms.js already does.
  2. Granularity -> family. "SSC CGL" collapses into "SSC", "IBPS PO" into
     "Banking", with de-duplication afterwards so "UPSC/SSC CGL" on an entry
     that also carries "SSC" cannot yield ["SSC","SSC","UPSC"].
  3. Order -> alphabetical. Every array is sorted.

idioms.js already uses arrays, so only (2) and (3) can apply there — in practice
just (3), since it carries neither specific-exam token.

Edits are applied as surgical splices over the exact source span of each `exam`
value, so formatting, line endings and field order survive untouched. Only the
value is replaced; the key and every other byte stay as they are.

Safety rails (any failure restores every file and aborts):
  * all six files parse, with the expected entry count each
  * every entry has a non-empty exam field
  * every token is one of the 7 known values; anything else aborts
  * the five string-form files contain no arrays, and idioms.js contains only
    arrays — verified before a single byte is written
  * output is re-parsed and diffed field-by-field against the pre-edit state;
    anything that drifted outside the targeted exam values restores everything
  * post-write: every exam is a sorted, duplicate-free array drawn from the
    5 final tokens, with zero "SSC CGL" / "IBPS PO" remaining

Usage:  py scripts/normalise_exam_field.py
"""

import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "js", "data")

# item_sep preserves each file's existing array style: idioms.js is
# pretty-printed with ", " between elements, the other five are compact.
FILES = [
    {"file": "vocab-easy.js",   "array": "vocabEasy",   "count": 957,  "shape": "string", "item_sep": ","},
    {"file": "vocab-medium.js", "array": "vocabMedium", "count": 1551, "shape": "string", "item_sep": ","},
    {"file": "vocab-hard.js",   "array": "vocabHard",   "count": 1501, "shape": "string", "item_sep": ","},
    {"file": "idioms.js",       "array": "idiomsDB",    "count": 1105, "shape": "array",  "item_sep": ", "},
    {"file": "acronyms.js",     "array": "acronymsDB",  "count": 300,  "shape": "string", "item_sep": ","},
    {"file": "oneword.js",      "array": "oneWordDB",   "count": 500,  "shape": "string", "item_sep": ","},
]

TOTAL_EXPECTED = 5914

KNOWN_TOKENS = {"SSC", "Banking", "UPSC", "Railways", "SSC CGL", "CAT", "IBPS PO"}
COLLAPSE = {"SSC CGL": "SSC", "IBPS PO": "Banking"}
FINAL_TOKENS = {"Banking", "CAT", "Railways", "SSC", "UPSC"}

DELIM = "/"


class ParseError(Exception):
    pass


class Parser:
    """Minimal recursive-descent reader for the JS array-of-objects literal.

    Records the source span of every value so the caller can splice a single
    field without re-serialising (and thus reformatting) the whole file.
    """

    def __init__(self, text, pos):
        self.s = text
        self.i = pos

    def error(self, msg):
        line = self.s.count("\n", 0, self.i) + 1
        raise ParseError("%s at line %d (offset %d)" % (msg, line, self.i))

    def ws(self):
        """Skip whitespace and JS comments.

        vocab-easy / acronyms / oneword carry `//` batch markers between
        entries. This is only ever called outside a string literal, so a `//`
        inside quoted prose is never reached from here.
        """
        while self.i < len(self.s):
            c = self.s[self.i]
            if c in " \t\r\n":
                self.i += 1
            elif self.s.startswith("//", self.i):
                nl = self.s.find("\n", self.i)
                self.i = len(self.s) if nl < 0 else nl + 1
            elif self.s.startswith("/*", self.i):
                close = self.s.find("*/", self.i + 2)
                if close < 0:
                    self.error("unterminated block comment")
                self.i = close + 2
            else:
                return

    def expect(self, ch):
        if self.i >= len(self.s) or self.s[self.i] != ch:
            self.error("expected %r" % ch)
        self.i += 1

    def parse_string(self):
        # vocab-medium.js mixes single- and double-quoted literals (some
        # synonyms/antonyms arrays use '...'). Accept whichever opens the
        # literal and close on the matching quote.
        if self.i >= len(self.s) or self.s[self.i] not in "\"'":
            self.error("expected a string literal")
        quote = self.s[self.i]
        self.i += 1
        out = []
        while True:
            if self.i >= len(self.s):
                self.error("unterminated string")
            c = self.s[self.i]
            if c == quote:
                self.i += 1
                return "".join(out)
            if c == "\\":
                self.i += 1
                if self.i >= len(self.s):
                    self.error("unterminated escape")
                e = self.s[self.i]
                simple = {
                    '"': '"', "\\": "\\", "/": "/", "b": "\b", "f": "\f",
                    "n": "\n", "r": "\r", "t": "\t", "'": "'",
                }
                if e in simple:
                    out.append(simple[e])
                    self.i += 1
                elif e == "u":
                    hexs = self.s[self.i + 1:self.i + 5]
                    if len(hexs) != 4:
                        self.error("bad \\u escape")
                    out.append(chr(int(hexs, 16)))
                    self.i += 5
                else:
                    self.error("unsupported escape \\%s" % e)
                continue
            out.append(c)
            self.i += 1

    def parse_ident(self):
        start = self.i
        while self.i < len(self.s) and (self.s[self.i].isalnum() or self.s[self.i] in "_$"):
            self.i += 1
        if start == self.i:
            self.error("expected identifier")
        return self.s[start:self.i]

    def parse_value(self):
        """Return (value, start, end) where start/end bracket the raw source."""
        self.ws()
        start = self.i
        if self.i >= len(self.s):
            self.error("unexpected end of input")
        c = self.s[self.i]
        if c in "\"'":
            v = self.parse_string()
        elif c == "[":
            v = self.parse_array_values()
        elif c == "{":
            v, _ = self.parse_object()
        elif self.s.startswith("true", self.i):
            v = True
            self.i += 4
        elif self.s.startswith("false", self.i):
            v = False
            self.i += 5
        elif self.s.startswith("null", self.i):
            v = None
            self.i += 4
        elif c == "-" or c.isdigit():
            j = self.i
            while j < len(self.s) and self.s[j] in "-+.eE0123456789":
                j += 1
            raw = self.s[self.i:j]
            v = float(raw) if any(k in raw for k in ".eE") else int(raw)
            self.i = j
        else:
            self.error("unexpected character %r" % c)
        return v, start, self.i

    def parse_array_values(self):
        self.expect("[")
        items = []
        while True:
            self.ws()
            if self.i < len(self.s) and self.s[self.i] == "]":
                self.i += 1
                return items
            v, _, _ = self.parse_value()
            items.append(v)
            self.ws()
            if self.i < len(self.s) and self.s[self.i] == ",":
                self.i += 1
            elif self.i < len(self.s) and self.s[self.i] == "]":
                self.i += 1
                return items
            else:
                self.error("expected ',' or ']' in array")

    def parse_object(self):
        self.expect("{")
        obj = {}
        spans = {}
        while True:
            self.ws()
            if self.i < len(self.s) and self.s[self.i] == "}":
                self.i += 1
                return obj, spans
            key = self.parse_string() if self.s[self.i] in "\"'" else self.parse_ident()
            self.ws()
            self.expect(":")
            val, vstart, vend = self.parse_value()
            if key in obj:
                self.error("duplicate key %r" % key)
            obj[key] = val
            spans[key] = (vstart, vend)
            self.ws()
            if self.i < len(self.s) and self.s[self.i] == ",":
                self.i += 1
            elif self.i < len(self.s) and self.s[self.i] == "}":
                self.i += 1
                return obj, spans
            else:
                self.error("expected ',' or '}' in object")


def parse_entries(text, array_name):
    """Parse `const <array_name> = [ ... ]` -> (entries, spans-per-entry)."""
    marker = text.find(array_name)
    if marker < 0:
        raise ParseError("could not find %r in source" % array_name)
    bracket = text.find("[", marker)
    if bracket < 0:
        raise ParseError("could not find opening '[' of the array")
    p = Parser(text, bracket)
    p.expect("[")
    entries, spans = [], []
    while True:
        p.ws()
        if p.i < len(p.s) and p.s[p.i] == "]":
            p.i += 1
            break
        obj, sp = p.parse_object()
        entries.append(obj)
        spans.append(sp)
        p.ws()
        if p.i < len(p.s) and p.s[p.i] == ",":
            p.i += 1
        elif p.i < len(p.s) and p.s[p.i] == "]":
            p.i += 1
            break
        else:
            p.error("expected ',' or ']' between entries")
    return entries, spans


def read_text(path):
    with open(path, "rb") as fh:
        raw = fh.read()
    if raw.startswith(b"\xef\xbb\xbf"):
        raise SystemExit("ERROR: %s has a UTF-8 BOM; refusing to guess." % path)
    return raw.decode("utf-8"), raw


def label_of(entry, idx):
    for key in ("word", "acronym", "idiom", "phrase"):
        if key in entry:
            return entry[key]
    return "<index %d>" % idx


def tokens_of(value):
    """Split an exam value into raw tokens, whatever container it uses."""
    parts = value if isinstance(value, list) else value.split(DELIM)
    return [t.strip() for t in parts if str(t).strip()]


def normalise(tokens):
    """Collapse to families, de-duplicate, sort."""
    return sorted({COLLAPSE.get(t, t) for t in tokens})


def js_array(tokens, item_sep):
    return "[" + item_sep.join(json.dumps(t, ensure_ascii=False) for t in tokens) + "]"


def main():
    errors = []
    loaded = []

    # ---- read + parse + pre-flight validation, before ANY write -----------
    print("Pre-flight validation")
    for spec in FILES:
        path = os.path.join(DATA, spec["file"])
        text, original_bytes = read_text(path)
        try:
            entries, spans = parse_entries(text, spec["array"])
        except ParseError as exc:
            errors.append("%s: failed to parse: %s" % (spec["file"], exc))
            continue

        if len(entries) != spec["count"]:
            errors.append("%s: expected %d entries, found %d"
                          % (spec["file"], spec["count"], len(entries)))
            continue

        for idx, entry in enumerate(entries):
            lbl = label_of(entry, idx)
            if "exam" not in entry:
                errors.append("%s: %s has no exam field" % (spec["file"], lbl))
                continue
            v = entry["exam"]

            # container shape must match what this file is declared to hold
            if spec["shape"] == "array":
                if not isinstance(v, list):
                    errors.append("%s: %s exam is %s, expected array"
                                  % (spec["file"], lbl, type(v).__name__))
                    continue
            else:
                if not isinstance(v, str):
                    errors.append("%s: %s exam is %s, expected string"
                                  % (spec["file"], lbl, type(v).__name__))
                    continue

            toks = tokens_of(v)
            if not toks:
                errors.append("%s: %s has an empty exam value (%r)" % (spec["file"], lbl, v))
                continue
            for t in toks:
                if t not in KNOWN_TOKENS:
                    errors.append("%s: %s has unknown exam token %r (value %r)"
                                  % (spec["file"], lbl, t, v))
            if "exam" not in spans[idx]:
                errors.append("%s: %s has no source span for exam" % (spec["file"], lbl))

        loaded.append({
            "spec": spec, "path": path, "text": text,
            "original_bytes": original_bytes, "before": entries, "spans": spans,
        })
        print("  %-17s %4d entries, shape=%s  OK" % (spec["file"], len(entries), spec["shape"]))

    if errors:
        print("\nABORTING - %d validation error(s), no file touched:" % len(errors))
        for e in errors[:40]:
            print("  - %s" % e)
        if len(errors) > 40:
            print("  ... and %d more" % (len(errors) - 40))
        return 1

    total = sum(len(x["before"]) for x in loaded)
    if total != TOTAL_EXPECTED:
        print("\nABORTING - total entries %d, expected %d" % (total, TOTAL_EXPECTED))
        return 1
    print("  total: %d entries across %d files" % (total, len(loaded)))

    # ---- before-counts, for the report ------------------------------------
    def token_counts(entry_lists):
        per_file = {}
        for item in entry_lists:
            counts = {}
            for idx, e in enumerate(item["entries"]):
                for t in tokens_of(e["exam"]):
                    counts[t] = counts.get(t, 0) + 1
            per_file[item["file"]] = counts
        return per_file

    before_counts = token_counts(
        [{"file": x["spec"]["file"], "entries": x["before"]} for x in loaded]
    )

    # ---- apply splices, right-to-left so offsets stay valid ---------------
    print("\nApplying")
    for item in loaded:
        spec, text, spans = item["spec"], item["text"], item["spans"]
        targets = []
        for idx, entry in enumerate(item["before"]):
            new_tokens = normalise(tokens_of(entry["exam"]))
            targets.append((idx, new_tokens))

        out = text
        for idx, new_tokens in sorted(targets, key=lambda t: spans[t[0]]["exam"][0], reverse=True):
            start, end = spans[idx]["exam"]
            out = out[:start] + js_array(new_tokens, spec["item_sep"]) + out[end:]

        item["new_text"] = out
        item["targets"] = dict(targets)
        with open(item["path"], "wb") as fh:
            fh.write(out.encode("utf-8"))
        print("  %-17s wrote %d bytes" % (spec["file"], len(out.encode("utf-8"))))

    # ---- verify by re-parsing our own output ------------------------------
    def restore_all(reason, details=()):
        for item in loaded:
            with open(item["path"], "wb") as fh:
                fh.write(item["original_bytes"])
        print("\nABORTING - %s" % reason)
        for line in details:
            print("  %s" % line)
        print("All %d files restored to their original bytes." % len(loaded))

    print("\nVerifying")
    drift = []
    after_lists = []
    for item in loaded:
        spec = item["spec"]
        try:
            after_text, _ = read_text(item["path"])
            after, _ = parse_entries(after_text, spec["array"])
        except (ParseError, SystemExit) as exc:
            restore_all("%s: output failed to re-parse: %s" % (spec["file"], exc))
            return 1

        if len(after) != spec["count"]:
            restore_all("%s: output has %d entries, expected %d"
                        % (spec["file"], len(after), spec["count"]))
            return 1

        for idx, (b, a) in enumerate(zip(item["before"], after)):
            lbl = label_of(b, idx)
            if list(b.keys()) != list(a.keys()):
                drift.append("%s: %s field set/order changed %s -> %s"
                             % (spec["file"], lbl, list(b.keys()), list(a.keys())))
                continue
            for key in b:
                if b[key] == a[key]:
                    continue
                if key == "exam":
                    want = item["targets"][idx]
                    if a[key] != want:
                        drift.append("%s: %s exam is %r but should be %r"
                                     % (spec["file"], lbl, a[key], want))
                    continue
                drift.append("%s: %s field %r drifted %r -> %r"
                             % (spec["file"], lbl, key, b[key], a[key]))

        after_lists.append({"file": spec["file"], "entries": after})

    if drift:
        restore_all("%d unintended change(s) detected" % len(drift), drift[:40])
        return 1

    # every exam is now a sorted, duplicate-free array of final tokens
    shape_errs = []
    for item in after_lists:
        for idx, e in enumerate(item["entries"]):
            v = e.get("exam")
            lbl = label_of(e, idx)
            if not isinstance(v, list):
                shape_errs.append("%s: %s exam is not an array (%r)" % (item["file"], lbl, v))
                continue
            if not v:
                shape_errs.append("%s: %s exam is an empty array" % (item["file"], lbl))
                continue
            if len(v) != len(set(v)):
                shape_errs.append("%s: %s exam has duplicates %r" % (item["file"], lbl, v))
            if list(v) != sorted(v):
                shape_errs.append("%s: %s exam is not sorted %r" % (item["file"], lbl, v))
            for t in v:
                if t not in FINAL_TOKENS:
                    shape_errs.append("%s: %s exam has non-final token %r" % (item["file"], lbl, t))

    if shape_errs:
        restore_all("%d post-write shape error(s)" % len(shape_errs), shape_errs[:40])
        return 1

    after_counts = token_counts(after_lists)

    all_after_tokens = set()
    for counts in after_counts.values():
        all_after_tokens |= set(counts)
    if all_after_tokens != FINAL_TOKENS:
        restore_all("final token set is %s, expected %s"
                    % (sorted(all_after_tokens), sorted(FINAL_TOKENS)))
        return 1

    # ---- report -----------------------------------------------------------
    print("  entry counts unchanged:      " + " / ".join(
        "%s=%d" % (x["spec"]["file"].replace(".js", ""), len(x["before"])) for x in loaded))
    print("  total entries:               %d" % sum(len(x["entries"]) for x in after_lists))
    print("  every exam is an array:      yes")
    print("  all arrays sorted + unique:  yes")
    print("  non-exam fields drifted:     0")
    print("  distinct tokens after:       %d %s" % (len(all_after_tokens), sorted(all_after_tokens)))
    print("  'SSC CGL' remaining:         %d" % sum(c.get("SSC CGL", 0) for c in after_counts.values()))
    print("  'IBPS PO' remaining:         %d" % sum(c.get("IBPS PO", 0) for c in after_counts.values()))

    print("\nPer-file token counts (before -> after)")
    all_tokens = sorted(KNOWN_TOKENS, key=lambda t: (t not in FINAL_TOKENS, t))
    header = "%-17s" % "file" + "".join("%12s" % t for t in all_tokens)
    print(header)
    print("-" * len(header))
    for item in loaded:
        f = item["spec"]["file"]
        b, a = before_counts[f], after_counts[f]
        row = "%-17s" % f
        for t in all_tokens:
            bv, av = b.get(t, 0), a.get(t, 0)
            row += "%12s" % ("%d->%d" % (bv, av) if (bv or av) else "-")
        print(row)
    row = "%-17s" % "TOTAL"
    for t in all_tokens:
        bv = sum(c.get(t, 0) for c in before_counts.values())
        av = sum(c.get(t, 0) for c in after_counts.values())
        row += "%12s" % ("%d->%d" % (bv, av) if (bv or av) else "-")
    print(row)

    return 0


if __name__ == "__main__":
    sys.exit(main())

#!/usr/bin/env python3
"""
Repair the 136 placeholder `usage:"undefined"` fields in js/data/vocab-hard.js.

Reads the replacement strings from scripts/pra-usage-fixes.json and rewrites ONLY
the `usage` value of the matching entries. Every other byte of the file is left
alone: edits are applied as surgical splices over the exact source span of each
`usage` string literal, so formatting, line endings and field order survive.

Safety rails (any failure aborts without leaving a modified file behind):
  * every fix word must match exactly one entry
  * that entry's current usage must be the literal string "undefined"
  * the output is re-parsed and diffed field-by-field against the pre-edit state;
    anything that drifted outside the 136 targeted usage values restores the
    original file
  * the output must still hold exactly 1501 entries

Deliberately NOT touched: the "undefined" inside Amorphous's synonyms array here,
and Term's antonyms array in vocab-easy.js. Both are legitimate vocabulary, not
placeholders.

Usage:  py scripts/fix_pra_usage.py
"""

import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET = os.path.join(ROOT, "js", "data", "vocab-hard.js")
FIXES = os.path.join(ROOT, "scripts", "pra-usage-fixes.json")
ARRAY_NAME = "vocabHard"
EXPECTED_COUNT = 1501
PLACEHOLDER = "undefined"


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
        while self.i < len(self.s) and self.s[self.i] in " \t\r\n":
            self.i += 1

    def expect(self, ch):
        if self.i >= len(self.s) or self.s[self.i] != ch:
            self.error("expected %r" % ch)
        self.i += 1

    def parse_string(self):
        self.expect('"')
        out = []
        while True:
            if self.i >= len(self.s):
                self.error("unterminated string")
            c = self.s[self.i]
            if c == '"':
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
        if c == '"':
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
            key = self.parse_string() if self.s[self.i] == '"' else self.parse_ident()
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


def parse_entries(text):
    """Parse `const <ARRAY_NAME> = [ ... ]` -> (entries, spans-per-entry)."""
    marker = text.find(ARRAY_NAME)
    if marker < 0:
        raise ParseError("could not find %r in source" % ARRAY_NAME)
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


def js_string(value):
    """Serialise a Python str as a JS double-quoted literal."""
    return json.dumps(value, ensure_ascii=False)


def compare(before, after):
    """Field-by-field diff of two entry lists. Returns list of drift records."""
    drift = []
    if len(before) != len(after):
        drift.append(("<count>", "<count>", len(before), len(after)))
        return drift
    for idx, (b, a) in enumerate(zip(before, after)):
        label = b.get("word", "<index %d>" % idx)
        bkeys, akeys = list(b.keys()), list(a.keys())
        if bkeys != akeys:
            drift.append((label, "<field set/order>", bkeys, akeys))
            continue
        for key in bkeys:
            if b[key] != a[key]:
                drift.append((label, key, b[key], a[key]))
    return drift


def main():
    print("Reading %s" % os.path.relpath(TARGET, ROOT))
    text, original_bytes = read_text(TARGET)

    try:
        before, spans = parse_entries(text)
    except ParseError as exc:
        raise SystemExit("ERROR: failed to parse source: %s" % exc)
    print("  parsed %d entries" % len(before))

    if len(before) != EXPECTED_COUNT:
        raise SystemExit(
            "ERROR: expected %d entries, found %d. Aborting."
            % (EXPECTED_COUNT, len(before))
        )

    with open(FIXES, encoding="utf-8") as fh:
        fixes = json.load(fh)
    print("Loaded %d fixes from %s" % (len(fixes), os.path.relpath(FIXES, ROOT)))

    # ---- validation ------------------------------------------------------
    errors = []

    seen = {}
    for fix in fixes:
        if "word" not in fix or "usage" not in fix:
            errors.append("fix entry missing 'word' or 'usage': %r" % fix)
            continue
        if fix["word"] in seen:
            errors.append("duplicate word in fixes file: %r" % fix["word"])
        seen[fix["word"]] = fix["usage"]

    by_word = {}
    for idx, entry in enumerate(before):
        by_word.setdefault(entry.get("word"), []).append(idx)

    targets = []  # (entry_index, word, new_usage)
    for fix in fixes:
        word = fix.get("word")
        if word is None:
            continue
        hits = by_word.get(word, [])
        if not hits:
            errors.append("word not found in vocab-hard.js: %r" % word)
            continue
        if len(hits) > 1:
            errors.append(
                "word matches %d entries (must be exactly 1): %r at indices %s"
                % (len(hits), word, hits)
            )
            continue
        idx = hits[0]
        current = before[idx].get("usage")
        if current != PLACEHOLDER:
            errors.append(
                "usage is not the placeholder for %r: expected %r, found %r"
                % (word, PLACEHOLDER, current)
            )
            continue
        if "usage" not in spans[idx]:
            errors.append("no source span recorded for usage of %r" % word)
            continue
        if not isinstance(fix["usage"], str) or not fix["usage"].strip():
            errors.append("replacement usage is empty or not a string for %r" % word)
            continue
        targets.append((idx, word, fix["usage"]))

    if errors:
        print("\nABORTING - %d validation error(s), file untouched:" % len(errors))
        for err in errors:
            print("  - %s" % err)
        return 1

    placeholders = sum(1 for e in before if e.get("usage") == PLACEHOLDER)
    print("  placeholders in source: %d" % placeholders)
    print("  validated targets:      %d" % len(targets))
    if placeholders != len(targets):
        print(
            "\nABORTING - %d placeholder(s) in source but %d fixes; "
            "refusing a partial repair." % (placeholders, len(targets))
        )
        return 1

    # ---- apply splices, right-to-left so offsets stay valid ---------------
    pieces = text
    for idx, _word, new_usage in sorted(targets, key=lambda t: spans[t[0]]["usage"][0], reverse=True):
        start, end = spans[idx]["usage"]
        pieces = pieces[:start] + js_string(new_usage) + pieces[end:]

    with open(TARGET, "wb") as fh:
        fh.write(pieces.encode("utf-8"))
    print("Wrote %s (%d bytes)" % (os.path.relpath(TARGET, ROOT), len(pieces.encode("utf-8"))))

    # ---- verify by re-parsing our own output -----------------------------
    def restore(reason, details=()):
        with open(TARGET, "wb") as fh:
            fh.write(original_bytes)
        print("\nABORTING - %s" % reason)
        for line in details:
            print("  %s" % line)
        print("Original file restored.")

    try:
        after_text, _ = read_text(TARGET)
        after, _ = parse_entries(after_text)
    except (ParseError, SystemExit) as exc:
        restore("output failed to re-parse: %s" % exc)
        return 1

    if len(after) != EXPECTED_COUNT:
        restore("output has %d entries, expected %d" % (len(after), EXPECTED_COUNT))
        return 1

    expected_usage = {idx: new for idx, _w, new in targets}
    drift = []
    for idx, (b, a) in enumerate(zip(before, after)):
        label = b.get("word", "<index %d>" % idx)
        if list(b.keys()) != list(a.keys()):
            drift.append("%s: field set/order changed %s -> %s" % (label, list(b.keys()), list(a.keys())))
            continue
        for key in b:
            if b[key] == a[key]:
                continue
            if key == "usage" and idx in expected_usage:
                if a[key] != expected_usage[idx]:
                    drift.append(
                        "%s: usage is %r but the fixes file asked for %r"
                        % (label, a[key], expected_usage[idx])
                    )
                continue
            drift.append("%s: field %r drifted %r -> %r" % (label, key, b[key], a[key]))

    changed = sum(
        1 for idx, (b, a) in enumerate(zip(before, after)) if b.get("usage") != a.get("usage")
    )
    if changed != len(targets):
        drift.append("%d usage fields changed, expected exactly %d" % (changed, len(targets)))

    if drift:
        restore("%d unintended change(s) detected" % len(drift), drift[:40])
        return 1

    remaining = [e["word"] for e in after if e.get("usage") == PLACEHOLDER]
    if remaining:
        restore(
            "%d entries still carry the placeholder usage" % len(remaining),
            remaining[:20],
        )
        return 1

    # Amorphous's synonyms array must be untouched.
    amorphous = next((e for e in after if e.get("word") == "Amorphous"), None)
    if amorphous is None or PLACEHOLDER not in amorphous.get("synonyms", []):
        restore("Amorphous's synonyms array lost its legitimate 'undefined' entry")
        return 1

    print("\nVerification passed:")
    print("  entries in output:        %d" % len(after))
    print("  usage fields changed:     %d" % changed)
    print("  other fields changed:     0")
    print("  usage == \"undefined\":     0")
    print("  Amorphous synonyms:       %s (left alone)" % amorphous["synonyms"])
    return 0


if __name__ == "__main__":
    sys.exit(main())

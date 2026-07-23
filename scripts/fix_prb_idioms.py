#!/usr/bin/env python3
"""
Repair js/data/idioms.js: drop 11 duplicate entries, rewrite 94 truncated
meanings and 14 truncated examples.

Same parse-splice-verify approach as fix_pra_usage.py: the file is parsed to
record the exact source span of every entry and every field, edits are applied
as surgical splices over those spans, and the result is re-parsed and diffed
field-by-field against the pre-edit state. Formatting, field order and line
endings survive untouched.

Inputs (scripts/):
  prb-duplicate-plan.json   11 rows, each {normalised, keep, delete, why}
  prb-meaning-fixes.json    94 rows, each {index, idiom, old, meaning}
  prb-example-fixes.json    14 rows, each {index, idiom, old, example}

Resolution order is deletions first, then repairs. Deleting shifts indices, so
the `index` in the fix files is treated as advisory only: every repair target is
resolved by matching the `idiom` field against the entries that SURVIVE the
deletions, and is applied only if the entry's current meaning/example equals the
fix row's `old` value verbatim. Ambiguous, missing or mismatched targets abort
the run before anything is written.

Safety rails (any failure aborts with the file untouched or restored):
  * source must hold exactly 1116 entries
  * all 11 deletion pairs present; keep/delete must be a genuine duplicate pair
  * no repair target may fall on a deleted entry
  * every repair idiom must match exactly one surviving entry
  * every `old` must match the current value verbatim
  * output must re-parse, hold exactly 1105 entries, and show drift ONLY in the
    94 meanings and 14 examples we asked for

Usage:  py scripts/fix_prb_idioms.py
"""

import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET = os.path.join(ROOT, "js", "data", "idioms.js")
SCRIPTS = os.path.join(ROOT, "scripts")
ARRAY_NAME = "idiomsDB"
COUNT_BEFORE = 1116
COUNT_AFTER = 1105


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
    """Parse `const idiomsDB = [ ... ]` -> (entries, field spans, entry spans)."""
    marker = text.find(ARRAY_NAME)
    if marker < 0:
        raise ParseError("could not find %r in source" % ARRAY_NAME)
    bracket = text.find("[", marker)
    if bracket < 0:
        raise ParseError("could not find opening '[' of the array")
    p = Parser(text, bracket)
    p.expect("[")
    entries, spans, extents = [], [], []
    while True:
        p.ws()
        if p.i < len(p.s) and p.s[p.i] == "]":
            p.i += 1
            break
        start = p.i
        obj, sp = p.parse_object()
        entries.append(obj)
        spans.append(sp)
        extents.append((start, p.i))
        p.ws()
        if p.i < len(p.s) and p.s[p.i] == ",":
            p.i += 1
        elif p.i < len(p.s) and p.s[p.i] == "]":
            p.i += 1
            break
        else:
            p.error("expected ',' or ']' between entries")
    return entries, spans, extents


def read_text(path):
    with open(path, "rb") as fh:
        raw = fh.read()
    if raw.startswith(b"\xef\xbb\xbf"):
        raise SystemExit("ERROR: %s has a UTF-8 BOM; refusing to guess." % path)
    return raw.decode("utf-8"), raw


def js_string(value):
    return json.dumps(value, ensure_ascii=False)


def load(name):
    with open(os.path.join(SCRIPTS, name), encoding="utf-8") as fh:
        return json.load(fh)


def norm(s):
    return re.sub(r"\s+", " ", s.strip().lower())


def deletion_span(text, extents, idx):
    """Span covering entry idx plus the one comma that separates it."""
    start, end = extents[idx]
    if idx + 1 < len(extents):
        j = end
        while j < len(text) and text[j] in " \t\r\n":
            j += 1
        if j < len(text) and text[j] == ",":
            j += 1
            # swallow the newline+indent that belonged to this entry
            while j < len(text) and text[j] in " \t":
                j += 1
            if j < len(text) and text[j] == "\n":
                j += 1
            return start, j
        return start, end
    # last entry: reach backwards over the preceding comma instead
    j = start
    while j > 0 and text[j - 1] in " \t\r\n":
        j -= 1
    if j > 0 and text[j - 1] == ",":
        j -= 1
        return j, end
    return start, end


def main():
    rel = os.path.relpath(TARGET, ROOT)
    print("Reading %s" % rel)
    text, original_bytes = read_text(TARGET)

    try:
        before, spans, extents = parse_entries(text)
    except ParseError as exc:
        raise SystemExit("ERROR: failed to parse source: %s" % exc)
    print("  parsed %d entries" % len(before))
    if len(before) != COUNT_BEFORE:
        raise SystemExit("ERROR: expected %d entries, found %d. Aborting."
                         % (COUNT_BEFORE, len(before)))

    plan = load("prb-duplicate-plan.json")
    mfix = load("prb-meaning-fixes.json")
    efix = load("prb-example-fixes.json")
    print("Loaded %d deletions, %d meaning fixes, %d example fixes"
          % (len(plan), len(mfix), len(efix)))

    errors = []

    # ---- pre-flight: deletions ------------------------------------------
    doomed = {}          # original index -> idiom text
    for row in plan:
        for key in ("normalised", "keep", "delete"):
            if key not in row:
                errors.append("deletion row missing %r: %r" % (key, row))
                break
        else:
            k, d = row["keep"], row["delete"]
            for label, i in (("keep", k), ("delete", d)):
                if not isinstance(i, int) or not (0 <= i < len(before)):
                    errors.append("deletion %r: %s index %r out of range"
                                  % (row["normalised"], label, i))
            if k == d:
                errors.append("deletion %r: keep and delete are the same index %d"
                              % (row["normalised"], k))
            elif all(isinstance(i, int) and 0 <= i < len(before) for i in (k, d)):
                nk, nd = norm(before[k]["idiom"]), norm(before[d]["idiom"])
                if nk != nd:
                    errors.append("deletion %r: keep[%d]=%r and delete[%d]=%r are not "
                                  "the same idiom" % (row["normalised"], k,
                                                      before[k]["idiom"], d, before[d]["idiom"]))
                elif nk != norm(row["normalised"]):
                    errors.append("deletion %r: pair normalises to %r, not the stated value"
                                  % (row["normalised"], nk))
                elif d in doomed:
                    errors.append("index %d listed for deletion more than once" % d)
                else:
                    doomed[d] = before[d]["idiom"]

    survivors = [i for i in range(len(before)) if i not in doomed]

    # ---- pre-flight: repairs, resolved against the SURVIVING entries -----
    by_idiom = {}
    for i in survivors:
        by_idiom.setdefault(before[i]["idiom"], []).append(i)

    def resolve(rows, field, newkey, label):
        out = []
        seen = set()
        for row in rows:
            for key in ("idiom", "old", newkey):
                if key not in row:
                    errors.append("%s row missing %r: %r" % (label, key, row))
                    break
            else:
                idiom = row["idiom"]
                if row.get("index") in doomed:
                    errors.append("%s %r targets index %d, which is queued for deletion"
                                  % (label, idiom, row["index"]))
                    continue
                hits = by_idiom.get(idiom, [])
                if not hits:
                    errors.append("%s idiom not found among survivors: %r" % (label, idiom))
                    continue
                if len(hits) > 1:
                    errors.append("%s idiom %r is ambiguous - matches %d surviving entries %s"
                                  % (label, idiom, len(hits), hits))
                    continue
                idx = hits[0]
                if idx in seen:
                    errors.append("%s targets entry %d twice (%r)" % (label, idx, idiom))
                    continue
                current = before[idx].get(field)
                if current != row["old"]:
                    errors.append("%s %r: current %s does not match 'old'\n"
                                  "        current: %r\n"
                                  "        old:     %r" % (label, idiom, field, current, row["old"]))
                    continue
                if not isinstance(row[newkey], str) or not row[newkey].strip():
                    errors.append("%s %r: replacement is empty or not a string" % (label, idiom))
                    continue
                if field not in spans[idx]:
                    errors.append("%s %r: no source span for %s" % (label, idiom, field))
                    continue
                seen.add(idx)
                out.append((idx, idiom, row[newkey]))
        return out

    mtargets = resolve(mfix, "meaning", "meaning", "meaning fix")
    etargets = resolve(efix, "example", "example", "example fix")

    if errors:
        print("\nABORTING - %d validation error(s), file untouched:" % len(errors))
        for err in errors[:40]:
            print("  - %s" % err)
        if len(errors) > 40:
            print("  ... and %d more" % (len(errors) - 40))
        return 1

    print("\nPre-flight passed:")
    print("  deletions resolved:    %d" % len(doomed))
    print("  meaning fixes resolved: %d" % len(mtargets))
    print("  example fixes resolved: %d" % len(etargets))
    print("  fix/deletion overlap:   0")

    # ---- apply ----------------------------------------------------------
    # Every span comes from the same original parse, and deletions are disjoint
    # from repair targets, so a single right-to-left pass keeps all offsets valid.
    edits = []
    for idx, _idiom, new in mtargets:
        s, e = spans[idx]["meaning"]
        edits.append((s, e, js_string(new)))
    for idx, _idiom, new in etargets:
        s, e = spans[idx]["example"]
        edits.append((s, e, js_string(new)))
    for idx in doomed:
        s, e = deletion_span(text, extents, idx)
        edits.append((s, e, ""))

    edits.sort(key=lambda t: t[0], reverse=True)
    for a, b in zip(edits, edits[1:]):
        if b[1] > a[0]:
            raise SystemExit("ERROR: overlapping edit spans %r / %r. Aborting." % (b, a))

    out = text
    for s, e, repl in edits:
        out = out[:s] + repl + out[e:]

    with open(TARGET, "wb") as fh:
        fh.write(out.encode("utf-8"))
    print("\nWrote %s (%d bytes, was %d)"
          % (rel, len(out.encode("utf-8")), len(original_bytes)))

    # ---- verify against HEAD state --------------------------------------
    def restore(reason, details=()):
        with open(TARGET, "wb") as fh:
            fh.write(original_bytes)
        print("\nABORTING - %s" % reason)
        for line in details:
            print("  %s" % line)
        print("Original file restored.")

    try:
        after_text, _ = read_text(TARGET)
        after, _, _ = parse_entries(after_text)
    except (ParseError, SystemExit) as exc:
        restore("output failed to re-parse: %s" % exc)
        return 1

    if len(after) != COUNT_AFTER:
        restore("output has %d entries, expected %d" % (len(after), COUNT_AFTER))
        return 1

    kept = [before[i] for i in survivors]
    if len(kept) != len(after):
        restore("survivor count %d != output count %d" % (len(kept), len(after)))
        return 1

    want_meaning = {idx: new for idx, _i, new in mtargets}
    want_example = {idx: new for idx, _i, new in etargets}
    drift, changed_m, changed_e = [], 0, 0

    for pos, orig_idx in enumerate(survivors):
        b, a = before[orig_idx], after[pos]
        if list(b.keys()) != list(a.keys()):
            drift.append("%r: field set/order changed %s -> %s"
                         % (b.get("idiom"), list(b.keys()), list(a.keys())))
            continue
        for key in b:
            if b[key] == a[key]:
                continue
            if key == "meaning" and orig_idx in want_meaning:
                if a[key] != want_meaning[orig_idx]:
                    drift.append("%r: meaning is %r but the fix file asked for %r"
                                 % (b["idiom"], a[key], want_meaning[orig_idx]))
                else:
                    changed_m += 1
                continue
            if key == "example" and orig_idx in want_example:
                if a[key] != want_example[orig_idx]:
                    drift.append("%r: example is %r but the fix file asked for %r"
                                 % (b["idiom"], a[key], want_example[orig_idx]))
                else:
                    changed_e += 1
                continue
            drift.append("%r: field %r drifted %r -> %r" % (b.get("idiom"), key, b[key], a[key]))

    if changed_m != len(mtargets):
        drift.append("%d meanings changed, expected exactly %d" % (changed_m, len(mtargets)))
    if changed_e != len(etargets):
        drift.append("%d examples changed, expected exactly %d" % (changed_e, len(etargets)))

    removed_idioms = sorted(doomed.values(), key=str.lower)
    planned = sorted((before[r["delete"]]["idiom"] for r in plan), key=str.lower)
    if removed_idioms != planned:
        drift.append("removed set %r does not match the plan %r" % (removed_idioms, planned))
    if len(before) - len(after) != len(plan):
        drift.append("removed %d entries, expected %d" % (len(before) - len(after), len(plan)))

    stragglers = [(i, e["idiom"], e["meaning"]) for i, e in enumerate(after)
                  if re.search(r"[:\-–—]$", e["meaning"].strip())]
    if stragglers:
        drift.append("%d meaning(s) still end in ':' or '-'" % len(stragglers))
        for i, idiom, mean in stragglers[:10]:
            drift.append("    [%d] %r -> %r" % (i, idiom, mean))

    if drift:
        restore("%d unintended change(s) detected" % len(drift), drift[:40])
        return 1

    print("\nVerification passed (field-by-field against HEAD):")
    print("  entries in output:          %d" % len(after))
    print("  entries removed:            %d" % (len(before) - len(after)))
    print("  meanings changed:           %d" % changed_m)
    print("  examples changed:           %d" % changed_e)
    print("  other fields drifted:       0")
    print("  meanings ending in ':'/'-': 0")
    print("\n  removed entries:")
    for row in plan:
        print("    [%d] %-34s (kept [%d])"
              % (row["delete"], before[row["delete"]]["idiom"], row["keep"]))
    return 0


if __name__ == "__main__":
    sys.exit(main())

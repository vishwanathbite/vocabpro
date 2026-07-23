#!/usr/bin/env python3
"""
Remove cross-file duplicate headwords from vocab-easy.js and vocab-medium.js.

201 headwords appear in two difficulty files with contradictory `difficulty`
tags (43 in easy+hard, 158 in medium+hard). The vocab-hard.js entry is a
semantic superset in every case and is never boilerplate, so it is kept and the
easy/medium copy is deleted. vocab-hard.js is NEVER opened for writing.

Same parse-splice-verify approach as fix_pra_usage.py and fix_prb_idioms.py: the
files are parsed to record the exact source span of every entry, deletions are
spliced over those spans right-to-left so offsets stay valid, and the result is
re-parsed and diffed field-by-field against the pre-edit state. Formatting,
field order, comments and line endings survive untouched.

Input: scripts/prc-cross-file-duplicates.json

Safety rails (any failure aborts with the files untouched or restored):
  * source counts must be easy=1000, medium=1709, hard=1501
  * all 201 headwords present in both their stated files
  * each headword appears exactly once per file (abort on ambiguity)
  * every deletion target's difficulty is 'easy' or 'medium', never 'hard'
  * the entry being deleted matches the extraction file verbatim on all ten fields
  * output must re-parse to 957 / 1551 / 1501 with zero drift on survivors,
    zero cross-file duplicates and zero within-file duplicates
  * vocab-hard.js must be byte-identical afterwards

Usage:  py scripts/fix_prc_duplicates.py
"""

import json
import os
import sys
from collections import Counter, OrderedDict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "js", "data")
FIXES = os.path.join(ROOT, "scripts", "prc-cross-file-duplicates.json")

ARRAYS = OrderedDict([
    ("vocab-easy.js", "vocabEasy"),
    ("vocab-medium.js", "vocabMedium"),
    ("vocab-hard.js", "vocabHard"),
])
COUNT_BEFORE = {"vocab-easy.js": 1000, "vocab-medium.js": 1709, "vocab-hard.js": 1501}
COUNT_AFTER = {"vocab-easy.js": 957, "vocab-medium.js": 1551, "vocab-hard.js": 1501}
FIELDS = ("word", "definition", "pronunciation", "synonyms", "antonyms",
          "example", "mnemonic", "usage", "exam", "difficulty")
KEEP_FILE = "vocab-hard.js"


class ParseError(Exception):
    pass


class Parser:
    """Minimal recursive-descent reader for the JS array-of-objects literal.

    Records the source span of every entry so the caller can splice whole
    entries out without re-serialising (and thus reformatting) the file.
    """

    def __init__(self, text, pos):
        self.s = text
        self.i = pos

    def error(self, msg):
        line = self.s.count("\n", 0, self.i) + 1
        raise ParseError("%s at line %d (offset %d)" % (msg, line, self.i))

    def ws(self):
        """Skip whitespace and // or /* */ comments (the batch files carry both)."""
        while self.i < len(self.s):
            c = self.s[self.i]
            if c in " \t\r\n":
                self.i += 1
            elif self.s.startswith("//", self.i):
                nl = self.s.find("\n", self.i)
                self.i = len(self.s) if nl < 0 else nl + 1
            elif self.s.startswith("/*", self.i):
                end = self.s.find("*/", self.i + 2)
                if end < 0:
                    self.error("unterminated block comment")
                self.i = end + 2
            else:
                return

    def expect(self, ch):
        if self.i >= len(self.s) or self.s[self.i] != ch:
            self.error("expected %r" % ch)
        self.i += 1

    def parse_string(self):
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
                e = self.s[self.i]
                simple = {'"': '"', "'": "'", "\\": "\\", "/": "/", "b": "\b",
                          "f": "\f", "n": "\n", "r": "\r", "t": "\t"}
                if e in simple:
                    out.append(simple[e])
                    self.i += 1
                elif e == "u":
                    out.append(chr(int(self.s[self.i + 1:self.i + 5], 16)))
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
        self.ws()
        c = self.s[self.i]
        if c in "\"'":
            return self.parse_string()
        if c == "[":
            return self.parse_array()
        if c == "{":
            return self.parse_object()
        if self.s.startswith("true", self.i):
            self.i += 4
            return True
        if self.s.startswith("false", self.i):
            self.i += 5
            return False
        if self.s.startswith("null", self.i):
            self.i += 4
            return None
        if self.s.startswith("undefined", self.i):
            self.i += 9
            return "undefined"
        if c == "-" or c.isdigit():
            j = self.i
            while j < len(self.s) and self.s[j] in "-+.eE0123456789":
                j += 1
            raw = self.s[self.i:j]
            self.i = j
            return float(raw) if any(k in raw for k in ".eE") else int(raw)
        self.error("unexpected character %r" % c)

    def parse_array(self):
        self.expect("[")
        items = []
        while True:
            self.ws()
            if self.s[self.i] == "]":
                self.i += 1
                return items
            items.append(self.parse_value())
            self.ws()
            if self.s[self.i] == ",":
                self.i += 1
            elif self.s[self.i] == "]":
                self.i += 1
                return items
            else:
                self.error("expected ',' or ']' in array")

    def parse_object(self):
        self.expect("{")
        obj = {}
        while True:
            self.ws()
            if self.s[self.i] == "}":
                self.i += 1
                return obj
            key = self.parse_string() if self.s[self.i] in "\"'" else self.parse_ident()
            self.ws()
            self.expect(":")
            obj[key] = self.parse_value()
            self.ws()
            if self.s[self.i] == ",":
                self.i += 1
            elif self.s[self.i] == "}":
                self.i += 1
                return obj
            else:
                self.error("expected ',' or '}' in object")


def parse_entries(text, array_name):
    """Parse `const <array_name> = [ ... ]` -> (entries, entry spans)."""
    marker = text.find(array_name)
    if marker < 0:
        raise ParseError("could not find %r in source" % array_name)
    bracket = text.find("[", marker)
    if bracket < 0:
        raise ParseError("could not find opening '[' of the array")
    p = Parser(text, bracket)
    p.expect("[")
    entries, extents = [], []
    while True:
        p.ws()
        if p.i < len(p.s) and p.s[p.i] == "]":
            p.i += 1
            break
        start = p.i
        entries.append(p.parse_object())
        extents.append((start, p.i))
        p.ws()
        if p.i < len(p.s) and p.s[p.i] == ",":
            p.i += 1
        elif p.i < len(p.s) and p.s[p.i] == "]":
            p.i += 1
            break
        else:
            p.error("expected ',' or ']' between entries")
    return entries, extents


def read_bytes(path):
    with open(path, "rb") as fh:
        raw = fh.read()
    if raw.startswith(b"\xef\xbb\xbf"):
        raise SystemExit("ERROR: %s has a UTF-8 BOM; refusing to guess." % path)
    return raw


def deletion_span(text, extents, idx):
    """Span covering entry idx plus the one comma that separates it."""
    start, end = extents[idx]
    if idx + 1 < len(extents):
        j = end
        while j < len(text) and text[j] in " \t\r\n":
            j += 1
        if j < len(text) and text[j] == ",":
            j += 1
            while j < len(text) and text[j] in " \t":
                j += 1
            if j < len(text) and text[j] == "\n":
                j += 1
            return start, j
        return start, end
    j = start
    while j > 0 and text[j - 1] in " \t\r\n":
        j -= 1
    if j > 0 and text[j - 1] == ",":
        j -= 1
        return j, end
    return start, end


def key(word):
    return str(word).strip().lower()


def main():
    # ---- read + parse ----------------------------------------------------
    raw, text, before, extents = {}, {}, {}, {}
    for fname, arr in ARRAYS.items():
        path = os.path.join(DATA, fname)
        raw[fname] = read_bytes(path)
        text[fname] = raw[fname].decode("utf-8")
        try:
            before[fname], extents[fname] = parse_entries(text[fname], arr)
        except ParseError as exc:
            raise SystemExit("ERROR: failed to parse %s: %s" % (fname, exc))
        print("%-16s parsed %d entries" % (fname, len(before[fname])))
        if len(before[fname]) != COUNT_BEFORE[fname]:
            raise SystemExit("ERROR: %s expected %d entries, found %d. Aborting."
                             % (fname, COUNT_BEFORE[fname], len(before[fname])))

    with open(FIXES, encoding="utf-8") as fh:
        groups = json.load(fh)
    print("Loaded %d duplicate groups from %s"
          % (len(groups), os.path.relpath(FIXES, ROOT)))

    # index each file by lowercased headword
    index = {}
    for fname, entries in before.items():
        by_word = {}
        for i, e in enumerate(entries):
            by_word.setdefault(key(e.get("word")), []).append(i)
        index[fname] = by_word

    # ---- pre-flight ------------------------------------------------------
    errors = []
    doomed = {f: {} for f in ARRAYS}   # file -> {entry index: word}

    for g in groups:
        word = g.get("word")
        rows = g.get("entries") or []
        if len(rows) != 2:
            errors.append("%r: expected 2 entries, found %d" % (word, len(rows)))
            continue
        files = [r.get("file") for r in rows]
        if KEEP_FILE not in files:
            errors.append("%r: neither entry is in %s (files=%s)" % (word, KEEP_FILE, files))
            continue
        keep_row = next(r for r in rows if r["file"] == KEEP_FILE)
        drop_row = next(r for r in rows if r["file"] != KEEP_FILE)
        dfile = drop_row["file"]
        if dfile not in ARRAYS:
            errors.append("%r: unknown file %r" % (word, dfile))
            continue

        k = key(word)
        # present in both stated files, exactly once each
        for label, row in (("keep", keep_row), ("drop", drop_row)):
            hits = index[row["file"]].get(k, [])
            if not hits:
                errors.append("%r: not found in %s (%s side)" % (word, row["file"], label))
            elif len(hits) > 1:
                errors.append("%r: ambiguous in %s - %d occurrences at %s"
                              % (word, row["file"], len(hits), hits))
        if errors and errors[-1].startswith("%r:" % word):
            continue
        dhits = index[dfile].get(k, [])
        khits = index[KEEP_FILE].get(k, [])
        if len(dhits) != 1 or len(khits) != 1:
            continue
        didx, kidx = dhits[0], khits[0]

        # the entry we keep must genuinely be the hard one
        if before[KEEP_FILE][kidx].get("difficulty") != "hard":
            errors.append("%r: kept entry difficulty is %r, expected 'hard'"
                          % (word, before[KEEP_FILE][kidx].get("difficulty")))
            continue
        # never delete a hard entry
        ddiff = before[dfile][didx].get("difficulty")
        if ddiff not in ("easy", "medium"):
            errors.append("%r: deletion target difficulty is %r, must be easy or medium"
                          % (word, ddiff))
            continue
        # verbatim match against the extraction file, all ten fields
        live = before[dfile][didx]
        for f in FIELDS:
            if live.get(f) != drop_row.get(f):
                errors.append("%r in %s: field %r does not match the extraction file\n"
                              "        live:      %r\n"
                              "        extracted: %r"
                              % (word, dfile, f, live.get(f), drop_row.get(f)))
        # the recorded index should still line up; advisory but worth asserting
        if drop_row.get("index") != didx:
            errors.append("%r in %s: extraction index %r != live index %d"
                          % (word, dfile, drop_row.get("index"), didx))
        if didx in doomed[dfile]:
            errors.append("%s[%d] queued for deletion twice" % (dfile, didx))
            continue
        doomed[dfile][didx] = live.get("word")

    if errors:
        print("\nABORTING - %d validation error(s), files untouched:" % len(errors))
        for err in errors[:40]:
            print("  - %s" % err)
        if len(errors) > 40:
            print("  ... and %d more" % (len(errors) - 40))
        return 1

    if doomed[KEEP_FILE]:
        print("\nABORTING - %d deletion(s) targeted at %s, which must not be modified."
              % (len(doomed[KEEP_FILE]), KEEP_FILE))
        return 1

    print("\nPre-flight passed:")
    for fname in ARRAYS:
        print("  %-16s %4d deletion(s)" % (fname, len(doomed[fname])))
    print("  headwords resolved:   %d" % sum(len(d) for d in doomed.values()))
    print("  hard entries touched: 0")

    # ---- apply, right-to-left within each file ---------------------------
    for fname in ARRAYS:
        if not doomed[fname]:
            continue
        out = text[fname]
        for idx in sorted(doomed[fname], reverse=True):
            s, e = deletion_span(text[fname], extents[fname], idx)
            out = out[:s] + out[e:]
        with open(os.path.join(DATA, fname), "wb") as fh:
            fh.write(out.encode("utf-8"))
        print("Wrote %-16s (%d bytes, was %d)"
              % (fname, len(out.encode("utf-8")), len(raw[fname])))

    # ---- verify ----------------------------------------------------------
    def restore(reason, details=()):
        for fname in ARRAYS:
            with open(os.path.join(DATA, fname), "wb") as fh:
                fh.write(raw[fname])
        print("\nABORTING - %s" % reason)
        for line in details:
            print("  %s" % line)
        print("All original files restored.")

    after = {}
    drift = []
    for fname, arr in ARRAYS.items():
        path = os.path.join(DATA, fname)
        try:
            after[fname], _ = parse_entries(read_bytes(path).decode("utf-8"), arr)
        except (ParseError, SystemExit) as exc:
            restore("%s failed to re-parse: %s" % (fname, exc))
            return 1
        if len(after[fname]) != COUNT_AFTER[fname]:
            restore("%s has %d entries, expected %d"
                    % (fname, len(after[fname]), COUNT_AFTER[fname]))
            return 1

    # vocab-hard.js must be byte-identical
    if read_bytes(os.path.join(DATA, KEEP_FILE)) != raw[KEEP_FILE]:
        restore("%s changed on disk; it must be byte-identical" % KEEP_FILE)
        return 1

    # survivors must be untouched, field by field
    for fname in ARRAYS:
        survivors = [i for i in range(len(before[fname])) if i not in doomed[fname]]
        if len(survivors) != len(after[fname]):
            drift.append("%s: %d survivors but %d entries in output"
                         % (fname, len(survivors), len(after[fname])))
            continue
        for pos, orig in enumerate(survivors):
            b, a = before[fname][orig], after[fname][pos]
            if list(b.keys()) != list(a.keys()):
                drift.append("%s %r: field set/order changed" % (fname, b.get("word")))
                continue
            for f in b:
                if b[f] != a[f]:
                    drift.append("%s %r: field %r drifted %r -> %r"
                                 % (fname, b.get("word"), f, b[f], a[f]))

    # no cross-file duplicates left, no within-file duplicates
    sets = {f: [key(e.get("word")) for e in after[f]] for f in ARRAYS}
    for fname, words in sets.items():
        dupes = [w for w, c in Counter(words).items() if c > 1]
        if dupes:
            drift.append("%s: %d within-file duplicate headword(s): %s"
                         % (fname, len(dupes), dupes[:10]))
    names = list(ARRAYS)
    overlaps = {}
    for i in range(len(names)):
        for j in range(i + 1, len(names)):
            a, b = names[i], names[j]
            common = set(sets[a]) & set(sets[b])
            overlaps["%s n %s" % (a, b)] = len(common)
            if common:
                drift.append("%s n %s still share %d headword(s): %s"
                             % (a, b, len(common), sorted(common)[:10]))

    removed_total = sum(len(d) for d in doomed.values())
    if removed_total != len(groups):
        drift.append("removed %d entries, expected %d" % (removed_total, len(groups)))

    if drift:
        restore("%d unintended change(s) detected" % len(drift), drift[:40])
        return 1

    print("\nVerification passed (field-by-field against HEAD):")
    for fname in ARRAYS:
        print("  %-16s %4d -> %4d  (%d removed)"
              % (fname, len(before[fname]), len(after[fname]), len(doomed[fname])))
    print("  %s byte-identical: yes" % KEEP_FILE)
    print("  fields drifted on survivors: 0")
    print("  within-file duplicates:      0")
    for k, v in overlaps.items():
        print("  %-34s %d" % (k, v))
    total_before = sum(len(before[f]) for f in ARRAYS)
    total_after = sum(len(after[f]) for f in ARRAYS)
    print("  vocab total: %d -> %d (-%d)" % (total_before, total_after, total_before - total_after))
    return 0


if __name__ == "__main__":
    sys.exit(main())

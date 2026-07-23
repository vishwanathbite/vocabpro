#!/usr/bin/env python3
"""
Read-only extraction of headwords that appear in more than one difficulty file.

Reads  js/data/vocab-easy.js, vocab-medium.js, vocab-hard.js   (never written)
Writes scripts/prc-cross-file-duplicates.json

Headwords are matched case-insensitively on `word`. Every pair is emitted with
both full entries side by side, all ten fields verbatim, so the divergences can
be read off directly.

Also prints the summary statistics needed to choose a merge rule: how often the
definitions agree, per-field divergence counts, boilerplate-vs-bespoke `usage`,
and a completeness comparison.

USAGE (from repo root):  py scripts/extract_cross_file_duplicates.py
"""

import json
import os
import re
import sys
from collections import Counter, OrderedDict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS = os.path.join(ROOT, "scripts")
OUT = os.path.join(SCRIPTS, "prc-cross-file-duplicates.json")

FILES = OrderedDict([
    ("vocab-easy.js", "vocabEasy"),
    ("vocab-medium.js", "vocabMedium"),
    ("vocab-hard.js", "vocabHard"),
])
FIELDS = ("word", "definition", "pronunciation", "synonyms", "antonyms",
          "example", "mnemonic", "usage", "exam", "difficulty")
COMPARE = ("definition", "pronunciation", "synonyms", "antonyms",
           "example", "mnemonic", "usage", "exam")
BOILERPLATE = "competitive exam vocabulary"


class ParseError(Exception):
    pass


class Parser:
    """Minimal recursive-descent reader for the JS array-of-objects literal."""

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


def parse_file(path, array_name):
    with open(path, "rb") as fh:
        text = fh.read().decode("utf-8")
    marker = text.find(array_name)
    if marker < 0:
        raise ParseError("could not find %r in %s" % (array_name, path))
    p = Parser(text, text.find("[", marker))
    p.expect("[")
    entries = []
    while True:
        p.ws()
        if p.s[p.i] == "]":
            break
        entries.append(p.parse_object())
        p.ws()
        if p.s[p.i] == ",":
            p.i += 1
        elif p.s[p.i] == "]":
            break
        else:
            p.error("expected ',' or ']' between entries")
    return entries


def norm_list(v):
    """Compare list fields order-insensitively but case/space-normalised."""
    if isinstance(v, list):
        return tuple(sorted(re.sub(r"\s+", " ", str(x).strip().lower()) for x in v))
    return re.sub(r"\s+", " ", str(v).strip().lower())


def completeness(e):
    """Crude richness score: filled fields, plus depth of the freetext ones."""
    score = 0
    for f in COMPARE:
        v = e.get(f)
        if v is None or v == "" or v == [] or str(v).strip().lower() == "undefined":
            continue
        score += 1
    score += len(e.get("synonyms") or [])
    score += len(e.get("antonyms") or [])
    if str(e.get("usage", "")).strip().lower() != BOILERPLATE:
        score += 2
    score += min(len(str(e.get("definition", ""))) // 40, 3)
    score += min(len(str(e.get("mnemonic", ""))) // 40, 2)
    return score


def main():
    data, missing_fields = {}, []
    for fname, arr in FILES.items():
        path = os.path.join(ROOT, "js", "data", fname)
        entries = parse_file(path, arr)
        data[fname] = entries
        print("%-16s %d entries" % (fname, len(entries)))
        for i, e in enumerate(entries):
            extra = set(e) - set(FIELDS)
            absent = set(FIELDS) - set(e)
            if extra or absent:
                missing_fields.append((fname, i, e.get("word"), sorted(absent), sorted(extra)))

    if missing_fields:
        print("\nWARNING: %d entries do not carry exactly the ten expected fields:"
              % len(missing_fields))
        for f, i, w, absent, extra in missing_fields[:10]:
            print("  %s[%d] %r missing=%s extra=%s" % (f, i, w, absent, extra))

    # index by lowercased headword
    index = {}
    intra = []
    for fname, entries in data.items():
        seen = {}
        for i, e in enumerate(entries):
            key = str(e.get("word", "")).strip().lower()
            if key in seen:
                intra.append((fname, key, seen[key], i))
            else:
                seen[key] = i
            index.setdefault(key, []).append((fname, i, e))

    names = list(FILES)
    def pair_set(a, b):
        return {k for k, v in index.items()
                if any(f == a for f, _, _ in v) and any(f == b for f, _, _ in v)}

    eh = pair_set("vocab-easy.js", "vocab-hard.js")
    mh = pair_set("vocab-medium.js", "vocab-hard.js")
    em = pair_set("vocab-easy.js", "vocab-medium.js")

    print("\nintersections (case-insensitive on `word`):")
    print("  easy   n hard  : %d" % len(eh))
    print("  medium n hard  : %d" % len(mh))
    print("  easy   n medium: %d" % len(em))
    print("  total          : %d" % (len(eh) + len(mh) + len(em)))
    if em:
        print("  easy n medium members:", sorted(em)[:20])
    if intra:
        print("\nWARNING: %d within-file duplicate headword(s):" % len(intra))
        for f, k, a, b in intra[:10]:
            print("  %s: %r at %d and %d" % (f, k, a, b))

    # ---- build the output ------------------------------------------------
    out, case_only = [], []
    for key in sorted(eh | mh | em):
        occ = index[key]
        if len(occ) < 2:
            continue
        files = [f for f, _, _ in occ]
        if "vocab-easy.js" in files and "vocab-hard.js" in files:
            label = "easy+hard"
        elif "vocab-medium.js" in files and "vocab-hard.js" in files:
            label = "medium+hard"
        else:
            label = "easy+medium"
        occ = sorted(occ, key=lambda t: names.index(t[0]))
        surfaces = {str(e.get("word")) for _, _, e in occ}
        if len(surfaces) > 1:
            case_only.append((key, sorted(surfaces)))
        rows = []
        for fname, i, e in occ:
            row = OrderedDict([("file", fname), ("index", i)])
            for f in FIELDS:
                row[f] = e.get(f)
            rows.append(row)
        out.append(OrderedDict([
            ("word", occ[0][2].get("word")),
            ("pair", label),
            ("entries", rows),
        ]))

    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=2)
        fh.write("\n")
    print("\nWrote %s (%d groups)" % (os.path.relpath(OUT, ROOT), len(out)))

    # ---- summary statistics ---------------------------------------------
    pairs = [g for g in out if len(g["entries"]) == 2]
    if len(pairs) != len(out):
        print("NOTE: %d group(s) have more than 2 entries; stats below cover the %d true pairs."
              % (len(out) - len(pairs), len(pairs)))

    same_def = sum(1 for g in pairs
                   if norm_list(g["entries"][0]["definition"]) == norm_list(g["entries"][1]["definition"]))
    exact_def = sum(1 for g in pairs
                    if g["entries"][0]["definition"] == g["entries"][1]["definition"])
    field_diff = Counter()
    for g in pairs:
        a, b = g["entries"]
        for f in COMPARE:
            if norm_list(a[f]) != norm_list(b[f]):
                field_diff[f] += 1

    boiler_split, boiler_both, boiler_neither = [], 0, 0
    for g in pairs:
        a, b = g["entries"]
        ab = str(a["usage"]).strip().lower() == BOILERPLATE
        bb = str(b["usage"]).strip().lower() == BOILERPLATE
        if ab and bb:
            boiler_both += 1
        elif ab or bb:
            boiler_split.append(g)
        else:
            boiler_neither += 1

    richer = {"first": [], "second": [], "tie": 0}
    for g in pairs:
        a, b = g["entries"]
        sa, sb = completeness(a), completeness(b)
        if sa > sb + 2:
            richer["first"].append((g["word"], a["file"], sa, sb))
        elif sb > sa + 2:
            richer["second"].append((g["word"], b["file"], sb, sa))
        else:
            richer["tie"] += 1

    print("\n" + "=" * 62)
    print("SUMMARY  (%d pairs)" % len(pairs))
    print("=" * 62)
    print("definitions identical (normalised): %4d  (%.1f%%)"
          % (same_def, 100.0 * same_def / len(pairs)))
    print("definitions identical (verbatim):   %4d" % exact_def)
    print("definitions different:              %4d  (%.1f%%)"
          % (len(pairs) - same_def, 100.0 * (len(pairs) - same_def) / len(pairs)))
    print("\nper-field divergence:")
    for f in COMPARE:
        n = field_diff[f]
        print("  %-14s %4d  (%5.1f%%)  %s" % (f, n, 100.0 * n / len(pairs),
                                              "#" * int(round(40.0 * n / len(pairs)))))
    print("\nusage boilerplate (%r):" % BOILERPLATE)
    print("  one boilerplate / one bespoke:    %4d" % len(boiler_split))
    print("  both boilerplate:                 %4d" % boiler_both)
    print("  neither boilerplate:              %4d" % boiler_neither)
    print("\ncompleteness (score gap > 2):")
    print("  first entry clearly richer:       %4d" % len(richer["first"]))
    print("  second entry clearly richer:      %4d" % len(richer["second"]))
    print("  comparable:                       %4d" % richer["tie"])
    by_file = Counter()
    for w, f, hi, lo in richer["first"] + richer["second"]:
        by_file[f] += 1
    if by_file:
        print("  richer side by file:", dict(by_file))
    print("\ncase-only surface differences: %d" % len(case_only))
    for k, s in case_only[:25]:
        print("    %s" % " / ".join(repr(x) for x in s))
    return 0


if __name__ == "__main__":
    sys.exit(main())

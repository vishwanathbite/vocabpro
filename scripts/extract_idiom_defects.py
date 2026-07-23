#!/usr/bin/env python3
"""
idioms.js defect EXTRACTION — read-only, produces review JSON. Fixes nothing.

Reads  js/data/idioms.js   (never written)
Writes scripts/prb-truncated-meanings.json      (104 - dangling function word only)
       scripts/prb-truncated-meanings-113.json  (113 - adds meanings ending in : or -)
       scripts/prb-truncated-examples.json      (14)
       scripts/prb-duplicate-idioms.json        (11 groups / 22 occurrences)

Detection rules:
  meanings-104  meaning ends on a dangling function word (cut mid-phrase)
  meanings-113  the above, OR meaning ends in , ; : - and similar. Catches
                dictionary-style definitions whose trailing example was dropped
                ("...in a particular situation:") and one mid-word cut
                ("To accept readily / To pre-").
  examples      example ends on a dangling function word, or on , ; : -
  duplicates    idiom normalised to lowercase + collapsed whitespace, groups of >1

Deliberately over-inclusive: borderline hits are kept visible for manual triage
rather than silently dropped.

USAGE (from repo root):  py scripts/extract_idiom_defects.py
"""
import os, re, json

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
SRC = os.path.join(REPO, "js", "data", "idioms.js")
OUT = HERE

raw = open(SRC, encoding="utf-8").read()
m = re.search(r"const idiomsDB\s*=\s*", raw)
data = json.loads(raw[m.end(): raw.rfind("]") + 1])

FIELDS = ("idiom", "meaning", "example", "category", "difficulty")
CORE = ("a|an|the|of|to|in|on|at|for|with|and|or|but|as|by|from|into|that|which|who|"
        "his|her|their|its|was|were|is|are")
MEANING_DANGLE = CORE + "|your|our|my|not|be"
EXAMPLE_DANGLE = CORE
CUT_PUNCT = r"[,;:\-–—]$"

def row(i, e):
    d = {"index": i}
    d.update({k: e[k] for k in FIELDS})
    return d

def dangles(text, words):
    return bool(re.search(rf"\b(?:{words})$", text.strip(), re.I))

# 1a. meanings cut off mid-phrase - dangling function word only
meanings_104 = [row(i, e) for i, e in enumerate(data)
                if dangles(e["meaning"], MEANING_DANGLE)]

# 1b. same, plus meanings ending in cut punctuation
meanings_113 = [row(i, e) for i, e in enumerate(data)
                if dangles(e["meaning"], MEANING_DANGLE)
                or re.search(CUT_PUNCT, e["meaning"].strip())]

# 2. examples cut off mid-sentence
examples = [row(i, e) for i, e in enumerate(data)
            if re.search(CUT_PUNCT, e["example"].strip())
            or dangles(e["example"], EXAMPLE_DANGLE)]

# 3. duplicate idioms
groups = {}
for i, e in enumerate(data):
    groups.setdefault(re.sub(r"\s+", " ", e["idiom"].strip().lower()), []).append(i)
dupes = [{"normalised": k, "occurrences": [row(i, data[i]) for i in v]}
         for k, v in sorted(groups.items()) if len(v) > 1]

def dump(name, obj):
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)
        f.write("\n")

dump("prb-truncated-meanings.json", meanings_104)
dump("prb-truncated-meanings-113.json", meanings_113)
dump("prb-truncated-examples.json", examples)
dump("prb-duplicate-idioms.json", dupes)

only_113 = sorted({r["index"] for r in meanings_113} - {r["index"] for r in meanings_104})
print("entries scanned:                 ", len(data))
print("prb-truncated-meanings.json:     ", len(meanings_104))
print("prb-truncated-meanings-113.json: ", len(meanings_113))
print("prb-truncated-examples.json:     ", len(examples))
print("prb-duplicate-idioms.json:       ", len(dupes), "groups /",
      sum(len(g["occurrences"]) for g in dupes), "occurrences")
print("\nnew in 113 vs 104:", only_113)
by_i = {r["index"]: r for r in meanings_113}
for i in only_113:
    print(f"  [{i}] {by_i[i]['idiom']!r} -> {by_i[i]['meaning']!r}")

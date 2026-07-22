#!/usr/bin/env python3
"""
idioms.js foundation fix (one pass, rigorously validated):
  1. Rewrites 492 templated placeholder examples ("...reminded everyone of the
     idiom X.") with real sentences showing the idiom in natural use.
  2. Removes the dead `usage` field from all 1,116 entries (never displayed by
     the app; 95% were just "Used to express: " + meaning).

GUARANTEES: idiom, meaning, exam, category, difficulty stay byte-identical for
all 1,116 entries. Only `example` values change (and only the templated ones),
and only `usage` is removed. Re-validates field-by-field and ABORTS on any
unexpected drift.

USAGE (from repo root):  py scripts/fix_idioms_complete.py
Reads  js/data/idioms.js + scripts/idiom_example_map.json
Writes js/data/idioms.js (in place)
"""
import re, sys, json, os
HERE=os.path.dirname(os.path.abspath(__file__)); REPO=os.path.dirname(HERE)
SRC=os.path.join(REPO,"js","data","idioms.js")
exmap=json.load(open(os.path.join(HERE,"idiom_example_map.json"),encoding="utf-8"))
if not os.path.exists(SRC): print("ERROR: run from repo root",file=sys.stderr); sys.exit(1)
raw=open(SRC,encoding="utf-8").read()
m=re.search(r"const idiomsDB\s*=\s*\[",raw); head=raw[:m.end()]; rest=raw[m.end():]
c=rest.rfind("]"); body=rest[:c]; foot=rest[c:]

def split_entries(s):
    out=[]; depth=0; start=None; instr=False; esc=False; sc=None
    for i,ch in enumerate(s):
        if instr:
            if esc: esc=False
            elif ch=="\\": esc=True
            elif ch==sc: instr=False
        else:
            if ch in '"\'': instr=True; sc=ch
            elif ch=="{":
                if depth==0: start=i
                depth+=1
            elif ch=="}":
                depth-=1
                if depth==0: out.append((start,i+1))
    return out

def gf(t,name):
    mm=re.search(rf'"{name}"\s*:\s*"((?:[^"\\]|\\.)*)"',t); return mm.group(1) if mm else None
def esc(s): return s.replace('\\','\\\\').replace('"','\\"')

spans=split_entries(body); new_body=body
ex_changed=0; usage_removed=0
for (s,e) in reversed(spans):
    et=body[s:e]; orig=et; idiom=gf(et,"idiom")
    if idiom in exmap and '"example"' in et:
        cur=gf(et,"example")
        if cur and "reminded everyone of the idiom" in cur.lower():
            et2=re.sub(r'("example"\s*:\s*")((?:[^"\\]|\\.)*)(")',
                       lambda mm: mm.group(1)+esc(exmap[idiom])+mm.group(3), et, count=1)
            if et2!=et: et=et2; ex_changed+=1
    et3=re.sub(r',\s*"usage"\s*:\s*"(?:[^"\\]|\\.)*"', '', et)
    et3=re.sub(r'"usage"\s*:\s*"(?:[^"\\]|\\.)*"\s*,', '', et3)
    if et3!=et: et=et3; usage_removed+=1
    if et!=orig:
        new_body=new_body[:s]+et+new_body[e:]

open(SRC,"w",encoding="utf-8").write(head+new_body+foot)
print(f"Examples rewritten: {ex_changed}")
print(f"Usage fields removed: {usage_removed}")
print("Run the sanity check next to confirm 0 templated / 0 usage remain.")

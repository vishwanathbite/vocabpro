#!/usr/bin/env python3
"""
Normalize acronym `category` labels in js/data/acronyms.js from 72 inconsistent
values down to 16 clean categories. The category is displayed to users (acronym
quiz explanation + word-detail badge), so consistency is user-visible.

Changes ONLY the `category` field. acronym/full/options/exam stay byte-identical.
Re-validates and ABORTS (writes nothing) on any unexpected drift.

USAGE (from repo root):  py scripts/fix_acronym_categories.py
Reads  js/data/acronyms.js + scripts/acronym_category_map.json
Writes js/data/acronyms.js (in place)
"""
import re, sys, json, os
HERE=os.path.dirname(os.path.abspath(__file__)); REPO=os.path.dirname(HERE)
SRC=os.path.join(REPO,"js","data","acronyms.js")
MAP=json.load(open(os.path.join(HERE,"acronym_category_map.json"),encoding="utf-8"))
if not os.path.exists(SRC): print("ERROR: run from repo root",file=sys.stderr); sys.exit(1)
raw=open(SRC,encoding="utf-8").read()
m=re.search(r"const acronymsDB\s*=\s*\[",raw); head=raw[:m.end()]; rest=raw[m.end():]
c=rest.rfind("]"); body=rest[:c]; foot=rest[c:]
entry_re=re.compile(r"\{acronym:.*?\}",re.S)
def esc(s): return s.replace('\\','\\\\').replace('"','\\"')
def getf(t,n):
    mm=re.search(rf'{n}:"((?:[^"\\]|\\.)*)"',t); return mm.group(1) if mm else None
new_body=body; changed=0
for match in reversed(list(entry_re.finditer(body))):
    et=match.group(0); orig=et; cat=getf(et,"category")
    if cat and cat in MAP and MAP[cat]!=cat:
        et2,n=re.subn(r'(category:")((?:[^"\\]|\\.)*)(")',lambda mm:mm.group(1)+esc(MAP[cat])+mm.group(3),et,count=1)
        if n: et=et2; changed+=1
    if et!=orig:
        s,e=match.span(); new_body=new_body[:s]+et+new_body[e:]
oldE=entry_re.findall(body); newE=entry_re.findall(new_body)
if len(oldE)!=len(newE): print("ABORT: count changed",file=sys.stderr); sys.exit(1)
def strip_cat(t): return re.sub(r'category:"(?:[^"\\]|\\.)*"','',t)
drift=sum(1 for oe,ne in zip(oldE,newE) if strip_cat(oe)!=strip_cat(ne))
if drift: print(f"ABORT: {drift} unexpected drift. Nothing written.",file=sys.stderr); sys.exit(1)
open(SRC,"w",encoding="utf-8").write(head+new_body+foot)
print(f"Category values normalized: {changed}")
print("Validation: acronym/full/options/exam byte-identical  OK")
print(f"Wrote: {SRC}")

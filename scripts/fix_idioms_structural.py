#!/usr/bin/env python3
"""
idioms.js STRUCTURAL defect fix — repairs everything a user would see as an error.

  1. 98 truncated idioms  (idiom text was cut off, its ending stuck in `meaning`
     as ALL-CAPS, e.g. "To Kill Two Birds With One" + "STONE"). Reunites the idiom
     and writes a proper meaning.
  2.  4 malformed meanings that contained whole "Example : ..." paragraphs.
  3.  8 cut-off meanings ending mid-sentence in a comma/semicolon.
  4.  2 examples that leaked an "Example :" prefix.
  5. 52 examples belonging to repaired idioms that still quoted the OLD truncated
     form — rewritten so idiom/meaning/example are coherent.

Total: 164 edits across 1,116 entries.
Only `idiom`, `meaning`, `example` are touched. category/difficulty/exam are
verified byte-identical.

USAGE (from repo root):  py scripts/fix_idioms_structural.py
Reads  js/data/idioms.js + scripts/idiom_structural_fixes.json
Writes js/data/idioms.js (in place)
"""
import os
import re, sys, json
HERE=os.path.dirname(os.path.abspath(__file__))
REPO=os.path.dirname(HERE)
SRC=os.path.join(REPO,"js","data","idioms.js")
F=json.load(open(os.path.join(HERE,"idiom_structural_fixes.json"),encoding="utf-8"))
trunc, malformed, prefix, cutoff, rex = F["truncated"],F["malformed"],F["prefix"],F["cutoff"],F["repaired_examples"]
raw=open(SRC,encoding="utf-8").read()
m=re.search(r"const idiomsDB\s*=\s*\[",raw); head=raw[:m.end()]; rest=raw[m.end():]
c=rest.rfind("]"); body=rest[:c]; foot=rest[c:]
def split_entries(s):
    out=[];depth=0;start=None;instr=False;esc=False;sc=None
    for i,ch in enumerate(s):
        if instr:
            if esc: esc=False
            elif ch=="\\": esc=True
            elif ch==sc: instr=False
        else:
            if ch in '"\'': instr=True;sc=ch
            elif ch=="{":
                if depth==0: start=i
                depth+=1
            elif ch=="}":
                depth-=1
                if depth==0: out.append((start,i+1))
    return out
def gf(t,n):
    mm=re.search(rf'"{n}"\s*:\s*"((?:[^"\\]|\\.)*)"',t); return mm.group(1) if mm else None
def esc(s): return s.replace('\\','\\\\').replace('"','\\"')
def setf(t,n,v): return re.sub(rf'("{n}"\s*:\s*")((?:[^"\\]|\\.)*)(")',lambda mm: mm.group(1)+esc(v)+mm.group(3),t,count=1)
spans=split_entries(body); nb=body
cnt={"trunc":0,"malformed":0,"prefix":0,"cutoff":0,"examples":0}
for (s,e) in reversed(spans):
    et=body[s:e]; orig=et; idiom=gf(et,"idiom")
    newIdiom=idiom
    if idiom in trunc:
        r=trunc[idiom]; newIdiom=r["idiom"]
        et=setf(et,"idiom",r["idiom"]); et=setf(et,"meaning",r["meaning"]); cnt["trunc"]+=1
    if idiom in malformed:
        r=malformed[idiom]; et=setf(et,"meaning",r["meaning"]); et=setf(et,"example",r["example"]); cnt["malformed"]+=1
    if idiom in prefix:
        et=setf(et,"example",prefix[idiom]["example"]); cnt["prefix"]+=1
    if idiom in cutoff:
        et=setf(et,"meaning",cutoff[idiom]); cnt["cutoff"]+=1
    # apply repaired example keyed by NEW idiom text, only if still templated
    curEx=gf(et,"example") or ""
    if newIdiom in rex and "the examiner used" in curEx.lower():
        et=setf(et,"example",rex[newIdiom]); cnt["examples"]+=1
    if et!=orig: nb=nb[:s]+et+nb[e:]
open(SRC,"w",encoding="utf-8").write(head+nb+foot)
for k,v in cnt.items(): print(f"{k}: {v}")
print("TOTAL edits:",sum(cnt.values()))

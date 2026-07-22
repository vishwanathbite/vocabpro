#!/usr/bin/env python3
"""
vocab-hard.js foundation fix (one pass, validated):
  1. Replaces 129 weak acrostic mnemonics with real memory hooks (hard_mnem_map.json)
  2. Fixes 1 self-referential synonym (Overwrought: "overwrought" -> "flustered")

vocab-hard was already clean on usage (all present) and difficulty (all "hard"),
so those are NOT touched. Only mnemonics + the one synonym change.

GUARANTEES: word, definition, pronunciation, example, usage, exam, difficulty,
antonyms stay byte-identical for all 1,501 entries (synonyms too except Overwrought).
Re-validates and ABORTS (writes nothing) on any unexpected drift.

USAGE (from repo root):  py scripts/fix_vocab_hard_complete.py
Reads  js/data/vocab-hard.js + scripts/hard_mnem_map.json
Writes js/data/vocab-hard.js (in place)
"""
import re, sys, json, os
HERE=os.path.dirname(os.path.abspath(__file__)); REPO=os.path.dirname(HERE)
SRC=os.path.join(REPO,"js","data","vocab-hard.js")
mnem=json.load(open(os.path.join(HERE,"hard_mnem_map.json"),encoding="utf-8"))
if not os.path.exists(SRC): print("ERROR: run from repo root",file=sys.stderr); sys.exit(1)
raw=open(SRC,encoding="utf-8").read()
m=re.search(r"const vocabHard\s*=\s*\[",raw); head=raw[:m.end()]; rest=raw[m.end():]
c=rest.rfind("]"); body=rest[:c]; foot=rest[c:]
entry_re=re.compile(r"\{word:.*?\}",re.S)
def gw(t):
    mm=re.search(r'word:"((?:[^"\\]|\\.)*)"',t); return mm.group(1) if mm else None
def esc(s): return s.replace('\\','\\\\').replace('"','\\"')
new_body=body; cnt={"mnem":0,"syn":0}
for match in reversed(list(entry_re.finditer(body))):
    et=match.group(0); w=gw(et); orig=et
    if not w: continue
    if w in mnem:
        et2,n=re.subn(r'(mnemonic:")((?:[^"\\]|\\.)*)(")',lambda mm:mm.group(1)+esc(mnem[w])+mm.group(3),et,count=1)
        if n: et=et2; cnt["mnem"]+=1
    if w=="Overwrought":
        et3=et.replace('"agitated","frantic","distraught","overwrought"','"agitated","frantic","distraught","flustered"')
        if et3!=et: et=et3; cnt["syn"]+=1
    if et!=orig:
        s,e=match.span(); new_body=new_body[:s]+et+new_body[e:]
oldE=entry_re.findall(body); newE=entry_re.findall(new_body)
if len(oldE)!=len(newE): print("ABORT: count changed",file=sys.stderr); sys.exit(1)
def fld(t,n):
    mm=re.search(rf'{n}:"((?:[^"\\]|\\.)*)"',t); return mm.group(1) if mm else None
def arr(t,n):
    mm=re.search(rf'{n}:\[(.*?)\]',t,re.S); return mm.group(1) if mm else None
drift=0
for oe,ne in zip(oldE,newE):
    w=gw(oe)
    for f in ["word","definition","pronunciation","example","usage","exam","difficulty"]:
        if fld(oe,f)!=fld(ne,f): drift+=1
    if arr(oe,"antonyms")!=arr(ne,"antonyms"): drift+=1
    if w!="Overwrought" and arr(oe,"synonyms")!=arr(ne,"synonyms"): drift+=1
if drift: print(f"ABORT: {drift} unexpected drift. Nothing written.",file=sys.stderr); sys.exit(1)
open(SRC,"w",encoding="utf-8").write(head+new_body+foot)
print(f"Mnemonics replaced: {cnt['mnem']} | Synonym fixed: {cnt['syn']}")
print("Validation: word/definition/pronunciation/example/usage/exam/difficulty/antonyms byte-identical  OK")
print(f"Wrote: {SRC}")

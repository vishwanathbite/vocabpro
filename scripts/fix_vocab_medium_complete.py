#!/usr/bin/env python3
"""
Complete vocab-medium.js foundation fix (one pass, fully validated):
  1. Adds `usage` to the 1,158 entries missing it        (from usage_map.json)
  2. Corrects difficulty:"easy" -> "medium" (1,158 entries; this IS the medium file)
  3. Replaces 268 weak acrostic mnemonics with real hooks (from mnem_map.json)
  4. Fixes the single Benediction self-referential synonym

GUARANTEES: word, definition, pronunciation, example, antonyms, exam stay
byte-identical for all 1,709 entries (synonyms too, except the Benediction fix).
Re-validates after editing and ABORTS (writes nothing) on any unexpected drift.

USAGE (from repo root):
    py scripts/fix_vocab_medium_complete.py
Reads   js/data/vocab-medium.js  + scripts/usage_map.json + scripts/mnem_map.json
Writes  js/data/vocab-medium.js  (in place)
"""
import re, sys, json, os
HERE=os.path.dirname(os.path.abspath(__file__)); REPO=os.path.dirname(HERE)
SRC=os.path.join(REPO,"js","data","vocab-medium.js")
usage_map=json.load(open(os.path.join(HERE,"usage_map.json"),encoding="utf-8"))
mnem_map =json.load(open(os.path.join(HERE,"mnem_map.json"),encoding="utf-8"))
if not os.path.exists(SRC): print("ERROR: run from repo root",file=sys.stderr); sys.exit(1)
raw=open(SRC,encoding="utf-8").read()
m=re.search(r"const vocabMedium\s*=\s*\[",raw); head=raw[:m.end()]; rest=raw[m.end():]
c=rest.rfind("]"); body=rest[:c]; foot=rest[c:]
entry_re=re.compile(r"\{word:.*?\}",re.S)
def gw(t):
    mm=re.search(r'word:"((?:[^"\\]|\\.)*)"',t); return mm.group(1) if mm else None
def esc(s): return s.replace('\\','\\\\').replace('"','\\"')
matches=list(entry_re.finditer(body)); new_body=body
cnt={"usage":0,"diff":0,"mnem":0,"synonym":0}
for match in reversed(matches):
    et=match.group(0); w=gw(et)
    if not w: continue
    orig=et
    if ',usage:"' not in et and w in usage_map:
        et2,n=re.subn(r'(,mnemonic:"(?:[^"\\]|\\.)*")(,exam:")',
                      lambda mm: mm.group(1)+f',usage:"{esc(usage_map[w])}"'+mm.group(2),et,count=1)
        if n: et=et2; cnt["usage"]+=1
    et3,n=re.subn(r'difficulty:"easy"','difficulty:"medium"',et,count=1)
    if n: et=et3; cnt["diff"]+=1
    if w in mnem_map:
        et4,n=re.subn(r'(mnemonic:")((?:[^"\\]|\\.)*)(")',
                      lambda mm: mm.group(1)+esc(mnem_map[w])+mm.group(3),et,count=1)
        if n: et=et4; cnt["mnem"]+=1
    if w=="Benediction":
        et5=et.replace('"blessing","prayer","grace","benediction"','"blessing","prayer","grace","invocation"')
        if et5!=et: et=et5; cnt["synonym"]+=1
    if et!=orig:
        s,e=match.span(); new_body=new_body[:s]+et+new_body[e:]
oldE=entry_re.findall(body); newE=entry_re.findall(new_body)
if len(oldE)!=len(newE): print("ABORT: count changed",file=sys.stderr); sys.exit(1)
def field(t,name):
    mm=re.search(rf'{name}:"((?:[^"\\]|\\.)*)"',t); return mm.group(1) if mm else None
def arr(t,name):
    mm=re.search(rf'{name}:\[(.*?)\]',t,re.S); return mm.group(1) if mm else None
drift=0
for oe,ne in zip(oldE,newE):
    w=gw(oe)
    for f in ["word","definition","pronunciation","example"]:
        if field(oe,f)!=field(ne,f): drift+=1
    if arr(oe,"antonyms")!=arr(ne,"antonyms"): drift+=1
    if w!="Benediction" and arr(oe,"synonyms")!=arr(ne,"synonyms"): drift+=1
    if field(oe,"exam")!=field(ne,"exam"): drift+=1
if drift: print(f"ABORT: {drift} unexpected drift. Nothing written.",file=sys.stderr); sys.exit(1)
open(SRC,"w",encoding="utf-8").write(head+new_body+foot)
print(f"Usage added: {cnt['usage']} | Difficulty fixed: {cnt['diff']} | Mnemonics replaced: {cnt['mnem']} | Synonym fixed: {cnt['synonym']}")
print("Validation: word/definition/pronunciation/example/antonyms/exam byte-identical  OK")
print(f"Wrote: {SRC}")

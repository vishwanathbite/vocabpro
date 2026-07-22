# Claude Code Task Brief — vocab-hard.js foundation fix

## Objective
vocab-hard.js is already clean on usage (all present) and difficulty (all "hard").
Only two fixes needed:
1. Replace 129 weak acrostic mnemonics with real memory hooks
2. Fix 1 self-referential synonym (Overwrought)

Content pre-generated in scripts/hard_mnem_map.json.

## Steps (vocabpro-live, from clean main, NEW branch)
1. git checkout main && git pull origin main
2. git checkout -b fix/vocab-hard-complete
3. Put fix_vocab_hard_complete.py + hard_mnem_map.json in scripts/
4. From repo root: py scripts/fix_vocab_hard_complete.py

## Expected output (verify EXACTLY)
Mnemonics replaced: 129 | Synonym fixed: 1
Validation: ... byte-identical  OK

If numbers differ or ABORT: STOP, report, do not commit. Script writes nothing on failure.

## Sanity check
```
node -e "global.window={};eval(require('fs').readFileSync('js/data/vocab-hard.js','utf8').replace(/const vocabHard\s*=/,'global.vocabHard=')); const d=global.vocabHard; console.log('count',d.length); const f=['Always','Clearly','Eventually','Totally','Really','Usually']; let weak=0; d.forEach(e=>{const ws=(e.mnemonic||'').split(/[:\s]+/).slice(1);const fc=ws.filter(w=>f.includes(w)).length;if(ws.length&&fc/ws.length>0.5)weak++;}); console.log('weak-mnemonics',weak); console.log('diff-tags',JSON.stringify(d.reduce((a,e)=>{a[e.difficulty]=(a[e.difficulty]||0)+1;return a;},{})))"
```
Expect: count 1501, weak-mnemonics 0, diff-tags {"hard":1501}.

## Commit + PR
Commit js/data/vocab-hard.js + scripts/.
Message: "fix(data): vocab-hard foundation - replace 129 weak mnemonics, fix 1 synonym"
Push branch, open PR against main. Never push to main directly.

## Note
Martinet has 3 antonyms (not 4) in the original — this is intentional/fine (a naturally
3-antonym word), left untouched. Not a defect.

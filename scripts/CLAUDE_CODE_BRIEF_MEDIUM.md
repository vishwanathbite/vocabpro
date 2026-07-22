# Claude Code Task Brief — Complete vocab-medium.js foundation fix

## Objective
One pass that makes js/data/vocab-medium.js structurally solid:
1. Add `usage` to 1,158 entries missing it
2. Fix difficulty:"easy" -> "medium" on 1,158 mislabeled entries
3. Replace 268 weak acrostic mnemonics with real memory hooks
4. Fix 1 self-referential synonym (Benediction)

All content is pre-generated in scripts/usage_map.json and scripts/mnem_map.json.

## Steps (in vocabpro-live, NEW branch)
1. git checkout -b fix/vocab-medium-complete
2. Put fix_vocab_medium_complete.py, usage_map.json, mnem_map.json in scripts/
3. From repo root: py scripts/fix_vocab_medium_complete.py

## Expected output (verify EXACTLY)
Usage added: 1158 | Difficulty fixed: 1158 | Mnemonics replaced: 268 | Synonym fixed: 1
Validation: ... byte-identical  OK

If any number differs or it prints ABORT: STOP, report back, do not commit. Script writes nothing on failure.

## Sanity check before commit
```
node -e "global.window={};eval(require('fs').readFileSync('js/data/vocab-medium.js','utf8').replace(/const vocabMedium\s*=/,'global.vocabMedium=')); const d=global.vocabMedium; console.log('count',d.length); console.log('missing-usage',d.filter(e=>!e.usage).length); console.log('diff-tags',JSON.stringify(d.reduce((a,e)=>{a[e.difficulty]=(a[e.difficulty]||0)+1;return a;},{}))); console.log('broken',d.filter(e=>e.synonyms.length!==4||e.antonyms.length!==4||!e.usage).length)"
```
Expect: count 1709, missing-usage 0, diff-tags {"medium":1709}, broken 0.

## Commit + PR
Commit js/data/vocab-medium.js + scripts/. 
Message: "fix(data): complete vocab-medium foundation - usage, difficulty tags, mnemonics, synonym"
Push branch, open PR against main. Never push to main directly.

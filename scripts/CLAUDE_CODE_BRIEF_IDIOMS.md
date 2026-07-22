# Claude Code Task Brief — idioms.js foundation fix (the final data file)

## Objective
Two fixes to close the data foundation:
1. Rewrite 492 templated placeholder examples ("...reminded everyone of the idiom X.")
   with real sentences showing the idiom in natural, Indian/exam-flavored use.
2. Remove the dead `usage` field from all 1,116 entries (app never displays it; it was
   95% just "Used to express: " + meaning — redundant dead data).

Content pre-generated in scripts/idiom_example_map.json.

## Steps (vocabpro-live, from clean main, NEW branch)
1. git checkout main && git pull origin main
2. git checkout -b fix/idioms-complete
3. Put fix_idioms_complete.py + idiom_example_map.json in scripts/
4. py scripts/fix_idioms_complete.py

## Expected output
Examples rewritten: 492
Usage fields removed: 1116

If different or error: STOP, report.

## Sanity check (IMPORTANT — confirms clean result)
```
node -e "global.window={};let r=require('fs').readFileSync('js/data/idioms.js','utf8').replace(/const idiomsDB\s*=/,'global.d=').replace(/window\.idiomsDB\s*=\s*idiomsDB;?/,'');eval(r);const d=global.d;console.log('count',d.length);console.log('usage-remaining',d.filter(e=>e.usage!==undefined).length);console.log('templated-remaining',d.filter(e=>e.example&&e.example.toLowerCase().includes('reminded everyone of the idiom')).length);console.log('broken',d.filter(e=>!e.idiom||!e.meaning||!e.example).length)"
```
Expect: count 1116, usage-remaining 0, templated-remaining 0, broken 0.

## Commit + PR
Commit js/data/idioms.js + scripts/.
Message: "fix(data): idioms foundation - rewrite 492 examples, remove dead usage field"
Push branch, open PR against main. Never push to main directly.

## Note
This is the 6th and final data file. After this merges, the entire VocabPro data
foundation (oneword, vocab-easy, vocab-medium, vocab-hard, acronyms, idioms) is complete.

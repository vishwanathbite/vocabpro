# Claude Code Task Brief — Normalize acronym categories

## Objective
js/data/acronyms.js is structurally perfect (no missing fields, all options valid,
no duplicates). The only issue: 72 inconsistent `category` labels (e.g. "Banking",
"Banking/Finance", "Finance" all separate). Category IS displayed to users, so this
normalizes them to 16 clean categories. Mapping in scripts/acronym_category_map.json.

## Steps (vocabpro-live, from clean main, NEW branch)
1. git checkout main && git pull origin main
2. git checkout -b fix/acronym-categories
3. Put fix_acronym_categories.py + acronym_category_map.json in scripts/
4. py scripts/fix_acronym_categories.py

## Expected output
Category values normalized: 184
Validation: acronym/full/options/exam byte-identical  OK

If ABORT or different: STOP, report. Writes nothing on failure.

## Sanity check
```
node -e "global.window={};eval(require('fs').readFileSync('js/data/acronyms.js','utf8').replace(/const acronymsDB\s*=/,'global.acronymsDB=')); const d=global.acronymsDB; console.log('count',d.length); console.log('categories',new Set(d.map(e=>e.category)).size); console.log('broken',d.filter(e=>e.options.length!==4||!e.options.includes(e.full)).length)"
```
Expect: count 300, categories 16, broken 0.

## Commit + PR
Commit js/data/acronyms.js + scripts/.
Message: "fix(data): normalize acronym categories from 72 labels to 16 clean ones"
Push branch, open PR against main. Never push to main directly.

# Claude Code Brief — idioms.js structural defect fix

## Why
A live quiz showed: "What does 'To Kill Two Birds With One' mean?" -> answer "STONE".
96 idioms were truncated with their ending stuck in the meaning field, plus other
structural defects. These are visible content errors that break user trust.

## What it fixes (164 edits)
- 98 truncated idioms (idiom reunited + real meaning written)
-  4 malformed meanings containing "Example : ..." paragraphs
-  8 cut-off meanings ending in a comma
-  2 examples leaking an "Example :" prefix
- 52 examples of repaired idioms that still quoted the old truncated form

NOT included: 330 remaining "The examiner used X..." templated examples. Those are
weak-but-correct content, queued as a separate quality pass.

## Steps (vocabpro-live, clean main, NEW branch)
1. git checkout main && git pull origin main
2. git checkout -b fix/idioms-structural
3. Put fix_idioms_structural.py + idiom_structural_fixes.json in scripts/
4. py scripts/fix_idioms_structural.py

## Expected output
trunc: 98 | malformed: 4 | prefix: 2 | cutoff: 8 | examples: 52 | TOTAL edits: 164

## Sanity check
```
node -e "global.window={};let r=require('fs').readFileSync('js/data/idioms.js','utf8').replace(/const idiomsDB\s*=/,'global.d=').replace(/window\.idiomsDB\s*=\s*idiomsDB;?/,'');eval(r);const d=global.d;console.log('count',d.length);console.log('allcaps',d.filter(e=>/^[A-Z\s\x27-]+$/.test(e.meaning.trim())&&e.meaning.trim().length>1).length);console.log('meaning-has-Example',d.filter(e=>/example\s*:/i.test(e.meaning)).length);console.log('cutoff',d.filter(e=>/[,;]\s*$/.test(e.meaning.trim())).length);console.log('ex-prefix',d.filter(e=>/^example\s*:/i.test(e.example)).length)"
```
Expect: count 1116, allcaps 0, meaning-has-Example 0, cutoff 0, ex-prefix 0.

## Verify in the app
Run an Idiom quiz and confirm questions like "To Kill Two Birds With One Stone" now
show the full idiom with a sensible meaning.

## Commit + PR
Commit js/data/idioms.js + scripts/.
Message: "fix(data): repair 98 truncated idioms and 14 other structural defects"
Push branch, open PR against main. Never push to main directly.

#!/usr/bin/env python3
"""
Standardize the `explanation` field in js/data/oneword.js to "Meaning. Etymology." format.

Safety model:
- The file is processed line by line. Only lines matching a strict single-line
  entry pattern are touched, and only the `explanation` field within them.
- Every other line (header comment, batch comments, blank lines, the
  `const oneWordDB = [` opener, the `];` closer, and the
  `window.oneWordDB = oneWordDB;` footer) is copied through byte-for-byte.
- After rewriting, the output is re-parsed and phrase/answer/options/exam are
  compared field-for-field against the original for every entry. If anything
  differs (including entry count), nothing is written to disk.
"""

import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
DATA_PATH = REPO_ROOT / "js" / "data" / "oneword.js"

ENTRY_RE = re.compile(
    r'^(?P<indent>[ \t]*)\{phrase:"(?P<phrase>(?:[^"\\]|\\.)*)",'
    r'answer:"(?P<answer>(?:[^"\\]|\\.)*)",'
    r'options:\[(?P<options>[^\]]*)\],'
    r'explanation:"(?P<explanation>(?:[^"\\]|\\.)*)",'
    r'exam:"(?P<exam>(?:[^"\\]|\\.)*)"\}'
    r'(?P<comma>,?)(?P<trail>[ \t]*)$'
)

EOL_RE = re.compile(r'(\r\n|\r|\n)$')

OVERRIDES = {
    "Extempore": "A speech or performance done without any preparation. From Latin 'ex tempore' (out of the moment).",
    "Constellation": "A group of stars forming a recognisable pattern in the sky. From Latin 'con' (together) + 'stella' (star).",
    "Omnipresent": "Present everywhere at the same time. From 'omni' (all) + 'praesent' (present).",
    "Dirge": "A slow, mournful song sung at a funeral or for the dead. From Latin 'dirige' (guide/direct).",
    "Aquarium": "A tank or building where fish and water animals are kept. From Latin 'aquarius' (of water).",
}

STOPWORDS = {
    "from", "of", "the", "a", "an", "and", "to", "in", "on", "at",
    "for", "by", "or", "as", "with",
}


def meaningful_word_count(explanation: str) -> int:
    text = re.sub(r"'[^']*'", " ", explanation)   # strip quoted roots
    text = re.sub(r"\([^)]*\)", " ", text)         # strip parenthetical glosses
    tokens = re.findall(r"[A-Za-z]+", text)
    return sum(1 for t in tokens if t.lower() not in STOPWORDS)


def has_plain_meaning(explanation: str, answer: str) -> bool:
    if explanation.strip().startswith(answer):
        return True
    return meaningful_word_count(explanation) >= 5


def make_meaning(phrase: str) -> str:
    p = phrase.strip()
    if p:
        p = p[0].upper() + p[1:]
    if not p.endswith("."):
        p += "."
    return p


def make_etymology(explanation: str) -> str:
    e = explanation.strip()
    if e[:5].lower() == "from ":
        e = "From " + e[5:]
    else:
        e = "From " + e
    if not e.endswith("."):
        e += "."
    return e


def escape_js_string(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def split_lines_keepends(text: str):
    lines = []
    start = 0
    for m in re.finditer(r'\r\n|\r|\n', text):
        lines.append(text[start:m.end()])
        start = m.end()
    if start < len(text):
        lines.append(text[start:])
    return lines


def split_content_eol(line: str):
    m = EOL_RE.search(line)
    if m:
        return line[: m.start()], m.group(1)
    return line, ""


def process(original_text: str):
    lines = split_lines_keepends(original_text)

    new_lines = []
    stats = {
        "total_entries": 0,
        "changed": 0,
        "overridden": 0,
        "unchanged": 0,
    }
    samples = []
    orig_fields = []
    new_fields = []

    for line in lines:
        content, eol = split_content_eol(line)
        m = ENTRY_RE.match(content)
        if not m:
            new_lines.append(line)
            continue

        indent = m.group("indent")
        phrase = m.group("phrase")
        answer = m.group("answer")
        options = m.group("options")
        explanation = m.group("explanation")
        exam = m.group("exam")
        comma = m.group("comma")
        trail = m.group("trail")

        stats["total_entries"] += 1
        orig_fields.append((phrase, answer, options, exam))

        if answer in OVERRIDES:
            new_explanation = OVERRIDES[answer]
            stats["overridden"] += 1
        elif has_plain_meaning(explanation, answer):
            new_explanation = explanation
        else:
            meaning = make_meaning(phrase)
            etymology = make_etymology(explanation)
            new_explanation = f"{meaning} {etymology}"

        if new_explanation != explanation:
            stats["changed"] += 1
            if len(samples) < 12:
                samples.append((answer, explanation, new_explanation))
        else:
            stats["unchanged"] += 1

        new_content = (
            f'{indent}{{phrase:"{phrase}",answer:"{answer}",'
            f'options:[{options}],explanation:"{escape_js_string(new_explanation)}",'
            f'exam:"{exam}"}}{comma}{trail}'
        )
        new_lines.append(new_content + eol)
        new_fields.append((phrase, answer, options, exam))

    new_text = "".join(new_lines)
    return new_text, stats, samples, orig_fields, new_fields


def reparse_fields(text: str):
    fields = []
    for line in split_lines_keepends(text):
        content, _ = split_content_eol(line)
        m = ENTRY_RE.match(content)
        if m:
            fields.append((m.group("phrase"), m.group("answer"), m.group("options"), m.group("exam")))
    return fields


def main():
    original_text = DATA_PATH.read_text(encoding="utf-8", newline="")

    new_text, stats, samples, orig_fields, new_fields = process(original_text)

    # Validation pass 1: fields captured during rewrite must match originals.
    if orig_fields != new_fields:
        print("ABORT: phrase/answer/options/exam mismatch detected during rewrite. Nothing written.")
        sys.exit(1)

    # Validation pass 2: re-parse the actual output text independently and re-check.
    reparsed_orig = reparse_fields(original_text)
    reparsed_new = reparse_fields(new_text)

    if len(reparsed_orig) != len(reparsed_new):
        print(f"ABORT: entry count mismatch ({len(reparsed_orig)} -> {len(reparsed_new)}). Nothing written.")
        sys.exit(1)

    if reparsed_orig != reparsed_new:
        for i, (o, n) in enumerate(zip(reparsed_orig, reparsed_new)):
            if o != n:
                print(f"ABORT: entry #{i} field mismatch.\n  original: {o}\n  new:      {n}")
                sys.exit(1)
        print("ABORT: unspecified field mismatch. Nothing written.")
        sys.exit(1)

    # Validation pass 3: every non-entry line must be byte-identical between
    # original and new (header, wrappers, comments, blank lines).
    orig_lines = split_lines_keepends(original_text)
    new_lines_check = split_lines_keepends(new_text)
    if len(orig_lines) != len(new_lines_check):
        print("ABORT: total line count changed. Nothing written.")
        sys.exit(1)
    for i, (ol, nl) in enumerate(zip(orig_lines, new_lines_check)):
        oc, _ = split_content_eol(ol)
        if not ENTRY_RE.match(oc) and ol != nl:
            print(f"ABORT: non-entry line {i+1} was modified. Nothing written.")
            sys.exit(1)

    # All validations passed -- write the file.
    DATA_PATH.write_text(new_text, encoding="utf-8", newline="")

    print(f"Total entries: {stats['total_entries']}")
    print(f"Changed: {stats['changed']} (of which hand-overridden: {stats['overridden']})")
    print(f"Left unchanged (already had plain meaning): {stats['unchanged']}")
    print()
    print("Validation: PASSED (phrase/answer/options/exam byte-identical for all entries; all non-entry lines untouched)")
    print()
    print("=== Sample before/after (first up to 12 changed entries) ===")
    for answer, before, after in samples:
        print(f"- {answer}")
        print(f"  BEFORE: {before}")
        print(f"  AFTER:  {after}")
        print()


if __name__ == "__main__":
    main()

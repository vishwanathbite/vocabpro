/**
 * A stored item's own fields, labelled, for whatever kind it is.
 *
 * EXTRACTED FROM QuizScreen at the agreed trigger — Search needs exactly this
 * list and would have been the second copy. Same function body, same labels,
 * same order; only its address changed.
 *
 * DISPATCHES ON SHAPE, NOT MODE, and that reasoning came with it: a Smart Review
 * or Saved Words session mixes vocabulary, acronyms and one-word substitutes,
 * and Search mixes all three by definition, so a mode-keyed list would label an
 * acronym's full form as a definition. The live app gated this on a mode list
 * (js/components.js:1277) and could afford to, because review could not yet
 * serve acronyms and its search had a separate renderer.
 *
 * Labels are the live app's, verbatim.
 *
 * PAIRS, NOT JSX. The two callers wrap them differently — QuizScreen in a <dl>
 * inside the result panel, Search in an expanded row — so this returns data and
 * neither has to accept the other's markup.
 *
 * `.idiom` IS ABSENT, deliberately, unlike BookmarksScreen's own describe().
 * That screen must render a js/-written idiom entry so it can be deleted; these
 * two callers only ever see items this app generated or loaded, and app-v2 ships
 * no idioms. An idiom reaching here falls through to the vocabulary arm and
 * yields an empty list rather than a mislabelled one.
 *
 * ROW ORDER, for the vocabulary arm. Word, Pronunciation, Definition, Exam,
 * Example, Synonyms, Antonyms, Mnemonic, Usage.
 *
 * Pronunciation sits second because it belongs to the word rather than to the
 * teaching — a student reads the headword and immediately wants to know how to
 * say it, and js/ placed it the same way, directly under the heading.
 *
 * Exam is FOURTH, not last. It is the row that answers "why should I learn
 * this", and for a student revising for SSC or UPSC it is the most motivating
 * line on the card; below six teaching rows it would be read by nobody. It sits
 * after Definition so the word is understood before it is justified, and above
 * Example so it cannot fall off the first screenful of the answer panel.
 *
 * The teaching rows keep js/'s order among themselves — Example, Synonyms,
 * Antonyms, Mnemonic — and Usage stays last as the narrowest note.
 *
 * ARRAYS ARE JOINED WITH ", " AND NOT TRUNCATED. js/ sliced synonyms and
 * antonyms to three (js/screens.js:206-211) because they sat on a small home
 * card; both surfaces here scroll, so the cap would only hide data the student
 * asked to see. Dropping it also avoids restating the 3 — the corpus carries
 * three to five of each, so the slice was invisible on some words and lossy on
 * others.
 *
 * JOINED BEFORE FILTERING, which is what keeps the empty-value guard working:
 * `[]` is truthy and would have passed the filter as a row with no value, while
 * `[].join(', ')` is the empty string and is dropped like any other blank. All
 * ten fields are populated across all 4,009 words today; the filter is for a
 * corrupt store or a future record, not for the data as it ships.
 *
 * @param {Object} wordData A stored vocabulary word, acronym or one-word item
 * @returns {Array<[string, string]>} Label/value pairs, empty values dropped
 */
/* One join for every list field, so the separator is stated once. Non-arrays
   pass through untouched, which lets the table below mix scalars and lists. */
const joinValues = (value) => (Array.isArray(value) ? value.join(', ') : value);

export const detailRows = (wordData) => {
  if (!wordData) return [];

  if (wordData.acronym) {
    return [
      ['Acronym', wordData.acronym],
      ['Full Form', wordData.full],
      ['Category', wordData.category]
    ].filter(([, value]) => value);
  }

  if (wordData.phrase) {
    return [
      ['Phrase', wordData.phrase],
      ['Answer', wordData.answer],
      ['Explanation', wordData.explanation]
    ].filter(([, value]) => value);
  }

  return [
    ['Word', wordData.word],
    ['Pronunciation', wordData.pronunciation],
    ['Definition', wordData.definition],
    ['Exam', joinValues(wordData.exam)],
    ['Example', wordData.example],
    ['Synonyms', joinValues(wordData.synonyms)],
    ['Antonyms', joinValues(wordData.antonyms)],
    ['Mnemonic', wordData.mnemonic],
    ['Usage', wordData.usage]
  ].filter(([, value]) => value);
};

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
 * @param {Object} wordData A stored vocabulary word, acronym or one-word item
 * @returns {Array<[string, string]>} Label/value pairs, empty values dropped
 */
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
    ['Definition', wordData.definition],
    ['Example', wordData.example],
    ['Mnemonic', wordData.mnemonic],
    ['Usage', wordData.usage]
  ].filter(([, value]) => value);
};

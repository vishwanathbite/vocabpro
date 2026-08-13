/**
 * Corpus search.
 *
 * BEHAVIOUR PORTED FROM js/'s SearchModal (js/components.js:1440-1473); none of
 * its markup is. What is reproduced exactly: the five sources, the fields each
 * kind matches on, the case-insensitive substring test, the two-character
 * minimum and the twenty-result cap.
 *
 * WHAT IS DELIBERATELY NOT REPRODUCED:
 *
 *   1. THE BARE GLOBAL READS. js/ does `vocabularyDB.easy.map(...)` with no
 *      guard, plus the same for acronymsDB and oneWordDB. In js/ everything
 *      loads up front so those are always arrays; app-v2 lazy-loads, so the
 *      identical line is a live TypeError the moment Search opens before the
 *      corpus lands. The caller awaits loadAllData first, and buildCorpus still
 *      guards each source — a search that throws and a search that silently
 *      omits Hard words are both worse than one that waits.
 *
 *   2. THE PER-KEYSTROKE REBUILD. js/ rebuilds its `allWords` array inside the
 *      search effect, spreading every one of ~4,000 items into a new object on
 *      every debounced query. Here the corpus is built once per load and the
 *      query only filters it. Same results, and the spread is gone with it —
 *      `type` rides alongside the item rather than being copied into it, so a
 *      result still holds a reference to the ORIGINAL stored object. That
 *      matters beyond speed: BookmarksManager stores `wordData` wholesale, and
 *      bookmarking a spread copy would have saved an item carrying an invented
 *      `type` field that nothing else in the app writes.
 *
 *   3. IDIOMS. js/ never searched them either — its allWords has no idiomsDB —
 *      so this is not a removal, but it is worth stating: idioms are cut from
 *      app-v2 and must not appear here.
 *
 * PURE, AND READS NO STORAGE. The globals are touched only inside the function
 * bodies, never at module top level, matching every other logic module — so this
 * imports safely with nothing loaded.
 */

/** js/'s figures, unchanged. See the module header. */
export const MIN_QUERY_LENGTH = 2;
export const MAX_RESULTS = 20;

/**
 * Flatten every loaded dataset into one searchable list.
 *
 * Each entry is `{ item, type, difficulty }` — a REFERENCE to the stored object
 * plus what kind it is. js/ spread the item and stamped `type` onto the copy;
 * keeping them separate means a caller can hand `item` straight to
 * BookmarksManager or BookmarkToggle without passing on a field the rest of the
 * app has never heard of.
 *
 * Every source is guarded with `|| []`. An unloaded dataset contributes nothing
 * rather than throwing, which is what makes this safe to call before the awaits
 * resolve — though the caller should not, and does not.
 *
 * @returns {Array<{item: Object, type: string, difficulty?: string}>}
 */
export const buildCorpus = () => {
  const vocab = typeof vocabularyDB !== 'undefined' && vocabularyDB ? vocabularyDB : {};
  const acronyms = typeof acronymsDB !== 'undefined' && Array.isArray(acronymsDB) ? acronymsDB : [];
  const oneWord = typeof oneWordDB !== 'undefined' && Array.isArray(oneWordDB) ? oneWordDB : [];

  return [
    /* The three levels carry their difficulty forward. Vocabulary items already
       hold a `difficulty` field of their own, but the level they were LOADED
       under is the authoritative one — it is the key the loader filed them
       under — and a corpus entry should not depend on the data being
       self-consistent to know where it came from. */
    ...(vocab.easy || []).map((item) => ({ item, type: 'vocab', difficulty: 'easy' })),
    ...(vocab.medium || []).map((item) => ({ item, type: 'vocab', difficulty: 'medium' })),
    ...(vocab.hard || []).map((item) => ({ item, type: 'vocab', difficulty: 'hard' })),
    ...acronyms.map((item) => ({ item, type: 'acronym' })),
    ...oneWord.map((item) => ({ item, type: 'oneword' })),
  ];
};

/* Case-insensitive substring, with the needle lowered once by the caller rather
   than per field. Guarded against a missing field: a corpus item with no
   definition must not throw the whole search. */
const has = (value, needle) => typeof value === 'string' && value.toLowerCase().includes(needle);

/**
 * Filter a corpus by query.
 *
 * THE MATCHED FIELDS ARE js/'s, exactly: vocabulary on word, definition and any
 * synonym; acronyms on the acronym and its full form; one-word substitutes on
 * the answer and the phrase. Nothing searches `example`, `mnemonic`, `usage`,
 * `category` or `explanation` — those are shown on a result but not matched on,
 * which is the live app's behaviour and is preserved rather than improved here.
 *
 * @param {Array}  corpus From buildCorpus
 * @param {string} query  Raw query; trimmed and lowered here
 * @returns {Array} At most MAX_RESULTS entries, corpus order preserved
 */
export const searchCorpus = (corpus, query) => {
  const needle = (query ?? '').trim().toLowerCase();

  /* Below the minimum returns NOTHING, not everything. A one-character query
     would match thousands of items and cap at an arbitrary twenty of them,
     which reads as a broken result set rather than as "keep typing". */
  if (needle.length < MIN_QUERY_LENGTH) return [];

  return corpus
    .filter(({ item, type }) => {
      if (type === 'vocab') {
        return (
          has(item.word, needle) ||
          has(item.definition, needle) ||
          (Array.isArray(item.synonyms) && item.synonyms.some((s) => has(s, needle)))
        );
      }
      if (type === 'acronym') {
        return has(item.acronym, needle) || has(item.full, needle);
      }
      if (type === 'oneword') {
        return has(item.answer, needle) || has(item.phrase, needle);
      }
      return false;
    })
    .slice(0, MAX_RESULTS);
};

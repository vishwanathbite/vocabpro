/**
 * Pure Helpers
 * Literary Rides VocabPro - Modular Architecture
 *
 * Pure, self-contained utilities extracted verbatim from js/utils.js:
 * array operations and question-generation helpers. No storage, no DOM, no
 * browser API, no cross-file dependency — Math.random is the only ambient use.
 * This module imports nothing.
 */

// ===========================
// ARRAY MANIPULATION UTILITIES
// ===========================

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled copy of array
 */
export const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

/**
 * Sample N items from array, excluding certain values
 *
 * The RNG is injectable so a caller that needs reproducible output can supply
 * a seeded one. It is a trailing optional parameter defaulting to Math.random,
 * so every existing call site keeps its behaviour unchanged — this matters,
 * because most callers WANT fresh randomness. Quiz generation and match games
 * should not repeat themselves; only the daily challenge needs determinism.
 *
 * @param {Array} arr - Source array
 * @param {number} n - Number of items to sample
 * @param {Set} excludeSet - Set of values to exclude
 * @param {Function} [random] - Returns a float in [0, 1); defaults to Math.random
 * @returns {Array} - Sampled items
 */
export const sample = (arr, n, excludeSet = new Set(), random = Math.random) => {
  const pool = arr.filter(v => !excludeSet.has(v));
  const out = [];
  const poolCopy = [...pool];

  while (out.length < n && poolCopy.length > 0) {
    const i = Math.floor(random() * poolCopy.length);
    out.push(poolCopy.splice(i, 1)[0]);
  }

  return out;
};

/**
 * Get random item from array
 * @param {Array} arr - Source array
 * @returns {*} - Random item
 */
export const randomItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// ===========================
// WORD IDENTITY
// ===========================

/**
 * The canonical identity of a stored item, and now genuinely the only copy.
 *
 * THE CONTRACT THIS ENFORCES, which was previously written down nowhere despite
 * two sites each claiming identity was "resolved the same way everywhere":
 *
 *   quiz-scoring.js WRITES these ids into PERSISTED STORAGE. The value it
 *   derives goes to updateStats, which puts it in stats.reviewPool and in the
 *   mastered / learning / struggling lists. Those survive reloads and outlive
 *   the session that produced them.
 *
 *   quiz-generation.js READS them back. indexLoadedItemsById builds the
 *   id -> item map that Smart Review resolves a stored pool entry through.
 *
 * So the two must produce a BYTE-IDENTICAL string for the same item, forever.
 * They are not merely similar expressions that happen to agree — they are the
 * write side and the read side of the same key. An id the index cannot resolve
 * is not a cosmetic bug: the word stays in reviewPool with nothing to match it,
 * so it can never be answered and therefore never removed. startQuiz reports a
 * non-empty pool that yields no questions as 'loading', so the student is told
 * to try again, indefinitely. The word is stuck in Smart Review permanently.
 *
 * quiz-summary.js uses this too, for historyEntry.words. That one is lower
 * stakes — nothing renders it — and it comes along so the family has one member.
 *
 * TWO SHAPES, ONE ARM LIST. Callers hand this either a flat stored item
 * (a vocabulary word, acronym or one-word substitute straight from a database)
 * or a generated question that wraps one in `wordData`. The rule is a single
 * sentence: THE STORED FIELDS LIVE ON `.wordData` IF THERE IS ONE, OTHERWISE ON
 * THE OBJECT ITSELF — while `word` is always read from the outer object, because
 * generateQuestions copies it up to the question for the vocabulary-shaped modes
 * and a flat item is its own outer object.
 *
 * Written as one function rather than a flat-shape and a question-shape pair
 * deliberately: a pair would prepend the `word` arm in each of them, so the
 * four-arm ORDER would still be spelled out twice, which is the thing this
 * exists to stop. Here it appears exactly once, on the return line.
 *
 * ORDER IS FROZEN: word, acronym, phrase, idiom. `.idiom` is retained even
 * though idioms are cut from app-v2 and nothing can currently produce one —
 * dropping it would change behaviour for any stored id written by the js/ tree,
 * which shares STORAGE_KEY. Its removal belongs to the Phase 6 migration, not
 * to a consolidation that is meant to change nothing.
 *
 * @param {Object} source A stored item, or a question wrapping one in wordData
 * @returns {string|undefined} The identity string, or undefined if none applies
 */
export const wordIdOf = (source) => {
  const stored = source?.wordData ?? source;
  return source?.word || stored?.acronym || stored?.phrase || stored?.idiom;
};

// ===========================
// QUESTION GENERATION UTILITIES
// ===========================

/**
 * Generate smart distractors from vocabulary pool
 * Ensures distractors are real definitions from other words
 *
 * Accepts an injectable RNG and threads it into the sample call below, which is
 * the only random consumer on this path. Added in Phase 5 step 7a as plumbing:
 * the daily challenge promises "same date = same questions for every user", and
 * its word selection and option shuffling are already seeded
 * (daily-challenge.js uses seededShuffle/seededSample), but its distractors come
 * through here and so were drawn from Math.random — making the OPTIONS differ
 * per user and change on every remount. Step 7b passes the date-seeded rng in.
 *
 * Defaulted, so every existing caller is unaffected.
 *
 * @param {string} correctDef - The correct definition
 * @param {Array} words - Pool of word objects
 * @param {number} count - Number of distractors to generate
 * @param {Function} [random] - Returns a float in [0, 1); defaults to Math.random
 * @returns {Array} - Array of distractor definitions
 */
export const generateSmartDistractors = (correctDef, words, count = 3, random = Math.random) => {
  const pool = words
    .filter(w => w.definition !== correctDef)
    .map(w => w.definition);

  return sample(pool, count, new Set([correctDef]), random);
};

/**
 * Build synonym pool from all words, excluding the current word's synonyms
 * @param {Array} allWords - All vocabulary words
 * @param {Array} currentSynonyms - Synonyms of current word to exclude
 * @returns {Array} - Flat array of all other synonyms
 */
export const buildSynonymPool = (allWords, currentSynonyms) => {
  const currentSet = new Set(currentSynonyms);
  return allWords
    .flatMap(w => w.synonyms || [])
    .filter(syn => !currentSet.has(syn));
};

/**
 * Build antonym pool from all words, excluding the current word's antonyms
 * @param {Array} allWords - All vocabulary words
 * @param {Array} currentAntonyms - Antonyms of current word to exclude
 * @returns {Array} - Flat array of all other antonyms
 */
export const buildAntonymPool = (allWords, currentAntonyms) => {
  const currentSet = new Set(currentAntonyms);
  return allWords
    .flatMap(w => w.antonyms || [])
    .filter(ant => !currentSet.has(ant));
};

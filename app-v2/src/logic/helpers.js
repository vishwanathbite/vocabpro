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
 * @param {Array} arr - Source array
 * @param {number} n - Number of items to sample
 * @param {Set} excludeSet - Set of values to exclude
 * @returns {Array} - Sampled items
 */
export const sample = (arr, n, excludeSet = new Set()) => {
  const pool = arr.filter(v => !excludeSet.has(v));
  const out = [];
  const poolCopy = [...pool];

  while (out.length < n && poolCopy.length > 0) {
    const i = Math.floor(Math.random() * poolCopy.length);
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
// QUESTION GENERATION UTILITIES
// ===========================

/**
 * Generate smart distractors from vocabulary pool
 * Ensures distractors are real definitions from other words
 * @param {string} correctDef - The correct definition
 * @param {Array} words - Pool of word objects
 * @param {number} count - Number of distractors to generate
 * @returns {Array} - Array of distractor definitions
 */
export const generateSmartDistractors = (correctDef, words, count = 3) => {
  const pool = words
    .filter(w => w.definition !== correctDef)
    .map(w => w.definition);

  return sample(pool, count, new Set([correctDef]));
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

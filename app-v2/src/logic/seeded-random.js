/**
 * Seeded Randomness
 * Literary Rides VocabPro - Modular Architecture
 *
 * Deterministic PRNG helpers extracted verbatim from js/app.js:107-147, where
 * they sat inline under the "DAILY CHALLENGE SYSTEM" heading. Pure and
 * self-contained: no storage, no DOM, no browser API, not even Math.random.
 * This module imports nothing.
 *
 * These drive the daily challenge, which must produce the SAME question set for
 * every user on a given date. Any drift in the arithmetic silently changes what
 * everyone sees, so the logic here is byte-for-byte identical to the original —
 * including the quirks noted below. Do not "clean up" the bit manipulation.
 */

/**
 * Deterministic pseudo-random number generator from a seed string.
 * Same seed always produces the same sequence of numbers.
 */
export function seededRandom(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return function() {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    return (hash >> 16) / 32768;
  };
}

/**
 * Seeded version of shuffleArray
 */
export function seededShuffle(arr, rng) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Pick n items from array using seeded RNG (without replacement)
 */
export function seededSample(arr, n, rng) {
  const pool = [...arr];
  const result = [];
  for (let i = 0; i < n && pool.length > 0; i++) {
    const idx = Math.floor(rng() * pool.length);
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}

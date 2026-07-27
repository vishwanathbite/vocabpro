/**
 * Word of the Day
 * Literary Rides VocabPro - Modular Architecture
 *
 * Ported verbatim from js/utils.js:703-754 in Phase 3 with all four known
 * defects intact, so that the port stayed structural and every behaviour
 * change could land as a separate, reviewable commit. Phase 5 step 1 is that
 * commit: defects 1 and 4 are now fixed here. Defect 3 stays. Defect 2 is not
 * fixable in this module.
 *
 * FIXED IN PHASE 5 (step 1):
 *
 *   1. Persisted on a get. Every call used to write state.wordOfTheDay and
 *      call StorageManager.saveState, even when the stored value was already
 *      current. The write is now guarded by the same staleness test that
 *      produces the returned `isNew` flag, so a call that finds today's entry
 *      already stored performs no write at all. The read path is unchanged.
 *
 *   4. Unguarded vocabularyDB flatten. The spread of .easy/.medium/.hard now
 *      carries `|| []` fallbacks, matching the convention in
 *      DailyChallengeManager.generateQuestions. Two further guards were added
 *      for cases that previously threw or produced garbage: an absent
 *      vocabularyDB returns null, and a flatten that yields no words returns
 *      null rather than reaching `% allWords.length`, which would otherwise be
 *      a modulo by zero and index the array with NaN.
 *
 *   Also fixed, not one of the numbered four: the function loaded state twice,
 *   once for the read and again eleven lines later for the write, and named the
 *   second local `saveState` — shadowing the concept of the StorageManager
 *   .saveState function called three lines below it. There is now a single
 *   load, held in `state`.
 *
 * STILL PRESERVED — do not "fix" this here:
 *
 *   3. Non-standard date key. It builds `${getFullYear()}-${getMonth()}-${getDate()}`
 *      — local time, 0-indexed month, unpadded. 25 July 2026 becomes
 *      "2026-6-25", which is incompatible with DailyChallengeManager.getToday()'s
 *      padded UTC ISO string. Two different "today" formats coexist in the app.
 *      Left alone deliberately: the date string seeds the word selection, so
 *      changing the format would change which word every user sees today, and
 *      it has to be reconciled with the timezone decision that is still open.
 *
 * CALLER-SIDE, NOT FIXABLE IN THIS MODULE — must be carried into the component
 * rebuild:
 *
 *   2. Called far more often than once a day. Its caller (js/screens.js:120)
 *      is a mount effect on <WordOfTheDay />, which HomeScreen renders
 *      conditionally, so it fires on every return to the home screen rather
 *      than once per day. Fix 1 means those repeat calls no longer each cost a
 *      write, but they still cost a loadState, a full flatten of vocabularyDB
 *      and a rehash every time. The remedy belongs in the component.
 *
 * ONE STRUCTURAL CHANGE FROM PHASE 3, consistent with the Phase 3 convention
 * and NOT a behaviour change: the original wrapped both storage accesses in
 * `typeof StorageManager !== 'undefined'` and fell back to
 * loadFromStorage/saveToStorage. Those two helpers were deliberately dropped in
 * the step 6b triage, and under ESM the imported StorageManager is always
 * defined, so the fallback branch was unreachable dead code. It is removed here
 * exactly as app-v2's dailygoals.js and gamification.js removed theirs.
 *
 * vocabularyDB is referenced only INSIDE the function body, never at module
 * top level, following the quiz-generation.js precedent — so the module imports
 * safely even though that global is undefined at import time.
 */

import { StorageManager } from './storage.js';

/**
 * Get Word of the Day based on date
 * Uses a deterministic algorithm so everyone sees the same word
 * Uses centralized StorageManager for persistence
 *
 * Persists only when the stored entry is stale — a call that finds today's
 * entry already recorded does not write.
 *
 * @returns {Object|null} - Word object for today, or null when no vocabulary is
 *   available (vocabularyDB absent, or every difficulty empty or not yet
 *   lazy-loaded). Callers must handle null.
 */
export const getWordOfTheDay = () => {
  // vocabularyDB is a bare global that arrives with the data scripts, so it can
  // legitimately be undefined here — `typeof` rather than a truthiness test,
  // which would itself throw on an undeclared identifier.
  if (typeof vocabularyDB === 'undefined' || !vocabularyDB) {
    return null;
  }

  const allWords = [
    ...(vocabularyDB.easy || []),
    ...(vocabularyDB.medium || []),
    ...(vocabularyDB.hard || [])
  ];

  // No words at all: `% allWords.length` below would be a modulo by zero and
  // index the array with NaN, yielding an undefined `word` the caller would
  // then dereference.
  if (allWords.length === 0) {
    return null;
  }

  // Create a seed based on today's date
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Use absolute value and mod to get index
  const index = Math.abs(hash) % allWords.length;
  const word = allWords[index];

  // Check if user has seen this word today using centralized storage
  const state = StorageManager.loadState();
  const lastSeen = state.wordOfTheDay;
  const isNew = !lastSeen || lastSeen.date !== dateString;

  const wotdData = {
    word,
    date: dateString,
    isNew
  };

  // Mark as seen — only when the stored entry is missing or from another day.
  // Same condition as isNew: if it is already today's, the write would be a
  // no-op rewrite of an identical value.
  if (isNew) {
    state.wordOfTheDay = { date: dateString, wordId: word.word };
    StorageManager.saveState(state);
  }

  return wotdData;
};

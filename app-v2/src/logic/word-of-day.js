/**
 * Word of the Day
 * Literary Rides VocabPro - Modular Architecture
 *
 * Ported verbatim from js/utils.js:703-754 in Phase 3 with all four known
 * defects intact, so that the port stayed structural and every behaviour
 * change could land as a separate, reviewable commit. Steps 1 and 10b are
 * those commits: defects 1, 3 and 4 are all now fixed. Defect 2 is not
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
 * FIXED IN PHASE 5 (step 10b):
 *
 *   3. Non-standard date key. It built `${getFullYear()}-${getMonth()}-${getDate()}`
 *      — device-local, 0-indexed month, unpadded. 25 July 2026 became
 *      "2026-6-25", which reads as 25 June. That was inert only because the same
 *      wrong formula built both sides of the one comparison it fed; the stored
 *      value was nonetheless a wrong calendar date. The key now comes from
 *      toISTDateKey, so it is a correct padded IST date for the first time, and
 *      the app has one day boundary rather than three.
 *
 *      The padded form is used as-is. DailyGoalsManager had to keep an unpadded
 *      rendering because its keys index stored history that a cached js/ shell
 *      must still find; this value indexes nothing. Nothing anywhere reads the
 *      stored .date, .wordId or .isNew — verified across both trees — so there
 *      was no compatibility obligation, and an existing store holding an
 *      old-format key simply takes one extra write on its next load, exactly as
 *      if corruption salvage had dropped the field.
 *
 *      THIS RE-ROLLS WHICH WORD IS SERVED, for every user including Indian ones,
 *      and that is unavoidable rather than incidental: dateString is also the
 *      hash seed three lines below, so any change to its text changes the index.
 *      Steps 8 and 9 could hold Indian users harmless; this one cannot. Accepted
 *      deliberately — the word is decorative and changes daily anyway.
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
import { toISTDateKey } from './ist-date.js';

/**
 * Get Word of the Day based on date
 * Uses a deterministic algorithm so everyone sees the same word
 * Uses centralized StorageManager for persistence
 *
 * "Everyone" is now literally true. The day key comes from toISTDateKey, a
 * hard-coded UTC+5:30 boundary, so two users in different timezones asking at
 * the same moment get the same word. It used to be seeded from the device's
 * local date, so they did not.
 *
 * Persists only when the stored entry is stale — a call that finds today's
 * entry already recorded does not write.
 *
 * @param {Date|number|string} [instant] - Defaults to now
 * @returns {Object|null} - Word object for today, or null when no vocabulary is
 *   available (vocabularyDB absent, or every difficulty empty or not yet
 *   lazy-loaded). Callers must handle null.
 */
export const getWordOfTheDay = (instant = Date.now()) => {
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

  // Create a seed based on today's date. This string is both the storage key
  // and the hash seed, which is why moving it to IST changes the selection.
  const dateString = toISTDateKey(instant);

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

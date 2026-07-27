/**
 * Word of the Day
 * Literary Rides VocabPro - Modular Architecture
 *
 * Ported verbatim from js/utils.js:703-754, DEFECTS INTACT. This is a
 * deliberate decision, not an oversight: the four problems below are all
 * Phase 5 fixes, preserved here so the port stays structural and any
 * behaviour change is a separate, reviewable commit.
 *
 * PRESERVED DEFECTS — do not "fix" these here:
 *
 *   1. Persists on a get. Despite the name, every call writes
 *      state.wordOfTheDay and calls StorageManager.saveState — even when the
 *      value is unchanged. This is the fourth read-named-but-persists function
 *      in the codebase, after DailyGoalsManager.getTodayProgress,
 *      DailyGoalsManager.isGoalComplete and StreakProtection.getShields.
 *
 *   2. Writes far more often than once a day. Its caller (js/screens.js:120)
 *      is a mount effect on <WordOfTheDay />, which HomeScreen renders
 *      conditionally, so it fires on every return to the home screen rather
 *      than once per day.
 *
 *   3. Non-standard date key. It builds `${getFullYear()}-${getMonth()}-${getDate()}`
 *      — local time, 0-indexed month, unpadded. 25 July 2026 becomes
 *      "2026-6-25", which is incompatible with DailyChallengeManager.getToday()'s
 *      padded UTC ISO string. Two different "today" formats coexist in the app.
 *
 *   4. Unguarded vocabularyDB flatten. It spreads .easy/.medium/.hard with no
 *      `|| []` fallbacks, unlike DailyChallengeManager.generateQuestions, so it
 *      throws if a difficulty has not lazy-loaded yet.
 *
 * ONE STRUCTURAL CHANGE, consistent with the Phase 3 convention and NOT a
 * behaviour change: the original wrapped both storage accesses in
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
 * @returns {Object} - Word object for today
 */
export const getWordOfTheDay = () => {
  const allWords = [...vocabularyDB.easy, ...vocabularyDB.medium, ...vocabularyDB.hard];

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
  let lastSeen = null;
  const state = StorageManager.loadState();
  lastSeen = state.wordOfTheDay;

  const wotdData = {
    word,
    date: dateString,
    isNew: !lastSeen || lastSeen.date !== dateString
  };

  // Mark as seen
  const newWotd = { date: dateString, wordId: word.word };
  const saveState = StorageManager.loadState();
  saveState.wordOfTheDay = newWotd;
  StorageManager.saveState(saveState);

  return wotdData;
};

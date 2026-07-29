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
 *      must still find; this value indexes nothing. At the time of that change
 *      nothing outside this function read the stored .date, .wordId or .isNew —
 *      verified across both trees — so there was no compatibility obligation,
 *      and an existing store holding an old-format key simply takes one extra
 *      write on its next load, exactly as if corruption salvage had dropped the
 *      field. Step 4c-i below makes .wordId a read field; it is still read only
 *      from here, so that conclusion is unaffected.
 *
 *      THIS RE-ROLLS WHICH WORD IS SERVED, for every user including Indian ones,
 *      and that is unavoidable rather than incidental: dateString is also the
 *      hash seed three lines below, so any change to its text changes the index.
 *      Steps 8 and 9 could hold Indian users harmless; this one cannot. Accepted
 *      deliberately — the word is decorative and changes daily anyway.
 *
 * FIXED IN PHASE 5b (step 4c-i):
 *
 *   5. The word changed partway through the day. Not one of the original four;
 *      it only became reachable once app-v2 started loading vocabulary lazily.
 *      The index is `Math.abs(hash) % allWords.length`, and while `hash` is
 *      fixed for the IST day, `allWords` is not: AppShell paints on `easy`
 *      alone (~957 words) and pulls medium and hard in the background
 *      (AppShell.jsx:51-65), taking the flatten to 4,009. Same day, same hash,
 *      different divisor — so a call before the background load and a call
 *      after it selected different words, and the second one also re-rendered
 *      the card under the user.
 *
 *      THE STORED wordId IS NOW READ BACK, which is what makes the word stable.
 *      When state.wordOfTheDay records today's date key, the word it names is
 *      looked up in the current flatten by `w.word === lastSeen.wordId` and
 *      returned as-is; the hash is not recomputed and nothing is written. The
 *      selection therefore happens exactly once per IST day, on the first call,
 *      and every later call that day replays it. Before this, wordId was
 *      write-only — the staleness test read .date and never .wordId, so a wrong
 *      value could never be detected, let alone corrected.
 *
 *      A stored wordId absent from the current flatten falls through to the
 *      recompute deliberately. It is what a shrinking or reordered database
 *      produces, and serving a word that is no longer in the pool is worse than
 *      re-rolling: the recompute re-stamps the store, so the day self-heals to
 *      one stable word rather than re-rolling on every subsequent call.
 *
 *      This makes the flatten load-bearing for the read path, so the lookup must
 *      run against the SAME allWords the recompute would use — hence the flatten
 *      and both its null guards now sit above the stored-entry check.
 *
 * CALLER-SIDE, NOT FIXABLE IN THIS MODULE — must be carried into the component
 * rebuild:
 *
 *   2. Called far more often than once a day. Its caller (js/screens.js:120)
 *      is a mount effect on <WordOfTheDay />, which HomeScreen renders
 *      conditionally, so it fires on every return to the home screen rather
 *      than once per day. Fix 1 means those repeat calls no longer each cost a
 *      write, and fix 5 means they no longer cost a rehash, but they still cost
 *      a loadState, a full flatten of vocabularyDB and a linear scan of it every
 *      time. The remedy belongs in the component.
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
 * Stable for the whole IST day: the first call of the day selects and records a
 * word, and every later call that day returns that same word by looking its id
 * up in the current flatten, however much vocabularyDB has grown in between.
 *
 * Persists only when the stored entry is stale — a call that finds today's
 * entry already recorded, and can still resolve the word it names, does not
 * write.
 *
 * @param {Date|number|string} [instant] - Defaults to now
 * @returns {{word: Object, date: string, isNew: boolean}|null} - Today's word,
 *   the padded IST day key it was chosen for, and whether this call is what
 *   chose it. `isNew` is true only on the call that writes: the first of the
 *   day, or one that had to re-select because the stored id is no longer in the
 *   flatten. Null when no vocabulary is available (vocabularyDB absent, or every
 *   difficulty empty or not yet lazy-loaded). Callers must handle null.
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

  // Check if user has seen this word today using centralized storage
  const state = StorageManager.loadState();
  const lastSeen = state.wordOfTheDay;

  // Replay today's already-chosen word rather than re-deriving it. The index
  // below divides by allWords.length, which grows as the background load lands,
  // so re-deriving mid-day would hand back a different word — see fix 5 in the
  // header. Resolved against the flatten built above, so this and the recompute
  // can never disagree about which pool they are addressing.
  if (lastSeen && lastSeen.date === dateString && lastSeen.wordId) {
    const storedWord = allWords.find(w => w.word === lastSeen.wordId);

    // A plain .find, first match wins. A word string that appears in two
    // difficulties resolves to the earlier one, which is deterministic for a
    // given flatten and is the same record the recompute would have stored.
    if (storedWord) {
      return {
        word: storedWord,
        date: dateString,
        isNew: false
      };
    }

    // Stored id not in the current flatten: fall through and re-select. The
    // recompute re-stamps the store, so the day settles on one word instead of
    // re-rolling on every call.
  }

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

  // Mark as seen. Reaching here means the stored entry was missing, from
  // another day, or named a word this flatten cannot resolve — in all three
  // cases the value on disk is not today's answer, so the write is never a
  // no-op rewrite of an identical value.
  state.wordOfTheDay = { date: dateString, wordId: word.word };
  StorageManager.saveState(state);

  return {
    word,
    date: dateString,
    isNew: true
  };
};

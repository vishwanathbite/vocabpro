/**
 * Daily Challenge Manager
 * Literary Rides VocabPro - Modular Architecture
 * Handles persistence, streak tracking, and question generation
 *
 * ESM port of the inline DailyChallengeManager from js/app.js:153-387, which
 * Phase 3 missed because it ported files rather than code. StorageManager and
 * the seeded PRNG helpers are now imported rather than read off the global
 * script scope; the window.DailyChallengeManager assignment at js/app.js:389 is
 * dropped.
 *
 * Kept as an object literal with `this` dispatch — it makes 12 internal `this.`
 * calls, so destructuring its methods, converting them to standalone functions,
 * or turning this into a class would all break it.
 *
 * vocabularyDB is referenced only INSIDE method bodies, never at module top
 * level, following the quiz-generation.js precedent — so the module imports
 * safely even though that global is undefined at import time.
 *
 * ---------------------------------------------------------------------------
 * PRESERVED DEFECTS — deliberate, all Phase 5 work. Not oversights:
 *
 *   1. FIXED in Phase 5 step 8 — timezone incoherence. getToday() used
 *      new Date().toISOString() (UTC) while getStreak, getYesterdayResult and
 *      completeChallenge computed "yesterday" with setDate() in LOCAL time
 *      before converting to UTC, so the challenge reset at 05:30 IST rather
 *      than midnight and two timebases met in one comparison.
 *
 *      Every day key in this file now comes from toISTDateKey, a hard-coded
 *      UTC+5:30 boundary applied universally rather than the device's zone —
 *      the challenge is a shared event, so a user in Dubai gets the same
 *      challenge on the same date as one in Pune. DST is a non-issue: India has
 *      observed none since 1945, so a day is always exactly 24 hours and the
 *      one-day and thirty-day steps are flat millisecond subtractions.
 *
 *      Still outstanding, tracked separately: DailyGoalsManager.getTodayKey and
 *      getWordOfTheDay build their own unpadded local-time keys, so the app as a
 *      whole still holds more than one notion of "today".
 *
 *   2. completeChallenge mutates the loadData cache in place. When
 *      state.dailyChallenge exists, loadData returns a live reference into
 *      StorageManager's memoryState, and completeChallenge then writes to it
 *      directly — including `delete data.history[dateKey]` during the 30-day
 *      prune — before saveData reassigns and persists. Same aliasing class as
 *      the updateStats bug fixed in step 3, but with no observable symptom
 *      because the save follows immediately.
 *
 *   3. loadData's `||` fallback returns a fresh literal that is NOT attached to
 *      state. Mutations to that object vanish unless saveData is called.
 *      completeChallenge does call it, so the live path is safe.
 *
 *   4. generateQuestions is deterministic in SELECTION but not pure — every
 *      question it builds carries startTime: Date.now().
 *
 *   5. seededSample under-delivers rather than throwing when n exceeds the
 *      pool. If a vocabularyDB difficulty has not lazy-loaded, generateQuestions
 *      silently returns fewer than DAILY_CHALLENGE_QUESTIONS instead of failing
 *      — a missing `easy` costs 4 of the 10, a missing `medium` or `hard` 3
 *      each. Nothing logs and nothing throws; a short plan simply produces a
 *      short question list.
 *
 *      STILL TRUE OF THIS FUNCTION, and now unreachable from the app.
 *      startDailyChallenge awaits all three levels before calling it and
 *      refuses to start a short challenge, so no student can be served one.
 *      The guard is deliberately at the launcher rather than here: this
 *      function is pure and synchronous and cannot await anything, and the
 *      launcher is where "not loaded yet" can be told apart from "loaded and
 *      empty" — exactly the distinction startQuiz.js:106-112 records.
 * ---------------------------------------------------------------------------
 */

import { StorageManager, createDefaultDailyChallenge } from './storage.js';
import { POINTS_CONFIG } from './gamification.js';
import { generateSmartDistractors } from './helpers.js';
import { seededRandom, seededShuffle, seededSample } from './seeded-random.js';
import { toISTDateKey, epochMsOf, DAY_MS, HISTORY_RETENTION_MS } from './ist-date.js';

/**
 * THE SHAPE OF A DAILY CHALLENGE. One row per difficulty, in draw order.
 *
 * `modes` IS ALSO THE COUNT — the number of words drawn from a difficulty is
 * the length of its modes array, because the two must agree and a separate
 * count field is the second number that eventually disagrees with the first.
 * This replaces three inline seededSample calls with the quotas written as
 * literals; a difficulty is retuned by adding or removing a mode here and
 * nothing else changes.
 *
 * Modes are index-mapped WITHIN a row, so a short pool drops the tail of its
 * own row and cannot shift another row's difficulty or price.
 *
 * The mix is 5 vocab / 3 synonym / 2 antonym across the ten.
 */
const DAILY_PLAN = [
  { difficulty: 'easy', modes: ['vocab', 'synonym', 'vocab', 'antonym'] },
  { difficulty: 'medium', modes: ['synonym', 'vocab', 'antonym'] },
  { difficulty: 'hard', modes: ['vocab', 'vocab', 'synonym'] }
];

/**
 * How many questions a daily challenge holds. DERIVED, never written down.
 *
 * LearnScreen carried its own `CHALLENGE_QUESTIONS = 10` because this module
 * exported no count and the only way to learn the real number was to generate
 * the questions. Its own comment asked for this export. The card now reads this
 * value, so the announced count and the served count cannot drift.
 *
 * It is the INTENDED length, not a promise about any particular call: a
 * challenge generated against a pool that has not loaded returns fewer. That is
 * why startDailyChallenge awaits all three levels before generating, rather
 * than trusting this number.
 */
export const DAILY_CHALLENGE_QUESTIONS = DAILY_PLAN.reduce(
  (total, group) => total + group.modes.length,
  0
);

const DailyChallengeManager = {
  /**
   * Today's day key, on the IST boundary.
   *
   * Was `new Date().toISOString()` — a UTC key, which reset the challenge at
   * 05:30 IST rather than midnight. The instant is injectable so the boundary is
   * testable without faking global Date, following the nowISO convention from
   * updateStats and awardWeeklyShieldIfDue.
   *
   * @param {Date|number|string} [instant] - Defaults to now
   */
  getToday(instant = Date.now()) {
    return toISTDateKey(instant);
  },

  /**
   * Today's date as a display string, on the same IST boundary as the key.
   *
   * Was `new Date()` formatted in the DEVICE's timezone, which after the IST
   * conversion would have disagreed with the challenge actually being served:
   * a device in Auckland at 09:00 local on 29 July gets the 2026-07-28 IST
   * challenge but would have displayed "Wednesday, July 29".
   *
   * Derived FROM toISTDateKey rather than from its own arithmetic, so the label
   * and the key cannot drift apart. timeZone: 'UTC' stops the formatter
   * re-applying the device offset to a value that already carries the IST one.
   *
   * @param {Date|number|string} [instant] - Defaults to now
   */
  getTodayFormatted(instant = Date.now()) {
    const d = new Date(`${toISTDateKey(instant)}T00:00:00Z`);
    return d.toLocaleDateString('en-US', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'
    });
  },

  loadData() {
    const state = StorageManager.loadState();
    /* The fallback shape is storage.js's, not a second copy of it. Still a
       fresh object per call — see defect 3 in the header: this literal is not
       attached to state, so anything written to it is lost unless saveData
       follows, and sharing one object between callers would turn that into a
       leak between them. */
    return state.dailyChallenge || createDefaultDailyChallenge();
  },

  saveData(data) {
    const state = StorageManager.loadState();
    state.dailyChallenge = data;
    StorageManager.saveState(state);
  },

  isCompletedToday() {
    const data = this.loadData();
    return data.lastCompletedDate === this.getToday();
  },

  getTodayResult() {
    const data = this.loadData();
    return data.history[this.getToday()] || null;
  },

  /**
   * Current streak, or 0 if it has lapsed.
   *
   * Semantics are unchanged: the stored streak survives while lastCompletedDate
   * is today or yesterday, and is otherwise considered broken. Only the timebase
   * moved.
   *
   * What it did before: `today` came from getToday() (UTC), while `yesterday`
   * was built by taking the current instant, decrementing its LOCAL day-of-month
   * with setDate, then converting to UTC with toISOString. Two timebases in one
   * comparison. On a device whose local date already differs from the UTC date
   * at that instant, the two could disagree by a day — yesterdayStr could even
   * equal today — so a streak could be read as broken while it was intact.
   *
   * Both keys now come from toISTDateKey. The one-day step is a flat
   * subtraction of 86,400,000 ms, which is exact here because IST is a fixed
   * offset with no daylight saving; it always lands on the previous IST calendar
   * day. Note this is a single step, not a walk — getStreak only ever inspects
   * today and yesterday.
   *
   * @param {Date|number|string} [instant] - Defaults to now
   */
  getStreak(instant = Date.now()) {
    const data = this.loadData();
    const nowMs = epochMsOf(instant);
    const today = toISTDateKey(nowMs);
    const yesterdayStr = toISTDateKey(nowMs - DAY_MS);

    if (data.lastCompletedDate === today) {
      return data.streak;
    }
    if (data.lastCompletedDate === yesterdayStr) {
      return data.streak;
    }
    return 0;
  },

  getBestStreak() {
    return this.loadData().bestStreak || 0;
  },

  /**
   * Yesterday's result record, or null.
   *
   * Semantics unchanged — a single lookup of history[yesterday]. Before, the
   * key was the UTC date of the instant one LOCAL day earlier; now it is the
   * previous IST calendar day, so it addresses the same keyspace
   * completeChallenge writes.
   *
   * @param {Date|number|string} [instant] - Defaults to now
   */
  getYesterdayResult(instant = Date.now()) {
    const yesterdayStr = toISTDateKey(epochMsOf(instant) - DAY_MS);
    const data = this.loadData();
    return data.history[yesterdayStr] || null;
  },

  /**
   * Record today's result and advance the streak.
   *
   * Streak and pruning SEMANTICS are untouched; only the timebase moved. The
   * three-way branch is byte-for-byte the same test it always was — continue on
   * yesterday, hold on today, otherwise reset to 1 — and the prune still drops
   * keys strictly older than the cutoff, keeping the same 30-day span.
   *
   * What changed, and why it had to: `today` already came from getToday(), which
   * step 8 moved to IST, but `yesterday` and `cutoff` were still the UTC dates of
   * instants one and thirty LOCAL days earlier. Storing an IST key and comparing
   * it against a UTC-derived yesterday put them two days apart anywhere in the
   * 00:00-05:30 IST window, so completeChallenge fell through to the reset branch
   * and set an unbroken streak back to 1 — while getStreak, already converted,
   * reported it intact. The prune had the matching flaw, discarding history a day
   * early against IST keys. Both now derive from toISTDateKey off one instant.
   *
   * @param {Date|number|string} [instant] - Defaults to now
   */
  completeChallenge(score, total, points, instant = Date.now()) {
    const data = this.loadData();
    const nowMs = epochMsOf(instant);
    const today = this.getToday(nowMs);
    const yesterdayStr = toISTDateKey(nowMs - DAY_MS);

    // Calculate streak
    let newStreak;
    if (data.lastCompletedDate === yesterdayStr) {
      newStreak = data.streak + 1;
    } else if (data.lastCompletedDate === today) {
      newStreak = data.streak; // Already completed today
    } else {
      newStreak = 1; // Streak reset
    }

    data.lastCompletedDate = today;
    data.streak = newStreak;
    data.bestStreak = Math.max(data.bestStreak || 0, newStreak);
    data.history[today] = { score, total, points };

    // Cleanup: keep only the retention window, the same one the goals cleanup
    // and the quota-recovery trim use.
    const cutoffStr = toISTDateKey(nowMs - HISTORY_RETENTION_MS);
    for (const dateKey of Object.keys(data.history)) {
      if (dateKey < cutoffStr) {
        delete data.history[dateKey];
      }
    }

    this.saveData(data);
    return { streak: newStreak, bestStreak: data.bestStreak };
  },

  /**
   * Generate deterministic daily challenge questions.
   * Same date = same questions for every user.
   *
   * That promise is now actually kept. Word selection and option order were
   * always seeded, but distractors came from generateSmartDistractors, which
   * drew on Math.random — so every user saw different options, and they were
   * reshuffled on every remount. Phase 5 step 7a made that RNG injectable;
   * step 7b passes the date-seeded rng into all three call sites below.
   *
   * ALL VOCABULARY, and DAILY_PLAN is the whole set. The
   * two appended idiom questions are gone with idiomsDB: idioms are cut from
   * app-v2 and idioms.js was never ported (data/loader.js), so the only way
   * that block could ever have fired was a stray global — and the daily
   * challenge must not be the one screen where a student still meets an idiom.
   * While it stood, a loaded idiomsDB served 12 questions, not the 10 the plan
   * was rebalanced to deliver.
   */
  generateQuestions() {
    // Same defensive check as quiz-generation.js:33. Without it the flatten
    // below throws outright when the data scripts have not landed; the || []
    // fallbacks only cover a missing difficulty, not a missing database.
    if (typeof vocabularyDB === 'undefined' || !vocabularyDB) {
      console.error('vocabularyDB is not defined');
      return [];
    }

    const today = this.getToday();
    const rng = seededRandom('vocabpro-daily-' + today);

    // Draw each row's words and pair them with the mode and difficulty of the
    // slot they were selected for, at selection time.
    //
    // The rows are drawn IN ORDER, one seededSample per row, which is the same
    // sequence of rng draws the three inline calls made — so the questions for
    // a given date are unchanged by moving the quotas into DAILY_PLAN.
    const plan = DAILY_PLAN.flatMap(group => {
      const pool = [...(vocabularyDB[group.difficulty] || [])];
      const words = seededSample(pool, group.modes.length, rng);
      return words.map((word, i) => ({
        word,
        mode: group.modes[i],
        difficulty: group.difficulty
      }));
    });

    const allVocab = [...(vocabularyDB.easy || []), ...(vocabularyDB.medium || []), ...(vocabularyDB.hard || [])];

    const questions = plan.map(({ word, mode: questionMode, difficulty: questionDifficulty }) => {
      if (!word || !word.word) return null;

      if (questionMode === 'synonym') {
        if (!word.synonyms || word.synonyms.length === 0) {
          // Fall back to vocab mode
          const distractors = generateSmartDistractors(word.definition, allVocab, 3, rng);
          const options = seededShuffle([word.definition, ...distractors], rng);
          return {
            question: `What is the meaning of "${word.word}"?`,
            options, correct: word.definition, wordData: word, word: word.word,
            dailyMode: 'Vocabulary', difficulty: questionDifficulty, startTime: Date.now()
          };
        }
        const correctSyn = word.synonyms[Math.floor(rng() * word.synonyms.length)];
        const synPool = [];
        for (const w of allVocab) {
          if (w.synonyms && w.word !== word.word) {
            for (const s of w.synonyms) {
              if (!word.synonyms.includes(s) && !synPool.includes(s)) synPool.push(s);
            }
          }
        }
        const distractors = seededSample(synPool, 3, rng);
        const options = seededShuffle([correctSyn, ...distractors], rng);
        return {
          question: word.word, options, correct: correctSyn, wordData: word, word: word.word,
          dailyMode: 'Synonym', difficulty: questionDifficulty, startTime: Date.now()
        };
      }

      if (questionMode === 'antonym') {
        if (!word.antonyms || word.antonyms.length === 0) {
          const distractors = generateSmartDistractors(word.definition, allVocab, 3, rng);
          const options = seededShuffle([word.definition, ...distractors], rng);
          return {
            question: `What is the meaning of "${word.word}"?`,
            options, correct: word.definition, wordData: word, word: word.word,
            dailyMode: 'Vocabulary', difficulty: questionDifficulty, startTime: Date.now()
          };
        }
        const correctAnt = word.antonyms[Math.floor(rng() * word.antonyms.length)];
        const antPool = [];
        for (const w of allVocab) {
          if (w.antonyms && w.word !== word.word) {
            for (const a of w.antonyms) {
              if (!word.antonyms.includes(a) && !antPool.includes(a)) antPool.push(a);
            }
          }
        }
        const distractors = seededSample(antPool, 3, rng);
        const options = seededShuffle([correctAnt, ...distractors], rng);
        return {
          question: word.word, options, correct: correctAnt, wordData: word, word: word.word,
          dailyMode: 'Antonym', difficulty: questionDifficulty, startTime: Date.now()
        };
      }

      // Default: vocab mode
      const distractors = generateSmartDistractors(word.definition, allVocab, 3, rng);
      const options = seededShuffle([word.definition, ...distractors], rng);
      return {
        question: `What is the meaning of "${word.word}"?`,
        options, correct: word.definition, wordData: word, word: word.word,
        dailyMode: 'Vocabulary', difficulty: questionDifficulty, startTime: Date.now()
      };
    }).filter(q => q !== null);

    // Final shuffle
    return seededShuffle(questions, rng);
  },

  /**
   * Calculate points for daily challenge results
   *
   * THE SIGNATURE CHANGED WITH ITS FIRST CALLER, which is the whole reason the
   * fix waited for this commit.
   *
   * It used to take `(correctCount, totalQuestions, questions, streak)` and
   * charge `questions[0 .. correctCount-1]` — the FIRST n questions, whatever
   * the student actually got right. Answering the three hard questions of a ten
   * correctly paid for whichever three happened to sit at the front of the
   * shuffled array. A count cannot say WHICH, so no amount of care at the call
   * site could have fixed it; it needed the per-question outcomes, and there was
   * no caller to supply them.
   *
   * `outcomes` is a boolean array ALIGNED TO `questions` — outcomes[i] is
   * whether questions[i] was answered correctly. Index alignment against the
   * shuffled array is the contract; the caller records outcomes by the index it
   * is currently displaying, so the two cannot come apart. correctCount and
   * totalQuestions are derived here rather than passed, because a caller that
   * can pass both a count and the outcomes it was counted from can pass two
   * numbers that disagree.
   *
   * `streak` IS INJECTED AND HAS NO DEFAULT. It used to default to
   * `this.getStreak()`, a storage read inside an otherwise pure scoring
   * function; the caller reads it from completeChallenge, which is the value
   * actually being awarded for.
   */
  calculateDailyPoints({ questions, outcomes, streak }) {
    /* A CHALLENGE WITH NO QUESTIONS PAYS NOTHING AT ALL.
     *
     * The perfect-score test below is `correctCount === totalQuestions`, which
     * reads 0 === 0 as a perfect run — so an empty challenge collected the full
     * 50-point bonus for answering nothing, exactly the way an empty quiz
     * session would have read as 100% accuracy in summarizeQuizResults.
     *
     * ZERO OUTRIGHT, not "streak bonus without the perfect bonus". The streak
     * bonus is paid for COMPLETING a challenge on consecutive days, and a
     * challenge with no questions was not completed — it was never posed. Paying
     * it would be the same defect at a different number, and a worse one: at
     * `Math.min(streak * 10, 100)` a long-streak user would collect up to 100
     * points from an empty challenge where the perfect bonus gave 50.
     *
     * Written as `!(totalQuestions > 0)` rather than `<= 0` so that a NaN or
     * undefined total — which compares false against everything and would
     * otherwise slip past both this guard and the perfect-score test, while the
     * loop below still charged for correctCount questions — also returns 0.
     */
    const list = Array.isArray(questions) ? questions : [];
    const totalQuestions = list.length;
    if (!(totalQuestions > 0)) {
      return 0;
    }

    const results = Array.isArray(outcomes) ? outcomes : [];

    /* CHARGES THE QUESTIONS ACTUALLY ANSWERED CORRECTLY.
     *
     * Walks `questions` and prices only the indices `outcomes` marks true, so a
     * student who got the three hard ones right is paid for three hard ones. An
     * index the caller never recorded is not true and is therefore not charged
     * — an abandoned challenge pays for what was answered, not for a prefix.
     *
     * Compared with `=== true` rather than for truthiness: an outcomes array
     * carrying anything other than booleans is a caller bug, and the safe
     * direction for a malformed entry is the one that does not pay out.
     *
     * PRICES READ FROM POINTS_CONFIG. This was a hand-written
     * `10 base / +5 medium / +10 hard`, which is that table's easy/medium/hard
     * spelled as arithmetic — the same numbers, in a second place, where a
     * retune of the quiz prices would have silently left the challenge behind.
     * POINTS_CONFIG.daily is the fallback for a question with no difficulty of
     * its own, which is the key's first reader; it is 10, the same value the
     * old `const diff = q ? q.difficulty : 'easy'` fallback resolved to.
     */
    let points = 0;
    let correctCount = 0;
    for (let i = 0; i < totalQuestions; i++) {
      if (results[i] !== true) continue;
      correctCount += 1;
      points += POINTS_CONFIG[list[i]?.difficulty] ?? POINTS_CONFIG.daily;
    }
    // Perfect score bonus
    if (correctCount === totalQuestions) {
      points += 50;
    }
    /* Streak bonus. Guarded rather than trusted: `streak` is now required, and
       an omitted one would make `Math.min(undefined * 10, 100)` NaN and poison
       the whole total silently. A missing streak pays no streak bonus. */
    points += Number.isFinite(streak) ? Math.min(streak * 10, 100) : 0;
    return points;
  }
};

export { DailyChallengeManager };

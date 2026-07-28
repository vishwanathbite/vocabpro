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
 * vocabularyDB and idiomsDB are referenced only INSIDE method bodies, never at
 * module top level, following the quiz-generation.js precedent — so the module
 * imports safely even though those globals are undefined at import time.
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
 *      pool. If idiomsDB has not lazy-loaded, the challenge silently serves
 *      fewer than the intended 10 questions instead of failing.
 * ---------------------------------------------------------------------------
 */

import { StorageManager } from './storage.js';
import { generateSmartDistractors } from './helpers.js';
import { seededRandom, seededShuffle, seededSample } from './seeded-random.js';
import { toISTDateKey, epochMsOf, DAY_MS } from './ist-date.js';

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
    return state.dailyChallenge || { lastCompletedDate: null, streak: 0, bestStreak: 0, history: {} };
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

    // Cleanup: keep only last 30 days
    const cutoffStr = toISTDateKey(nowMs - 30 * DAY_MS);
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
   * KNOWN GAP, deliberately not closed here: with idiomsDB absent this returns
   * 8 questions rather than 10, silently. The live app treats that as
   * acceptable — js/app.js:1557 preloads idioms with
   * `catch (e) { /* non-critical — challenge works without idioms *\/ }` — and
   * idioms are scheduled for removal from this app at Phase 6, at which point
   * the mix should be rebalanced to ten vocabulary-sourced questions. Guarding
   * it here would either contradict that live intent or build a guard due for
   * deletion in one phase.
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

    const easyPool = [...(vocabularyDB.easy || [])];
    const mediumPool = [...(vocabularyDB.medium || [])];
    const hardPool = [...(vocabularyDB.hard || [])];

    // Pick 3 easy, 3 medium, 2 hard words + 2 idioms
    const easyWords = seededSample(easyPool, 3, rng);
    const mediumWords = seededSample(mediumPool, 3, rng);
    const hardWords = seededSample(hardPool, 2, rng);

    // Pick 2 idiom questions
    const idiomPool = typeof idiomsDB !== 'undefined' && Array.isArray(idiomsDB) ? [...idiomsDB] : [];
    const idiomWords = seededSample(idiomPool, 2, rng);

    // Pair each word with the mode and difficulty of the slot it was selected
    // for, at selection time.
    //
    // This used to be two flat length-8 arrays index-mapped onto the combined
    // word list. That mapping was only correct while every pool delivered its
    // full quota: if easyPool yielded 2 words instead of 3, every later word
    // slid one slot left, so a word drawn from hardPool could be labelled
    // 'medium' and score 5 points instead of 10 in calculateDailyPoints. The
    // grouping below cannot slide — a word carries its own group's difficulty
    // whatever the other pools return. For full pools it produces exactly the
    // same eight pairings as before.
    const plan = [
      { words: easyWords, difficulty: 'easy', modes: ['vocab', 'synonym', 'vocab'] },
      { words: mediumWords, difficulty: 'medium', modes: ['synonym', 'vocab', 'antonym'] },
      { words: hardWords, difficulty: 'hard', modes: ['vocab', 'vocab'] }
    ].flatMap(group =>
      group.words.map((word, i) => ({
        word,
        mode: group.modes[i],
        difficulty: group.difficulty
      }))
    );

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

    // Generate idiom questions
    const idiomQuestions = idiomWords.map(item => {
      if (!item || !item.idiom || !item.meaning) return null;
      const distractorPool = idiomPool
        .filter(d => d.meaning !== item.meaning)
        .map(d => d.meaning);
      const distractors = seededSample(distractorPool, 3, rng);
      const options = seededShuffle([item.meaning, ...distractors], rng);
      return {
        question: item.idiom,
        options, correct: item.meaning, wordData: item, word: item.idiom,
        dailyMode: 'Idiom', difficulty: item.difficulty || 'medium', startTime: Date.now()
      };
    }).filter(q => q !== null);

    // Final shuffle
    return seededShuffle([...questions, ...idiomQuestions], rng);
  },

  /**
   * Calculate points for daily challenge results
   *
   * `streak` is an additive optional parameter, following the nowISO precedent
   * from step 2: omitted it defaults to this.getStreak() and behaviour is
   * byte-identical to the original; supplied, the function touches no storage
   * and becomes deterministic and testable.
   */
  calculateDailyPoints(correctCount, totalQuestions, questions, streak = this.getStreak()) {
    let points = 0;
    // Base points per correct answer with difficulty bonus
    for (let i = 0; i < correctCount; i++) {
      const q = questions[i];
      const diff = q ? q.difficulty : 'easy';
      points += 10; // base
      if (diff === 'medium') points += 5;
      if (diff === 'hard') points += 10;
    }
    // Perfect score bonus
    if (correctCount === totalQuestions) {
      points += 50;
    }
    // Streak bonus
    points += Math.min(streak * 10, 100);
    return points;
  }
};

export { DailyChallengeManager };

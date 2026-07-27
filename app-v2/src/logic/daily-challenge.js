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
 *   1. Timezone incoherence. getToday() uses new Date().toISOString() (UTC),
 *      while getStreak/getYesterdayResult/completeChallenge compute "yesterday"
 *      with setDate() in LOCAL time before converting to UTC. At UTC+5:30 the
 *      challenge therefore resets at 05:30 local rather than midnight. No DST
 *      or clock-change handling anywhere.
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

const DailyChallengeManager = {
  getToday() {
    return new Date().toISOString().split('T')[0];
  },

  getTodayFormatted() {
    const d = new Date();
    return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
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

  getStreak() {
    const data = this.loadData();
    const today = this.getToday();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

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

  getYesterdayResult() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const data = this.loadData();
    return data.history[yesterdayStr] || null;
  },

  completeChallenge(score, total, points) {
    const data = this.loadData();
    const today = this.getToday();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

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
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    const cutoffStr = cutoff.toISOString().split('T')[0];
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
   */
  generateQuestions() {
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

    // Combine all and assign modes
    const allWords = [...easyWords, ...mediumWords, ...hardWords];
    const modes = ['vocab', 'synonym', 'vocab', 'synonym', 'vocab', 'antonym', 'vocab', 'vocab'];
    const difficulties = ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'hard', 'hard'];

    const allVocab = [...(vocabularyDB.easy || []), ...(vocabularyDB.medium || []), ...(vocabularyDB.hard || [])];

    const questions = allWords.map((word, i) => {
      if (!word || !word.word) return null;
      const questionMode = modes[i];
      const questionDifficulty = difficulties[i];

      if (questionMode === 'synonym') {
        if (!word.synonyms || word.synonyms.length === 0) {
          // Fall back to vocab mode
          const distractors = generateSmartDistractors(word.definition, allVocab, 3);
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
          const distractors = generateSmartDistractors(word.definition, allVocab, 3);
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
      const distractors = generateSmartDistractors(word.definition, allVocab, 3);
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

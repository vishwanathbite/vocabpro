/**
 * Quiz Question Generation
 * Literary Rides VocabPro - Modular Architecture
 *
 * Question generator lifted from the App component in js/app.js
 * (generateQuestions, app.js:925-1218). Calls no setState and closes over no
 * React state — it reads the global vocabulary DBs and uses module-layer
 * helpers/managers, returning an array of question objects.
 *
 * NO LONGER VERBATIM as of the SM-2 retirement. Two things changed: the useSRS
 * parameter and its seven selectSRSOptimizedWords ternaries are gone, so every
 * ordinary quiz now samples randomly from its difficulty pool as it always
 * claimed to; and the 'review' branch draws from stats.reviewPool instead of
 * SRSManager.getDueWords. js/ still has the original and is not being changed.
 *
 * The global DBs (vocabularyDB / oneWordDB / acronymsDB / idiomsDB) are still
 * referenced as runtime globals exactly as in the source; they are only touched
 * INSIDE the function body (never at module top level), so the module loads
 * safely even though those globals are undefined at import time. Wiring real
 * data is a later concern.
 */

import {
  shuffleArray,
  sample,
  randomItem,
  generateSmartDistractors,
  buildSynonymPool,
  buildAntonymPool
} from './helpers.js';
import { BookmarksManager } from './bookmarks.js';
import { StatsManager } from './gamification.js';

/**
 * Questions per quiz. THE SINGLE SOURCE — exported so nothing has to restate it.
 *
 * It was previously a bare local here while srs.js carried three more copies as
 * default parameters (its limit = 10 on getDueWords and getStrugglingWords, and
 * count = 10 on selectSRSOptimizedWords). Those died with SM-2.
 *
 * Two copies remain outside this module and are NOT yet reading from here:
 * CHALLENGE_QUESTIONS (LearnScreen.jsx:36) and the daily challenge's own 4+3+3
 * split (daily-challenge.js:274-276), both already annotated as second sources
 * at their sites. Reconciling them is the challenge screen's work, not this
 * commit's — the daily challenge deliberately does not serve ten vocabulary
 * questions today.
 */
export const QUESTIONS_PER_QUIZ = 10;

/**
 * Build a question from a stored item, whatever kind it is.
 *
 * Shared by the review and bookmarks branches. Both start from a saved
 * IDENTIFIER rather than a difficulty pool, so both have to cope with a mix of
 * vocabulary words, acronyms and one-word substitutes. The three shapes were
 * already written out once inline for bookmarks; Smart Review needs the same
 * three now that acronyms and one-word substitutes can enter the pool, so this
 * is the one copy rather than a second.
 *
 * @param {Object} item      Vocabulary word, acronym or one-word substitute
 * @param {Array}  vocabPool Flattened vocabulary, for definition distractors
 * @returns {Object|null} A question, or null if the item is not a shape we serve
 */
const buildQuestionFromItem = (item, vocabPool) => {
  if (!item) return null;

  if (item.word && item.definition) {
    const distractors = generateSmartDistractors(item.definition, vocabPool, 3);
    return {
      question: `What is the meaning of "${item.word}"?`,
      options: shuffleArray([item.definition, ...distractors]),
      correct: item.definition,
      wordData: item,
      word: item.word,
      startTime: Date.now()
    };
  }

  if (item.acronym && item.options && item.full) {
    return {
      question: item.acronym,
      options: shuffleArray([...item.options]),
      correct: item.full,
      wordData: item,
      startTime: Date.now()
    };
  }

  if (item.phrase && item.options && item.answer) {
    return {
      question: item.phrase,
      options: shuffleArray([...item.options]),
      correct: item.answer,
      wordData: item,
      startTime: Date.now()
    };
  }

  return null;
};

/**
 * Index every loaded database by the identity expression the rest of the app
 * uses, so a saved id resolves back to its item whatever kind it is.
 *
 * Only what has actually loaded is indexed. AppShell paints on easy vocabulary
 * alone and pulls the rest in behind it, so an id can be genuinely unresolvable
 * at the moment a screen asks — that is a loading state, not a missing word, and
 * the callers below distinguish the two rather than treating a short result as
 * an empty pool.
 *
 * @param {Array} vocabWords Flattened vocabulary, already defaulted by caller
 * @returns {Map<string, Object>} id -> item
 */
const indexLoadedItemsById = (vocabWords) => {
  const byId = new Map();

  const indexable = [
    ...vocabWords,
    ...(typeof acronymsDB !== 'undefined' && Array.isArray(acronymsDB) ? acronymsDB : []),
    ...(typeof oneWordDB !== 'undefined' && Array.isArray(oneWordDB) ? oneWordDB : [])
  ];

  for (const item of indexable) {
    const id = item && (item.word || item.acronym || item.phrase || item.idiom);
    if (id && !byId.has(id)) {
      byId.set(id, item);
    }
  }

  return byId;
};

export function generateQuestions(quizMode, quizDifficulty) {
    const count = QUESTIONS_PER_QUIZ;
    let generatedQuestions = [];

    // Defensive check for vocabularyDB
    if (typeof vocabularyDB === 'undefined') {
      console.error('vocabularyDB is not defined');
      return [];
    }

    if (quizMode === 'vocab') {
      // Vocabulary mode: Definition matching
      const words = vocabularyDB[quizDifficulty] || [];
      if (words.length === 0) {
        console.warn(`No words found for difficulty: ${quizDifficulty}`);
        return [];
      }
      // Use SRS-optimized selection if enabled
      const selectedWords = sample(words, count);

      generatedQuestions = selectedWords.map(word => {
        if (!word || !word.word || !word.definition) return null;
        const distractors = generateSmartDistractors(word.definition, words, 3);
        const options = shuffleArray([word.definition, ...distractors]);

        return {
          question: `What is the meaning of "${word.word}"?`,
          options,
          correct: word.definition,
          wordData: word,
          word: word.word,
          startTime: Date.now()
        };
      }).filter(q => q !== null);
    } else if (quizMode === 'synonym') {
      // Synonym mode
      const words = vocabularyDB[quizDifficulty] || [];
      if (words.length === 0) {
        console.warn(`No words found for difficulty: ${quizDifficulty}`);
        return [];
      }
      const selectedWords = sample(words, count);

      generatedQuestions = selectedWords.map(word => {
        if (!word || !word.word || !word.synonyms || word.synonyms.length === 0) return null;
        const correctSyn = randomItem(word.synonyms);
        if (!correctSyn) return null;
        const allSynonyms = buildSynonymPool(words, word.synonyms);
        const distractors = sample(allSynonyms, 3, new Set([correctSyn]));
        const options = shuffleArray([correctSyn, ...distractors]);

        return {
          question: word.word,
          options,
          correct: correctSyn,
          wordData: word,
          word: word.word,
          startTime: Date.now()
        };
      }).filter(q => q !== null);
    } else if (quizMode === 'antonym') {
      // Antonym mode
      const words = vocabularyDB[quizDifficulty] || [];
      if (words.length === 0) {
        console.warn(`No words found for difficulty: ${quizDifficulty}`);
        return [];
      }
      const selectedWords = sample(words, count);

      generatedQuestions = selectedWords.map(word => {
        if (!word || !word.word || !word.antonyms || word.antonyms.length === 0) return null;
        const correctAnt = randomItem(word.antonyms);
        if (!correctAnt) return null;
        const allAntonyms = buildAntonymPool(words, word.antonyms);
        const distractors = sample(allAntonyms, 3, new Set([correctAnt]));
        const options = shuffleArray([correctAnt, ...distractors]);

        return {
          question: word.word,
          options,
          correct: correctAnt,
          wordData: word,
          word: word.word,
          startTime: Date.now()
        };
      }).filter(q => q !== null);
    } else if (quizMode === 'oneword') {
      // One-word substitutes
      if (typeof oneWordDB === 'undefined' || !Array.isArray(oneWordDB) || oneWordDB.length === 0) {
        console.warn('oneWordDB is not defined or empty');
        return [];
      }
      const selectedItems = sample(oneWordDB, count);

      generatedQuestions = selectedItems.map(item => {
        if (!item || !item.phrase || !item.options || !item.answer) return null;
        const options = shuffleArray([...item.options]);

        return {
          question: item.phrase,
          options,
          correct: item.answer,
          wordData: item,
          startTime: Date.now()
        };
      }).filter(q => q !== null);
    } else if (quizMode === 'acronym') {
      // Acronyms
      if (typeof acronymsDB === 'undefined' || !Array.isArray(acronymsDB) || acronymsDB.length === 0) {
        console.warn('acronymsDB is not defined or empty');
        return [];
      }
      const selectedItems = sample(acronymsDB, count);

      generatedQuestions = selectedItems.map(item => {
        if (!item || !item.acronym || !item.options || !item.full) return null;
        const options = shuffleArray([...item.options]);

        return {
          question: item.acronym,
          options,
          correct: item.full,
          wordData: item,
          startTime: Date.now()
        };
      }).filter(q => q !== null);
    } else if (quizMode === 'idiom') {
      // Idioms mode: Match idiom to meaning
      if (typeof idiomsDB === 'undefined' || !Array.isArray(idiomsDB) || idiomsDB.length === 0) {
        console.warn('idiomsDB is not defined or empty');
        return [];
      }
      // Filter by difficulty if provided
      const idiomPool = quizDifficulty
        ? idiomsDB.filter(item => item.difficulty === quizDifficulty)
        : idiomsDB;
      if (idiomPool.length === 0) {
        console.warn(`No idioms found for difficulty: ${quizDifficulty}`);
        return [];
      }
      const selectedItems = sample(idiomPool, count);

      generatedQuestions = selectedItems.map(item => {
        if (!item || !item.idiom || !item.meaning) return null;
        // Build distractor pool from other idiom meanings
        const distractorPool = idiomsDB
          .filter(d => d.meaning !== item.meaning)
          .map(d => d.meaning);
        const distractors = sample(distractorPool, 3);
        const options = shuffleArray([item.meaning, ...distractors]);

        return {
          question: item.idiom,
          options,
          correct: item.meaning,
          wordData: item,
          word: item.idiom,
          startTime: Date.now()
        };
      }).filter(q => q !== null);
    } else if (quizMode === 'idiom-reverse') {
      // Idioms reverse mode: Show meaning, pick correct idiom
      if (typeof idiomsDB === 'undefined' || !Array.isArray(idiomsDB) || idiomsDB.length === 0) {
        console.warn('idiomsDB is not defined or empty');
        return [];
      }
      const idiomPool = quizDifficulty
        ? idiomsDB.filter(item => item.difficulty === quizDifficulty)
        : idiomsDB;
      if (idiomPool.length === 0) {
        console.warn(`No idioms found for difficulty: ${quizDifficulty}`);
        return [];
      }
      const selectedItems = sample(idiomPool, count);

      generatedQuestions = selectedItems.map(item => {
        if (!item || !item.idiom || !item.meaning) return null;
        const distractorPool = idiomsDB
          .filter(d => d.idiom !== item.idiom)
          .map(d => d.idiom);
        const distractors = sample(distractorPool, 3);
        const options = shuffleArray([item.idiom, ...distractors]);

        return {
          question: item.meaning,
          options,
          correct: item.idiom,
          wordData: item,
          word: item.idiom,
          startTime: Date.now()
        };
      }).filter(q => q !== null);
    } else if (quizMode === 'review') {
      // SMART REVIEW - the words the student got wrong and has not yet answered
      // correctly twice since. stats.reviewPool is the whole source of truth;
      // this branch resolves ids and builds questions, it schedules nothing.
      //
      // Difficulty is deliberately ignored. A pool word is served because it was
      // missed, not because of which pool it came from, so quizDifficulty plays
      // no part here.
      const easyWords = vocabularyDB.easy || [];
      const mediumWords = vocabularyDB.medium || [];
      const hardWords = vocabularyDB.hard || [];
      const allWords = [...easyWords, ...mediumWords, ...hardWords];

      const reviewPool = StatsManager.loadStats().reviewPool;

      // NO PADDING, NO MINIMUM, and a length the caller can act on. An empty
      // pool returns []; a pool of three returns three questions. This is the
      // point of the rewrite: getDueWords returned a full ten whatever the
      // user's history was, so "you have nothing to review" and "here is a
      // normal session" were literally the same value to a caller, and a brand
      // new account was served ten unseen words labelled as review.
      //
      // The caller distinguishes the three cases by comparing what it gets back
      // against StatsManager.loadStats().reviewPool.length:
      //   pool 0                    -> nothing to review, show the empty state
      //   pool > 0, questions > 0   -> a review session, however short
      //   pool > 0, questions 0     -> the words are real but their database has
      //                                not loaded yet; a loading state, not an
      //                                empty one. Warned below.
      if (reviewPool.length === 0) {
        return [];
      }

      const byId = indexLoadedItemsById(allWords);

      // Shuffle BEFORE slicing. Taking the head of the pool would serve the same
      // words in the same order every session for anyone whose pool is larger
      // than one quiz — the identical-first-ten failure the old selector had,
      // reintroduced from the other end.
      const selected = shuffleArray(reviewPool)
        .map(id => byId.get(id))
        .filter(item => item !== undefined)
        .slice(0, count);

      if (selected.length === 0) {
        console.warn(`Review pool holds ${reviewPool.length} word(s) but none are loaded yet`);
      }

      generatedQuestions = selected
        .map(item => buildQuestionFromItem(item, allWords))
        .filter(q => q !== null);
    } else if (quizMode === 'bookmarks') {
      // Bookmarks mode - practice saved words
      const bookmarkedWords = typeof BookmarksManager !== 'undefined' && BookmarksManager.getForPractice
        ? BookmarksManager.getForPractice(count)
        : [];

      if (bookmarkedWords.length === 0) {
        console.warn('No bookmarked words available');
        return [];
      }

      const easyWords = vocabularyDB.easy || [];
      const mediumWords = vocabularyDB.medium || [];
      const hardWords = vocabularyDB.hard || [];
      const allWords = [...easyWords, ...mediumWords, ...hardWords];

      // Same three shapes Smart Review serves, so both go through one builder.
      generatedQuestions = bookmarkedWords
        .map(word => buildQuestionFromItem(word, allWords))
        .filter(q => q !== null);
    }

    // Ensure we always return a valid array
    return generatedQuestions || [];
}

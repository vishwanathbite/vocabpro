/**
 * Quiz Question Generation
 * Literary Rides VocabPro - Modular Architecture
 *
 * Pure question generator lifted verbatim from the App component in js/app.js
 * (generateQuestions, app.js:925-1218). Calls no setState and closes over no
 * React state — it reads the global vocabulary DBs and uses module-layer
 * helpers/managers, returning an array of question objects.
 *
 * The global DBs (vocabularyDB / oneWordDB / acronymsDB / idiomsDB) are still
 * referenced as runtime globals exactly as in the source; they are only touched
 * INSIDE the function body (never at module top level), so the module loads
 * safely even though those globals are undefined at import time. Wiring real
 * data is a later concern.
 */

import { selectSRSOptimizedWords, SRSManager } from './srs.js';
import {
  shuffleArray,
  sample,
  randomItem,
  generateSmartDistractors,
  buildSynonymPool,
  buildAntonymPool
} from './helpers.js';
import { BookmarksManager } from './bookmarks.js';

export function generateQuestions(quizMode, quizDifficulty, useSRS = true) {
    const count = 10; // Number of questions per quiz
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
      const selectedWords = useSRS && typeof selectSRSOptimizedWords === 'function'
        ? selectSRSOptimizedWords(words, count)
        : sample(words, count);

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
      const selectedWords = useSRS && typeof selectSRSOptimizedWords === 'function'
        ? selectSRSOptimizedWords(words, count)
        : sample(words, count);

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
      const selectedWords = useSRS && typeof selectSRSOptimizedWords === 'function'
        ? selectSRSOptimizedWords(words, count)
        : sample(words, count);

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
      const selectedItems = useSRS && typeof selectSRSOptimizedWords === 'function'
        ? selectSRSOptimizedWords(oneWordDB, count)
        : sample(oneWordDB, count);

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
      const selectedItems = useSRS && typeof selectSRSOptimizedWords === 'function'
        ? selectSRSOptimizedWords(acronymsDB, count)
        : sample(acronymsDB, count);

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
      const selectedItems = useSRS && typeof selectSRSOptimizedWords === 'function'
        ? selectSRSOptimizedWords(idiomPool, count)
        : sample(idiomPool, count);

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
      const selectedItems = useSRS && typeof selectSRSOptimizedWords === 'function'
        ? selectSRSOptimizedWords(idiomPool, count)
        : sample(idiomPool, count);

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
      // Review mode - due words across all difficulties
      const easyWords = vocabularyDB.easy || [];
      const mediumWords = vocabularyDB.medium || [];
      const hardWords = vocabularyDB.hard || [];
      const allWords = [...easyWords, ...mediumWords, ...hardWords];

      if (allWords.length === 0) {
        console.warn('No vocabulary words available for review');
        return [];
      }

      const dueWords = typeof SRSManager !== 'undefined' && SRSManager.getDueWords
        ? SRSManager.getDueWords(allWords, count)
        : sample(allWords, count);

      generatedQuestions = dueWords.map(word => {
        if (!word || !word.word || !word.definition) return null;
        const distractors = generateSmartDistractors(word.definition, allWords, 3);
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

      generatedQuestions = bookmarkedWords.map(word => {
        if (!word) return null;
        // Handle different word types (vocab, acronym, oneword)
        if (word.word && word.definition) {
          // Vocabulary word
          const distractors = generateSmartDistractors(word.definition, allWords, 3);
          const options = shuffleArray([word.definition, ...distractors]);

          return {
            question: `What is the meaning of "${word.word}"?`,
            options,
            correct: word.definition,
            wordData: word,
            word: word.word,
            startTime: Date.now()
          };
        } else if (word.acronym && word.options && word.full) {
          // Acronym
          return {
            question: word.acronym,
            options: shuffleArray([...word.options]),
            correct: word.full,
            wordData: word,
            startTime: Date.now()
          };
        } else if (word.phrase && word.options && word.answer) {
          // One-word substitute
          return {
            question: word.phrase,
            options: shuffleArray([...word.options]),
            correct: word.answer,
            wordData: word,
            startTime: Date.now()
          };
        }
        return null;
      }).filter(q => q !== null);
    }

    // Ensure we always return a valid array
    return generatedQuestions || [];
}

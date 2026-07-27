/**
 * Spaced Repetition System (SRS)
 * Literary Rides VocabPro - Learning Enhancement
 * Implements SM-2 algorithm for optimal vocabulary retention
 */

// ESM port of js/srs.js. StorageManager and shuffleArray are now imported
// rather than sniffed off / assumed on the global `window`. shuffleArray
// resolves to the same pure function extracted verbatim into helpers.js.
import { StorageManager } from './storage.js';
import { shuffleArray } from './helpers.js';

// ===========================
// SRS CONFIGURATION
// ===========================

/**
 * SM-2 Algorithm intervals (in days)
 * Based on SuperMemo 2 algorithm
 */
const SRS_INTERVALS = [0, 1, 3, 7, 14, 30, 60, 120]; // Days until next review

/**
 * Quality ratings for SM-2
 * 0-2: Incorrect/Hard (reset)
 * 3: Correct with difficulty
 * 4: Correct with hesitation
 * 5: Perfect recall
 */
const QUALITY_RATINGS = {
  BLACKOUT: 0,      // Complete failure
  INCORRECT: 1,     // Incorrect but recognized
  HARD: 2,          // Correct but very difficult
  GOOD: 3,          // Correct with difficulty
  EASY: 4,          // Correct with hesitation
  PERFECT: 5        // Perfect response
};

// ===========================
// SRS DATA STRUCTURE
// ===========================

/**
 * Create initial SRS data for a word
 * @param {string} wordId - Unique word identifier
 * @returns {Object} - SRS data object
 */
const createSRSEntry = (wordId) => ({
  wordId,
  easeFactor: 2.5,        // SM-2 ease factor (starts at 2.5)
  interval: 0,            // Current interval in days
  repetitions: 0,         // Number of successful repetitions
  nextReviewDate: null,   // Next scheduled review
  lastReviewDate: null,   // Last review timestamp
  history: [],            // Review history
  quality: null,          // Last quality rating
  totalReviews: 0,        // Total times reviewed
  correctCount: 0,        // Total correct answers
  incorrectCount: 0       // Total incorrect answers
});

// ===========================
// SM-2 ALGORITHM
// ===========================

/**
 * Calculate next review date using SM-2 algorithm
 *
 * Does not mutate `entry`. Phase 5 step 6 closed an aliasing bug here: the
 * spread below is shallow, so `newEntry.history` was the CALLER's array, and
 * the push further down appended a review record to the input entry in place.
 *
 * It was benign while updateEntry was the only caller — it passes either a
 * fresh createSRSEntry or the live data[wordId] and saves immediately, so the
 * stray mutation landed where it was going anyway. Step 5 changed that: getEntry
 * now returns a copy, and routing that copy through here would have silently
 * modified the caller's snapshot.
 *
 * history is the only shared mutable on an entry — every other field is a
 * scalar or null. Its records are created by the push below and never mutated
 * afterwards, so copying the array is enough; the records can stay shared.
 *
 * A non-array history is passed through untouched rather than replaced with [],
 * so a malformed entry still throws on the push exactly as it did before. This
 * function validates nothing today and this commit does not change that.
 *
 * @param {Object} entry - Current SRS entry, left untouched
 * @param {number} quality - Quality of response (0-5)
 * @returns {Object} - Updated SRS entry, owning its own history array
 */
const calculateNextReview = (entry, quality) => {
  const now = new Date();
  const newEntry = {
    ...entry,
    history: Array.isArray(entry.history) ? [...entry.history] : entry.history
  };

  // Update review counts
  newEntry.totalReviews += 1;
  newEntry.lastReviewDate = now.toISOString();

  if (quality >= 3) {
    // Correct response
    newEntry.correctCount += 1;

    if (newEntry.repetitions === 0) {
      newEntry.interval = 1;
    } else if (newEntry.repetitions === 1) {
      newEntry.interval = 3;
    } else {
      newEntry.interval = Math.round(newEntry.interval * newEntry.easeFactor);
    }

    newEntry.repetitions += 1;
  } else {
    // Incorrect response - reset
    newEntry.incorrectCount += 1;
    newEntry.repetitions = 0;
    newEntry.interval = 0;
  }

  // Update ease factor (bounded between 1.3 and 2.5)
  newEntry.easeFactor = Math.max(
    1.3,
    Math.min(
      2.5,
      newEntry.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    )
  );

  // Calculate next review date
  const nextDate = new Date(now);
  nextDate.setDate(nextDate.getDate() + newEntry.interval);
  newEntry.nextReviewDate = nextDate.toISOString();

  // Add to history
  newEntry.history.push({
    date: now.toISOString(),
    quality,
    interval: newEntry.interval,
    easeFactor: newEntry.easeFactor
  });

  // Keep only last 20 history entries
  if (newEntry.history.length > 20) {
    newEntry.history = newEntry.history.slice(-20);
  }

  newEntry.quality = quality;

  return newEntry;
};

// ===========================
// SRS MANAGER
// ===========================

/**
 * SRS Manager - handles all SRS operations
 * Uses centralized StorageManager for persistence
 */
const SRSManager = {
  storageKey: 'vocabProSRS', // Legacy key for reference

  /**
   * Load all SRS data from centralized storage
   */
  loadData: () => {
    const state = StorageManager.loadState();
    return state.srs || {};
  },

  /**
   * Save SRS data to centralized storage
   */
  saveData: (data) => {
    const state = StorageManager.loadState();
    state.srs = data;
    StorageManager.saveState(state);
  },

  /**
   * Get the SRS entry for a word, or a fresh default if it has none.
   *
   * PURE READ as of Phase 5 step 5. This used to lazily create the entry and
   * call saveData, so asking about a word persisted a row for it — the same
   * defect class as DailyGoalsManager.getTodayProgress, closed in step 3. It
   * had no callers, which is why it was fixed now: it is an obvious thing for
   * the component rebuild to reach for, and a read that writes is hard to
   * notice once wired.
   *
   * Nothing depended on the old persistence. updateEntry builds its own
   * fallback via `data[wordId] || createSRSEntry(wordId)`, getDueWords treats a
   * missing entry as a new word, and resetWord is guarded on the entry already
   * existing.
   *
   * The returned object is always a copy, never a live reference. loadData
   * hands back `state.srs` itself, so returning `data[wordId]` directly would
   * let a caller mutate persisted state just by reading — the step-4 lesson.
   * `history` is copied too, since it is an array the caller could push into.
   *
   * @param {string} wordId - Word identifier
   * @returns {Object} The word's entry, or a fresh unsaved default
   */
  getEntry: (wordId) => {
    const data = SRSManager.loadData();
    const entry = data[wordId];

    if (!entry) {
      return createSRSEntry(wordId);
    }

    return {
      ...entry,
      history: Array.isArray(entry.history) ? [...entry.history] : entry.history
    };
  },

  /**
   * Update SRS entry after review
   */
  updateEntry: (wordId, isCorrect, responseTime = null) => {
    const data = SRSManager.loadData();
    const entry = data[wordId] || createSRSEntry(wordId);

    // Calculate quality based on correctness and response time
    let quality;
    if (!isCorrect) {
      quality = QUALITY_RATINGS.INCORRECT;
    } else if (responseTime && responseTime < 2000) {
      quality = QUALITY_RATINGS.PERFECT;
    } else if (responseTime && responseTime < 5000) {
      quality = QUALITY_RATINGS.EASY;
    } else {
      quality = QUALITY_RATINGS.GOOD;
    }

    data[wordId] = calculateNextReview(entry, quality);
    SRSManager.saveData(data);

    return data[wordId];
  },

  /**
   * Get words that are due for review
   */
  getDueWords: (words, limit = 10) => {
    const data = SRSManager.loadData();
    const now = new Date();

    // Score each word based on SRS data
    const scoredWords = words.map(word => {
      const wordId = word.word || word.acronym || word.phrase || word.idiom;
      const entry = data[wordId];

      if (!entry) {
        // New word - high priority
        return { word, score: 100, isNew: true };
      }

      const nextReview = new Date(entry.nextReviewDate);
      const daysDue = (now - nextReview) / (1000 * 60 * 60 * 24);

      // Calculate priority score
      let score = 0;
      if (daysDue >= 0) {
        // Overdue - higher score
        score = 50 + Math.min(daysDue * 5, 50);
      } else {
        // Not due yet - lower score
        score = Math.max(0, 50 + daysDue * 2);
      }

      // Boost struggling words
      if (entry.incorrectCount > entry.correctCount) {
        score += 20;
      }

      return { word, score, isNew: false, entry };
    });

    // Sort by score (highest first) and return top words
    return scoredWords
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.word);
  },

  /**
   * Get words that need practice (struggling words)
   */
  getStrugglingWords: (words, limit = 10) => {
    const data = SRSManager.loadData();

    return words
      .filter(word => {
        const wordId = word.word || word.acronym || word.phrase || word.idiom;
        const entry = data[wordId];
        return entry && entry.incorrectCount > 0 && entry.incorrectCount >= entry.correctCount * 0.5;
      })
      .sort((a, b) => {
        const entryA = data[a.word || a.acronym || a.phrase || a.idiom];
        const entryB = data[b.word || b.acronym || b.phrase || b.idiom];
        return (entryB.incorrectCount - entryB.correctCount) - (entryA.incorrectCount - entryA.correctCount);
      })
      .slice(0, limit);
  },

  /**
   * Get mastered words (high repetition count)
   */
  getMasteredWords: (words) => {
    const data = SRSManager.loadData();

    return words.filter(word => {
      const wordId = word.word || word.acronym || word.phrase || word.idiom;
      const entry = data[wordId];
      return entry && entry.repetitions >= 3 && entry.correctCount > entry.incorrectCount * 2;
    });
  },

  /**
   * Get SRS statistics
   */
  getStats: () => {
    const data = SRSManager.loadData();
    const entries = Object.values(data);

    if (entries.length === 0) {
      return {
        totalWords: 0,
        masteredWords: 0,
        learningWords: 0,
        newWords: 0,
        dueToday: 0,
        averageEase: 2.5,
        totalReviews: 0
      };
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return {
      totalWords: entries.length,
      masteredWords: entries.filter(e => e.repetitions >= 5).length,
      learningWords: entries.filter(e => e.repetitions > 0 && e.repetitions < 5).length,
      newWords: entries.filter(e => e.repetitions === 0).length,
      dueToday: entries.filter(e => new Date(e.nextReviewDate) <= today).length,
      averageEase: entries.reduce((sum, e) => sum + e.easeFactor, 0) / entries.length,
      totalReviews: entries.reduce((sum, e) => sum + e.totalReviews, 0)
    };
  },

  /**
   * Reset SRS data for a specific word
   */
  resetWord: (wordId) => {
    const data = SRSManager.loadData();
    if (data[wordId]) {
      data[wordId] = createSRSEntry(wordId);
      SRSManager.saveData(data);
    }
  },

  /**
   * Clear all SRS data
   */
  clearAll: () => {
    SRSManager.saveData({});
  },

  /**
   * Reset all SRS data (alias for clearAll)
   */
  reset: () => {
    SRSManager.clearAll();
  }
};

// ===========================
// SMART QUESTION SELECTION
// ===========================

/**
 * Generate questions using SRS-optimized word selection
 * @param {Array} words - All available words
 * @param {number} count - Number of questions to generate
 * @param {string} mode - Quiz mode
 * @returns {Array} - Selected words optimized for learning
 */
const selectSRSOptimizedWords = (words, count = 10, mode = 'vocab') => {
  // Get mix of due words, struggling words, and new words
  const dueWords = SRSManager.getDueWords(words, Math.ceil(count * 0.5));
  const strugglingWords = SRSManager.getStrugglingWords(words, Math.ceil(count * 0.3));

  // Combine and deduplicate
  const selectedIds = new Set();
  const selected = [];

  // Add due words first
  for (const word of dueWords) {
    const id = word.word || word.acronym || word.phrase || word.idiom;
    if (!selectedIds.has(id) && selected.length < count) {
      selectedIds.add(id);
      selected.push(word);
    }
  }

  // Add struggling words
  for (const word of strugglingWords) {
    const id = word.word || word.acronym || word.phrase || word.idiom;
    if (!selectedIds.has(id) && selected.length < count) {
      selectedIds.add(id);
      selected.push(word);
    }
  }

  // Fill remaining with random new words
  const remainingWords = words.filter(w => {
    const id = w.word || w.acronym || w.phrase || w.idiom;
    return !selectedIds.has(id);
  });

  const shuffled = shuffleArray(remainingWords);
  for (const word of shuffled) {
    if (selected.length >= count) break;
    selected.push(word);
  }

  // Shuffle final selection
  return shuffleArray(selected);
};

// Public API — same names the former window globals used.
// SRS_INTERVALS, QUALITY_RATINGS, createSRSEntry and calculateNextReview
// (the pure SM-2 core) stay internal, as in the original.
export { SRSManager, selectSRSOptimizedWords };

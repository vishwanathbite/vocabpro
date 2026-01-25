/**
 * Spaced Repetition System (SRS)
 * Literary Rides VocabPro - Learning Enhancement
 * Implements SM-2 algorithm for optimal vocabulary retention
 */

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
 * @param {Object} entry - Current SRS entry
 * @param {number} quality - Quality of response (0-5)
 * @returns {Object} - Updated SRS entry
 */
const calculateNextReview = (entry, quality) => {
  const now = new Date();
  const newEntry = { ...entry };

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
    if (typeof StorageManager !== 'undefined') {
      const state = StorageManager.loadState();
      return state.srs || {};
    }
    return loadFromStorage('vocabProSRS', {});
  },

  /**
   * Save SRS data to centralized storage
   */
  saveData: (data) => {
    if (typeof StorageManager !== 'undefined') {
      const state = StorageManager.loadState();
      state.srs = data;
      StorageManager.saveState(state);
    } else {
      saveToStorage('vocabProSRS', data);
    }
  },

  /**
   * Get or create SRS entry for a word
   */
  getEntry: (wordId) => {
    const data = SRSManager.loadData();
    if (!data[wordId]) {
      data[wordId] = createSRSEntry(wordId);
      SRSManager.saveData(data);
    }
    return data[wordId];
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
      const wordId = word.word || word.acronym || word.phrase;
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
        const wordId = word.word || word.acronym || word.phrase;
        const entry = data[wordId];
        return entry && entry.incorrectCount > 0 && entry.incorrectCount >= entry.correctCount * 0.5;
      })
      .sort((a, b) => {
        const entryA = data[a.word || a.acronym || a.phrase];
        const entryB = data[b.word || b.acronym || b.phrase];
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
      const wordId = word.word || word.acronym || word.phrase;
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
    const id = word.word || word.acronym || word.phrase;
    if (!selectedIds.has(id) && selected.length < count) {
      selectedIds.add(id);
      selected.push(word);
    }
  }

  // Add struggling words
  for (const word of strugglingWords) {
    const id = word.word || word.acronym || word.phrase;
    if (!selectedIds.has(id) && selected.length < count) {
      selectedIds.add(id);
      selected.push(word);
    }
  }

  // Fill remaining with random new words
  const remainingWords = words.filter(w => {
    const id = w.word || w.acronym || w.phrase;
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

// Export note: In browser environment with Babel, these are automatically available globally

/**
 * Bookmarks System
 * Literary Rides VocabPro - Learning Enhancement
 * Save and manage favorite words for later review
 */

// ===========================
// BOOKMARKS MANAGER
// ===========================

/**
 * Bookmarks Manager - handles all bookmark operations
 */
const BookmarksManager = {
  storageKey: 'vocabProBookmarks',

  /**
   * Load all bookmarks from storage
   * @returns {Array} - Array of bookmarked word objects
   */
  loadBookmarks: () => {
    return loadFromStorage('vocabProBookmarks', []);
  },

  /**
   * Save bookmarks to storage
   * @param {Array} bookmarks - Array of bookmark objects
   */
  saveBookmarks: (bookmarks) => {
    saveToStorage('vocabProBookmarks', bookmarks);
  },

  /**
   * Check if a word is bookmarked
   * @param {string} wordId - Word identifier
   * @returns {boolean}
   */
  isBookmarked: (wordId) => {
    const bookmarks = BookmarksManager.loadBookmarks();
    return bookmarks.some(b => b.id === wordId);
  },

  /**
   * Add a word to bookmarks
   * @param {Object} wordData - Word data object
   * @param {string} mode - Quiz mode (vocab, synonym, etc.)
   * @returns {boolean} - True if added, false if already exists
   */
  addBookmark: (wordData, mode = 'vocab') => {
    const bookmarks = BookmarksManager.loadBookmarks();
    const wordId = wordData.word || wordData.acronym || wordData.phrase;

    if (BookmarksManager.isBookmarked(wordId)) {
      return false;
    }

    const bookmark = {
      id: wordId,
      wordData,
      mode,
      addedAt: new Date().toISOString(),
      reviewCount: 0,
      lastReviewed: null,
      notes: ''
    };

    bookmarks.push(bookmark);
    BookmarksManager.saveBookmarks(bookmarks);
    return true;
  },

  /**
   * Remove a word from bookmarks
   * @param {string} wordId - Word identifier
   * @returns {boolean} - True if removed
   */
  removeBookmark: (wordId) => {
    const bookmarks = BookmarksManager.loadBookmarks();
    const filtered = bookmarks.filter(b => b.id !== wordId);

    if (filtered.length < bookmarks.length) {
      BookmarksManager.saveBookmarks(filtered);
      return true;
    }
    return false;
  },

  /**
   * Toggle bookmark status
   * @param {Object} wordData - Word data object
   * @param {string} mode - Quiz mode
   * @returns {boolean} - True if now bookmarked, false if removed
   */
  toggleBookmark: (wordData, mode = 'vocab') => {
    const wordId = wordData.word || wordData.acronym || wordData.phrase;

    if (BookmarksManager.isBookmarked(wordId)) {
      BookmarksManager.removeBookmark(wordId);
      return false;
    } else {
      BookmarksManager.addBookmark(wordData, mode);
      return true;
    }
  },

  /**
   * Get all bookmarked words
   * @returns {Array} - Array of bookmark objects
   */
  getBookmarks: () => {
    return BookmarksManager.loadBookmarks();
  },

  /**
   * Get bookmarks count
   * @returns {number}
   */
  getCount: () => {
    return BookmarksManager.loadBookmarks().length;
  },

  /**
   * Update bookmark review status
   * @param {string} wordId - Word identifier
   */
  markReviewed: (wordId) => {
    const bookmarks = BookmarksManager.loadBookmarks();
    const index = bookmarks.findIndex(b => b.id === wordId);

    if (index !== -1) {
      bookmarks[index].reviewCount += 1;
      bookmarks[index].lastReviewed = new Date().toISOString();
      BookmarksManager.saveBookmarks(bookmarks);
    }
  },

  /**
   * Add/update notes for a bookmarked word
   * @param {string} wordId - Word identifier
   * @param {string} notes - Notes text
   */
  updateNotes: (wordId, notes) => {
    const bookmarks = BookmarksManager.loadBookmarks();
    const index = bookmarks.findIndex(b => b.id === wordId);

    if (index !== -1) {
      bookmarks[index].notes = notes;
      BookmarksManager.saveBookmarks(bookmarks);
    }
  },

  /**
   * Get bookmarks for flashcard practice
   * @param {number} limit - Max number of words
   * @returns {Array} - Array of word data objects
   */
  getForPractice: (limit = 10) => {
    const bookmarks = BookmarksManager.loadBookmarks();

    // Sort by least reviewed first
    return bookmarks
      .sort((a, b) => a.reviewCount - b.reviewCount)
      .slice(0, limit)
      .map(b => b.wordData);
  },

  /**
   * Clear all bookmarks
   */
  clearAll: () => {
    BookmarksManager.saveBookmarks([]);
  },

  /**
   * Export bookmarks as JSON
   * @returns {string} - JSON string
   */
  exportBookmarks: () => {
    const bookmarks = BookmarksManager.loadBookmarks();
    return JSON.stringify(bookmarks, null, 2);
  },

  /**
   * Import bookmarks from JSON
   * @param {string} jsonString - JSON string
   * @returns {number} - Number of imported bookmarks
   */
  importBookmarks: (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      if (!Array.isArray(imported)) return 0;

      const existing = BookmarksManager.loadBookmarks();
      const existingIds = new Set(existing.map(b => b.id));

      const newBookmarks = imported.filter(b => !existingIds.has(b.id));
      BookmarksManager.saveBookmarks([...existing, ...newBookmarks]);

      return newBookmarks.length;
    } catch (error) {
      console.error('Error importing bookmarks:', error);
      return 0;
    }
  }
};

// Export note: In browser environment with Babel, BookmarksManager is automatically available globally

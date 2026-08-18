/**
 * Bookmarks System
 * Literary Rides VocabPro - Learning Enhancement
 * Save and manage favorite words for later review
 */

// ESM port of js/bookmarks.js. StorageManager is now imported rather than
// sniffed off the global `window`, so it is always defined.
import { StorageManager } from './storage.js';
/* helpers.js is a leaf — it imports nothing — so this adds no cycle. Same
   reasoning quiz-summary.js records at its own import of this function. */
import { wordIdOf } from './helpers.js';

// ===========================
// BOOKMARKS MANAGER
// ===========================

/**
 * Bookmarks Manager - handles all bookmark operations
 * Uses centralized StorageManager for persistence
 */
/* `storageKey: 'vocabProBookmarks'` STOOD HERE and is deleted. It was labelled
   "Legacy key for reference" and was read by nothing — not by this module, which
   routes every access through StorageManager into `state.bookmarks` of the
   unified blob, and not by anything else in the repo. A key that names a store
   nothing writes to is a false lead for the next reader looking for where
   bookmarks live. */
/**
 * The id of a STORED bookmark record, derived rather than read back.
 *
 * WHY THE STORED `id` IS NOT TRUSTED. js/ computes a bookmark's id with its own
 * three-arm expression, `word || acronym || phrase`, which has no idiom arm
 * (js/bookmarks.js:62). An idiom has neither of the three, so the id comes out
 * undefined and JSON.stringify DROPS THE KEY — a js/-written idiom bookmark
 * reaches this app with no `id` property at all. Every such record then answered
 * to the same `undefined`, so one delete removed all of them at once and React
 * saw duplicate keys.
 *
 * Deriving fixes that without touching a byte of the student's data, and it keeps
 * working for records js/ writes AFTER cutover — which a one-shot migration
 * could not. Both ends of every comparison are now the same function:
 * BookmarkToggle and useQuizSession already resolve their side with wordIdOf.
 *
 * wordIdOf unwraps `.wordData`, so this is also correct for a js/ record whose
 * wordData is a QUESTION rather than a stored item (js/components.js:1481 passes
 * whatever is in scope).
 *
 * @param {Object} bookmark A stored bookmark record
 * @returns {string|undefined} Its identity, or undefined if the record has none
 */
const storedIdOf = (bookmark) => wordIdOf(bookmark?.wordData);

const BookmarksManager = {
  /**
   * Load all bookmarks from centralized storage
   * @returns {Array} - Array of bookmarked word objects
   */
  loadBookmarks: () => {
    const state = StorageManager.loadState();
    return state.bookmarks || [];
  },

  /**
   * Save bookmarks to centralized storage
   * @param {Array} bookmarks - Array of bookmark objects
   */
  saveBookmarks: (bookmarks) => {
    const state = StorageManager.loadState();
    state.bookmarks = bookmarks;
    StorageManager.saveState(state);
  },

  /**
   * Check if a word is bookmarked
   * @param {string} wordId - Word identifier
   * @returns {boolean}
   */
  isBookmarked: (wordId) => {
    /* A falsy id matches nothing. Without this, an unidentifiable record — whose
       derived id is also undefined — would answer yes to `isBookmarked(undefined)`
       and make an unrelated word look saved. */
    if (!wordId) return false;

    const bookmarks = BookmarksManager.loadBookmarks();
    return bookmarks.some(b => storedIdOf(b) === wordId);
  },

  /**
   * Add a word to bookmarks
   * @param {Object} wordData - Word data object
   * @param {string} mode - Quiz mode (vocab, synonym, etc.)
   * @returns {boolean} - True if added, false if already exists
   */
  addBookmark: (wordData, mode = 'vocab') => {
    const bookmarks = BookmarksManager.loadBookmarks();
    /* THE SHARED RESOLVER, replacing an inline three-arm copy. See the note on
       toggleBookmark below for what changes. */
    const wordId = wordIdOf(wordData);

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
    /* REFUSES A FALSY ID, and this guard is the whole point of the change. The
       filter below keeps records whose id differs from the argument; with
       `undefined` passed in, every record that derives no id differed from
       nothing and the single delete swept the entire unidentifiable cohort.
       A row with no id is removed by position instead — see removeBookmarkAt. */
    if (!wordId) return false;

    const bookmarks = BookmarksManager.loadBookmarks();
    const filtered = bookmarks.filter(b => storedIdOf(b) !== wordId);

    if (filtered.length < bookmarks.length) {
      BookmarksManager.saveBookmarks(filtered);
      return true;
    }
    return false;
  },

  /**
   * Remove exactly one bookmark by its position in the stored list.
   *
   * FOR THE RECORDS THAT HAVE NO IDENTITY. A bookmark whose wordData is missing,
   * empty, or a shape this app does not know derives no id, so removeBookmark
   * cannot address it — and must not try, since every such record would match.
   * Position is the only handle that names one row and no other. The screen
   * renders the stored array in order, so its index is the stored index.
   *
   * @param {number} index Position in the stored array
   * @returns {boolean} True if a record was removed
   */
  removeBookmarkAt: (index) => {
    const bookmarks = BookmarksManager.loadBookmarks();

    if (!Number.isInteger(index) || index < 0 || index >= bookmarks.length) {
      return false;
    }

    const filtered = bookmarks.filter((_, i) => i !== index);
    BookmarksManager.saveBookmarks(filtered);
    return true;
  },

  /**
   * Toggle bookmark status
   * @param {Object} wordData - Word data object
   * @param {string} mode - Quiz mode
   * @returns {boolean} - True if now bookmarked, false if removed
   */
  toggleBookmark: (wordData, mode = 'vocab') => {
    /* THE SHARED RESOLVER. This and addBookmark each carried their own
       `wordData.word || wordData.acronym || wordData.phrase` — a three-arm copy
       of wordIdOf with the fourth arm missing, and the sixth and seventh
       hand-written instances of the app's identity expression.
       .
       TWO BEHAVIOUR CHANGES, both widening what resolves, neither reachable
       from anything app-v2 can produce:
       .
         1. `.idiom` is now an arm. js/ ships idioms and shares STORAGE_KEY, so
            a bookmark saved there can be idiom-shaped; against the old
            expression it resolved to `undefined`, which made isBookmarked
            compare undefined and removeBookmark filter nothing — the bookmark
            could be neither recognised nor deleted. It can now be removed,
            which is the point: idioms are cut, and a student must be able to
            clear one out after cutover rather than being stuck with it.
         2. wordIdOf unwraps `.wordData`, so a caller that passes a QUESTION
            rather than a stored item now resolves its acronym and phrase arms
            instead of silently returning undefined for them.
       .
       Nothing narrows: for every flat vocabulary/acronym/one-word item this app
       creates, `source === stored` and the first three arms are evaluated in
       the same order to the same result. */
    const wordId = wordIdOf(wordData);

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
   * Update bookmark review status.
   *
   * ITS ONE CALLER is useQuizSession.complete(), gated on the 'bookmarks' mode
   * — once per word SERVED by a finished Saved Words session. Deliberately not
   * called from anywhere else: an ordinary quiz does not review a bookmark, and
   * Search looking a word up is not reviewing it either. See the note at that
   * call site for why both exclusions matter to what reviewCount means.
   *
   * A no-op for an unknown id, which is how a word removed from the saved list
   * mid-session resolves. Nothing is created here.
   *
   * @param {string} wordId - Word identifier
   */
  markReviewed: (wordId) => {
    if (!wordId) return;

    const bookmarks = BookmarksManager.loadBookmarks();
    const index = bookmarks.findIndex(b => storedIdOf(b) === wordId);

    if (index !== -1) {
      /* `|| 0` because a bookmark can arrive without the field: importBookmarks
         merges whatever JSON it is handed, and a js/-written entry predating the
         counter would have none. `undefined + 1` is NaN, and one NaN is enough
         to make the getForPractice comparator return NaN for every pair it
         touches — silently flattening the ordering this call exists to drive. */
      bookmarks[index].reviewCount = (bookmarks[index].reviewCount || 0) + 1;
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
    if (!wordId) return;

    const bookmarks = BookmarksManager.loadBookmarks();
    const index = bookmarks.findIndex(b => storedIdOf(b) === wordId);

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

    /* COPIED BEFORE SORTING. `.sort` mutates in place, and loadBookmarks returns
       `state.bookmarks` — a live reference into StorageManager's memoryState —
       so this reordered the stored array as a side effect of a read, and the
       Bookmarks screen would list words in a different order after a practice
       session. Same aliasing class as the updateStats and loadData bugs closed
       earlier in Phase 5.
       .
       Fixed here rather than deferred because THIS COMMIT is what makes the
       function reachable: bookmarks mode had no launch point until now, so the
       defect was latent and is live the moment the button below it works. */
    /* THE ORDERING IS LIVE as of the markReviewed wiring. Until then nothing
       incremented reviewCount, every entry sat at 0, and this sort was a stable
       no-op that returned the list in insertion order — correct, but not doing
       what its name claimed. Now a finished Saved Words session advances the
       words it served, so the next session reaches for the ones it did not.

       `|| 0` on both sides for the same reason markReviewed guards its
       increment: one undefined would make the comparator return NaN. */
    return [...bookmarks]
      .sort((a, b) => (a.reviewCount || 0) - (b.reviewCount || 0))
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
      /* DERIVED ON BOTH SIDES. Comparing stored ids would have let an idiom
         record — which carries no id at all — import again on every run, since
         `undefined` is absent from a Set built from records that also have no
         id... and worse, would have collapsed every id-less incoming record
         against a single `undefined` once one was present. Deriving makes the
         two sides the same function, as everywhere else in this module.
         An incoming record with no derivable identity is let through: it cannot
         be matched against anything, and dropping it would silently discard a
         row the student is restoring from their own backup. */
      const existingIds = new Set(existing.map(storedIdOf).filter(Boolean));

      const newBookmarks = imported.filter(b => {
        const id = storedIdOf(b);
        return !id || !existingIds.has(id);
      });
      BookmarksManager.saveBookmarks([...existing, ...newBookmarks]);

      return newBookmarks.length;
    } catch (error) {
      return 0;
    }
  }
};

// Public API — same name the former window global used.
export { BookmarksManager };

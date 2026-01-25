/**
 * VocabPro - Main Data Index
 * Combines all vocabulary databases from separate files
 *
 * Word files are loaded separately for easy editing:
 * - vocab-easy.js: Easy level vocabulary (vocabEasy array)
 * - vocab-medium.js: Medium level vocabulary (vocabMedium array)
 * - vocab-hard.js: Hard level vocabulary (vocabHard array)
 * - acronyms.js: Acronyms database (acronymsDB array)
 * - oneword.js: One-word substitutes database (oneWordDB array)
 */

// Defensive check - ensure data files loaded correctly
// Note: We only log errors here, we don't try to redeclare variables
// because the data files use 'const' declarations
if (typeof vocabEasy === 'undefined') {
  console.error('VocabPro Error: vocab-easy.js failed to load');
}
if (typeof vocabMedium === 'undefined') {
  console.error('VocabPro Error: vocab-medium.js failed to load');
}
if (typeof vocabHard === 'undefined') {
  console.error('VocabPro Error: vocab-hard.js failed to load');
}
if (typeof acronymsDB === 'undefined') {
  console.error('VocabPro Error: acronyms.js failed to load');
}
if (typeof oneWordDB === 'undefined') {
  console.error('VocabPro Error: oneword.js failed to load');
}

// Create the main vocabulary database object
// Maps difficulty levels to their respective word arrays
// Use empty arrays as fallback if data files failed to load
const vocabularyDB = {
  easy: typeof vocabEasy !== 'undefined' ? vocabEasy : [],
  medium: typeof vocabMedium !== 'undefined' ? vocabMedium : [],
  hard: typeof vocabHard !== 'undefined' ? vocabHard : []
};

// Note: acronymsDB and oneWordDB are defined in their respective files
// We don't redeclare them here to avoid "already declared" errors

// Database statistics (available via getDatabaseStats())
const getDatabaseStats = () => ({
  easy: vocabularyDB.easy.length,
  medium: vocabularyDB.medium.length,
  hard: vocabularyDB.hard.length,
  acronyms: typeof acronymsDB !== 'undefined' ? acronymsDB.length : 0,
  oneWord: typeof oneWordDB !== 'undefined' ? oneWordDB.length : 0,
  totalVocabulary: vocabularyDB.easy.length + vocabularyDB.medium.length + vocabularyDB.hard.length,
  totalItems: vocabularyDB.easy.length + vocabularyDB.medium.length + vocabularyDB.hard.length +
              (typeof acronymsDB !== 'undefined' ? acronymsDB.length : 0) +
              (typeof oneWordDB !== 'undefined' ? oneWordDB.length : 0)
});

// Expose to global scope for other scripts (const doesn't auto-add to window)
window.vocabularyDB = vocabularyDB;
window.getDatabaseStats = getDatabaseStats;

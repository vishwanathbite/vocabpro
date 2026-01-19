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

// Create the main vocabulary database object
// Maps difficulty levels to their respective word arrays
const vocabularyDB = {
  easy: vocabEasy,
  medium: vocabMedium,
  hard: vocabHard
};

// Database statistics (available via getDatabaseStats())
const getDatabaseStats = () => ({
  easy: vocabEasy.length,
  medium: vocabMedium.length,
  hard: vocabHard.length,
  acronyms: acronymsDB.length,
  oneWord: oneWordDB.length,
  totalVocabulary: vocabEasy.length + vocabMedium.length + vocabHard.length,
  totalItems: vocabEasy.length + vocabMedium.length + vocabHard.length + acronymsDB.length + oneWordDB.length
});

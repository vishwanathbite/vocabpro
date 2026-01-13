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

// Log database statistics for debugging
console.log('VocabPro Database Loaded:');
console.log(`- Easy: ${vocabEasy.length} words`);
console.log(`- Medium: ${vocabMedium.length} words`);
console.log(`- Hard: ${vocabHard.length} words`);
console.log(`- Acronyms: ${acronymsDB.length} items`);
console.log(`- One-Word Substitutes: ${oneWordDB.length} items`);
console.log(`- Total: ${vocabEasy.length + vocabMedium.length + vocabHard.length} vocabulary words`);

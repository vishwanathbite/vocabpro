/**
 * Utility Functions
 * Literary Rides VocabPro - Modular Architecture
 * Helper functions, speech synthesis, storage, array operations
 */

// ===========================
// ARRAY MANIPULATION UTILITIES
// ===========================

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled copy of array
 */
const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

/**
 * Sample N items from array, excluding certain values
 * @param {Array} arr - Source array
 * @param {number} n - Number of items to sample
 * @param {Set} excludeSet - Set of values to exclude
 * @returns {Array} - Sampled items
 */
const sample = (arr, n, excludeSet = new Set()) => {
  const pool = arr.filter(v => !excludeSet.has(v));
  const out = [];
  const poolCopy = [...pool];

  while (out.length < n && poolCopy.length > 0) {
    const i = Math.floor(Math.random() * poolCopy.length);
    out.push(poolCopy.splice(i, 1)[0]);
  }

  return out;
};

/**
 * Get random item from array
 * @param {Array} arr - Source array
 * @returns {*} - Random item
 */
const randomItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// ===========================
// QUESTION GENERATION UTILITIES
// ===========================

/**
 * Generate smart distractors from vocabulary pool
 * Ensures distractors are real definitions from other words
 * @param {string} correctDef - The correct definition
 * @param {Array} words - Pool of word objects
 * @param {number} count - Number of distractors to generate
 * @returns {Array} - Array of distractor definitions
 */
const generateSmartDistractors = (correctDef, words, count = 3) => {
  const pool = words
    .filter(w => w.definition !== correctDef)
    .map(w => w.definition);

  return sample(pool, count, new Set([correctDef]));
};

/**
 * Build synonym pool from all words, excluding the current word's synonyms
 * @param {Array} allWords - All vocabulary words
 * @param {Array} currentSynonyms - Synonyms of current word to exclude
 * @returns {Array} - Flat array of all other synonyms
 */
const buildSynonymPool = (allWords, currentSynonyms) => {
  const currentSet = new Set(currentSynonyms);
  return allWords
    .flatMap(w => w.synonyms || [])
    .filter(syn => !currentSet.has(syn));
};

/**
 * Build antonym pool from all words, excluding the current word's antonyms
 * @param {Array} allWords - All vocabulary words
 * @param {Array} currentAntonyms - Antonyms of current word to exclude
 * @returns {Array} - Flat array of all other antonyms
 */
const buildAntonymPool = (allWords, currentAntonyms) => {
  const currentSet = new Set(currentAntonyms);
  return allWords
    .flatMap(w => w.antonyms || [])
    .filter(ant => !currentSet.has(ant));
};

// ===========================
// SPEECH SYNTHESIS
// ===========================

/**
 * Text-to-speech function
 * Speaks the given text with US English pronunciation at slower rate
 * @param {string} text - Text to speak
 */
const speakWord = (text) => {
  if (!('speechSynthesis' in window)) {
    alert('Text-to-speech is not supported in your browser');
    return;
  }

  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;  // Slower rate for clarity
    utterance.lang = 'en-US';

    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('Speech synthesis error:', error);
  }
};

/**
 * Stop any ongoing speech
 */
const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// ===========================
// LOCAL STORAGE UTILITIES
// ===========================

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {*} data - Data to store (will be JSON stringified)
 */
const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Load data from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} - Parsed data or default value
 */
const loadFromStorage = (key, defaultValue = null) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key to remove
 */
const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

/**
 * Clear all localStorage
 */
const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// ===========================
// USER MANAGEMENT UTILITIES
// ===========================

/**
 * Generate unique referral code
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @returns {string} - Unique referral code
 */
const generateReferralCode = (firstName, lastName) => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  return `${initials}${timestamp}${random}`.toUpperCase();
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate mobile number (Indian format)
 * @param {string} mobile - Mobile number to validate
 * @returns {boolean} - True if valid mobile number
 */
const isValidMobile = (mobile) => {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
};

// ===========================
// URL & SHARING UTILITIES
// ===========================

/**
 * Get URL parameter value
 * @param {string} param - Parameter name
 * @returns {string|null} - Parameter value or null
 */
const getUrlParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

/**
 * Share content using Web Share API or fallback to clipboard
 * @param {Object} shareData - Data to share {title, text, url}
 */
const shareContent = async (shareData) => {
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(shareData.url || shareData.text);
      alert('Link copied to clipboard!');
    }
  } catch (error) {
    console.error('Error sharing:', error);
  }
};

// ===========================
// SCORING & POINTS UTILITIES
// ===========================

/**
 * Calculate points based on difficulty level
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {number} - Points awarded
 */
const getPointsForDifficulty = (difficulty) => {
  const pointsMap = {
    easy: 10,
    medium: 15,
    hard: 20
  };
  return pointsMap[difficulty] || 10;
};

/**
 * Calculate level from total points
 * @param {number} totalPoints - Total points earned
 * @returns {number} - Current level
 */
const calculateLevel = (totalPoints) => {
  return Math.floor(totalPoints / 100) + 1;
};

/**
 * Get level name based on level number
 * @param {number} level - Level number
 * @returns {string} - Level name
 */
const getLevelName = (level) => {
  const levelNames = [
    'Beginner',      // Level 1
    'Novice',        // Level 2
    'Learner',       // Level 3
    'Explorer',      // Level 4
    'Achiever',      // Level 5
    'Expert',        // Level 6
    'Master',        // Level 7
    'Virtuoso',      // Level 8
    'Champion',      // Level 9
    'Legend'         // Level 10+
  ];

  return levelNames[Math.min(level - 1, levelNames.length - 1)] || 'Legend';
};

// ===========================
// DATE & TIME UTILITIES
// ===========================

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date string
 */
const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Check if date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} - True if date is today
 */
const isToday = (date) => {
  const d = new Date(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
};

/**
 * Get days between two dates
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {number} - Number of days
 */
const getDaysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// ===========================
// FORMATTING UTILITIES
// ===========================

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
const truncate = (text, maxLength = 50) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
const formatNumber = (num) => {
  return num.toLocaleString('en-IN');
};

// Export note: In browser environment with Babel, these functions are automatically available globally

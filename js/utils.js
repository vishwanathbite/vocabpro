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
 * @returns {boolean} - True if speech started, false if not supported
 */
const speakWord = (text) => {
  if (!('speechSynthesis' in window)) {
    return false;
  }

  try {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;  // Slower rate for clarity
    utterance.lang = 'en-US';

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    return false;
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
 * Check if localStorage is available
 * @returns {boolean} - True if localStorage is available
 */
const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// In-memory fallback for when localStorage is unavailable
const memoryStorage = {};

/**
 * Save data to localStorage with quota handling
 * @param {string} key - Storage key
 * @param {*} data - Data to store (will be JSON stringified)
 * @returns {boolean} - True if saved successfully
 */
const saveToStorage = (key, data) => {
  try {
    if (!isStorageAvailable()) {
      memoryStorage[key] = data;
      return true;
    }
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    // Handle quota exceeded
    if (error.name === 'QuotaExceededError' || error.code === 22) {
      // Try to clear old data and retry
      try {
        // Remove old quiz history to free space
        const history = localStorage.getItem('vocabProQuizHistory');
        if (history) {
          const parsed = JSON.parse(history);
          if (parsed.length > 20) {
            localStorage.setItem('vocabProQuizHistory', JSON.stringify(parsed.slice(0, 20)));
          }
        }
        // Try again
        localStorage.setItem(key, JSON.stringify(data));
        return true;
      } catch (retryError) {
        // Fall back to memory storage
        memoryStorage[key] = data;
        return false;
      }
    }
    // Fall back to memory storage
    memoryStorage[key] = data;
    return false;
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
    // Check memory storage first (for fallback scenarios)
    if (memoryStorage[key] !== undefined) {
      return memoryStorage[key];
    }

    if (!isStorageAvailable()) {
      return defaultValue;
    }

    const stored = localStorage.getItem(key);
    if (!stored) return defaultValue;

    // Try to parse JSON
    try {
      return JSON.parse(stored);
    } catch (parseError) {
      // If parsing fails, return default value and clean up corrupted data
      localStorage.removeItem(key);
      return defaultValue;
    }
  } catch (error) {
    return defaultValue;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key to remove
 */
const removeFromStorage = (key) => {
  try {
    delete memoryStorage[key];
    if (isStorageAvailable()) {
      localStorage.removeItem(key);
    }
  } catch (error) {
    // Silently fail
  }
};

/**
 * Clear all localStorage
 */
const clearStorage = () => {
  try {
    Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
    if (isStorageAvailable()) {
      localStorage.clear();
    }
  } catch (error) {
    // Silently fail
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
 * @returns {Object} - {success: boolean, method: 'share'|'clipboard'}
 */
const shareContent = async (shareData) => {
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return { success: true, method: 'share' };
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(shareData.url || shareData.text);
      return { success: true, method: 'clipboard' };
    }
  } catch (error) {
    return { success: false, method: null };
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

// ===========================
// SOUND EFFECTS SYSTEM
// ===========================

/**
 * Sound Effects Manager using Web Audio API
 * Creates synthesized sounds without external files
 */
const SoundManager = {
  audioContext: null,
  enabled: true,
  _initialized: false,

  /**
   * Initialize audio context (must be called after user interaction)
   */
  init: () => {
    try {
      if (!SoundManager.audioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          SoundManager.audioContext = new AudioContext();
        }
      }
      // Resume suspended audio context (required after user interaction on some browsers)
      if (SoundManager.audioContext && SoundManager.audioContext.state === 'suspended') {
        SoundManager.audioContext.resume();
      }
      return SoundManager.audioContext;
    } catch (e) {
      console.warn('Failed to initialize audio context:', e);
      return null;
    }
  },

  /**
   * Load and apply saved sound settings
   */
  loadSettings: () => {
    if (!SoundManager._initialized) {
      SoundManager.enabled = loadFromStorage('vocabProSoundEnabled', true);
      SoundManager._initialized = true;
    }
    return SoundManager.enabled;
  },

  /**
   * Check if sound is enabled
   */
  isEnabled: () => {
    if (!SoundManager._initialized) {
      SoundManager.loadSettings();
    }
    return SoundManager.enabled;
  },

  /**
   * Toggle sound on/off
   */
  toggle: () => {
    SoundManager.enabled = !SoundManager.enabled;
    saveToStorage('vocabProSoundEnabled', SoundManager.enabled);
    return SoundManager.enabled;
  },

  /**
   * Play a tone
   */
  playTone: (frequency, duration, type = 'sine', volume = 0.3) => {
    if (!SoundManager.enabled) return;

    try {
      const ctx = SoundManager.init();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      // Sound playback failed silently
    }
  },

  /**
   * Play correct answer sound (happy ascending tones)
   */
  playCorrect: () => {
    if (!SoundManager.enabled) return;

    try {
      const ctx = SoundManager.init();

      // Play a pleasant ascending arpeggio
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
          osc.start();
          osc.stop(ctx.currentTime + 0.15);
        }, i * 80);
      });
    } catch (e) {
      // Sound playback failed silently
    }
  },

  /**
   * Play incorrect answer sound (descending tone)
   */
  playIncorrect: () => {
    if (!SoundManager.enabled) return;

    try {
      const ctx = SoundManager.init();

      // Play a short descending tone
      [349.23, 293.66].forEach((freq, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = 'triangle';
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
          osc.start();
          osc.stop(ctx.currentTime + 0.2);
        }, i * 100);
      });
    } catch (e) {
      // Sound playback failed silently
    }
  },

  /**
   * Play level up sound (triumphant)
   */
  playLevelUp: () => {
    if (!SoundManager.enabled) return;

    try {
      const ctx = SoundManager.init();

      // Triumphant fanfare
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
        }, i * 120);
      });
    } catch (e) {
      // Sound playback failed silently
    }
  },

  /**
   * Play achievement sound
   */
  playAchievement: () => {
    if (!SoundManager.enabled) return;

    try {
      const ctx = SoundManager.init();

      // Magical achievement sound
      const notes = [659.25, 783.99, 987.77, 1174.66, 1318.51];
      notes.forEach((freq, i) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = freq;
          osc.type = 'sine';
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
          osc.start();
          osc.stop(ctx.currentTime + 0.25);
        }, i * 80);
      });
    } catch (e) {
      // Sound playback failed silently
    }
  },

  /**
   * Play click sound
   */
  playClick: () => {
    if (!SoundManager.enabled) return;
    SoundManager.playTone(800, 0.05, 'sine', 0.1);
  }
};

// ===========================
// WORD OF THE DAY
// ===========================

/**
 * Get Word of the Day based on date
 * Uses a deterministic algorithm so everyone sees the same word
 * @returns {Object} - Word object for today
 */
const getWordOfTheDay = () => {
  const allWords = [...vocabularyDB.easy, ...vocabularyDB.medium, ...vocabularyDB.hard];

  // Create a seed based on today's date
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Use absolute value and mod to get index
  const index = Math.abs(hash) % allWords.length;
  const word = allWords[index];

  // Check if user has seen this word today
  const lastSeenKey = 'vocabProWOTD';
  const lastSeen = loadFromStorage(lastSeenKey);

  const wotdData = {
    word,
    date: dateString,
    isNew: !lastSeen || lastSeen.date !== dateString
  };

  // Mark as seen
  saveToStorage(lastSeenKey, { date: dateString, wordId: word.word });

  return wotdData;
};

/**
 * Get a streak-based motivational quote
 * @param {number} streak - Current streak
 * @returns {string} - Motivational message
 */
const getDailyMotivation = (streak) => {
  const quotes = [
    "Every word you learn is a step towards mastery!",
    "Consistency is the key to vocabulary success.",
    "Today's practice is tomorrow's confidence.",
    "Small daily improvements lead to stunning results.",
    "Your vocabulary is your intellectual toolkit.",
    "Learning never exhausts the mind.",
    "Words are the building blocks of expression.",
    "Each word mastered is a victory achieved.",
    "The limits of your language are the limits of your world.",
    "Knowledge of words is knowledge of things."
  ];

  // Add streak-specific messages
  if (streak >= 10) {
    return "Incredible streak! You're unstoppable! 🔥";
  } else if (streak >= 5) {
    return "Amazing! Keep that streak going! ⚡";
  } else if (streak >= 3) {
    return "Great momentum! Stay consistent! ✨";
  }

  const index = new Date().getDate() % quotes.length;
  return quotes[index];
};

// Export note: In browser environment with Babel, these functions are automatically available globally

/**
 * Centralized Storage Layer
 * Literary Rides VocabPro - Reliable State Management
 *
 * Single source of truth for all app state with:
 * - Schema versioning and migrations
 * - Safe error recovery
 * - Export/import backup functionality
 * - Debounced saves to prevent excessive writes
 */

// Current schema version - increment when schema changes
const STORAGE_VERSION = 1;
const STORAGE_KEY = 'VOCABPRO_STATE_V1';

// Legacy keys that need migration
const LEGACY_KEYS = [
  'vocabProSettings',
  'vocabProSRS',
  'vocabProBookmarks',
  'vocabProDailyGoals',
  'vocabProQuizHistory',
  'vocabProOnboarding',
  'vocabProStreakProtection',
  'vocabProUsers',
  'vocabProCurrentUser',
  'vocabProWOTD',
  'vocabProSoundEnabled',
  'pendingReferral'
];

// In-memory fallback when localStorage is unavailable
let memoryState = null;
let saveTimeout = null;
const DEBOUNCE_MS = 300;

/**
 * Get default state structure
 * @returns {Object} Default state with all required fields
 */
const getDefaultState = () => ({
  version: STORAGE_VERSION,
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),

  // Settings
  settings: {
    soundEnabled: true,
    speechEnabled: true,
    darkMode: true,
    dailyGoalPreset: 'regular',
    showWordOfDay: true,
    showDailyGoals: true,
    autoPlayPronunciation: false,
    hapticFeedback: true,
    notificationsEnabled: false,
    keyboardShortcutsEnabled: true,
    fontSize: 'medium'
  },

  // Spaced Repetition System data
  srs: {},

  // Bookmarks
  bookmarks: [],

  // Daily Goals
  dailyGoals: {
    goalPreset: 'regular',
    customGoal: null,
    history: {}
  },

  // Quiz History
  quizHistory: [],

  // Onboarding
  onboarding: {
    completed: false,
    step: 0,
    skipped: false,
    completedAt: null
  },

  // Streak Protection
  streakProtection: {
    shields: 1,
    lastUsed: null,
    lastEarned: null,
    totalUsed: 0
  },

  // User profiles (for multi-user support)
  users: [],
  currentUser: null,

  // Word of the Day tracking
  wordOfTheDay: null,

  // Pending referral code
  pendingReferral: null,

  // Gamification stats (per-user, but stored here for single-user mode)
  stats: {
    totalPoints: 0,
    correctAnswers: 0,
    totalAnswered: 0,
    currentStreak: 0,
    maxStreak: 0,
    masteredWords: 0,
    learningWords: 0,
    strugglingWords: 0,
    masteredWordsList: [],
    learningWordsList: [],
    strugglingWordsList: [],
    referrals: 0,
    modesPlayed: 0,
    modesPlayedList: [],
    level: 1,
    earnedBadges: [],
    lastPlayedDate: null,
    totalSessionTime: 0,
    averageAccuracy: 0
  }
});

/**
 * Check if localStorage is available
 * @returns {boolean}
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

/**
 * Deep merge two objects
 * @param {Object} target Target object
 * @param {Object} source Source object to merge
 * @returns {Object} Merged object
 */
const deepMerge = (target, source) => {
  const result = { ...target };

  for (const key in source) {
    if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = { ...source[key] };
      }
    } else if (source[key] !== undefined) {
      result[key] = source[key];
    }
  }

  return result;
};

/**
 * Validate state structure and add missing fields from defaults
 * @param {Object} state State to validate
 * @returns {Object} Validated state with all required fields
 */
const validateState = (state) => {
  if (!state || typeof state !== 'object') {
    return getDefaultState();
  }

  const defaults = getDefaultState();
  const validated = deepMerge(defaults, state);
  validated.version = STORAGE_VERSION;

  return validated;
};

/**
 * Migrate from legacy localStorage keys to unified state
 * @returns {Object|null} Migrated state or null if no legacy data
 */
const migrateLegacyData = () => {
  if (!isStorageAvailable()) return null;

  let hasLegacyData = false;
  const state = getDefaultState();

  try {
    // Migrate settings
    const settings = localStorage.getItem('vocabProSettings');
    if (settings) {
      hasLegacyData = true;
      try {
        const parsed = JSON.parse(settings);
        state.settings = { ...state.settings, ...parsed };
      } catch (e) { /* ignore parse errors */ }
    }

    // Migrate sound enabled (separate key)
    const soundEnabled = localStorage.getItem('vocabProSoundEnabled');
    if (soundEnabled !== null) {
      hasLegacyData = true;
      try {
        state.settings.soundEnabled = JSON.parse(soundEnabled);
      } catch (e) { /* ignore */ }
    }

    // Migrate SRS data
    const srs = localStorage.getItem('vocabProSRS');
    if (srs) {
      hasLegacyData = true;
      try {
        state.srs = JSON.parse(srs);
      } catch (e) { /* ignore */ }
    }

    // Migrate bookmarks
    const bookmarks = localStorage.getItem('vocabProBookmarks');
    if (bookmarks) {
      hasLegacyData = true;
      try {
        state.bookmarks = JSON.parse(bookmarks);
      } catch (e) { /* ignore */ }
    }

    // Migrate daily goals
    const dailyGoals = localStorage.getItem('vocabProDailyGoals');
    if (dailyGoals) {
      hasLegacyData = true;
      try {
        state.dailyGoals = JSON.parse(dailyGoals);
      } catch (e) { /* ignore */ }
    }

    // Migrate quiz history
    const quizHistory = localStorage.getItem('vocabProQuizHistory');
    if (quizHistory) {
      hasLegacyData = true;
      try {
        state.quizHistory = JSON.parse(quizHistory);
      } catch (e) { /* ignore */ }
    }

    // Migrate onboarding
    const onboarding = localStorage.getItem('vocabProOnboarding');
    if (onboarding) {
      hasLegacyData = true;
      try {
        state.onboarding = { ...state.onboarding, ...JSON.parse(onboarding) };
      } catch (e) { /* ignore */ }
    }

    // Migrate streak protection
    const streakProtection = localStorage.getItem('vocabProStreakProtection');
    if (streakProtection) {
      hasLegacyData = true;
      try {
        state.streakProtection = { ...state.streakProtection, ...JSON.parse(streakProtection) };
      } catch (e) { /* ignore */ }
    }

    // Migrate users
    const users = localStorage.getItem('vocabProUsers');
    if (users) {
      hasLegacyData = true;
      try {
        state.users = JSON.parse(users);
      } catch (e) { /* ignore */ }
    }

    // Migrate current user
    const currentUser = localStorage.getItem('vocabProCurrentUser');
    if (currentUser) {
      hasLegacyData = true;
      try {
        state.currentUser = JSON.parse(currentUser);
      } catch (e) { /* ignore */ }
    }

    // Migrate word of the day
    const wotd = localStorage.getItem('vocabProWOTD');
    if (wotd) {
      hasLegacyData = true;
      try {
        state.wordOfTheDay = JSON.parse(wotd);
      } catch (e) { /* ignore */ }
    }

    // Migrate pending referral
    const pendingReferral = localStorage.getItem('pendingReferral');
    if (pendingReferral) {
      hasLegacyData = true;
      state.pendingReferral = pendingReferral;
    }

    // If we migrated data, clean up legacy keys
    if (hasLegacyData) {
      state.createdAt = new Date().toISOString();
      state.updatedAt = new Date().toISOString();

      // Remove legacy keys after migration
      LEGACY_KEYS.forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch (e) { /* ignore */ }
      });

      return state;
    }
  } catch (e) {
    console.warn('Storage: Legacy migration failed:', e);
  }

  return null;
};

/**
 * Migrate state from older schema versions
 * @param {Object} state Old state
 * @returns {Object} Migrated state
 */
const migrateState = (state) => {
  if (!state || !state.version) {
    return validateState(state);
  }

  let migrated = { ...state };

  // Add future migrations here as schema evolves
  // Example:
  // if (migrated.version < 2) {
  //   migrated.newField = 'default';
  //   migrated.version = 2;
  // }

  migrated.version = STORAGE_VERSION;
  return validateState(migrated);
};

/**
 * Load state from storage
 * Handles corruption, migration, and fallbacks gracefully
 * @returns {Object} Current app state
 */
const loadState = () => {
  // Return memory state if available (for when localStorage is unavailable)
  if (memoryState) {
    return memoryState;
  }

  if (!isStorageAvailable()) {
    memoryState = getDefaultState();
    return memoryState;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const migrated = migrateState(parsed);
        memoryState = migrated;
        return migrated;
      } catch (parseError) {
        console.warn('Storage: Corrupted state, checking for legacy data');
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    // Try to migrate legacy data
    const legacyState = migrateLegacyData();
    if (legacyState) {
      memoryState = legacyState;
      // Save the migrated state
      saveStateImmediate(legacyState);
      return legacyState;
    }

    // Return fresh defaults
    memoryState = getDefaultState();
    return memoryState;

  } catch (error) {
    console.error('Storage: Failed to load state:', error);
    memoryState = getDefaultState();
    return memoryState;
  }
};

/**
 * Save state immediately without debounce
 * @param {Object} state State to save
 * @returns {boolean} Success status
 */
const saveStateImmediate = (state) => {
  if (!state) return false;

  state.updatedAt = new Date().toISOString();
  memoryState = state;

  if (!isStorageAvailable()) {
    return true; // Memory-only mode
  }

  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError' || error.code === 22) {
      // Try to free up space by trimming quiz history
      try {
        if (state.quizHistory && state.quizHistory.length > 20) {
          state.quizHistory = state.quizHistory.slice(0, 20);
        }
        // Also trim daily goals history older than 30 days
        if (state.dailyGoals && state.dailyGoals.history) {
          const cutoffDate = new Date();
          cutoffDate.setDate(cutoffDate.getDate() - 30);
          const newHistory = {};
          for (const key in state.dailyGoals.history) {
            const [year, month, day] = key.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            if (date >= cutoffDate) {
              newHistory[key] = state.dailyGoals.history[key];
            }
          }
          state.dailyGoals.history = newHistory;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        return true;
      } catch (retryError) {
        console.error('Storage: Quota exceeded, using memory only');
        return false;
      }
    }
    console.error('Storage: Failed to save:', error);
    return false;
  }
};

/**
 * Save state with debouncing to prevent excessive writes
 * @param {Object} state State to save
 * @returns {boolean} Always returns true (async save)
 */
const saveState = (state) => {
  if (!state) return false;

  state.updatedAt = new Date().toISOString();
  memoryState = state;

  // Clear existing timeout
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }

  // Debounce the save
  saveTimeout = setTimeout(() => {
    saveStateImmediate(state);
    saveTimeout = null;
  }, DEBOUNCE_MS);

  return true;
};

/**
 * Force save state immediately (use sparingly)
 * @param {Object} state State to save
 * @returns {boolean} Success status
 */
const saveStateSync = (state) => {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
    saveTimeout = null;
  }
  return saveStateImmediate(state);
};

/**
 * Get current in-memory state without loading from storage
 * @returns {Object|null} Current memory state
 */
const getMemoryState = () => memoryState;

/**
 * Update a specific section of state
 * @param {string} key State section key (e.g., 'settings', 'srs')
 * @param {*} value New value for the section
 * @returns {Object} Updated state
 */
const updateStateSection = (key, value) => {
  const state = loadState();
  state[key] = value;
  saveState(state);
  return state;
};

/**
 * Export state as JSON string for backup
 * @returns {string} JSON string of current state
 */
const exportStateToJSON = () => {
  const state = loadState();
  // Add export metadata
  const exportData = {
    ...state,
    _exportedAt: new Date().toISOString(),
    _appVersion: 'VocabPro-v1',
    _exportVersion: 1
  };
  return JSON.stringify(exportData, null, 2);
};

/**
 * Import state from JSON backup
 * @param {string} jsonString JSON string to import
 * @returns {Object} Result with success status and message
 */
const importStateFromJSON = (jsonString) => {
  try {
    if (!jsonString || typeof jsonString !== 'string') {
      return { success: false, error: 'Invalid input: expected JSON string' };
    }

    const imported = JSON.parse(jsonString);

    // Basic validation
    if (!imported || typeof imported !== 'object') {
      return { success: false, error: 'Invalid backup: not a valid object' };
    }

    // Check if it looks like a VocabPro backup
    const hasRequiredFields = imported.settings || imported.srs || imported.bookmarks;
    if (!hasRequiredFields) {
      return { success: false, error: 'Invalid backup: missing required data' };
    }

    // Remove export metadata
    delete imported._exportedAt;
    delete imported._appVersion;
    delete imported._exportVersion;

    // Validate and merge with defaults
    const validated = validateState(imported);
    validated.updatedAt = new Date().toISOString();

    // Save the imported state
    const saved = saveStateImmediate(validated);

    if (saved) {
      return { success: true, message: 'Backup restored successfully' };
    } else {
      return { success: false, error: 'Failed to save imported data' };
    }

  } catch (error) {
    return { success: false, error: `Parse error: ${error.message}` };
  }
};

/**
 * Reset all state to defaults (with confirmation)
 * @param {boolean} confirm Must be true to actually reset
 * @returns {Object} New default state
 */
const resetState = (confirm = false) => {
  if (!confirm) {
    console.warn('Storage: resetState called without confirmation');
    return loadState();
  }

  const newState = getDefaultState();
  saveStateImmediate(newState);

  // Also clear any remaining legacy keys
  if (isStorageAvailable()) {
    LEGACY_KEYS.forEach(key => {
      try {
        localStorage.removeItem(key);
      } catch (e) { /* ignore */ }
    });
  }

  return newState;
};

/**
 * Get storage info for debugging
 * @returns {Object} Storage information
 */
const getStorageInfo = () => {
  const state = loadState();
  let storageUsed = 0;

  if (isStorageAvailable()) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      storageUsed = stored ? new Blob([stored]).size : 0;
    } catch (e) { /* ignore */ }
  }

  return {
    version: STORAGE_VERSION,
    storageKey: STORAGE_KEY,
    storageAvailable: isStorageAvailable(),
    storageUsedBytes: storageUsed,
    storageUsedKB: Math.round(storageUsed / 1024 * 100) / 100,
    stateVersion: state.version,
    createdAt: state.createdAt,
    updatedAt: state.updatedAt,
    bookmarksCount: state.bookmarks ? state.bookmarks.length : 0,
    srsEntriesCount: state.srs ? Object.keys(state.srs).length : 0,
    quizHistoryCount: state.quizHistory ? state.quizHistory.length : 0
  };
};

// Make functions globally available
window.StorageManager = {
  STORAGE_KEY,
  STORAGE_VERSION,
  getDefaultState,
  loadState,
  saveState,
  saveStateSync,
  getMemoryState,
  updateStateSection,
  migrateState,
  exportStateToJSON,
  importStateFromJSON,
  resetState,
  getStorageInfo,
  isStorageAvailable
};

// Also expose individual functions for convenience
window.getDefaultState = getDefaultState;
window.loadAppState = loadState;
window.saveAppState = saveState;
window.exportStateToJSON = exportStateToJSON;
window.importStateFromJSON = importStateFromJSON;

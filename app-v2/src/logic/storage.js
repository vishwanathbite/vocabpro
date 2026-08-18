/**
 * Centralized Storage Layer
 * Literary Rides VocabPro - Reliable State Management
 *
 * Single source of truth for all app state with:
 * - Schema versioning and migrations
 * - Safe error recovery
 * - Export/import backup functionality
 * - Debounced saves to prevent excessive writes
 *
 * ist-date.js is a leaf — it imports nothing — so depending on it here keeps
 * this module importable by everything else, which is the property the whole
 * dependency graph rests on.
 */

import { toISTDateKey, padDateKey, HISTORY_RETENTION_MS } from './ist-date.js';
/* Also a leaf. The stats shape lives there because gamification.js declares the
   same object and imports THIS module, so neither of those two could own it. */
import { createDefaultStats } from './stats-shape.js';

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
  'vocabProStats',
  'pendingReferral'
];

// Prefix for preserved copies of state blobs that failed to load. A corrupt blob
// may be the only remaining copy of the user's data, so these are kept rather
// than dropped — but capped, since unbounded backups would eat the very quota
// whose exhaustion causes truncated writes in the first place.
const CORRUPT_BACKUP_PREFIX = STORAGE_KEY + '_CORRUPT_';
const MAX_CORRUPT_BACKUPS = 3;

/**
 * How many quiz-history entries are kept. THE SINGLE SOURCE.
 *
 * QuizHistoryManager.addQuiz is the writer and enforces this on every save;
 * the quota-recovery branch below is the only other place that touches the
 * length, and it used to restate a bare 20 — so a quota failure silently threw
 * away 30 entries the writer had deliberately kept, and the two numbers could
 * drift apart without anything noticing.
 *
 * It lives here rather than in settings.js because settings.js imports this
 * module and not the other way round; this module imports nothing but the date
 * leaf, so it is the one end both sides can reach.
 */
const MAX_QUIZ_HISTORY = 50;

// In-memory fallback when localStorage is unavailable
let memoryState = null;
let saveTimeout = null;
const DEBOUNCE_MS = 300;

/**
 * A fresh default settings object. THE ONE DECLARATION of the eleven settings.
 *
 * SettingsManager.defaults in settings.js declared the same eleven keys and
 * values. That module already imports this one, so the copy is closed by having
 * it call this — this module cannot import settings.js back, which is why the
 * declaration lives at this end rather than the other.
 *
 * A factory rather than a shared object even though every value is a primitive:
 * getDefaultState hands its result into a state object that callers mutate, and
 * SettingsManager.defaults is a long-lived property. One object serving both
 * would put a mutation of either within reach of the other. Only where the keys
 * are declared changes; the values are untouched.
 *
 * @returns {Object} Default settings
 */
const createDefaultSettings = () => ({
  soundEnabled: true,
  speechEnabled: true,
  darkMode: true, // App is always dark mode by design
  dailyGoalPreset: 'regular',
  showWordOfDay: true,
  showDailyGoals: true,
  autoPlayPronunciation: false,
  hapticFeedback: true,
  notificationsEnabled: false,
  keyboardShortcutsEnabled: true,
  fontSize: 'medium' // 'small', 'medium', 'large'
});

/**
 * A fresh default daily-challenge section. THE ONE DECLARATION.
 *
 * DailyChallengeManager.loadData declared the same four fields inline as its
 * `||` fallback for a store with no section yet. Same reasoning as the settings
 * above: daily-challenge.js imports this module, so this end owns the shape.
 *
 * A factory because of `history`. It is a nested object, and a shared literal
 * would give every fallback caller the same map — a challenge recorded against
 * one would appear in the next, which is precisely the aliasing class already
 * fixed in dailyGoals.history.
 *
 * @returns {Object} Default daily-challenge state
 */
const createDefaultDailyChallenge = () => ({
  lastCompletedDate: null,
  streak: 0,
  bestStreak: 0,
  history: {}
});

/**
 * Get default state structure
 * @returns {Object} Default state with all required fields
 */
const getDefaultState = () => ({
  version: STORAGE_VERSION,
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),

  // Settings — declared once, above.
  settings: createDefaultSettings(),

  // Spaced Repetition System data
  srs: {},

  // Bookmarks
  bookmarks: [],

  // Daily Goals
  dailyGoals: {
    goalPreset: 'regular',
    customGoal: null,
    history: {},

    /* THE STREAK'S SOURCE OF TRUTH, and deliberately NOT derived from `history`.
       .
       `history` is the bulky per-day record — questions, points, timestamps —
       and it is trimmed to 30 days by cleanupHistory and again by the quota
       path below. getStreak used to walk it, which silently capped every streak
       at ~30: a student on 45 days was told 30, and nobody noticed because no
       tester had reached 30.
       .
       This is the bare fact, one unpadded IST date key per completed day, and
       it is NEVER trimmed. A year of daily study is ~365 keys, roughly 4 KB —
       against a 5 MB quota, that is not a trade worth making. */
    completedDays: []
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
  //
  // shields starts at ZERO, and the welcome shield is granted by
  // awardWeeklyShieldIfDue on first mount instead. Seeding 1 here as well
  // produced two: this section is what loadData actually reads (loadState fills
  // it from these defaults before StreakProtection.loadData spreads its own
  // defaultData under it), and the award then fired on top because lastEarned
  // is null. Granting it there rather than here also stamps lastEarned, so the
  // seven-day interval starts from first open rather than from never.
  streakProtection: {
    shields: 0,
    lastUsed: null,
    lastEarned: null,
    totalUsed: 0,

    /* THE DAYS A SHIELD PAID FOR, as unpadded IST keys — the same keyspace
       dailyGoals.completedDays uses, because getStreak reads the two together
       and a day is unbroken if it appears in either.
       .
       NEVER TRIMMED, and deliberately NOT a flag on the history day it covers:
       history is trimmed to 30 days by cleanupHistory and again by the quota
       path, so a flag there would delete the record of a spend and silently
       un-protect a day the student actually paid a shield for. */
    protectedDays: []
  },

  // User profiles (for multi-user support)
  users: [],
  currentUser: null,

  // Word of the Day tracking
  wordOfTheDay: null,

  // Pending referral code
  pendingReferral: null,

  // Quiz preferences — the last difficulty chosen, per mode.
  //
  // ITS OWN SECTION, AND NOT settings, DELIBERATELY. The js/ tree shares
  // STORAGE_KEY and reads state.settings back (js/screens.js:1529 among
  // others), so a key it has never heard of does not belong in that blob. This
  // section is safe from it in both directions: js/'s deepMerge copies unknown
  // top-level keys through verbatim, and its validateState shape-resets only
  // users, currentUser and stats — so a section it does not understand survives
  // a round-trip through the live app rather than being erased.
  //
  // Verified by reading js/storage.js, not assumed.
  //
  // NO LEGACY KEY. This has never existed outside app-v2, so there is nothing
  // to migrate and nothing is added to LEGACY_KEYS — that list only drives
  // migrateLegacyData, which runs solely when the unified blob is absent.
  //
  // difficultyByMode is keyed by mode id and holds a difficulty string. An
  // absent mode means "no choice made", which is not the same as a choice of
  // the default — the caller resolves that, so the default can change later
  // without rewriting anyone's stored preference.
  quizPreferences: {
    difficultyByMode: {}
  },

  // Daily Challenge — declared once, above.
  dailyChallenge: createDefaultDailyChallenge(),

  // Gamification stats (per-user, but stored here for single-user mode).
  // Declared in stats-shape.js, which gamification.js reads for initializeStats
  // — the section and the initializer can no longer disagree.
  stats: createDefaultStats()
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

  // deepMerge copies scalars through verbatim, so a blob carrying a wrong-typed
  // account section (users as a string, currentUser as a number) would survive
  // merging and be treated as a real session. Reset only sections whose shape is
  // wrong; a well-formed section is never touched.
  if (!Array.isArray(validated.users)) {
    validated.users = defaults.users;
  }
  if (validated.currentUser !== null &&
      (typeof validated.currentUser !== 'object' || Array.isArray(validated.currentUser))) {
    validated.currentUser = defaults.currentUser;
  }
  if (!validated.stats || typeof validated.stats !== 'object' || Array.isArray(validated.stats)) {
    validated.stats = defaults.stats;
  }
  // Added with the section itself in step 12a, rather than left for the first
  // corrupt blob to find. deepMerge's object branch is guarded on the SOURCE
  // being an object, so a stored `"quizPreferences": "easy"` takes the scalar
  // branch and replaces the default object wholesale — every reader would then
  // see a string where it expects a map. Guarding here rather than at the call
  // site protects readers added later, which is why the three above are here.
  if (!validated.quizPreferences || typeof validated.quizPreferences !== 'object' ||
      Array.isArray(validated.quizPreferences)) {
    validated.quizPreferences = defaults.quizPreferences;
  }

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

    // Migrate guest stats. This key predates the unified store and was never
    // migrated, so pre-unification guest progress was being silently orphaned.
    const legacyStats = localStorage.getItem('vocabProStats');
    if (legacyStats) {
      hasLegacyData = true;
      try {
        const parsed = JSON.parse(legacyStats);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          // Adopt-if-greater, measured on totalPoints: only take the legacy blob
          // when it represents at least as much progress as what state.stats
          // already holds, so a stale guest blob can never roll back real
          // progress. Spread over the existing value rather than replacing it so
          // fields the old schema never had arrive populated, not undefined.
          const currentPoints = (state.stats && state.stats.totalPoints) || 0;
          const legacyPoints = parsed.totalPoints || 0;
          if (legacyPoints >= currentPoints) {
            state.stats = { ...state.stats, ...parsed };
          }
        }
      } catch (e) { /* ignore parse errors */ }
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
 * Decide whether a parsed state blob is structurally usable.
 * A blob can parse cleanly and still be unusable (an array, a string, null),
 * in which case deepMerge would silently coerce it into nonsense rather than
 * letting us notice and salvage.
 * @param {*} parsed Result of JSON.parse on the stored blob
 * @returns {boolean}
 */
const isUsableState = (parsed) =>
  !!parsed && typeof parsed === 'object' && !Array.isArray(parsed);

/**
 * Extract one complete JSON value for `"<key>":` out of a damaged blob.
 *
 * Scans forward from the key to its opening bracket, then walks the string
 * tracking depth (and string/escape context, so brackets inside values do not
 * throw off the count) until the value closes. The candidate is only returned
 * if it parses cleanly on its own, so a value that ran into the truncation
 * point is discarded rather than half-recovered.
 *
 * @param {string} raw Raw stored blob
 * @param {string} key Top-level key to extract
 * @returns {*} Parsed value, or undefined if not cleanly recoverable
 */
const extractJSONValue = (raw, key) => {
  const marker = `"${key}":`;

  // Locate the key at the root level only. A plain indexOf would also match the
  // same name nested inside a value — "stats" appears inside every user object —
  // and lift the wrong one into a top-level section.
  let keyAt = -1;
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let j = 0; j < raw.length; j++) {
    const ch = raw[j];

    if (escaped) { escaped = false; continue; }
    if (ch === '\\') { escaped = true; continue; }

    if (ch === '"') {
      // A key of the root object starts while depth is 1 and we are outside a string.
      if (!inString && depth === 1 && raw.startsWith(marker, j)) {
        keyAt = j;
        break;
      }
      inString = !inString;
      continue;
    }
    if (inString) continue;

    if (ch === '{' || ch === '[') depth++;
    else if (ch === '}' || ch === ']') depth--;
  }

  if (keyAt === -1) return undefined;

  let i = keyAt + marker.length;
  while (i < raw.length && /\s/.test(raw[i])) i++;

  const open = raw[i];
  if (open !== '{' && open !== '[') return undefined;
  const close = open === '{' ? '}' : ']';

  // Walk the value tracking depth, so brackets inside nested values and inside
  // strings do not throw off the count.
  let valueDepth = 0;
  inString = false;
  escaped = false;

  for (let j = i; j < raw.length; j++) {
    const ch = raw[j];

    if (escaped) { escaped = false; continue; }
    if (ch === '\\') { escaped = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;

    if (ch === open) valueDepth++;
    else if (ch === close) {
      valueDepth--;
      if (valueDepth === 0) {
        try {
          return JSON.parse(raw.slice(i, j + 1));
        } catch (e) {
          return undefined;
        }
      }
    }
  }

  // Never closed — the value was cut off by the truncation.
  return undefined;
};

/**
 * Sections worth recovering from a damaged blob, with the shape each must have
 * to be trusted.
 *
 * Deliberately excluded:
 *   - pendingReferral: re-arming a referral that may already have been consumed
 *     would award the bonus twice. Losing it is the safer failure.
 *   - wordOfTheDay: rebuilds itself on the next load.
 *   - version/createdAt/updatedAt: metadata, reset by validateState anyway.
 */
const SALVAGEABLE_SECTIONS = {
  users: 'array',
  currentUser: 'object',
  stats: 'object',
  settings: 'object',
  srs: 'object',
  bookmarks: 'array',
  quizHistory: 'array',
  dailyGoals: 'object',
  onboarding: 'object',
  streakProtection: 'object',
  dailyChallenge: 'object',
  quizPreferences: 'object'
};

/**
 * Recover whatever is structurally sound from a state blob that failed to load.
 *
 * Since account data now lives only in the unified blob, discarding a corrupt
 * blob outright destroys the sole copy.
 *
 * Handles three damage shapes, in descending order of confidence:
 *   1. Parses to a usable object — read sections off it directly.
 *   2. Parses to an array wrapping a usable object — unwrap it.
 *   3. Does not parse at all (truncated mid-write, the common quota failure) —
 *      extract individual top-level values by bracket matching. Each candidate
 *      must parse standalone, so a section that ran into the cut is dropped.
 *
 * @param {string} raw Raw stored blob
 * @returns {Object|null} Partial state with whatever was recoverable, or null
 */
const salvageAccountState = (raw) => {
  let source = null;

  try {
    const parsed = JSON.parse(raw);
    if (isUsableState(parsed)) {
      source = parsed;
    } else if (Array.isArray(parsed)) {
      source = parsed.find(isUsableState) || null;
    }
  } catch (e) {
    source = null;
  }

  const salvaged = {};

  for (const key in SALVAGEABLE_SECTIONS) {
    // Read either off the recovered object or, for a blob that never parsed,
    // straight out of the raw text.
    const value = source ? source[key] : extractJSONValue(raw, key);

    if (SALVAGEABLE_SECTIONS[key] === 'array') {
      if (Array.isArray(value)) salvaged[key] = value;
    } else if (isUsableState(value)) {
      salvaged[key] = value;
    }
  }

  return Object.keys(salvaged).length > 0 ? salvaged : null;
};

/**
 * Handle a state blob that could not be loaded.
 * Preserves the original under a timestamped recovery key, salvages what it can,
 * and still falls back to legacy migration for users who never migrated.
 * @param {string} stored The raw blob that failed to load
 * @returns {Object} Best-effort recovered state
 */
const recoverFromCorruptState = (stored) => {
  // Preserve before anything else. Timestamped so a second corruption cannot
  // overwrite the first recovery point.
  try {
    localStorage.setItem(CORRUPT_BACKUP_PREFIX + Date.now(), stored);

    // Keep only the newest few. Keys sort chronologically by their timestamp
    // suffix, so the oldest are simply the first ones off the front.
    const backups = Object.keys(localStorage)
      .filter(k => k.indexOf(CORRUPT_BACKUP_PREFIX) === 0)
      .sort();
    for (let i = 0; i < backups.length - MAX_CORRUPT_BACKUPS; i++) {
      localStorage.removeItem(backups[i]);
    }
  } catch (e) { /* quota or unavailable — salvage below still applies */ }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) { /* ignore */ }

  const salvaged = salvageAccountState(stored);

  // A user can hold a corrupt unified blob *and* un-migrated legacy keys. Keep
  // the legacy fallthrough so their old data is not stranded, then let anything
  // salvaged from the unified blob win — it is the newer of the two.
  const base = migrateLegacyData() || getDefaultState();
  const recovered = validateState(salvaged ? deepMerge(base, salvaged) : base);

  saveStateImmediate(recovered);

  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('storage-corrupted', {
      detail: {
        hasBackup: true,
        salvaged: !!salvaged,
        salvagedSections: salvaged ? Object.keys(salvaged) : []
      }
    }));
  }, 0);

  return recovered;
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
      let parsed;
      let parseFailed = false;

      try {
        parsed = JSON.parse(stored);
      } catch (parseError) {
        parseFailed = true;
      }

      // Parseable-but-invalid is just as corrupt as unparseable: validateState
      // would coerce an array or a bare string into a defaults-shaped object and
      // report success, silently dropping whatever the blob really held.
      if (!parseFailed && isUsableState(parsed)) {
        const migrated = migrateState(parsed);
        memoryState = migrated;
        return migrated;
      }

      console.warn('Storage: Corrupted state detected, preserving and salvaging');
      memoryState = recoverFromCorruptState(stored);
      return memoryState;
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
 * Check storage quota and warn if usage is high
 * Dispatches a custom event that the UI can listen to
 * @returns {Promise<{percentUsed: number, warning: boolean}>}
 */
const checkStorageQuota = async () => {
  try {
    if (navigator.storage && navigator.storage.estimate) {
      const estimate = await navigator.storage.estimate();
      const percentUsed = (estimate.usage / estimate.quota) * 100;
      if (percentUsed > 90) {
        console.warn(`Storage: ${percentUsed.toFixed(1)}% used — consider clearing old data`);
        // Dispatch event for UI to handle
        window.dispatchEvent(new CustomEvent('storage-quota-warning', {
          detail: { percentUsed, usage: estimate.usage, quota: estimate.quota }
        }));
        return { percentUsed, warning: true };
      }
      return { percentUsed, warning: false };
    }
  } catch (e) {
    // Storage estimate not available, silently continue
  }
  return { percentUsed: 0, warning: false };
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
      /* SHED ONTO A CANDIDATE, ADOPT ONLY IF THE RETRY LANDS.
       *
       * `state` IS memoryState by this point — it was assigned above — so
       * trimming it in place made the shedding permanent in memory even when
       * the retry threw. The user lost history and gained nothing, because
       * nothing had been written. The trims are computed into a candidate
       * object instead and copied back onto `state` only after localStorage
       * has accepted them, so memory and disk still agree.
       *
       * What is shed, the order it is shed in, the single retry and the return
       * values are all unchanged.
       */
      try {
        // Try to free up space by trimming quiz history
        const trimmedHistory =
          state.quizHistory && state.quizHistory.length > MAX_QUIZ_HISTORY
            ? state.quizHistory.slice(0, MAX_QUIZ_HISTORY)
            : null;

        /* Also trim daily goals history beyond the retention window.
         *
         * ON THE IST RULE, like the other two trimmers. This built a
         * device-local midnight from each key and compared it against a local
         * cutoff, so on a device behind IST it deleted a day the goals cleanup
         * keeps. Both sides are now padded IST keys compared as strings, which
         * is exactly what DailyGoalsManager.cleanupHistory does.
         *
         * That trimmer is not called here on purpose: it lives in dailygoals.js,
         * which imports this module, and it does its own load and SAVE — a
         * persisting call is the last thing this branch can afford in the
         * middle of a failed write. The cutoff is re-derived from the shared
         * constants instead.
         */
        let trimmedGoalsHistory = null;
        if (state.dailyGoals && state.dailyGoals.history) {
          const cutoffKey = toISTDateKey(Date.now() - HISTORY_RETENTION_MS);
          const newHistory = {};
          for (const key in state.dailyGoals.history) {
            const paddedKey = padDateKey(key);
            // Unparseable key from a corrupt blob: kept, as cleanupHistory keeps it.
            if (paddedKey === null || paddedKey >= cutoffKey) {
              newHistory[key] = state.dailyGoals.history[key];
            }
          }
          trimmedGoalsHistory = newHistory;
        }

        const candidate = { ...state };
        if (trimmedHistory !== null) {
          candidate.quizHistory = trimmedHistory;
        }
        if (trimmedGoalsHistory !== null) {
          candidate.dailyGoals = { ...state.dailyGoals, history: trimmedGoalsHistory };
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(candidate));

        // Written. Now — and only now — the in-memory state adopts the same
        // shedding, so a later read does not report history that is no longer
        // on disk.
        if (trimmedHistory !== null) {
          state.quizHistory = trimmedHistory;
        }
        if (trimmedGoalsHistory !== null) {
          state.dailyGoals.history = trimmedGoalsHistory;
        }
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
    // Check quota after save (async, non-blocking)
    checkStorageQuota();
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
 * Reset all state to defaults. Requires explicit confirmation.
 *
 * Phase 5 step 5 made the flag mandatory. It used to default to false, so
 * `resetState()` logged a warning and returned loadState() — a destructive
 * function that silently did nothing when misused, and worse, returned a
 * plausible state object so the caller had no way to tell the reset had not
 * happened. Throwing turns a silent no-op into an immediate, obvious failure.
 *
 * The check is `!== true`, not falsy: `resetState('true')` and `resetState(1)`
 * are far likelier to be mistakes than intentions, so they throw as well.
 *
 * No app-v2 caller exists yet. The three live callers in the frozen js/ tree
 * (js/app.js:691, js/components.js:228, js/screens.js:1369) all already pass
 * true explicitly, so this matches established usage rather than changing it.
 *
 * @param {boolean} confirm Must be exactly `true` to erase all stored state
 * @throws {Error} If confirm is anything other than boolean true
 * @returns {Object} New default state
 */
const resetState = (confirm) => {
  if (confirm !== true) {
    throw new Error(
      'StorageManager.resetState: explicit confirmation required — pass true ' +
      'to erase all stored state. Refusing to reset.'
    );
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
 *
 * Phase 5 step 5: isStorageAvailable is called once and the result reused. It
 * ran three times per call — twice here plus once inside loadState — and each
 * run is a real localStorage setItem/removeItem probe cycle. The probe itself
 * is left alone: it is transient and self-cleaning, and loadState and
 * resetState depend on it. The returned object is unchanged in shape and value.
 *
 * @returns {Object} Storage information
 */
const getStorageInfo = () => {
  const state = loadState();
  const storageAvailable = isStorageAvailable();
  let storageUsed = 0;

  if (storageAvailable) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      storageUsed = stored ? new Blob([stored]).size : 0;
    } catch (e) { /* ignore */ }
  }

  return {
    version: STORAGE_VERSION,
    storageKey: STORAGE_KEY,
    storageAvailable,
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

// Public API — StorageManager object (constants + functions).
// ESM port of js/storage.js: the former `window.StorageManager = {...}` global
// is now a named export. Behaviour is unchanged.
export const StorageManager = {
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
  isStorageAvailable,
  checkStorageQuota
};

// Convenience named exports — same names the former window globals used.
// (window.loadAppState/saveAppState were aliases for loadState/saveState.)
export { getDefaultState, exportStateToJSON, importStateFromJSON };
// The history cap, for QuizHistoryManager — the writer that enforces it.
export { MAX_QUIZ_HISTORY };
// Default-shape factories, for the modules that used to declare their own copy.
export { createDefaultSettings, createDefaultDailyChallenge };
export { loadState as loadAppState };
export { saveState as saveAppState };

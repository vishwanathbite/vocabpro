/**
 * Settings Manager
 * Literary Rides VocabPro - Settings & Preferences
 * Handles app settings, preferences, and quiz history
 */

// ESM port of js/settings.js. StorageManager is now imported rather than
// sniffed off the global `window`. SoundManager is imported to complete the
// SettingsManager <-> SoundManager cycle: this is a circular import with
// sound.js, but it is load-safe because every reference on both sides is
// runtime-only (inside methods), never dereferenced at module top level.
import { StorageManager } from './storage.js';
import { SoundManager } from './sound.js';
import { DailyGoalsManager } from './dailygoals.js';

// ===========================
// SETTINGS MANAGER
// ===========================

/**
 * Settings Manager - handles all app preferences
 * Uses centralized StorageManager for persistence
 */
const SettingsManager = {
  STORAGE_KEY: 'vocabProSettings', // Legacy key for reference

  /**
   * Default settings
   */
  defaults: {
    soundEnabled: true,
    speechEnabled: true,
    darkMode: true, // App is always dark mode by design

    // DERIVED, NOT STORED. This is a display shadow of dailyGoals.goalPreset,
    // which is the value actually enforced — DailyGoalsManager.getGoal reads
    // only that one (dailygoals.js:168), so a settings copy that drifted would
    // show the user a goal the app was not applying. getSettings below always
    // overwrites this key from the real source, and set() below redirects
    // writes to it. The default here is kept only so the key still resolves if
    // the goals section is somehow unreadable.
    //
    // js/ still writes BOTH copies (js/screens.js:1357-1359) and reads the
    // settings one back (js/screens.js:1529). It is untouched and stays
    // self-consistent; this end just stops trusting its own copy.
    dailyGoalPreset: 'regular',

    showWordOfDay: true,
    showDailyGoals: true,
    autoPlayPronunciation: false,
    hapticFeedback: true,
    notificationsEnabled: false,
    keyboardShortcutsEnabled: true,
    fontSize: 'medium' // 'small', 'medium', 'large'
  },

  /**
   * Get all settings from centralized storage
   */
  getSettings: () => {
    const settings = SettingsManager.readStored();

    // The stored settings.dailyGoalPreset is never trusted — see defaults above.
    // A custom goal is not one of the four presets, so it resolves to no preset
    // rather than to a stale one; readGoalPresetId in LearnScreen makes the same
    // call for the same reason.
    const goals = DailyGoalsManager.loadData();
    settings.dailyGoalPreset = goals.customGoal ? null : goals.goalPreset;

    return settings;
  },

  /**
   * Settings exactly as stored, with NO derivation.
   *
   * The write path uses this rather than getSettings, so a save can never stamp
   * the derived dailyGoalPreset into the stored blob. That blob is shared with
   * js/, which reads settings.dailyGoalPreset to decide which preset row to
   * highlight (js/screens.js:1529) — persisting a derived null there for a user
   * on a custom goal would change what the shipping app draws. This end reads
   * around its copy; it does not rewrite it.
   */
  readStored: () => {
    const state = StorageManager.loadState();
    return { ...SettingsManager.defaults, ...state.settings };
  },

  /**
   * Get a specific setting
   */
  get: (key) => {
    const settings = SettingsManager.getSettings();
    return settings[key] !== undefined ? settings[key] : SettingsManager.defaults[key];
  },

  /**
   * Update a setting
   */
  set: (key, value) => {
    // Redirected to the real store rather than written here, so this end can
    // never create the divergence the shadow made possible. Returning
    // getSettings() re-derives the key, so the caller still sees the new value.
    if (key === 'dailyGoalPreset') {
      DailyGoalsManager.setGoalPreset(value);
      return SettingsManager.getSettings();
    }

    const settings = SettingsManager.readStored();
    settings[key] = value;

    const state = StorageManager.loadState();
    state.settings = settings;
    StorageManager.saveState(state);

    // Apply setting immediately if applicable.
    // SoundManager is now the imported module (completing the cycle with sound.js).
    if (key === 'soundEnabled') {
      SoundManager.enabled = value;
    }

    return settings;
  },

  /**
   * Update multiple settings at once
   */
  setMultiple: (updates) => {
    const { dailyGoalPreset, ...rest } = updates;

    // Same redirect as set(), so a batch cannot smuggle a write past it.
    if (dailyGoalPreset !== undefined) {
      DailyGoalsManager.setGoalPreset(dailyGoalPreset);
    }

    const settings = SettingsManager.readStored();
    Object.assign(settings, rest);

    const state = StorageManager.loadState();
    state.settings = settings;
    StorageManager.saveState(state);

    return SettingsManager.getSettings();
  },

  /**
   * Reset to defaults
   */
  reset: () => {
    const state = StorageManager.loadState();
    state.settings = { ...SettingsManager.defaults };
    StorageManager.saveState(state);
    return SettingsManager.defaults;
  },

  /**
   * Export settings as JSON
   */
  exportSettings: () => {
    return JSON.stringify(SettingsManager.getSettings(), null, 2);
  },

  /**
   * Import settings from JSON
   */
  importSettings: (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      const merged = { ...SettingsManager.defaults, ...imported };

      const state = StorageManager.loadState();
      state.settings = merged;
      StorageManager.saveState(state);

      return { success: true, settings: merged };
    } catch (e) {
      return { success: false, error: 'Invalid settings format' };
    }
  }
};

// ===========================
// QUIZ HISTORY MANAGER
// ===========================

/**
 * Quiz History Manager - tracks completed quizzes
 * Uses centralized StorageManager for persistence
 */
const QuizHistoryManager = {
  STORAGE_KEY: 'vocabProQuizHistory', // Legacy key for reference
  MAX_HISTORY: 50, // Keep last 50 quizzes

  /**
   * Get all quiz history from centralized storage
   */
  getHistory: () => {
    const state = StorageManager.loadState();
    return state.quizHistory || [];
  },

  /**
   * Add a quiz to history
   */
  addQuiz: (quizData) => {
    const history = QuizHistoryManager.getHistory();

    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mode: quizData.mode,
      difficulty: quizData.difficulty,
      questionsTotal: quizData.questionsTotal,
      questionsCorrect: quizData.questionsCorrect,
      score: quizData.score,
      accuracy: quizData.questionsTotal > 0
        ? Math.round((quizData.questionsCorrect / quizData.questionsTotal) * 100)
        : 0,
      timeSpent: quizData.timeSpent || 0,
      words: quizData.words || [] // Words that were part of the quiz
    };

    history.unshift(entry); // Add to beginning

    // Keep only last MAX_HISTORY entries
    if (history.length > QuizHistoryManager.MAX_HISTORY) {
      history.splice(QuizHistoryManager.MAX_HISTORY);
    }

    const state = StorageManager.loadState();
    state.quizHistory = history;
    StorageManager.saveState(state);

    return entry;
  },

  /**
   * Get quiz by ID
   */
  getQuizById: (id) => {
    const history = QuizHistoryManager.getHistory();
    return history.find(q => q.id === id);
  },

  /**
   * Get recent quizzes (last n)
   */
  getRecent: (count = 10) => {
    const history = QuizHistoryManager.getHistory();
    return history.slice(0, count);
  },

  /**
   * Get statistics summary
   */
  getStats: () => {
    const history = QuizHistoryManager.getHistory();

    if (history.length === 0) {
      return {
        totalQuizzes: 0,
        totalQuestions: 0,
        totalCorrect: 0,
        averageAccuracy: 0,
        totalScore: 0,
        byMode: {},
        byDifficulty: {},
        streakData: []
      };
    }

    const stats = {
      totalQuizzes: history.length,
      totalQuestions: 0,
      totalCorrect: 0,
      totalScore: 0,
      byMode: {},
      byDifficulty: {},
      last7Days: []
    };

    // Process each quiz
    history.forEach(quiz => {
      stats.totalQuestions += quiz.questionsTotal;
      stats.totalCorrect += quiz.questionsCorrect;
      stats.totalScore += quiz.score;

      // By mode
      if (!stats.byMode[quiz.mode]) {
        stats.byMode[quiz.mode] = { quizzes: 0, correct: 0, total: 0 };
      }
      stats.byMode[quiz.mode].quizzes++;
      stats.byMode[quiz.mode].correct += quiz.questionsCorrect;
      stats.byMode[quiz.mode].total += quiz.questionsTotal;

      // By difficulty
      if (quiz.difficulty) {
        if (!stats.byDifficulty[quiz.difficulty]) {
          stats.byDifficulty[quiz.difficulty] = { quizzes: 0, correct: 0, total: 0 };
        }
        stats.byDifficulty[quiz.difficulty].quizzes++;
        stats.byDifficulty[quiz.difficulty].correct += quiz.questionsCorrect;
        stats.byDifficulty[quiz.difficulty].total += quiz.questionsTotal;
      }
    });

    stats.averageAccuracy = stats.totalQuestions > 0
      ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100)
      : 0;

    // Last 7 days data
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();

      const dayQuizzes = history.filter(q => new Date(q.date).toDateString() === dateStr);
      last7Days.push({
        date: date,
        dayName: date.toLocaleDateString('en', { weekday: 'short' }),
        quizzes: dayQuizzes.length,
        questions: dayQuizzes.reduce((sum, q) => sum + q.questionsTotal, 0),
        correct: dayQuizzes.reduce((sum, q) => sum + q.questionsCorrect, 0),
        score: dayQuizzes.reduce((sum, q) => sum + q.score, 0)
      });
    }
    stats.last7Days = last7Days;

    return stats;
  },

  /**
   * Clear all history
   */
  clearHistory: () => {
    const state = StorageManager.loadState();
    state.quizHistory = [];
    StorageManager.saveState(state);
  }
};

// ===========================
// ONBOARDING MANAGER
// ===========================

/**
 * Onboarding Manager - handles first-time user experience
 * Uses centralized StorageManager for persistence
 */
const OnboardingManager = {
  STORAGE_KEY: 'vocabProOnboarding', // Legacy key for reference

  /**
   * Default onboarding status
   */
  defaultStatus: {
    completed: false,
    step: 0,
    skipped: false,
    completedAt: null
  },

  /**
   * Get onboarding status from centralized storage
   */
  getStatus: () => {
    const state = StorageManager.loadState();
    return { ...OnboardingManager.defaultStatus, ...state.onboarding };
  },

  /**
   * Check if onboarding is completed
   */
  isCompleted: () => {
    const status = OnboardingManager.getStatus();
    return status.completed || status.skipped;
  },

  /**
   * Update current step
   */
  setStep: (step) => {
    const status = OnboardingManager.getStatus();
    status.step = step;

    const state = StorageManager.loadState();
    state.onboarding = status;
    StorageManager.saveState(state);

    return status;
  },

  /**
   * Complete onboarding
   */
  complete: () => {
    const status = {
      completed: true,
      step: -1,
      skipped: false,
      completedAt: new Date().toISOString()
    };

    const state = StorageManager.loadState();
    state.onboarding = status;
    StorageManager.saveState(state);

    return status;
  },

  /**
   * Skip onboarding
   */
  skip: () => {
    const status = {
      completed: false,
      step: -1,
      skipped: true,
      completedAt: new Date().toISOString()
    };

    const state = StorageManager.loadState();
    state.onboarding = status;
    StorageManager.saveState(state);

    return status;
  },

  /**
   * Reset onboarding (for testing or re-show)
   */
  reset: () => {
    const state = StorageManager.loadState();
    state.onboarding = { ...OnboardingManager.defaultStatus };
    StorageManager.saveState(state);
    return OnboardingManager.getStatus();
  },

  /**
   * Onboarding steps content
   */
  steps: [
    {
      id: 'welcome',
      title: 'Welcome to VocabPro!',
      description: 'Master 5,900+ vocabulary items for competitive exams like UPSC, SSC, Banking & more.',
      icon: '📚',
      highlight: null
    },
    {
      id: 'quiz-modes',
      title: 'Multiple Quiz Modes',
      description: 'Practice vocabulary, synonyms, antonyms, one-word substitutes, and acronyms.',
      icon: '🎯',
      highlight: 'quiz-modes'
    },
    {
      id: 'difficulty',
      title: 'Choose Your Level',
      description: 'Start easy and progress to harder words as you improve. Earn more points for harder questions!',
      icon: '📈',
      highlight: 'difficulty'
    },
    {
      id: 'srs',
      title: 'Smart Learning',
      description: "Get a word wrong, and it goes into Smart Review until you've got it right twice.",
      icon: '🧠',
      highlight: 'smart-review'
    },
    {
      id: 'daily-goals',
      title: 'Stay Consistent',
      description: 'Set daily goals and build streaks. Earn shields to protect your streak!',
      icon: '🔥',
      highlight: 'daily-goals'
    },
    {
      id: 'bookmarks',
      title: 'Save Words',
      description: 'Bookmark words you want to review later. Practice your bookmarked words anytime!',
      icon: '❤️',
      highlight: 'bookmarks'
    },
    {
      id: 'ready',
      title: "You're Ready!",
      description: 'Start with a quick vocabulary quiz to see how VocabPro works.',
      icon: '🚀',
      highlight: null
    }
  ]
};

// ===========================
// KEYBOARD SHORTCUTS MANAGER
// ===========================

/**
 * Keyboard shortcuts configuration
 */
const KeyboardShortcuts = {
  quiz: {
    '1': { action: 'selectOption', option: 0, description: 'Select option A' },
    '2': { action: 'selectOption', option: 1, description: 'Select option B' },
    '3': { action: 'selectOption', option: 2, description: 'Select option C' },
    '4': { action: 'selectOption', option: 3, description: 'Select option D' },
    'a': { action: 'selectOption', option: 0, description: 'Select option A' },
    'b': { action: 'selectOption', option: 1, description: 'Select option B' },
    'c': { action: 'selectOption', option: 2, description: 'Select option C' },
    'd': { action: 'selectOption', option: 3, description: 'Select option D' },
    'Enter': { action: 'next', description: 'Next question / Continue' },
    ' ': { action: 'next', description: 'Next question / Continue' },
    'Escape': { action: 'back', description: 'Exit quiz' },
    'p': { action: 'pronounce', description: 'Pronounce word' },
    's': { action: 'toggleSound', description: 'Toggle sound' }
  },
  flashcard: {
    ' ': { action: 'flip', description: 'Flip card' },
    'Enter': { action: 'flip', description: 'Flip card' },
    'ArrowRight': { action: 'know', description: 'Mark as known' },
    'ArrowLeft': { action: 'dontKnow', description: 'Mark as learning' },
    'k': { action: 'know', description: 'Mark as known' },
    'l': { action: 'dontKnow', description: 'Mark as learning' },
    'p': { action: 'pronounce', description: 'Pronounce word' },
    'Escape': { action: 'back', description: 'Exit flashcards' }
  },
  global: {
    '/': { action: 'search', description: 'Open search' },
    '?': { action: 'help', description: 'Show keyboard shortcuts' },
    'Escape': { action: 'closeModal', description: 'Close modal' }
  }
};

// Public API — same 4 names the former window globals used.
export { SettingsManager, QuizHistoryManager, OnboardingManager, KeyboardShortcuts };

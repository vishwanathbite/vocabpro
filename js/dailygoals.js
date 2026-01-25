/**
 * Daily Goals System
 * Literary Rides VocabPro - Engagement Enhancement
 * Track and motivate daily learning progress
 */

// ===========================
// DAILY GOALS CONFIGURATION
// ===========================

const DAILY_GOAL_PRESETS = {
  casual: { questions: 10, points: 100, name: 'Casual Learner' },
  regular: { questions: 25, points: 250, name: 'Regular Practice' },
  serious: { questions: 50, points: 500, name: 'Serious Study' },
  intense: { questions: 100, points: 1000, name: 'Intense Training' }
};

const DEFAULT_GOAL = DAILY_GOAL_PRESETS.regular;

// ===========================
// DAILY GOALS MANAGER
// ===========================

const DailyGoalsManager = {
  storageKey: 'vocabProDailyGoals', // Legacy key for reference

  /**
   * Default daily goals data
   */
  defaultData: {
    goalPreset: 'regular',
    customGoal: null,
    history: {}
  },

  /**
   * Get today's date string
   */
  getTodayKey: () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  },

  /**
   * Load daily goals data from centralized storage
   */
  loadData: () => {
    if (typeof StorageManager !== 'undefined') {
      const state = StorageManager.loadState();
      return { ...DailyGoalsManager.defaultData, ...state.dailyGoals };
    }
    return loadFromStorage('vocabProDailyGoals', DailyGoalsManager.defaultData);
  },

  /**
   * Save daily goals data to centralized storage
   */
  saveData: (data) => {
    if (typeof StorageManager !== 'undefined') {
      const state = StorageManager.loadState();
      state.dailyGoals = data;
      StorageManager.saveState(state);
    } else {
      saveToStorage('vocabProDailyGoals', data);
    }
  },

  /**
   * Get current goal settings
   */
  getGoal: () => {
    const data = DailyGoalsManager.loadData();
    if (data.customGoal) {
      return data.customGoal;
    }
    return DAILY_GOAL_PRESETS[data.goalPreset] || DEFAULT_GOAL;
  },

  /**
   * Set goal preset
   */
  setGoalPreset: (preset) => {
    const data = DailyGoalsManager.loadData();
    data.goalPreset = preset;
    data.customGoal = null;
    DailyGoalsManager.saveData(data);
  },

  /**
   * Set custom goal
   */
  setCustomGoal: (questions, points) => {
    const data = DailyGoalsManager.loadData();
    data.customGoal = { questions, points, name: 'Custom Goal' };
    DailyGoalsManager.saveData(data);
  },

  /**
   * Get today's progress
   */
  getTodayProgress: () => {
    const data = DailyGoalsManager.loadData();
    const todayKey = DailyGoalsManager.getTodayKey();

    if (!data.history[todayKey]) {
      data.history[todayKey] = {
        questionsAnswered: 0,
        pointsEarned: 0,
        startTime: new Date().toISOString(),
        completed: false
      };
      DailyGoalsManager.saveData(data);
    }

    return data.history[todayKey];
  },

  /**
   * Update today's progress
   */
  updateProgress: (questionsAdded, pointsAdded) => {
    const data = DailyGoalsManager.loadData();
    const todayKey = DailyGoalsManager.getTodayKey();

    if (!data.history[todayKey]) {
      data.history[todayKey] = {
        questionsAnswered: 0,
        pointsEarned: 0,
        startTime: new Date().toISOString(),
        completed: false
      };
    }

    data.history[todayKey].questionsAnswered += questionsAdded;
    data.history[todayKey].pointsEarned += pointsAdded;

    // Check if goal completed
    const goal = DailyGoalsManager.getGoal();
    if (data.history[todayKey].questionsAnswered >= goal.questions ||
        data.history[todayKey].pointsEarned >= goal.points) {
      if (!data.history[todayKey].completed) {
        data.history[todayKey].completed = true;
        data.history[todayKey].completedAt = new Date().toISOString();
      }
    }

    DailyGoalsManager.saveData(data);
    return data.history[todayKey];
  },

  /**
   * Get progress percentage
   */
  getProgressPercentage: () => {
    const progress = DailyGoalsManager.getTodayProgress();
    const goal = DailyGoalsManager.getGoal();

    const questionProgress = (progress.questionsAnswered / goal.questions) * 100;
    const pointsProgress = (progress.pointsEarned / goal.points) * 100;

    // Return the higher of the two (goal can be met either way)
    return Math.min(100, Math.max(questionProgress, pointsProgress));
  },

  /**
   * Check if today's goal is complete
   */
  isGoalComplete: () => {
    const progress = DailyGoalsManager.getTodayProgress();
    return progress.completed;
  },

  /**
   * Get streak (consecutive days with completed goals)
   */
  getStreak: () => {
    const data = DailyGoalsManager.loadData();
    const today = new Date();
    let streak = 0;

    // Check consecutive days backwards
    for (let i = 0; i <= 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateKey = `${checkDate.getFullYear()}-${checkDate.getMonth() + 1}-${checkDate.getDate()}`;

      if (data.history[dateKey] && data.history[dateKey].completed) {
        streak++;
      } else if (i > 0) {
        // Don't break on today if not completed yet
        break;
      }
    }

    return streak;
  },

  /**
   * Get last 7 days history
   */
  getWeekHistory: () => {
    const data = DailyGoalsManager.loadData();
    const history = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateKey = `${checkDate.getFullYear()}-${checkDate.getMonth() + 1}-${checkDate.getDate()}`;

      history.push({
        date: checkDate,
        dayName: checkDate.toLocaleDateString('en-US', { weekday: 'short' }),
        ...data.history[dateKey] || { questionsAnswered: 0, pointsEarned: 0, completed: false }
      });
    }

    return history;
  },

  /**
   * Clear old history (keep last 30 days)
   */
  cleanupHistory: () => {
    const data = DailyGoalsManager.loadData();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30);

    Object.keys(data.history).forEach(key => {
      const [year, month, day] = key.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      if (date < cutoffDate) {
        delete data.history[key];
      }
    });

    DailyGoalsManager.saveData(data);
  }
};

// Export note: In browser environment, DailyGoalsManager is globally available

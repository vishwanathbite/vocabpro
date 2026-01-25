/**
 * Gamification System
 * Literary Rides VocabPro - Modular Architecture
 * XP system, levels, badges, streaks, achievements
 */

// ===========================
// LEVEL SYSTEM
// ===========================

/**
 * Level configuration
 * Defines XP requirements and rewards for each level
 */
const LEVEL_CONFIG = [
  { level: 1, name: 'Beginner', minPoints: 0, maxPoints: 99, color: 'bg-gray-500', badge: '🌱' },
  { level: 2, name: 'Novice', minPoints: 100, maxPoints: 199, color: 'bg-blue-500', badge: '📚' },
  { level: 3, name: 'Learner', minPoints: 200, maxPoints: 299, color: 'bg-green-500', badge: '🎓' },
  { level: 4, name: 'Explorer', minPoints: 300, maxPoints: 399, color: 'bg-yellow-500', badge: '🔍' },
  { level: 5, name: 'Achiever', minPoints: 400, maxPoints: 499, color: 'bg-orange-500', badge: '🏆' },
  { level: 6, name: 'Expert', minPoints: 500, maxPoints: 599, color: 'bg-red-500', badge: '⭐' },
  { level: 7, name: 'Master', minPoints: 600, maxPoints: 699, color: 'bg-purple-500', badge: '👑' },
  { level: 8, name: 'Virtuoso', minPoints: 700, maxPoints: 799, color: 'bg-pink-500', badge: '💎' },
  { level: 9, name: 'Champion', minPoints: 800, maxPoints: 899, color: 'bg-indigo-500', badge: '🏅' },
  { level: 10, name: 'Legend', minPoints: 900, maxPoints: Infinity, color: 'bg-gradient-to-r from-yellow-400 to-orange-500', badge: '🔥' }
];

/**
 * Get level info based on total points
 * @param {number} totalPoints - Total XP points
 * @returns {Object} - Level configuration object
 */
const getLevelInfo = (totalPoints) => {
  return LEVEL_CONFIG.find(l => totalPoints >= l.minPoints && totalPoints <= l.maxPoints) || LEVEL_CONFIG[0];
};

/**
 * Calculate progress to next level
 * @param {number} totalPoints - Total XP points
 * @returns {Object} - {currentLevel, nextLevel, progress, pointsToNext}
 */
const getLevelProgress = (totalPoints) => {
  const currentLevelInfo = getLevelInfo(totalPoints);
  const currentLevelIndex = LEVEL_CONFIG.findIndex(l => l.level === currentLevelInfo.level);
  const nextLevelInfo = LEVEL_CONFIG[currentLevelIndex + 1] || currentLevelInfo;

  const pointsInCurrentLevel = totalPoints - currentLevelInfo.minPoints;
  const pointsNeededForLevel = nextLevelInfo.minPoints - currentLevelInfo.minPoints;
  const progress = pointsNeededForLevel > 0 ? (pointsInCurrentLevel / pointsNeededForLevel) * 100 : 100;

  return {
    currentLevel: currentLevelInfo,
    nextLevel: nextLevelInfo,
    progress: Math.min(progress, 100),
    pointsToNext: Math.max(0, nextLevelInfo.minPoints - totalPoints),
    isMaxLevel: currentLevelInfo.level === 10
  };
};

// ===========================
// BADGES & ACHIEVEMENTS
// ===========================

/**
 * Badge definitions
 * Earned based on various achievements
 */
const BADGES = [
  // Mastery Badges
  { id: 'first_word', name: 'First Steps', description: 'Answer your first question correctly', icon: '🎯', condition: (stats) => stats.correctAnswers >= 1 },
  { id: 'word_master_10', name: 'Word Collector', description: 'Master 10 words', icon: '📖', condition: (stats) => stats.masteredWords >= 10 },
  { id: 'word_master_50', name: 'Vocabulary Builder', description: 'Master 50 words', icon: '📚', condition: (stats) => stats.masteredWords >= 50 },
  { id: 'word_master_100', name: 'Word Wizard', description: 'Master 100 words', icon: '🧙', condition: (stats) => stats.masteredWords >= 100 },
  { id: 'word_master_250', name: 'Lexicon Legend', description: 'Master 250 words', icon: '👑', condition: (stats) => stats.masteredWords >= 250 },
  { id: 'word_master_500', name: 'Vocabulary Virtuoso', description: 'Master 500 words', icon: '💎', condition: (stats) => stats.masteredWords >= 500 },

  // Streak Badges
  { id: 'streak_5', name: 'On Fire', description: 'Get 5 correct answers in a row', icon: '🔥', condition: (stats) => stats.maxStreak >= 5 },
  { id: 'streak_10', name: 'Hot Streak', description: 'Get 10 correct answers in a row', icon: '🌟', condition: (stats) => stats.maxStreak >= 10 },
  { id: 'streak_20', name: 'Unstoppable', description: 'Get 20 correct answers in a row', icon: '⚡', condition: (stats) => stats.maxStreak >= 20 },
  { id: 'streak_50', name: 'Phenomenal', description: 'Get 50 correct answers in a row', icon: '💫', condition: (stats) => stats.maxStreak >= 50 },

  // Points Badges
  { id: 'points_100', name: 'Century', description: 'Earn 100 points', icon: '💯', condition: (stats) => stats.totalPoints >= 100 },
  { id: 'points_500', name: 'Half Thousand', description: 'Earn 500 points', icon: '🎊', condition: (stats) => stats.totalPoints >= 500 },
  { id: 'points_1000', name: 'Millennium', description: 'Earn 1000 points', icon: '🏆', condition: (stats) => stats.totalPoints >= 1000 },
  { id: 'points_2500', name: 'Elite Scorer', description: 'Earn 2500 points', icon: '🥇', condition: (stats) => stats.totalPoints >= 2500 },
  { id: 'points_5000', name: 'Grand Master', description: 'Earn 5000 points', icon: '👑', condition: (stats) => stats.totalPoints >= 5000 },

  // Activity Badges
  { id: 'questions_50', name: 'Curious Mind', description: 'Answer 50 questions', icon: '🤔', condition: (stats) => stats.totalAnswered >= 50 },
  { id: 'questions_100', name: 'Dedicated Learner', description: 'Answer 100 questions', icon: '📝', condition: (stats) => stats.totalAnswered >= 100 },
  { id: 'questions_250', name: 'Quiz Master', description: 'Answer 250 questions', icon: '🎓', condition: (stats) => stats.totalAnswered >= 250 },
  { id: 'questions_500', name: 'Knowledge Seeker', description: 'Answer 500 questions', icon: '🔍', condition: (stats) => stats.totalAnswered >= 500 },
  { id: 'questions_1000', name: 'Eternal Student', description: 'Answer 1000 questions', icon: '📚', condition: (stats) => stats.totalAnswered >= 1000 },

  // Accuracy Badges
  { id: 'accuracy_50', name: 'Good Start', description: 'Maintain 50% accuracy (min 20 questions)', icon: '✅', condition: (stats) => stats.totalAnswered >= 20 && (stats.correctAnswers / stats.totalAnswered) >= 0.5 },
  { id: 'accuracy_75', name: 'Sharp Mind', description: 'Maintain 75% accuracy (min 50 questions)', icon: '🎯', condition: (stats) => stats.totalAnswered >= 50 && (stats.correctAnswers / stats.totalAnswered) >= 0.75 },
  { id: 'accuracy_90', name: 'Perfection', description: 'Maintain 90% accuracy (min 100 questions)', icon: '⭐', condition: (stats) => stats.totalAnswered >= 100 && (stats.correctAnswers / stats.totalAnswered) >= 0.9 },

  // Special Badges
  { id: 'referral', name: 'Social Butterfly', description: 'Refer a friend', icon: '🦋', condition: (stats) => stats.referrals >= 1 },
  { id: 'all_modes', name: 'Jack of All Trades', description: 'Try all quiz modes', icon: '🎭', condition: (stats) => stats.modesPlayed >= 5 }
];

/**
 * Check which badges a user has earned
 * @param {Object} stats - User statistics
 * @returns {Array} - Array of earned badge objects
 */
const getEarnedBadges = (stats) => {
  return BADGES.filter(badge => badge.condition(stats));
};

/**
 * Get newly earned badges (not in previous badges list)
 * @param {Object} stats - Current user statistics
 * @param {Array} previousBadges - Previously earned badge IDs
 * @returns {Array} - Array of newly earned badge objects
 */
const getNewBadges = (stats, previousBadges = []) => {
  const earnedBadges = getEarnedBadges(stats);
  return earnedBadges.filter(badge => !previousBadges.includes(badge.id));
};

// ===========================
// STREAK SYSTEM
// ===========================

/**
 * Update streak based on answer correctness
 * @param {boolean} isCorrect - Whether answer was correct
 * @param {number} currentStreak - Current streak value
 * @returns {number} - New streak value
 */
const updateStreak = (isCorrect, currentStreak) => {
  return isCorrect ? currentStreak + 1 : 0;
};

/**
 * Get streak emoji based on streak value
 * @param {number} streak - Current streak
 * @returns {string} - Emoji representing streak level
 */
const getStreakEmoji = (streak) => {
  if (streak >= 50) return '💫';
  if (streak >= 20) return '⚡';
  if (streak >= 10) return '🌟';
  if (streak >= 5) return '🔥';
  if (streak >= 3) return '✨';
  return '📝';
};

/**
 * Get streak message based on streak value
 * @param {number} streak - Current streak
 * @returns {string} - Motivational message
 */
const getStreakMessage = (streak) => {
  if (streak >= 50) return 'PHENOMENAL! You\'re unstoppable!';
  if (streak >= 20) return 'AMAZING! Keep it up!';
  if (streak >= 10) return 'EXCELLENT! You\'re on fire!';
  if (streak >= 5) return 'GREAT! Keep the momentum!';
  if (streak >= 3) return 'Good streak! Stay focused!';
  return '';
};

// ===========================
// SCORING SYSTEM
// ===========================

/**
 * Points awarded based on difficulty
 */
const POINTS_CONFIG = {
  easy: 10,
  medium: 15,
  hard: 20,
  acronym: 12,
  oneword: 12
};

/**
 * Calculate points for correct answer
 * @param {string} difficulty - Difficulty level or quiz mode
 * @param {number} streak - Current streak (bonus points)
 * @returns {number} - Total points awarded
 */
const calculatePoints = (difficulty, streak = 0) => {
  const basePoints = POINTS_CONFIG[difficulty] || 10;
  const streakBonus = Math.min(streak, 10); // Max 10 bonus points from streak
  return basePoints + streakBonus;
};

// ===========================
// STATISTICS TRACKING
// ===========================

/**
 * Initialize user statistics object
 * @returns {Object} - Initial stats structure
 */
const initializeStats = () => {
  return {
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
  };
};

/**
 * Update statistics after answering a question
 * @param {Object} stats - Current statistics
 * @param {boolean} isCorrect - Whether answer was correct
 * @param {string} difficulty - Difficulty level
 * @param {string} word - The word being tested
 * @param {string} mode - Quiz mode
 * @returns {Object} - Updated statistics
 */
const updateStats = (stats, isCorrect, difficulty, word, mode) => {
  const newStats = { ...stats };

  // Update answer counts
  newStats.totalAnswered += 1;
  if (isCorrect) {
    newStats.correctAnswers += 1;
  }

  // Update streak
  newStats.currentStreak = updateStreak(isCorrect, stats.currentStreak);
  newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);

  // Update points (only for correct answers)
  if (isCorrect) {
    const points = calculatePoints(difficulty, stats.currentStreak);
    newStats.totalPoints += points;
  }

  // Update word mastery tracking
  if (word) {
    // Initialize lists if they don't exist (for backwards compatibility)
    if (!newStats.masteredWordsList) {
      newStats.masteredWordsList = [];
    }
    if (!newStats.learningWordsList) {
      newStats.learningWordsList = [];
    }
    if (!newStats.strugglingWordsList) {
      newStats.strugglingWordsList = [];
    }

    if (isCorrect) {
      // Remove from struggling words if present
      newStats.strugglingWordsList = newStats.strugglingWordsList.filter(w => w !== word);

      // Check if word is already mastered
      if (!newStats.masteredWordsList.includes(word)) {
        // Check if word is in learning phase
        if (newStats.learningWordsList.includes(word)) {
          // Promote from learning to mastered
          newStats.learningWordsList = newStats.learningWordsList.filter(w => w !== word);
          newStats.masteredWordsList.push(word);
        } else {
          // First time correct - add to learning
          newStats.learningWordsList.push(word);
        }
      }
    } else {
      // Incorrect answer
      // Remove from mastered if it was there (demote)
      if (newStats.masteredWordsList.includes(word)) {
        newStats.masteredWordsList = newStats.masteredWordsList.filter(w => w !== word);
        newStats.learningWordsList.push(word);
      }
      // If in learning, move to struggling
      else if (newStats.learningWordsList.includes(word)) {
        newStats.learningWordsList = newStats.learningWordsList.filter(w => w !== word);
        if (!newStats.strugglingWordsList.includes(word)) {
          newStats.strugglingWordsList.push(word);
        }
      }
      // If completely new and wrong, add to struggling
      else if (!newStats.strugglingWordsList.includes(word)) {
        newStats.strugglingWordsList.push(word);
      }
    }

    // Update counts
    newStats.masteredWords = newStats.masteredWordsList.length;
    newStats.learningWords = newStats.learningWordsList.length;
    newStats.strugglingWords = newStats.strugglingWordsList.length;
  }

  // Track mode usage
  if (mode && !newStats.modesPlayedList.includes(mode)) {
    newStats.modesPlayedList.push(mode);
    newStats.modesPlayed = newStats.modesPlayedList.length;
  }

  // Update level
  const levelInfo = getLevelInfo(newStats.totalPoints);
  newStats.level = levelInfo.level;

  // Update average accuracy
  newStats.averageAccuracy = newStats.totalAnswered > 0
    ? (newStats.correctAnswers / newStats.totalAnswered) * 100
    : 0;

  // Update last played date
  newStats.lastPlayedDate = new Date().toISOString();

  // Check for new badges
  const earnedBadges = getEarnedBadges(newStats);
  newStats.earnedBadges = earnedBadges.map(b => b.id);

  return newStats;
};

/**
 * Get performance grade based on accuracy
 * @param {number} accuracy - Accuracy percentage (0-100)
 * @returns {Object} - {grade, color, message}
 */
const getPerformanceGrade = (accuracy) => {
  if (accuracy >= 90) return { grade: 'A+', color: 'text-green-500', message: 'Outstanding!' };
  if (accuracy >= 80) return { grade: 'A', color: 'text-green-400', message: 'Excellent!' };
  if (accuracy >= 70) return { grade: 'B', color: 'text-blue-500', message: 'Good!' };
  if (accuracy >= 60) return { grade: 'C', color: 'text-yellow-500', message: 'Fair' };
  if (accuracy >= 50) return { grade: 'D', color: 'text-orange-500', message: 'Needs Improvement' };
  return { grade: 'F', color: 'text-red-500', message: 'Keep Practicing!' };
};

// ===========================
// STREAK PROTECTION SYSTEM
// ===========================

/**
 * Streak Protection Manager
 * Allows users to protect their streak with shields
 * Uses centralized StorageManager for persistence
 */
const StreakProtection = {
  storageKey: 'vocabProStreakProtection', // Legacy key for reference

  /**
   * Default streak protection data
   */
  defaultData: {
    shields: 1,  // Start with 1 free shield
    lastUsed: null,
    lastEarned: null,
    totalUsed: 0
  },

  /**
   * Load streak protection data from centralized storage
   */
  loadData: () => {
    if (typeof StorageManager !== 'undefined') {
      const state = StorageManager.loadState();
      return { ...StreakProtection.defaultData, ...state.streakProtection };
    }
    return loadFromStorage('vocabProStreakProtection', StreakProtection.defaultData);
  },

  /**
   * Save streak protection data to centralized storage
   */
  saveData: (data) => {
    if (typeof StorageManager !== 'undefined') {
      const state = StorageManager.loadState();
      state.streakProtection = data;
      StorageManager.saveState(state);
    } else {
      saveToStorage('vocabProStreakProtection', data);
    }
  },

  /**
   * Get available shields count
   */
  getShields: () => {
    const data = StreakProtection.loadData();

    // Award a new shield weekly (if they have less than 3)
    const now = new Date();
    const lastEarned = data.lastEarned ? new Date(data.lastEarned) : null;

    if (!lastEarned || (now - lastEarned) > 7 * 24 * 60 * 60 * 1000) {
      if (data.shields < 3) {
        data.shields += 1;
        data.lastEarned = now.toISOString();
        StreakProtection.saveData(data);
      }
    }

    return data.shields;
  },

  /**
   * Use a shield to protect streak
   * @returns {boolean} - True if shield was used successfully
   */
  useShield: () => {
    const data = StreakProtection.loadData();

    if (data.shields > 0) {
      data.shields -= 1;
      data.lastUsed = new Date().toISOString();
      data.totalUsed += 1;
      StreakProtection.saveData(data);
      return true;
    }

    return false;
  },

  /**
   * Add shields (e.g., as a reward)
   * @param {number} count - Number of shields to add
   */
  addShields: (count) => {
    const data = StreakProtection.loadData();
    data.shields = Math.min(data.shields + count, 5); // Max 5 shields
    StreakProtection.saveData(data);
    return data.shields;
  },

  /**
   * Check if streak should be reset or protected
   * @param {Object} stats - User stats
   * @param {string} lastPlayedDate - Last played date ISO string
   * @returns {Object} - {protected: boolean, shieldsRemaining: number}
   */
  checkStreak: (stats, lastPlayedDate) => {
    if (!lastPlayedDate) return { protected: false, shieldsRemaining: 0 };

    const lastPlayed = new Date(lastPlayedDate);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if last played was today or yesterday
    const lastPlayedDay = lastPlayed.toDateString();
    const todayStr = today.toDateString();
    const yesterdayStr = yesterday.toDateString();

    if (lastPlayedDay === todayStr || lastPlayedDay === yesterdayStr) {
      // Streak is safe
      return { protected: false, shieldsRemaining: StreakProtection.getShields() };
    }

    // Streak at risk - check if we can use a shield
    const data = StreakProtection.loadData();
    if (data.shields > 0) {
      // Check if already used a shield today
      if (data.lastUsed) {
        const lastUsedDate = new Date(data.lastUsed).toDateString();
        if (lastUsedDate === todayStr) {
          // Already used a shield today
          return { protected: true, shieldsRemaining: data.shields };
        }
      }

      return {
        protected: false,
        shieldsRemaining: data.shields,
        canProtect: true
      };
    }

    return { protected: false, shieldsRemaining: 0, canProtect: false };
  }
};

// Expose all exports to window for global access
window.LEVEL_CONFIG = LEVEL_CONFIG;
window.getLevelInfo = getLevelInfo;
window.getLevelProgress = getLevelProgress;
window.BADGES = BADGES;
window.getEarnedBadges = getEarnedBadges;
window.getNewBadges = getNewBadges;
window.getStreakEmoji = getStreakEmoji;
window.calculatePoints = calculatePoints;
window.initializeStats = initializeStats;
window.updateStats = updateStats;
window.StreakProtection = StreakProtection;

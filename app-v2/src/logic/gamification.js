/**
 * Gamification System
 * Literary Rides VocabPro - Modular Architecture
 * XP system, levels, badges, streaks, achievements
 */

// ESM port of js/gamification.js. StorageManager is now imported rather than
// sniffed off the global `window`, so it is always defined.
import { StorageManager } from './storage.js';

// ===========================
// LEVEL SYSTEM
// ===========================

/**
 * Level configuration
 * Defines XP requirements and rewards for each level
 *
 * RESCALED TO 100,000 XP in Phase 5b step 7e. It was ten equal 100-point bands
 * topping out at 900, which a student cleared in one evening: calculatePoints
 * awards 10-20 per question plus up to 10 of streak bonus, so a ten-question
 * quiz earns 150-250 and Legend arrived after four or five quizzes. The badge
 * ladder already ran to 5,000 points, so the level table sat five times below
 * the scale the rest of the app assumed.
 *
 * The curve roughly doubles each step, so later levels cost more than earlier
 * ones and the early ones still arrive fast enough to feel responsive:
 * 0 → 150 → 500 → 1k → 2.5k → 5k → 15k → 30k → 60k → 100k.
 *
 * Expert at 5,000 DELIBERATELY COINCIDES with the points_5000 Grand Master
 * badge, so the two systems land their milestones together instead of at
 * unrelated moments.
 *
 * BANDS MUST BE CONTIGUOUS. getLevelInfo tests
 * `totalPoints >= l.minPoints && totalPoints <= l.maxPoints`, so a one-point gap
 * between any two bands makes .find() return undefined and fall through to
 * `|| LEVEL_CONFIG[0]` — silently reporting a 30,000-point student as Beginner.
 * Every maxPoints below is exactly its successor's minPoints minus one, verified
 * by a boundary sweep rather than by eye. Level 10 keeps Infinity.
 *
 * LEVELS ARE NOT STICKY, unlike badges as of step 7c, and that is a deliberate
 * non-fix. Rescaling recomputes an existing user's level downward — someone at
 * 900 points was Legend and is now Learner. Accepted: nobody in the live app has
 * meaningful points, and app-v2 is unreleased. A level is a current standing
 * derived from a running total, not an award; making it sticky would mean storing
 * a high-water mark, which is a schema change for no one's benefit today.
 *
 * Names, ids, colours and badge emoji are unchanged.
 */
const LEVEL_CONFIG = [
  { level: 1, name: 'Beginner', minPoints: 0, maxPoints: 149, color: 'bg-gray-500', badge: '🌱' },
  { level: 2, name: 'Novice', minPoints: 150, maxPoints: 499, color: 'bg-blue-500', badge: '📚' },
  { level: 3, name: 'Learner', minPoints: 500, maxPoints: 999, color: 'bg-green-500', badge: '🎓' },
  { level: 4, name: 'Explorer', minPoints: 1000, maxPoints: 2499, color: 'bg-yellow-500', badge: '🔍' },
  { level: 5, name: 'Achiever', minPoints: 2500, maxPoints: 4999, color: 'bg-orange-500', badge: '🏆' },
  { level: 6, name: 'Expert', minPoints: 5000, maxPoints: 14999, color: 'bg-red-500', badge: '⭐' },
  { level: 7, name: 'Master', minPoints: 15000, maxPoints: 29999, color: 'bg-purple-500', badge: '👑' },
  { level: 8, name: 'Virtuoso', minPoints: 30000, maxPoints: 59999, color: 'bg-pink-500', badge: '💎' },
  { level: 9, name: 'Champion', minPoints: 60000, maxPoints: 99999, color: 'bg-indigo-500', badge: '🏅' },
  { level: 10, name: 'Legend', minPoints: 100000, maxPoints: Infinity, color: 'bg-gradient-to-r from-yellow-400 to-orange-500', badge: '🔥' }
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
 *
 * 24 BADGES. Five were retired in Phase 5b step 7a, down from 29. Each was
 * VERIFIED UNEARNABLE against this tree rather than assumed to be, and none is
 * coming back — do not "restore" them from js/:
 *
 *   idiom_first "Phrase Hunter", idiom_master "Idiom Master",
 *   idiom_wordsmith "Wordsmith" — idioms are cut from this app entirely and
 *     idioms.js was deliberately never ported (see data/loader.js). The counters
 *     they read, idiomsQuizzesCompleted / idiomsPerfectScore /
 *     idiomsDifficultiesCompleted, have no writer that can ever run.
 *
 *   referral "Social Butterfly" — referrals are cut. Nothing in app-v2 writes
 *     stats.referrals, and referrals cannot work without a server: the referrer
 *     is credited nothing and self-referral is trivial.
 *
 *   daily_challenge_7 "Consistent Challenger" — it read stats.dailyChallengeStreak,
 *     which is not declared in the stats schema at all (storage.js:128-152), so
 *     the condition evaluated `undefined >= 7` and was permanently false.
 *     Retired rather than fixed: a visible badge nobody can earn is worse than
 *     no badge.
 *
 * The inert stats fields those conditions read are deliberately STILL IN THE
 * SCHEMA. Old saves contain them, so removing them is a migration rather than a
 * cleanup, and that waits for Phase 6.
 *
 * js/ still ships all 29. That is intentional for the Play Store window — a beta
 * tester losing a badge they already earned is the wrong surprise.
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
  // SEVEN matches the Practice tab exactly: vocab, synonym, antonym, oneword,
  // acronym, flashcard, review. It was 6 when idiom, idiom-reverse and match
  // existed, which made "all quiz modes" describe a number no longer on screen.
  //
  // ACCEPTED, NOT FIXED: modesPlayed is modesPlayedList.length, and an older
  // save's list can still contain retired mode strings — 'match', 'idiom',
  // 'idiom-reverse' — which inflate the count. So an existing user can satisfy
  // this without having tried seven current modes. Filtering the stored list
  // against the live mode set would be a storage migration, which this step does
  // not do.
  //
  // And in the other direction: a user who earned this at six modes does NOT
  // lose it. Their stored earnedBadges retains the id, and step 7c's sticky
  // union in getEarnedBadges re-admits any recorded id whose condition no longer
  // holds. Verified by demonstration, not assumed.
  { id: 'all_modes', name: 'Jack of All Trades', description: 'Try all seven quiz modes', icon: '🎭', condition: (stats) => stats.modesPlayed >= 7 }
];

/**
 * Check which badges a user has earned.
 *
 * ONCE EARNED, ALWAYS EARNED as of Phase 5b step 7c. The returned set is the
 * UNION of badges whose condition holds against `stats` right now and badge ids
 * already recorded in `stats.earnedBadges`.
 *
 * WHY: this used to be a live filter, which made the earned set a report of
 * current status rather than a record of achievement. The three accuracy
 * conditions divide LIFETIME correctAnswers by LIFETIME totalAnswered, so a
 * student who reached 90% and then had a bad week silently LOST Perfection — and
 * because updateStats rewrites stats.earnedBadges from this function on every
 * answered question, the loss persisted to storage. A badge commemorates
 * something you did; it cannot be taken back by later practice.
 *
 * THE UNION IS BUILT BY FILTERING *BADGES*, never by iterating the stored array.
 * That is what discards ids no longer in the table, and it is not optional: step
 * 7a retired five ids, older saves still contain them, and a consumer that maps
 * a stored id through BADGES.find() gets undefined and throws on the first
 * property access — which unmounts the React tree rather than dropping one
 * badge. Iterating BADGES makes an unknown id structurally unrepresentable in
 * the result, rather than filtered out by a rule someone could later remove.
 * It also fixes the return order to BADGES order, which is the display order.
 *
 * THE STICKINESS LIVES HERE, NOT IN updateStats, deliberately. Four call sites
 * recompute the earned set — updateStats, match-scoring.js:104,
 * daily-challenge-scoring.js:93 and ProgressScreen's render — and putting it in
 * updateStats would have fixed one of the four while the render path kept
 * revoking on every mount.
 *
 * STILL PURE. It reads stats.earnedBadges as input, returns a fresh array, and
 * writes nothing — which it must, because ProgressScreen calls it from render.
 * Persistence remains updateStats' job.
 *
 * @param {Object} stats - User statistics; stats.earnedBadges is read as the
 *   record of what has already been earned, and may be absent or malformed
 * @returns {Array} - Array of earned badge objects, in BADGES order. Elements
 *   are LIVE REFERENCES into BADGES — do not mutate them.
 */
const getEarnedBadges = (stats) => {
  const recorded = stats && Array.isArray(stats.earnedBadges) ? stats.earnedBadges : [];
  return BADGES.filter(badge => badge.condition(stats) || recorded.includes(badge.id));
};

/**
 * Get newly earned badges (not in previous badges list)
 *
 * STILL FIRES EXACTLY ONCE PER BADGE under step 7c's sticky union. previousBadges
 * is the PRE-update id list and getEarnedBadges(stats) is now
 * union(conditions-true-now, stats.earnedBadges) — for the newStats objects the
 * scorers pass, that second half was already written by updateStats. So the
 * difference is still precisely the set of conditions that became true on this
 * answer: anything already recorded is in previousBadges and is filtered out
 * here, and stickiness cannot resurrect an announcement for a badge earned in an
 * earlier session.
 *
 * previousBadges is an array of ID STRINGS at every call site
 * (quiz-scoring.js:60 and match-scoring.js:107, both fed from
 * `previousBadgesNext: newStats.earnedBadges`), which is what the `.includes`
 * below compares against. Passing badge OBJECTS would silently match nothing and
 * re-announce everything.
 *
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
  oneword: 12,
  daily: 10
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
    averageAccuracy: 0,
    idiomsQuizzesCompleted: 0,
    idiomsPerfectScore: 0,
    idiomsDifficultiesCompleted: 0,
    idiomsDifficultiesList: []
  };
};

/**
 * Update statistics after answering a question
 * @param {Object} stats - Current statistics
 * @param {boolean} isCorrect - Whether answer was correct
 * @param {string} difficulty - Difficulty level
 * @param {string} word - The word being tested
 * @param {string} mode - Quiz mode
 * @param {string} [nowISO] - Timestamp for lastPlayedDate; defaults to now
 * @returns {Object} - Updated statistics
 */
const updateStats = (stats, isCorrect, difficulty, word, mode, nowISO = new Date().toISOString()) => {
  const newStats = { ...stats };

  // The spread is shallow, so every array field still points at the caller's
  // arrays and the .push calls below would mutate the input. De-alias all six
  // array fields up front rather than just the four mutated today: the invariant
  // we want is "updateStats never aliases its input", and that has to survive
  // someone adding a seventh .push later. Scoping the clone to the current
  // mutation sites would break silently the next time this function changes.
  // earnedBadges is already replaced by its .map() below and idiomsDifficultiesList
  // is not touched here, so cloning those two is behaviourally a no-op — it just
  // buys the invariant for free.
  //
  // Guarded on Array.isArray so a missing field stays missing: the backward-compat
  // `= []` inits below must still see an absent list as absent, and a non-array
  // value from corrupt data is left exactly as it was.
  for (const key of ['masteredWordsList', 'learningWordsList', 'strugglingWordsList',
                     'modesPlayedList', 'earnedBadges', 'idiomsDifficultiesList']) {
    if (Array.isArray(newStats[key])) {
      newStats[key] = [...newStats[key]];
    }
  }

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
  newStats.lastPlayedDate = nowISO;

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
   * Default streak protection data.
   *
   * UNREACHABLE for the shields value on every real load path, and kept in step
   * with storage.js only so the two cannot be read as disagreeing. loadData
   * below spreads this object FIRST and state.streakProtection second, and
   * StorageManager.loadState always populates that section — from
   * getDefaultState on a fresh store or a storage failure, and through
   * validateState's deepMerge against the same defaults for any stored blob,
   * which fills a missing or partial section. So the second spread always wins
   * and storage.js:100 is the effective default.
   *
   * shields is 0 here for the same reason it is 0 there: the welcome shield is
   * granted by awardWeeklyShieldIfDue, which also stamps lastEarned. Seeding 1
   * in the defaults as well was what produced two shields on a fresh store.
   */
  defaultData: {
    shields: 0,
    lastUsed: null,
    lastEarned: null,
    totalUsed: 0
  },

  /**
   * Load streak protection data from centralized storage
   */
  loadData: () => {
    const state = StorageManager.loadState();
    return { ...StreakProtection.defaultData, ...state.streakProtection };
  },

  /**
   * Save streak protection data to centralized storage
   */
  saveData: (data) => {
    const state = StorageManager.loadState();
    state.streakProtection = data;
    StorageManager.saveState(state);
  },

  /**
   * Get available shields count.
   *
   * PURE READ as of Phase 5 step 2. This used to award and persist the weekly
   * shield as a side effect of being asked how many shields exist; that logic
   * now lives in awardWeeklyShieldIfDue, exported separately below. Nothing
   * here mutates or saves.
   *
   * The one caveat, unchanged and not this function's doing: loadData calls
   * StorageManager.loadState, which still writes on its legacy-migration and
   * corruption-recovery paths. Those are boot-time only and belong to storage.js.
   *
   * @returns {number} - Shields currently held
   */
  getShields: () => {
    const data = StreakProtection.loadData();
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
   *
   * UNCHANGED in Phase 5 step 2, but its behaviour shifted underneath it: the
   * getShields call on the "streak is safe" branch below used to transitively
   * award and persist a weekly shield. Now that getShields is a pure read,
   * checkStreak no longer grants anything. Nothing observes this today —
   * checkStreak has zero callers in the live tree and in app-v2, like
   * useShield. Left as-is deliberately; wiring it up is a component-rebuild
   * decision.
   *
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

/**
 * Grant the weekly streak shield, if one is due.
 *
 * THE ONLY FUNCTION THAT GRANTS A WEEKLY SHIELD. Extracted from getShields in
 * Phase 5 step 2, behaviour unchanged, so that asking how many shields exist
 * can no longer award one. Before the split, getShields was called from three
 * render paths (js/screens.js:574, 578 and 2088), two of them four lines apart
 * in the same JSX; a double award was avoided only because
 * StorageManager.loadState returns the memoized state BY REFERENCE, making the
 * first call's mutation visible to the second. That made correctness rest on a
 * memoization detail — cold memoryState, a deferred write, or a re-render
 * landing between the two calls would have awarded twice.
 *
 * MUST BE CALLED FROM AN EFFECT, NEVER FROM RENDER. It writes.
 *
 * WIRED as of Phase 5b step 4c: LearnScreen calls it from a mount effect with
 * an empty dependency array, and lifts the returned count into its shields
 * state only when `awarded` is true.
 *
 * THE ONLY PLACE A SHIELD IS GRANTED as of step 4c-ii, and therefore the source
 * of the welcome shield too. The defaults on both sides now start at 0, so a
 * fresh user holds nothing until the first mount runs this, which grants one
 * (lastEarned is null, so the interval test below passes) and stamps
 * lastEarned. Before that split the defaults seeded 1 and this awarded a second
 * on top, so a brand-new user opened the app holding two while the UI copy said
 * they start with one. Do not reintroduce a non-zero default: the grant has to
 * happen here, because only here does lastEarned get stamped, and an unstamped
 * lastEarned means the next weekly award is due immediately rather than in
 * seven days.
 *
 * The ceiling of 3 below stays a bare literal, and stays deliberately out of
 * step with addShields' cap of 5. The weekly drip stops at 3; a granted reward
 * may reach 5 and is never trimmed back. Reconciling the two is a
 * component-rebuild decision, not this commit's.
 *
 * @param {string} [nowISO] - Current time as an ISO string; defaults to now.
 *   Injected rather than read from the global clock so the weekly boundary is
 *   testable, following the updateStats convention above.
 * @returns {{awarded: boolean, shields: number}} - Whether a shield was granted
 *   on this call, and the resulting shield count either way. Callers can use
 *   `awarded` to decide whether to show feedback.
 */
const awardWeeklyShieldIfDue = (nowISO = new Date().toISOString()) => {
  const data = StreakProtection.loadData();

  // Award a new shield weekly (if they have less than 3).
  // Comparison semantics preserved verbatim from the old getShields: strict
  // greater-than on the elapsed millisecond gap, so exactly 7 days does not
  // qualify, and a strict `< 3` test against the PRE-increment count.
  const now = new Date(nowISO);
  const lastEarned = data.lastEarned ? new Date(data.lastEarned) : null;

  if (!lastEarned || (now - lastEarned) > 7 * 24 * 60 * 60 * 1000) {
    if (data.shields < 3) {
      data.shields += 1;
      data.lastEarned = now.toISOString();
      StreakProtection.saveData(data);
      return { awarded: true, shields: data.shields };
    }
  }

  return { awarded: false, shields: data.shields };
};

// ===========================
// STATS MANAGER (Guest Persistence)
// ===========================

/**
 * Stats Manager - persists gamification stats for guests (no local account)
 * Uses centralized StorageManager for persistence
 */
const StatsManager = {
  storageKey: 'vocabProStats', // Legacy key for reference

  /**
   * Load stats from centralized storage
   */
  loadStats: () => {
    const state = StorageManager.loadState();
    return state.stats || initializeStats();
  },

  /**
   * Save stats to centralized storage
   */
  saveStats: (stats) => {
    const state = StorageManager.loadState();
    state.stats = stats;
    StorageManager.saveState(state);
  }
};

// Public API — the same 12 names the former window globals used, plus
// awardWeeklyShieldIfDue, added in Phase 5 step 2. It is exported standalone
// rather than hung off StreakProtection to keep the one privileged mutation
// entry point visible at the import site: a caller reaching for it has to name
// it, and cannot reach it by accident while reading shield counts.
// updateStreak, getStreakMessage, getPerformanceGrade, POINTS_CONFIG and
// QUALITY_RATINGS stay internal (unexported), as in the original.
export {
  LEVEL_CONFIG,
  getLevelInfo,
  getLevelProgress,
  BADGES,
  getEarnedBadges,
  getNewBadges,
  getStreakEmoji,
  calculatePoints,
  initializeStats,
  updateStats,
  StreakProtection,
  awardWeeklyShieldIfDue,
  StatsManager
};

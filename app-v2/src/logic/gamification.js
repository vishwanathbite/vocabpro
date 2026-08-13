/**
 * Gamification System
 * Literary Rides VocabPro - Modular Architecture
 * XP system, levels, badges, streaks, achievements
 */

// ESM port of js/gamification.js. StorageManager is now imported rather than
// sniffed off the global `window`, so it is always defined.
//
// formatNumber is imported so badge descriptions can state their thresholds in
// the same en-IN grouping the level ladder and every other rendered number use.
// format.js imports nothing, so this adds no cycle.
import { StorageManager } from './storage.js';
import { formatNumber } from './format.js';

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
/*
 * RESCALED AGAIN in step 10, from a 100,000 top to 300,000.
 *
 * The 100,000 curve was set in step 7e against a ten-question quiz earning
 * 150-250. Two later changes moved the earn rate underneath it: step 9 made the
 * daily goal complete on questions only, so a Regular day runs the full 25
 * questions instead of stopping at 14-22 on points, and Smart Review now pays
 * 1.5x on the word's own difficulty. A Regular day at 80% earns roughly 415.
 * Measured against the changed code, that put every student at Level 6 within
 * the first month and at Legend inside a year — the entire top half of the
 * ladder consumed by one year of ordinary use, and nothing above Level 6
 * distinguishing a 70% student from a 90% one.
 *
 * EACH maxPoints IS EXACTLY THE NEXT minPoints MINUS ONE. getLevelInfo does a
 * bounded find and falls back to LEVEL_CONFIG[0] on a miss, so a gap of a single
 * point would report that score as Level 1 — a Legend shown as a Beginner. Every
 * boundary in this table is verified by demonstration, not by inspection.
 *
 * Names, ids, colours and badge emoji are unchanged.
 */
const LEVEL_CONFIG = [
  { level: 1, name: 'Beginner', minPoints: 0, maxPoints: 499, color: 'bg-gray-500', badge: '🌱' },
  { level: 2, name: 'Novice', minPoints: 500, maxPoints: 1499, color: 'bg-blue-500', badge: '📚' },
  { level: 3, name: 'Learner', minPoints: 1500, maxPoints: 3999, color: 'bg-green-500', badge: '🎓' },
  { level: 4, name: 'Explorer', minPoints: 4000, maxPoints: 9999, color: 'bg-yellow-500', badge: '🔍' },
  { level: 5, name: 'Achiever', minPoints: 10000, maxPoints: 24999, color: 'bg-orange-500', badge: '🏆' },
  { level: 6, name: 'Expert', minPoints: 25000, maxPoints: 49999, color: 'bg-red-500', badge: '⭐' },
  { level: 7, name: 'Master', minPoints: 50000, maxPoints: 99999, color: 'bg-purple-500', badge: '👑' },
  { level: 8, name: 'Virtuoso', minPoints: 100000, maxPoints: 179999, color: 'bg-pink-500', badge: '💎' },
  { level: 9, name: 'Champion', minPoints: 180000, maxPoints: 299999, color: 'bg-indigo-500', badge: '🏅' },
  { level: 10, name: 'Legend', minPoints: 300000, maxPoints: Infinity, color: 'bg-gradient-to-r from-yellow-400 to-orange-500', badge: '🔥' }
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
/**
 * THE THRESHOLDS. Every badge number lives here and nowhere else.
 *
 * Each condition below reads from these arrays, and so does every description
 * that states a number — the descriptions are built with template literals
 * through formatNumber, so a threshold and the sentence describing it cannot
 * drift apart, and both match the level ladder's en-IN grouping (300000 renders
 * as "3,00,000" in both places, never as "300,000").
 *
 * STREAK_MILESTONES is exported. quiz-scoring.js carried its own [5, 10, 20, 50]
 * for the mid-quiz streak toast, which had already fallen out of step with the
 * badges — it fired at 5 and 20, which no longer award anything, and stayed
 * silent at 25 and 75, which do. It now imports this array.
 *
 * Ids are deliberately NOT renumbered. 'word_master_10' now means 25 mastered
 * and 'streak_5' means a streak of 10. An id is a storage key: an earned badge
 * is recorded by id in stats.earnedBadges, so renaming one would silently
 * un-earn it for every existing save. The names and descriptions carry the
 * meaning; the ids carry only identity.
 */
const MASTERY_THRESHOLDS = [25, 150, 600, 1850, 5000];
const STREAK_MILESTONES = [10, 25, 50, 75];
const POINTS_THRESHOLDS = [100, 500, 1000, 25000, 300000];
const ACTIVITY_THRESHOLDS = [100, 500, 2000, 6000, 7500];
const ACCURACY_THRESHOLDS = [
  { ratio: 0.60, minAnswered: 50 },
  { ratio: 0.75, minAnswered: 250 },
  { ratio: 0.90, minAnswered: 1000 }
];

const BADGES = [
  // Mastery Badges
  //
  // Bounded by the corpus: 4,809 items can be mastered today — 4,009 vocabulary
  // plus 300 acronyms and 500 one-word substitutes, which became masterable when
  // quiz-scoring started passing wordId in step 8. The top five thresholds sit
  // under that ceiling except the last, deliberately.
  { id: 'first_word', name: 'First Steps', description: 'Answer your first question correctly', icon: '🎯', condition: (stats) => stats.correctAnswers >= 1 },
  { id: 'word_master_10', name: 'Word Collector', description: `Master ${formatNumber(MASTERY_THRESHOLDS[0])} words`, icon: '📖', condition: (stats) => stats.masteredWords >= MASTERY_THRESHOLDS[0] },
  { id: 'word_master_50', name: 'Vocabulary Builder', description: `Master ${formatNumber(MASTERY_THRESHOLDS[1])} words`, icon: '📚', condition: (stats) => stats.masteredWords >= MASTERY_THRESHOLDS[1] },
  { id: 'word_master_100', name: 'Word Wizard', description: `Master ${formatNumber(MASTERY_THRESHOLDS[2])} words`, icon: '🧙', condition: (stats) => stats.masteredWords >= MASTERY_THRESHOLDS[2] },
  { id: 'word_master_250', name: 'Lexicon Legend', description: `Master ${formatNumber(MASTERY_THRESHOLDS[3])} words`, icon: '👑', condition: (stats) => stats.masteredWords >= MASTERY_THRESHOLDS[3] },

  // UNEARNABLE TODAY, AND THAT IS THE POINT. DO NOT RETIRE IT.
  //
  // 5,000 is above the current mastery ceiling of 4,809, so no student can earn
  // this until the corpus grows. It was set knowing that, as a post-expansion
  // trophy: the corpus targets 10,000 items within the year, and a top mastery
  // badge that the most committed student reaches in month nine is not a trophy.
  //
  // This is recorded here because five badges were retired on 31 July for being
  // unearnable, each correctly — they read counters with no writer, and no
  // amount of content would ever have made them earnable. This one is different
  // in kind: its counter works, its condition is sound, and only the corpus size
  // stands between it and a real award. Check the corpus before touching it.
  { id: 'word_master_500', name: 'Vocabulary Virtuoso', description: `Master ${formatNumber(MASTERY_THRESHOLDS[4])} words`, icon: '💎', condition: (stats) => stats.masteredWords >= MASTERY_THRESHOLDS[4] },

  // Streak Badges — maxStreak is consecutive correct answers, unbounded.
  { id: 'streak_5', name: 'On Fire', description: `Get ${formatNumber(STREAK_MILESTONES[0])} correct answers in a row`, icon: '🔥', condition: (stats) => stats.maxStreak >= STREAK_MILESTONES[0] },
  { id: 'streak_10', name: 'Hot Streak', description: `Get ${formatNumber(STREAK_MILESTONES[1])} correct answers in a row`, icon: '🌟', condition: (stats) => stats.maxStreak >= STREAK_MILESTONES[1] },
  { id: 'streak_20', name: 'Unstoppable', description: `Get ${formatNumber(STREAK_MILESTONES[2])} correct answers in a row`, icon: '⚡', condition: (stats) => stats.maxStreak >= STREAK_MILESTONES[2] },
  { id: 'streak_50', name: 'Phenomenal', description: `Get ${formatNumber(STREAK_MILESTONES[3])} correct answers in a row`, icon: '💫', condition: (stats) => stats.maxStreak >= STREAK_MILESTONES[3] },

  // Points Badges — totalPoints is unbounded.
  //
  // TWO OF THESE ARE TIED TO THE LEVEL LADDER ON PURPOSE, and must move with it:
  //   Elite Scorer  25,000  == LEVEL_CONFIG level 6, Expert
  //   Grand Master 300,000  == LEVEL_CONFIG level 10, Legend
  // Earning either should coincide exactly with the level-up it names. Changing
  // one without the other silently breaks that pairing, and nothing else would
  // catch it — the two tables have no other connection.
  { id: 'points_100', name: 'Century', description: `Earn ${formatNumber(POINTS_THRESHOLDS[0])} points`, icon: '💯', condition: (stats) => stats.totalPoints >= POINTS_THRESHOLDS[0] },
  { id: 'points_500', name: 'Half Thousand', description: `Earn ${formatNumber(POINTS_THRESHOLDS[1])} points`, icon: '🎊', condition: (stats) => stats.totalPoints >= POINTS_THRESHOLDS[1] },
  { id: 'points_1000', name: 'Millennium', description: `Earn ${formatNumber(POINTS_THRESHOLDS[2])} points`, icon: '🏆', condition: (stats) => stats.totalPoints >= POINTS_THRESHOLDS[2] },
  { id: 'points_2500', name: 'Elite Scorer', description: `Earn ${formatNumber(POINTS_THRESHOLDS[3])} points`, icon: '🥇', condition: (stats) => stats.totalPoints >= POINTS_THRESHOLDS[3] },
  { id: 'points_5000', name: 'Grand Master', description: `Earn ${formatNumber(POINTS_THRESHOLDS[4])} points`, icon: '👑', condition: (stats) => stats.totalPoints >= POINTS_THRESHOLDS[4] },

  // Activity Badges — totalAnswered counts QUESTIONS, incremented once per
  // answered question in updateStats. Not quizzes. Unbounded.
  { id: 'questions_50', name: 'Curious Mind', description: `Answer ${formatNumber(ACTIVITY_THRESHOLDS[0])} questions`, icon: '🤔', condition: (stats) => stats.totalAnswered >= ACTIVITY_THRESHOLDS[0] },
  { id: 'questions_100', name: 'Dedicated Learner', description: `Answer ${formatNumber(ACTIVITY_THRESHOLDS[1])} questions`, icon: '📝', condition: (stats) => stats.totalAnswered >= ACTIVITY_THRESHOLDS[1] },
  { id: 'questions_250', name: 'Quiz Master', description: `Answer ${formatNumber(ACTIVITY_THRESHOLDS[2])} questions`, icon: '🎓', condition: (stats) => stats.totalAnswered >= ACTIVITY_THRESHOLDS[2] },
  { id: 'questions_500', name: 'Knowledge Seeker', description: `Answer ${formatNumber(ACTIVITY_THRESHOLDS[3])} questions`, icon: '🔍', condition: (stats) => stats.totalAnswered >= ACTIVITY_THRESHOLDS[3] },
  { id: 'questions_1000', name: 'Eternal Student', description: `Answer ${formatNumber(ACTIVITY_THRESHOLDS[4])} questions`, icon: '📚', condition: (stats) => stats.totalAnswered >= ACTIVITY_THRESHOLDS[4] },

  // Accuracy Badges
  //
  // "Reach", not "Maintain". Badges are permanent once earned (getEarnedBadges
  // unions in the stored ids), so a student whose accuracy later falls keeps
  // these — "Maintain" described a rule the app does not enforce.
  { id: 'accuracy_50', name: 'Good Start', description: `Reach ${Math.round(ACCURACY_THRESHOLDS[0].ratio * 100)}% accuracy (min ${formatNumber(ACCURACY_THRESHOLDS[0].minAnswered)} questions)`, icon: '✅', condition: (stats) => stats.totalAnswered >= ACCURACY_THRESHOLDS[0].minAnswered && (stats.correctAnswers / stats.totalAnswered) >= ACCURACY_THRESHOLDS[0].ratio },
  { id: 'accuracy_75', name: 'Sharp Mind', description: `Reach ${Math.round(ACCURACY_THRESHOLDS[1].ratio * 100)}% accuracy (min ${formatNumber(ACCURACY_THRESHOLDS[1].minAnswered)} questions)`, icon: '🎯', condition: (stats) => stats.totalAnswered >= ACCURACY_THRESHOLDS[1].minAnswered && (stats.correctAnswers / stats.totalAnswered) >= ACCURACY_THRESHOLDS[1].ratio },
  { id: 'accuracy_90', name: 'Perfection', description: `Reach ${Math.round(ACCURACY_THRESHOLDS[2].ratio * 100)}% accuracy (min ${formatNumber(ACCURACY_THRESHOLDS[2].minAnswered)} questions)`, icon: '⭐', condition: (stats) => stats.totalAnswered >= ACCURACY_THRESHOLDS[2].minAnswered && (stats.correctAnswers / stats.totalAnswered) >= ACCURACY_THRESHOLDS[2].ratio },

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
 *
 * RETIERED IN PHASE 5B STEP 12B, and read from STREAK_MILESTONES rather than
 * from literals. It tiered on [3, 5, 10, 20, 50] — the pre-step-7 streak badge
 * thresholds, and the third copy of that stale list in this codebase after the
 * one quiz-scoring.js carried. Against the live [10, 25, 50, 75] it collapsed
 * the top: 50 and 75 both landed in the `>= 50` band and returned 💫, so the
 * two rarest achievements in the app looked identical, and 25 was shown the
 * band named for 20.
 *
 * PREVIOUSLY LEFT ALONE ON PURPOSE, as a gradual gauge that happened to move
 * with a streak rather than a table of awards — which was the right call while
 * nothing read it. Step 12b gives it a consumer: the streak moment renders this
 * emoji beside the milestone number, which turns a loose gauge into a claim
 * about which milestone was reached. A claim has to be exact.
 *
 * ONE EMOJI PER MILESTONE, four distinct, and each is the icon of the badge
 * that same milestone awards — 🔥 On Fire, 🌟 Hot Streak, ⚡ Unstoppable,
 * 💫 Phenomenal. The badge and the moment are one event to a student, so they
 * now carry one mark. Below the first milestone there is no award and no claim
 * to make, hence the neutral fallback.
 *
 * The bands stay `>=` rather than exact equality: this is still a gauge, and a
 * streak of 30 should read as the 25 band, not fall through to the fallback.
 *
 * @param {number} streak - Current streak
 * @returns {string} - Emoji representing streak level
 */
const getStreakEmoji = (streak) => {
  if (streak >= STREAK_MILESTONES[3]) return '💫';
  if (streak >= STREAK_MILESTONES[2]) return '⚡';
  if (streak >= STREAK_MILESTONES[1]) return '🌟';
  if (streak >= STREAK_MILESTONES[0]) return '🔥';
  return '📝';
};

/*
 * getStreakMessage WAS HERE, DELETED IN PHASE 5B STEP 13.
 *
 * Unexported and never called, in either tree. It tiered on 3/5/10/20/50 — the
 * pre-step-7 streak thresholds — so against the live STREAK_MILESTONES it named
 * a milestone at 3, 5 and 20 where nothing is awarded and stayed generic at 25
 * and 75 where a badge lands. getStreakEmoji carried the identical stale list
 * and was retiered in step 12b; this one is superseded outright by
 * STREAK_LINES in quiz/moments.js, which is written per real milestone.
 *
 * Recorded rather than silently removed because it is the second of the two
 * stale-threshold copies flagged in step 12b, and a future reader finding
 * STREAK_LINES may wonder whether an older message table was meant to be reused.
 * It was not: its thresholds were wrong and its copy shouted.
 */

// ===========================
// SCORING SYSTEM
// ===========================

/**
 * Points awarded based on difficulty.
 *
 * EXPORTED as of the daily challenge commit, having been internal since the
 * port. daily-challenge.js priced its questions with a hand-written
 * `10 / +5 medium / +10 hard`, which is this table's easy/medium/hard spelled
 * as arithmetic — a second copy of the prices, and one that could not read the
 * `daily` key sitting here for it. The two agreed at the moment they were
 * reconciled; exporting is what stops them drifting apart later, since a
 * retune here now moves the challenge with it.
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
 * Smart Review pays 1.5x. THE SINGLE SOURCE for the multiplier.
 *
 * Measured, not chosen: a Smart Review question was worth 0.786 of a normal one
 * for a mixed-difficulty student, because pool words are by definition the ones
 * the student gets wrong — lower accuracy there, so the streak bonus accumulates
 * less and fewer questions score at all. 1.15 / 0.786 = 1.46, rounded to 1.5,
 * which lands review modestly ahead rather than merely level.
 *
 * It multiplies the WORD'S OWN difficulty, not a flat 10. Review used to resolve
 * to the mode string and fall through calculatePoints' `|| 10`, so every
 * reviewed word scored as easy; that was fixed first precisely so this
 * multiplier would not be applied to the wrong base and cancel half of it.
 */
const REVIEW_POINTS_MULTIPLIER = 1.5;

/**
 * Calculate points for correct answer
 *
 * `mode` is separate from `difficulty` because Smart Review needs both at once:
 * the word's difficulty sets the base, and the mode decides whether the review
 * multiplier applies. Folding review into POINTS_CONFIG as its own key cannot
 * express that — a key there replaces the difficulty rather than scaling it,
 * which is exactly how the flat-10 bug happened.
 *
 * Applied here rather than at the call sites so the two point paths cannot
 * diverge: updateStats accumulates totalPoints and scoreAnswer returns the
 * figure shown to the user, and they must agree.
 *
 * @param {string} difficulty - Difficulty level or quiz mode
 * @param {number} streak - Current streak (bonus points)
 * @param {string} [mode] - Quiz mode; only 'review' changes the result
 * @returns {number} - Total points awarded
 */
const calculatePoints = (difficulty, streak = 0, mode = null) => {
  const basePoints = POINTS_CONFIG[difficulty] || 10;
  const streakBonus = Math.min(streak, 10); // Max 10 bonus points from streak
  const total = basePoints + streakBonus;

  return mode === 'review' ? Math.round(total * REVIEW_POINTS_MULTIPLIER) : total;
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

    // Smart Review queue: every word answered wrong, until it is answered
    // correctly twice with no wrong in between. Replaces the SM-2 scheduler.
    //
    // SECOND COPY, unavoidable today: storage.js:128-152 holds a field-for-field
    // duplicate of this whole object as its `stats` default section, and cannot
    // import it — gamification.js already imports storage.js, so the dependency
    // only runs one way. The two must be edited together; storage.js:139 carries
    // the matching note.
    reviewPool: [],

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
 * Every array field on the stats shape. THE SINGLE SOURCE.
 *
 * Four modules de-alias stats before touching it — this one, match-scoring.js,
 * quiz-summary.js and daily-challenge-scoring.js — and each carried its own copy
 * of this list. When reviewPool was added in step 8 it went into one of the four,
 * so the other three silently stopped covering a field and would have aliased
 * the caller's pool. Nothing caught it because none of the three has a caller
 * yet. They now import this.
 *
 * Adding a field to the stats shape means adding it here, and nowhere else.
 */
const STATS_ARRAY_FIELDS = [
  'masteredWordsList', 'learningWordsList', 'strugglingWordsList',
  'reviewPool', 'modesPlayedList', 'earnedBadges', 'idiomsDifficultiesList'
];

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
  // arrays and the .push calls below would mutate the input. De-alias every
  // array field up front rather than just the ones mutated today: the invariant
  // we want is "updateStats never aliases its input", and that has to survive
  // someone adding another .push later. Scoping the clone to the current
  // mutation sites would break silently the next time this function changes.
  // earnedBadges is already replaced by its .map() below and idiomsDifficultiesList
  // is not touched here, so cloning those two is behaviourally a no-op — it just
  // buys the invariant for free.
  //
  // Guarded on Array.isArray so a missing field stays missing: the backward-compat
  // `= []` inits below must still see an absent list as absent, and a non-array
  // value from corrupt data is left exactly as it was.
  for (const key of STATS_ARRAY_FIELDS) {
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

  // Update points (only for correct answers). `mode` is forwarded so the review
  // multiplier lands in totalPoints too — scoreAnswer computes the same figure
  // for display, and the two must not diverge.
  if (isCorrect) {
    const points = calculatePoints(difficulty, stats.currentStreak, mode);
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

    // Read the review pool through a local that falls back to empty, and always
    // write a fresh array back. A save written before the pool existed has no
    // reviewPool field at all, and this block must not be the thing that throws
    // on it — the same shape as the modesPlayedList crash. loadStats is the one
    // place that supplies the default (see StatsManager.loadStats below); this
    // is a tolerant read, not a second default.
    const pool = Array.isArray(newStats.reviewPool) ? newStats.reviewPool : [];

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

          // THE POOL EXIT, and the only one. Promotion to mastered is now
          // exactly "two corrects since the last wrong answer" for every word,
          // whatever its history — which is what makes this a single equality
          // test rather than a check on how the word got here.
          newStats.reviewPool = pool.filter(w => w !== word);
        } else {
          // First time correct - add to learning
          newStats.learningWordsList.push(word);
          newStats.reviewPool = pool;
        }
      } else {
        newStats.reviewPool = pool;
      }
    } else {
      // Incorrect answer.
      //
      // DEMOTION CHANGED: a mastered word used to fall back only as far as
      // learning, so one correct answer re-mastered it while every other word
      // needed two. Now every wrong answer lands in struggling regardless of
      // where the word was, so the two-corrects rule holds uniformly and
      // "mastered" carries the same meaning for a lapsed word as a new one.
      newStats.masteredWordsList = newStats.masteredWordsList.filter(w => w !== word);
      newStats.learningWordsList = newStats.learningWordsList.filter(w => w !== word);
      if (!newStats.strugglingWordsList.includes(word)) {
        newStats.strugglingWordsList.push(word);
      }

      // THE POOL ENTRY, and the only one.
      newStats.reviewPool = pool.includes(word) ? pool : [...pool, word];
    }

    // Update counts
    newStats.masteredWords = newStats.masteredWordsList.length;
    newStats.learningWords = newStats.learningWordsList.length;
    newStats.strugglingWords = newStats.strugglingWordsList.length;
  }

  // Track mode usage.
  //
  // The tolerant read here is NOT incidental tidying — this line is the recorded
  // crash. A save written before modesPlayedList existed reaches this function
  // with the field absent, the de-alias loop above deliberately leaves a missing
  // field missing, and the backward-compat inits below the mastery block only
  // cover the three word lists. So `.includes` was called on undefined and threw
  // on the first answer after upgrading.
  //
  // Found again while demonstrating the reviewPool migration: a fixture built to
  // look like a genuinely old blob omits BOTH fields, and this is what threw,
  // not the new one. Fixed in the same shape as reviewPool above.
  const modes = Array.isArray(newStats.modesPlayedList) ? newStats.modesPlayedList : [];
  if (mode && !modes.includes(mode)) {
    modes.push(mode);
  }
  newStats.modesPlayedList = modes;
  newStats.modesPlayed = modes.length;

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
 * Record that a mode was played, and change nothing else.
 *
 * WHY THIS EXISTS. modesPlayedList is written in exactly one place — inside
 * updateStats — and updateStats is the per-answer scoring path: it awards
 * points, moves a word through learning/mastered/struggling, and maintains the
 * review pool. Flashcards must do none of those. They are SELF-REPORTED: the
 * student presses Know or Don't know, with nothing checked against them. Routing
 * a flashcard through updateStats would let a student master the corpus by
 * pressing one button, and would let Don't know inject an untested word into the
 * review pool. So flashcards get the mode write on its own, and nothing else.
 *
 * That leaves 'flashcard' as the only mode string with no scoring behind it,
 * which is exactly the product decision: flashcards are for learning, not
 * scoring. Jack of All Trades needs all seven modes and was unearnable without
 * this — the flashcard path never called updateStats in either tree, so
 * 'flashcard' had never entered the list.
 *
 * WHERE THE SCREEN CALLS IT. Once per session from the flashcard screen, on
 * session start or completion — either is fine, since this is idempotent and
 * the badge only cares that the mode appears once. The screen then persists with
 * StatsManager.saveStats, exactly as the quiz screens will with scoreAnswer's
 * newStats. NO CALLER IS ADDED HERE; the flashcard screen does not exist yet.
 *
 * WHAT IT TOUCHES. modesPlayedList, modesPlayed, and earnedBadges. The badge
 * refresh is deliberate and is the one derived field beyond the mode itself:
 * without it a student whose seventh mode is flashcards would not see the badge
 * until their next scored answer, which is the failure this is meant to fix.
 * It cannot award anything else — getEarnedBadges reads stats it does not
 * change, and every other badge condition depends on counters this leaves alone.
 * points, mastery and reviewPool are provably untouched; the demonstration
 * compares them field for field.
 *
 * @param {Object} stats - Current statistics, left untouched
 * @param {string} mode  - Mode identifier, e.g. 'flashcard'
 * @returns {Object} Updated statistics, owning its own arrays
 */
const recordModePlayed = (stats, mode) => {
  const newStats = { ...stats };

  // Same de-alias guarantee as updateStats, via the same list.
  for (const key of STATS_ARRAY_FIELDS) {
    if (Array.isArray(newStats[key])) {
      newStats[key] = [...newStats[key]];
    }
  }

  // Tolerates a save written before modesPlayedList existed, for the same reason
  // updateStats does — that absence is this project's recorded crash.
  const modes = Array.isArray(newStats.modesPlayedList) ? newStats.modesPlayedList : [];
  if (mode && !modes.includes(mode)) {
    modes.push(mode);
  }
  newStats.modesPlayedList = modes;
  newStats.modesPlayed = modes.length;

  newStats.earnedBadges = getEarnedBadges(newStats).map(b => b.id);

  return newStats;
};

/*
 * getPerformanceGrade WAS HERE, DELETED IN PHASE 5B STEP 13.
 *
 * Unexported, zero callers, and NOT reusable by the results screen that would
 * have been its first — which is why it is deleted rather than exported. Three
 * independent reasons, any one sufficient:
 *
 *   1. ITS COPY CONTRADICTS THE APPROVED COPY. It tiered 90/80/70/60/50 into six
 *      grades; the results headline is three tiers at 80/60. They agree on
 *      'Excellent!' at 80 and 'Keep Practicing!' at the floor and disagree in
 *      between — 60 reads 'Fair' here and 'Good Job!' in js/'s modal
 *      (js/app.js:2134). Using this would have meant changing agreed copy.
 *
 *   2. ITS `color` IS THE LEVEL_CONFIG.color HAZARD AGAIN. Tailwind class
 *      strings delivered from a data table at runtime are never seen by v4's
 *      source scanner, so text-green-400 and friends would not be generated and
 *      the grade would render unstyled. app-v2 declined LEVEL_CONFIG.color for
 *      exactly this; importing the same shape here would reintroduce it.
 *
 *   3. `grade` (A+/B/F) appears nowhere in the design.
 *
 * Exporting it would have meant importing a function to use one third of it
 * while carefully not touching the other two thirds. The results screen states
 * its three thresholds once, in quiz/results-copy.js, and that is the only
 * accuracy tiering in app-v2.
 */

// ===========================
// STREAK PROTECTION SYSTEM
// ===========================

/**
 * Streak Protection Manager
 * Allows users to protect their streak with shields
 * Uses centralized StorageManager for persistence
 */
/**
 * THE SHIELD CEILING. One constant, no second copy.
 *
 * RAISED FROM 3 TO 52 with automatic spending. At 3 the cap was a ceiling on a
 * currency nothing could spend, so it only ever throttled a number on a badge.
 * Now that a shield is spent per missed day and a gap must be covered
 * completely, the cap is what decides how long an absence a committed student
 * can survive — and 3 would break a year-long streak over a four-day illness.
 * 52 is one year of weekly grants: it can never be reached by a student who
 * spends any, and it bounds the stored array.
 *
 * TWO READERS, WHICH IS WHY IT IS A CONSTANT: awardWeeklyShieldIfDue's ceiling
 * test, and the Learn sheet copy that states the cap to the student. The same
 * number in a condition and in prose is how the streak-milestone lists drifted.
 */
const MAX_SHIELDS = 52;

/**
 * How often a shield is granted. Was a bare `7 * 24 * 60 * 60 * 1000` inline.
 *
 * Named for the same reason as the cap: the Learn copy says "every week", and a
 * reader changing one should see the other. Behaviour is unchanged — the
 * comparison against it is still strict, so exactly seven days does not qualify.
 */
const SHIELD_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000;

/* `storageKey: 'vocabProStreakProtection'` STOOD HERE and is deleted — the
   fourth of its kind, after BookmarksManager's and the three in settings.js. All
   were labelled "Legacy key for reference" and read by nothing: every access
   here goes through StorageManager into state.streakProtection. The real legacy
   keys live in storage.js's migrateLegacyData, which is the one place with any
   business knowing them. */
const StreakProtection = {
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
    totalUsed: 0,
    /* The days a shield paid for — see storage.js, where the same field is
       declared and the reasoning lives. */
    protectedDays: []
  },

  /**
   * Load streak protection data from centralized storage.
   *
   * protectedDays is COPIED, for the same reason dailyGoals.completedDays is:
   * it defaults to a shared module-level array, and spendShieldsForGap pushes
   * onto whatever this returns. Without the copy, the first spend on a store
   * with no streakProtection section would append to defaultData.protectedDays
   * and leak those days into every later load that fell back to defaults.
   */
  loadData: () => {
    const state = StorageManager.loadState();
    const data = { ...StreakProtection.defaultData, ...state.streakProtection };

    return {
      ...data,
      protectedDays: Array.isArray(data.protectedDays) ? [...data.protectedDays] : []
    };
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
   * The days a shield has paid for. A pure read.
   *
   * @returns {Array<string>} Unpadded IST keys; a copy, safe to hold
   */
  getProtectedDays: () => StreakProtection.loadData().protectedDays,

  /* useShield AND checkStreak WERE HERE, AND ARE REPLACED BY spendShieldsForGap
     BELOW rather than wired up. Both were written for a one-day design and
     could not express this one:

       - checkStreak tested only `lastPlayed === today || yesterday`, so it
         ASSUMED A GAP OF EXACTLY ONE DAY. It had no notion of gap length, and
         all-or-nothing across a five-day gap is a statement about length.
         It also built device-local toDateString() keys, unrelated to the IST
         goals keyspace the streak actually uses, and returned `canProtect` for
         a caller to act on rather than deciding anything itself.
       - useShield spent exactly one shield per call. Bridging a five-day gap
         through it would be five separate loads and saves, and a failure
         midway would leave the student charged for days that were never
         recorded as protected — the partial spend this design forbids.

     addShields was deleted before them, in the step 14 follow-up: zero callers
     in either tree and a ceiling of 5 that nothing else enforced. */

  /**
   * Spend shields to cover a run of missed days. ALL OR NOTHING.
   *
   * THE WHOLE POINT IS THAT A PARTIAL BRIDGE SAVES NOTHING. Three shields
   * against a five-day gap would leave two days uncovered, the streak would
   * break anyway, and the student would have paid three shields for it. So the
   * count is checked first and either every day is covered or none is.
   *
   * ATOMIC. Every field — the decremented count, the new protected days,
   * lastUsed and totalUsed — is assembled on the loaded copy and written by a
   * SINGLE saveData. There is no interleaving point at which the shields are
   * gone but the days are unrecorded.
   *
   * IDEMPOTENT IN PRACTICE, not by a flag: once these days are recorded as
   * protected, the caller's gap search finds them covered and computes a gap of
   * zero, so a second run spends nothing.
   *
   * @param {Array<string>} missedDays Unpadded IST keys, the days to cover
   * @param {string} [nowISO] Injected clock, following the module convention
   * @returns {{spent: number, shields: number, covered: Array<string>}}
   *   `spent` is 0 when nothing was covered, for any reason.
   */
  spendShieldsForGap: (missedDays, nowISO = new Date().toISOString()) => {
    const data = StreakProtection.loadData();
    const days = Array.isArray(missedDays) ? missedDays : [];

    // Nothing missed is the ordinary case for a student who opens the app
    // daily, and it must cost nothing. Checked before the shield count so an
    // empty gap never touches storage.
    if (days.length === 0) {
      return { spent: 0, shields: data.shields, covered: [] };
    }

    // THE ALL-OR-NOTHING TEST. Short by one is short.
    if (data.shields < days.length) {
      return { spent: 0, shields: data.shields, covered: [] };
    }

    const alreadyProtected = new Set(data.protectedDays);
    const covered = days.filter((day) => !alreadyProtected.has(day));

    // Every day already paid for: no second charge for the same day.
    if (covered.length === 0) {
      return { spent: 0, shields: data.shields, covered: [] };
    }

    data.shields -= covered.length;
    data.protectedDays = [...data.protectedDays, ...covered];
    data.lastUsed = nowISO;
    data.totalUsed += covered.length;

    StreakProtection.saveData(data);

    return { spent: covered.length, shields: data.shields, covered };
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
 * THE CEILING IS MAX_SHIELDS, and it is a shared constant rather than a literal
 * because there is now a second reader: the UI copy that tells the student what
 * the cap is. A number written in prose and again in a condition is exactly how
 * the streak-milestone lists drifted earlier in this phase.
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

  // Award a new shield weekly, up to MAX_SHIELDS.
  // Comparison semantics preserved verbatim from the old getShields: strict
  // greater-than on the elapsed millisecond gap, so exactly one interval does
  // not qualify, and a strict `<` test against the PRE-increment count.
  const now = new Date(nowISO);
  const lastEarned = data.lastEarned ? new Date(data.lastEarned) : null;

  if (!lastEarned || (now - lastEarned) > SHIELD_INTERVAL_MS) {
    if (data.shields < MAX_SHIELDS) {
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
   * Load stats from centralized storage.
   *
   * THE ONE PLACE reviewPool is defaulted. Every other reader may assume the
   * field is present on what this returns; nothing else in the app should
   * re-supply it.
   *
   * A stored blob is NOT deep-merged against the defaults — validateState only
   * replaces `stats` wholesale when it is not an object at all (storage.js:219),
   * so a save written before a field existed arrives here missing that field and
   * reaches consumers intact. That is the modesPlayedList crash, which no guard
   * upstream would have caught. Fields are filled here rather than repaired at
   * every read site.
   *
   * Only reviewPool is normalised, deliberately. The rest of the shape is left
   * exactly as stored: retro-filling the other lists would paper over a genuinely
   * corrupt blob, and updateStats already has backward-compat inits for the three
   * word lists. This is the field with no such init and no history in the wild.
   */
  loadStats: () => {
    const state = StorageManager.loadState();
    const stats = state.stats || initializeStats();

    if (Array.isArray(stats.reviewPool)) {
      return stats;
    }

    return { ...stats, reviewPool: [] };
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
// updateStreak stays internal (unexported), as in the original.
// (QUALITY_RATINGS was listed here too, but it never lived in this module — it
// was srs.js's, and went with it.)
//
// POINTS_CONFIG was on that internal list and is now EXPORTED — see the note
// above it. It left the list because a second consumer appeared that prices
// questions without going through calculatePoints: the daily challenge scores a
// whole session at once, with its own perfect and streak bonuses, so it needs
// the base prices rather than the per-answer function built around them.
//
// getStreakMessage and getPerformanceGrade were also on this list and are now
// DELETED, in step 13; see the notes where each stood. Both were unexported
// with zero callers, and both carried thresholds that had fallen out of step
// with the tables that superseded them.
export {
  LEVEL_CONFIG,
  POINTS_CONFIG,
  MAX_SHIELDS,
  SHIELD_INTERVAL_MS,
  getLevelInfo,
  getLevelProgress,
  BADGES,
  getEarnedBadges,
  getNewBadges,
  getStreakEmoji,
  calculatePoints,
  initializeStats,
  updateStats,
  recordModePlayed,
  STATS_ARRAY_FIELDS,
  STREAK_MILESTONES,
  StreakProtection,
  awardWeeklyShieldIfDue,
  StatsManager
};

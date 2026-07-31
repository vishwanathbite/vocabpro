/**
 * Match Game Scoring
 * Literary Rides VocabPro - Modular Architecture
 *
 * Pure completion core extracted from handleMatchComplete in js/app.js
 * (app.js:1827-1897). Holds ONLY the deterministic derivation: the match score
 * formula, the per-pair mastery fold, the points overwrite, and the level/badge
 * recomputation.
 *
 * Everything impure stays in the caller (Phase 5 wiring):
 *   - all setState calls (setMatchScore, setMatchComplete, setStats,
 *     setShowAchievement, setPreviousBadges, setShowLevelUp, setPreviousLevel)
 *   - the three setTimeout blocks: badge at 500ms, level-up at 4500ms when a
 *     badge is also showing else 500ms, daily-goal toast at 1000ms
 *   - SoundManager.playAchievement / playLevelUp
 *   - toast.success
 *   - QuizHistoryManager.addQuiz          (persists) — use `historyEntry`
 *   - DailyGoalsManager.updateProgress    (persists) — use `goalProgress`
 *   - DailyGoalsManager.isGoalComplete    (persists too — it lazily creates and
 *     saves today's history entry via getTodayProgress, despite the read-y name)
 *
 * Time is injected (`matchTimer`, `nowISO`) rather than read, so the function is
 * fully deterministic and testable.
 *
 * Note, deliberately not changed here: the live handler takes a `totalMatched`
 * parameter it never uses (app.js:1827, called with newMatched.length at 1801).
 */

import {
  updateStats,
  getLevelInfo,
  getEarnedBadges,
  getNewBadges,
  STATS_ARRAY_FIELDS
} from './gamification.js';

/**
 * Compute the result of a completed match game.
 *
 * @param {Object}  args
 * @param {Array}   args.matchPairs         - Matched pairs, each with a `word`
 * @param {number}  args.matchTimer         - Seconds elapsed
 * @param {number}  args.matchFirstTryCount - Pairs matched on the first attempt
 * @param {number}  args.matchWrong         - Wrong attempts
 * @param {Object}  args.stats              - Current (pre-update) statistics
 * @param {string}  args.difficulty         - Selected difficulty (may be empty)
 * @param {Array}   args.previousBadges     - Previously earned badge IDs
 * @param {number}  args.previousLevel      - Level before this game
 * @param {string}  args.nowISO             - ISO timestamp, passed to updateStats
 * @returns {Object} Completion result; see the return block below.
 */
export function completeMatchGame({
  matchPairs,
  matchTimer,
  matchFirstTryCount,
  matchWrong,
  stats,
  difficulty,
  previousBadges,
  previousLevel,
  nowISO
}) {
  // Calculate score
  let finalScore = 50; // Base points per round
  if (matchTimer < 30) finalScore += 20; // Time bonus under 30s
  else if (matchTimer < 60) finalScore += 10; // Time bonus under 60s

  // Accuracy bonus: +5 per first-try match
  finalScore += matchFirstTryCount * 5;

  // Wrong attempt penalty
  finalScore -= matchWrong * 5;
  if (finalScore < 0) finalScore = 0;

  // Update stats — track word mastery for each matched pair
  let newStats = { ...stats };

  // The spread is shallow. updateStats de-aliases its own input, but with an
  // empty matchPairs the fold never runs and the arrays above would still point
  // at the caller's. De-alias up front so the guarantee is unconditional.
  for (const key of STATS_ARRAY_FIELDS) {
    if (Array.isArray(newStats[key])) {
      newStats[key] = [...newStats[key]];
    }
  }

  const diffKey = difficulty || 'easy';
  const pointsBefore = newStats.totalPoints;
  matchPairs.forEach(pair => {
    // MODE DELIBERATELY OMITTED. This passed 'match', which was the only thing
    // still writing that string into modesPlayedList. Match is cut and Jack of
    // All Trades now names seven live modes, so a 'match' entry could only
    // inflate the count toward a badge without the student having played seven
    // current modes — the inflation route already noted at gamification.js:169.
    // updateStats skips the mode block entirely on a falsy mode, so passing null
    // removes the write and changes nothing else about the mastery fold.
    newStats = updateStats(newStats, true, diffKey, pair.word, null, nowISO);
  });

  // Restore per-word points added by updateStats — match game uses its own
  // scoring. This DELIBERATELY discards everything the fold just accumulated
  // into totalPoints (app.js:1851). It reads like a bug and it is not: the
  // per-pair points are an artifact of reusing updateStats for mastery
  // tracking, and the match game scores itself. Do not "fix" this.
  newStats.totalPoints = pointsBefore + finalScore;

  const levelInfo = getLevelInfo(newStats.totalPoints);
  newStats.level = levelInfo.level;
  newStats.earnedBadges = getEarnedBadges(newStats).map(b => b.id);

  // Check for new achievements
  const newBadges = getNewBadges(newStats, previousBadges);

  // Check for level up
  const levelUp = newStats.level > previousLevel ? getLevelInfo(newStats.totalPoints) : null;

  return {
    finalScore,
    newStats,
    newBadges,
    levelUp,                                   // levelInfo object or null
    previousBadgesNext: newStats.earnedBadges, // mirrors setPreviousBadges at app.js:1863

    // Exact payload the wrapper hands to QuizHistoryManager.addQuiz
    // (app.js:1878-1886). questionsTotal/questionsCorrect are hard-coded 5 in
    // the original — not matchPairs.length — and `difficulty` is the raw closure
    // value here, NOT the `diffKey` fallback used for the fold.
    historyEntry: {
      mode: 'match',
      difficulty: difficulty,
      questionsTotal: 5,
      questionsCorrect: 5, // All pairs matched
      score: finalScore,
      timeSpent: matchTimer,
      words: matchPairs.map(p => p.word)
    },

    // Arguments for DailyGoalsManager.updateProgress (app.js:1890) — also a
    // hard-coded 5 in the original.
    goalProgress: { questions: 5, points: finalScore }
  };
}

/**
 * Daily Challenge Completion Scoring
 * Literary Rides VocabPro - Modular Architecture
 *
 * Pure completion core extracted from handleDailyChallengeComplete in
 * js/app.js (app.js:1585-1615). Holds ONLY the deterministic derivation: the
 * session total, the stats update, the level recomputation, and the history and
 * result payloads.
 *
 * Everything impure stays in the caller (Phase 5 wiring):
 *   - all five setState calls (setStats, setDailyChallengeCompleted,
 *     setDailyChallengeResult, setDailyChallengeStreak,
 *     setShowDailyChallengeResults)
 *   - DailyChallengeManager.calculateDailyPoints (reads storage via
 *     this.getStreak() when its streak argument is omitted)
 *   - DailyChallengeManager.completeChallenge (persists)
 *   - QuizHistoryManager.addQuiz (persists) — use `historyEntry`
 *   - stopSpeech() (Web Speech API)
 *
 * `points` and `streak` are injected rather than derived, because both
 * originate in those two manager calls. The function reads no clock and no
 * storage, so it is fully deterministic and testable.
 *
 * ALIASING BUG RETIRED, not preserved. The original does its own shallow
 * `{ ...stats }` at app.js:1591; this version de-aliases and never touches its
 * input. Same bug class already closed in updateStats (step 3), match-scoring
 * (step 4) and quiz-summary (step 5), and safe for the same reason: the stats
 * array fields have no readers anywhere in the repo — only their derived
 * scalars are read. The returned newStats is value-identical to the original's.
 *
 * ---------------------------------------------------------------------------
 * NO LONGER PRESERVED — fixed with the daily challenge screen:
 *
 *   1. Badges awarded silently. This handler recomputed earnedBadges and level
 *      but never called getNewBadges, so a badge earned in a challenge appeared
 *      in the collection with no announcement — unlike handleAnswer and
 *      handleMatchComplete. It now returns `newBadges` and `previousBadgesNext`
 *      in exactly the shape quiz-scoring.js does (:122 and :160), and the
 *      session hook feeds them to the SAME buildMoments queue the quiz uses.
 *      No second announcement mechanism was built.
 *
 * STILL TRUE, and not this commit's to fix:
 *
 *   2. dailyChallengeStreak is written onto the stats object here (app.js:1593)
 *      and this is its ONLY write anywhere, yet the field is absent from the
 *      default stats shape in storage.js. It no longer gates anything: the
 *      daily_challenge_7 badge that read it was retired in app-v2
 *      (gamification.js:142), so this write now feeds no condition at all.
 * ---------------------------------------------------------------------------
 */

import {
  getLevelInfo,
  getEarnedBadges,
  getNewBadges,
  STATS_ARRAY_FIELDS
} from './gamification.js';
/* helpers.js is a leaf — it imports nothing — so this adds no cycle. Same
   reasoning quiz-summary.js records at its own import of this function. */
import { wordIdOf } from './helpers.js';

/**
 * Compute the result of a completed daily challenge.
 *
 * @param {Object}  args
 * @param {Array}   args.dailyChallengeQuestions - The day's question set
 * @param {number}  args.correctCount            - Answers the user got right
 * @param {Object}  args.stats                   - Current statistics
 * @param {number}  args.points                  - From calculateDailyPoints (wrapper)
 * @param {number}  args.streak                  - From completeChallenge (wrapper)
 * @param {Array}   [args.previousBadges]        - Badge ID STRINGS held before this
 *   challenge, read once at session start. Strings, not objects — getNewBadges
 *   compares with `.includes`, so badge objects would match nothing and
 *   re-announce the student's entire collection.
 * @param {number}  [args.previousLevel]         - Level before this challenge
 * @returns {Object} Completion result; see the return block below.
 */
export function completeDailyChallenge({
  dailyChallengeQuestions,
  correctCount,
  stats,
  points,
  streak,
  previousBadges = [],
  previousLevel = null
}) {
  const totalQ = dailyChallengeQuestions.length;

  // Add points to stats
  const newStats = { ...stats };

  // De-alias before touching anything — see the module header. The original
  // omitted this; nothing below pushes onto an array today, but the guarantee
  // is unconditional so it survives future edits.
  for (const key of STATS_ARRAY_FIELDS) {
    if (Array.isArray(newStats[key])) {
      newStats[key] = [...newStats[key]];
    }
  }

  newStats.totalPoints += points;
  newStats.dailyChallengeStreak = streak;
  const levelInfo = getLevelInfo(newStats.totalPoints);
  newStats.level = levelInfo.level;
  const earnedBadges = getEarnedBadges(newStats);
  newStats.earnedBadges = earnedBadges.map(b => b.id);

  /* THE ANNOUNCEMENT, in quiz-scoring.js's exact shape (:122 and :160).
     Diffed ONCE per challenge rather than once per answer, which is the real
     difference between this path and the quiz's: nothing here writes stats
     mid-session, so there is no carry-forward list to advance between answers
     and none of useQuizSession's per-answer badge bookkeeping applies. */
  const newBadges = getNewBadges(newStats, previousBadges);

  /* Level-up, on the same test quiz-scoring.js:125 uses. Null rather than a
     stale object when the level did not move, and null when the caller passed
     no previousLevel — an unknown previous level must not read as a level-up. */
  const levelUp =
    previousLevel !== null && newStats.level > previousLevel ? levelInfo : null;

  return {
    totalQ,
    newStats,
    levelInfo,
    newBadges,
    levelUp,
    // Mirrors quiz-scoring.js:160. ID strings, ready to be the next call's
    // previousBadges — the challenge is one session, so nothing reads it today,
    // and it exists so a second diff against this result cannot be built from
    // the badge OBJECTS above by mistake.
    previousBadgesNext: newStats.earnedBadges,

    // Exact payload the wrapper hands to QuizHistoryManager.addQuiz
    // (app.js:1601-1608). difficulty is hard-coded 'mixed' and score carries the
    // computed `points` rather than a per-answer session score.
    //
    // words goes through wordIdOf, the same resolver quiz-summary.js uses, so
    // both writers into quizHistory follow ONE rule. DEFENSIVE ONLY, and
    // verified rather than assumed: every question generateQuestions can build
    // is vocabulary-shaped and bails on `!word.word`, so `q.word` is always a
    // non-empty string and wordIdOf short-circuits on that same first arm —
    // identical output today. The change is what keeps them identical if the
    // challenge ever serves an acronym or one-word item, whose id lives on
    // wordData and which the old bare `q.word` would have dropped.
    historyEntry: {
      mode: 'daily',
      difficulty: 'mixed',
      questionsTotal: totalQ,
      questionsCorrect: correctCount,
      score: points,
      words: dailyChallengeQuestions.map(wordIdOf).filter(Boolean)
    },

    // Exact payload for setDailyChallengeResult (app.js:1611). Note `score`
    // here is correctCount, NOT points — points is carried separately in the
    // same object.
    challengeResult: { score: correctCount, total: totalQ, points }
  };
}

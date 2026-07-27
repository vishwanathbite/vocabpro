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
 * PRESERVED, do not "fix" here — Phase 5 work:
 *
 *   1. No new-badge notification. This handler recomputes earnedBadges and
 *      level but never calls getNewBadges, plays no sound and shows no
 *      achievement toast — unlike handleAnswer and handleMatchComplete. A user
 *      who earns daily_challenge_7 gets no notification; the badge simply
 *      appears in their collection. That absence is reproduced exactly here.
 *
 *   2. dailyChallengeStreak is written onto the stats object here (app.js:1593)
 *      and this is its ONLY write anywhere, yet the field is absent from the
 *      default stats shape in storage.js. Until a daily challenge completes,
 *      the daily_challenge_7 badge condition evaluates `undefined >= 7`.
 * ---------------------------------------------------------------------------
 */

import { getLevelInfo, getEarnedBadges } from './gamification.js';

// The six array fields on the stats shape. Mirrors the de-alias list in
// gamification.js, match-scoring.js and quiz-summary.js so the "never alias the
// caller's input" guarantee holds here too.
const STATS_ARRAY_FIELDS = [
  'masteredWordsList', 'learningWordsList', 'strugglingWordsList',
  'modesPlayedList', 'earnedBadges', 'idiomsDifficultiesList'
];

/**
 * Compute the result of a completed daily challenge.
 *
 * @param {Object}  args
 * @param {Array}   args.dailyChallengeQuestions - The day's question set
 * @param {number}  args.correctCount            - Answers the user got right
 * @param {Object}  args.stats                   - Current statistics
 * @param {number}  args.points                  - From calculateDailyPoints (wrapper)
 * @param {number}  args.streak                  - From completeChallenge (wrapper)
 * @returns {Object} Completion result; see the return block below.
 */
export function completeDailyChallenge({
  dailyChallengeQuestions,
  correctCount,
  stats,
  points,
  streak
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

  return {
    totalQ,
    newStats,
    levelInfo,

    // Exact payload the wrapper hands to QuizHistoryManager.addQuiz
    // (app.js:1601-1608). difficulty is hard-coded 'mixed', score carries the
    // computed `points` rather than a per-answer session score, and the words
    // list maps q.word with NO fallback chain — unlike quiz-summary.js, which
    // falls back through wordData.acronym/phrase/idiom. It does filter(Boolean).
    historyEntry: {
      mode: 'daily',
      difficulty: 'mixed',
      questionsTotal: totalQ,
      questionsCorrect: correctCount,
      score: points,
      words: dailyChallengeQuestions.map(q => q.word).filter(Boolean)
    },

    // Exact payload for setDailyChallengeResult (app.js:1611). Note `score`
    // here is correctCount, NOT points — points is carried separately in the
    // same object.
    challengeResult: { score: correctCount, total: totalQ, points }
  };
}

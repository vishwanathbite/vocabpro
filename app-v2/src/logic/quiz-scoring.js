/**
 * Quiz Answer Scoring
 * Literary Rides VocabPro - Modular Architecture
 *
 * Pure scoring core extracted from handleAnswer in js/app.js (app.js:1359-1436).
 * This module holds ONLY the deterministic derivation: correctness, response
 * time, stats update, badge/level/streak detection, and points.
 *
 * Everything impure stays in the caller (Phase 5 wiring):
 *   - all setState calls (setStats, setScore, setShowAchievement, ...)
 *   - the four setTimeout blocks and their toast sequencing
 *   - SoundManager.play* calls
 *   - DailyGoalsManager.updateProgress (persists)
 *   - DailyGoalsManager.isGoalComplete (persists too — it lazily creates and
 *     saves today's history entry via getTodayProgress, despite the read-y name)
 *
 * The Smart Review pool is NOT in that list and is not the caller's job. It
 * lives on stats.reviewPool and is maintained inside updateStats, so it rides
 * along with the newStats the caller already persists. SRSManager.updateEntry
 * used to be listed above as a separate caller-side write; it no longer exists.
 *
 * Time is injected (`now`, `nowISO`) rather than read, so the function is
 * fully deterministic and testable.
 */

import { updateStats, getNewBadges, getLevelInfo, calculatePoints } from './gamification.js';

/**
 * Score a single quiz answer.
 *
 * @param {Object}  args
 * @param {*}       args.answer          - The option the user picked
 * @param {Object}  args.currentQuestion - The question being answered
 * @param {Object}  args.stats           - Current (pre-update) statistics
 * @param {string}  args.difficulty      - Selected difficulty (may be empty)
 * @param {string}  args.mode            - Quiz mode
 * @param {Array}   args.previousBadges  - Previously earned badge IDs
 * @param {number}  args.previousLevel   - Level before this answer
 * @param {number}  args.now             - Date.now() value, injected by caller
 * @param {string}  args.nowISO          - ISO timestamp, passed to updateStats
 * @returns {Object} Scoring result; see the return block below.
 */
export function scoreAnswer({
  answer,
  currentQuestion,
  stats,
  difficulty,
  mode,
  previousBadges,
  previousLevel,
  now,
  nowISO
}) {
  const correct = answer === currentQuestion.correct;
  const responseTime = now - (currentQuestion.startTime || now);

  // Canonical word identity, resolved the same way everywhere in the app.
  const wordId = currentQuestion.word || currentQuestion.wordData?.acronym || currentQuestion.wordData?.phrase || currentQuestion.wordData?.idiom;

  const difficultyOrMode = difficulty || mode;

  // wordId, NOT currentQuestion.word. generateQuestions sets `word` for the
  // vocabulary-shaped modes but not for acronym or oneword, so those two used to
  // arrive here as undefined and skip the entire mastery block in updateStats —
  // an acronym could never be mastered, and under the new model could never
  // enter the review pool either. They now count like every other question.
  const newStats = updateStats(stats, correct, difficultyOrMode, wordId, mode, nowISO);

  // Check for new achievements
  const newBadges = getNewBadges(newStats, previousBadges);

  // Check for level up
  const levelUp = newStats.level > previousLevel ? getLevelInfo(newStats.totalPoints) : null;

  // Check for streak milestones
  const streakMilestone = correct && [5, 10, 20, 50].includes(newStats.currentStreak)
    ? newStats.currentStreak
    : null;

  // NOTE: points use stats.currentStreak — the PRE-update streak from the
  // original closure (app.js:1418) — NOT newStats.currentStreak. Switching to
  // the post-update value would silently change every score. Do not "fix" this.
  const points = correct ? calculatePoints(difficultyOrMode, stats.currentStreak) : 0;

  return {
    correct,
    responseTime,
    wordId,
    newStats,
    newBadges,
    points,
    levelUp,                                  // levelInfo object or null
    streakMilestone,                          // number or null
    previousBadgesNext: newStats.earnedBadges // mirrors setPreviousBadges at app.js:1392
  };
}

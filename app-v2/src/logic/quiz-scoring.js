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

import {
  updateStats,
  getNewBadges,
  getLevelInfo,
  calculatePoints,
  STREAK_MILESTONES
} from './gamification.js';

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

  // POINTS KEY. The word's OWN difficulty first, then the question's source
  // mode, then the quiz's selected difficulty, then the session's mode.
  //
  // Smart Review is why the chain exists at all. It is cross-difficulty by
  // design, so it passes no difficulty and this used to resolve to the mode
  // string 'review' — which is not a key in POINTS_CONFIG, so calculatePoints
  // fell through to its `|| 10` and every reviewed word scored as easy. A hard
  // word reviewed earned 10 instead of 20, and the words in the pool are the
  // ones the student found hardest. Any future multiplier on Smart Review would
  // have been multiplying that flat 10 and partly cancelling this fix, which is
  // why the word's own difficulty lands first.
  //
  // `sourceMode` IS THE SECOND LINK, AND IT EXISTS BECAUSE THE FIRST ONE ONLY
  // COVERS VOCABULARY. All 4,009 vocabulary words carry
  // `difficulty: 'easy' | 'medium' | 'hard'` in the data files; acronyms and
  // one-word substitutes carry none, in either tree. The earlier version of this
  // comment claimed those two therefore "fall through to the mode and keep
  // scoring 12 exactly as before". That was true of the DEDICATED acronym and
  // oneword modes, where the session's mode genuinely is the points key — and
  // false of Smart Review, which is the case this whole block is about: there
  // the mode is 'review', so both categories took the base-10 default and a
  // reviewed acronym was paid as if it were an easy word.
  //
  // buildQuestionFromItem now stamps `sourceMode` on exactly those two shapes at
  // generation, where the kind is still known. So today:
  //
  //   reviewed vocabulary   -> its own difficulty  (10 / 15 / 20), then x1.5
  //   reviewed acronym      -> 'acronym'           (12),           then x1.5
  //   reviewed one-word     -> 'oneword'           (12),           then x1.5
  //   dedicated acronym     -> no sourceMode, no difficulty, mode 'acronym' (12)
  //   ordinary vocab quiz   -> its own difficulty, unchanged
  //
  // The dedicated modes are untouched: their questions are built by
  // generateQuestions' own branches, which stamp nothing, so those sessions
  // still resolve through `mode` exactly as before.
  const difficultyOrMode =
    currentQuestion.wordData?.difficulty || currentQuestion.sourceMode || difficulty || mode;

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

  // Check for streak milestones.
  //
  // READ, NOT COPIED. This was a literal [5, 10, 20, 50] — its own copy of the
  // streak badge thresholds, and the first duplicate in this codebase found
  // already disagreeing with its original rather than merely at risk of it: the
  // badges moved to 10/25/50/75, so this fired a milestone toast at 5 and 20
  // where nothing is awarded, and stayed silent at 25 and 75 where a badge
  // lands. The toast and the badge are the same moment to a student.
  //
  // No cycle: this module already imports from gamification.js, and nothing in
  // gamification.js imports back.
  const streakMilestone = correct && STREAK_MILESTONES.includes(newStats.currentStreak)
    ? newStats.currentStreak
    : null;

  // NOTE: points use stats.currentStreak — the PRE-update streak from the
  // original closure (app.js:1418) — NOT newStats.currentStreak. Switching to
  // the post-update value would silently change every score. Do not "fix" this.
  //
  // `mode` is the third argument, and it is the same one updateStats forwarded
  // above, so the Smart Review multiplier lands identically on the figure shown
  // to the user and the figure accumulated into totalPoints.
  const points = correct ? calculatePoints(difficultyOrMode, stats.currentStreak, mode) : 0;

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

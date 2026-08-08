/**
 * Quiz Completion Summary
 * Literary Rides VocabPro - Modular Architecture
 *
 * Pure completion core extracted from handleQuizComplete in js/app.js
 * (app.js:1461-1506). Holds ONLY the deterministic derivation: the session
 * total, the history word list, the results summary, and the idiom-specific
 * counter branch.
 *
 * Everything impure stays in the caller (Phase 5 wiring):
 *   - all setState calls (setStats, setQuizResults, setShowQuizCompleteModal)
 *   - QuizHistoryManager.addQuiz (persists) — use `historyEntry`
 *   - stopSpeech() (Web Speech API)
 *
 * The handler reads no clock, so unlike scoreAnswer/completeMatchGame this
 * function needs no injected time. (QuizHistoryManager.addQuiz stamps its own
 * id/date internally, but that happens in the wrapper.)
 *
 * ALIASING — THIS EXTRACTION RETIRES A BUG RATHER THAN PRESERVING IT.
 * The original does its own shallow `{ ...stats }` at app.js:1476 and then
 * pushes onto idiomsDifficultiesList at 1486, mutating the CALLER's stats
 * object in place. That is the same bug class fixed in updateStats, but an
 * independent occurrence — the Phase 4 step 3 fix does not reach it, because
 * this code never calls updateStats.
 *
 * Retiring it is safe: idiomsDifficultiesList has no reader anywhere in the
 * repo outside these lines. Only the derived scalar idiomsDifficultiesCompleted
 * is read, by the idiom_wordsmith badge (`stats.idiomsDifficultiesCompleted >= 3`,
 * gamification.js). The returned newStats is value-identical to what the
 * original produced; the only difference is that the input is left untouched.
 */

import { getLevelInfo, STATS_ARRAY_FIELDS } from './gamification.js';
/* helpers.js is a leaf — it imports nothing — so this adds no cycle. */
import { wordIdOf } from './helpers.js';

/**
 * Summarize a completed quiz.
 *
 * @param {Object}  args
 * @param {Array}   args.questions    - The questions that made up the session
 * @param {string}  args.mode         - Quiz mode
 * @param {string}  args.difficulty   - Selected difficulty (may be empty)
 * @param {number}  args.correctCount - Answers the user got right
 * @param {number}  args.score        - Session score accumulated per-answer
 * @param {Object}  args.stats        - Current statistics
 * @returns {Object} Summary; see the return block below.
 */
export function summarizeQuizResults({
  questions,
  mode,
  difficulty,
  correctCount,
  score,
  stats
}) {
  const sessionTotal = questions.length;

  /* Same resolver as the scoring and generation sites — see wordIdOf. This one
     is the low-stakes member of the family: historyEntry.words is stored but
     nothing renders it, so a divergence here would have been invisible rather
     than stranding a word in Smart Review. It shares the implementation anyway,
     so the family has one member and not two-plus-one. */
  const words = questions.map(wordIdOf).filter(Boolean);

  // Track idiom-specific badge stats.
  // The original calls setStats ONLY inside this branch (app.js:1490), so
  // newStats is null for every other mode and the wrapper must skip setStats
  // entirely rather than writing back an unchanged object.
  let newStats = null;
  if (mode === 'idiom' || mode === 'idiom-reverse') {
    newStats = { ...stats };

    // De-alias before touching anything — see the module header. The original
    // omitted this and mutated the caller's idiomsDifficultiesList.
    for (const key of STATS_ARRAY_FIELDS) {
      if (Array.isArray(newStats[key])) {
        newStats[key] = [...newStats[key]];
      }
    }

    if (!newStats.idiomsQuizzesCompleted) newStats.idiomsQuizzesCompleted = 0;
    newStats.idiomsQuizzesCompleted += 1;
    if (correctCount === sessionTotal) {
      if (!newStats.idiomsPerfectScore) newStats.idiomsPerfectScore = 0;
      newStats.idiomsPerfectScore += 1;
    }
    // Note the asymmetry, preserved as written: the difficulty list is tracked
    // for 'idiom' only, never for 'idiom-reverse', and only when difficulty is
    // truthy.
    if (difficulty && mode === 'idiom') {
      if (!newStats.idiomsDifficultiesList) newStats.idiomsDifficultiesList = [];
      if (!newStats.idiomsDifficultiesList.includes(difficulty)) {
        newStats.idiomsDifficultiesList.push(difficulty);
      }
      newStats.idiomsDifficultiesCompleted = newStats.idiomsDifficultiesList.length;
    }
  }

  return {
    sessionTotal,
    words,
    newStats, // idioms-updated stats, or null when not an idioms mode

    // Exact payload for setQuizResults (app.js:1493-1503). Note these read the
    // INPUT stats, not newStats — even in idioms mode. Preserved as written;
    // the idioms branch only touches idioms* counters, none of which appear here.
    quizResults: {
      score,
      correctCount,
      totalQuestions: sessionTotal,
      totalPoints: stats.totalPoints,
      level: stats.level,
      levelInfo: getLevelInfo(stats.totalPoints),
      correctAnswers: stats.correctAnswers,
      totalAnswered: stats.totalAnswered,
      accuracy: sessionTotal > 0 ? Math.round((correctCount / sessionTotal) * 100) : 0
    },

    // Exact payload the wrapper hands to QuizHistoryManager.addQuiz
    // (app.js:1465-1472). Unlike the match completer, questionsTotal/
    // questionsCorrect are derived rather than hard-coded, and the words list
    // IS filtered with .filter(Boolean).
    historyEntry: {
      mode: mode,
      difficulty: difficulty,
      questionsTotal: sessionTotal,
      questionsCorrect: correctCount,
      score: score,
      words: words
    }
  };
}

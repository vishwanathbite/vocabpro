/**
 * Daily challenge session state and handlers.
 *
 * A SIBLING OF useQuizSession, NOT AN EXTENSION OF IT. That was the judgment
 * call this commit opened with, and the reason is that the quiz's seven-step
 * per-answer contract does not describe this session at all:
 *
 *   - THE QUIZ SCORES EVERY ANSWER. scoreAnswer runs per answer, updateStats
 *     persists per answer, and points accumulate as the student goes.
 *   - THE CHALLENGE SCORES ONCE. calculateDailyPoints needs the whole outcome
 *     array, because the perfect bonus and the streak bonus are properties of
 *     the session rather than of any answer. Nothing is written to storage until
 *     the last question is finished.
 *
 * So the two order-dependent invariants in useQuizSession's header do not
 * transfer, and are not restated here:
 *
 *   1. "previousBadges must advance after every answer" exists because the quiz
 *      diffs badges per answer. This path diffs ONCE, inside
 *      completeDailyChallenge, against a list read at mount. There is nothing to
 *      advance, so there is nothing to get wrong.
 *   2. "bracket isGoalComplete around updateProgress" DOES apply, and is
 *      mirrored exactly — see finish(). It transfers because the edge it
 *      detects is a property of updateProgress, which is the only writer of
 *      `completed`, not of how often the caller answers. The only difference is
 *      that the challenge brackets ONCE rather than per answer.
 *
 * Folding this into useQuizSession would have meant making all seven steps
 * conditional on a session kind — turning a contract that is currently
 * unconditional and checkable into one that is neither.
 *
 * WHAT IS GENUINELY SHARED IS SHARED, not copied:
 *   - useMomentQueue        the queue, its cursor, its sound, extracted from
 *                           useQuizSession in this commit so one implementation
 *                           serves both
 *   - buildMoments          the same queue builder; no second announcement path
 *   - QuizScreen            presentational, driven entirely by props
 *   - ResultsScreen         reused, with the pool section gated off
 *
 * WHAT IS NOT SHARED is the ~15 lines of index/showResult navigation, which is
 * similar but not identical (this hook has no per-answer score to accumulate)
 * and is too thin to be worth a third abstraction over two callers.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { buildMoments } from './moments.js'
import { useMomentQueue } from './useMomentQueue.js'
import { DailyChallengeManager } from '../logic/daily-challenge.js'
import { completeDailyChallenge } from '../logic/daily-challenge-scoring.js'
import { StatsManager } from '../logic/gamification.js'
import { DailyGoalsManager } from '../logic/dailygoals.js'
import { QuizHistoryManager, SettingsManager } from '../logic/settings.js'
import { SoundManager } from '../logic/sound.js'
import { stopSpeech } from '../logic/speech.js'
import { DAILY_MODE } from './quiz-modes.js'

/**
 * Drive one daily challenge.
 *
 * @param {Object}   session    From startDailyChallenge: { mode, questions }
 * @param {Function} onComplete Called with the summary once the last question is
 *   finished AND every celebration moment has been dismissed
 * @returns {Object} State and handlers for QuizScreen
 */
export function useDailyChallengeSession(session, onComplete) {
  const { questions } = session

  // ---- Rendered state -----------------------------------------------------
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  /**
   * Correct answers so far — NOT points.
   *
   * The header shows this instead of a running score because a running score
   * would be a lie here: two of the three components of a challenge's points
   * (the perfect bonus and the streak bonus) are only knowable at the end, so a
   * number climbing per answer would jump by up to 150 on the final tap. The
   * screen labels it "Correct" rather than "Score" for the same reason.
   */
  const [correctCount, setCorrectCount] = useState(0)

  const moments = useMomentQueue()

  /**
   * PER-QUESTION OUTCOMES, ALIGNED TO `questions` BY INDEX.
   *
   * This array is the entire reason calculateDailyPoints could not be fixed
   * before this commit: it used to receive a COUNT, which cannot say which
   * questions were right, so it charged the first n. Written at
   * `outcomes[currentIndex]`, the index actually on screen, so alignment is a
   * property of how it is recorded rather than something a caller has to
   * maintain.
   *
   * A ref, not state: nothing renders it, so a re-render per answer would be
   * pure cost, and complete() must read the value including the answer just
   * given rather than the previous render's.
   *
   * Pre-filled with `false` so an abandoned challenge — which cannot reach
   * complete() today, but could if a future exit path scored one — has a defined
   * entry per question rather than holes that would read as unanswered anyway.
   */
  const outcomesRef = useRef(null)
  if (outcomesRef.current === null) outcomesRef.current = questions.map(() => false)

  /**
   * What the student picked, per question, aligned the same way.
   *
   * Separate from `outcomes` because the two answer different questions and
   * only one of them prices the session: outcomes decides points and must stay
   * a clean boolean array with a single meaning, while this exists purely so the
   * results screen can show "You chose X" beside each miss. Folding the pick
   * into outcomes would have made the scoring loop interpret display data.
   */
  const picksRef = useRef(null)
  if (picksRef.current === null) picksRef.current = questions.map(() => null)

  const correctCountRef = useRef(0)

  // Guards completion against a double tap, which would otherwise write a second
  // history entry and advance the streak twice for one challenge.
  const completedRef = useRef(false)

  /**
   * Stats, badges and level as they stood BEFORE this challenge.
   *
   * Read once, in lazy initialisers, because nothing in this session writes to
   * storage until completion — so unlike the quiz there is no risk of these
   * going stale mid-session, and re-reading at the end would pick up the
   * session's own writes and diff against itself.
   */
  const statsRef = useRef(null)
  if (statsRef.current === null) statsRef.current = StatsManager.loadStats()

  const previousBadgesRef = useRef(null)
  if (previousBadgesRef.current === null) {
    // ID STRINGS, which is what getNewBadges compares with .includes. Passing
    // badge objects would match nothing and re-announce the whole collection.
    previousBadgesRef.current = Array.isArray(statsRef.current.earnedBadges)
      ? statsRef.current.earnedBadges
      : []
  }

  const previousLevelRef = useRef(null)
  if (previousLevelRef.current === null) previousLevelRef.current = statsRef.current.level

  /* Sound is read once per session — SoundManager.enabled defaults to true and
     is only reconciled with the stored setting by a call like this one. */
  const soundReadyRef = useRef(false)
  if (!soundReadyRef.current) {
    soundReadyRef.current = true
    SoundManager.isEnabled()
  }

  const keyboardEnabledRef = useRef(null)
  if (keyboardEnabledRef.current === null) {
    keyboardEnabledRef.current = SettingsManager.get('keyboardShortcutsEnabled')
  }

  /**
   * The finished summary, held while the celebration queue drains.
   *
   * THIS IS THE ONE STRUCTURAL DIFFERENCE FROM THE QUIZ, and it follows from
   * scoring once. In a quiz, badges are known when an answer is scored, so the
   * moments for the final answer are already on screen by the time the student
   * taps Finish — and next() simply refuses to complete while any remain.
   *
   * Here the badges are not known until the challenge is scored, which happens
   * on that same final tap. Handing the summary straight to onComplete would
   * unmount this subtree in the same commit that queued the moments, and
   * moments.js's "no timers" reasoning applies exactly: they would be destroyed
   * before they ever painted. So the summary waits here, and the effect below
   * delivers it once the last moment has been dismissed.
   */
  const summaryRef = useRef(null)
  const [awaitingMoments, setAwaitingMoments] = useState(false)
  const deliveredRef = useRef(false)

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex >= questions.length - 1

  /**
   * Score the challenge, persist it, and queue whatever it earned.
   *
   * ORDER MATTERS IN EXACTLY ONE PLACE, and it is not obvious: the streak that
   * pays the bonus is the one held BEFORE today's completion, which is what
   * calculateDailyPoints' old `this.getStreak()` default read. completeChallenge
   * then advances it and returns the NEW value, which is what gets recorded on
   * the stats object and shown to the student. Reading the prior streak after
   * completeChallenge would pay a bonus for a day already counted.
   */
  const finish = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true

    const stats = statsRef.current

    // The pre-completion streak. Injected rather than read inside the scorer,
    // which no longer touches storage at all.
    const priorStreak = DailyChallengeManager.getStreak()

    const points = DailyChallengeManager.calculateDailyPoints({
      questions,
      outcomes: outcomesRef.current,
      streak: priorStreak
    })

    // Persists the history entry and advances the streak. Returns the streak
    // AFTER this challenge, which is the one recorded below.
    const { streak } = DailyChallengeManager.completeChallenge(
      correctCountRef.current,
      questions.length,
      points
    )

    const result = completeDailyChallenge({
      dailyChallengeQuestions: questions,
      correctCount: correctCountRef.current,
      stats,
      points,
      streak,
      previousBadges: previousBadgesRef.current,
      previousLevel: previousLevelRef.current
    })

    StatsManager.saveStats(result.newStats)
    QuizHistoryManager.addQuiz(result.historyEntry)

    /* THE DAILY GOAL. A DELIBERATE DIVERGENCE FROM js/, which advances it for
       quizzes and matches but not for the challenge — so a student could answer
       ten questions in the one place the app asks them to come back daily and
       see the goal bar not move.
       .
       QUESTIONS ANSWERED, NOT correctCount. The goal completes on questions
       alone, and a challenge that reaches here answered all of them, right or
       wrong — exactly as a quiz counts each answer through updateProgress
       whether or not it scored. questions.length rather than a literal 10, so
       retuning DAILY_PLAN moves this with it.
       .
       ONCE, ON COMPLETION, alongside the other writes and never per answer.
       That is what makes an abandoned challenge advance nothing, consistent
       with it persisting nothing else either.
       .
       THE BRACKET IS useQuizSession's, mirrored rather than reinvented:
       updateProgress is the only writer of `completed`, so the false -> true
       edge is visible only by reading either side of it, and that edge is what
       feeds goalJustCompleted into the SAME buildMoments queue below. The
       challenge's goal moment is therefore queued behind any badge or level-up
       rather than racing them. */
    const wasGoalComplete = DailyGoalsManager.isGoalComplete()
    DailyGoalsManager.updateProgress(questions.length, points)
    const isGoalComplete = DailyGoalsManager.isGoalComplete()

    stopSpeech()

    /* The summary, in ResultsScreen's shape. `review` carries only `wrong` and
       `badges`: the daily challenge does not touch the review pool, so the pool
       fields are ABSENT rather than zero, and ResultsScreen gates its Smart
       Review section on their presence. Passing zeroes would have printed
       "0 words left Smart Review today" after a session that never could. */
    summaryRef.current = {
      quizResults: {
        correctCount: correctCountRef.current,
        totalQuestions: result.totalQ,
        score: points,
        accuracy: Math.round((correctCountRef.current / result.totalQ) * 100)
      },
      challengeResult: result.challengeResult,
      streak,
      review: {
        /* Every question answered wrong, in the shape WrongRow reads. wordData
           is the stored item carried by every generated question, so the
           definition travels with the mistake and the screen needs no second
           lookup. NOT added to reviewPool — deliberately out of scope for this
           commit. */
        wrong: questions
          .map((q, i) => ({ q, i }))
          .filter(({ i }) => outcomesRef.current[i] !== true)
          .map(({ q, i }) => ({
            wordId: q.word,
            wordData: q.wordData,
            picked: picksRef.current[i],
            correct: q.correct
          })),
        badges: result.newBadges
      }
    }

    const built = buildMoments({
      newBadges: result.newBadges,
      levelUp: result.levelUp,
      /* streakMilestone is the quiz's in-session answer streak, which this path
         never updates — the daily-challenge streak is a different counter with
         no milestone copy of its own. The goal edge is real, and is the same
         value the quiz passes, from the same bracket. */
      streakMilestone: null,
      goalJustCompleted: !wasGoalComplete && isGoalComplete
    })

    if (built.length > 0) {
      moments.show(built)
      setAwaitingMoments(true)
      return
    }

    deliveredRef.current = true
    onComplete(summaryRef.current)
  }, [questions, moments, onComplete])

  /**
   * Deliver the summary once the queue has drained.
   *
   * Fires only after `awaitingMoments` has been set AND `moments.current` has
   * fallen back to null, which happens on the dismissal of the last moment.
   * `deliveredRef` makes it once-only, so StrictMode's double-invoked effect
   * cannot hand the same summary over twice.
   */
  useEffect(() => {
    if (!awaitingMoments || moments.current || deliveredRef.current) return
    deliveredRef.current = true
    onComplete(summaryRef.current)
  }, [awaitingMoments, moments.current, onComplete])

  /**
   * Record one answer.
   *
   * Two steps rather than the quiz's seven, and that is the point: nothing is
   * scored and nothing is persisted here. The outcome is recorded against the
   * index on screen, and the rest waits for finish().
   */
  const answer = useCallback(
    (option) => {
      // A second tap while the result is showing must not record twice.
      if (showResult || !currentQuestion) return

      const correct = option === currentQuestion.correct

      // Sound first, so the feedback is immediate.
      if (correct) SoundManager.playCorrect()
      else SoundManager.playIncorrect()

      setSelectedAnswer(option)
      setIsCorrect(correct)
      setShowResult(true)

      // THE ALIGNMENT. Written at the displayed index, so questions[i],
      // outcomes[i] and picks[i] all describe the same question by construction.
      outcomesRef.current[currentIndex] = correct
      picksRef.current[currentIndex] = option

      if (correct) {
        correctCountRef.current += 1
        setCorrectCount(correctCountRef.current)
      }
    },
    [showResult, currentQuestion, currentIndex]
  )

  /**
   * Advance, or finish.
   *
   * The drain guarantee is the same line useQuizSession carries, and load-bearing
   * for the same reason: finish() is reachable only through here, and here
   * refuses while a moment is pending. On the last question that guards the
   * SECOND tap — the first is what queues the moments in the first place.
   */
  const next = useCallback(() => {
    if (!showResult) return
    if (moments.current) return

    if (isLastQuestion) {
      finish()
      return
    }

    setCurrentIndex((i) => i + 1)
    setShowResult(false)
    setIsCorrect(false)
    setSelectedAnswer(null)
    stopSpeech()
  }, [showResult, moments.current, isLastQuestion, finish])

  /**
   * Whether leaving right now needs confirming — the quiz's rule, unchanged:
   * straight out on the first question with nothing answered, a confirm
   * otherwise.
   *
   * WHAT IS LOST DIFFERS, THOUGH, which is why the screen is given its own exit
   * copy. A quiz writes stats after every answer, so leaving costs only the
   * unanswered questions. A challenge writes NOTHING until the last question is
   * finished, so leaving costs the whole attempt — and today's challenge is not
   * re-generated differently, but the answers given are gone.
   */
  const needsExitConfirm = !(currentIndex === 0 && !showResult)

  const unansweredCount = questions.length - currentIndex - (showResult ? 1 : 0)

  return {
    mode: DAILY_MODE,
    questions,
    currentQuestion,
    currentIndex,
    selectedAnswer,
    showResult,
    isCorrect,
    isLastQuestion,
    correctCount,
    currentMoment: moments.current,
    dismissMoment: moments.dismiss,
    keyboardEnabled: keyboardEnabledRef.current,
    needsExitConfirm,
    unansweredCount,
    answer,
    next
  }
}

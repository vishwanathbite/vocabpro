/**
 * Quiz session state and handlers.
 *
 * Everything the logic layer left to "the caller (Phase 5 wiring)" lives here:
 * the sound calls, the persistence, the daily-goal bracket, and the
 * previousBadges / previousLevel bookkeeping. The pure derivation stays in
 * quiz-scoring.js and quiz-summary.js and is not reimplemented.
 *
 * WHY A HOOK AND NOT THE SCREEN. QuizScreen renders props and nothing else, so
 * something has to own the sequence — and the sequence is the whole risk. Two
 * of its steps are order-dependent in ways that fail silently:
 *
 *   1. previousBadges and previousLevel must ADVANCE after every answer.
 *      getNewBadges returns the difference between the earned set and this
 *      list, so a list that never moves makes every answer after the first
 *      re-announce the same badge for the rest of the session.
 *
 *   2. DailyGoalsManager.isGoalComplete() must be read BEFORE and AFTER
 *      updateProgress. updateProgress is the only writer of `completed`, so
 *      the false -> true edge is only visible by bracketing it.
 *
 * WHAT IS DELIBERATELY NOT HERE. Points are never recomputed. calculatePoints
 * already runs twice per answer from identical inputs — once inside updateStats
 * to accumulate totalPoints, once inside scoreAnswer for the figure shown — and
 * they agree only because both are handed the same three arguments. A third
 * call site is a third thing to keep in step, so `result.points` is used as-is.
 *
 * responseTime is returned by scoreAnswer and deliberately ignored. `startTime`
 * is stamped on all ten questions at GENERATION, so it measures time since the
 * quiz was built, not time to answer; its only consumer was SRSManager, which
 * no longer exists. Surfacing it would show question ten a ten-question delay.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { buildMoments } from './moments.js'
import { scoreAnswer } from '../logic/quiz-scoring.js'
import { summarizeQuizResults } from '../logic/quiz-summary.js'
import { StatsManager } from '../logic/gamification.js'
import { DailyGoalsManager } from '../logic/dailygoals.js'
import { QuizHistoryManager, SettingsManager } from '../logic/settings.js'
import { SoundManager } from '../logic/sound.js'
import { stopSpeech } from '../logic/speech.js'

/**
 * Drive one quiz session.
 *
 * @param {Object}   session          From startQuiz: { mode, difficulty, questions }
 * @param {Function} onComplete       Called with the summary when the last question is finished
 * @returns {Object} State and handlers for QuizScreen
 */
export function useQuizSession(session, onComplete) {
  const { mode, difficulty, questions } = session

  // ---- Rendered state -----------------------------------------------------
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)

  /**
   * The last answer's celebration payload.
   *
   * Only derivable at the moment the answer is scored — getNewBadges compares
   * against a previousBadges list that has already moved on by the next answer,
   * and the review pool has already been overwritten — so a later pass could
   * not recompute any of it from stored state.
   *
   *   moments        ordered queue, see moments.js; may be empty
   *   poolExit       the word that left the review pool, or null
   *   towardMastery  the word that took its first correct, or null
   *
   * The two marks are NOT moments. They are quiet inline lines in the feedback
   * panel: a word leaves the pool roughly three times in a session, and a
   * full-screen interruption at that rate would train the student to dismiss
   * without reading, which is exactly what would then happen to a badge.
   */
  const [lastAnswer, setLastAnswer] = useState(null)

  /**
   * How far into lastAnswer.moments the student has got.
   *
   * A CURSOR, NOT A SHIFTED ARRAY. Dismissing by slicing the queue would make
   * the queue itself change identity on every dismissal, and the sound effect
   * below keys off the current moment — a new array reference for the same
   * remaining moment would replay its sound.
   */
  const [momentIndex, setMomentIndex] = useState(0)

  /**
   * The moment on screen, or null.
   *
   * Derived, never stored. Two sources of truth for "what is showing" is how a
   * queue ends up rendering one moment while blocking on another.
   */
  const currentMoment = lastAnswer?.moments?.[momentIndex] ?? null

  /* Pulled out as scalars so the sound effect below depends on values rather
     than on an object identity it would have to be told to ignore. */
  const momentKey = currentMoment?.key ?? null
  const momentKind = currentMoment?.kind ?? null

  /**
   * Sound rides the moment being SHOWN, not the answer being scored.
   *
   * js/ plays each sound beside the setState that reveals it (app.js:1390,
   * 1400), and with a serialised queue those are different instants: a level-up
   * queued behind a badge is heard when the badge is dismissed, not when the
   * answer was given. Playing both at scoring time would stack two fanfares
   * over one another and leave the level-up silent when it finally appears.
   *
   * STREAK AND GOAL ARE SILENT, matching js/ — it plays nothing for either, and
   * this step is not the place to invent audio. So is the pool-exit mark.
   *
   * Keyed on the moment's `key` rather than the object, so a re-render with an
   * equal-but-new object cannot replay. On mount currentMoment is null, which
   * is why React 19 StrictMode's double-invoked mount effect plays nothing
   * twice; every later run is a genuine dependency change and fires once.
   */
  useEffect(() => {
    if (momentKind === 'badge') SoundManager.playAchievement()
    else if (momentKind === 'levelUp') SoundManager.playLevelUp()
  }, [momentKey, momentKind])

  /** Advance the queue. The only way a moment is dismissed. */
  const dismissMoment = useCallback(() => {
    setMomentIndex((i) => i + 1)
  }, [])

  // ---- Carry-forward values ----------------------------------------------
  //
  // Refs, not state. Each is read by the NEXT call to scoreAnswer, and a state
  // value read inside a handler is whatever it was at that render — one answer
  // behind. Being one answer behind is exactly the failure mode described
  // above, so these are held where the current value is always readable.
  //
  // Lazy initialisers: loadStats reads storage, and this runs once per session
  // rather than on every render.
  const statsRef = useRef(null)
  if (statsRef.current === null) statsRef.current = StatsManager.loadStats()

  const previousBadgesRef = useRef(null)
  if (previousBadgesRef.current === null) {
    // ID STRINGS, which is what getNewBadges compares with .includes. Passing
    // badge objects would match nothing and re-announce the entire collection
    // on the first answer.
    previousBadgesRef.current = Array.isArray(statsRef.current.earnedBadges)
      ? statsRef.current.earnedBadges
      : []
  }

  const previousLevelRef = useRef(null)
  if (previousLevelRef.current === null) previousLevelRef.current = statsRef.current.level

  // Mirrors of the two rendered counters, so completion reads the value
  // including the answer just given rather than the previous render's.
  const scoreRef = useRef(0)
  const correctCountRef = useRef(0)

  // Guards the completion path against a double tap on Finish Quiz, which would
  // otherwise write a second history entry for the same session.
  const completedRef = useRef(false)

  /**
   * Sound is read once per session.
   *
   * SoundManager.enabled defaults to true and is only reconciled with the
   * stored setting by loadSettings, which nothing in app-v2 had called. Reading
   * it here means a student who turned sound off in the live app is not played
   * at on their first answer. isEnabled is idempotent and self-initialising.
   */
  const soundReadyRef = useRef(false)
  if (!soundReadyRef.current) {
    soundReadyRef.current = true
    SoundManager.isEnabled()
  }

  // Read once: the shortcut table is consulted on every keypress, but whether
  // shortcuts are on at all is a preference that cannot change mid-session.
  const keyboardEnabledRef = useRef(null)
  if (keyboardEnabledRef.current === null) {
    keyboardEnabledRef.current = SettingsManager.get('keyboardShortcutsEnabled')
  }

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex >= questions.length - 1

  /**
   * Finish the session.
   *
   * summarizeQuizResults is pure and returns `newStats` as null for every mode
   * this shell can start — it is populated only for 'idiom' and 'idiom-reverse'
   * (quiz-summary.js:66), and neither is in QUIZ_MODES. So there is no
   * saveStats here: the stats were already persisted after every answer, and
   * writing back an unchanged object would be a redundant storage write.
   *
   * historyEntry is handed to addQuiz unmodified. addQuiz stamps its own `id`
   * and `date`, computes `accuracy` from questionsCorrect/questionsTotal, and
   * defaults the `timeSpent` the entry does not carry — so the entry is
   * complete as returned.
   */
  const complete = useCallback(() => {
    if (completedRef.current) return
    completedRef.current = true

    const summary = summarizeQuizResults({
      questions,
      mode,
      difficulty,
      correctCount: correctCountRef.current,
      score: scoreRef.current,
      stats: statsRef.current
    })

    QuizHistoryManager.addQuiz(summary.historyEntry)
    stopSpeech()

    onComplete(summary)
  }, [questions, mode, difficulty, onComplete])

  /**
   * Record one answer.
   *
   * The order below is the contract, not a preference. See the module header.
   */
  const answer = useCallback(
    (option) => {
      // A second tap while the result is showing must not score twice.
      if (showResult || !currentQuestion) return

      const correct = option === currentQuestion.correct

      // 1. Sound first, so the feedback is immediate rather than waiting behind
      //    the scoring and two storage writes.
      if (correct) SoundManager.playCorrect()
      else SoundManager.playIncorrect()

      setSelectedAnswer(option)
      setIsCorrect(correct)
      setShowResult(true)

      // The PRE-answer stats, pinned before step 5 moves the ref on. Step 6
      // needs both sides of the same answer, and by the time it runs the ref
      // holds the post-answer object. updateStats never aliases its input
      // (STATS_ARRAY_FIELDS is re-cloned there), so this stays a genuine
      // before-picture rather than a second view of the same arrays.
      const previousStats = statsRef.current

      // 2. Score. Time is injected rather than read inside, so the derivation
      //    stays deterministic.
      const result = scoreAnswer({
        answer: option,
        currentQuestion,
        stats: previousStats,
        difficulty,
        mode,
        previousBadges: previousBadgesRef.current,
        previousLevel: previousLevelRef.current,
        now: Date.now(),
        nowISO: new Date().toISOString()
      })

      // 3. Persist. This one write carries everything updateStats maintained:
      //    points, mastery, the mode list, the earned badges, and the review
      //    pool. The pool needs nothing further from this caller.
      StatsManager.saveStats(result.newStats)

      // 4. Daily goal, bracketed. One call for both branches: scoreAnswer
      //    returns points 0 for a wrong answer, which reproduces the live app's
      //    updateProgress(1, points) / updateProgress(1, 0) pair exactly. The
      //    goal completes on questions alone now, so the 1 is what matters.
      const wasGoalComplete = DailyGoalsManager.isGoalComplete()
      DailyGoalsManager.updateProgress(1, result.points)
      const isGoalComplete = DailyGoalsManager.isGoalComplete()

      // 5. Advance the carry-forward values. Without this every later answer
      //    re-announces this answer's badge.
      statsRef.current = result.newStats
      previousBadgesRef.current = result.previousBadgesNext
      previousLevelRef.current = result.newStats.level

      // result.points, never a fresh calculatePoints call.
      scoreRef.current += result.points
      setScore(scoreRef.current)

      if (correct) correctCountRef.current += 1

      // 6. The two quiet marks, derived from the pair of stats objects that are
      //    both in scope here and nowhere else. `previousStats` is read BEFORE
      //    step 5 advanced statsRef, which is why this block sits after the
      //    scoring and reads a local rather than the ref.
      //
      //    Array.isArray on both sides: loadStats normalises reviewPool and
      //    updateStats always writes an array back, so neither is expected to
      //    be missing — but a .filter on a corrupt store would unmount the
      //    React tree, and this is a decoration.
      const poolBefore = Array.isArray(previousStats.reviewPool) ? previousStats.reviewPool : []
      const poolAfter = Array.isArray(result.newStats.reviewPool) ? result.newStats.reviewPool : []

      // THE POOL EXIT. Exactly 0 or 1 words, and no false positives.
      // updateStats filters the single `word` it was handed, on one branch
      // (gamification.js:590), so no answer can shed two. A word that was never
      // in the pool and is promoted to mastered hits the same filter, but the
      // difference against poolBefore is empty for it, so it is not announced.
      //
      // Entry and exit cannot collide on one answer either: entry is the
      // wrong-answer branch, exit is inside the correct branch. The difference
      // is therefore never masked by an addition.
      const departed = poolBefore.filter((w) => !poolAfter.includes(w))
      const poolExit = departed.length > 0 ? departed[0] : null

      // FIRST CORRECT ON A POOL WORD: struggling -> learning, the move that
      // sheds nothing. A pool word needs two corrects, so a student's first
      // review session after a bad quiz shows no exits however well they do.
      // This is the honest thing to say instead of nothing.
      //
      // GATED ON THE WORD ACTUALLY BEING IN THE POOL, not just on the list
      // move. Struggling and pooled are written on the same branch today, so
      // the two agree for anything this app recorded — but a save written
      // before reviewPool existed (step 8) can hold a populated
      // strugglingWordsList and an empty pool, and the copy names Smart Review.
      const struggling = Array.isArray(previousStats.strugglingWordsList)
        ? previousStats.strugglingWordsList
        : []
      const learningAfter = Array.isArray(result.newStats.learningWordsList)
        ? result.newStats.learningWordsList
        : []
      const towardMastery =
        correct &&
        result.wordId &&
        poolBefore.includes(result.wordId) &&
        struggling.includes(result.wordId) &&
        learningAfter.includes(result.wordId)
          ? result.wordId
          : null

      // 7. Queue the moments and rewind the cursor. Both in one place, so a
      //    queue can never be shown from an index the previous answer left
      //    behind. responseTime is deliberately not among the values kept.
      setLastAnswer({
        moments: buildMoments({
          newBadges: result.newBadges,
          levelUp: result.levelUp,
          streakMilestone: result.streakMilestone,
          goalJustCompleted: !wasGoalComplete && isGoalComplete
        }),
        poolExit,
        towardMastery
      })
      setMomentIndex(0)
    },
    [showResult, currentQuestion, difficulty, mode]
  )

  /**
   * Advance, or finish.
   *
   * stopSpeech on every advance, matching the live app: a pronunciation started
   * on the previous question would otherwise keep talking over the next one.
   */
  const next = useCallback(() => {
    if (!showResult) return

    /* THE QUEUE MUST DRAIN FIRST, and this line is what guarantees it.

       This is the whole answer to "moments on the final answer must show
       BEFORE the results screen". Nothing is scheduled into a subtree about to
       unmount, because the subtree cannot unmount while a moment is pending:
       complete() is reachable only through here, and here refuses. The student
       dismisses the badge, dismisses the level-up, and only then does the
       Finish Quiz button do anything.

       IT LIVES IN THE HOOK, not in the screen, because the hook owns
       complete(). QuizScreen also hides the Next button behind the overlay and
       suppresses its Enter binding, but those are ergonomics — a stray call
       from anywhere still cannot end the session early. Two layers, one of
       which is load-bearing.

       It reads currentMoment, which is derived from state rather than a ref, so
       this callback re-creates when the queue advances; complete's own
       identity is unaffected. */
    if (currentMoment) return

    if (isLastQuestion) {
      complete()
      return
    }

    setCurrentIndex((i) => i + 1)
    setShowResult(false)
    setIsCorrect(false)
    setSelectedAnswer(null)
    setLastAnswer(null)
    setMomentIndex(0)
    stopSpeech()
  }, [showResult, currentMoment, isLastQuestion, complete])

  /**
   * Whether leaving right now needs confirming.
   *
   * The live app's rule: straight out on the very first question with no answer
   * given, a confirm otherwise. Nothing is lost either way — stats, the review
   * pool and goal progress are written per answer — so the confirm exists to
   * prevent an accidental tap, not to protect unsaved work.
   */
  const needsExitConfirm = !(currentIndex === 0 && !showResult)

  /** Unanswered count for the confirm copy, matching js/app.js:1529. */
  const unansweredCount = questions.length - currentIndex - (showResult ? 1 : 0)

  return {
    mode,
    difficulty,
    questions,
    currentQuestion,
    currentIndex,
    selectedAnswer,
    showResult,
    isCorrect,
    isLastQuestion,
    score,
    currentMoment,
    dismissMoment,
    /* The two quiet marks, flattened out of lastAnswer so the screen reads two
       optional strings rather than reaching through a payload shape. */
    poolExit: lastAnswer?.poolExit ?? null,
    towardMastery: lastAnswer?.towardMastery ?? null,
    keyboardEnabled: keyboardEnabledRef.current,
    needsExitConfirm,
    unansweredCount,
    answer,
    next
  }
}

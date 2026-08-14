/**
 * Flashcard session state.
 *
 * A FORK OF useQuizSession, NOT A MODE OF IT, and the import list is the point.
 * This module imports NONE of quiz-scoring.js, quiz-summary.js or
 * daily-challenge-scoring.js — the three modules that reach updateStats — so
 * there is no path from a flashcard to the scoring core at all. Not a path that
 * is closed; a path that does not exist.
 *
 * The alternative was a `scored` flag threaded through useQuizSession, guarding
 * saveStats, updateProgress and addQuiz at each site. That is worse for one
 * reason: a boolean is where a later edit silently re-enables a write. Someone
 * fixing an unrelated bug moves a line above its guard, or adds a new write and
 * forgets one, and flashcards start awarding points — with nothing to catch it,
 * because the tests that would notice are about quizzes. Separation makes the
 * constraint structural instead of conditional. It is the same argument
 * gamification.js makes for recordModePlayed existing beside updateStats rather
 * than as a parameter to it.
 *
 * WHAT IS DELIBERATELY ABSENT, all of it useQuizSession's: points, mastery, the
 * review pool, badges, the moment queue, the daily-goal bracket, the history
 * entry, previousBadges/previousLevel carry-forward, and sound. Self-reported
 * means nothing here is checked against the student, so nothing here may count.
 *
 * THE ONE WRITE is recordModePlayed, at session start. See below.
 */

import { useCallback, useRef, useState } from 'react'
import { recordModePlayed, StatsManager } from '../logic/gamification.js'
import { stopSpeech } from '../logic/speech.js'

/**
 * Drive one flashcard session.
 *
 * @param {Object}   session    From startFlashcards: { mode, difficulty, cards }
 * @param {Function} onComplete Called with { known, unknown } when the last card is rated
 * @returns {Object} State and handlers for FlashcardScreen
 */
export function useFlashcardSession(session, onComplete) {
  const { mode, difficulty, cards } = session

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [known, setKnown] = useState(0)
  const [unknown, setUnknown] = useState(0)

  /**
   * THE ONLY WRITE THIS SESSION MAKES, and it happens once, here, at start.
   *
   * WHY AT START AND NOT AT COMPLETION. recordModePlayed's own docstring says
   * either is fine because it is idempotent, and start is better for two
   * reasons. Jack of All Trades asks whether the student has TRIED all seven
   * modes, so a session abandoned on card 3 has answered that question as
   * truthfully as one played to the end. And it collapses the read-modify-write
   * window from "however long the student browses" to a single tick — at
   * completion, the stats object would have been read at mount and written
   * minutes later, clobbering anything written in between.
   *
   * LOADED AT THE MOMENT OF THE WRITE. StatsManager.loadStats() is called on
   * this line rather than read from a ref initialised earlier, so the object
   * being modified is the current one.
   *
   * WHAT recordModePlayed TOUCHES, and it is verified rather than assumed:
   * modesPlayedList, modesPlayed, and earnedBadges. The badge refresh is
   * deliberate — without it a student whose seventh mode is flashcards would
   * not see Jack of All Trades until their next scored answer. It cannot award
   * anything else: every other badge condition reads a counter this leaves
   * untouched, and stickiness means none can be revoked. points, mastery and
   * reviewPool are provably unchanged.
   *
   * A ref-guarded lazy initialiser, not an effect: React 19 StrictMode invokes
   * effects twice on mount, and while recordModePlayed is idempotent, a second
   * saveStats is a second storage write for nothing.
   */
  const modeRecordedRef = useRef(false)
  if (!modeRecordedRef.current) {
    modeRecordedRef.current = true
    StatsManager.saveStats(recordModePlayed(StatsManager.loadStats(), mode))
  }

  /* Guards a double tap on the last card's Know / Don't know, which would
     otherwise complete the session twice. */
  const completedRef = useRef(false)

  const currentCard = cards[currentIndex]
  const isLastCard = currentIndex >= cards.length - 1

  const flip = useCallback(() => {
    setIsFlipped((f) => !f)
  }, [])

  /**
   * Rate the current card and move on.
   *
   * NO TIMER. js/ deferred the index bump by 200ms (screens.js:1156-1159) so
   * the flip could reset before the next word appeared, which is exactly 12b's
   * hazard class: state held in a setTimeout inside a subtree that can unmount.
   * Here the index and the flip are reset in the same tick, and FlashcardScreen
   * keys the card on the index — so the outgoing card is unmounted rather than
   * animated back, and there is nothing to flash.
   *
   * The counters are plain state rather than the card lists js/ kept. Only the
   * two totals are ever read, and holding the cards themselves would imply the
   * session remembers which words you knew — which is precisely the record a
   * self-reported mode must not keep.
   */
  const rate = useCallback(
    (didKnow) => {
      if (!currentCard) return

      const nextKnown = known + (didKnow ? 1 : 0)
      const nextUnknown = unknown + (didKnow ? 0 : 1)

      if (didKnow) setKnown(nextKnown)
      else setUnknown(nextUnknown)

      if (isLastCard) {
        if (completedRef.current) return
        completedRef.current = true
        stopSpeech()
        // The totals INCLUDING this card — computed above rather than read back
        // from state, which would still hold the previous render's values.
        onComplete({ known: nextKnown, unknown: nextUnknown })
        return
      }

      setCurrentIndex((i) => i + 1)
      setIsFlipped(false)
      stopSpeech()
    },
    [currentCard, isLastCard, known, unknown, onComplete]
  )

  /**
   * Whether leaving right now needs confirming: never.
   *
   * Nothing about a flashcard session is at stake. Nothing is scored, no card
   * is persisted, and the mode was already recorded at start — so exiting on
   * card 12 of 15 costs exactly the three cards not yet seen, and the student
   * can start another session immediately. QuizScreen confirms because a quiz
   * has answered questions and a history entry to lose; borrowing that
   * confirmation here would invent a stake to protect.
   */
  const needsExitConfirm = false

  return {
    mode,
    difficulty,
    cards,
    currentCard,
    currentIndex,
    isFlipped,
    isLastCard,
    known,
    unknown,
    needsExitConfirm,
    flip,
    rate
  }
}

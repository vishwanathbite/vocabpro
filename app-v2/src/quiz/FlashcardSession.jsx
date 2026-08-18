import { useFlashcardSession } from './useFlashcardSession.js'
import FlashcardScreen from './FlashcardScreen.jsx'
import { SettingsManager } from '../logic/settings.js'

/**
 * Joins the flashcard hook to the flashcard screen.
 *
 * The same shape as QuizSession and for the same reason: AppShell cannot call
 * the hook itself, because a hook cannot be called conditionally and the shell
 * only has a session some of the time. This sits between them, mounted only
 * while a session is running, and wires nothing else.
 *
 * The `key` its parent gives it is load-bearing, exactly as QuizSession's is:
 * every value in useFlashcardSession initialises once per mount, so starting a
 * second session without remounting would carry the first one's index and
 * counters into it — and would skip the mode record, which is a
 * once-per-session write guarded by a ref.
 *
 * onComplete and onExit are SEPARATE, as they became for quizzes in step 13.
 * Finishing carries the counts to the end card; exiting carries nothing and
 * returns to the shell.
 */
export default function FlashcardSession({ session, onComplete, onExit }) {
  const flash = useFlashcardSession(session, onComplete)

  /* Read once per session, not per render: whether shortcuts are on at all is a
     preference that cannot change mid-session. Read here rather than in the
     hook because it is screen chrome — the hook owns the session, and this
     decides only whether a listener is registered. */
  const keyboardEnabled = SettingsManager.get('keyboardShortcutsEnabled')

  return (
    <FlashcardScreen
      cards={flash.cards}
      currentCard={flash.currentCard}
      currentIndex={flash.currentIndex}
      isFlipped={flash.isFlipped}
      known={flash.known}
      unknown={flash.unknown}
      keyboardEnabled={keyboardEnabled}
      onFlip={flash.flip}
      onRate={flash.rate}
      /* NO EXIT CONFIRMATION. needsExitConfirm is a constant false in the hook
         and is not threaded through: nothing about this session is at stake.
         Nothing is scored, no card is persisted, and the mode was recorded at
         start — so leaving costs only the cards not yet seen. QuizScreen's
         confirm exists to protect answered questions and a history entry, and
         borrowing it here would invent a stake in order to guard it. */
      onExit={onExit}
    />
  )
}

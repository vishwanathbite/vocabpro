import { useQuizSession } from './useQuizSession.js'
import QuizScreen from '../screens/QuizScreen.jsx'

/**
 * Joins the session hook to the session screen.
 *
 * WHY THIS EXISTS AS ITS OWN FILE. QuizScreen renders props and holds no
 * session state, and AppShell cannot call useQuizSession itself — a hook cannot
 * be called conditionally, and AppShell only has a session some of the time.
 * So one component has to sit between them, mounted only while a quiz is
 * running. It is deliberately this thin: it wires and does nothing else.
 *
 * The `key` its parent gives it is load-bearing. Starting a second quiz without
 * remounting would carry the first session's index and score into it, because
 * every value in the hook is initialised once per mount.
 */
export default function QuizSession({ session, onExit }) {
  const quiz = useQuizSession(session, onExit)

  return (
    <QuizScreen
      mode={quiz.mode}
      questions={quiz.questions}
      currentQuestion={quiz.currentQuestion}
      currentIndex={quiz.currentIndex}
      selectedAnswer={quiz.selectedAnswer}
      showResult={quiz.showResult}
      isCorrect={quiz.isCorrect}
      isLastQuestion={quiz.isLastQuestion}
      score={quiz.score}
      keyboardEnabled={quiz.keyboardEnabled}
      needsExitConfirm={quiz.needsExitConfirm}
      unansweredCount={quiz.unansweredCount}
      onAnswer={quiz.answer}
      onNext={quiz.next}
      /* Exiting and finishing land in the same place for now: the shell, with
         the tab panel remounted. The difference is that finishing has already
         written the history entry and hands `onComplete` a summary, which is
         what Commit B's results screen consumes. The summary is passed
         through rather than dropped so that wiring is a change of destination,
         not a change of plumbing. */
      onExit={onExit}
    />
  )
}

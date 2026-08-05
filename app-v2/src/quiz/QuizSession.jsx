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
/**
 * FINISHING AND ABANDONING ARE DIFFERENT EVENTS, as of step 13.
 *
 * Both used to be `onExit`: the hook was handed it as its onComplete and the
 * screen as its onExit, so the two arrived at AppShell indistinguishable and a
 * finished session could not be told from a walked-away one. That was fine
 * while both did the same thing — return to the shell — and is the first thing
 * that had to change for a results screen to be reachable at all.
 *
 * They stay separate all the way down rather than being merged behind a flag:
 * onComplete carries the summary and onExit carries nothing, which is the real
 * difference between them.
 */
export default function QuizSession({ session, onComplete, onExit }) {
  const quiz = useQuizSession(session, onComplete)

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
      currentMoment={quiz.currentMoment}
      onDismissMoment={quiz.dismissMoment}
      poolExit={quiz.poolExit}
      towardMastery={quiz.towardMastery}
      keyboardEnabled={quiz.keyboardEnabled}
      needsExitConfirm={quiz.needsExitConfirm}
      unansweredCount={quiz.unansweredCount}
      onAnswer={quiz.answer}
      onNext={quiz.next}
      /* Abandoning only. Finishing goes through the hook's complete(), which
         writes the history entry and calls onComplete with the summary; it
         never reaches this prop. */
      onExit={onExit}
    />
  )
}

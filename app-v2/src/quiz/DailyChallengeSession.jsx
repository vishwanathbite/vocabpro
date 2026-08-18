import { useDailyChallengeSession } from './useDailyChallengeSession.js'
import QuizScreen from '../screens/QuizScreen.jsx'

/**
 * Joins the daily challenge hook to the session screen.
 *
 * The sibling of QuizSession.jsx, and thin for the same reason: QuizScreen holds
 * no session state and AppShell cannot call a hook conditionally, so one
 * component has to sit between them, mounted only while a challenge is running.
 *
 * THE SCREEN IS REUSED WHOLESALE. QuizScreen is presentational — every value
 * arrives as a prop and every action is a callback — so a challenge needs no
 * screen of its own, and building one would have forked the answer/reveal/next
 * interaction that is the most-used surface in the app. Only three strings
 * differ, and they arrive as props:
 *
 *   scoreLabel   'Correct', not 'Score' — see the hook's correctCount note
 *   exitCopy     the quiz's "Earned points are saved" is false here
 *   exitTitle    names what is being left
 *
 * `mode` is DAILY_MODE, which is deliberately not a row in QUIZ_MODES. The two
 * places QuizScreen consults the mode both handle it: modeTitle falls through to
 * the off-table title, and questionTextFor dispatches on the question's own
 * `dailyMode` field rather than on the mode id.
 *
 * The `key` its parent gives it is load-bearing, exactly as for a quiz: every
 * value in the hook is initialised once per mount, so a second challenge without
 * a remount would inherit the first one's index and outcomes.
 */
export default function DailyChallengeSession({ session, onComplete, onExit }) {
  const challenge = useDailyChallengeSession(session, onComplete)

  return (
    <QuizScreen
      mode={challenge.mode}
      questions={challenge.questions}
      currentQuestion={challenge.currentQuestion}
      currentIndex={challenge.currentIndex}
      selectedAnswer={challenge.selectedAnswer}
      showResult={challenge.showResult}
      isCorrect={challenge.isCorrect}
      isLastQuestion={challenge.isLastQuestion}
      score={challenge.correctCount}
      scoreLabel="Correct"
      exitTitle="Leave the daily challenge?"
      /* Approved. Says what is actually lost: nothing is written until the last
         question is finished, so an abandoned challenge scores nothing, earns
         no badge and advances neither the streak nor the daily goal. It does
         not take the unanswered count — the sentence is about the whole
         attempt, not the remainder — so the argument is ignored. */
      exitCopy={() =>
        'Nothing is saved until you finish. Today’s challenge stays available — ' +
        'you can start it again from the beginning.'
      }
      exitConfirmLabel="Leave challenge"
      currentMoment={challenge.currentMoment}
      onDismissMoment={challenge.dismissMoment}
      /* The two Smart Review marks are quiz-only: this session does not touch
         the review pool, so there is no pool movement to report. */
      poolExit={null}
      towardMastery={null}
      keyboardEnabled={challenge.keyboardEnabled}
      needsExitConfirm={challenge.needsExitConfirm}
      unansweredCount={challenge.unansweredCount}
      onAnswer={challenge.answer}
      onNext={challenge.next}
      /* Abandoning only. Finishing goes through the hook, which scores the
         challenge, drains the celebration queue and only then calls onComplete
         with the summary; it never reaches this prop. */
      onExit={onExit}
    />
  )
}

import { useEffect, useRef } from 'react'
import { DONE, PRACTISE_AGAIN } from './results-copy.js'

/**
 * What a finished flashcard session leaves behind.
 *
 * MINIMAL, AND NOT ResultsScreen. That screen's three sections are the wrong
 * words, the Smart Review pool delta and the badges earned, and a flashcard
 * session produces none of them — there are no wrong answers, the pool is never
 * touched, and no badge can be earned by a thumb press. Reusing it would have
 * meant three empty sections and a score line reading 0.
 *
 * NO HISTORY ENTRY IS WRITTEN, and this is the reason rather than an omission.
 * QuizHistoryManager.addQuiz derives `accuracy` from
 * questionsCorrect / questionsTotal, so an entry here would mint a
 * SELF-REPORTED accuracy and put it in two places that report measured ones:
 * ProgressScreen's recent list would render "Flashcard 11 / 15", which is
 * indistinguishable from eleven correct answers, and getStats().byMode feeds
 * the "Accuracy by mode" section, which would gain a Flashcard bar sitting
 * beside modes where the number was actually tested. It would also inflate
 * totalQuizzes, totalQuestions and totalCorrect. A student pressing "Got It!"
 * is not evidence, and nothing that aggregates evidence may read it.
 *
 * So the counts live here, on screen, for as long as the student is looking at
 * them, and nowhere else. That is the whole record a self-reported session
 * should leave.
 */
export default function FlashcardSummary({ known, unknown, onPractiseAgain, onDone }) {
  /* Focus the heading on mount: the session subtree has just been replaced, so
     focus has fallen to <body>. Same reason and same treatment as
     ResultsScreen's. */
  const headingRef = useRef(null)
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="min-h-screen bg-navy">
      <main className="mx-auto w-full max-w-content px-4 pt-8 pb-12">
        <p className="text-eyebrow font-semibold tracking-wider text-slate-400 uppercase">
          Session complete!
        </p>

        {/* The live app's completion wording, kept as the heading: it names both
            counts in the student's terms rather than as a score. */}
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-1 font-playfair text-2xl leading-tight font-bold text-white focus:outline-none tabular-nums"
        >
          {known} known, {unknown} to review
        </h1>

        {/* NEW COPY, and the honest part. A student who has just pressed "Got
            It!" fifteen times could reasonably assume something was recorded.
            Saying plainly that nothing was scored prevents them reading a later
            unchanged Progress screen as the app losing their work — and points
            at the thing that does count. */}
        <p className="mt-4 text-sm text-slate-400">
          Flashcards are for learning, so nothing here is scored. Take a quiz when you want these
          words tested.
        </p>

        <div className="mt-10 flex flex-col gap-2">
          <button
            type="button"
            onClick={onPractiseAgain}
            className="min-touch w-full rounded-xl bg-primary px-4 font-semibold text-white transition-opacity hover:opacity-90"
          >
            {PRACTISE_AGAIN}
          </button>
          <button
            type="button"
            onClick={onDone}
            className="min-touch w-full rounded-xl border border-white/15 px-4 font-semibold text-white transition-colors hover:bg-white/[0.06]"
          >
            {DONE}
          </button>
        </div>
      </main>
    </div>
  )
}

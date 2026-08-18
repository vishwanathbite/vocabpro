import { useEffect, useRef, useState } from 'react'
import BottomSheet from '../components/BottomSheet.jsx'
import { ArrowLeft, Check, Volume2, X } from '../components/icons.jsx'
import { detailRows } from '../logic/item-details.js'
import DetailList from '../components/DetailList.jsx'
import { KeyboardShortcuts } from '../logic/settings.js'
import { SoundManager } from '../logic/sound.js'
import { speakWord } from '../logic/speech.js'
import MomentOverlay from '../quiz/MomentOverlay.jsx'
import BookmarkToggle from '../quiz/BookmarkToggle.jsx'
import { modeTitle, questionTextFor } from '../quiz/quiz-modes.js'

/**
 * The quiz session screen.
 *
 * PRESENTATIONAL. Every value it renders arrives as a prop and every action it
 * takes is a prop callback. It owns exactly two pieces of state, both purely
 * about this screen's own chrome: whether the exit confirmation is open, and
 * nothing else. Session state, scoring and persistence belong to
 * useQuizSession.
 *
 * BEHAVIOUR IS THE LIVE APP'S. Layout and styling are not — the legacy screen
 * is a purple-to-indigo gradient with backdrop-blur panels and a three-tile
 * stat grid, none of which survives into app-v2's flat navy surfaces. What is
 * reproduced exactly:
 *
 *   - tapping an option shows the result immediately and disables the options
 *   - the correct option is marked whether or not it was the one picked, so a
 *     wrong answer always reveals the right one
 *   - a wrong pick is marked separately, in red
 *   - a details panel appears with the word's own fields
 *   - a Next Question / Finish Quiz button waits for a tap
 *   - no auto-advance and no timer anywhere
 *
 * EVERY COUNT COMES FROM questions.length, never from ten. Synonym and antonym
 * sessions drop any sampled word with no synonyms or antonyms recorded, and
 * Smart Review serves however many pool words resolve — so a legitimate session
 * can be shorter than a full quiz, and a progress bar divided by a hard ten
 * would stop at 70% on a finished seven-question session.
 */

/* Option letters, matching the a/b/c/d keyboard shortcuts so the badge on each
   row is also the key that selects it. Four is the width every generator
   produces — one correct plus three distractors, or a stored four-option
   array — and .slice guards a shorter set rather than rendering `undefined`. */
const OPTION_LETTERS = ['A', 'B', 'C', 'D']

/* detailRows STOOD HERE and moved to logic/item-details.js when Search became
   its second caller. Same body, same labels, same shape dispatch — see the note
   there for why it dispatches on the item rather than on the mode. */

/* The two strings the daily challenge needs different, and nothing else.
   Defaults reproduce the quiz exactly, so every existing call site is
   unchanged by their existence.

   scoreLabel: a challenge has no running points to show — its perfect and
   streak bonuses are only knowable at the end — so it shows correct answers
   and must not call them "Score".

   exitCopy: "Earned points are saved" is TRUE of a quiz, which writes stats
   after every answer, and FALSE of a challenge, which writes nothing until the
   last question is finished. Leaving that sentence in place for both would
   have made the app lie at the one moment a student is deciding whether to
   walk away. */
const DEFAULT_SCORE_LABEL = 'Score'
const DEFAULT_EXIT_COPY = (unanswered) =>
  `You have ${unanswered} unanswered questions. Leave quiz? Earned points are saved.`

export default function QuizScreen({
  mode,
  questions,
  currentQuestion,
  currentIndex,
  selectedAnswer,
  showResult,
  isCorrect,
  isLastQuestion,
  score,
  scoreLabel = DEFAULT_SCORE_LABEL,
  exitTitle = 'Exit Quiz?',
  exitCopy = DEFAULT_EXIT_COPY,
  exitConfirmLabel = 'Exit Quiz',
  currentMoment,
  onDismissMoment,
  poolExit,
  towardMastery,
  keyboardEnabled,
  needsExitConfirm,
  unansweredCount,
  onAnswer,
  onNext,
  onExit
}) {
  const [confirmingExit, setConfirmingExit] = useState(false)

  /* A moment covers the screen, so everything behind it is made inert for the
     duration: no focus, no clicks, no assistive-technology reach. This is the
     ergonomic half of "Next must not be reachable behind an overlay" — the
     load-bearing half is useQuizSession's next(), which refuses to advance or
     complete while a moment is pending, so nothing here can end a session
     early even if this attribute were dropped.

     Applied to the header and main separately rather than to a new wrapper
     element: the header is `sticky` and the root is the height context, so
     introducing a div between them risks a layout change for no gain. */
  const backgroundInert = currentMoment ? true : undefined

  /**
   * Take focus on mount, because nothing else will.
   *
   * A quiz is usually launched from inside the difficulty sheet, and AppShell
   * branching unmounts the whole tab tree — the sheet with it. BottomSheet
   * restores focus to its trigger only `if (document.contains(el))`, and the
   * trigger has just been unmounted, so the restore is correctly skipped and
   * focus falls to <body>. A keyboard user would be tabbing from the top of the
   * document and a screen-reader user would hear nothing announced, at the one
   * moment the entire screen changed under them.
   *
   * The HEADING rather than the first option: it names the question, so what is
   * announced is what to answer. tabIndex -1 makes it programmatically
   * focusable without adding it to the tab order.
   *
   * ON MOUNT ONLY — an empty dependency array, not per question. Pulling focus
   * back on every advance would interrupt a screen reader mid-sentence and
   * fight a keyboard user who has already tabbed to an option; the options are
   * the next tab stop from here anyway.
   */
  const headingRef = useRef(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  /* The live app's rule: leaving before answering anything on the first
     question needs no confirmation, since there is nothing to lose. */
  const requestExit = () => {
    if (needsExitConfirm) setConfirmingExit(true)
    else onExit()
  }

  /* Keyboard shortcuts, read from the shared table rather than restated. The
     bindings are KeyboardShortcuts.quiz in logic/settings.js: 1-4 and a-d
     select, Enter and Space advance, Escape exits, p pronounces, s toggles
     sound. Writing them out again here would be a second copy of a table that
     the Settings screen also displays to the user.

     Registered on window in the bubble phase. The exit sheet's own handler is
     on document in the CAPTURE phase and stops propagation on Escape, so while
     it is open its Escape wins and this never sees the key — but the other
     bindings would still fire behind it, which is what `confirmingExit` guards
     below.

     NO DEPENDENCY ARRAY, deliberately. The handler closes over six changing
     values (confirmingExit, showResult, currentQuestion and three callbacks),
     and a list that misses one gives a listener holding a stale question — it
     would score the previous question's option. Re-registering per render is
     one removeEventListener and one addEventListener, which is cheaper than
     the class of bug the alternative invites. */
  useEffect(() => {
    if (!keyboardEnabled) return

    const onKeyDown = (e) => {
      /* Same guard the exit sheet gets, and for the same reason. Enter and
         Space are bound to `next` below whenever showResult is true, which is
         exactly when a moment is on screen — so without this, the one Enter
         that dismisses the moment would also advance the question, and on the
         last question would end the session behind the overlay.

         MomentOverlay's own Escape handler is on document in the CAPTURE phase
         and stops propagation, so this listener never sees that key; this
         covers everything else it does see. Enter and Space are left alone
         here rather than re-handled: the overlay's dismiss button is focused
         and is a real <button>, so the browser activates it natively. */
      if (confirmingExit || currentMoment) return
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      const shortcut = KeyboardShortcuts.quiz[e.key]
      if (!shortcut) return

      if (shortcut.action === 'selectOption') {
        if (showResult) return
        const option = currentQuestion?.options?.[shortcut.option]
        if (option === undefined) return
        e.preventDefault()
        onAnswer(option)
        return
      }

      if (shortcut.action === 'next') {
        if (!showResult) return
        e.preventDefault()
        onNext()
        return
      }

      if (shortcut.action === 'back') {
        e.preventDefault()
        requestExit()
        return
      }

      if (shortcut.action === 'pronounce') {
        if (!currentQuestion?.word) return
        e.preventDefault()
        speakWord(currentQuestion.word)
        return
      }

      if (shortcut.action === 'toggleSound') {
        e.preventDefault()
        SoundManager.toggle()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  if (!currentQuestion) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy px-4">
        <p role="status" className="text-sm text-slate-400">
          Loading question...
        </p>
      </div>
    )
  }

  const total = questions.length
  const progress = ((currentIndex + 1) / total) * 100
  const rows = detailRows(currentQuestion.wordData)

  /* Identity for the bookmark control's remount. The index alone would not do:
     Smart Review and Saved Words can serve the same word in two sessions, and a
     stale saved-state would be seeded from the previous mount. wordIdOf's own
     expression is not needed here — the question already carries `word`, and the
     index disambiguates the acronym and one-word shapes, which do not. */
  const questionKey = `${currentIndex}:${currentQuestion.word ?? ''}`

  return (
    <div className="min-h-screen bg-navy">
      {/* --- HEADER ---------------------------------------------------------
          Sticky so the progress and the exit stay reachable on a long options
          list, and navy rather than translucent so nothing shows through it. */}
      <header inert={backgroundInert} className="sticky top-0 z-40 border-b border-white/10 bg-navy">
        <div className="mx-auto w-full max-w-content px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={requestExit}
              aria-label="Exit quiz"
              className="min-touch -ml-2 flex items-center gap-2 rounded-lg px-2 text-slate-400 transition-colors hover:text-slate-200"
            >
              <ArrowLeft width="20" height="20" />
              <span className="text-sm font-medium">Exit</span>
            </button>

            {/* aria-live so a screen reader hears the running total change
                without having to go looking for it, matching the live app. */}
            <span
              aria-live="polite"
              aria-atomic="true"
              className="text-sm font-semibold text-white tabular-nums"
            >
              {scoreLabel}: {score}
            </span>
          </div>

          <div className="mt-3">
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium text-slate-300">{modeTitle(mode)}</span>
              <span className="text-xs text-slate-400 tabular-nums">
                Question {currentIndex + 1} of {total}
              </span>
            </div>
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-valuenow={currentIndex + 1}
              aria-valuemin={1}
              aria-valuemax={total}
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out motion-reduce:transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main inert={backgroundInert} className="mx-auto w-full max-w-content px-4 pt-6 pb-12">
        {/* --- QUESTION ---------------------------------------------------- */}
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="text-xl leading-snug font-semibold text-white focus:outline-none"
        >
          {questionTextFor(mode, currentQuestion)}
        </h1>

        {/* Only when the question carries a word of its own, so never for an
            acronym or a one-word substitute — there is nothing to pronounce
            when the prompt is "PSLV" or a definition-shaped phrase. Manual
            only: nothing on this screen speaks unprompted. */}
        {currentQuestion.word && (
          <button
            type="button"
            onClick={() => speakWord(currentQuestion.word)}
            aria-label={`Listen to the pronunciation of ${currentQuestion.word}`}
            className="min-touch -ml-2 mt-1 flex items-center gap-2 rounded-lg px-2 text-sm font-medium text-slate-400 transition-colors hover:text-slate-200"
          >
            <Volume2 width="18" height="18" />
            <span>Pronounce</span>
          </button>
        )}

        {/* --- OPTIONS ------------------------------------------------------
            No purple here. Before a result the options ARE the primary action,
            and highlighting one of four equal choices would be a lie about
            which to pick; after a result the Next button takes the purple.

            KNOWN DUPLICATE, and why it is not CARD. The neutral tone below
            spells out `border-white/10 bg-white/[0.03]`, which is what CARD in
            components/chrome.js holds. It is not composed from CARD because
            the correct and wrong tones must REPLACE those two utilities rather
            than sit alongside them, and Tailwind v4 resolves conflicts by
            stylesheet order, not by class-attribute order — so `${CARD}
            border-correct/70` is not reliably the correct tone. Each state
            therefore names its own complete pair. If CARD's values change,
            these three lines have to change with them. */}
        <ul className="mt-6 flex flex-col gap-2" aria-label="Answer options">
          {currentQuestion.options.map((option, index) => {
            const isTheAnswer = option === currentQuestion.correct
            const isPicked = selectedAnswer === option

            /* Marked whether or not it was picked — this is what reveals the
               right answer after a wrong one. */
            const markCorrect = showResult && isTheAnswer
            const markWrong = showResult && isPicked && !isTheAnswer

            let tone = 'border-white/10 bg-white/[0.03] text-white'
            if (markCorrect) tone = 'border-correct/70 bg-correct/10 text-white'
            else if (markWrong) tone = 'border-incorrect/70 bg-incorrect/10 text-white'
            else if (showResult) tone = 'border-white/10 bg-white/[0.03] text-slate-400'

            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => onAnswer(option)}
                  disabled={showResult}
                  className={`min-touch flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${tone} ${
                    showResult ? '' : 'hover:bg-white/[0.06]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${
                      markCorrect
                        ? 'bg-correct/20 text-correct'
                        : markWrong
                          ? 'bg-incorrect/20 text-incorrect'
                          : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {OPTION_LETTERS[index] ?? index + 1}
                  </span>

                  <span className="flex-1 text-sm leading-snug">{option}</span>

                  {markCorrect && (
                    <Check width="18" height="18" className="shrink-0 text-correct" />
                  )}
                  {markWrong && <X width="18" height="18" className="shrink-0 text-incorrect" />}
                </button>
              </li>
            )
          })}
        </ul>

        {/* --- RESULT ------------------------------------------------------- */}
        {showResult && (
          <div
            role="status"
            aria-live="polite"
            className={`mt-6 rounded-xl border p-4 ${
              isCorrect ? 'border-correct/40 bg-correct/10' : 'border-incorrect/40 bg-incorrect/10'
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  isCorrect ? 'bg-correct/20' : 'bg-incorrect/20'
                }`}
              >
                {isCorrect ? (
                  <Check width="18" height="18" className="text-correct" />
                ) : (
                  <X width="18" height="18" className="text-incorrect" />
                )}
              </span>
              <div>
                <p className="font-semibold text-white">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
                <p className={`text-sm ${isCorrect ? 'text-correct' : 'text-incorrect'}`}>
                  {isCorrect ? 'Great job! Keep it up!' : "Don't worry, learn from it!"}
                </p>
              </div>
            </div>

            <DetailList rows={rows} />

            {/* --- SAVE THE WORD -----------------------------------------
                AFTER THE ANSWER, never before it. The options are the only
                thing to do while a question is open, and a second control
                beside them would compete with them; once the result is showing
                the student is reading rather than deciding, which is the moment
                "keep this one" means something.

                Keyed by the question so it remounts per word — its saved state
                is seeded once per mount from storage.

                Inside the result panel, which already carries role="status"
                aria-live="polite". The button is not announced as part of that
                region's updates because it is interactive content with its own
                accessible name; it sits here for layout, beside the word's own
                fields. */}
            {currentQuestion.wordData && (
              <div className="mt-3 border-t border-white/10 pt-3">
                <BookmarkToggle
                  key={questionKey}
                  wordData={currentQuestion.wordData}
                  mode={currentQuestion.sourceMode ?? mode}
                />
              </div>
            )}

            {/* --- SMART REVIEW MARKS -----------------------------------
                QUIET AND INLINE, never an overlay and never queued. A word
                leaves the pool around three times in a session; a full-screen
                interruption at that rate teaches the student to dismiss
                without reading, and the next thing dismissed unread would be a
                badge.

                INSIDE this panel, which already carries role="status"
                aria-live="polite". A mark placed here is announced as part of
                the one result announcement. A sibling live region would make
                two announcements race for the same moment, and screen readers
                do not reliably order them.

                MUTUALLY EXCLUSIVE BY CONSTRUCTION, not by this ternary: the
                exit is learning -> mastered and the progress line is
                struggling -> learning, and one answer moves a word one step.
                The chain is written so that a future third state cannot show
                two marks at once by accident. */}
            {poolExit ? (
              <p className="mt-4 border-t border-white/10 pt-3 text-sm text-correct">
                <span className="font-semibold text-white">Mastered.</span> {poolExit} leaves Smart
                Review.
              </p>
            ) : towardMastery ? (
              /* THE FIRST-SESSION LINE. A pool word needs two corrects, so a
                 student's first review session after a bad quiz sheds nothing
                 however well they do — and silence there reads as "that
                 achieved nothing" rather than "you are halfway". This says
                 what actually changed and what it takes to finish. */
              <p className="mt-4 border-t border-white/10 pt-3 text-sm text-slate-300">
                <span className="font-semibold text-white">Halfway.</span> One more correct answer
                and {towardMastery} leaves Smart Review.
              </p>
            ) : null}
          </div>
        )}

        {/* --- NEXT ---------------------------------------------------------
            The one purple surface on this screen, and only once there is a
            result to move on from. */}
        {showResult && (
          <button
            type="button"
            onClick={onNext}
            className="min-touch mt-6 w-full rounded-xl bg-primary px-4 font-semibold text-white transition-opacity hover:opacity-90"
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
          </button>
        )}
      </main>

      {/* --- CELEBRATION MOMENT ---------------------------------------------
          ONE AT A TIME. useQuizSession hands down a single moment or null, so
          two can never be mounted together — the queue and its cursor live
          there, and this renders whatever is current. Dismissing advances the
          cursor; the last dismissal leaves null and reveals the quiz again. */}
      {currentMoment && (
        <MomentOverlay
          /* Remounts between moments, which is what re-runs the focus effect
             and guarantees the second moment's button takes focus rather than
             inheriting the first one's. */
          key={currentMoment.key}
          moment={currentMoment}
          onDismiss={onDismissMoment}
        />
      )}

      {/* --- EXIT CONFIRMATION ---------------------------------------------
          The quiz copy is the live app's, verbatim (js/app.js:1527-1531).
          "Earned points are saved" is a statement of fact rather than
          reassurance: stats, the review pool and daily-goal progress are
          written after every answer, so leaving costs only the unanswered
          questions and the history entry. The daily challenge overrides it,
          because for that session the same sentence would be false. */}
      <BottomSheet
        isOpen={confirmingExit}
        onClose={() => setConfirmingExit(false)}
        title={exitTitle}
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-300">{exitCopy(unansweredCount)}</p>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={onExit}
              className="min-touch w-full rounded-lg border border-red-400/40 bg-red-400/10 px-4 font-semibold text-red-200 transition-colors hover:bg-red-400/20"
            >
              {exitConfirmLabel}
            </button>
            <button
              type="button"
              onClick={() => setConfirmingExit(false)}
              className="min-touch w-full rounded-lg bg-primary px-4 font-semibold text-white transition-opacity hover:opacity-90"
            >
              Continue
            </button>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import { CARD } from '../components/chrome.js'
import { plural } from '../logic/format.js'
import {
  ANSWER_LABEL,
  BADGES_HEADING,
  CHOSE_LABEL,
  DONE,
  NOTHING_WRONG,
  POOL_CLEARED,
  POOL_HEADING,
  PRACTISE_AGAIN,
  TITLE,
  WHY_NONE_LEFT,
  WRONG_HEADING,
  WRONG_SUBTITLE,
  headlineFor,
  poolAddedLine,
  poolLeftLine
} from './results-copy.js'

/**
 * What a finished session leaves behind.
 *
 * REVIEW-LED, NOT A SCOREBOARD, and that ordering is the whole design. The
 * student watched the score climb for ten questions; what they never saw is
 * which words to work on, or that a word retired from Smart Review — the second
 * takes two sessions and a rule they cannot watch. So the words come first and
 * the figures are one line.
 *
 * THE ASYMMETRY THIS RESISTS: every scoreboard number was already computed and
 * sitting in quizResults, while the review content had to be captured per
 * answer in useQuizSession. The cheap content is the one worth less. A tile grid
 * would have been four lines of JSX against the wrong-word list's forty, and
 * that cost difference is exactly how this screen would have become a
 * scoreboard without anyone deciding it should.
 *
 * DELIBERATELY NOT RENDERED:
 *   - quizResults.correctAnswers / totalAnswered. Lifetime counters sitting in a
 *     session payload; js/ never rendered them either, and placing a lifetime
 *     figure beside a session one invites reading it as the session's.
 *   - quizResults.levelInfo. It is a live reference into LEVEL_CONFIG, and js/
 *     rendered `.badge` and `.color` off it — the two fields app-v2 declines
 *     everywhere, because they are Tailwind class strings and an emoji arriving
 *     from a data table at runtime that v4's scanner never sees.
 *   - Share. There is no share surface in app-v2 and this step does not add one.
 *
 * PRESENTATIONAL. Every value arrives as a prop; the two actions are callbacks.
 */

/* One row per missed question. Dispatches on the DATA, not the mode, for the
   same reason QuizScreen's detailRows does: a Smart Review session mixes
   vocabulary, acronyms and one-word substitutes, so a mode-keyed lookup would
   label an acronym's full form as a definition.

   The definition is shown only when it exists AND differs from the correct
   answer. In vocab mode the correct answer IS the definition, so showing both
   would print the same sentence twice; in synonym and antonym mode they differ,
   and the definition is what makes the synonym make sense. */
function WrongRow({ entry }) {
  const { wordId, wordData, picked, correct } = entry
  const definition = wordData?.definition
  const showDefinition = Boolean(definition) && definition !== correct

  return (
    <li className={`${CARD} px-4 py-3`}>
      <p className="font-semibold text-white">{wordId}</p>

      <dl className="mt-2 space-y-1 text-sm">
        <div className="flex gap-2">
          <dt className="shrink-0 text-slate-400">{CHOSE_LABEL}:</dt>
          {/* Muted, not red. The mistake is already made and this screen is for
              what to do next; a red wash over ten rows reads as a scolding. */}
          <dd className="text-slate-400 line-through">{picked}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="shrink-0 text-slate-400">{ANSWER_LABEL}:</dt>
          <dd className="text-emerald-200">{correct}</dd>
        </div>
        {showDefinition && (
          <div className="flex gap-2">
            <dt className="sr-only">Definition</dt>
            <dd className="text-slate-300">{definition}</dd>
          </div>
        )}
      </dl>
    </li>
  )
}

export default function ResultsScreen({
  mode,
  summary,
  onPractiseAgain,
  onDone
}) {
  const { quizResults, review } = summary
  const { correctCount, totalQuestions, score, accuracy } = quizResults
  const { wrong, poolAdded, poolRemoved, poolRemaining, badges } = review

  /**
   * Take focus on mount, for the same reason QuizScreen's heading does: the
   * quiz subtree has just been replaced wholesale, so the element that had
   * focus is gone and focus has fallen to <body>. A screen-reader user would
   * otherwise hear nothing at the one moment the entire screen changed.
   */
  const headingRef = useRef(null)
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  /* THE ONE DEAD-BUTTON CASE. A Smart Review session that cleared the pool
     cannot be repeated: startQuiz checks the pool BEFORE loading anything and
     returns 'nothing-to-review' (startQuiz.js:154). Offering the button anyway
     would bounce the student back to the tab with a notice under a tile they
     did not tap.

     HIDDEN RATHER THAN ROUTED, and the reason is already on screen: the pool
     section directly above says how many words left and none remain, so a
     student is told what happened and is not also handed a control that
     contradicts it. Every other mode can always be repeated. */
  const canPractiseAgain = !(mode === 'review' && poolRemaining === 0)

  return (
    <div className="min-h-screen bg-navy">
      <main className="mx-auto w-full max-w-content px-4 pt-8 pb-12">
        {/* --- HEADLINE -----------------------------------------------------
            Title and headline are js/'s, verbatim. The figures are ONE LINE,
            not a grid: a session with no closing number reads as though the app
            lost track, but the grid is what makes it a scoreboard. */}
        <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          {TITLE}
        </p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="mt-1 font-playfair text-2xl leading-tight font-bold text-white focus:outline-none"
        >
          {headlineFor(accuracy)}
        </h1>
        <p className="mt-1 text-sm text-slate-400 tabular-nums">
          {correctCount}/{totalQuestions} correct answers · +{score} points
        </p>

        {/* --- WORDS TO WORK ON --------------------------------------------
            The main content, and first because it is what the student cannot
            get anywhere else. */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-white">{WRONG_HEADING}</h2>
          {wrong.length === 0 ? (
            <p className="mt-1 text-sm text-slate-400">{NOTHING_WRONG}</p>
          ) : (
            <>
              <p className="mt-1 text-sm text-slate-400">{WRONG_SUBTITLE}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {wrong.map((entry) => (
                  <WrongRow key={entry.wordId} entry={entry} />
                ))}
              </ul>
            </>
          )}
        </section>

        {/* --- SMART REVIEW DELTA ------------------------------------------
            The "left" line is unconditional, including at zero — see
            results-copy.js. The "added" line is suppressed at zero. */}
        <section className="mt-8">
          <h2 className="text-sm font-semibold text-white">{POOL_HEADING}</h2>
          <div className="mt-1 space-y-1 text-sm text-slate-400">
            {poolAdded.length > 0 && <p>{poolAddedLine(plural(poolAdded.length, 'word'))}</p>}
            <p>{poolLeftLine(plural(poolRemoved.length, 'word'))}</p>
            {poolRemoved.length === 0 && <p className="text-slate-500">{WHY_NONE_LEFT}</p>}
          </div>
        </section>

        {/* --- BADGES -------------------------------------------------------
            ALL of the session's badges, not just the one shown as a moment. */}
        {badges.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-semibold text-white">{BADGES_HEADING}</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {badges.map((badge) => (
                <li key={badge.id} className={`${CARD} flex items-center gap-3 px-4 py-3`}>
                  <span aria-hidden="true" className="text-2xl leading-none">
                    {badge.icon}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{badge.name}</span>
                    <span className="block text-sm text-slate-400">{badge.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* --- ACTIONS ------------------------------------------------------
            One purple surface, spent on the action that continues practice. */}
        <div className="mt-10 flex flex-col gap-2">
          {canPractiseAgain ? (
            <button
              type="button"
              onClick={onPractiseAgain}
              className="min-touch w-full rounded-xl bg-primary px-4 font-semibold text-white transition-opacity hover:opacity-90"
            >
              {PRACTISE_AGAIN}
            </button>
          ) : (
            <p className="px-1 text-sm text-slate-400">{POOL_CLEARED}</p>
          )}

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

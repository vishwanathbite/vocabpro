/**
 * Everything the results screen says, and the one accuracy tiering in app-v2.
 *
 * SEPARATE FROM THE SCREEN for the same reason moments.js is separate from
 * MomentOverlay: the copy is the part that gets reviewed and approved, and it
 * should be readable without reading JSX around it.
 *
 * THE THRESHOLDS LIVE HERE AND NOWHERE ELSE. gamification.js carried a
 * getPerformanceGrade tiering 90/80/70/60/50 into six grades; it was unexported,
 * had zero callers, disagreed with the approved copy at 60 ('Fair' against
 * 'Good Job!'), and returned Tailwind class strings from a data table that v4
 * would never generate. It was DELETED in this step rather than exported — see
 * the note left in its place. So this file is not a second copy of that tiering;
 * it is the replacement for it, and there is no other.
 */

/**
 * The headline, from SESSION accuracy.
 *
 * 80 / 60, and the three strings, are js/'s (js/app.js:2134), verbatim. The
 * split is on the share of THIS session's questions, so it is untouched by the
 * level-curve rescales of steps 7e and 10 — those moved what points mean, not
 * what a proportion means.
 *
 * Ordered high to low and read with `>=`, so the boundaries are inclusive:
 * exactly 80 is 'Excellent!', exactly 60 is 'Good Job!'.
 */
const HEADLINE_TIERS = [
  { min: 80, headline: 'Excellent!' },
  { min: 60, headline: 'Good Job!' },
  { min: 0, headline: 'Keep Practicing!' }
]

/**
 * @param {number} accuracy Session accuracy, 0-100 (quizResults.accuracy)
 * @returns {string} The headline for that accuracy
 */
export const headlineFor = (accuracy) =>
  // The 0 floor makes the find total, so this cannot return undefined even for
  // a negative or non-numeric accuracy from a corrupt payload.
  (HEADLINE_TIERS.find((t) => accuracy >= t.min) ?? HEADLINE_TIERS[HEADLINE_TIERS.length - 1])
    .headline

/**
 * Modal title, from js/app.js:2125, verbatim. ResultsScreen's DEFAULT — it
 * takes the title as a prop, so a session that is not a quiz can say so.
 */
export const TITLE = 'Quiz Complete!'

/** The daily challenge's replacement for TITLE. Approved. */
export const CHALLENGE_TITLE = 'Challenge Complete!'

/**
 * The wrong-word section.
 *
 * NEW COPY. js/ had none — its completion modal was four stat tiles and a share
 * button, and never named a word the student missed.
 *
 * The subtitle states the actual rule rather than a vague promise. A word leaves
 * the pool when updateStats promotes it learning -> mastered, which is two
 * correct answers with no wrong one in between (gamification.js:579-595). "In a
 * row" is the honest short form: a wrong answer in between sends the word back
 * to struggling and the count restarts.
 */
export const WRONG_HEADING = 'Words to work on'
export const WRONG_SUBTITLE =
  'These are in Smart Review now. Answer one correctly twice in a row and it leaves the list.'

/** Shown when the session was perfect, in place of the wrong-word list. */
export const NOTHING_WRONG = 'Nothing missed this session.'

/** Per wrong word. `You chose` names the mistake without scolding it. */
export const CHOSE_LABEL = 'You chose'
export const ANSWER_LABEL = 'Correct'

/**
 * The pool delta.
 *
 * NEW COPY, and the honest half of this screen. Both directions are stated
 * because only one of them is visible from the quiz itself: a student sees each
 * wrong answer as it happens, but never sees a word retire — that took two
 * sessions and a rule they cannot watch.
 *
 * THE "0 LEFT" LINE IS ALWAYS RENDERED, deliberately, and this is the same
 * first-session honesty problem step 12b solved with its inline marks. A pool
 * word needs two corrects, so a student's first review session after a bad quiz
 * sheds nothing however well they do. Silence there reads as "that achieved
 * nothing"; the number plus the reason reads as "halfway, and here is the rule".
 * WHY_NONE_LEFT is therefore shown exactly when the count is 0.
 *
 * The "added" line is suppressed at 0, because "0 words added to Smart Review"
 * is not news — it is the ordinary case for a good session, and stating it would
 * bury the line that matters under one that never varies.
 */
export const POOL_HEADING = 'Smart Review'
export const poolAddedLine = (plural) => `${plural} added to Smart Review.`
export const poolLeftLine = (plural) => `${plural} left Smart Review today.`
export const WHY_NONE_LEFT =
  'A word needs two correct answers in a row before it leaves, so the first pass through never clears any.'

/** Badges earned across the whole session, not just the one shown as a moment. */
export const BADGES_HEADING = 'Earned this session'

/**
 * Actions. SHARED WITH THE FLASHCARD END CARD, which imports both from here.
 *
 * The two screens are different in every other respect, but they offer the same
 * two choices and the labels must not drift — "Practise again" against a
 * "Practice again" elsewhere is the kind of difference nobody notices and every
 * user does. One spelling, one file.
 */
export const PRACTISE_AGAIN = 'Practise again'
export const DONE = 'Done'

/**
 * Shown in place of "Practise again" when a Smart Review session emptied the
 * pool, so the button is never offered when startQuiz would refuse it.
 *
 * NOT startQuiz's 'nothing-to-review' string, deliberately. That one is written
 * for a student who tapped Smart Review and found nothing waiting; this one is
 * for a student who just cleared it, and the difference is worth saying.
 */
export const POOL_CLEARED = 'Smart Review is clear — nothing left to practise right now.'

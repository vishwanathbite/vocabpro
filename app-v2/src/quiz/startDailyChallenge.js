/**
 * Daily challenge launch.
 *
 * A sibling of startQuiz, not a mode inside it. startQuiz resolves a row of
 * QUIZ_MODES, reads a difficulty and calls quiz-generation's generateQuestions;
 * the challenge has no row, no difficulty and its own generator. What it does
 * share is the SHAPE of the answer — `{ ok: true, ... }` or
 * `{ ok: false, mode, reason }` with a reason that is a key of LAUNCH_MESSAGE —
 * so AppShell and LaunchNotice handle it with the code they already have.
 *
 * THE ONE HARD RULE: the challenge is ALWAYS DAILY_CHALLENGE_QUESTIONS long.
 *
 * This is the whole reason the launcher exists. generateQuestions reads
 * `vocabularyDB.easy/medium/hard` directly with `|| []` and no await, and
 * seededSample under-delivers rather than throwing — so a challenge generated
 * before medium and hard land silently serves 4 questions instead of 10, with
 * nothing logged. AppShell paints on easy alone and warms the other two in the
 * background, so that window is the ordinary case on a first visit, not an edge
 * one. Awaiting all three levels here is what closes it.
 *
 * AWAITING IS ALSO WHAT MAKES THE FAILURE LEGIBLE. An unloaded level and a
 * loaded-but-empty one are both `[]` — ensureVocabularyDB creates the arrays
 * eagerly — so a direct read cannot tell "still loading" from "nothing there".
 * A resolved loadVocabularyLevel means loadOnce's isPopulated check passed; a
 * rejection means the import genuinely failed and the loader has already evicted
 * it, so trying again re-imports. Same reasoning as startQuiz.js:106-112, which
 * named this function's absence as the reason the challenge under-delivered.
 *
 * NOTHING HERE PERSISTS. The loaders write only to globals and generateQuestions
 * is pure apart from the Date.now() stamped on each question. The transitive
 * caveat every storage read in this app carries does not apply: this reads none.
 */

import { DIFFICULTIES, DAILY_MODE } from './quiz-modes.js'
import { loadVocabularyLevel } from '../data/loader.js'
import { DailyChallengeManager, DAILY_CHALLENGE_QUESTIONS } from '../logic/daily-challenge.js'

/**
 * Prepare today's challenge.
 *
 * @returns {Promise<Object>} Either
 *   `{ ok: true, mode, questions }` with exactly DAILY_CHALLENGE_QUESTIONS
 *   questions, or `{ ok: false, mode, reason }` where reason is one of:
 *     'loading'         - a level did not load; trying again may work
 *     'challenge-short' - every level loaded and the corpus still could not
 *                         fill the plan. Retrying will not help.
 */
export async function startDailyChallenge() {
  try {
    /* THE SAME EXPRESSION MIXED USES (startQuiz.js:114), and the same promises:
       loadOnce caches by key, so a tap during AppShell's background warm joins
       the in-flight import rather than racing a second one. */
    await Promise.all(DIFFICULTIES.map(loadVocabularyLevel))
  } catch (err) {
    console.warn('Vocabulary for the daily challenge did not load; it was not started.', err)
    return { ok: false, mode: DAILY_MODE, reason: 'loading' }
  }

  const questions = DailyChallengeManager.generateQuestions()

  /* NOT `> 0`. A partial challenge is a failure, not a short session.
     Every level has resolved and been verified non-empty above, so a short
     result here means the corpus itself cannot fill the plan — which no retry
     fixes and which a student must never be quietly served, since the whole
     point of a shared daily challenge is that everyone gets the same ten. */
  if (questions.length !== DAILY_CHALLENGE_QUESTIONS) {
    console.warn(
      `Daily challenge produced ${questions.length} of ${DAILY_CHALLENGE_QUESTIONS} questions ` +
        'with all levels loaded; it was not started.'
    )
    return { ok: false, mode: DAILY_MODE, reason: 'challenge-short' }
  }

  return { ok: true, mode: DAILY_MODE, questions }
}

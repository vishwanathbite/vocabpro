/**
 * Flashcard launch.
 *
 * THE UNSCORED SIBLING OF startQuiz, and deliberately a separate function
 * rather than a branch inside it. startQuiz's whole body is about producing
 * QUESTIONS — resolving datasets so generateQuestions can build stems, options
 * and a correct answer — and a flashcard has none of those. It has a word and
 * its own stored fields, which the student reads. Folding the two together
 * would mean a function whose second half is skipped for one mode, and the
 * skip would be a boolean.
 *
 * SAME CONTRACT AS startQuiz so the shell and LaunchNotice need no special
 * case: `{ ok: true, mode, difficulty, cards }` or `{ ok: false, mode, reason }`
 * with the same reason strings. The success shape says `cards`, not
 * `questions`, because that is what it is.
 *
 * NOTHING HERE PERSISTS. It reads no storage at all — not even the stats read
 * startQuiz does for Smart Review's pool check, because a flashcard session has
 * no pool and no precondition beyond having words to show.
 */

import {
  QUIZ_MODES,
  DATASET,
  DIFFICULTIES,
  DEFAULT_DIFFICULTY,
  MIXED,
  isScoredMode,
  isValidDifficulty
} from './quiz-modes.js'
import { loadVocabularyLevel } from '../data/loader.js'
import { poolFor } from '../logic/quiz-generation.js'
import { sample } from '../logic/helpers.js'

/**
 * Cards per flashcard session.
 *
 * FIFTEEN, AND NOT THE SAME THING AS QUESTIONS_PER_QUIZ = 10. This is the live
 * app's figure (js/app.js:1277, `selectSRSOptimizedWords(words, 15)`) and it is
 * larger on purpose: a card is read and self-rated in a couple of seconds,
 * where a question is answered, scored and reviewed. Ten cards would be a
 * thirty-second session.
 *
 * DO NOT "UNIFY" THIS WITH QUESTIONS_PER_QUIZ. quiz-generation.js:101-106
 * already records that CHALLENGE_QUESTIONS (LearnScreen) and the daily
 * challenge's 4+3+3 split are second sources of a counted-item number that have
 * drifted; this is a fourth number in that family and the temptation to
 * collapse them will recur. They are not copies of one another — they are four
 * different session lengths that happen to be integers. The day one of them
 * genuinely should follow another, import it; until then, each states its own
 * and says why.
 */
export const CARDS_PER_SESSION = 15

/**
 * Prepare a flashcard session.
 *
 * @param {Object} args
 * @param {string} [args.difficulty] A level id, or the mixed marker
 * @returns {Promise<Object>} Either
 *   `{ ok: true, mode: 'flashcard', difficulty, cards }` with at least one card,
 *   or `{ ok: false, mode: 'flashcard', reason }` where reason is:
 *     'loading' - the vocabulary did not load; trying again may work
 *     'empty'   - it loaded and has nothing to show
 */
export async function startFlashcards({ difficulty } = {}) {
  const mode = 'flashcard'

  if (isScoredMode(mode)) {
    /* Unreachable while the table says scored:false, and pointed at the person
       who would change that. Flipping the marker without moving the launch
       point would otherwise route a scored mode through a screen that writes
       nothing, and the session would silently stop counting. */
    console.warn(`startFlashcards: "${mode}" is marked scored; it belongs in startQuiz`)
    return { ok: false, mode, reason: 'empty' }
  }

  // Same resolution as startQuiz: an unrecognised stored preference falls back
  // to the default rather than reaching poolFor, where it would yield an empty
  // pool and report 'empty' — blaming the corpus for a bad stored string.
  const requested = isValidDifficulty(difficulty) ? difficulty : DEFAULT_DIFFICULTY
  const level = QUIZ_MODES[mode].takesDifficulty ? requested : null

  try {
    // Mixed needs all three levels; a single level needs only itself. Awaited
    // rather than read directly, for the reason startQuiz spells out at length:
    // an unloaded level and a loaded-empty one are both `[]`, so only awaiting
    // can tell "still loading" from "nothing there".
    await (level === MIXED
      ? Promise.all(DIFFICULTIES.map(loadVocabularyLevel))
      : loadVocabularyLevel(level))
  } catch (err) {
    console.warn(`Vocabulary for flashcards did not load; the session was not started.`, err)
    return { ok: false, mode, reason: 'loading' }
  }

  /* poolFor and sample, not new selection logic. poolFor already owns the
     "which words does this difficulty mean" question including the Mixed
     flatten, and sample already draws WITHOUT REPLACEMENT — which is what makes
     "cards do not revisit" true at the source rather than a rule the screen has
     to keep. js/ used selectSRSOptimizedWords here; that died with SM-2 and
     there is nothing to replace it with, nor should there be: a flashcard
     session is for meeting words, so which words are "due" is not a question it
     asks. */
  const cards = sample(poolFor(level), CARDS_PER_SESSION)

  if (cards.length === 0) {
    return { ok: false, mode, reason: 'empty' }
  }

  // Fewer than CARDS_PER_SESSION is fine and needs no comment to the student:
  // the header counts against cards.length, never against 15.
  return { ok: true, mode, difficulty: level, cards }
}

/* DATASET is imported for the assertion below and nothing else. The flashcard
   row declares [DATASET.VOCAB]; if that ever grows an acronym or one-word
   dataset, the loader above stops matching the declaration and the session
   would silently show only vocabulary. */
if (QUIZ_MODES.flashcard.datasets.length !== 1 ||
    QUIZ_MODES.flashcard.datasets[0] !== DATASET.VOCAB) {
  console.warn(
    'startFlashcards: the flashcard row no longer declares vocabulary alone; ' +
    'its loader needs updating to match.'
  )
}

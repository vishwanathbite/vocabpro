/**
 * Quiz launch.
 *
 * A plain async function, deliberately not a component or a hook. Launching is
 * the one place where `await` meets three failure shapes that generateQuestions
 * reports identically — it warns and returns `[]` for a missing database, an
 * empty difficulty pool and an unresolvable review pool alike. Deciding between
 * them needs the loaders' state and the review pool's length, and burying that
 * decision in effect ordering inside a component would make it unreadable.
 *
 * ONE HARD RULE: a session never starts with zero questions. An empty session
 * has no answers to score and reaches summarizeQuizResults with
 * correctCount === 0 and sessionTotal === 0, where `accuracy` is guarded to 0
 * but the idioms branch's `correctCount === sessionTotal` test — and any later
 * perfect-score check written against the same shape — reads 0 === 0 as a
 * perfect run. The failure is returned to the caller instead.
 *
 * NOTHING HERE PERSISTS. StatsManager.loadStats is a read; the loaders write
 * only to globals. The one caveat is the transitive one every storage read in
 * this app carries: StorageManager.loadState writes on its legacy-migration and
 * corruption-recovery paths, which are boot-time only.
 */

import {
  QUIZ_MODES,
  DATASET,
  DIFFICULTIES,
  DEFAULT_DIFFICULTY,
  isStartableMode
} from './quiz-modes.js'
import { loadVocabularyLevel, loadAcronyms, loadOneWord } from '../data/loader.js'
import { generateQuestions } from '../logic/quiz-generation.js'
import { StatsManager } from '../logic/gamification.js'

/**
 * What the student is told, per launch outcome. THE SINGLE SOURCE — both
 * launch points import this rather than writing the sentence twice.
 *
 * ORDINARY STATES, NOT ERRORS. None of these is a dialog, an alert or a red
 * banner: each is a line of text under the tile that was tapped, and the tile
 * stays tappable. Two of the three are genuinely retryable and the third is
 * good news.
 *
 * 'starting' is the live app's own loading line (js/app.js:1302), reused so the
 * wording a student sees while a quiz is prepared has not changed.
 *
 * 'nothing-to-review' is Dr. Bite's approved string and is not paraphrased. It
 * describes an empty pool as an achievement with a route out of it, which is
 * what it is — the mode is not broken and there is nothing to fix.
 *
 * 'loading' and 'empty' are written for this commit and are pending approval.
 * Both are deliberately plain: they say what is true and what to do, and
 * neither apologises or suggests something has gone wrong, because nothing has.
 */
export const LAUNCH_MESSAGE = {
  starting: 'Preparing your quiz...',
  loading: 'These words are still loading. Give it a moment, then try again.',
  empty: 'No questions available for this mode right now — try another one.',
  'nothing-to-review':
    'Nothing to review yet — take any quiz, and the words you get wrong will collect here, ready to master.'
}

/**
 * Resolve a mode's dataset keys into the loader promises for this session.
 *
 * Smart Review asks for DATASET.VOCAB and gets ALL THREE levels, not one. It
 * has no difficulty — a pool word is served because it was missed, not because
 * of which pool it came from — so there is no single level to resolve against.
 *
 * loadAcronyms and loadOneWord have had no caller anywhere in app-v2 until now.
 * Both databases were reachable only as undefined globals, which is why the
 * acronym and one-word tiles could not have produced a question.
 *
 * @param {Object} spec  Entry from QUIZ_MODES
 * @param {string|null} level Resolved difficulty, or null for modes without one
 * @returns {Array<Promise<void>>}
 */
const loadersFor = (spec, level) =>
  spec.datasets.map((key) => {
    if (key === DATASET.ACRONYMS) return loadAcronyms()
    if (key === DATASET.ONEWORD) return loadOneWord()
    return level
      ? loadVocabularyLevel(level)
      : Promise.all(DIFFICULTIES.map(loadVocabularyLevel))
  })

/**
 * Prepare a quiz session.
 *
 * @param {Object} args
 * @param {string} args.mode        Mode id; must be a key of QUIZ_MODES
 * @param {string} [args.difficulty] Only meaningful for takesDifficulty modes
 * @returns {Promise<Object>} Either
 *   `{ ok: true, mode, difficulty, questions }` with at least one question, or
 *   `{ ok: false, mode, reason }` where reason is one of:
 *     'loading'           - the data is not there yet; trying again may work
 *     'empty'             - the data is there and has nothing to serve
 *     'nothing-to-review' - the review pool is empty, which is a success state
 *                           for the student, not a failure of the app
 */
export async function startQuiz({ mode, difficulty } = {}) {
  if (!isStartableMode(mode)) {
    // Not reachable from any launch point — every caller passes an id from
    // QUIZ_MODES. Reported rather than thrown so a future launch point with a
    // typo degrades to an ordinary empty state instead of unmounting the tree.
    console.warn(`startQuiz: unknown mode "${mode}"`)
    return { ok: false, mode, reason: 'empty' }
  }

  const spec = QUIZ_MODES[mode]
  const level = spec.takesDifficulty ? difficulty || DEFAULT_DIFFICULTY : null

  // CHECKED BEFORE LOADING, not after. An empty pool is knowable from storage
  // alone, and the student should not wait on ~1.8 MB of databases to be told
  // there is nothing to review. It is also the only one of the three outcomes
  // that is not about data availability at all.
  if (mode === 'review' && StatsManager.loadStats().reviewPool.length === 0) {
    return { ok: false, mode, reason: 'nothing-to-review' }
  }

  try {
    await Promise.all(loadersFor(spec, level))
  } catch (err) {
    // 'loading', not an error state. The loader evicts a rejected entry from
    // its promise cache, so a second attempt genuinely re-imports rather than
    // replaying the failure — which makes "try again" true advice rather than
    // a dead button.
    console.warn(`Data for "${mode}" did not load; the session was not started.`, err)
    return { ok: false, mode, reason: 'loading' }
  }

  const questions = generateQuestions(mode, level)

  if (questions.length > 0) {
    return { ok: true, mode, difficulty: level, questions }
  }

  if (mode === 'review') {
    // The pool was non-empty above and every database it could draw on has now
    // resolved, so the ids in it match nothing loaded. Reported as 'loading'
    // per the agreed rule for a non-empty pool that yields no questions.
    //
    // WORTH KNOWING: with the datasets awaited above, the loading race this
    // rule was written for is closed. What can still land here is a pool
    // holding ids from a retired database — an idiom saved by the js/ tree,
    // which shares STORAGE_KEY and whose idiomsDB is deliberately never ported.
    // Those ids are stale rather than pending, and no amount of retrying will
    // resolve them. Distinguishing the two needs a pool entry that records
    // which database it came from, which is a storage change.
    return { ok: false, mode, reason: 'loading' }
  }

  return { ok: false, mode, reason: 'empty' }
}

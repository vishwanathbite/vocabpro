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
  MIXED,
  isStartableMode,
  isScoredMode,
  isValidDifficulty
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
  /* Mixed gets its own wait line because it is the one launch that can make a
     student wait on purpose. It needs medium and hard — ~376 kB gzip, which is
     roughly 7.5 s on a 50 kB/s connection — where every other mode either has
     its data already or needs far less. Naming the levels says what the wait is
     buying, and naming the connection stops a slow one reading as a hang.

     WE WAIT. We do not degrade to the levels that happen to be loaded: a Mixed
     quiz that quietly serves easy-only words is the exact failure this feature
     exists to prevent, and it is invisible to the student, who has no way to
     tell nine easy words from a fair mix. */
  startingMixed:
    'Loading all three levels for a Mixed quiz. This can take a moment on a slow connection.',
  /* The daily challenge waits on the same three levels Mixed does, and for a
     harder reason: it is ALWAYS ten questions drawn 4/3/3, so it cannot start
     on easy alone the way a Mixed quiz technically could. Its own line because
     "Preparing your quiz" is not what the student tapped. Approved. */
  startingDaily: 'Preparing today’s challenge…',
  loading: 'These words are still loading. Give it a moment, then try again.',
  empty: 'No questions available for this mode right now — try another one.',
  /* Every level loaded and the corpus still could not fill ten slots. Distinct
     from 'loading' because that one names the words rather than the challenge,
     and from 'empty' because that line offers another mode and there is no
     other daily challenge. Approved. */
  'challenge-short': 'Could not load today’s challenge. Check your connection and try again.',
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

    // ALL THREE for Mixed, and for Smart Review, which has no level at all.
    //
    // This is the whole guarantee. The awaited promise is the SAME one the
    // background warm created — loadOnce caches by key — so a tap during
    // warming joins the in-flight import rather than racing a second one, and
    // resolution means loadOnce's isPopulated check passed. There is no path
    // from here to a generator running against a half-loaded vocabularyDB.
    //
    // DO NOT REPLACE THIS WITH A DIRECT READ of vocabularyDB.easy/medium/hard.
    // daily-challenge.js:262-264 and :309 do exactly that, with `|| []` and no
    // await, and it is why a challenge started early yields 4 questions instead
    // of 10 and says nothing. An unloaded level and a loaded-empty one are both
    // `[]` — ensureVocabularyDB creates the empty arrays eagerly — so a direct
    // read cannot tell "still loading" from "nothing there". Awaiting can: it
    // resolves for loaded-and-populated and rejects for loaded-and-empty.
    return !level || level === MIXED
      ? Promise.all(DIFFICULTIES.map(loadVocabularyLevel))
      : loadVocabularyLevel(level)
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

  if (!isScoredMode(mode)) {
    /* THIS FUNCTION IS THE SCORED PATH, AND ONLY THAT.
       Flashcards joined QUIZ_MODES in step 14, so isStartableMode now admits a
       mode that has no questions and must never be scored. Without this guard
       it would fall through to generateQuestions, which has no flashcard branch
       — it would warn, return [], and surface as 'empty', blaming the corpus for
       a routing mistake. Refused by name instead, and loudly. */
    console.warn(`startQuiz: "${mode}" is not a scored mode; use startFlashcards`)
    return { ok: false, mode, reason: 'empty' }
  }

  const spec = QUIZ_MODES[mode]

  // A stored preference is read back from a blob the js/ tree also writes, and
  // could be a value from a future version or a corrupt one. An unrecognised
  // difficulty falls back to the default rather than reaching poolFor, where it
  // would resolve to an empty pool and report 'empty' — which would blame the
  // corpus for a bad stored string.
  const requested = isValidDifficulty(difficulty) ? difficulty : DEFAULT_DIFFICULTY
  const level = spec.takesDifficulty ? requested : null

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
    // UNREACHABLE TODAY, and worth recording why rather than leaving the branch
    // looking speculative. Two routes were checked by grep:
    //
    //   - js/ cannot seed the pool. reviewPool appears nowhere in that tree;
    //     it was introduced in step 8 in app-v2 only. The two trees share
    //     STORAGE_KEY, so js/ can see the blob, but it never touches the field.
    //   - app-v2 cannot put an idiom in it. idiomsDB is never assigned here,
    //     loader.js deliberately does not port it, and no idiom mode exists in
    //     QUIZ_MODES, so the idiom branches of generateQuestions are
    //     unreachable from any launch point.
    //
    // The pool's only writers are updateStats via quiz-scoring (called by
    // useQuizSession) and via match-scoring (still callerless), so every id in
    // it was written by a mode in QUIZ_MODES — all of which resolve against
    // databases awaited above.
    //
    // The real stale case arrives with the PR-D data removal: a word dropped
    // from the corpus stays in the pool of anyone who had already missed it,
    // and no retry will resolve it. Telling that apart from a genuine load
    // failure needs a pool entry that records which database it came from,
    // which is a storage change and belongs with that work.
    return { ok: false, mode, reason: 'loading' }
  }

  return { ok: false, mode, reason: 'empty' }
}

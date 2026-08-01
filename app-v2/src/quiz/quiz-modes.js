/**
 * Quiz mode table.
 *
 * THE SINGLE SOURCE for everything a mode is called and everything a launcher
 * needs to know about it: display name, accessible description, which datasets
 * must be resolved before questions can be generated, whether the mode takes a
 * difficulty, and how a question's stem is worded.
 *
 * WHY IT EXISTS. The display strings already lived in PracticeScreen's GROUPS
 * table, and the quiz header needs the same names — that would have been a
 * second copy, and every previous instance of that pattern in this repo (the
 * stats defaults, the goal presets, the streak thresholds quiz-scoring carried)
 * became a copy that later drifted. PracticeScreen now reads from here.
 *
 * The question stems are the live app's, from getQuestionText at
 * js/screens.js:917-932. Names and descriptions are the ones already agreed in
 * PracticeScreen — including Smart Review's replacement wording, which is
 * deliberately NOT the live app's "AI-powered" line.
 *
 * IMPORTS ONLY CONSTANTS. It is a table; a launcher maps `datasets` onto loader
 * functions rather than this module reaching for them. The two imports below
 * are the difficulty set and the mixed marker, taken from the modules that own
 * them rather than restated here — see DIFFICULTIES.
 *
 * DELIBERATELY ABSENT: flashcard, daily, bookmarks, idiom, idiom-reverse,
 * match. Flashcards are self-reported and never reach the scoring path; the
 * daily challenge builds its own questions in daily-challenge.js; the other
 * three are cut or unbuilt. A mode absent from this table cannot be started.
 */

import { VOCAB_LEVELS, MIXED } from '../data/loader.js'

export { MIXED }

/**
 * Dataset keys, mapped to loaders by startQuiz.js. 'vocab' means "the level
 * this session is running at" and is resolved against the difficulty; the other
 * two are whole databases.
 */
export const DATASET = {
  VOCAB: 'vocab',
  ACRONYMS: 'acronyms',
  ONEWORD: 'oneword'
}

/**
 * The three levels a difficulty-taking mode can run at.
 *
 * RE-EXPORTED, NOT RESTATED. This was its own `['easy', 'medium', 'hard']`
 * literal in step 11 — a second copy of loader.js's VOCAB_LEVELS, shipped while
 * explicitly looking for duplicates. The loader owns the set because loading is
 * what makes a level real: a member of that array is a key of the loader's
 * `importers` map, and loadVocabularyLevel validates against it. A level the
 * picker offered but the loader could not load would be a row that starts
 * nothing.
 */
export { VOCAB_LEVELS as DIFFICULTIES }

/**
 * DEFAULT DIFFICULTY — Mixed, as of step 12a.
 *
 * It was 'easy' in step 11, chosen because it is the one chunk guaranteed
 * loaded at boot so the three difficulty-taking modes could start without
 * waiting. The cost was that 3,052 of 4,009 words were unreachable: no screen
 * could ask for medium or hard, so no student ever saw them.
 *
 * Mixed now, which CHANGES BEHAVIOUR FOR EXISTING SAVES as well as new ones —
 * deliberately. Nobody has a remembered choice, because nothing wrote one until
 * this commit, so no student's stated preference is being overridden; what
 * changes is the fallback everyone was silently getting.
 *
 * The trade it accepts: Mixed must await medium and hard, so the first Mixed
 * quiz of a session can wait on ~376 kB gzip where an easy quiz could not. That
 * wait is shown rather than hidden — see startQuiz's 'starting' handling.
 */
export const DEFAULT_DIFFICULTY = MIXED

/**
 * Display labels for the levels. A LABEL TABLE, NOT A SECOND SOURCE OF THE SET:
 * membership and order both come from DIFFICULTIES below, and a level with no
 * label here falls back to its own id rather than rendering blank.
 */
const LEVEL_LABELS = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }

/**
 * The rows the difficulty picker offers, in display order.
 *
 * MIXED IS FIRST because it is the default and the broadest — a student who
 * opens the sheet and taps the top row gets the whole corpus, which is the
 * behaviour worth making easiest to reach.
 *
 * Only Mixed carries a description. The three levels are self-describing, and a
 * subtitle under each would mean either restating word counts — which live in
 * the data files and would be a fourth place to keep them correct — or writing
 * three lines that say nothing the label does not.
 */
export const DIFFICULTY_OPTIONS = [
  {
    id: MIXED,
    name: 'Mixed',
    description: 'Draws from all three levels'
  },
  ...VOCAB_LEVELS.map((level) => ({
    id: level,
    name: LEVEL_LABELS[level] ?? level,
    description: null
  }))
]

/** Whether a value is something a session can actually run at. */
export const isValidDifficulty = (value) =>
  value === MIXED || VOCAB_LEVELS.includes(value)

/**
 * Every startable mode.
 *
 * `datasets` is what must be RESOLVED, not merely requested, before
 * generateQuestions can produce anything for this mode. Getting it wrong is
 * silent: quiz-generation warns and returns [] for a missing database, which
 * is indistinguishable from "nothing available" at the call site.
 *
 * Smart Review requires ALL of them. Its pool holds bare identifier strings
 * with no record of which database they came from, and since step 8 an acronym
 * or a one-word substitute can enter it just as a vocabulary word can — so a
 * pool word is unresolvable until every database it might have come from is
 * present. Loading only vocabulary would make a pool of acronyms look empty.
 */
export const QUIZ_MODES = {
  vocab: {
    id: 'vocab',
    name: 'Vocabulary',
    description: 'Match words with their definitions',
    group: 'Words',
    takesDifficulty: true,
    datasets: [DATASET.VOCAB]
  },
  synonym: {
    id: 'synonym',
    name: 'Synonyms',
    description: 'Find words with similar meanings',
    group: 'Words',
    takesDifficulty: true,
    datasets: [DATASET.VOCAB]
  },
  antonym: {
    id: 'antonym',
    name: 'Antonyms',
    description: 'Find words with opposite meanings',
    group: 'Words',
    takesDifficulty: true,
    datasets: [DATASET.VOCAB]
  },
  oneword: {
    id: 'oneword',
    name: 'One-Word Substitutes',
    description: 'Replace phrases with single words',
    group: 'Expressions',
    takesDifficulty: false,
    datasets: [DATASET.ONEWORD]
  },
  acronym: {
    id: 'acronym',
    name: 'Acronyms',
    description: 'Expand common acronyms',
    group: 'Expressions',
    takesDifficulty: false,
    datasets: [DATASET.ACRONYMS]
  },
  review: {
    id: 'review',
    name: 'Smart Review',
    /* Dr. Bite's approved replacement for the live app's "AI-powered review of
       words you need to practice", which described SM-2 interval arithmetic as
       AI. Carried here from PracticeScreen rather than rewritten. */
    description: 'Revise the words you keep getting wrong.',
    group: 'Study',
    takesDifficulty: false,
    datasets: [DATASET.VOCAB, DATASET.ACRONYMS, DATASET.ONEWORD]
  }
}

/** Whether a mode id can be started at all. */
export const isStartableMode = (mode) => Object.hasOwn(QUIZ_MODES, mode)

/**
 * The heading shown while a session of this mode is running.
 * Matches getModeTitle at js/screens.js:901-915 for the five it covers.
 */
export const modeTitle = (mode) => QUIZ_MODES[mode]?.name ?? 'Quiz'

/**
 * The sentence put to the student for one question.
 *
 * DISPATCHES ON THE QUESTION FOR SMART REVIEW, ON THE MODE FOR THE REST. The
 * five single-shape modes always produce one shape, so the mode alone decides
 * the wording. Smart Review does not: its pool is cross-database, so one
 * session can mix a vocabulary word, an acronym and a one-word substitute, and
 * buildQuestionFromItem gives each the shape of its own kind. Wording a review
 * session by its mode would ask "What does X stand for?" of a vocabulary word.
 *
 * The vocabulary shape needs no stem — generateQuestions already writes the
 * full sentence into `question` (`What is the meaning of "X"?`), which is why
 * the live app's vocab branch returns currentQuestion.question untouched.
 *
 * @param {string} mode     Mode id
 * @param {Object} question A question from generateQuestions
 * @returns {string} The sentence to display
 */
export const questionTextFor = (mode, question) => {
  if (!question) return ''

  const text = question.question

  if (mode === 'review') {
    // Shape, not mode. wordData is the stored item the question was built from.
    if (question.wordData?.acronym) return `What does ${text} stand for?`
    if (question.wordData?.phrase) return `One word for: ${text}`
    return text
  }

  if (mode === 'synonym') return `Find a synonym for: ${text}`
  if (mode === 'antonym') return `Find an antonym for: ${text}`
  if (mode === 'oneword') return `One word for: ${text}`
  if (mode === 'acronym') return `What does ${text} stand for?`

  return text
}

/**
 * The modes grouped for the Practice tab, in display order.
 *
 * Derived from QUIZ_MODES rather than listed again, so a mode cannot appear in
 * one and not the other. Flashcards are not in QUIZ_MODES — they are not a
 * scored mode — so the Practice tab appends its own inert entry for them.
 */
export const MODE_GROUPS = ['Words', 'Expressions', 'Study'].map((heading) => ({
  heading,
  modes: Object.values(QUIZ_MODES).filter((m) => m.group === heading)
}))

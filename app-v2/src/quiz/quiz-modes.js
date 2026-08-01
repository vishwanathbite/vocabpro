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
 * IMPORTS NOTHING. It is a table; a launcher maps `datasets` onto loader
 * functions rather than this module reaching for them.
 *
 * DELIBERATELY ABSENT: flashcard, daily, bookmarks, idiom, idiom-reverse,
 * match. Flashcards are self-reported and never reach the scoring path; the
 * daily challenge builds its own questions in daily-challenge.js; the other
 * three are cut or unbuilt. A mode absent from this table cannot be started.
 */

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
 * The three levels a difficulty-taking mode can run at. Same three keys
 * vocabularyDB carries and loadVocabularyLevel accepts.
 */
export const DIFFICULTIES = ['easy', 'medium', 'hard']

/**
 * DEFAULT DIFFICULTY, and the reason there is one.
 *
 * The live app puts a difficulty modal between the tile and the quiz
 * (js/app.js:1241-1247). This commit does not build that modal — the tiles
 * start a session directly — so the three difficulty-taking modes need a level
 * to run at. 'easy' is chosen because it is the one chunk guaranteed loaded at
 * boot (loadInitialData), so those three modes start without waiting.
 *
 * The parameter is plumbed all the way through startQuiz regardless, so adding
 * the picker later means adding a screen and passing a value, not rewiring.
 */
export const DEFAULT_DIFFICULTY = 'easy'

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

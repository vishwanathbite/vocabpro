import { ROW } from '../components/chrome.js'
import { ChevronRight } from '../components/icons.jsx'

/**
 * Practice tab — the seven quiz modes, grouped.
 *
 * TILES ARE INERT. The quiz screens do not exist yet, so no tile carries an
 * onClick, exactly as Learn leaves its Start and Continue buttons. Wiring them
 * is a later step; a stubbed handler would look wired and read as a bug.
 *
 * Reads and writes nothing: no imports from src/logic/. Nothing on this screen
 * is derived from state, so there is no state to get wrong.
 *
 * CUT, deliberately absent: idioms, idioms-reverse and the Match game. All three
 * are cut decisions, not omissions.
 */

/* NO TILE IS PURPLE. The rule is one purple primary-action zone per screen
   state; Practice has no single primary action, so it has none at all. Seven
   equally-weighted choices with one highlighted would be a lie about priority.
   ROW is the shared neutral row — the same chrome Learn's "Continue practising"
   uses. It moved to components/chrome.js in step 7b. */

/**
 * Names and descriptions are the LIVE APP'S, taken from the QuizModeCard block
 * at js/screens.js:654-718, not newly written — with one exception, Smart
 * Review, noted at the site. A tile and the quiz screen it eventually opens have
 * to agree, and the quiz screens will be ported from the same source.
 *
 * The descriptions are NOT rendered as visible subtitles — the tiles are name
 * plus chevron and nothing else. They serve as the accessible names instead, so
 * a student on a screen reader hears what the mode does rather than just what it
 * is called. That is the one place the wording earns its keep without adding
 * chrome.
 */
const GROUPS = [
  {
    heading: 'Words',
    modes: [
      { id: 'vocab', name: 'Vocabulary', description: 'Match words with their definitions' },
      { id: 'synonym', name: 'Synonyms', description: 'Find words with similar meanings' },
      { id: 'antonym', name: 'Antonyms', description: 'Find words with opposite meanings' },
    ],
  },
  {
    heading: 'Expressions',
    modes: [
      {
        id: 'oneword',
        name: 'One-Word Substitutes',
        description: 'Replace phrases with single words',
      },
      { id: 'acronym', name: 'Acronyms', description: 'Expand common acronyms' },
    ],
  },
  {
    heading: 'Study',
    modes: [
      {
        id: 'flashcard',
        name: 'Flashcards',
        description: 'Flip cards to learn without pressure',
      },
      {
        id: 'review',
        name: 'Smart Review',
        /* NOT the live app's wording, and deliberately so. js/screens.js:718 read
           "AI-powered review of words you need to practice", which overstated it:
           the mode is SM-2 spaced repetition — interval arithmetic, no model,
           nothing that is AI. This is Dr. Bite's approved replacement. Carry this
           string into the Smart Review screen when it is ported, rather than
           taking the old one from js/. */
        description: 'Revise the words you keep getting wrong.',
      },
    ],
  },
]

export default function PracticeScreen() {
  return (
    <div className="flex flex-col gap-4">
      {/* The tab bar already says which screen this is, and Learn sets the
          precedent that the top line is orientation rather than a page title.
          So the heading exists for structure only — it gives the group headings
          below something to nest under for anyone navigating by heading. */}
      <h1 className="sr-only">Practice</h1>

      {GROUPS.map((group) => (
        <section key={group.heading} className="flex flex-col gap-2">
          {/* Same eyebrow treatment as Learn's "Word of the day" label. */}
          <h2 className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            {group.heading}
          </h2>

          {group.modes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              /* Trailing stop stripped before it is re-added, so a description
                 that already ends in one does not read out as two. */
              aria-label={`${mode.name}. ${mode.description.replace(/\.$/, '')}.`}
              className={ROW}
            >
              <span className="font-medium text-white">{mode.name}</span>
              <ChevronRight width="18" height="18" className="text-slate-400" />
            </button>
          ))}
        </section>
      ))}
    </div>
  )
}

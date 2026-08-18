import { useState } from 'react'
import { ROW } from '../components/chrome.js'
import { ChevronRight } from '../components/icons.jsx'
import { MODE_GROUPS, QUIZ_MODES } from '../quiz/quiz-modes.js'
import { QuizPreferences } from '../logic/settings.js'
import DifficultyPicker from '../quiz/DifficultyPicker.jsx'
import LaunchNotice from '../quiz/LaunchNotice.jsx'

/**
 * Practice tab — the seven quiz modes, grouped.
 *
 * ALL SEVEN TILES ARE LIVE as of step 14. Six start a scored quiz; Flashcards
 * start a self-reported card session through a different launcher, chosen by
 * `scored` in the mode table. This screen does not know the difference — it
 * reports the tap and the shell routes it.
 *
 * NAMES AND DESCRIPTIONS NOW COME FROM quiz/quiz-modes.js. They used to be a
 * local GROUPS table here, which was correct while nothing else needed them;
 * the quiz header needs the same strings, so keeping them here would have made
 * this the second copy. The wording is unchanged, Smart Review's approved
 * replacement line included.
 *
 * Reads nothing from storage and holds no state. Starting a quiz is entirely
 * the shell's business — this screen reports the tap and renders whatever the
 * shell hands back.
 *
 * CUT, deliberately absent: idioms, idioms-reverse and the Match game. All three
 * are cut decisions, not omissions.
 */

/* NO TILE IS PURPLE. The rule is one purple primary-action zone per screen
   state; Practice has no single primary action, so it has none at all. Seven
   equally-weighted choices with one highlighted would be a lie about priority.
   ROW is the shared neutral row — the same chrome Learn's "Continue practising"
   uses. It moved to components/chrome.js in step 7b. */

/* The flashcard tile was declared HERE until step 14 — a local object carrying
   its own copy of the name and description, appended to the Study group and
   marked inert, because flashcards were not in QUIZ_MODES. They are now, with
   `scored: false`, so the second copy is gone and this screen renders all seven
   tiles from one table. MODE_GROUPS already places it first in Study. */
const GROUPS = MODE_GROUPS

export default function PracticeScreen({ onStartQuiz, launch }) {
  /* Which mode's difficulty sheet is open, or null. The only state on this
     screen, and it is chrome — nothing about the session lives here. */
  const [pickerMode, setPickerMode] = useState(null)

  /* Read when the sheet opens rather than held for the whole mount: a stored
     preference can change under this screen (the sheet itself writes one), and
     re-reading on open is one storage read against a memoized state object. */
  const [remembered, setRemembered] = useState(null)

  const openPicker = (mode) => {
    setRemembered(QuizPreferences.getDifficulty(mode))
    setPickerMode(mode)
  }

  /* A tile either opens the sheet or launches, decided by the mode table so the
     two lists cannot drift apart. */
  const handleTile = (mode) => {
    if (QUIZ_MODES[mode]?.takesDifficulty) openPicker(mode)
    else onStartQuiz({ mode })
  }

  const handleSelect = (difficulty) => {
    const mode = pickerMode
    QuizPreferences.setDifficulty(mode, difficulty)
    setPickerMode(null)
    onStartQuiz({ mode, difficulty })
  }

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
          <h2 className="text-eyebrow font-semibold tracking-wider text-slate-400 uppercase">
            {group.heading}
          </h2>

          {group.modes.map((mode) => (
            <div key={mode.id} className="flex flex-col gap-2">
              <button
                type="button"
                /* Trailing stop stripped before it is re-added, so a description
                   that already ends in one does not read out as two. */
                aria-label={`${mode.name}. ${mode.description.replace(/\.$/, '')}.`}
                /* No inert tiles left as of step 14 — all seven start a
                   session. Flashcards route to a different launcher, but that
                   decision belongs to the shell, not to this tile. */
                onClick={() => handleTile(mode.id)}
                className={ROW}
              >
                <span className="font-medium text-white">{mode.name}</span>
                <ChevronRight width="18" height="18" className="text-slate-400" />
              </button>

              <LaunchNotice launch={launch} mode={mode.id} />
            </div>
          ))}
        </section>
      ))}

      <DifficultyPicker
        mode={pickerMode}
        remembered={remembered}
        onSelect={handleSelect}
        onClose={() => setPickerMode(null)}
      />
    </div>
  )
}

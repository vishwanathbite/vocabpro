import { useState } from 'react'
import { CARD } from '../components/chrome.js'
import { ArrowLeft, Check } from '../components/icons.jsx'
import { SettingsManager } from '../logic/settings.js'
import { SoundManager } from '../logic/sound.js'
import { DailyGoalsManager, DAILY_GOAL_PRESET_LIST } from '../logic/dailygoals.js'
import { FONT_SIZES, applyFontSize } from '../logic/appearance.js'
import { speakWord } from '../logic/speech.js'

/**
 * The four settings that do something.
 *
 * FOUR, NOT ELEVEN. The stored blob carries eleven keys and this screen offers
 * four of them. The others fall into two groups, and neither is an oversight:
 *
 *   FEATURES, NOT TOGGLES — auto-play pronunciation, haptics, notifications.
 *     None has a mechanism behind it in either tree: nothing auto-plays,
 *     nothing calls navigator.vibrate anywhere in app-v2 OR js/, and
 *     notifications need a push server that does not exist. A switch that
 *     writes a field nothing reads is worse than no switch — it tells the
 *     student they changed something. They ship with the features, in v1.1.
 *
 *   DECIDED, NOT OFFERED — dark mode (the app is always dark), keyboard
 *     shortcuts (this is a phone app; the three readers keep working on their
 *     default of true), word of the day and daily goals (both always on).
 *
 * THE FIELDS FOR ALL SEVEN STAY IN STORAGE. js/ shares STORAGE_KEY and reads
 * showWordOfDay and showDailyGoals at seven sites each, so deleting them would
 * change what the shipping app draws for anyone running both builds. Removing
 * the CONTROL is this commit; removing the FIELD is a Phase 6 migration.
 *
 * WRITES ARE IMMEDIATE AND INDIVIDUAL. No Save button: every control persists on
 * change through the manager that owns it, so there is no draft state to lose
 * and no way for the screen and the store to disagree.
 */

/* Reused by all three rows that need one. A switch rather than a checkbox
   because the state IS the value — nothing is submitted — and `role="switch"`
   with aria-checked is what tells assistive technology that. */
function Toggle({ label, description, checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`${CARD} min-touch flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-white/[0.06]`}
    >
      <span className="min-w-0">
        <span className="block font-medium text-white">{label}</span>
        {description && <span className="mt-0.5 block text-sm text-slate-400">{description}</span>}
      </span>

      {/* Presentational: the button above carries the role and the state. */}
      <span
        aria-hidden="true"
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-white/15'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
    </button>
  )
}

/* One selectable row. Same shape as Learn's goal sheet rows, which is
   deliberate — the same four presets appear in both places. */
function ChoiceRow({ label, sublabel, current, onSelect }) {
  return (
    <button
      type="button"
      aria-current={current ? 'true' : undefined}
      onClick={onSelect}
      className={`min-touch flex w-full items-center justify-between rounded-lg border px-4 text-left transition-colors ${
        current ? 'border-primary bg-primary/10' : 'border-white/10 hover:bg-white/[0.06]'
      }`}
    >
      <span>
        <span className="block font-medium text-white">{label}</span>
        {sublabel && <span className="block text-xs text-slate-400 tabular-nums">{sublabel}</span>}
      </span>
      {current && <Check width="18" height="18" className="text-primary" />}
    </button>
  )
}

const FONT_SIZE_LABELS = { small: 'Small', medium: 'Medium', large: 'Large' }

/**
 * @param {Function} onBack Return to the More tab
 */
export default function SettingsScreen({ onBack }) {
  /* Lazy initialisers, read once per mount. Nothing else in the app can change
     these while Settings is the visible screen, so no subscription is needed —
     the same reasoning every other screen's reads carry. */
  const [soundEnabled, setSoundEnabled] = useState(() => SoundManager.isEnabled())
  const [speechEnabled, setSpeechEnabled] = useState(() => SettingsManager.get('speechEnabled'))
  const [fontSize, setFontSize] = useState(() => SettingsManager.get('fontSize'))

  /* Null for a custom goal, which is not one of the four — the same rule
     LearnScreen's readGoalPresetId applies, and for the same reason: a wrong
     highlight tells the student their goal is something it is not. */
  const [goalPreset, setGoalPreset] = useState(() => {
    const data = DailyGoalsManager.loadData()
    return data.customGoal ? null : data.goalPreset
  })

  /* THROUGH SoundManager, NOT SettingsManager.set. toggle() flips the in-memory
     flag every play() checks AND persists via SettingsManager — writing the
     setting directly would leave the audible state stale until the next reload,
     which is the exact bug sound.js:71-76 records having fixed. */
  const onSound = () => {
    setSoundEnabled(SoundManager.toggle())
  }

  const onSpeech = (next) => {
    SettingsManager.set('speechEnabled', next)
    setSpeechEnabled(next)
    /* Speak on the way ON only, and only the word "Pronunciation" — turning a
       thing on is the moment a student wants to hear that it works, and doing it
       on the way off would talk over the decision to silence it. speakWord now
       gates on the setting, and this runs after the write, so it is honoured. */
    if (next) speakWord('Pronunciation')
  }

  const onFontSize = (size) => {
    SettingsManager.set('fontSize', size)
    /* Applied to the document immediately, so the choice is visible in the row
       that made it rather than at the next reload. */
    applyFontSize(size)
    setFontSize(size)
  }

  /* Through the manager, which also re-settles today's completion against the
     new target — see setGoalPreset. Writing settings.dailyGoalPreset instead
     would be the shadow copy SettingsManager.set already redirects away from. */
  const onGoalPreset = (id) => {
    DailyGoalsManager.setGoalPreset(id)
    setGoalPreset(id)
  }

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="min-touch -ml-2 flex items-center gap-2 rounded-lg px-2 text-slate-400 transition-colors hover:text-slate-200"
        >
          <ArrowLeft width="20" height="20" />
          <span className="text-sm font-medium">More</span>
        </button>
      </header>

      <h1 className="font-playfair text-2xl leading-tight font-bold text-white">Settings</h1>

      {/* --- SOUND AND SPEECH --------------------------------------------- */}
      <section className="flex flex-col gap-2">
        <h2 className="text-eyebrow font-semibold tracking-wider text-slate-400 uppercase">
          Sound
        </h2>

        <Toggle
          label="Sound effects"
          description="Correct and incorrect answer tones, badges and level-ups"
          checked={soundEnabled}
          onChange={onSound}
        />

        <Toggle
          label="Pronunciation"
          description="Read words aloud when you tap Pronounce"
          checked={speechEnabled}
          onChange={onSpeech}
        />
      </section>

      {/* --- DAILY GOAL ---------------------------------------------------- */}
      <section className="flex flex-col gap-2">
        <h2 className="text-eyebrow font-semibold tracking-wider text-slate-400 uppercase">
          Daily goal
        </h2>
        <p className="text-sm text-slate-400">
          How many questions a day keeps your streak alive.
        </p>

        {DAILY_GOAL_PRESET_LIST.map((preset) => (
          <ChoiceRow
            key={preset.id}
            label={preset.shortName}
            sublabel={`${preset.questions} questions`}
            current={preset.id === goalPreset}
            onSelect={() => onGoalPreset(preset.id)}
          />
        ))}

        {/* Shown only for a stored custom goal, which no app-v2 control can
            create — js/ can. Without this the section would highlight nothing
            and look broken to the one student it applies to. */}
        {goalPreset === null && (
          <p className="text-sm text-slate-500">
            You have a custom goal set. Choosing a preset above will replace it.
          </p>
        )}
      </section>

      {/* --- FONT SIZE ------------------------------------------------------ */}
      <section className="flex flex-col gap-2">
        <h2 className="text-eyebrow font-semibold tracking-wider text-slate-400 uppercase">
          Text size
        </h2>
        <p className="text-sm text-slate-400">Applies everywhere in the app.</p>

        {FONT_SIZES.map((size) => (
          <ChoiceRow
            key={size}
            label={FONT_SIZE_LABELS[size]}
            current={size === fontSize}
            onSelect={() => onFontSize(size)}
          />
        ))}
      </section>
    </div>
  )
}

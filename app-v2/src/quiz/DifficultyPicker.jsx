import BottomSheet from '../components/BottomSheet.jsx'
import { Check } from '../components/icons.jsx'
import { DIFFICULTY_OPTIONS, DEFAULT_DIFFICULTY, QUIZ_MODES } from './quiz-modes.js'

/**
 * The difficulty sheet for the three modes that take one.
 *
 * Opens when Vocabulary, Synonyms or Antonyms is tapped. One-Word, Acronyms and
 * Smart Review have no difficulty and launch directly, exactly as before —
 * `takesDifficulty` in QUIZ_MODES decides which is which, so the two lists
 * cannot drift.
 *
 * WHAT IS SHOWN AS CURRENT is the remembered choice if there is one, and
 * DEFAULT_DIFFICULTY if there is not. That is a deliberate difference from
 * LearnScreen's goal sheet, which highlights nothing when it cannot identify
 * the stored preset: there, a wrong highlight would tell the user their goal is
 * something it is not. Here every option is a valid thing to tap and one of
 * them WILL be used on launch, so showing which is honest rather than a guess —
 * a student who taps the tile without opening the sheet gets exactly the row
 * marked here.
 *
 * SELECTING WRITES, THEN LAUNCHES. The write is unconditional, including when
 * the tapped row is already current: rewriting the same value is a no-op in
 * storage, and making the write conditional would leave the default unrecorded
 * forever, so a later change to DEFAULT_DIFFICULTY would silently move every
 * student who had actively chosen the old default.
 */
export default function DifficultyPicker({ mode, remembered, onSelect, onClose }) {
  const isOpen = Boolean(mode)
  const current = remembered ?? DEFAULT_DIFFICULTY

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={mode ? `${QUIZ_MODES[mode]?.name ?? 'Quiz'} difficulty` : 'Difficulty'}
    >
      <div className="flex flex-col gap-2">
        {DIFFICULTY_OPTIONS.map((option) => {
          const isCurrent = option.id === current

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              aria-current={isCurrent ? 'true' : undefined}
              className={`min-touch flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-2 text-left transition-colors ${
                isCurrent
                  ? 'border-primary bg-primary/10'
                  : 'border-white/10 hover:bg-white/[0.06]'
              }`}
            >
              <span>
                <span className="block font-medium text-white">{option.name}</span>
                {option.description && (
                  <span className="block text-xs text-slate-400">{option.description}</span>
                )}
                {/* Plain text for now — the visual treatment is a later pass.
                    Its own line rather than appended to the description, since
                    only Mixed has a description and the three levels would
                    otherwise have the price as their whole subtitle in one
                    style and Mixed's in another. */}
                {option.points && (
                  <span className="block text-xs text-slate-400 tabular-nums">{option.points}</span>
                )}
              </span>
              {isCurrent && <Check width="18" height="18" className="shrink-0 text-primary" />}
            </button>
          )
        })}
      </div>
    </BottomSheet>
  )
}

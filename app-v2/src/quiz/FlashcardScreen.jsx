import { useEffect, useRef } from 'react'
import { ArrowLeft, Check, Volume2, X } from '../components/icons.jsx'
import { KeyboardShortcuts } from '../logic/settings.js'
import { speakWord } from '../logic/speech.js'

/**
 * The flashcard session screen.
 *
 * PRESENTATIONAL, like QuizScreen: every value arrives as a prop and every
 * action is a prop callback. Session state belongs to useFlashcardSession.
 *
 * THE FLIP USES THE UTILITIES THAT WERE ALREADY THERE. index.css defines
 * `perspective-1000` and notes it exists for exactly this; `backface-hidden`
 * and `rotate-y-180` are Tailwind v4 core and were deliberately NOT redefined
 * when the design system was written, because core's rotate-y composes through
 * a shared transform chain that a hard-coded override would break. So this
 * screen adds no CSS.
 *
 * BEHAVIOUR IS THE LIVE APP'S, layout is not. Reproduced exactly: the front
 * shows the word and a pronounce control, the card flips on tap or Enter/Space,
 * the back shows the stored fields, two buttons rate the card, and the session
 * runs strictly forward with no way back to a card already rated.
 */

/* The back of the card, labelled. DISPATCHES ON SHAPE rather than mode, the
   same rule QuizScreen's detailRows follows — flashcards draw from vocabulary
   today, but a card is rendered from its stored item and the labels should
   follow the item rather than an assumption about where it came from.

   Labels are the live app's, verbatim (js/screens.js:1263-1291). */
const backRows = (card) => {
  if (!card) return []

  return [
    ['Definition', card.definition],
    ['Full Form', card.full],
    ['Phrase', card.phrase],
    ['Example', card.example]
  ].filter(([, value]) => value)
}

/* What the card's word IS, for display and for speech. `word || acronym ||
   answer` is the live app's resolver (js/screens.js:1238).

   NOT REUSED ELSEWHERE: Smart Review's pool is cross-database and resolves
   identity as `word || acronym || phrase || idiom`, which is a different list
   for a different job. Flashcards serve vocabulary only, so the other two arms
   here are dead today and kept only because the stored shapes allow them. */
const cardWord = (card) => card?.word || card?.acronym || card?.answer || ''

export default function FlashcardScreen({
  cards,
  currentCard,
  currentIndex,
  isFlipped,
  known,
  unknown,
  keyboardEnabled,
  onFlip,
  onRate,
  onExit
}) {
  /**
   * Take focus on mount, for the reason QuizScreen's heading does: the launch
   * sheet that started this session has just been unmounted with the whole tab
   * tree, so focus has fallen to <body> at the moment the screen changed.
   *
   * The CARD rather than a heading, because the card is both the content and
   * the primary control here — it is what the student reads and what they press
   * to flip.
   */
  const cardRef = useRef(null)
  useEffect(() => {
    cardRef.current?.focus()
  }, [])

  /* Keyboard, read from the shared table rather than restated — the same
     discipline QuizScreen uses, and the same reason: the Settings screen
     displays these bindings, so writing them out again here would be a second
     copy of a table the user can already see.

     NO DEPENDENCY ARRAY, deliberately, exactly as QuizScreen. The handler
     closes over the current card and three callbacks; a dependency list that
     misses one leaves a listener rating a card that is no longer on screen. */
  useEffect(() => {
    if (!keyboardEnabled) return

    const onKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      const shortcut = KeyboardShortcuts.flashcard[e.key]
      if (!shortcut) return

      if (shortcut.action === 'flip') {
        e.preventDefault()
        onFlip()
        return
      }

      if (shortcut.action === 'know') {
        e.preventDefault()
        onRate(true)
        return
      }

      if (shortcut.action === 'dontKnow') {
        e.preventDefault()
        onRate(false)
        return
      }

      if (shortcut.action === 'pronounce') {
        const word = cardWord(currentCard)
        if (!word) return
        e.preventDefault()
        speakWord(word)
        return
      }

      if (shortcut.action === 'back') {
        e.preventDefault()
        onExit()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  if (!currentCard) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy px-4">
        {/* Live app's string, verbatim (js/screens.js:1165). */}
        <p role="status" className="text-sm text-slate-400">
          Loading flashcards...
        </p>
      </div>
    )
  }

  const total = cards.length
  const progress = ((currentIndex + 1) / total) * 100
  const word = cardWord(currentCard)
  const rows = backRows(currentCard)

  return (
    <div className="min-h-screen bg-navy">
      {/* --- HEADER --------------------------------------------------------
          The two counters are the live app's, in the same order and with the
          same aria wording. No score, because there is none. */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy">
        <div className="mx-auto w-full max-w-content px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onExit}
              aria-label="Exit flashcard session"
              className="min-touch -ml-2 flex items-center gap-2 rounded-lg px-2 text-slate-400 transition-colors hover:text-slate-200"
            >
              <ArrowLeft width="20" height="20" />
              <span className="text-sm font-medium">Exit</span>
            </button>

            <div className="flex items-center gap-3">
              <span
                aria-label={`${known} cards known`}
                className="flex items-center gap-1.5 text-sm font-semibold text-correct tabular-nums"
              >
                <Check width="16" height="16" aria-hidden="true" />
                {known}
              </span>
              <span
                aria-label={`${unknown} cards still learning`}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 tabular-nums"
              >
                <X width="16" height="16" aria-hidden="true" />
                {unknown}
              </span>
            </div>
          </div>

          <div className="mt-3">
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium text-slate-300">Flashcards</span>
              <span className="text-xs text-slate-400 tabular-nums">
                {currentIndex + 1} of {total}
              </span>
            </div>
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-valuenow={currentIndex + 1}
              aria-valuemin={1}
              aria-valuemax={total}
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out motion-reduce:transition-none"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-content px-4 pt-6 pb-12">
        {/* --- CARD ---------------------------------------------------------
            KEYED ON THE INDEX, which is what removes js/'s 200ms timer. The
            outgoing card unmounts and the incoming one mounts already
            unflipped, so the flip cannot be seen resetting — no deferral, and
            nothing holding session state in a callback that could outlive the
            subtree. */}
        <div
          key={currentIndex}
          ref={cardRef}
          onClick={onFlip}
          onKeyDown={(e) => {
            /* The card is a focusable region rather than a button, so Enter and
               Space have to be handled for it explicitly. The window listener
               above would also see these; both call the same onFlip, so this
               one stops the event to keep it to a single flip. */
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              e.stopPropagation()
              onFlip()
            }
          }}
          role="region"
          /* Live app's aria wording, verbatim (js/screens.js:1214). */
          aria-label={
            isFlipped
              ? 'Flashcard — showing definition. Press Enter to flip back to word.'
              : 'Flashcard — showing word. Press Enter to flip and see definition.'
          }
          tabIndex={0}
          className="perspective-1000 min-h-[20rem] w-full cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div
            className={`relative min-h-[20rem] w-full rounded-2xl border border-white/10 bg-white/[0.03] transition-transform duration-500 ease-out motion-reduce:transition-none ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* FRONT */}
            <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
              <p className="text-eyebrow font-semibold tracking-wider text-slate-400 uppercase">
                TAP TO FLIP
              </p>
              <h1 className="font-playfair text-3xl leading-tight font-bold text-white">{word}</h1>
              {currentCard.pronunciation && (
                <p className="text-sm text-slate-400 italic">{currentCard.pronunciation}</p>
              )}
              <button
                type="button"
                onClick={(e) => {
                  // The card behind this is the flip target, so a tap on the
                  // speaker must not also turn the card over.
                  e.stopPropagation()
                  speakWord(word)
                }}
                aria-label="Listen to pronunciation"
                className="min-touch mt-1 flex items-center justify-center rounded-lg px-2 text-slate-400 transition-colors hover:text-slate-200"
              >
                <Volume2 width="22" height="22" />
              </button>
            </div>

            {/* BACK — pre-rotated so it reads correctly once the card turns. */}
            <div
              className="backface-hidden absolute inset-0 flex flex-col justify-center gap-3 overflow-y-auto p-8"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <dl className="space-y-3 text-left">
                {rows.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-eyebrow font-semibold tracking-wider text-slate-400 uppercase">
                      {label}
                    </dt>
                    <dd className={label === 'Example' ? 'text-sm text-slate-300 italic' : 'text-white'}>
                      {label === 'Example' ? `"${value}"` : value}
                    </dd>
                  </div>
                ))}
              </dl>
              {currentCard.mnemonic && (
                <p className="border-t border-white/10 pt-3 text-sm text-sky-200">
                  💡 {currentCard.mnemonic}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* --- RATING -------------------------------------------------------
            NEITHER IS PURPLE. Both are equally legitimate answers about your
            own recall, and highlighting one would push the student toward it —
            which, in a mode where nothing is checked, is a nudge to lie. */}
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => onRate(false)}
            aria-label="Still learning — mark card for review"
            className="min-touch flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 font-semibold text-white transition-colors hover:bg-white/[0.06]"
          >
            <X width="20" height="20" aria-hidden="true" />
            <span>Still Learning</span>
          </button>
          <button
            type="button"
            onClick={() => onRate(true)}
            aria-label="Got it — mark card as known"
            className="min-touch flex flex-1 items-center justify-center gap-2 rounded-xl border border-correct/40 bg-correct/10 px-4 font-semibold text-correct transition-colors hover:bg-correct/20"
          >
            <Check width="20" height="20" aria-hidden="true" />
            <span>Got It!</span>
          </button>
        </div>

        {/* Live app's hint, verbatim (js/screens.js:1323). */}
        <p className="mt-6 text-center text-sm text-slate-500">Tap the card to reveal the answer</p>
      </main>
    </div>
  )
}

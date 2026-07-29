import { useState } from 'react'
import BottomSheet from '../components/BottomSheet.jsx'
import { Flame, Shield, ChevronRight, Check } from '../components/icons.jsx'

/* ===========================================================================
   PLACEHOLDER DATA — REPLACE IN STEP 4b
   ---------------------------------------------------------------------------
   Every value the Learn screen renders comes from this one object. Step 4b
   swaps it for real reads from src/logic/ (storage, dailygoals, srs,
   word-of-day, daily-challenge). Nothing from src/logic/ is imported yet, by
   design: design iteration must not be able to break state.
   =========================================================================== */
const PLACEHOLDER = {
  greeting: 'Good morning',

  streak: 12,
  shields: 2,
  nextShieldInDays: 3,

  challengeScore: 8,
  challengeTotal: 10,
  challengeQuestions: 10,

  goalDone: 18,
  goalTarget: 25,
  goalPresetId: 'regular',

  reviewDue: 14,

  word: {
    word: 'Ephemeral',
    definition: 'Lasting for a very short time.',
    example: 'The ephemeral beauty of cherry blossoms draws crowds each spring.',
  },
}

const GOAL_PRESETS = [
  { id: 'casual', name: 'Casual', questions: 10, points: 100 },
  { id: 'regular', name: 'Regular', questions: 25, points: 250 },
  { id: 'serious', name: 'Serious', questions: 50, points: 500 },
  { id: 'intense', name: 'Intense', questions: 100, points: 1000 },
]

/* Shared chrome: hairline border on navy, no coloured fill. */
const CARD = 'rounded-xl border border-white/10 bg-white/[0.03]'

export default function LearnScreen() {
  const [sheet, setSheet] = useState(null) // 'streak' | 'goal' | 'word' | null

  /* DEV TOGGLES — THROWAWAY, REMOVED IN STEP 4b.
     Present only so both challenge states and both Smart Review states can be
     reviewed without wiring real data. */
  const [challengeDone, setChallengeDone] = useState(false)
  const [hasReviewDue, setHasReviewDue] = useState(true)
  const [zeroState, setZeroState] = useState(false)

  /* zeroState swaps in streak 0 / shields 0 so the muted icon treatment is
     reviewable. Throwaway alongside the toggles above. */
  const d = zeroState ? { ...PLACEHOLDER, streak: 0, shields: 0 } : PLACEHOLDER

  const goalPct = Math.min(100, Math.round((d.goalDone / d.goalTarget) * 100))
  const currentPreset = GOAL_PRESETS.find((p) => p.id === d.goalPresetId)

  return (
    <div className="flex flex-col gap-4">
      {/* ---------------------------------------------------------------
          DEV TOGGLE — THROWAWAY, DELETE IN STEP 4b
          --------------------------------------------------------------- */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-dashed border-amber-400/40 px-2 py-1.5">
        <span className="text-[10px] font-semibold text-amber-400/80 uppercase">dev</span>
        <button
          type="button"
          onClick={() => setChallengeDone((v) => !v)}
          className="rounded border border-white/15 px-2 py-0.5 text-[11px] text-slate-300"
        >
          chal: {challengeDone ? 'done' : 'open'}
        </button>
        <button
          type="button"
          onClick={() => setHasReviewDue((v) => !v)}
          className="rounded border border-white/15 px-2 py-0.5 text-[11px] text-slate-300"
        >
          due: {hasReviewDue ? d.reviewDue : 0}
        </button>
        <button
          type="button"
          onClick={() => setZeroState((v) => !v)}
          className="rounded border border-white/15 px-2 py-0.5 text-[11px] text-slate-300"
        >
          {d.streak}/{d.shields}
        </button>
      </div>

      {/* --- 1. HEADER ------------------------------------------------- */}
      <header className="flex items-center justify-between gap-3">
        {/* Subtle by design: the greeting is orientation, not a page title.
            Matched in size and weight to the streak group opposite it so the
            header reads as one quiet row and the purple card leads. */}
        <h1 className="text-sm font-medium text-slate-400">{d.greeting}</h1>

        <button
          type="button"
          onClick={() => setSheet('streak')}
          aria-label={`${d.streak} day streak, ${d.shields} shields. View details.`}
          className="min-touch -mr-2 flex items-center gap-3 rounded-lg px-2 text-slate-400 transition-colors hover:text-slate-200"
        >
          {/* Icons are 17px so they read as objects rather than punctuation;
              the numbers stay at 14px. Flat fills only — no gradient, glow or
              shadow. Colour carries meaning: it appears only when the value is
              above zero, and drops to muted slate when it is not. */}
          <span className="flex items-center gap-1.5">
            <Flame
              width="17"
              height="17"
              className={d.streak > 0 ? 'text-amber-400' : 'text-slate-500'}
            />
            <span className="text-sm font-medium tabular-nums">{d.streak}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Shield
              width="17"
              height="17"
              className={d.shields > 0 ? 'text-sky-400' : 'text-slate-500'}
            />
            <span className="text-sm font-medium tabular-nums">{d.shields}</span>
          </span>
        </button>
      </header>

      {/* --- 2 + 3. PRIMARY CARD AND CONTINUE --------------------------
          Exactly one purple fill in either state.
          State A: challenge is the purple card, Continue is outlined below.
          State B: challenge collapses to a slim row, Continue becomes purple.
          --------------------------------------------------------------- */}
      {!challengeDone ? (
        <>
          <section className="rounded-xl bg-primary p-4">
            <p className="text-xs font-semibold tracking-wider text-white/70 uppercase">
              Today&rsquo;s challenge
            </p>
            <p className="mt-1 text-lg font-semibold text-white">
              {d.challengeQuestions} questions
            </p>
            <button
              type="button"
              className="min-touch mt-3 w-full rounded-lg bg-white px-4 font-semibold text-primary transition-opacity hover:opacity-90"
            >
              Start
            </button>
          </section>

          <button
            type="button"
            className={`${CARD} min-touch flex w-full items-center justify-between px-4 text-left transition-colors hover:bg-white/[0.06]`}
          >
            <span className="font-medium text-white">Continue practising</span>
            <ChevronRight width="18" height="18" className="text-slate-400" />
          </button>
        </>
      ) : (
        <>
          <div className={`${CARD} flex items-center gap-2.5 px-4 py-3`}>
            <Check width="16" height="16" className="shrink-0 text-emerald-400" />
            <span className="text-sm text-slate-300">Today&rsquo;s challenge done</span>
            <span className="ml-auto text-sm font-semibold text-white tabular-nums">
              {d.challengeScore} / {d.challengeTotal}
            </span>
          </div>

          <button
            type="button"
            className="min-touch flex w-full items-center justify-between rounded-xl bg-primary px-4 text-left transition-opacity hover:opacity-90"
          >
            <span className="font-semibold text-white">Continue practising</span>
            <ChevronRight width="18" height="18" className="text-white/80" />
          </button>
        </>
      )}

      {/* --- 4. DAILY GOAL --------------------------------------------- */}
      <button
        type="button"
        onClick={() => setSheet('goal')}
        aria-label={`Daily goal, ${d.goalDone} of ${d.goalTarget} questions. View goal settings.`}
        className="min-touch flex w-full flex-col justify-center gap-2 rounded-lg px-1 text-left transition-colors hover:bg-white/[0.03]"
      >
        <span className="flex items-baseline justify-between">
          <span className="text-sm font-medium text-slate-300">Daily goal</span>
          <span className="text-sm text-slate-400 tabular-nums">
            {d.goalDone} / {d.goalTarget}
          </span>
        </span>
        <span
          className="block h-1.5 w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={d.goalDone}
          aria-valuemin={0}
          aria-valuemax={d.goalTarget}
        >
          {/* Purple fill. The rule is exactly one purple-filled TAPPABLE
              surface per state, and a progress bar is feedback rather than
              something you tap expecting a response — the button here is the
              row, and the row itself is not purple-filled. */}
          <span className="block h-full rounded-full bg-primary" style={{ width: `${goalPct}%` }} />
        </span>
      </button>

      {/* --- 5. SMART REVIEW — conditional ----------------------------- */}
      {hasReviewDue && d.reviewDue > 0 && (
        <button
          type="button"
          className={`${CARD} min-touch flex w-full items-center justify-between px-4 text-left transition-colors hover:bg-white/[0.06]`}
        >
          <span className="text-sm text-slate-300">
            <span className="font-semibold text-white tabular-nums">{d.reviewDue}</span> words due
          </span>
          <ChevronRight width="18" height="18" className="text-slate-400" />
        </button>
      )}

      {/* --- 6. WORD OF THE DAY — the editorial moment ----------------- */}
      <button
        type="button"
        onClick={() => setSheet('word')}
        className={`${CARD} min-touch mt-1 w-full px-4 py-3 text-left transition-colors hover:bg-white/[0.06]`}
      >
        <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          Word of the day
        </span>
        <span className="mt-1 block font-playfair text-2xl leading-tight font-bold text-white">
          {d.word.word}
        </span>
        <span className="mt-0.5 block text-sm text-slate-400">{d.word.definition}</span>
      </button>

      {/* --- SHEETS ----------------------------------------------------- */}
      <BottomSheet isOpen={sheet === 'streak'} onClose={() => setSheet(null)} title="Your streak">
        <div className="space-y-4 text-sm text-slate-300">
          <p>
            <span className="font-semibold text-white tabular-nums">{d.streak} days</span> in a row.
            Your streak counts consecutive days on which you met your daily goal — whichever preset
            you have set.
          </p>
          <div className="border-t border-white/10 pt-4">
            <p className="mb-1 flex items-center gap-2 font-semibold text-white">
              <Shield width="16" height="16" className="text-slate-400" />
              {d.shields} shields
            </p>
            <p>
              If you miss your goal, a shield is spent automatically to bridge the gap and keep the
              streak going.
            </p>
            <p className="mt-2">
              A shield is only spent when it can cover the whole gap. Miss three days holding two
              shields and nothing is spent — the streak resets and you keep the shields.
            </p>
            <p className="mt-2 text-slate-400">
              You earn one shield for every seven consecutive days you keep the streak, up to a
              maximum of 3. Next in {d.nextShieldInDays} days.
            </p>
          </div>
        </div>
      </BottomSheet>

      <BottomSheet isOpen={sheet === 'goal'} onClose={() => setSheet(null)} title="Daily goal">
        <div className="space-y-2">
          <p className="text-sm text-slate-400">
            {d.goalDone} of {d.goalTarget} questions today.
          </p>
          <p className="mb-3 text-sm text-slate-400">
            Meeting this goal each day is what keeps your streak alive.
          </p>
          {GOAL_PRESETS.map((p) => {
            const isCurrent = p.id === d.goalPresetId
            return (
              <button
                key={p.id}
                type="button"
                aria-current={isCurrent ? 'true' : undefined}
                className={`min-touch flex w-full items-center justify-between rounded-lg border px-4 text-left transition-colors ${
                  isCurrent ? 'border-primary bg-primary/10' : 'border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                <span>
                  <span className="block font-medium text-white">{p.name}</span>
                  <span className="block text-xs text-slate-400 tabular-nums">
                    {p.questions} questions &middot; {p.points} points
                  </span>
                </span>
                {isCurrent && <Check width="18" height="18" className="text-primary" />}
              </button>
            )
          })}
          <p className="pt-2 text-xs text-slate-500">
            Currently set to {currentPreset.name}. Selection is wired up in a later step.
          </p>
        </div>
      </BottomSheet>

      <BottomSheet isOpen={sheet === 'word'} onClose={() => setSheet(null)} title="Word of the day">
        <div className="space-y-3">
          <p className="font-playfair text-3xl leading-tight font-bold text-white">{d.word.word}</p>
          <p className="text-sm text-slate-300">{d.word.definition}</p>
          <p className="border-t border-white/10 pt-3 text-sm text-slate-400 italic">
            {d.word.example}
          </p>
        </div>
      </BottomSheet>
    </div>
  )
}

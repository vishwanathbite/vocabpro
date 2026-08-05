import { useEffect, useMemo, useState } from 'react'
import BottomSheet from '../components/BottomSheet.jsx'
import { CARD, ROW } from '../components/chrome.js'
import { Flame, Shield, ChevronRight, Check } from '../components/icons.jsx'
import { DailyGoalsManager } from '../logic/dailygoals.js'
import { StatsManager, StreakProtection, awardWeeklyShieldIfDue } from '../logic/gamification.js'
import { DailyChallengeManager } from '../logic/daily-challenge.js'
import { pluralise, plural } from '../logic/format.js'
import { getWordOfTheDay } from '../logic/word-of-day.js'
import LaunchNotice from '../quiz/LaunchNotice.jsx'

/* Short names, deliberately not the stored ones. DAILY_GOAL_PRESETS in
   dailygoals.js calls these "Casual Learner", "Regular Practice", "Serious
   Study" and "Intense Training"; the screen shows the short forms. Matching is
   therefore on id only — never on name. The question counts are identical in
   both tables.

   The points field is gone from both, together. It used to be here as well, and
   the goal no longer completes on points, so carrying the number would mean
   this table stating a target dailygoals.js does not hold. */
const GOAL_PRESETS = [
  { id: 'casual', name: 'Casual', questions: 10 },
  { id: 'regular', name: 'Regular', questions: 25 },
  { id: 'serious', name: 'Serious', questions: 50 },
  { id: 'intense', name: 'Intense', questions: 100 },
]

/* SECOND SOURCE OF TRUTH — reconcile when the challenge screen is built.
   daily-challenge.js exports no question count. generateQuestions derives its
   own from three inline seededSample calls — 4 easy, 3 medium, 3 hard
   (daily-challenge.js:274-276) — so the only way to read the real number is to
   generate the questions, which is far too much work for a card that just
   announces it. The two will drift if that split changes; the fix is to export
   the count from daily-challenge.js, or derive both from one table.

   The real length can also come out BELOW this. seededSample returns fewer
   than asked when a pool is short, and AppShell paints on easy alone while
   medium and hard load in the background, so a challenge started early yields
   4 questions rather than 10. That belongs to the Start handler, which this
   step does not wire. */
const CHALLENGE_QUESTIONS = 10

/* pluralise/plural were declared here and MOVED to logic/format.js in step 13,
   when the results screen became the second screen counting words. Same two
   function bodies, imported rather than restated; see the note there. */

/* DEVICE-LOCAL, not IST. The IST boundary is a correctness rule for the daily
   challenge and the streak — everyone must get the same challenge on the same
   day. A greeting is the opposite: it describes the reader's own time of day,
   so a student in London at 08:00 should read "Good morning" even though it is
   already afternoon in IST. */
const greetingFor = (hour) => {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

/* Which preset row to highlight, or null for none.
   getGoal() returns {questions, points, name} with no id, so the id has to come
   from the stored value underneath it. Two cases highlight nothing rather than
   guessing:
     - a custom goal is genuinely not one of the four, so no row is current;
     - an unrecognised stored preset (corrupt blob, or a value written by a
       future version) is not silently rounded to 'regular'. A wrong highlight
       tells the user their goal is something it is not; no highlight merely
       tells them nothing. */
const readGoalPresetId = () => {
  const data = DailyGoalsManager.loadData()
  if (data.customGoal) return null
  return GOAL_PRESETS.some((p) => p.id === data.goalPreset) ? data.goalPreset : null
}

/**
 * @param {Function} onStartQuiz Shell's launcher; only the Smart Review row
 *   uses it in this step. The daily challenge card and both "Continue
 *   practising" buttons stay inert — the challenge builds its own questions in
 *   daily-challenge.js and does not go through startQuiz, and "Continue" has no
 *   agreed destination yet. A tile that looks wired and does nothing reads as a
 *   bug, so neither gets a handler until it has somewhere to go.
 * @param {Object|null} launch Shell's quiz state, for the notice under the row.
 */
export default function LearnScreen({ onStartQuiz, launch }) {
  const [sheet, setSheet] = useState(null) // 'streak' | 'goal' | 'word' | null

  /* Every read below is pure as of Phase 5a/5b — none of them writes. Lazy
     initialisers, so they run once per mount rather than on every render.
     AppShell mounts exactly one tab panel at a time and remounts on every tab
     switch, so these are re-read whenever the user returns to Learn. No polling
     and no subscription: nothing else in the app can change this state while
     Learn is the visible tab. */
  const [greeting] = useState(() => greetingFor(new Date().getHours()))

  const [streak] = useState(() => DailyGoalsManager.getStreak())
  const [shields, setShields] = useState(() => StreakProtection.getShields())

  const [challengeDone] = useState(() => DailyChallengeManager.isCompletedToday())
  /* Held, not called twice: getTodayResult reads storage and returns null when
     today's challenge has not been completed. */
  const [challengeResult] = useState(() => DailyChallengeManager.getTodayResult())

  const [goalDone] = useState(() => DailyGoalsManager.getTodayProgress().questionsAnswered)
  const [goalTarget] = useState(() => DailyGoalsManager.getGoal().questions)
  /* Questions only, which is now the whole completion test. Still taken from the
     manager rather than recomputed locally so the bar and the predicate cannot
     drift apart. Fractional and already clamped to 100 there. */
  const [goalPct] = useState(() => DailyGoalsManager.getProgressPercentage())
  const [goalPresetId] = useState(readGoalPresetId)

  /* Stored review pool only — never vocabulary — so this is correct however
     little of the database has loaded. A user who has answered nothing has an
     empty pool and gets 0, which correctly hides the row rather than claiming
     4,009 words are due.

     The reasoning above is unchanged from when this read SRS entries; only the
     store moved. loadStats is what guarantees the field exists on a save
     written before the pool did. */
  const [reviewDue] = useState(() => StatsManager.loadStats().reviewPool.length)

  /* Null when no vocabulary has loaded yet, or when every difficulty is empty.
     useMemo so a sheet opening does not re-run it. */
  const wotd = useMemo(() => getWordOfTheDay(), [])

  /* THE ONLY WRITE ON THIS SCREEN, and the reason it is in an effect:
     awardWeeklyShieldIfDue persists. It is internally guarded — a second call
     inside the seven-day window returns {awarded: false} and saves nothing — so
     StrictMode's double-invoked mount effect grants one shield, not two. */
  useEffect(() => {
    const { awarded, shields: updated } = awardWeeklyShieldIfDue()
    if (awarded) setShields(updated)
  }, [])

  const currentPreset = GOAL_PRESETS.find((p) => p.id === goalPresetId)

  /* Guards a custom goal of zero questions, which would make the manager's
     ratio NaN. The value itself is the manager's, unmodified. */
  const barWidth = Number.isFinite(goalPct) ? Math.min(100, Math.max(0, goalPct)) : 0

  return (
    <div className="flex flex-col gap-4">
      {/* --- 1. HEADER ------------------------------------------------- */}
      <header className="flex items-center justify-between gap-3">
        {/* Subtle by design: the greeting is orientation, not a page title.
            Matched in size and weight to the streak group opposite it so the
            header reads as one quiet row and the purple card leads. */}
        <h1 className="text-sm font-medium text-slate-400">{greeting}</h1>

        <button
          type="button"
          onClick={() => setSheet('streak')}
          aria-label={`${streak} day streak, ${plural(shields, 'shield')}. View details.`}
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
              className={streak > 0 ? 'text-amber-400' : 'text-slate-500'}
            />
            <span className="text-sm font-medium tabular-nums">{streak}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Shield
              width="17"
              height="17"
              className={shields > 0 ? 'text-sky-400' : 'text-slate-500'}
            />
            <span className="text-sm font-medium tabular-nums">{shields}</span>
          </span>
        </button>
      </header>

      {/* --- 2 + 3. PRIMARY CARD AND CONTINUE --------------------------
          Exactly one purple fill in either state.
          State A: challenge is the purple card, Continue is outlined below.
          State B: challenge collapses to a slim row, Continue becomes purple.

          Both buttons are still inert. Start and Continue navigate to screens
          that do not exist yet, so they carry no onClick — wiring them is a
          later step of Phase 5b.
          --------------------------------------------------------------- */}
      {!challengeDone ? (
        <>
          <section className="rounded-xl bg-primary p-4">
            <p className="text-xs font-semibold tracking-wider text-white/70 uppercase">
              Today&rsquo;s challenge
            </p>
            {/* Not pluralised: CHALLENGE_QUESTIONS is the constant 10 and cannot
                reach 1, so the plural is always right. Not an oversight. */}
            <p className="mt-1 text-lg font-semibold text-white">
              {CHALLENGE_QUESTIONS} questions
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
            className={ROW}
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
            {/* isCompletedToday and getTodayResult read two different fields —
                lastCompletedDate and history[today] — so a pruned or partially
                written store can report done with no record. Show the score
                only when there is one rather than rendering "undefined / undefined". */}
            {challengeResult && (
              <span className="ml-auto text-sm font-semibold text-white tabular-nums">
                {challengeResult.score} / {challengeResult.total}
              </span>
            )}
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

      {/* --- 4. DAILY GOAL ---------------------------------------------
          goalTarget, not goalDone, governs the inflection in both this row's
          label and the sheet's line below: the noun agrees with the second
          number in "X of Y questions". pluralise rather than plural, since the
          string already prints both numbers itself. */}
      <button
        type="button"
        onClick={() => setSheet('goal')}
        aria-label={`Daily goal, ${goalDone} of ${goalTarget} ${pluralise(goalTarget, 'question')}. View goal settings.`}
        className="min-touch flex w-full flex-col justify-center gap-2 rounded-lg px-1 text-left transition-colors hover:bg-white/[0.03]"
      >
        <span className="flex items-baseline justify-between">
          <span className="text-sm font-medium text-slate-300">Daily goal</span>
          <span className="text-sm text-slate-400 tabular-nums">
            {goalDone} / {goalTarget}
          </span>
        </span>
        <span
          className="block h-1.5 w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={goalDone}
          aria-valuemin={0}
          aria-valuemax={goalTarget}
        >
          {/* Purple fill. The rule is exactly one purple-filled TAPPABLE
              surface per state, and a progress bar is feedback rather than
              something you tap expecting a response — the button here is the
              row, and the row itself is not purple-filled. */}
          <span className="block h-full rounded-full bg-primary" style={{ width: `${barWidth}%` }} />
        </span>
      </button>

      {/* --- 5. SMART REVIEW — conditional -----------------------------
          Live as of step 11. The row is still gated on reviewDue > 0, so the
          empty-pool copy is not normally reachable from here — Practice's
          Smart Review tile is the launch point that is always present, and
          that is where a student with nothing to review is told so. The notice
          is rendered anyway for the case where the count was read at mount and
          the pool emptied under it. */}
      {reviewDue > 0 && (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onStartQuiz({ mode: 'review' })}
            className={ROW}
          >
            <span className="text-sm text-slate-300">
              <span className="font-semibold text-white tabular-nums">{reviewDue}</span>{' '}
              {pluralise(reviewDue, 'word')} to review
            </span>
            <ChevronRight width="18" height="18" className="text-slate-400" />
          </button>

          <LaunchNotice launch={launch} mode="review" />
        </div>
      )}

      {/* --- 6. WORD OF THE DAY — the editorial moment -----------------
          Hidden entirely when getWordOfTheDay returns null. An empty editorial
          card is worse than no card: it is the one piece of real content on the
          screen, and a blank Playfair heading reads as a bug. */}
      {wotd && (
        <button
          type="button"
          onClick={() => setSheet('word')}
          className={`${CARD} min-touch mt-1 w-full px-4 py-3 text-left transition-colors hover:bg-white/[0.06]`}
        >
          <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Word of the day
          </span>
          <span className="mt-1 block font-playfair text-2xl leading-tight font-bold text-white">
            {wotd.word.word}
          </span>
          <span className="mt-0.5 block text-sm text-slate-400">{wotd.word.definition}</span>
        </button>
      )}

      {/* --- SHEETS ----------------------------------------------------- */}

      {/* Shield awarding is CALENDAR-weekly, not streak-tied:
          awardWeeklyShieldIfDue reads only lastEarned and never the streak, so a
          shield arrives every seven days whether or not the app was opened.
          Tying awards to maintained streak days was considered and declined — it
          would need a new stored field to remember the streak length at the last
          award, and shields are harmless when unearned since a dormant user's
          streak is zero and there is nothing to protect. This copy deliberately
          matches the code. If the mechanic is ever changed, change this copy with
          it. */}
      <BottomSheet isOpen={sheet === 'streak'} onClose={() => setSheet(null)} title="Your streak">
        <div className="space-y-4 text-sm text-slate-300">
          <p>
            <span className="font-semibold text-white tabular-nums">{plural(streak, 'day')}</span>{' '}
            in a row.
            Your streak counts the days you hit your daily goal. Miss a day and it goes back to
            zero — unless you have a shield.
          </p>
          <div className="border-t border-white/10 pt-4">
            <p className="mb-1 flex items-center gap-2 font-semibold text-white">
              <Shield width="16" height="16" className="text-slate-400" />
              {plural(shields, 'shield')}
            </p>
            <p>
              Shields are spent automatically to cover a missed day. You start with one and earn
              another every week, up to three.
            </p>
            <p className="mt-2">
              A shield is only used if it can save your streak completely. Miss three days holding
              two shields and nothing is spent — your shields stay for next time.
            </p>
          </div>
        </div>
      </BottomSheet>

      <BottomSheet isOpen={sheet === 'goal'} onClose={() => setSheet(null)} title="Daily goal">
        <div className="space-y-2">
          <p className="text-sm text-slate-400">
            {goalDone} of {goalTarget} {pluralise(goalTarget, 'question')} today.
          </p>
          <p className="mb-3 text-sm text-slate-400">
            Meeting this goal each day is what keeps your streak alive.
          </p>
          {GOAL_PRESETS.map((p) => {
            const isCurrent = p.id === goalPresetId
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
                  {/* Not pluralised: GOAL_PRESETS starts at 10 questions, so the
                      count cannot reach 1. Not an oversight.

                      The points half of this line is GONE. It read
                      "25 questions · 250 points", and points no longer complete
                      the goal — showing the number here would advertise a target
                      the app does not enforce. */}
                  <span className="block text-xs text-slate-400 tabular-nums">
                    {p.questions} questions
                  </span>
                </span>
                {isCurrent && <Check width="18" height="18" className="text-primary" />}
              </button>
            )
          })}
          <p className="pt-2 text-xs text-slate-500">
            {currentPreset && `Currently set to ${currentPreset.name}. `}Selection is wired up in a
            later step.
          </p>
        </div>
      </BottomSheet>

      {wotd && (
        <BottomSheet isOpen={sheet === 'word'} onClose={() => setSheet(null)} title="Word of the day">
          <div className="space-y-3">
            <p className="font-playfair text-3xl leading-tight font-bold text-white">
              {wotd.word.word}
            </p>
            <p className="text-sm text-slate-300">{wotd.word.definition}</p>
            {wotd.word.example && (
              <p className="border-t border-white/10 pt-3 text-sm text-slate-400 italic">
                {wotd.word.example}
              </p>
            )}
          </div>
        </BottomSheet>
      )}
    </div>
  )
}

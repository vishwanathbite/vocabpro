import { useMemo, useState } from 'react'
import BottomSheet from '../components/BottomSheet.jsx'
import { CARD, ROW } from '../components/chrome.js'
import { Flame, Shield, ChevronRight, Check, Volume2 } from '../components/icons.jsx'
import DetailList from '../components/DetailList.jsx'
import BookmarkToggle from '../quiz/BookmarkToggle.jsx'
import { detailRows } from '../logic/item-details.js'
import { speakWord } from '../logic/speech.js'
import { DailyGoalsManager, DAILY_GOAL_PRESET_LIST } from '../logic/dailygoals.js'
import {
  StatsManager,
  StreakProtection,
  MAX_SHIELDS,
  getLevelProgress
} from '../logic/gamification.js'
import { DailyChallengeManager, DAILY_CHALLENGE_QUESTIONS } from '../logic/daily-challenge.js'
import { pluralise, plural, formatDayCount, formatNumber } from '../logic/format.js'
import { getWordOfTheDay } from '../logic/word-of-day.js'
import LaunchNotice from '../quiz/LaunchNotice.jsx'
import { DAILY_MODE } from '../quiz/quiz-modes.js'

/* RECONCILED with the Settings screen. This was a local array restating the four
   ids, the four question counts and short display names — a second copy of a
   table dailygoals.js already exported, and Settings would have been the third.
   The short names moved INTO that table as `shortName`, beside the long stored
   ones, so both screens read one source and neither can drift.

   The points field is gone from both, together. It used to be here as well, and
   the goal no longer completes on points, so carrying the number would mean
   this screen stating a target dailygoals.js does not hold. */
const GOAL_PRESETS = DAILY_GOAL_PRESET_LIST

/* RECONCILED. This was a local `CHALLENGE_QUESTIONS = 10` — a second source of
   truth for the challenge's length, kept because daily-challenge.js exported no
   count and generating the questions to read one was far too much work for a
   card that just announces it. The count is now derived from DAILY_PLAN and
   exported, so the announced number and the served number are the same value.

   The old note also warned that the real length could come out BELOW this,
   because AppShell paints on easy alone while medium and hard load in the
   background. startDailyChallenge now awaits all three levels and refuses to
   start a short challenge, so the card cannot promise ten and deliver four. */

/* pluralise/plural were declared here and MOVED to logic/format.js in step 13,
   when the results screen became the second screen counting words. Same two
   function bodies, imported rather than restated; see the note there. */

/* DEVICE-LOCAL, not IST. The IST boundary is a correctness rule for the daily
   challenge and the streak — everyone must get the same challenge on the same
   day. A greeting is the opposite: it describes the reader's own time of day,
   so a student in London at 08:00 should read "Good morning" even though it is
   already afternoon in IST. */
/* WHAT THE STUDENT IS TOLD WHEN SHIELDS ACT. Both lines are PENDING APPROVAL.
   .
   EVERY SPEND IS VISIBLE, which is the rule these exist to keep: a currency
   spent silently on the student's behalf is indistinguishable from a bug, and
   the shield system's whole discoverability problem is that nobody knew it was
   there. So the app says what it did, in plain words, with the numbers.
   .
   NOT A MOMENT, and the queue was considered. buildMoments/MomentOverlay is
   per-answer session machinery: it is owned by the session hooks, it renders a
   full-screen overlay, and its load-bearing property is that `next` refuses to
   advance while one is pending — a guarantee with no meaning outside a quiz.
   This fires at app open, on a tab panel, with no session anywhere. Reusing it
   would mean mounting the queue on Learn and blocking the screen with a
   full-screen interruption before the student has done anything. A line on the
   card is the right weight for news the student did not ask for.
   .
   THE FAILURE LINE NAMES NO NUMBER, on purpose. bridgeStreakGap stops searching
   once the gap is unaffordable, so it knows the gap was longer than the shields
   held and nothing more — printing its lower bound as if it were the gap would
   tell a student who was away three weeks that they missed four days. */
const bridgeCopy = (bridge) => {
  if (!bridge || bridge.spent === 0) return null

  if (bridge.status === 'bridged') {
    return `Streak saved. ${plural(bridge.spent, 'shield')} covered the ${
      bridge.missed === 1 ? 'day' : `${bridge.missed} days`
    } you missed.`
  }

  return null
}

const brokeCopy = (bridge) => {
  if (!bridge || bridge.status !== 'exceeded') return null
  return bridge.shields > 0
    ? `Your streak ended. You were away longer than your ${plural(bridge.shields, 'shield')} could cover.`
    : 'Your streak ended. You had no shields to cover the days you missed.'
}

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
 * @param {Function} onStartQuiz Shell's launcher. The Smart Review row and the
 *   daily challenge's Start button both use it: the challenge does not go
 *   through startQuiz, but it goes through the same handleStartQuiz, which
 *   branches on DAILY_MODE and routes it to startDailyChallenge. One launcher
 *   is what keeps the mutual-exclusion invariant in one place.
 *
 *   Both "Continue practising" buttons stay inert — "Continue" still has no
 *   agreed destination, and a tile that looks wired and does nothing reads as a
 *   bug.
 * @param {Object|null} launch Shell's quiz state, for the notice under the row.
 */
export default function LearnScreen({ onStartQuiz, launch, streakBridge }) {
  const [sheet, setSheet] = useState(null) // 'streak' | 'goal' | 'word' | null

  /* Every read below is pure as of Phase 5a/5b — none of them writes. Lazy
     initialisers, so they run once per mount rather than on every render.
     AppShell mounts exactly one tab panel at a time and remounts on every tab
     switch, so these are re-read whenever the user returns to Learn. No polling
     and no subscription: nothing else in the app can change this state while
     Learn is the visible tab. */
  const [greeting] = useState(() => greetingFor(new Date().getHours()))

  const [streak] = useState(() => DailyGoalsManager.getStreak())
  /* No setter any more. The weekly grant and any shield spending both complete
     in AppShell's mount effect before this screen exists, so the count read here
     is already final — and it is now read AFTER the grant rather than before,
     which removes the 0-to-1 bump the old effect caused on first paint. */
  const [shields] = useState(() => StreakProtection.getShields())

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
  /* ONE READ, not three. This screen already loaded stats for reviewDue, and
     the two tiles below need totalPoints and masteredWords off the same object;
     calling loadStats again per value would re-validate the whole blob twice
     for fields that cannot change while Learn is mounted. */
  const [stats] = useState(() => StatsManager.loadStats())

  const reviewDue = stats.reviewPool.length

  /* DERIVED, NOT STORED, and derived here rather than read from anywhere new:
     getLevelProgress is the same function Progress uses for the identical
     figure, so the two screens cannot disagree about how far the next level is.
     Nothing is computed that did not already exist. */
  const levelProgress = getLevelProgress(stats.totalPoints)

  /* Null when no vocabulary has loaded yet, or when every difficulty is empty.
     useMemo so a sheet opening does not re-run it. */
  const wotd = useMemo(() => getWordOfTheDay(), [])

  /* THIS SCREEN NOW WRITES NOTHING. Its awardWeeklyShieldIfDue effect moved to
     AppShell's mount effect, ahead of the streak bridge — see the note there.
     Every value above is a lazy read, so Learn is purely a reader of state
     settled before it mounted. */

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
          className="min-touch -mr-2 flex items-center gap-2 rounded-lg px-1 transition-opacity hover:opacity-80"
        >
          {/* THE STUDENT'S STANDING, sized like it. These were a 17px glyph
              and a 14px number — smaller than the tab bar labels underneath
              them, which made the two facts a student checks first read as a
              footnote. The number now leads at 18px semibold in its own colour
              and the glyph follows at 20px.

              LIVE VALUES SIT IN A TINTED CHIP, dormant ones do not. The tint is
              the ladder's /10 fill step, the same one a marked quiz row uses, so
              nothing new is introduced — a held streak and a held shield simply
              get the treatment the system already gives to "this one counts".

              ZERO IS DORMANT, NOT BROKEN. No fill, no colour, muted slate at
              the same size: the shape of the thing is there, waiting, rather
              than absent or alarmed. Flat fills only — no gradient, glow or
              shadow. */}
          <span
            className={`flex items-center gap-1.5 rounded-lg px-2 py-1 ${
              streak > 0 ? 'bg-earned/10' : ''
            }`}
          >
            <Flame
              width="20"
              height="20"
              className={streak > 0 ? 'text-earned' : 'text-slate-500'}
            />
            <span
              className={`text-lg font-semibold tabular-nums ${
                streak > 0 ? 'text-earned' : 'text-slate-500'
              }`}
            >
              {streak}
            </span>
          </span>
          <span
            className={`flex items-center gap-1.5 rounded-lg px-2 py-1 ${
              shields > 0 ? 'bg-shield/10' : ''
            }`}
          >
            <Shield
              width="20"
              height="20"
              className={shields > 0 ? 'text-shield' : 'text-slate-500'}
            />
            <span
              className={`text-lg font-semibold tabular-nums ${
                shields > 0 ? 'text-shield' : 'text-slate-500'
              }`}
            >
              {shields}
            </span>
          </span>
        </button>
      </header>

      {/* --- SHIELD REPORT ---------------------------------------------
          Directly under the header that shows the two counts it explains, so
          the sentence and the numbers it refers to are read together. Rendered
          only when something actually happened — no line on an ordinary open.

          role="status" rather than "alert": this is news, not a problem to act
          on, and it is already on screen when the student arrives. */}
      {bridgeCopy(streakBridge) && (
        <p
          role="status"
          className={`${CARD} px-4 py-3 text-sm text-shield`}
        >
          {bridgeCopy(streakBridge)}
        </p>
      )}

      {brokeCopy(streakBridge) && (
        <p role="status" className={`${CARD} px-4 py-3 text-sm text-slate-300`}>
          {brokeCopy(streakBridge)}
        </p>
      )}

      {/* --- 2 + 3. PRIMARY CARD AND CONTINUE --------------------------
          Exactly one purple fill in either state.
          State A: challenge is the purple card, Continue is outlined below.
          State B: challenge collapses to a slim row, Continue becomes purple.

          Start is LIVE as of this step. Continue is still inert — it has no
          agreed destination.
          --------------------------------------------------------------- */}
      {/* THE PRIMARY ZONE, GROUPED. Every child of this screen sat at the
          same gap-4, so five cards of equal weight gave the eye nowhere to
          rest. The challenge and the row under it are one decision — "the thing
          to do now" — so they are tightened to gap-2 inside a wrapper, and the
          gap-4 that remains between wrappers now separates zones rather than
          items. Nothing moves horizontally and no card changes size. */}
      {!challengeDone ? (
        <section className="flex flex-col gap-2">
          <section className="rounded-xl bg-primary p-4">
            <p className="text-xs font-semibold tracking-wider text-white/70 uppercase">
              Today&rsquo;s challenge
            </p>
            {/* pluralise, unlike the goal presets: this number is now imported
                rather than a local literal, so this screen no longer knows it
                cannot be 1. The plan would have to shrink to a single question
                for it to matter, and the call costs nothing. */}
            <p className="mt-1 text-lg font-semibold text-white">
              {DAILY_CHALLENGE_QUESTIONS} {pluralise(DAILY_CHALLENGE_QUESTIONS, 'question')}
            </p>
            <button
              type="button"
              onClick={() => onStartQuiz({ mode: DAILY_MODE })}
              className="min-touch mt-3 w-full rounded-lg bg-white px-4 font-semibold text-primary transition-opacity hover:opacity-90"
            >
              Start
            </button>
            {/* Inside the card, under the button that was tapped. The challenge
                awaits all three vocabulary levels, so this is the one launch on
                this screen that can genuinely make a student wait. */}
            <div className="mt-2 [&>p]:text-white/80">
              <LaunchNotice launch={launch} mode={DAILY_MODE} />
            </div>
          </section>

          <button
            type="button"
            className={ROW}
          >
            <span className="font-medium text-white">Continue practising</span>
            <ChevronRight width="18" height="18" className="text-slate-400" />
          </button>
        </section>
      ) : (
        <section className="flex flex-col gap-2">
          <div className={`${CARD} flex items-center gap-2.5 px-4 py-3`}>
            <Check width="16" height="16" className="shrink-0 text-correct" />
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
        </section>
      )}

      {/* --- 3b. POINTS AND MASTERY -------------------------------------
          TWO OF js/'s FOUR HOME CARDS, restored deliberately short of the set.
          js/ also showed a streak card — the header above already carries the
          day streak and shields — and an accuracy card, which is the one figure
          on that screen a student cannot act on and which Progress still shows.

          BELOW THE CHALLENGE, NOT ABOVE IT. These are a record of what has been
          done; the challenge is the thing to do now, and it keeps the fold. On a
          360px screen this row sits at the fold rather than above it, which is
          the right trade for a card that answers "how am I doing" rather than
          "what next".

          NOT TAPPABLE. Both figures have a home on Progress, one tab away, and a
          tile that navigates would need the tab switcher this screen does not
          have. Plain text keeps them a readout, which is what they are. */}
      {/* BORDERLESS ON PURPOSE, and that is the rhythm rule for the whole
          screen: a border means the thing is tappable, a bare fill means it is
          a readout, and a rule means it is editorial. These two are the only
          readouts here, so they lose CARD's hairline and keep its fill — they
          recede as surfaces while their numbers come forward.

          THE NUMBER LEADS AT 24px, the label follows at eyebrow size in the
          dimmer slate-500, and the sub-line matches the label rather than the
          number. Before this the label and the value were nearly the same
          weight, which is what made a growing figure read as inert. */}
      <section className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white/[0.03] px-4 py-3">
          <p className="text-eyebrow font-semibold tracking-wider text-slate-500 uppercase">
            Points
          </p>
          <p className="mt-1 text-2xl leading-tight font-semibold text-white tabular-nums">
            {formatNumber(stats.totalPoints)}
          </p>
          {/* At max level getLevelProgress reports 0 to next and nextLevel ===
              currentLevel, so the distance line would read "0 to next level" on
              a student who has no next level. Same wording Progress uses. */}
          <p className="mt-0.5 text-xs text-slate-500 tabular-nums">
            {levelProgress.isMaxLevel
              ? 'Highest level'
              : `${formatNumber(levelProgress.pointsToNext)} to next level`}
          </p>
        </div>

        <div className="rounded-xl bg-white/[0.03] px-4 py-3">
          <p className="text-eyebrow font-semibold tracking-wider text-slate-500 uppercase">
            Mastered
          </p>
          <p className="mt-1 text-2xl leading-tight font-semibold text-white tabular-nums">
            {formatNumber(stats.masteredWords)}
          </p>
          {/* js/ put "N need practice" here. Left out: strugglingWords is the
              same pool Smart Review already offers to fix, and naming it twice
              on one screen makes it a nag rather than a route. */}
          <p className="mt-0.5 text-xs text-slate-500">
            {pluralise(stats.masteredWords, 'word')}
          </p>
        </div>
      </section>

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
      {/* NOT A CARD ANY MORE. It was the fifth grey rectangle in a column of
          grey rectangles, indistinguishable from "Continue practising" despite
          being the one piece of editorial content on the screen. The box is
          gone and a hairline rule takes its place: the word now sits on the
          page in Playfair rather than inside a container, which is what makes
          it read as something written rather than something clickable.

          DISTINCT BY FORM, NOT BY COLOUR. A tint or an accent border would have
          had to borrow one of the four meaning tokens — and a word of the day
          is not correct, incorrect, earned or a shield — or spend a second
          purple on a screen whose purple belongs to the challenge. Typography
          and a rule cost neither.

          NO TALLER. The border and its padding come off (px-4 py-3 -> pt-3),
          which pays for the rule above it; the serif stays at 2xl. */}
      {wotd && (
        <button
          type="button"
          onClick={() => setSheet('word')}
          className="min-touch w-full border-t border-white/10 px-1 pt-3 text-left transition-opacity hover:opacity-80"
        >
          <span className="text-eyebrow font-semibold tracking-wider text-slate-500 uppercase">
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
            {/* formatDayCount, not plural(streak, 'day'). Streaks are uncapped
                now, so this number can grow without limit, and "86 days" is a
                figure a student has to stop and convert before it means
                anything. The HEADER badge deliberately keeps the bare number —
                a header is for glancing, this sheet is where a student reads
                their record. */}
            <span className="font-semibold text-white tabular-nums">{formatDayCount(streak)}</span>{' '}
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
              another every week, up to {MAX_SHIELDS}.
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
                  {/* shortName, not name — this row shows "Regular", not
                      "Regular Practice". Both live on the shared table now. */}
                  <span className="block font-medium text-white">{p.shortName}</span>
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
            {currentPreset && `Currently set to ${currentPreset.shortName}. `}Change it in More
            &rsaquo; Settings.
          </p>
        </div>
      </BottomSheet>

      {/* THE TILE STAYS TWO LINES AND THE SHEET CARRIES THE REST. js/ put
          phonetics, example, mnemonic, synonyms and antonyms behind a "Learn
          More" expander on the card itself; the same content lives here
          instead, because this sheet already scrolls (max-h-[85vh], overflow
          body) and the Learn screen has no vertical room to spend — the tile
          is the one card already losing its last pixels to the tab bar.

          THE DETAIL ROWS ARE THE SHARED ONES, not a WOTD-shaped copy. Word,
          Pronunciation, Definition, Exam, Example, Synonyms, Antonyms,
          Mnemonic and Usage all come from detailRows, so this sheet, the quiz
          answer panel and a search result now teach the same word the same
          way and cannot drift.

          NO SHARE CONTROL. shareContent is ported and works, but with no
          share sheet it silently writes to the clipboard, and app-v2 has no
          toast — the button would appear to do nothing on every desktop
          browser. It goes in when there is somewhere to say "copied". */}
      {wotd && (
        <BottomSheet isOpen={sheet === 'word'} onClose={() => setSheet(null)} title="Word of the day">
          <div className="space-y-3">
            <p className="font-playfair text-3xl leading-tight font-bold text-white">
              {wotd.word.word}
            </p>

            {/* Both controls above the detail list, on one row: they act on the
                word in the heading, and after nine rows of detail they would be
                a scroll away from the thing they belong to. Same components and
                the same call shape as the quiz answer panel — speakWord reads
                the speechEnabled setting itself and every existing call site
                ignores its return, and BookmarkToggle takes the stored item, so
                a word saved here is indistinguishable from one saved mid-quiz.
                'vocab' is honest as the mode label: getWordOfTheDay selects only
                from the three vocabulary levels. */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => speakWord(wotd.word.word)}
                aria-label={`Listen to the pronunciation of ${wotd.word.word}`}
                className="min-touch -ml-2 flex items-center gap-2 rounded-lg px-2 text-sm font-medium text-slate-400 transition-colors hover:text-slate-200"
              >
                <Volume2 width="18" height="18" />
                <span>Pronounce</span>
              </button>

              <BookmarkToggle wordData={wotd.word} mode="vocab" />
            </div>

            <DetailList rows={detailRows(wotd.word)} className="border-t border-white/10 pt-3" />
          </div>
        </BottomSheet>
      )}
    </div>
  )
}

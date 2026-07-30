import { useState } from 'react'
import { CARD, ROW } from '../components/chrome.js'
import { Shield } from '../components/icons.jsx'
import { StatsManager, getLevelInfo, getLevelProgress, getEarnedBadges, BADGES, StreakProtection } from '../logic/gamification.js'
import { QuizHistoryManager } from '../logic/settings.js'
import { formatNumber } from '../logic/format.js'

/**
 * Progress tab — level, XP, best run, shields, mastery, accuracy, badges,
 * recent history and per-mode accuracy.
 *
 * DISPLAY ONLY. Nothing here has an onClick: there is no badge detail view, no
 * full history screen and no analytics screen, so every row is inert, the same
 * as Practice's tiles and More's rows.
 *
 * EVERY SOURCE IS A PURE READ, verified in the step 7 investigation:
 * StatsManager.loadStats, getLevelInfo, getLevelProgress, getEarnedBadges,
 * StreakProtection.getShields, QuizHistoryManager.getRecent and .getStats. None
 * writes. (The one caveat that belongs to storage.js, not here: loadState still
 * writes on its boot-time legacy-migration and corrupt-blob recovery paths.)
 *
 * getLevelInfo, getLevelProgress and getEarnedBadges hand back LIVE REFERENCES
 * into module-level LEVEL_CONFIG and BADGES — not copies. Nothing below mutates
 * what they return.
 */

/* THE FIELD IS NOT DAYS. stats.maxStreak counts CONSECUTIVE CORRECT ANSWERS and
   resets on a single wrong one. js/screens.js:2006 renders it as
   `{stats.maxStreak} days`, which is a plain factual error — a student who got 12
   right in one sitting reads "12 days". It is labelled "Best run" here, and the
   words "day"/"days" appear nowhere near maxStreak or currentStreak.

   The genuine day streak is DailyGoalsManager.getStreak(), and it lives on Learn.
   It is deliberately NOT repeated here: two streak numbers on two tabs, one of
   them not a streak of days, is how the js/ confusion happened in the first
   place. Do not copy the js/ wording back in. */
const BEST_RUN_LABEL = 'Best run'

/* Metric tiles: a label above a value, two to a row. Not tappable — no
   min-touch, because a 48px floor is a touch-target rule and these are readouts.
   Nothing here is purple; the XP bar is the one primary fill on the screen, and
   it is feedback rather than an action, exactly as Learn's goal bar is. */
const TILE = `${CARD} px-4 py-3`
const EYEBROW = 'text-[10px] font-semibold tracking-wider text-slate-400 uppercase'

export default function ProgressScreen() {
  /* Lazy initialisers, so each read runs once per mount rather than per render.
     AppShell mounts one tab at a time and remounts on every switch, so returning
     to Progress re-reads. No polling, no subscription. */
  const [stats] = useState(() => StatsManager.loadStats())
  const [shields] = useState(() => StreakProtection.getShields())
  const [recent] = useState(() => QuizHistoryManager.getRecent(5))

  /* getStats() RETURNS TWO DIFFERENT SHAPES. The empty-history early return
     carries streakData and omits last7Days; the populated path does the reverse.
     Only byMode is read here, and it is read defensively — both shapes do include
     byMode, but a corrupt store could yield neither. */
  const [byMode] = useState(() => {
    const s = QuizHistoryManager.getStats()
    return s && typeof s.byMode === 'object' && s.byMode !== null ? s.byMode : {}
  })

  /* EMPTY STATE. totalAnswered is the only honest test for "has this student
     practised": points and mastery can both be 0 after real practice, but
     answering a question always increments this. */
  if (!stats || !stats.totalAnswered) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <h1 className="max-w-[28ch] text-center text-sm text-slate-400">
          Your progress will appear here once you start practising.
        </h1>
      </div>
    )
  }

  const level = getLevelInfo(stats.totalPoints)
  const progress = getLevelProgress(stats.totalPoints)

  /* DERIVED FROM getEarnedBadges(stats), NEVER FROM stats.earnedBadges.
     Step 7a retired five badge ids, and a store written before that can still
     hold them. Reading the stored array would be wrong twice over: its .length
     silently inflates the count, and mapping a retired id through
     BADGES.find() yields undefined, so reading .icon off it throws a TypeError
     — which in React unmounts the whole tree rather than dropping one badge.
     Recomputing from the live BADGES table cannot produce an id that is not in
     the table. */
  const earned = getEarnedBadges(stats)

  /* LOCKED BADGES ARE OMITTED, not greyed. Showing 24 slots with 3 filled makes
     the screen a list of things the student has not done; the count already says
     how many remain. Greyed-out placeholders would also need names and hint copy
     to be useful, and that is a content decision, not a layout one. */
  const badgeTotal = BADGES.length

  /* averageAccuracy is ALREADY 0-100, computed with a zero guard inside
     updateStats — not a ratio. Do not divide it. Math.round rather than
     .toFixed: the field is a number here, but .toFixed would throw on a
     corrupt store that made it a string, and rounding reads better than
     "72.7%" on a metric tile. */
  const accuracy = Number.isFinite(stats.averageAccuracy) ? Math.round(stats.averageAccuracy) : 0

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sr-only">Progress</h1>

      {/* --- 1 + 2. LEVEL AND XP --------------------------------------
          LEVEL_CONFIG carries a `color` per level and a `badge` emoji, both
          js/-era. The colours DO resolve under Tailwind v4 (verified in the
          browser — even level 10's v3-syntax `bg-gradient-to-r`, which v4 still
          accepts), but they are not used: the palette runs gray/blue/green/
          yellow/orange/red/purple/pink/indigo per level, which fights the
          calm-chrome rule, and level 7's is literally bg-purple-500 — it would
          collide with the one-purple-zone rule on a screen that has no primary
          action. The emoji is decoration we do not need either. */}
      <section className={`${CARD} px-4 py-4`}>
        <p className={EYEBROW}>Level {level.level}</p>
        <p className="mt-1 font-playfair text-2xl leading-tight font-bold text-white">
          {level.name}
        </p>

        <p className="mt-3 flex items-baseline justify-between text-sm">
          <span className="text-slate-300 tabular-nums">{formatNumber(stats.totalPoints)} XP</span>
          <span className="text-slate-400 tabular-nums">
            {progress.isMaxLevel ? 'Highest level' : `${progress.pointsToNext} to next level`}
          </span>
        </p>

        {/* At max level getLevelProgress sets progress to 100 and pointsToNext
            to 0, and nextLevel === currentLevel. A full bar is the right reading. */}
        <span
          className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={Math.round(progress.progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress to next level, ${Math.round(progress.progress)} percent`}
        >
          <span
            className="block h-full rounded-full bg-primary"
            style={{ width: `${Math.min(100, Math.max(0, progress.progress))}%` }}
          />
        </span>
      </section>

      {/* --- 3 to 6. METRIC TILES -------------------------------------- */}
      <section className="grid grid-cols-2 gap-2">
        <div className={TILE}>
          <p className={EYEBROW}>{BEST_RUN_LABEL}</p>
          {/* No Flame here. Flame is Learn's day-streak mark, and this is not a
              streak of days — giving it the same icon would rebuild exactly the
              confusion the label above fixes. */}
          <p className="mt-1 text-xl font-semibold text-white tabular-nums">{stats.maxStreak}</p>
        </div>

        <div className={TILE}>
          <p className={EYEBROW}>Shields</p>
          <p className="mt-1 flex items-center gap-1.5">
            <Shield
              width="17"
              height="17"
              className={shields > 0 ? 'text-sky-400' : 'text-slate-500'}
            />
            <span className="text-xl font-semibold text-white tabular-nums">{shields}</span>
          </p>
        </div>

        <div className={TILE}>
          <p className={EYEBROW}>Mastered</p>
          <p className="mt-1 text-xl font-semibold text-white tabular-nums">
            {formatNumber(stats.masteredWords)}
          </p>
        </div>

        <div className={TILE}>
          <p className={EYEBROW}>Accuracy</p>
          <p
            className="mt-1 text-xl font-semibold text-white tabular-nums"
            aria-label={`Accuracy, ${accuracy} percent`}
          >
            {accuracy}%
          </p>
        </div>
      </section>

      {/* --- 7. BADGES ------------------------------------------------- */}
      <section className="flex flex-col gap-2">
        <h2 className={EYEBROW}>
          Badges {earned.length} of {badgeTotal}
        </h2>
        {earned.length > 0 && (
          <div className={`${CARD} flex flex-wrap gap-2 px-4 py-3`}>
            {earned.map((badge) => (
              /* `icon` is an emoji string, which needs no Tailwind class to
                 render. `title` and the label carry the name and description so
                 the glyph is never the only thing conveying meaning. */
              <span
                key={badge.id}
                title={`${badge.name} — ${badge.description}`}
                aria-label={`${badge.name}. ${badge.description}.`}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06] text-lg"
              >
                <span aria-hidden="true">{badge.icon}</span>
              </span>
            ))}
          </div>
        )}
      </section>

      {/* --- 8. RECENT HISTORY ----------------------------------------- */}
      {recent.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className={EYEBROW}>Recent quizzes</h2>
          {recent.map((quiz) => (
            <div key={quiz.id} className={`${ROW} pointer-events-none`}>
              <span className="text-sm text-slate-300 capitalize">{quiz.mode}</span>
              <span className="text-sm text-slate-400 tabular-nums">
                {quiz.questionsCorrect} / {quiz.questionsTotal}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* --- 9. ANALYTICS: accuracy by mode ----------------------------
          byMode values are {quizzes, correct, total}; total can be 0 for a
          malformed entry, so the ratio is guarded rather than assumed. */}
      {Object.keys(byMode).length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className={EYEBROW}>Accuracy by mode</h2>
          <div className={`${CARD} flex flex-col gap-3 px-4 py-3`}>
            {Object.entries(byMode).map(([mode, data]) => {
              const pct = data && data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
              return (
                <div key={mode}>
                  <p className="flex items-baseline justify-between text-sm">
                    <span className="text-slate-300 capitalize">{mode}</span>
                    <span className="text-slate-400 tabular-nums">{pct}%</span>
                  </p>
                  <span
                    className="mt-1 block h-1 w-full overflow-hidden rounded-full bg-white/10"
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${mode} accuracy, ${pct} percent`}
                  >
                    <span className="block h-full rounded-full bg-slate-400" style={{ width: `${pct}%` }} />
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

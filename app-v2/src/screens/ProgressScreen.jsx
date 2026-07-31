import { useState } from 'react'
import { CARD, ROW } from '../components/chrome.js'
import { Shield } from '../components/icons.jsx'
import { StatsManager, getLevelInfo, getLevelProgress, getEarnedBadges, BADGES, LEVEL_CONFIG, StreakProtection } from '../logic/gamification.js'
import { QuizHistoryManager } from '../logic/settings.js'
import { formatNumber } from '../logic/format.js'

/**
 * Progress tab — level ladder, badge ladder, and the metrics once there are any.
 *
 * ONE SCREEN THAT GROWS, not two that swap. There is no early return for the
 * zero case: the ladder and the badge sections render identically whether or not
 * the student has practised, and the measured blocks — XP, best run, shields,
 * mastered, accuracy, history, per-mode accuracy — are gated on `hasPractised`.
 *
 * THE DISTINCTION THAT DRIVES THAT GATING: a zero measurement is the absence of
 * information, but a locked badge is a target. "0 words mastered" and "0%
 * accuracy" tell a student nothing they did not already know and read as
 * failure; "Word Collector — Master 10 words" is a goal, and it is worth showing
 * on day one. So metrics wait for data and the ladders never do.
 *
 * DISPLAY ONLY. Nothing has an onClick — no badge detail view, no history
 * screen.
 *
 * EVERY SOURCE IS A PURE READ, verified in the step 7 investigation:
 * StatsManager.loadStats, getLevelInfo, getLevelProgress, getEarnedBadges,
 * StreakProtection.getShields, QuizHistoryManager.getRecent and .getStats.
 *
 * getLevelInfo, getLevelProgress and getEarnedBadges hand back LIVE REFERENCES
 * into LEVEL_CONFIG and BADGES, not copies. Nothing below mutates them.
 */

/* THE FIELD IS NOT DAYS. stats.maxStreak counts CONSECUTIVE CORRECT ANSWERS and
   resets on a single wrong one. js/screens.js:2006 renders it as
   `{stats.maxStreak} days`, which is a plain factual error — a student who got 12
   right in one sitting reads "12 days". It is labelled "Best run" here, and the
   words "day"/"days" appear nowhere near maxStreak or currentStreak.

   The genuine day streak is DailyGoalsManager.getStreak(), and it lives on Learn.
   It is deliberately NOT repeated here. Do not copy the js/ wording back in. */
const BEST_RUN_LABEL = 'Best run'

const EYEBROW = 'text-[10px] font-semibold tracking-wider text-slate-400 uppercase'
/* Readouts, not controls: no min-touch, because 48px is a touch-target floor and
   nothing on this screen is tappable. */
const TILE = `${CARD} px-4 py-3`

/**
 * BADGES CARRIES NO CATEGORY FIELD. Every entry is
 * {id, name, description, icon, condition} — the six categories exist in
 * gamification.js only as `// Mastery Badges` style comments, which are not data
 * and cannot be read at runtime.
 *
 * So the category is derived from the id, which IS data. The prefixes are a real
 * convention across all 24 ids, not a guess: first_word plus word_master_*,
 * streak_*, points_*, questions_*, accuracy_*, and whatever matches none of
 * those. Order here is the display order and matches the order the groups appear
 * in BADGES.
 *
 * THE HONEST WEAKNESS: this depends on a naming convention nothing enforces. A
 * future badge with an off-pattern id lands silently in Special rather than
 * failing loudly. It cannot be DROPPED — the fallback guarantees every entry is
 * placed, so the group counts always sum to BADGES.length — but it can be
 * misfiled. The better fix is a `category` field on each BADGES entry, which
 * would make this function three lines and remove the convention dependency;
 * that is a gamification.js change and this step is scoped to one file.
 */
const BADGE_GROUPS = [
  { heading: 'Mastery', match: (id) => id === 'first_word' || id.startsWith('word_master_') },
  { heading: 'Streaks', match: (id) => id.startsWith('streak_') },
  { heading: 'Points', match: (id) => id.startsWith('points_') },
  { heading: 'Activity', match: (id) => id.startsWith('questions_') },
  { heading: 'Accuracy', match: (id) => id.startsWith('accuracy_') },
]

/* Computed once at module load: BADGES is a module constant, so the grouping
   cannot change between renders. Within each group the order is BADGES order,
   which ascends by threshold. */
const GROUPED_BADGES = (() => {
  const buckets = BADGE_GROUPS.map((g) => ({ heading: g.heading, badges: [] }))
  const special = { heading: 'Special', badges: [] }

  for (const badge of BADGES) {
    const i = BADGE_GROUPS.findIndex((g) => g.match(badge.id))
    if (i === -1) special.badges.push(badge)
    else buckets[i].badges.push(badge)
  }

  return [...buckets, special].filter((g) => g.badges.length > 0)
})()

export default function ProgressScreen() {
  /* Lazy initialisers: once per mount, not per render. AppShell mounts one tab at
     a time and remounts on every switch, so returning to Progress re-reads. */
  const [stats] = useState(() => StatsManager.loadStats())
  const [shields] = useState(() => StreakProtection.getShields())
  const [recent] = useState(() => QuizHistoryManager.getRecent(5))

  /* getStats() RETURNS TWO DIFFERENT SHAPES. The empty-history early return
     carries streakData and omits last7Days; the populated path does the reverse.
     Only byMode is read, and defensively — both shapes include it, but a corrupt
     store could yield neither. */
  const [byMode] = useState(() => {
    const s = QuizHistoryManager.getStats()
    return s && typeof s.byMode === 'object' && s.byMode !== null ? s.byMode : {}
  })

  /* totalAnswered is the only honest test for "has this student practised":
     points and mastery can both legitimately be 0 after real practice, but
     answering a question always increments this. */
  const hasPractised = Boolean(stats && stats.totalAnswered > 0)

  const totalPoints = (stats && stats.totalPoints) || 0
  const level = getLevelInfo(totalPoints)
  const progress = getLevelProgress(totalPoints)

  /* DERIVED FROM getEarnedBadges(stats), NEVER FROM stats.earnedBadges.
     Step 7a retired five badge ids and a store written before that can still
     hold them. Reading the stored array would be wrong twice over: its .length
     silently inflates the count, and mapping a retired id through BADGES.find()
     yields undefined, so reading .icon off it throws a TypeError — which in React
     unmounts the whole tree rather than dropping one badge. getEarnedBadges
     filters BADGES, so it cannot return an id that is not in the table. (As of
     step 7c it also unions in the stored ids, safely, so an earned badge is
     never revoked by later practice.) */
  const earnedIds = new Set(getEarnedBadges(stats).map((b) => b.id))

  /* averageAccuracy is ALREADY 0-100, computed with a zero guard inside
     updateStats — not a ratio. Do not divide it. Math.round rather than
     .toFixed, which would throw on a corrupt store that made it a string. */
  const accuracy =
    stats && Number.isFinite(stats.averageAccuracy) ? Math.round(stats.averageAccuracy) : 0

  return (
    <div className="flex flex-col gap-4">
      <h1 className="sr-only">Progress</h1>

      {!hasPractised && (
        <p className="px-1 pt-2 text-sm text-slate-400">
          Your progress will appear here once you start practising.
        </p>
      )}

      {hasPractised && (
        <>
          {/* --- LEVEL AND XP -----------------------------------------
              LEVEL_CONFIG carries a `color` per level; it is not used here or in
              the ladder below. The palette runs gray/blue/green/yellow/orange/
              red/purple/pink/indigo, which fights calm chrome, and level 7's is
              literally bg-purple-500 — it would collide with the one-purple rule
              on a screen that has no primary action. The bar's fill is the one
              primary use, and it is feedback rather than an action, exactly as
              Learn's goal bar is. */}
          <section className={`${CARD} px-4 py-4`}>
            <p className={EYEBROW}>Level {level.level}</p>
            <p className="mt-1 font-playfair text-2xl leading-tight font-bold text-white">
              {level.name}
            </p>

            <p className="mt-3 flex items-baseline justify-between text-sm">
              <span className="text-slate-300 tabular-nums">{formatNumber(totalPoints)} XP</span>
              <span className="text-slate-400 tabular-nums">
                {/* Both numbers in this row go through formatNumber, so they
                    group identically. Before step 7f this one was raw: harmless
                    when the widest band was 100 points, wrong once step 7e made
                    the Champion-to-Legend gap 40,000. */}
                {progress.isMaxLevel
                  ? 'Highest level'
                  : `${formatNumber(progress.pointsToNext)} to next level`}
              </span>
            </p>

            {/* At max level getLevelProgress sets progress to 100 and
                pointsToNext to 0, and nextLevel === currentLevel. A full bar is
                the right reading. */}
            <span
              className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              /* FLOOR, not round. Math.round announced "100 percent" beside
                 "1 to next level" — a screen reader heard a finished bar on an
                 unfinished level. Any score within 600 points of Legend rounded
                 up, and step 10 widened the Champion-to-Legend band to 120,000,
                 so the window where that happens is now far larger. Flooring
                 reports 99 until the level is genuinely reached; at max level
                 getLevelProgress returns exactly 100, which floors to 100. */
              aria-valuenow={Math.floor(progress.progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progress to next level, ${Math.floor(progress.progress)} percent`}
            >
              <span
                className="block h-full rounded-full bg-primary"
                style={{ width: `${Math.min(100, Math.max(0, progress.progress))}%` }}
              />
            </span>
          </section>

          {/* --- METRICS ---------------------------------------------- */}
          <section className="grid grid-cols-2 gap-2">
            <div className={TILE}>
              <p className={EYEBROW}>{BEST_RUN_LABEL}</p>
              {/* No Flame here. Flame is Learn's day-streak mark, and this is not
                  a streak of days — the same icon would rebuild exactly the
                  confusion the label fixes. */}
              {/* Formatted for symmetry with every other displayed figure, not
                  because a four-digit run is likely — "not reachable in practice"
                  is how a raw number survives unnoticed for years. */}
              <p className="mt-1 text-xl font-semibold text-white tabular-nums">
                {formatNumber(stats.maxStreak)}
              </p>
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

          {/* --- RECENT HISTORY --------------------------------------- */}
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

          {/* --- ACCURACY BY MODE -------------------------------------
              byMode values are {quizzes, correct, total}; total can be 0 for a
              malformed entry, so the ratio is guarded. */}
          {Object.keys(byMode).length > 0 && (
            <section className="flex flex-col gap-2">
              <h2 className={EYEBROW}>Accuracy by mode</h2>
              <div className={`${CARD} flex flex-col gap-3 px-4 py-3`}>
                {Object.entries(byMode).map(([mode, data]) => {
                  const pct =
                    data && data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
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
                        <span
                          className="block h-full rounded-full bg-slate-400"
                          style={{ width: `${pct}%` }}
                        />
                      </span>
                    </div>
                  )
                })}
              </div>
            </section>
          )}
        </>
      )}

      {/* --- LEVEL LADDER ------------------------------------------------
          All ten levels, ascending, so the whole arc is visible from day one.
          The current level is marked by weight and contrast plus an explicit
          "Current" label — no colour swatch, for the reason given above.
          Levels already passed keep normal contrast; those ahead are dimmed,
          which mirrors the earned/locked treatment in the badge sections. */}
      <section className="flex flex-col gap-2">
        <h2 className={EYEBROW}>Levels</h2>
        <div className={`${CARD} flex flex-col divide-y divide-white/[0.06]`}>
          {LEVEL_CONFIG.map((entry) => {
            const reached = totalPoints >= entry.minPoints
            const isCurrent = entry.level === level.level
            return (
              <p
                key={entry.level}
                aria-current={isCurrent ? 'true' : undefined}
                /* Formatted to match the visible figure beside it — a screen
                   reader user should hear the same number a sighted user reads.
                   Not verified against actual speech output: if en-IN grouping
                   turns out to read poorly, this is the line to revert, not the
                   visible one. */
                aria-label={`Level ${entry.level}, ${entry.name}, from ${formatNumber(entry.minPoints)} XP${
                  isCurrent ? '. Current level.' : reached ? '. Reached.' : '. Not yet reached.'
                }`}
                className="flex items-baseline justify-between px-4 py-2.5 text-sm"
              >
                <span className={isCurrent ? 'font-semibold text-white' : reached ? 'text-slate-300' : 'text-slate-500'}>
                  <span className="tabular-nums">{entry.level}.</span> {entry.name}
                </span>
                <span className="flex items-baseline gap-2">
                  {isCurrent && (
                    <span className="text-[10px] font-semibold tracking-wider text-sky-400 uppercase">
                      Current
                    </span>
                  )}
                  <span className={`tabular-nums ${reached ? 'text-slate-400' : 'text-slate-500'}`}>
                    {formatNumber(entry.minPoints)} XP
                  </span>
                </span>
              </p>
            )
          })}
        </div>
      </section>

      {/* --- BADGES ------------------------------------------------------
          All 24, grouped, locked ones included with their description as a hint.
          A locked badge with a name is a goal; hiding it would hide the goal.

          Locked rows stay READABLE rather than being greyed to a silhouette — a
          hint nobody can read is worse than no hint. The distinction is carried
          by three things at once, not by opacity alone: the earned icon sits in a
          filled tile and the locked one does not, the earned name is white
          against slate-400, and only locked rows show a hint line. */}
      <section className="flex flex-col gap-2">
        <h2 className={EYEBROW}>
          Badges {earnedIds.size} of {BADGES.length}
        </h2>

        {GROUPED_BADGES.map((group) => {
          const earnedInGroup = group.badges.filter((b) => earnedIds.has(b.id)).length
          return (
            <div key={group.heading} className="flex flex-col gap-1.5">
              <p className="px-1 text-xs font-medium text-slate-400">
                {group.heading}{' '}
                <span className="text-slate-500 tabular-nums">
                  {earnedInGroup}/{group.badges.length}
                </span>
              </p>

              <div className={`${CARD} flex flex-col divide-y divide-white/[0.06]`}>
                {group.badges.map((badge) => {
                  const isEarned = earnedIds.has(badge.id)
                  return (
                    <div
                      key={badge.id}
                      /* Announces state explicitly, so an earned badge and a
                         locked one never read identically. */
                      aria-label={`${badge.name}. ${isEarned ? 'Earned' : 'Locked'}. ${badge.description}.`}
                      className="flex items-start gap-3 px-4 py-2.5"
                    >
                      <span
                        aria-hidden="true"
                        className={
                          isEarned
                            ? 'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-base'
                            : 'flex h-8 w-8 shrink-0 items-center justify-center text-base opacity-60'
                        }
                      >
                        {badge.icon}
                      </span>

                      <span className="min-w-0">
                        <span
                          className={`block text-sm ${
                            isEarned ? 'font-medium text-white' : 'text-slate-400'
                          }`}
                        >
                          {badge.name}
                        </span>
                        {/* Hint only while locked: once earned, the description
                            is history rather than instruction. */}
                        {!isEarned && (
                          <span className="mt-0.5 block text-xs text-slate-500">
                            {badge.description}
                          </span>
                        )}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}

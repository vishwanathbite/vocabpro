/**
 * The celebration queue for one answer.
 *
 * WHY A QUEUE AND NOT FOUR FLAGS. Four things can become true on a single
 * answer — a badge, a level-up, a streak milestone and the daily goal — and the
 * first two are full-screen. js/ deferred only the level-up, and only behind a
 * badge (js/app.js:1403); its streak toast fired at 300ms and its badge overlay
 * at 500ms, so the toast appeared UNDER the overlay that was about to cover it.
 * Serialising all four removes the whole class of collision rather than the one
 * pair js/ noticed.
 *
 * NO TIMERS ANYWHERE IN THIS PATH, and that is the load-bearing decision, not a
 * stylistic one. complete() calls onComplete, AppShell sets `quiz` to null, and
 * the entire subtree — this queue and the hook holding it — unmounts
 * SYNCHRONOUSLY. A moment held by a setTimeout on the final answer is destroyed
 * before it ever paints. That is not a rare case: the daily goal completes on a
 * final answer far more often than a mid-quiz one, because the goal is counted
 * in questions and quizzes arrive in fixed blocks — a 25-question goal met by
 * ten-question quizzes lands on a question 5 or a question 10, never in
 * between. So every moment is dismissed by the student, and next() refuses to
 * advance while any remain. Nothing is queued into a subtree about to unmount,
 * because the subtree cannot unmount until the queue is empty.
 *
 * ORDER: badge, level-up, streak, goal. Awards first, since they are the ones
 * that never come again; then the in-session run; then the day. It is also the
 * order of decreasing rarity, so the biggest thing is never the last thing.
 *
 * DATA, NOT COMPONENTS. Each moment is a plain object and MomentOverlay renders
 * whatever it is handed, so the copy lives in one file and the overlay has no
 * per-kind branches beyond an optional glyph.
 */

import { STREAK_MILESTONES, getStreakEmoji } from '../logic/gamification.js'

/**
 * One line per real milestone, parallel to STREAK_MILESTONES.
 *
 * NOT KEYED BY THE NUMBER, and none of them states the number. The headline
 * already shows the count, so restating it in prose would be a second copy of a
 * threshold — the exact failure that put a stale [5, 10, 20, 50] in
 * quiz-scoring.js and a stale [3, 5, 10, 20, 50] in getStreakEmoji. Retuning
 * STREAK_MILESTONES therefore cannot make any of these lines false; only their
 * ORDER is load-bearing, and the array below has to stay the same length.
 *
 * js/ has no copy to reuse here: StreakMilestone renders `{streak} Streak!` and
 * an emoji, and nothing else. getStreakMessage exists in both trees but tiers on
 * 3/5/10/20/50, is unexported, and has never had a caller.
 */
const STREAK_LINES = [
  'You have found your rhythm.',
  'That is control, not luck.',
  'Very few students get this far.',
  'Exceptional. This is the top of the ladder.'
]

/**
 * Build the ordered moment queue for one answer.
 *
 * Takes exactly what scoreAnswer returns plus the bracketed goal edge, so the
 * caller passes values through rather than deriving anything.
 *
 * ONLY THE FIRST BADGE, matching js/app.js:1391. Two badges landing on one
 * answer is possible — points_100 and questions_50 can cross together — but the
 * second is not lost: getNewBadges compares against previousBadges, which
 * updateStats has already advanced, so the unshown badge is recorded as earned
 * and appears on Progress. Showing both would mean two full-screen dismissals
 * for one tap.
 *
 * @param {Object}  args
 * @param {Array}   args.newBadges          - Newly earned badge objects, BADGES order
 * @param {?Object} args.levelUp            - Level info object, or null
 * @param {?number} args.streakMilestone    - The milestone reached, or null
 * @param {boolean} args.goalJustCompleted  - The daily goal's false -> true edge
 * @returns {Array} Ordered moments; empty when the answer earned nothing
 */
export function buildMoments({ newBadges, levelUp, streakMilestone, goalJustCompleted }) {
  const moments = []

  const badge = Array.isArray(newBadges) ? newBadges[0] : null
  if (badge) {
    moments.push({
      // The key is the moment's identity, and it is what the sound effect keys
      // off. It has to be stable across re-renders and distinct between two
      // moments of the same kind, which a bare index would not be.
      key: `badge:${badge.id}`,
      kind: 'badge',
      // Copy from js/components.js:504-516, verbatim. The badge's own fields
      // come from app-v2's BADGES (24 entries), never js/'s (29) — five ids
      // there were retired as unearnable and mapping one would yield undefined.
      eyebrow: 'Achievement Unlocked!',
      glyph: badge.icon,
      title: badge.name,
      body: badge.description,
      cta: 'Awesome!'
    })
  }

  if (levelUp) {
    moments.push({
      key: `level:${levelUp.level}`,
      kind: 'levelUp',
      // Copy from js/components.js:549-563, verbatim.
      eyebrow: 'LEVEL UP!',
      // NO GLYPH, deliberately. LEVEL_CONFIG carries `.badge` (an emoji) and
      // `.color` (a Tailwind class string), and nothing in app-v2 consumes
      // either — ProgressScreen declines both explicitly and says why. The
      // colours are v3-style strings arriving from a data table at runtime, so
      // v4 would not generate them, and level 10's `.color` is a three-class
      // gradient that yields garbage under js/'s own .replace('bg-','text-').
      // This overlay is styled from the design tokens instead.
      glyph: null,
      title: `Level ${levelUp.level}`,
      body: levelUp.name,
      cta: 'Continue'
    })
  }

  if (streakMilestone) {
    const tier = STREAK_MILESTONES.indexOf(streakMilestone)
    moments.push({
      key: `streak:${streakMilestone}`,
      kind: 'streak',
      eyebrow: 'Streak',
      glyph: getStreakEmoji(streakMilestone),
      title: `${streakMilestone} in a row`,
      // scoreAnswer only reports a milestone that is IN the array, so the miss
      // branch is unreachable today. Guarded anyway: an empty line is a thin
      // moment, an undefined one renders the word "undefined".
      body: tier >= 0 ? STREAK_LINES[tier] : '',
      cta: 'Continue'
    })
  }

  if (goalJustCompleted) {
    moments.push({
      key: 'goal',
      kind: 'goal',
      // js/app.js:1429 is one string, 'Daily Goal Complete! Great work!', split
      // here across the eyebrow and the heading. Both halves are verbatim.
      eyebrow: 'Daily Goal Complete!',
      glyph: null,
      title: 'Great work!',
      body: null,
      cta: 'Continue'
    })
  }

  return moments
}

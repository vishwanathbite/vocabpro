/**
 * Spend shields to carry a streak across days the student missed.
 *
 * ITS OWN MODULE, and not a method on either manager it uses. The decision needs
 * BOTH halves — which days were earned (dailyGoals.completedDays) and how many
 * shields are held (streakProtection) — and dailygoals.js already imports
 * gamification.js for the protected set. Putting the bridge in gamification.js
 * would have meant importing dailygoals.js back and closing a cycle; putting it
 * in dailygoals.js would have made the goals module own shield spending. It is a
 * coordination concern, so it lives between them and imports both.
 *
 * THE PROMISE THIS KEEPS. Learn's streak sheet has always said shields are
 * "spent automatically to cover a missed day" and are "only used if [they] can
 * save your streak completely". Until now nothing spent one and the goal streak
 * broke however many were held, so both halves of that sentence were false. This
 * is the code that makes them true.
 *
 * WHEN IT RUNS: from AppShell's mount effect, before the data load resolves and
 * therefore before LearnScreen mounts and reads getStreak() in a lazy useState
 * initialiser. That ordering is the whole reason it is not in LearnScreen's own
 * effect — an effect there runs AFTER the first render, so the student would see
 * the broken streak painted and corrected a frame later, on exactly the screen
 * the feature exists to reassure.
 *
 * IDEMPOTENT WITHOUT A FLAG: once a day is recorded as protected it reads as
 * covered, so the gap search finds nothing to bridge on the next run.
 */

import { DailyGoalsManager } from './dailygoals.js';
import { StreakProtection } from './gamification.js';
import { epochMsOf, DAY_MS } from './ist-date.js';

/**
 * Bridge the gap between today and the last covered day, if shields allow.
 *
 * THE GAP NEVER INCLUDES TODAY. The walk starts at yesterday, because a day in
 * progress has not been missed — a student opening the app at 9am has not failed
 * that day and must never be charged a shield for it. This is the same rule
 * getStreak encodes as "don't break on today", stated once more here because
 * getting it wrong would silently bill every user every morning.
 *
 * THE SEARCH IS BOUNDED BY WHAT CAN BE AFFORDED, which makes the bound exact
 * rather than arbitrary. Looking back `shields + 1` days is enough to decide:
 * if a covered day is found within that window the gap is affordable, and if it
 * is not, the gap is longer than the shields held and the answer is "no" without
 * needing to know how much longer. It also means a student holding no shields
 * does no work at all.
 *
 * ALL-OR-NOTHING is enforced by StreakProtection.spendShieldsForGap, which
 * checks the count before touching anything and writes every field in one save.
 * This function's job is to say WHICH days; that one's is to charge for them
 * atomically or not at all.
 *
 * @param {Date|number|string} [instant] Injected clock, following the
 *   getStreak/awardWeeklyShieldIfDue convention, so the day boundary is testable
 * @returns {{status: string, spent: number, missed: number, shields: number, covered: Array<string>}}
 *   status is one of:
 *     'none'     nothing was missed, or nothing needed paying for. Say nothing.
 *     'bridged'  `spent` shields covered `missed` days. Both are exact.
 *     'exceeded' the gap was longer than the shields held. `missed` is a LOWER
 *                BOUND, not the true length — see the return site.
 */
export function bridgeStreakGap(instant = Date.now()) {
  const shields = StreakProtection.getShields();
  const nowMs = epochMsOf(instant);

  const completed = new Set(DailyGoalsManager.loadData().completedDays);
  const protectedDays = new Set(StreakProtection.getProtectedDays());
  const isCovered = (key) => completed.has(key) || protectedDays.has(key);

  /* NOTHING TO PROTECT is a real case, not an edge one: a student who has never
     completed a day has no streak, and bridging back from today would invent
     one out of days they never earned. The search below cannot distinguish
     "never started" from "long gap" on its own, so it is the absence of a
     covered day within the window that decides — and both answers are "spend
     nothing", which is why one test covers them. */
  const missedDays = [];

  /* A student holding nothing still runs one iteration, which is what reports
     'exceeded' honestly when they have in fact missed a day and cannot cover
     it — the copy for that case does not depend on owning shields. */
  for (let i = 1; i <= shields + 1; i++) {
    const dateKey = DailyGoalsManager.getTodayKey(nowMs - i * DAY_MS);

    if (isCovered(dateKey)) {
      /* Found the far side of the gap. Everything collected so far is the run
         of missed days between it and today, and it is affordable by
         construction — the loop cannot have collected more than `shields`
         entries before reaching this point. */
      const result = StreakProtection.spendShieldsForGap(
        missedDays,
        new Date(nowMs).toISOString()
      );

      return {
        status: result.spent > 0 ? 'bridged' : 'none',
        spent: result.spent,
        missed: missedDays.length,
        shields: result.shields,
        covered: result.covered
      };
    }

    missedDays.push(dateKey);
  }

  /* Fell off the end of the affordable window: either the gap is longer than
     the shields held, or there is no covered day back there at all. Either way
     nothing is spent and nothing is recorded — a partial bridge would cost the
     student every shield they hold and still let the streak break.

     `missed` HERE IS A LOWER BOUND, AND THE STATUS SAYS SO. The loop stopped as
     soon as affording the gap became impossible, so the true length is unknown —
     it could be six days or four hundred. Reporting the window size as if it
     were the gap would print a plainly false number to a student who knows
     exactly how long they were away, which is worse than not naming it. Walking
     further to find the real figure would change no decision and would cost a
     scan of the whole keyspace, so the copy is written to need only the bound. */
  return { status: 'exceeded', spent: 0, missed: missedDays.length, shields, covered: [] };
}

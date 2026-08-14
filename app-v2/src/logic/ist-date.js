/**
 * IST Day Boundary
 * Literary Rides VocabPro - Modular Architecture
 *
 * The app's single notion of "what day is it". Extracted verbatim from
 * daily-challenge.js in Phase 5 step 10a — a pure move, no behaviour change.
 *
 * It lived in daily-challenge.js because that is where the IST boundary was
 * first needed (step 8). dailygoals.js then imported it from there (step 9) and
 * word-of-day.js is next, which would have left three feature modules depending
 * on a fourth for a general date utility — and dragged helpers.js and
 * seeded-random.js into dailygoals.js transitively, for nothing. It also
 * coupled goals to a module Phase 6 will be editing for idiom removal.
 *
 * This module imports nothing and depends on no app state, so anything may
 * depend on it.
 */

/**
 * IST is UTC+5:30, fixed. India has observed no daylight saving since 1945, so
 * this offset is constant and a day is always exactly 24 hours long — which is
 * what lets day arithmetic step by a flat 86,400,000 ms. The setDate-on-a-local
 * -Date stepping this replaced would have moved 23 or 25 hours across a local
 * DST transition, silently skipping or repeating a key.
 */
export const IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1000;
export const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Normalize a Date, epoch-milliseconds number, or date string to epoch ms.
 *
 * @param {Date|number|string} instant
 * @returns {number} Epoch milliseconds
 */
export const epochMsOf = (instant) => {
  if (instant instanceof Date) return instant.getTime();
  if (typeof instant === 'number') return instant;
  return new Date(instant).getTime();
};

/**
 * The IST calendar date for an instant, as a padded YYYY-MM-DD key.
 *
 * THE SINGLE SOURCE OF TRUTH FOR THE DAY BOUNDARY. Every day key in the app now
 * derives from here: DailyChallengeManager.getToday returns this value directly,
 * getWordOfTheDay seeds from it (step 10b), and DailyGoalsManager.getTodayKey
 * takes it and strips the zero-padding (step 9) — that unpadded FORMAT is kept
 * on purpose so a cached js/ shell sharing STORAGE_KEY can still find its
 * history, and is due to go at the Phase 6 cutover. There is one notion of
 * "today"; only its spelling differs between the goals keyspace and the rest.
 *
 * The offset is hard-coded and universal, deliberately. It is NOT the device
 * timezone: the daily challenge is a shared event for Indian competitive-exam
 * aspirants, so a user in Dubai must get the same challenge on the same date as
 * one in Pune. Neither Intl.DateTimeFormat nor toLocaleDateString is used, and
 * the device zone is never read.
 *
 * Shifting the instant by the offset and then reading UTC fields yields IST
 * calendar fields; toISOString supplies the zero-padding, so the output is
 * byte-identical in shape to the UTC key this replaced and remains
 * lexicographically sortable.
 *
 * @param {Date|number|string} [instant] - Defaults to now
 * @returns {string} IST calendar date, e.g. "2026-07-28"
 */
export const toISTDateKey = (instant = Date.now()) =>
  new Date(epochMsOf(instant) + IST_OFFSET_MS).toISOString().split('T')[0];

/**
 * How long dated history is kept. THE SINGLE SOURCE for the retention window.
 *
 * It was written three times — the daily-challenge prune, the daily-goals
 * cleanup, and the quota-recovery trim in storage.js — and the third disagreed
 * with the other two about more than the number: it built a device-local
 * midnight, so a device behind IST dropped a day the other two kept. One
 * constant, and one comparison rule: pad both sides and compare the strings.
 *
 * Expressed in days as well as milliseconds because the two callers want
 * different things — the cutoff arithmetic wants ms, and a message or a label
 * wants the day count without dividing it back out.
 */
export const HISTORY_RETENTION_DAYS = 30;
export const HISTORY_RETENTION_MS = HISTORY_RETENTION_DAYS * DAY_MS;

/**
 * Normalise a day key to the padded form so string comparison is meaningful.
 *
 * The goals keyspace stores UNPADDED keys (DailyGoalsManager.getTodayKey strips
 * the padding for the js/ shell's benefit), and lexicographic ordering on those
 * is nonsense — "2026-7-5" sorts after "2026-12-31". Both readers that compare
 * a goals key against a cutoff need this, and only one of them can import
 * dailygoals.js, so the normaliser lives here with the boundary it serves.
 *
 * Returns null for anything that does not parse as three numbers, which is the
 * caller's signal to leave the entry alone rather than guess at a date for it.
 *
 * @param {string} key A day key, padded or unpadded
 * @returns {string|null} Padded YYYY-MM-DD, or null if unparseable
 */
export const padDateKey = (key) => {
  const [year, month, day] = String(key).split('-').map(Number);

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return null;
  }

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

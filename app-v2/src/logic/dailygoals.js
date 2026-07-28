/**
 * Daily Goals System
 * Literary Rides VocabPro - Engagement Enhancement
 * Track and motivate daily learning progress
 */

// ESM port of js/dailygoals.js. StorageManager is now imported rather than
// sniffed off the global `window`, so it is always defined.
import { StorageManager } from './storage.js';
import { toISTDateKey, DAY_MS } from './ist-date.js';

// ===========================
// DAILY GOALS CONFIGURATION
// ===========================

const DAILY_GOAL_PRESETS = {
  casual: { questions: 10, points: 100, name: 'Casual Learner' },
  regular: { questions: 25, points: 250, name: 'Regular Practice' },
  serious: { questions: 50, points: 500, name: 'Serious Study' },
  intense: { questions: 100, points: 1000, name: 'Intense Training' }
};

const DEFAULT_GOAL = DAILY_GOAL_PRESETS.regular;

/**
 * Build a fresh, zeroed progress bucket for a day.
 *
 * Extracted in Phase 5 step 3: getTodayProgress and updateProgress each held
 * an identical copy of this literal, and they must not drift — updateProgress
 * increments the fields getTodayProgress hands to the UI.
 *
 * A factory, never a shared constant. Both call sites mutate what they get
 * back, so handing them the same object would alias two days' worth of
 * progress onto one bucket.
 *
 * @returns {Object} A new zeroed progress bucket, stamped with the current time
 */
const createDayProgress = () => ({
  questionsAnswered: 0,
  pointsEarned: 0,
  startTime: new Date().toISOString(),
  completed: false
});

/**
 * Copy a history map and every day bucket inside it.
 *
 * Added in Phase 5 step 4 to close an aliasing bug — see loadData below. Two
 * levels are required. A fresh outer map alone would still hand every caller
 * the same bucket objects, and updateProgress mutates buckets in place
 * (`data.history[todayKey].questionsAnswered += ...`), so a shared bucket would
 * let one caller's increment surface in another's snapshot.
 *
 * Non-object entries are passed through untouched rather than spread: a corrupt
 * blob can leave a string or a number under a date key, and `{ ...5 }` would
 * silently turn that into `{}`. Preserving it verbatim keeps this a copy and
 * nothing more.
 *
 * @param {Object} history Map of date key -> day bucket
 * @returns {Object} A fresh map of fresh buckets
 */
const cloneHistory = (history) => {
  const copy = {};

  for (const key in history) {
    const entry = history[key];
    copy[key] = (entry && typeof entry === 'object') ? { ...entry } : entry;
  }

  return copy;
};

// ===========================
// DAILY GOALS MANAGER
// ===========================

const DailyGoalsManager = {
  storageKey: 'vocabProDailyGoals', // Legacy key for reference

  /**
   * Default daily goals data
   */
  defaultData: {
    goalPreset: 'regular',
    customGoal: null,
    history: {}
  },

  /**
   * Today's history key, on the IST day boundary.
   *
   * THE ONLY PLACE THIS FORMAT IS BUILT. getStreak and getWeekHistory used to
   * inline the same template literal, so the format lived in three places;
   * they now both route through here. That matters ahead of Phase 6, when the
   * migration to padded keys has to find every construction site.
   *
   * TIMEBASE changed to IST in Phase 5 step 9; FORMAT deliberately did not. The
   * key stays unpadded `YYYY-M-D` because both trees share STORAGE_KEY, so a
   * cached js/ shell reading padded keys would find no history at all — it
   * builds unpadded keys of its own. Existing history therefore stays findable
   * and js/ stays compatible. Padding is deferred to the Phase 6 cutover, when
   * js/ is retired.
   *
   * For a device in India this changes nothing: local time already IS IST, so
   * the key is identical to what the old local-time builder produced. Only
   * users outside India shift, by at most one day, which is the same
   * unavoidable seam step 8 accepted for the challenge — a stored key records a
   * calendar day with no time-of-day, so no migration could ever re-derive
   * which IST day past activity fell in.
   *
   * @param {Date|number|string} [instant] - Defaults to now
   * @returns {string} Unpadded IST day key, e.g. "2026-7-5"
   */
  getTodayKey: (instant = Date.now()) => {
    // Derived from the single boundary source of truth rather than from new
    // offset arithmetic: take the padded IST key and strip the leading zeros.
    const [year, month, day] = toISTDateKey(instant).split('-').map(Number);
    return `${year}-${month}-${day}`;
  },

  /**
   * Load daily goals data from centralized storage.
   *
   * The history map is copied, not shared. Phase 5 step 4 closed an aliasing
   * bug here: the spread below is shallow, so on a store with no dailyGoals
   * section it copied the REFERENCE to defaultData.history, and
   * updateProgress's `data.history[todayKey] = ...` then wrote today's bucket
   * onto the module-level default. That survived for the life of the module and
   * leaked into every later load that fell back to defaults — a second, empty
   * store would report the first store's progress. The step-3 harness needed an
   * explicit `defaultData.history = {}` between tests; needing that reset was
   * the symptom.
   *
   * Copying also means a caller cannot reach into the memoized state through a
   * returned bucket. Mutating what loadData hands back now changes nothing
   * until saveData persists the whole object, which is how updateProgress
   * already worked.
   *
   * customGoal is deliberately not copied: its default is null, so there is no
   * shared default object to alias, and nothing mutates it in place.
   *
   * @returns {Object} Daily goals data, safe to mutate
   */
  loadData: () => {
    const state = StorageManager.loadState();
    const data = { ...DailyGoalsManager.defaultData, ...state.dailyGoals };

    return { ...data, history: cloneHistory(data.history || {}) };
  },

  /**
   * Save daily goals data to centralized storage
   */
  saveData: (data) => {
    const state = StorageManager.loadState();
    state.dailyGoals = data;
    StorageManager.saveState(state);
  },

  /**
   * Get current goal settings
   */
  getGoal: () => {
    const data = DailyGoalsManager.loadData();
    if (data.customGoal) {
      return data.customGoal;
    }
    return DAILY_GOAL_PRESETS[data.goalPreset] || DEFAULT_GOAL;
  },

  /**
   * Set goal preset
   */
  setGoalPreset: (preset) => {
    const data = DailyGoalsManager.loadData();
    data.goalPreset = preset;
    data.customGoal = null;
    DailyGoalsManager.saveData(data);
  },

  /**
   * Set custom goal
   */
  setCustomGoal: (questions, points) => {
    const data = DailyGoalsManager.loadData();
    data.customGoal = { questions, points, name: 'Custom Goal' };
    DailyGoalsManager.saveData(data);
  },

  /**
   * Get today's progress.
   *
   * PURE READ as of Phase 5 step 3. This used to lazily create today's bucket
   * and call saveData, which made a read persist — and it was the single write
   * shared by three read-named functions, since getProgressPercentage and
   * isGoalComplete both route through here. In the live app it is reached from
   * a bare component-body statement (js/screens.js:18), a useState initializer
   * (js/screens.js:14), and four times per answered question from the
   * completers (js/app.js:1422/1424 and 1889/1891).
   *
   * The lazy creation stays, so the return shape never varies: an absent bucket
   * still yields the same zeroed object, startTime included. Two things are
   * gone. The saveData call, obviously. And the assignment into the loaded
   * `data.history` — writing there mutates either the memoized state object or,
   * on a store with no dailyGoals section yet, the shared defaultData.history
   * that loadData shallow-spreads, and doing so without persisting would leave
   * an in-memory change for some unrelated later save to flush.
   *
   * updateProgress is now the only function that persists a bucket. It builds
   * its own via the same factory when today's is absent, so nothing is lost by
   * not writing one here.
   *
   * @returns {Object} Today's progress bucket
   */
  getTodayProgress: () => {
    const data = DailyGoalsManager.loadData();
    const todayKey = DailyGoalsManager.getTodayKey();

    return data.history[todayKey] || createDayProgress();
  },

  /**
   * Update today's progress
   */
  updateProgress: (questionsAdded, pointsAdded) => {
    const data = DailyGoalsManager.loadData();
    const todayKey = DailyGoalsManager.getTodayKey();

    if (!data.history[todayKey]) {
      data.history[todayKey] = createDayProgress();
    }

    data.history[todayKey].questionsAnswered += questionsAdded;
    data.history[todayKey].pointsEarned += pointsAdded;

    // Check if goal completed
    const goal = DailyGoalsManager.getGoal();
    if (data.history[todayKey].questionsAnswered >= goal.questions ||
        data.history[todayKey].pointsEarned >= goal.points) {
      if (!data.history[todayKey].completed) {
        data.history[todayKey].completed = true;
        data.history[todayKey].completedAt = new Date().toISOString();
      }
    }

    DailyGoalsManager.saveData(data);
    return data.history[todayKey];
  },

  /**
   * Get progress percentage.
   *
   * Still routes through getTodayProgress, unchanged. As of Phase 5 step 3 that
   * no longer persists, so this stopped transitively writing — which matters
   * because js/screens.js:18 calls it from a bare component-body statement,
   * i.e. on every render.
   */
  getProgressPercentage: () => {
    const progress = DailyGoalsManager.getTodayProgress();
    const goal = DailyGoalsManager.getGoal();

    const questionProgress = (progress.questionsAnswered / goal.questions) * 100;
    const pointsProgress = (progress.pointsEarned / goal.points) * 100;

    // Return the higher of the two (goal can be met either way)
    return Math.min(100, Math.max(questionProgress, pointsProgress));
  },

  /**
   * Check if today's goal is complete.
   *
   * Still routes through getTodayProgress, unchanged. As of Phase 5 step 3 that
   * no longer persists, so this stopped transitively writing. The completers
   * call it twice per answered question to bracket updateProgress and detect
   * the false -> true edge (js/app.js:1422/1424, 1889/1891); that detection is
   * unaffected, since only updateProgress ever sets `completed`.
   */
  isGoalComplete: () => {
    const progress = DailyGoalsManager.getTodayProgress();
    return progress.completed;
  },

  /**
   * Get streak (consecutive days with completed goals)
   *
   * Semantics untouched: the same 366 iterations, the same "don't break on
   * today" rule, the same completed test. Only the key builder and the day step
   * changed — it walks back through getTodayKey by a flat DAY_MS instead of
   * inlining the format and calling setDate on a local Date.
   *
   * @param {Date|number|string} [instant] - Defaults to now
   */
  getStreak: (instant = Date.now()) => {
    const data = DailyGoalsManager.loadData();
    const nowMs = new Date(instant).getTime();
    let streak = 0;

    // Check consecutive days backwards
    for (let i = 0; i <= 365; i++) {
      const dateKey = DailyGoalsManager.getTodayKey(nowMs - i * DAY_MS);

      if (data.history[dateKey] && data.history[dateKey].completed) {
        streak++;
      } else if (i > 0) {
        // Don't break on today if not completed yet
        break;
      }
    }

    return streak;
  },

  /**
   * Get last 7 days history
   *
   * Same seven entries, oldest first, today last — the loop bounds and the
   * missing-day fallback are unchanged. The key now comes from getTodayKey
   * rather than an inlined copy of the format, and the day step is a flat
   * DAY_MS.
   *
   * `dayName` is derived from the IST key rather than from the device's
   * weekday, so the label always names the day the key refers to. For a device
   * in India the two are the same; elsewhere the old code could label a bar with
   * the device's weekday while the bar's data came from a different IST day.
   * Same reasoning as getTodayFormatted in step 8. `date` keeps its previous
   * value — the instant i days ago — and is not read by the UI, which renders
   * only dayName and the spread progress fields (js/screens.js:87-101).
   *
   * @param {Date|number|string} [instant] - Defaults to now
   */
  getWeekHistory: (instant = Date.now()) => {
    const data = DailyGoalsManager.loadData();
    const history = [];
    const nowMs = new Date(instant).getTime();

    for (let i = 6; i >= 0; i--) {
      const dayMs = nowMs - i * DAY_MS;
      const dateKey = DailyGoalsManager.getTodayKey(dayMs);
      // Padded form parses as valid ISO; the unpadded key would not.
      const istMidnight = new Date(`${toISTDateKey(dayMs)}T00:00:00Z`);

      history.push({
        date: new Date(dayMs),
        dayName: istMidnight.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }),
        ...data.history[dateKey] || { questionsAnswered: 0, pointsEarned: 0, completed: false }
      });
    }

    return history;
  },

  /**
   * Clear old history (keep last 30 days)
   */
  cleanupHistory: () => {
    const data = DailyGoalsManager.loadData();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30);

    Object.keys(data.history).forEach(key => {
      const [year, month, day] = key.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      if (date < cutoffDate) {
        delete data.history[key];
      }
    });

    DailyGoalsManager.saveData(data);
  }
};

// Public API — same names the former window globals used.
// DEFAULT_GOAL stays internal, as in the original.
export { DAILY_GOAL_PRESETS, DailyGoalsManager };

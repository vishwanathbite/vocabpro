/**
 * Daily Goals System
 * Literary Rides VocabPro - Engagement Enhancement
 * Track and motivate daily learning progress
 */

// ESM port of js/dailygoals.js. StorageManager is now imported rather than
// sniffed off the global `window`, so it is always defined.
import { StorageManager } from './storage.js';
import { toISTDateKey, epochMsOf, DAY_MS } from './ist-date.js';
/* One direction only: gamification.js imports storage.js and format.js, never
   this module, so there is no cycle. The streak is the one thing that needs
   both halves — the days earned and the days paid for. */
import { StreakProtection } from './gamification.js';

// ===========================
// DAILY GOALS CONFIGURATION
// ===========================

/**
 * QUESTIONS ONLY. The points figure each preset used to carry is gone.
 *
 * Completion was `questions >= goal.questions || points >= goal.points`, and the
 * points arm always fired first — a preset labelled "25 questions" delivered
 * 14-22 of them depending on accuracy and difficulty. It landed hardest on the
 * students doing the easiest work: easy words pay 10 a question against a 250
 * target, hard words pay 20, so the strongest student on the hardest words
 * finished in 14 questions and the weakest on easy words in 22. A goal that
 * shortens as you improve is backwards.
 *
 * Points are still TRACKED per day — the bucket below keeps pointsEarned, and it
 * remains score, level and badge fuel. It is only no longer a finish line, and
 * the number is therefore not stated as one anywhere: it enforced nothing, and a
 * displayed target the app ignores is worse than no target.
 *
 * customGoal keeps its {questions, points} shape, set by setCustomGoal. That is
 * deliberate and is NOT a second goal: js/ shares STORAGE_KEY and its own
 * completion predicate still reads customGoal.points, so dropping the field here
 * would silently change how a custom goal completes in the shipping app.
 * getGoal's preset path returns no points and app-v2 reads none.
 */
/* `shortName` JOINED THE TABLE with the Settings screen. LearnScreen carried a
   local GOAL_PRESETS array holding the four ids, the four question counts and
   its own short display names — a second copy of everything but the long names,
   shipped even though this table was already exported. Settings would have been
   the third. Both screens now read from here.

   BOTH NAMES ARE REAL. The long one is js/'s and is what a stored preset is
   called; the short one is what the phone screens show, because "Regular
   Practice" beside a count does not fit a row. Neither is derivable from the
   other, so both are stated. */
const DAILY_GOAL_PRESETS = {
  casual: { questions: 10, name: 'Casual Learner', shortName: 'Casual' },
  regular: { questions: 25, name: 'Regular Practice', shortName: 'Regular' },
  serious: { questions: 50, name: 'Serious Study', shortName: 'Serious' },
  intense: { questions: 100, name: 'Intense Training', shortName: 'Intense' }
};

/**
 * The four presets as an ordered list, for a picker.
 *
 * DERIVED, so a screen cannot list a preset that does not exist or miss one that
 * does. Object key order is insertion order for string keys, which is the order
 * above: gentlest first.
 */
const DAILY_GOAL_PRESET_LIST = Object.entries(DAILY_GOAL_PRESETS).map(([id, preset]) => ({
  id,
  ...preset
}));

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
 * Mark a day complete if it has earned it. THE ONLY WRITER OF `completed`.
 *
 * Extracted so updateProgress and setGoalPreset cannot disagree about what
 * completion means — the second caller is why this exists at all.
 *
 * ONE-WAY, AND THAT IS THE CONTRACT. It can set `completed`; it can never clear
 * it. A day the student finished stays finished:
 *
 *   - RAISING the goal mid-day (Casual to Intense at 6pm, having answered 10)
 *     must not retract a completion already earned and already counted by
 *     getStreak. Preserved by the `!completed` guard — this function simply does
 *     not have a path that writes false.
 *   - LOWERING it (Intense to Casual at 6pm, having answered 30) must complete
 *     the day immediately. That is the defect this extraction fixes: completion
 *     used to be evaluated ONLY inside updateProgress, so the day stayed
 *     incomplete until the student happened to answer one more question, while
 *     getProgressPercentage — which reads getGoal() live — already showed 100%.
 *     A bar at 100% over an incomplete day, with a streak silently not counting
 *     it, was unreachable only because nothing could change the preset.
 *
 * @param {Object} bucket A day progress bucket, mutated in place
 * @param {number} goalQuestions The question target now in force
 * @returns {boolean} Whether this call completed the day
 */
const markCompleteIfEarned = (bucket, goalQuestions) => {
  if (!bucket || bucket.completed) return false;
  if (!(goalQuestions > 0)) return false;
  if (bucket.questionsAnswered < goalQuestions) return false;

  bucket.completed = true;
  bucket.completedAt = new Date().toISOString();
  return true;
};

/**
 * Record a day in the never-trimmed completed set.
 *
 * IDEMPOTENT BY THE `includes` GUARD, which is what makes every caller safe to
 * run twice — the session sync below relies on it, and so does a day that
 * updateProgress and setGoalPreset both decide is complete.
 *
 * @param {Object} data    Loaded goals data, mutated in place
 * @param {string} dateKey An unpadded IST key from getTodayKey
 */
const recordCompletedDay = (data, dateKey) => {
  if (!Array.isArray(data.completedDays)) data.completedDays = [];
  if (!data.completedDays.includes(dateKey)) data.completedDays.push(dateKey);
};

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
    history: {},
    /* The never-trimmed set of completed day keys — see storage.js, where the
       same field is declared and the reasoning lives. Kept in step with that
       declaration for the same reason the rest of this object is: the two must
       not be readable as disagreeing. */
    completedDays: []
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
   * completedDays IS copied, for exactly the reason history is. It defaults to a
   * shared module-level array, and recordCompletedDay pushes onto whatever
   * loadData handed back — without the copy, the first push on a store with no
   * dailyGoals section would append to defaultData.completedDays and leak that
   * day into every later load that fell back to defaults. Same bug the history
   * clone closed in Phase 5 step 4, one field over.
   *
   * @returns {Object} Daily goals data, safe to mutate
   */
  loadData: () => {
    const state = StorageManager.loadState();
    const data = { ...DailyGoalsManager.defaultData, ...state.dailyGoals };

    return {
      ...data,
      history: cloneHistory(data.history || {}),
      completedDays: Array.isArray(data.completedDays) ? [...data.completedDays] : []
    };
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
  /**
   * Choose one of the four presets, and re-settle today against it.
   *
   * THE RE-EVALUATION IS THE POINT, not a nicety. Completion was only ever
   * computed inside updateProgress, so before this the goal could move under a
   * day that had already been answered and nothing would notice until the next
   * question: lower the target at 6pm with 30 answered and getProgressPercentage
   * — which reads getGoal() live — showed 100% while `completed` stayed false
   * and the streak did not count the day. The two disagreed on screen.
   *
   * ONE-WAY, via markCompleteIfEarned: lowering the goal can complete today,
   * raising it can never un-complete a day already earned. See the helper.
   *
   * Only TODAY is re-evaluated. Past days were completed against the goal in
   * force at the time, which is the honest record — retroactively completing
   * last Tuesday because the target dropped today would rewrite a streak the
   * student did not earn.
   *
   * @param {string} preset One of the DAILY_GOAL_PRESETS keys
   */
  setGoalPreset: (preset) => {
    const data = DailyGoalsManager.loadData();
    data.goalPreset = preset;
    data.customGoal = null;

    /* Read AFTER the assignment above, so it is the new target. loadData
       returns a copy, so getGoal would still see the old stored value —
       hence the table lookup here rather than a getGoal() call. */
    const goal = DAILY_GOAL_PRESETS[preset] || DEFAULT_GOAL;
    const todayKey = DailyGoalsManager.getTodayKey();

    /* Absent bucket means nothing was answered today, so there is nothing to
       complete. Deliberately NOT created here: getTodayProgress was made a pure
       read in Phase 5 step 3 precisely so a bucket is only ever written by a
       real event, and "the student opened Settings" is not one. */
    if (data.history[todayKey] && markCompleteIfEarned(data.history[todayKey], goal.questions)) {
      /* Lowering the goal can newly complete today, and that day has to reach
         the streak set as well — otherwise the bar would read 100% and the
         streak would not count the day, which is the pair this branch exists
         to keep in step. */
      recordCompletedDay(data, todayKey);
    }

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

    // Check if goal completed. QUESTIONS ONLY — the points arm was removed here;
    // see DAILY_GOAL_PRESETS. pointsAdded is still accumulated above, it just no
    // longer decides anything.
    //
    // `completed` is written by markCompleteIfEarned and nowhere else, and four
    // things read it: isGoalComplete, getStreak (the Learn streak, the one
    // shields protect), getWeekHistory (which spreads the bucket into the week
    // bars), and that helper's own idempotence guard. This used to be an inline
    // block here; setGoalPreset became its second caller.
    const goal = DailyGoalsManager.getGoal();
    /* The bucket flag and the streak record move together. getStreak reads only
       the set now, so a day marked complete here and NOT recorded there would
       be complete on the week bars and invisible to the streak. */
    if (markCompleteIfEarned(data.history[todayKey], goal.questions)) {
      recordCompletedDay(data, todayKey);
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

    // Questions only, matching the completion test above. This used to return
    // the higher of the questions and points ratios, which has to move with the
    // predicate: leaving the points arm in would let the bar read 100% on a day
    // that is not complete, which is a worse lie than the old short session.
    return Math.min(100, (progress.questionsAnswered / goal.questions) * 100);
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
   * Get streak (consecutive days with completed goals).
   *
   * COUNTS FROM completedDays, NOT FROM history. That is the fix. It used to
   * walk `history[dateKey].completed` over a hard 366 iterations, while
   * cleanupHistory deletes every history day older than 30 and AppShell runs
   * that on mount BEFORE this screen reads the streak — so the walk hit a
   * missing day at 31 and stopped. Every streak was silently capped at ~30, and
   * a student on 45 days was told 30. Unnoticed only because no tester had got
   * that far. The completed set is never trimmed, so the count is now unbounded.
   *
   * THE 366 CEILING IS GONE, replaced by a bound that is a fact rather than a
   * guess: a streak cannot be longer than the number of days ever recorded, so
   * `size + 1` iterations is exact and still terminates on a corrupt blob that
   * somehow holds every key back to the epoch.
   *
   * The "don't break on today" rule is unchanged, and is why the loop skips the
   * break at i === 0: a day in progress has not failed, it just has not finished
   * yet, so a student mid-morning still sees yesterday's streak rather than 0.
   *
   * @param {Date|number|string} [instant] - Defaults to now
   */
  getStreak: (instant = Date.now()) => {
    const data = DailyGoalsManager.loadData();

    /* Sets once per call rather than `.includes` per day: the walk is O(streak)
       and this makes each step O(1) instead of O(recorded days). */
    const completed = new Set(data.completedDays);

    /* A DAY IS UNBROKEN IF IT WAS EARNED **OR** PAID FOR. This is where a spent
       shield becomes real: bridgeStreakGap records the days it covered under
       streakProtection.protectedDays, and from here they are indistinguishable
       from days the student completed. Both sets use the same unpadded IST
       keyspace, which is why they can be tested against one key. */
    const protectedDays = new Set(StreakProtection.getProtectedDays());
    const isCovered = (key) => completed.has(key) || protectedDays.has(key);

    const nowMs = epochMsOf(instant);
    let streak = 0;

    /* The bound grows with both sets for the same reason it was completed.size
       before: a streak cannot be longer than the number of days on record, and
       a protected day is a day on record. Still exact, still terminating. */
    const maxDays = completed.size + protectedDays.size;

    for (let i = 0; i <= maxDays; i++) {
      const dateKey = DailyGoalsManager.getTodayKey(nowMs - i * DAY_MS);

      if (isCovered(dateKey)) {
        streak++;
      } else if (i > 0) {
        // Don't break on today if not completed yet
        break;
      }
    }

    return streak;
  },

  /**
   * Bring completedDays in step with history. THE MIGRATION, and a repair.
   *
   * RUN ONCE PER SESSION, from AppShell's mount effect, and it MUST run BEFORE
   * cleanupHistory — that call deletes history days older than 30, and a day
   * deleted before this runs is a day that can never be recovered into the set.
   * The two are adjacent in that effect for exactly this reason.
   *
   * IDEMPOTENT, SO RUNNING IT TWICE DOES NOTHING. It is a set union, not an
   * append: recordCompletedDay skips a key already present. That is deliberate
   * rather than incidental — it is what lets this run every session instead of
   * needing a "have I migrated yet" flag, which would be a new stored field
   * whose own correctness would then need defending.
   *
   * IT IS ALSO A STANDING REPAIR, not just a one-time seed. The js/ tree shares
   * STORAGE_KEY and completes days by writing `history[key].completed` directly,
   * knowing nothing about this set. Re-running the union every session means a
   * day earned in that build is picked up here rather than silently breaking the
   * streak — for as long as both builds are in use.
   *
   * @param {Date|number|string} [instant] - Unused today; accepted so the
   *   signature matches the other maintenance calls beside it.
   * @returns {number} How many days this call added
   */
  syncCompletedDays: () => {
    const data = DailyGoalsManager.loadData();
    const before = data.completedDays.length;

    for (const [dateKey, bucket] of Object.entries(data.history)) {
      if (bucket && typeof bucket === 'object' && bucket.completed) {
        recordCompletedDay(data, dateKey);
      }
    }

    const added = data.completedDays.length - before;
    /* Only writes when something changed. On every session after the first this
       is a pure read, which keeps a maintenance call off the write path for the
       overwhelmingly common case. */
    if (added > 0) DailyGoalsManager.saveData(data);
    return added;
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
   * Clear old history (keep last 30 days).
   *
   * TIMEBASE FIXED in Phase 5b step 4b. This was the last local-time date
   * arithmetic left in the module. It built its cutoff from `new Date()` and
   * `setDate(-30)`, then re-parsed each IST-derived history key with
   * `new Date(year, month - 1, day)` — a LOCAL midnight. Two timebases in one
   * comparison, against keys that have been IST since step 9.
   *
   * What that cost: for a device behind IST, local midnight of a key sits later
   * in absolute time than the IST day it names, and for a device ahead it sits
   * earlier — so the 30-day boundary landed a day early or a day late depending
   * on the device's offset. A user in Los Angeles (UTC-7, 12.5h behind IST)
   * could keep a 31st day; one in Auckland (UTC+12, 6.5h ahead) could lose the
   * 30th. In India, where local time IS IST, nothing changed either way.
   *
   * Now both sides are IST day keys compared lexicographically, which is exact
   * because toISTDateKey emits zero-padded YYYY-MM-DD. That is the same
   * comparison DailyChallengeManager.completeChallenge already uses for its own
   * 30-day prune (daily-challenge.js:221-226), so the two features finally
   * agree on when a day falls out of range.
   *
   * The keys stored here are UNPADDED (getTodayKey), so each is normalised to
   * the padded form before comparing — string ordering on unpadded keys is
   * meaningless ("2026-7-5" > "2026-12-31").
   */
  cleanupHistory: (instant = Date.now()) => {
    const data = DailyGoalsManager.loadData();
    const cutoffKey = toISTDateKey(epochMsOf(instant) - 30 * DAY_MS);

    Object.keys(data.history).forEach(key => {
      const [year, month, day] = key.split('-').map(Number);
      if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
        return; // Unparseable key from a corrupt blob: leave it alone.
      }
      const paddedKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      if (paddedKey < cutoffKey) {
        delete data.history[key];
      }
    });

    DailyGoalsManager.saveData(data);
  }
};

// Public API — same names the former window globals used.
// DEFAULT_GOAL stays internal, as in the original.
/* setCustomGoal has the SAME re-evaluation gap and is deliberately not changed
   here: it has no caller in app-v2 (nothing offers a custom goal), so the defect
   stays latent there, and fixing a path this commit cannot reach would be a
   change nothing verifies. It becomes live the day a custom-goal control ships. */
export { DAILY_GOAL_PRESETS, DAILY_GOAL_PRESET_LIST, DailyGoalsManager };

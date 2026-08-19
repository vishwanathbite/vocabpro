/**
 * Formatting, Validation and Sharing
 * Literary Rides VocabPro - Modular Architecture
 *
 * The live remainder of js/utils.js, extracted verbatim. Browser globals only
 * (Date, Math, URLSearchParams, window.location, navigator) — no storage, no
 * cross-file dependency. This module imports nothing.
 *
 * ---------------------------------------------------------------------------
 * DELIBERATELY DROPPED in the Phase 4 step 6b triage. These 15 symbols from
 * js/utils.js are NOT ported. Each was checked for call sites across the whole
 * repo before being dropped; none is referenced anywhere in app-v2.
 *
 *   saveToStorage, loadFromStorage, removeFromStorage, clearStorage,
 *   checkStorageAvailable, memoryStorage
 *     - legacy fallback for a StorageManager-undefined condition that is
 *       impossible under ESM, where storage.js is imported rather than sniffed
 *       off window. app-v2's ported modules already dropped every call site.
 *
 *   getPointsForDifficulty
 *     - zero callers, and disagrees with gamification.js calculatePoints on
 *       acronym and oneword (returns 10 where calculatePoints returns 12).
 *
 *   calculateLevel
 *     - zero callers, and disagrees with getLevelInfo above 999 points; it is
 *       floor(pts/100)+1 and uncapped, so it reports levels past LEVEL_CONFIG's
 *       maximum of 10.
 *
 *   getLevelName
 *     - zero callers; an exact duplicate of the LEVEL_CONFIG[].name values.
 *
 *   formatDate
 *     - zero callers; shadowed by a local formatDate in QuizHistoryScreen
 *       (js/screens.js:1767), so the utils version was never bound.
 *
 *   isToday, getDaysBetween, getDailyMotivation, truncate, capitalize
 *     - zero callers anywhere. The apparent truncate/capitalize hits are all
 *       Tailwind class names, not calls.
 * ---------------------------------------------------------------------------
 */

// ===========================
// VALIDATION
// ===========================

/* generateReferralCode WAS HERE and is gone. It took a first and last name —
   fields no screen in app-v2 collects — and minted a code for a referral system
   that cannot exist without a server. Exported, never imported. Removed because
   a reader auditing this repo should not find name-handling code in an app that
   collects nothing. */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate mobile number (Indian format)
 * @param {string} mobile - Mobile number to validate
 * @returns {boolean} - True if valid mobile number
 */
export const isValidMobile = (mobile) => {
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
};

// ===========================
// URL & SHARING UTILITIES
// ===========================

/**
 * Get URL parameter value
 * @param {string} param - Parameter name
 * @returns {string|null} - Parameter value or null
 */
export const getUrlParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

/**
 * Share content using Web Share API or fallback to clipboard
 * @param {Object} shareData - Data to share {title, text, url}
 * @returns {Object} - {success: boolean, method: 'share'|'clipboard'}
 */
export const shareContent = async (shareData) => {
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return { success: true, method: 'share' };
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(shareData.url || shareData.text);
      return { success: true, method: 'clipboard' };
    }
  } catch (error) {
    return { success: false, method: null };
  }
};

// ===========================
// NUMBER FORMATTING
// ===========================

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
export const formatNumber = (num) => {
  return num.toLocaleString('en-IN');
};

/*
 * Dumb pluralisation: append an 's' unless the count is exactly 1. No irregular
 * nouns, no library — enough for the counted nouns this app actually renders
 * ("word", "question"), and nothing more.
 *
 * MOVED HERE FROM LearnScreen IN STEP 13, at the second copy rather than the
 * fourth. It was written screen-local and said so, correctly, while one screen
 * used it; the results screen's pool-delta lines count words too, and
 * re-declaring two identical lines there is how the CARD/ROW and
 * DIFFICULTIES duplications started. format.js imports nothing, so this adds
 * no cycle and no cost to the screens that do not use it.
 *
 * `pluralise` is separate from `plural` for the sites that render the number in
 * their own element, where the noun cannot travel with it.
 */
export const pluralise = (n, noun) => (n === 1 ? noun : `${noun}s`);
export const plural = (n, noun) => `${n} ${pluralise(n, noun)}`;

/**
 * A day count as prose: 86 becomes "2 months, 26 days".
 *
 * WHY IT EXISTS. Streaks are now uncapped, so the number they report can grow
 * without limit — and "86 days" is a figure a student has to stop and convert
 * before it means anything, which is the opposite of what a streak is for.
 *
 * A MONTH HERE IS EXACTLY 30 DAYS, stated rather than assumed. Calendar months
 * are 28 to 31, so any prose form is an approximation of a day count; the honest
 * choice is a fixed divisor that always reconstructs the input — 2 × 30 + 26 is
 * 86 exactly, and a student who counts back finds the same number. A calendar-
 * accurate version would need the streak's start date and would still print a
 * figure that disagrees with the count on the badge beside it.
 *
 * NO YEARS. At 12 months this keeps counting months ("14 months, 3 days")
 * rather than introducing a second approximation on top of the first — twelve
 * 30-day months is 360, not a year, and "1 year" would be wrong by five days in
 * a way "12 months" is not.
 *
 * PURE, AND TAKES THE NUMBER. No storage, no clock, no streak semantics — it
 * formats an integer, so it is equally usable for any day count and can be
 * checked without setting up a streak.
 *
 * @param {number} days A whole number of days
 * @returns {string} e.g. "0 days", "1 day", "30 days", "2 months, 26 days"
 */
export const formatDayCount = (days) => {
  /* Anything that is not a usable count reads as zero rather than as "NaN
     days". The floor also means a fractional input cannot print "1.5 days". */
  if (!Number.isFinite(days) || days <= 0) return plural(0, 'day');

  const whole = Math.floor(days);
  const months = Math.floor(whole / 30);
  const remainder = whole % 30;

  if (months === 0) return plural(remainder, 'day');
  /* An exact multiple of 30 drops the day half entirely: "2 months", never
     "2 months, 0 days". */
  if (remainder === 0) return plural(months, 'month');

  return `${plural(months, 'month')}, ${plural(remainder, 'day')}`;
};

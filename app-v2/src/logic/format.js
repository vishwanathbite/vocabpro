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
// VALIDATION & REFERRAL
// ===========================

/**
 * Generate a referral code from a user's name
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @returns {string} - Unique referral code
 */
export const generateReferralCode = (firstName, lastName) => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  return `${initials}${timestamp}${random}`.toUpperCase();
};

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

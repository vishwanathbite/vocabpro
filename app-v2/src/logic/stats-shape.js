/**
 * The Stats Shape
 * Literary Rides VocabPro - Modular Architecture
 *
 * THE ONE DECLARATION of the gamification stats object.
 *
 * It was written twice — `initializeStats` in gamification.js and the `stats`
 * section of getDefaultState in storage.js — field for field, with a comment on
 * each side telling the reader to edit both. The duplication could not be closed
 * where it stood: gamification.js imports storage.js, so storage.js importing
 * initializeStats back would have made a cycle. This module is the way out. It
 * imports NOTHING and therefore may be imported by anything, including the two
 * modules that disagreed about who owned the shape.
 *
 * A FACTORY, NOT A FROZEN OBJECT. Six of the fields are arrays, and both callers
 * expect a fresh object with fresh arrays on every call — getDefaultState builds
 * a new state on each invocation, and initializeStats is the seed for a new
 * student. Exporting a shared literal would hand two callers the same
 * masteredWordsList, and the first .push would be visible to both.
 *
 * Adding a field here means adding it to STATS_ARRAY_FIELDS in gamification.js
 * too, if the field is an array — that list is what the scorers de-alias against.
 */

/**
 * A fresh default stats object.
 *
 * `referrals` IS GONE, Phase 6 having arrived. It counted invitations for an
 * account system that no longer exists, and nothing in this tree could write it.
 * Dropping a field from the DEFAULTS is not a destructive migration: deepMerge
 * copies unknown keys through, so an old save that carries `referrals: 3` keeps
 * it untouched in storage — it simply stops being minted for new students.
 *
 * The four `idioms*` counters stay for now. They are the same kind of dead, but
 * they are read by the retired-badge guards in gamification.js, so removing them
 * is a separate change with its own blast radius.
 *
 * @returns {Object} Initial statistics, owning its own arrays
 */
export const createDefaultStats = () => ({
  totalPoints: 0,
  correctAnswers: 0,
  totalAnswered: 0,
  currentStreak: 0,
  maxStreak: 0,
  masteredWords: 0,
  learningWords: 0,
  strugglingWords: 0,
  masteredWordsList: [],
  learningWordsList: [],
  strugglingWordsList: [],

  // Smart Review queue: every word answered wrong, until it is answered
  // correctly twice with no wrong in between. Replaces the SM-2 scheduler.
  reviewPool: [],

  modesPlayed: 0,
  modesPlayedList: [],
  level: 1,
  earnedBadges: [],
  lastPlayedDate: null,
  totalSessionTime: 0,
  averageAccuracy: 0,
  idiomsQuizzesCompleted: 0,
  idiomsPerfectScore: 0,
  idiomsDifficultiesCompleted: 0,
  idiomsDifficultiesList: []
});

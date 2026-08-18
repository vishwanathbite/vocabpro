/**
 * Vocabulary data loader.
 *
 * WHY THIS POPULATES GLOBALS RATHER THAN EXPORTING DATA
 *
 * Every logic module reads bare globals — `vocabularyDB`, `acronymsDB`,
 * `oneWordDB` — from inside function bodies, never at module top level. That
 * was deliberate (quiz-generation.js:10, word-of-day.js:75-77,
 * daily-challenge.js:16): it lets those modules import safely when no data is
 * present, and it is what the whole of Phases 3-5a was built against.
 *
 * So this loader assigns onto globalThis. Converting the logic modules to
 * import data directly would touch every one of them for no benefit before
 * Phase 6, when idiom removal reopens them anyway.
 *
 * IDIOMS ARE DELIBERATELY ABSENT. idioms.js was not ported: idioms are being
 * removed entirely at Phase 6 and move to a separate app. `idiomsDB` therefore
 * stays undefined, which every remaining consumer already tolerates — the idiom
 * quiz modes warn and return []. The daily challenge no longer reads it at all:
 * its idiom questions were removed and its 4/3/3 vocabulary plan serves the
 * full 10 on its own.
 *
 * FAILURE IS LOUD, BY DESIGN. Every loader verifies the global is actually
 * populated after the import and rejects if it is not. The js/ tree shipped a
 * loader whose script.onload fired for any response that executed, including an
 * empty one, so it resolved successfully while the global stayed unset — medium
 * and hard vocabulary silently never loaded, and 3,052 of 4,009 words were
 * unreachable from launch until it was caught. A resolved promise must mean the
 * data is there.
 */

/* The shape js/data/index.js built (js/data/index.js:32-36): three difficulty
   keys, each an array, defaulting to empty. Created eagerly and mutated in
   place so that a module holding a reference to vocabularyDB sees later
   difficulties appear — the same contract js/app.js:89 relied on. */
const ensureVocabularyDB = () => {
  if (!globalThis.vocabularyDB) {
    globalThis.vocabularyDB = { easy: [], medium: [], hard: [] };
  }
  return globalThis.vocabularyDB;
};

/* Promise cache, not a result cache: two concurrent callers must share one
   import, not race two. Keyed per dataset. A rejected entry is evicted so a
   later call can genuinely retry rather than replaying the failure forever. */
const pending = new Map();

/**
 * The three vocabulary levels. THE SINGLE SOURCE for the set.
 *
 * EXPORTED in step 12a. quiz-modes.js had grown its own DIFFICULTIES copy of
 * this array in step 11 — the fifth open-coded instance of the three-level
 * shape — and the two must agree: this one decides which levels can be loaded,
 * that one decides which the picker offers, so a level in either and not the
 * other is a row that loads nothing or data nobody can reach.
 *
 * It lives here rather than in the quiz layer because loading is what makes a
 * level real: a value in this array is exactly a key of `importers` below, and
 * loadVocabularyLevel validates against it. 'mixed' is deliberately NOT a member
 * — nothing loads "mixed", it is a selection across these three, and it is
 * defined where it changes behaviour (MIXED in logic/quiz-generation.js).
 */
export const VOCAB_LEVELS = ['easy', 'medium', 'hard'];

/**
 * The cross-level selection. THE SINGLE SOURCE for the string.
 *
 * NOT A LOADABLE LEVEL — loadVocabularyLevel rejects it, deliberately, because
 * nothing imports a "mixed" chunk. It lives here anyway because it is defined
 * entirely in terms of the array above: "mixed" means all of VOCAB_LEVELS, and
 * a marker kept apart from the set it refers to is how the two come to
 * disagree.
 *
 * Keeping it here also keeps quiz-modes.js a pure table. The alternative was
 * defining it beside poolFor in logic/quiz-generation.js, which would have made
 * the mode table import a generator — and with it gamification and storage —
 * to read one string.
 */
export const MIXED = 'mixed';

const importers = {
  easy: () => import('./vocab-easy.js'),
  medium: () => import('./vocab-medium.js'),
  hard: () => import('./vocab-hard.js'),
  acronyms: () => import('./acronyms.js'),
  oneword: () => import('./oneword.js'),
};

/**
 * Run an import once, verify what it produced, and cache the promise.
 *
 * @param {string} key Dataset key, also the cache key
 * @param {() => Promise<void>} apply Assigns the imported data to its global
 * @param {() => boolean} isPopulated Post-import check of the real global
 * @returns {Promise<void>}
 */
const loadOnce = (key, apply, isPopulated) => {
  const cached = pending.get(key);
  if (cached) return cached;

  const promise = (async () => {
    await apply();

    // The check that the js/ loader lacked. An import that resolves is not
    // evidence the data arrived: a stripped chunk, a bad default export or a
    // truncated file all resolve happily.
    if (!isPopulated()) {
      throw new Error(`Data load failed: "${key}" imported but its global is missing or empty`);
    }
  })();

  // Evict on rejection so a retry re-imports instead of replaying the failure.
  promise.catch(() => pending.delete(key));

  pending.set(key, promise);
  return promise;
};

/**
 * Load one vocabulary difficulty into vocabularyDB[level].
 *
 * @param {'easy'|'medium'|'hard'} level
 * @returns {Promise<void>} Rejects if the level is unknown or the data is empty
 */
export const loadVocabularyLevel = (level) => {
  if (!VOCAB_LEVELS.includes(level)) {
    return Promise.reject(new Error(`Unknown vocabulary level: ${level}`));
  }

  return loadOnce(
    `vocab:${level}`,
    async () => {
      const db = ensureVocabularyDB();
      const mod = await importers[level]();
      db[level] = mod.default;
    },
    () => Array.isArray(globalThis.vocabularyDB?.[level]) && globalThis.vocabularyDB[level].length > 0,
  );
};

/**
 * Load the acronyms database into globalThis.acronymsDB.
 * @returns {Promise<void>}
 */
export const loadAcronyms = () =>
  loadOnce(
    'acronyms',
    async () => {
      const mod = await importers.acronyms();
      globalThis.acronymsDB = mod.default;
    },
    () => Array.isArray(globalThis.acronymsDB) && globalThis.acronymsDB.length > 0,
  );

/**
 * Load the one-word substitutes database into globalThis.oneWordDB.
 * @returns {Promise<void>}
 */
export const loadOneWord = () =>
  loadOnce(
    'oneword',
    async () => {
      const mod = await importers.oneword();
      globalThis.oneWordDB = mod.default;
    },
    () => Array.isArray(globalThis.oneWordDB) && globalThis.oneWordDB.length > 0,
  );

/**
 * Load exactly what a first paint needs: easy vocabulary.
 *
 * Word of the Day and the daily challenge both flatten vocabularyDB, so the
 * Learn screen cannot render real content without at least one difficulty.
 * Medium, hard, acronyms and one-word stay unloaded until a screen asks —
 * together they are roughly 1.4 MB of the 1.8 MB total.
 *
 * @returns {Promise<void>}
 */
export const loadInitialData = () => loadVocabularyLevel('easy');

/**
 * Every dataset this app ships, resolved.
 *
 * FOR SEARCH, which is the one feature that must see the WHOLE corpus before it
 * can answer honestly. A quiz mode that loads less serves fewer questions; a
 * search that loads less tells a student the app does not contain a word it
 * does contain, which is a wrong answer rather than a smaller one.
 *
 * NOT A THIRD LOADING PATTERN. These are the same loadOnce-cached promises every
 * other caller awaits — a tap during AppShell's background warm joins the
 * in-flight import rather than racing a second one — composed here instead of at
 * the call site. It lives beside loadInitialData because both are named
 * compositions of the same primitives: that one is "what a first paint needs",
 * this one is "everything".
 *
 * It is deliberately NOT expressed through startQuiz's loadersFor. That maps a
 * QUIZ_MODES row's `datasets` onto loaders, and search has no row; borrowing
 * Smart Review's list would silently re-point search's corpus the day that mode
 * changed its datasets.
 *
 * Promise.all, not allSettled: a search over a partial corpus is the failure
 * this exists to prevent, so one rejection must fail the whole thing and let the
 * caller say so. The loader evicts a rejected entry, making a retry genuine.
 *
 * @returns {Promise<void>} Rejects if any dataset fails to load
 */
export const loadAllData = () =>
  Promise.all([
    ...VOCAB_LEVELS.map(loadVocabularyLevel),
    loadAcronyms(),
    loadOneWord(),
  ]).then(() => undefined);

/**
 * Whether a dataset has been requested in this session. Does not trigger a load.
 * @param {string} key e.g. 'vocab:easy', 'acronyms', 'oneword'
 */
export const isRequested = (key) => pending.has(key);

/** Test seam: drop the promise cache so a suite can re-exercise the loaders. */
export const __resetLoaderCache = () => pending.clear();

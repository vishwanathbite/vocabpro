import { useCallback, useEffect, useRef, useState } from 'react'
import TabBar from './TabBar.jsx'
import LearnScreen from '../screens/LearnScreen.jsx'
import PracticeScreen from '../screens/PracticeScreen.jsx'
import ProgressScreen from '../screens/ProgressScreen.jsx'
import MoreScreen from '../screens/MoreScreen.jsx'
import BookmarksScreen from '../screens/BookmarksScreen.jsx'
import SearchScreen from '../screens/SearchScreen.jsx'
import SettingsScreen from '../screens/SettingsScreen.jsx'
import QuizSession from '../quiz/QuizSession.jsx'
import ResultsScreen from '../quiz/ResultsScreen.jsx'
import FlashcardSession from '../quiz/FlashcardSession.jsx'
import FlashcardSummary from '../quiz/FlashcardSummary.jsx'
import DailyChallengeSession from '../quiz/DailyChallengeSession.jsx'
import { startQuiz } from '../quiz/startQuiz.js'
import { startFlashcards } from '../quiz/startFlashcards.js'
import { startDailyChallenge } from '../quiz/startDailyChallenge.js'
import { isScoredMode, DAILY_MODE } from '../quiz/quiz-modes.js'
import { CHALLENGE_TITLE } from '../quiz/results-copy.js'
import { loadInitialData, loadVocabularyLevel } from '../data/loader.js'
import { DailyGoalsManager } from '../logic/dailygoals.js'
import { awardWeeklyShieldIfDue } from '../logic/gamification.js'
import { bridgeStreakGap } from '../logic/streak-bridge.js'

/**
 * App shell: the active tab's panel plus the bottom tab bar.
 *
 * Tab state is plain React state, not a route — the app has four tabs, not
 * four URLs, so there is no router dependency.
 *
 * Exactly one panel is mounted at a time. The main element carries pb-24
 * (96px) so content can never sit behind the fixed bar, which is at most
 * 48px of button plus padding plus the safe-area inset.
 *
 * STARTUP WORK runs in a mount effect here rather than before createRoot in
 * main.jsx. Blocking the render would mean an unstyled blank page for the
 * duration — React is what draws the loading and error states — and an import
 * failure would leave nothing on screen at all. Running it here also lets the
 * tab bar paint immediately, since the chrome needs no data, and leaves room
 * for a retry affordance. loadInitialData caches its promise, so React 19
 * StrictMode's double-invoked effect still produces a single import.
 */

const SCREENS = {
  learn: LearnScreen,
  practice: PracticeScreen,
  progress: ProgressScreen,
  more: MoreScreen,
}

// One-shot guard for the storage maintenance below. Module scope rather than a
// ref: it is per-session work, not per-component-instance.
let historyCleaned = false

/**
 * Pull medium and hard vocabulary in the background.
 *
 * Fire-and-forget by design — nothing awaits this and no UI state depends on
 * it. Each rejection is logged rather than swallowed, and the loader has
 * already dropped the failed entry from its promise cache, so a later awaited
 * call re-imports rather than replaying a stale failure.
 *
 * Promise.allSettled, not Promise.all: one level failing must not cancel
 * reporting for the other.
 */
const warmRemainingVocabulary = () => {
  Promise.allSettled([loadVocabularyLevel('medium'), loadVocabularyLevel('hard')]).then(
    (results) => {
      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          console.warn(
            `Background load of ${['medium', 'hard'][i]} vocabulary failed; ` +
              'the app continues on easy. It will be retried when a screen needs it.',
            r.reason,
          )
        }
      })
    },
  )
}

/**
 * Sub-screens: a screen reached FROM a tab rather than by tab.
 *
 * NOT A SESSION STATE, and deliberately not modelled like one. `quiz`, `flash`
 * and `daily` replace the shell and take the tab bar with them, because a
 * session has something to lose and a stray tap on Progress would discard it.
 * Bookmarks has nothing to lose — it browses stored data — so it renders INSIDE
 * the shell, keeping the tab bar, and switching tabs simply leaves it.
 */
const SUB_SCREENS = {
  bookmarks: BookmarksScreen,
  /* Search awaits the WHOLE corpus itself rather than relying on the shell's
     boot load, which resolves easy vocabulary only. It is the one screen where a
     partial load yields a wrong answer instead of a smaller one. */
  search: SearchScreen,
  settings: SettingsScreen,
}

export default function AppShell() {
  const [activeTab, setActiveTab] = useState('learn')

  /* Which sub-screen the active tab has opened, or null. Cleared on every tab
     change, so the tab bar always returns to the tab's own root. */
  const [subScreen, setSubScreen] = useState(null)

  /**
   * What shield protection did on this open, or null.
   *
   * HELD BY THE SHELL, NOT BY LEARN, because the bridge runs before Learn
   * exists — see the mount effect. Learn renders it as a line; the shell just
   * carries it. It survives tab switches, which is deliberate: a student who
   * lands on Practice first and reaches Learn a minute later must still be told
   * that shields were spent on their behalf.
   *
   * Cleared only by closing the app. The next open cannot re-report it, because
   * the days it covered now read as protected and the gap search finds nothing.
   */
  const [streakBridge, setStreakBridge] = useState(null)
  const [dataState, setDataState] = useState('loading') // 'loading' | 'ready' | 'error'
  const [dataError, setDataError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  /**
   * The quiz, in all five of its states — one value, not five flags.
   *
   *   null                                     no quiz
   *   { status:'starting', mode }              loaders in flight
   *   { status:'failed', mode, reason }        one of the three typed failures
   *   { status:'running',  mode, difficulty, questions, startedAt }
   *   { status:'complete', mode, difficulty, summary }
   *
   * 'running' and 'complete' each branch the render. The other two are handed
   * straight back down to the launch screens so the message appears under the
   * tile that was tapped, rather than as a banner somewhere else on the page.
   *
   * 'complete' CARRIES mode AND difficulty FORWARD from the running session,
   * and that is what makes "Practise again" possible without re-picking: the
   * difficulty stored here is the RESOLVED one startQuiz returned, so a Mixed
   * session repeats as Mixed rather than falling back to the default.
   */
  const [quiz, setQuiz] = useState(null)

  /**
   * The flashcard session, in its own state value — never inside `quiz`.
   *
   *   null                                          no session
   *   { status:'running',  mode, difficulty, cards, startedAt }
   *   { status:'complete', mode, difficulty, known, unknown }
   *
   * SEPARATE BECAUSE THE FIELD NAMES WOULD OTHERWISE LIE. `quiz` carries
   * `questions`, and a flashcard has no question — no stem, no options, no
   * correct answer. Putting cards in a field called questions would make the
   * shell read as though flashcards were a kind of quiz, which is the exact
   * confusion `scored: false` exists to prevent.
   *
   * The 'starting' and 'failed' states are NOT duplicated here. Both launchers
   * return the same failure shape, both pre-session states are only ever handed
   * back down to the launch screens for LaunchNotice to render under the tapped
   * tile, and that notice keys on mode — so `quiz` holds them for either kind
   * and `flash` only ever holds a session that actually started.
   *
   * MUTUAL EXCLUSION is maintained at the single point where sessions are
   * created: handleStartQuiz clears both before setting either, so there is no
   * ordering in which both become non-null. It is an invariant of that one
   * function rather than of the types — if a second creation site is ever
   * added, it has to clear the other value too.
   */
  const [flash, setFlash] = useState(null)

  /**
   * The daily challenge session, in its own state value — the THIRD, alongside
   * `quiz` and `flash`.
   *
   *   null                                       no challenge
   *   { status:'running',  mode, questions, startedAt }
   *   { status:'complete', mode, summary }
   *
   * SEPARATE FOR THE SAME REASON `flash` IS. `quiz` means "a session startQuiz
   * produced", and the challenge is not one: it has no QUIZ_MODES row, no
   * difficulty, its own generator and its own launcher. Putting it in `quiz`
   * would make every branch that reads quiz.mode or quiz.difficulty have to know
   * about a mode that has neither.
   *
   * Its 'starting' and 'failed' states are NOT here, exactly as for flashcards:
   * both live on `quiz` so the one LaunchNotice can render them under the tile
   * or card that was tapped, keyed on mode.
   */
  const [daily, setDaily] = useState(null)

  /* A second tap while the first launch is in flight would run the loaders and
     the generator twice and leave the loser's questions built for nothing. A
     ref rather than a read of `quiz`, because the guard has to hold within the
     same tick as the tap, before any state has re-rendered. */
  const launchingRef = useRef(false)

  /**
   * THE ONE PLACE A SESSION OF EITHER KIND IS CREATED.
   *
   * Both tiles call this; the mode table decides which launcher runs. The
   * Practice screen does not know there are two, which is what keeps the tile
   * list and the launch behaviour from drifting apart — the same reason
   * `takesDifficulty` rather than a second list decides who gets a picker.
   */
  const handleStartQuiz = useCallback(async ({ mode, difficulty } = {}) => {
    if (launchingRef.current) return
    launchingRef.current = true

    // CLEAR ALL THREE first. This is what makes the branches exclusive:
    // whatever was on screen is gone before any state is set, so no render can
    // see two sessions at once. It became three with the daily challenge —
    // mutual exclusion is an invariant of this one function rather than of the
    // types, so a new session kind has to be cleared here too.
    setQuiz(null)
    setFlash(null)
    setDaily(null)

    /* THE DAILY CHALLENGE IS ITS OWN LAUNCHER, checked before the mode table:
       DAILY_MODE is deliberately absent from QUIZ_MODES, so isScoredMode would
       report false and route it to startFlashcards. It awaits all three
       vocabulary levels and refuses to start a short challenge. */
    if (mode === DAILY_MODE) {
      setQuiz({ status: 'starting', mode })
      try {
        const result = await startDailyChallenge()
        if (!result.ok) {
          setQuiz({ status: 'failed', mode: result.mode, reason: result.reason })
          return
        }
        setQuiz(null)
        setDaily({ status: 'running', ...result, startedAt: Date.now() })
      } finally {
        launchingRef.current = false
      }
      return
    }

    const scored = isScoredMode(mode)

    // The pre-session states live on `quiz` for BOTH kinds — see the note on
    // `flash`. difficulty is carried through so the notice can say what the
    // wait is for; Mixed has its own line.
    setQuiz({ status: 'starting', mode, difficulty })

    try {
      const result = scored
        ? await startQuiz({ mode, difficulty })
        : await startFlashcards({ difficulty })

      if (!result.ok) {
        setQuiz({ status: 'failed', mode: result.mode, reason: result.reason })
        return
      }

      if (scored) {
        setQuiz({ status: 'running', ...result, startedAt: Date.now() })
      } else {
        // Handing the started session to `flash` and releasing `quiz`, so the
        // shell is never holding a 'starting' quiz behind a running card set.
        setQuiz(null)
        setFlash({ status: 'running', ...result, startedAt: Date.now() })
      }
    } finally {
      launchingRef.current = false
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    /* Daily-goals maintenance, once per session. Independent of the data load —
       both calls only touch storage.

       THE ORDER IS LOAD-BEARING AND NOT ALPHABETICAL. syncCompletedDays lifts
       every completed day out of `history` into the never-trimmed streak set;
       cleanupHistory then deletes history days older than 30. Run the other way
       round, the trim would destroy days before the sync could record them, and
       an existing student's streak would be truncated to 30 by the very session
       that was meant to uncap it. The sync must come first, every time. */
    if (!historyCleaned) {
      historyCleaned = true
      try {
        DailyGoalsManager.syncCompletedDays()
      } catch (err) {
        console.warn('Failed to sync completed-day records:', err)
      }

      /* THE WEEKLY GRANT, MOVED HERE FROM LearnScreen's mount effect.
         .
         IT HAS TO SETTLE BEFORE THE BRIDGE, which is the whole reason it moved.
         A student returning after one missed day, holding nothing but due a
         weekly shield, was granted that shield AFTER the bridge had already
         decided it could not afford the gap — so the streak broke and the
         shield arrived a moment too late to have saved it. Granting first means
         the bridge spends what the student is owed on the day they are owed it.
         .
         IT ALSO RUNS IN EXACTLY ONE PLACE NOW. Leaving the Learn call in place
         would not have double-granted — awardWeeklyShieldIfDue stamps
         lastEarned and its own interval test refuses the second call — but two
         callers of a privileged mutation is a hazard resting on that guard
         never being loosened, and the guard is not the point. One caller. */
      try {
        awardWeeklyShieldIfDue()
      } catch (err) {
        console.warn('Failed to check the weekly shield grant:', err)
      }

      /* SHIELD SPENDING, AND IT HAS TO BE HERE — not in LearnScreen's effect.

         This effect body runs before `dataState` becomes 'ready', and Learn
         does not mount until it is. Learn then reads getStreak() in a lazy
         useState initialiser, i.e. during its FIRST RENDER. An effect there
         runs after that render, so bridging from it would paint the broken
         streak and correct it a frame later — a flicker from 0 to 46 on the one
         screen whose job is to reassure. Bridging here means the first number
         Learn ever renders is already the true one.

         AFTER syncCompletedDays, because the gap search reads completedDays and
         that call is what lifts history into it. Before cleanupHistory only for
         readability — the bridge never touches history. */
      try {
        setStreakBridge(bridgeStreakGap())
      } catch (err) {
        console.warn('Failed to check streak protection:', err)
      }

      try {
        DailyGoalsManager.cleanupHistory()
      } catch (err) {
        console.warn('Failed to clean up daily goals history:', err)
      }
    }

    setDataState('loading')
    setDataError(null)

    loadInitialData()
      .then(() => {
        if (cancelled) return
        setDataState('ready')

        // Warm the remaining vocabulary AFTER first paint, never before: the
        // challenge needs all three levels to reach 10 questions, and waiting
        // until the user taps Start would put a ~7s stall on a slow connection
        // at the exact moment they have committed to the action.
        //
        // Chained off the easy load rather than fired alongside it so first
        // paint still requests exactly one data chunk, and so these two never
        // compete with easy for bandwidth on a slow link.
        //
        // Failure here is deliberately NOT escalated to the error state. Easy
        // alone runs the app — Word of the Day, easy quizzes and the whole
        // shell all work — so a full-screen error would be a lie. The loader
        // evicts a rejected entry from its cache, so the promise is not
        // poisoned: 4c's Start handler awaits the same function and will
        // genuinely re-fetch, surfacing the failure where it actually matters.
        warmRemainingVocabulary()
      })
      .catch((err) => {
        if (cancelled) return
        console.error('Vocabulary data failed to load:', err)
        setDataError(err)
        setDataState('error')
      })

    return () => {
      cancelled = true
    }
  }, [retryCount])

  const ActiveScreen = SCREENS[activeTab]
  const SubScreen = subScreen ? SUB_SCREENS[subScreen] : null

  /**
   * A running quiz REPLACES the shell — it is not drawn over it.
   *
   * The tab panel unmounts, which is the point. AppShell mounts exactly one
   * panel at a time and every screen reads its numbers in a lazy useState
   * initialiser, so unmounting and remounting is what makes Learn re-read
   * storage on the way back and show the XP, streak, daily-goal bar and Smart
   * Review count that the session just changed. An overlay would leave the
   * pre-quiz figures sitting behind it, correct-looking and stale.
   *
   * It also removes the tab bar for the duration, so a stray tap on Progress
   * cannot silently discard a session in progress — leaving is the Exit
   * button, which asks first.
   *
   * `key` forces a fresh mount per session: every value in useQuizSession is
   * initialised once per mount, so a second quiz reusing the instance would
   * inherit the first one's index and score.
   */
  if (quiz?.status === 'running') {
    return (
      <QuizSession
        key={quiz.startedAt}
        session={quiz}
        /* FINISHING AND ABANDONING NOW DIVERGE HERE. Both used to be the same
           callback, which is why the shell could not tell them apart.

           The functional update reads the running session rather than closing
           over it, so mode and difficulty are carried forward from whatever is
           actually running — not from a render that may have been captured
           before the session started. */
        onComplete={(summary) =>
          setQuiz((q) => ({
            status: 'complete',
            mode: q.mode,
            difficulty: q.difficulty,
            summary
          }))
        }
        onExit={() => setQuiz(null)}
      />
    )
  }

  /**
   * The results screen REPLACES the quiz, exactly as the quiz replaced the
   * shell — the session subtree unmounts.
   *
   * Safe, and deliberate. Step 12b's drain guarantee means complete() cannot
   * run while a celebration moment is pending, so nothing is destroyed
   * mid-display. And unmounting is what makes "Practise again" clean: every
   * value in useQuizSession initialises once per mount, so a fresh session
   * needs a fresh mount rather than a reset path that would be a second list to
   * keep in step with the initialisers.
   *
   * No tab bar here either, for the same reason the quiz has none: the session
   * just written to storage is the thing on screen, and a stray tap on Progress
   * would discard the one view of it that exists.
   */
  if (quiz?.status === 'complete') {
    return (
      <ResultsScreen
        mode={quiz.mode}
        summary={quiz.summary}
        /* Straight back through the ordinary launcher. It sets 'starting',
           awaits the loaders and stamps a new startedAt, so the replacement
           session gets a new key and therefore a new mount. A typed failure
           lands in 'failed' and falls through to the tab it was launched from,
           which is the existing behaviour for every other launch. */
        onPractiseAgain={() => handleStartQuiz({ mode: quiz.mode, difficulty: quiz.difficulty })}
        onDone={() => setQuiz(null)}
      />
    )
  }

  /**
   * The flashcard branches, reached only when `quiz` is null — see the note on
   * `flash`. Both replace the shell for the same reasons the quiz does: every
   * screen reads its numbers in a lazy initialiser, so unmounting the tab panel
   * is what makes Practice and Progress re-read on the way back, and removing
   * the tab bar stops a stray tap discarding a session in progress.
   */
  if (flash?.status === 'running') {
    return (
      <FlashcardSession
        key={flash.startedAt}
        session={flash}
        onComplete={({ known, unknown }) =>
          setFlash((f) => ({
            status: 'complete',
            mode: f.mode,
            difficulty: f.difficulty,
            known,
            unknown
          }))
        }
        onExit={() => setFlash(null)}
      />
    )
  }

  /**
   * The daily challenge branches. Reached only when `quiz` is null, like the
   * flashcard ones, and replacing the shell for the same reasons: the tab panel
   * unmounts so Learn re-reads its numbers on the way back — which is what makes
   * the challenge card flip to "done" — and the tab bar goes so a stray tap
   * cannot discard a session in progress.
   */
  if (daily?.status === 'running') {
    return (
      <DailyChallengeSession
        key={daily.startedAt}
        session={daily}
        onComplete={(summary) =>
          setDaily((d) => ({ status: 'complete', mode: d.mode, summary }))
        }
        onExit={() => setDaily(null)}
      />
    )
  }

  /**
   * The SAME results screen the quiz uses. The challenge omits the three Smart
   * Review pool fields from its summary rather than passing zeroes, which is
   * what makes that section disappear, and `mode` is what suppresses the
   * "Practise again" button — there is no second attempt at today's challenge.
   */
  if (daily?.status === 'complete') {
    return (
      <ResultsScreen
        mode={daily.mode}
        summary={daily.summary}
        title={CHALLENGE_TITLE}
        /* Never rendered — canPractiseAgain is false for DAILY_MODE — but
           passed rather than omitted so the prop is not undefined if that
           gate ever changes. */
        onPractiseAgain={() => setDaily(null)}
        onDone={() => setDaily(null)}
      />
    )
  }

  if (flash?.status === 'complete') {
    return (
      <FlashcardSummary
        known={flash.known}
        unknown={flash.unknown}
        /* Straight back through the same launcher, which stamps a new
           startedAt and therefore forces a fresh mount — the mode record is a
           once-per-mount write, so a reset rather than a remount would skip it
           on the second session. Flashcards have no equivalent of Smart
           Review's empty pool, so this is never a dead button. */
        onPractiseAgain={() => handleStartQuiz({ mode: flash.mode, difficulty: flash.difficulty })}
        onDone={() => setFlash(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-navy">
      <main id="main-content" className="mx-auto w-full max-w-content px-4 pt-6 pb-24">
        {dataState === 'loading' && (
          <p role="status" className="py-16 text-center text-sm text-slate-400">
            Loading vocabulary…
          </p>
        )}

        {dataState === 'error' && (
          <div role="alert" className="py-16 text-center">
            <p className="text-sm font-medium text-white">Could not load vocabulary</p>
            <p className="mt-1 text-sm text-slate-400">
              {dataError?.message ?? 'Unknown error'}
            </p>
            <button
              type="button"
              onClick={() => setRetryCount((n) => n + 1)}
              className="min-touch mt-4 rounded-lg border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:bg-white/[0.06]"
            >
              Try again
            </button>
          </div>
        )}

        {/* A SUB-SCREEN REPLACES THE TAB PANEL, not the shell — the tab bar
            below stays, so leaving is either its own back button or any tab.
            It is gated on `dataState === 'ready'` with the tab panels rather
            than rendered above them, so the loading and error states still own
            the screen while they apply. Bookmarks would in fact render fine
            with nothing loaded, since every entry embeds its own word data,
            but sitting outside the gate would make it the one screen that
            paints over a failed boot. */}
        {dataState === 'ready' &&
          (SubScreen ? (
            <SubScreen
              onBack={() => setSubScreen(null)}
              onStartQuiz={handleStartQuiz}
              launch={quiz}
            />
          ) : (
            /* Only the launch screens read these; Progress ignores them, and
               More reads onOpen alone. Passing them unconditionally keeps
               SCREENS a plain lookup rather than a table of prop shapes. */
            <ActiveScreen
              onStartQuiz={handleStartQuiz}
              launch={quiz}
              onOpen={setSubScreen}
              streakBridge={streakBridge}
            />
          ))}
      </main>

      <TabBar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setSubScreen(null)
          setActiveTab(tab)
        }}
      />
    </div>
  )
}

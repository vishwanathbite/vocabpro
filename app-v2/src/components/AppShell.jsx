import { useCallback, useEffect, useRef, useState } from 'react'
import TabBar from './TabBar.jsx'
import LearnScreen from '../screens/LearnScreen.jsx'
import PracticeScreen from '../screens/PracticeScreen.jsx'
import ProgressScreen from '../screens/ProgressScreen.jsx'
import MoreScreen from '../screens/MoreScreen.jsx'
import QuizSession from '../quiz/QuizSession.jsx'
import ResultsScreen from '../quiz/ResultsScreen.jsx'
import FlashcardSession from '../quiz/FlashcardSession.jsx'
import FlashcardSummary from '../quiz/FlashcardSummary.jsx'
import { startQuiz } from '../quiz/startQuiz.js'
import { startFlashcards } from '../quiz/startFlashcards.js'
import { isScoredMode } from '../quiz/quiz-modes.js'
import { loadInitialData, loadVocabularyLevel } from '../data/loader.js'
import { DailyGoalsManager } from '../logic/dailygoals.js'

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

export default function AppShell() {
  const [activeTab, setActiveTab] = useState('learn')
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

    // Clear both first. This is what makes the two branches exclusive: whatever
    // was on screen is gone before either state is set, so no render can see a
    // running quiz and a running flashcard session at once.
    setQuiz(null)
    setFlash(null)

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

    // Prune daily-goals history older than 30 days. js/ ran this once from
    // index.html:681; nothing in app-v2 called it, so history grew unbounded.
    // Independent of the data load — it only touches storage.
    if (!historyCleaned) {
      historyCleaned = true
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

        {/* Only the two launch screens read these; Progress and More ignore
            the extra props. Passing them unconditionally keeps SCREENS a plain
            lookup rather than a table of per-screen prop shapes. */}
        {dataState === 'ready' && <ActiveScreen onStartQuiz={handleStartQuiz} launch={quiz} />}
      </main>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

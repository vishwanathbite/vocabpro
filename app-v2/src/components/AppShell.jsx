import { useEffect, useState } from 'react'
import TabBar from './TabBar.jsx'
import LearnScreen from '../screens/LearnScreen.jsx'
import PracticeScreen from '../screens/PracticeScreen.jsx'
import ProgressScreen from '../screens/ProgressScreen.jsx'
import MoreScreen from '../screens/MoreScreen.jsx'
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

        {dataState === 'ready' && <ActiveScreen />}
      </main>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

import { useState } from 'react'
import TabBar from './TabBar.jsx'
import LearnScreen from '../screens/LearnScreen.jsx'
import PracticeScreen from '../screens/PracticeScreen.jsx'
import ProgressScreen from '../screens/ProgressScreen.jsx'
import MoreScreen from '../screens/MoreScreen.jsx'

/**
 * App shell: the active tab's panel plus the bottom tab bar.
 *
 * Tab state is plain React state, not a route — the app has four tabs, not
 * four URLs, so there is no router dependency.
 *
 * Exactly one panel is mounted at a time. The main element carries pb-24
 * (96px) so content can never sit behind the fixed bar, which is at most
 * 48px of button plus padding plus the safe-area inset.
 */

const SCREENS = {
  learn: LearnScreen,
  practice: PracticeScreen,
  progress: ProgressScreen,
  more: MoreScreen,
}

export default function AppShell() {
  const [activeTab, setActiveTab] = useState('learn')
  const ActiveScreen = SCREENS[activeTab]

  return (
    <div className="min-h-screen bg-navy">
      <main
        id="main-content"
        className="mx-auto w-full max-w-content px-4 pt-6 pb-24"
      >
        <ActiveScreen />
      </main>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

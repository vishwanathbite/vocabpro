import { BookOpen, Brain, TrendingUp, Menu } from './icons.jsx'

/**
 * Bottom tab bar.
 *
 * Chrome, so it stays calm: navy surface, one hairline top border, muted
 * inactive items, primary purple reserved for the active tab. No gradients,
 * no glow, no per-tab colour.
 *
 * safe-area-bottom keeps the row clear of the Android gesture bar and the
 * iOS home indicator — this is what that utility was defined for in step 1.
 */

const TABS = [
  { id: 'learn', label: 'Learn', Icon: BookOpen },
  { id: 'practice', label: 'Practice', Icon: Brain },
  { id: 'progress', label: 'Progress', Icon: TrendingUp },
  { id: 'more', label: 'More', Icon: Menu },
]

export default function TabBar({ activeTab, onTabChange }) {
  return (
    <nav
      aria-label="Primary"
      className="safe-area-bottom fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy"
    >
      <ul className="mx-auto flex w-full max-w-content items-stretch">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = id === activeTab
          return (
            <li key={id} className="flex-1">
              <button
                type="button"
                onClick={() => onTabChange(id)}
                aria-current={isActive ? 'page' : undefined}
                className={`min-touch flex w-full flex-col items-center justify-center gap-1 px-1 py-2 transition-colors ${
                  isActive
                    ? 'font-semibold text-primary'
                    : 'font-medium text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon width="22" height="22" />
                <span className="text-xs leading-none">{label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

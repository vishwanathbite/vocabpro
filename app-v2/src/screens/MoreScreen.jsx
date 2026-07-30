import { useState } from 'react'
import BottomSheet from '../components/BottomSheet.jsx'
import { ROW } from '../components/chrome.js'
import { ChevronRight } from '../components/icons.jsx'

/**
 * More tab — five entries: Bookmarks, Search, Settings, About, Literary Rides.
 *
 * THREE ROWS ARE INERT. The Bookmarks, Search and Settings screens do not exist
 * yet, so those carry no onClick, exactly as Practice's tiles and Learn's Start
 * button. Two entries work today because neither needs a new screen: About opens
 * a sheet, and Literary Rides is a real outbound link.
 *
 * SETTINGS IS A ROW, NOT A PANEL. No toggles live here — every setting in
 * settings.js is currently unread by any screen, so putting switches on this tab
 * would ship eleven controls that change nothing.
 *
 * CUT, deliberately absent: Sign In, Share & Earn, referrals.
 *
 * Reads and writes nothing from src/logic/. `sheet` is real UI state, the same
 * pattern Learn uses.
 */

/* Nothing on More is purple. There is no primary action here to earn it. ROW is
   the shared neutral row, moved to components/chrome.js in step 7b. */

/* The three that lead to screens not yet built. About is rendered separately
   below because it is the one row with a working handler. */
const INERT_ROWS = [
  { id: 'bookmarks', name: 'Bookmarks', description: 'The words you have saved to revise later' },
  { id: 'search', name: 'Search', description: "Look up any word in the app's vocabulary" },
  { id: 'settings', name: 'Settings', description: 'Sound, daily goal and display options' },
]

export default function MoreScreen() {
  const [sheet, setSheet] = useState(null) // 'about' | null

  return (
    <div className="flex flex-col gap-2">
      {/* Structure only — the tab bar already names the screen, and Learn set the
          precedent that the top line is not a page title. */}
      <h1 className="sr-only">More</h1>

      {INERT_ROWS.map((row) => (
        <button
          key={row.id}
          type="button"
          aria-label={`${row.name}. ${row.description}.`}
          className={ROW}
        >
          <span className="font-medium text-white">{row.name}</span>
          <ChevronRight width="18" height="18" className="text-slate-400" />
        </button>
      ))}

      <button
        type="button"
        onClick={() => setSheet('about')}
        aria-label="About. The app, its author, and offline use."
        className={ROW}
      >
        <span className="font-medium text-white">About</span>
        <ChevronRight width="18" height="18" className="text-slate-400" />
      </button>

      {/* --- EXTERNAL LINK ---------------------------------------------
          Three things mark this as leaving the app, none of them an icon:

            - NO CARD. The four rows above are bordered cards; this is bare. The
              absence of chrome is the difference, which suits a screen whose
              rule is to stay calm — a louder treatment would have been the
              wrong direction.
            - It is an <a>, not a button, so assistive tech announces "link"
              where the others announce "button".
            - The trailing slot names the DESTINATION DOMAIN where the internal
              rows show a chevron. Naming where a link goes is a clearer signal
              than any glyph, and it meant no new icon had to be ported. */}
      <a
        href="https://literaryrides.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Literary Rides. Opens literaryrides.com in a new tab."
        className="min-touch mt-2 flex w-full items-center justify-between rounded-xl px-4 text-left transition-colors hover:bg-white/[0.03]"
      >
        <span className="font-medium text-white">Literary Rides</span>
        <span className="text-sm text-slate-400">literaryrides.com</span>
      </a>

      <BottomSheet isOpen={sheet === 'about'} onClose={() => setSheet(null)} title="About">
        {/* Content from js/screens.js:1670-1685, minus two lines. The version
            string "2.1.0" is the js/ tree's own and would be wrong here, so it
            is omitted rather than guessed at — app-v2's package.json still reads
            0.0.0. The exam blurb was left out as not part of the approved four
            lines; it is in js/ if it is ever wanted. */}
        <div className="space-y-3 text-sm text-slate-300">
          <p className="font-playfair text-2xl leading-tight font-bold text-white">VocabPro</p>
          <p>Created by Dr. Vishwanath Bite</p>
          <p>Literary Rides</p>
          <p className="border-t border-white/10 pt-3 text-slate-400">
            Works offline after first load.
          </p>
        </div>
      </BottomSheet>
    </div>
  )
}

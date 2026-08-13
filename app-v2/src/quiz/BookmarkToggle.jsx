import { useState } from 'react'
import { Bookmark } from '../components/icons.jsx'
import { BookmarksManager } from '../logic/bookmarks.js'
import { wordIdOf } from '../logic/helpers.js'

/**
 * Save or unsave the word a student is looking at.
 *
 * ONE CONTROL, TWO PLACES. QuizScreen shows it in the answer-result panel and
 * ResultsScreen shows it on each missed word, which are the two moments js/ also
 * offers it — but the markup is this app's, not js/'s: a text-and-icon button on
 * the neutral surface, no pink heart, no backdrop-blur panel.
 *
 * IT SHOWS STATE, NOT JUST AN ACTION. The glyph is filled and the label reads
 * "Saved" when the word is bookmarked, outlined and "Save" when it is not, and
 * `aria-pressed` carries the same fact for assistive technology. A control that
 * only fired would leave a student tapping twice to find out what it had done.
 *
 * LOCAL STATE, SEEDED ONCE FROM STORAGE. The lazy initialiser runs per mount,
 * and every mount site remounts when the word changes: QuizScreen's panel is
 * keyed by the question and ResultsScreen's rows by wordId. Nothing else in the
 * app can change a bookmark while this is on screen, so there is no subscription
 * — the same reasoning every screen's lazy `useState` reads already carry.
 *
 * THE MODE IS RECORDED because addBookmark stores it, but it is only a label on
 * the saved entry: practice rebuilds the question from `wordData` through
 * buildQuestionFromItem, which dispatches on the item's SHAPE. A bookmark saved
 * from a synonym question is practised as whatever its data supports.
 *
 * @param {Object} wordData The stored item — question.wordData, never the question
 * @param {string} [mode]   The mode it was met in, stored as a label
 */
export default function BookmarkToggle({ wordData, mode = 'vocab', className = '' }) {
  const wordId = wordIdOf(wordData)

  const [saved, setSaved] = useState(() => (wordId ? BookmarksManager.isBookmarked(wordId) : false))

  /* Nothing to hang a bookmark on. Rendered as nothing rather than as a dead
     control: toggleBookmark would compute the same undefined id and write an
     entry that could never be found again. Unreachable for every shape this app
     generates — all three carry an identity — so this is a guard, not a case. */
  if (!wordId) return null

  const onToggle = () => {
    // The manager is the single writer, and it returns the resulting state, so
    // this never re-derives what the store already decided.
    setSaved(BookmarksManager.toggleBookmark(wordData, mode))
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${wordId} from saved words` : `Save ${wordId} to practise later`}
      className={`min-touch -ml-2 flex items-center gap-2 rounded-lg px-2 text-sm font-medium transition-colors ${
        saved ? 'text-amber-300 hover:text-amber-200' : 'text-slate-400 hover:text-slate-200'
      } ${className}`}
    >
      <Bookmark width="18" height="18" filled={saved} />
      <span>{saved ? 'Saved' : 'Save'}</span>
    </button>
  )
}

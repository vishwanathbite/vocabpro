import { useState } from 'react'
import { CARD } from '../components/chrome.js'
import { ArrowLeft, Trash } from '../components/icons.jsx'
import { BookmarksManager } from '../logic/bookmarks.js'
import { pluralise } from '../logic/format.js'
import LaunchNotice from '../quiz/LaunchNotice.jsx'

/**
 * The words a student has saved.
 *
 * A SUB-SCREEN OF More, not a tab. It keeps the tab bar — unlike a quiz, which
 * replaces the shell — because this is browsing, not a session: there is nothing
 * to lose by tapping Progress, and removing the bar to protect nothing would
 * strand the student behind a single back button.
 *
 * STATE IS HELD, NOT RE-READ. `loadBookmarks` is called once in a lazy
 * initialiser and every mutation below updates the local list from what the
 * manager returns, so the list on screen is always what was just written.
 * Re-reading storage after each change would work too and would be one more
 * place for the two to disagree.
 *
 * WHAT IT RENDERS PER WORD is whatever the entry actually holds. A bookmark
 * embeds its whole item in `wordData`, so this screen needs no database loaded
 * and works offline and cold — the one screen in the app that does. It also
 * means an entry saved by js/ renders here, including an idiom-shaped one that
 * app-v2 can no longer produce; showing it is what makes it removable.
 */

/* The fields worth showing in a list, per shape, in the order a reader wants
   them. DISPATCHES ON SHAPE for the same reason QuizScreen's detailRows does —
   a bookmark list mixes vocabulary, acronyms and one-word substitutes, and a
   mode-keyed lookup would label an acronym's full form as a definition.

   `.idiom` IS HERE, unlike anywhere else in app-v2's rendering. Nothing in this
   app can create one; js/ can, and the two trees share STORAGE_KEY. An entry
   this screen could not describe would be an untitled row with a delete button,
   which is worse than naming what it is. */
const describe = (wordData) => {
  if (!wordData) return { title: null, body: null, kind: null }
  if (wordData.word) return { title: wordData.word, body: wordData.definition, kind: null }
  if (wordData.acronym) return { title: wordData.acronym, body: wordData.full, kind: 'Acronym' }
  if (wordData.phrase) return { title: wordData.phrase, body: wordData.answer, kind: 'One-word' }
  if (wordData.idiom) return { title: wordData.idiom, body: wordData.meaning, kind: 'Idiom' }
  return { title: null, body: null, kind: null }
}

/**
 * @param {Function} onBack      Return to the More tab
 * @param {Function} onStartQuiz Shell's launcher, for the Practise button
 * @param {Object|null} launch   Shell's quiz state, for the notice under it
 */
export default function BookmarksScreen({ onBack, onStartQuiz, launch }) {
  const [bookmarks, setBookmarks] = useState(() => BookmarksManager.getBookmarks())

  const remove = (id) => {
    BookmarksManager.removeBookmark(id)
    setBookmarks(BookmarksManager.getBookmarks())
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="min-touch -ml-2 flex items-center gap-2 rounded-lg px-2 text-slate-400 transition-colors hover:text-slate-200"
        >
          <ArrowLeft width="20" height="20" />
          <span className="text-sm font-medium">More</span>
        </button>

        {bookmarks.length > 0 && (
          <span className="text-sm text-slate-400 tabular-nums">
            {bookmarks.length} {pluralise(bookmarks.length, 'word')}
          </span>
        )}
      </header>

      <h1 className="font-playfair text-2xl leading-tight font-bold text-white">Saved words</h1>

      {bookmarks.length === 0 ? (
        /* THE EMPTY STATE SAYS HOW TO LEAVE IT. "No saved words" alone would be
           accurate and useless — nothing in the app announces that a bookmark
           control exists, so a student who has never noticed it learns nothing
           from being told the list is empty. No button here: the action is
           somewhere else by nature, and a control that navigated to "any quiz"
           would have to pick one arbitrarily. */
        <p className="text-sm text-slate-400">
          No saved words yet. Answer a question in any quiz and tap{' '}
          <span className="font-medium text-slate-300">Save</span> under the result to keep a word
          here for later.
        </p>
      ) : (
        <>
          {/* The one purple surface on this screen, spent on the action that
              continues practice — the same rule the results screen follows. */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => onStartQuiz({ mode: 'bookmarks' })}
              className="min-touch w-full rounded-xl bg-primary px-4 font-semibold text-white transition-opacity hover:opacity-90"
            >
              Practise saved words
            </button>
            <LaunchNotice launch={launch} mode="bookmarks" />
          </div>

          <ul className="flex flex-col gap-2">
            {bookmarks.map((b) => {
              const { title, body, kind } = describe(b.wordData)
              return (
                <li key={b.id} className={`${CARD} flex items-start gap-3 px-4 py-3`}>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">
                      {/* Falls back to the stored id. An entry whose wordData is
                          missing or a shape this app does not know still names
                          itself and can still be removed. */}
                      {title ?? b.id}
                      {kind && (
                        <span className="ml-2 align-middle text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                          {kind}
                        </span>
                      )}
                    </p>
                    {body && <p className="mt-0.5 text-sm text-slate-400">{body}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={() => remove(b.id)}
                    aria-label={`Remove ${title ?? b.id} from saved words`}
                    className="min-touch -mr-2 flex shrink-0 items-center rounded-lg px-2 text-slate-400 transition-colors hover:text-red-300"
                  >
                    <Trash width="18" height="18" />
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}

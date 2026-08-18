import { useEffect, useMemo, useRef, useState } from 'react'
import { CARD } from '../components/chrome.js'
import { ArrowLeft, Search, X } from '../components/icons.jsx'
import { loadAllData } from '../data/loader.js'
import { detailRows } from '../logic/item-details.js'
import DetailList from '../components/DetailList.jsx'
import { MIN_QUERY_LENGTH, buildCorpus, searchCorpus } from '../logic/search.js'
import BookmarkToggle from '../quiz/BookmarkToggle.jsx'

/**
 * Look up any word in the app.
 *
 * A SUB-SCREEN OF More, keeping the tab bar, for the same reason Bookmarks does:
 * it browses, it holds nothing losable, and removing the bar to protect nothing
 * would strand the student behind one back button.
 *
 * IT AWAITS THE WHOLE CORPUS BEFORE IT WILL SEARCH. This is the one screen where
 * a partial load produces a WRONG ANSWER rather than a smaller one — "no results
 * for Ephemeral" is a statement about the app's vocabulary, and a student has no
 * way to tell it apart from "Hard has not downloaded yet". js/ could read the
 * globals bare because it loaded everything up front; app-v2 lazy-loads, so the
 * same line is a live TypeError here, not a theoretical one.
 *
 * THE WAIT IS NOT A LaunchNotice, and that is a judgment rather than an
 * oversight. LaunchNotice renders AppShell's QUIZ state — it keys on
 * `launch.mode`, reads `launch.status` and looks its copy up in LAUNCH_MESSAGE
 * by a launch `reason`. Search starts no session and has no mode, so using it
 * would mean fabricating a quiz-shaped object to describe a data load. This uses
 * the app's OTHER existing loading style instead: the `role="status"` line
 * AppShell itself renders while the boot load runs. No second notice style is
 * introduced.
 */
export default function SearchScreen({ onBack }) {
  /* 'loading' | 'ready' | 'error' — the same three AppShell's boot uses, and the
     same shape of retry. */
  const [dataState, setDataState] = useState('loading')
  const [retryCount, setRetryCount] = useState(0)

  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [expanded, setExpanded] = useState(null)

  const inputRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    setDataState('loading')

    loadAllData()
      .then(() => {
        if (cancelled) return
        setDataState('ready')
      })
      .catch((err) => {
        if (cancelled) return
        console.warn('Search could not load the full corpus.', err)
        setDataState('error')
      })

    return () => {
      cancelled = true
    }
  }, [retryCount])

  /* Focus once the box is usable. Focusing a disabled input while the corpus
     loads would put the caret somewhere that swallows keystrokes. */
  useEffect(() => {
    if (dataState === 'ready') inputRef.current?.focus()
  }, [dataState])

  /**
   * 300ms, js/'s figure, kept.
   *
   * Kept ON PURPOSE even though this search is local and in-memory, so the
   * debounce is not hiding a network round trip: it is what stops a ~4,000-item
   * scan and a full result re-render running on every keystroke of a fast typist.
   */
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(timer)
  }, [query])

  /* Built ONCE per load, not per query — see logic/search.js. Keyed on
     dataState so it is rebuilt when a retry finally resolves. */
  const corpus = useMemo(
    () => (dataState === 'ready' ? buildCorpus() : []),
    [dataState, retryCount]
  )

  const results = useMemo(
    () => searchCorpus(corpus, debouncedQuery),
    [corpus, debouncedQuery]
  )

  /* Collapse whatever was open when the query moves — the row it referred to is
     probably gone from the new result set. */
  useEffect(() => {
    setExpanded(null)
  }, [debouncedQuery])

  const trimmed = query.trim()

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="min-touch -ml-2 flex items-center gap-2 rounded-lg px-2 text-slate-400 transition-colors hover:text-slate-200"
        >
          <ArrowLeft width="20" height="20" />
          <span className="text-sm font-medium">More</span>
        </button>
      </header>

      <h1 className="font-playfair text-2xl leading-tight font-bold text-white">Search</h1>

      {/* --- THE BOX ------------------------------------------------------
          Disabled until the corpus is there, so a student cannot type into a
          field that would answer wrongly. */}
      <div className="relative">
        <Search
          width="18"
          height="18"
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500"
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={dataState !== 'ready'}
          placeholder="Search words, acronyms and phrases"
          aria-label="Search the vocabulary"
          className={`${CARD} min-touch w-full py-3 pr-10 pl-10 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none disabled:opacity-50`}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute top-1/2 right-1 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-slate-200"
          >
            <X width="18" height="18" />
          </button>
        )}
      </div>

      {/* --- LOADING / ERROR ---------------------------------------------- */}
      {dataState === 'loading' && (
        <p role="status" className="py-8 text-center text-sm text-slate-400">
          Preparing search…
        </p>
      )}

      {dataState === 'error' && (
        <div role="alert" className="py-8 text-center">
          <p className="text-sm font-medium text-white">Could not load the full word list</p>
          {/* States the consequence, not just the failure. Searching a partial
              corpus would report words as missing that are not. */}
          <p className="mt-1 text-sm text-slate-400">
            Search needs every word loaded to answer accurately.
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

      {/* --- RESULTS ------------------------------------------------------- */}
      {dataState === 'ready' && (
        <>
          {trimmed.length > 0 && trimmed.length < MIN_QUERY_LENGTH && (
            <p className="text-sm text-slate-400">Keep typing — enter at least two characters.</p>
          )}

          {debouncedQuery.trim().length >= MIN_QUERY_LENGTH && results.length === 0 && (
            <p className="text-sm text-slate-400">
              No results for &ldquo;{debouncedQuery.trim()}&rdquo;.
            </p>
          )}

          <ul className="flex flex-col gap-2">
            {results.map(({ item, type, difficulty }) => {
              /* Per shape. The title is what the student searched for; the body
                 is the one line that answers "what is it". */
              const title = type === 'vocab' ? item.word : type === 'acronym' ? item.acronym : item.phrase
              const body = type === 'vocab' ? item.definition : type === 'acronym' ? item.full : item.answer
              const tag = type === 'vocab' ? difficulty : type === 'acronym' ? 'Acronym' : 'One-word'

              const id = `${type}:${title}`
              const isOpen = expanded === id
              const rows = isOpen ? detailRows(item) : []

              return (
                <li key={id} className={`${CARD} px-4 py-3`}>
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-3 text-left"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-white">
                        {title}
                        <span className="ml-2 align-middle text-eyebrow font-semibold tracking-wider text-slate-400 uppercase">
                          {tag}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-sm text-slate-400">{body}</span>
                    </span>
                  </button>

                  {isOpen && (
                    <>
                      {/* The item's remaining fields — example, mnemonic, usage,
                          category, explanation. Matched on none of them; shown
                          because this is where a student came to read. */}
                      <DetailList
                        rows={rows}
                        className="mt-3 border-t border-white/10 pt-3"
                      />

                      {/* THE SECOND BOOKMARK SURFACE, which js/ also offers from
                          search. `item` is the ORIGINAL stored object — search
                          never spread it — so what is saved is exactly what a
                          quiz would have saved. */}
                      <div className="mt-2">
                        <BookmarkToggle wordData={item} mode={type} />
                      </div>
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}

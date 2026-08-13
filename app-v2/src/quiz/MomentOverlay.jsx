import { useEffect, useId, useRef } from 'react'

/**
 * One celebration moment, full screen, dismissed by the student.
 *
 * NO TIMER, and no auto-dismiss. See moments.js for the reason: the subtree
 * this renders in unmounts synchronously when the quiz completes, so anything
 * waiting on a clock is destroyed before it paints on the answer where these
 * fire most. Dismissal is the student's tap or key, always.
 *
 * PRESENTATIONAL. It renders the object it is handed and knows nothing about
 * badges, levels, streaks or goals — the copy and the ordering are moments.js's.
 *
 * DELIBERATE PARTIAL OVERLAP WITH BottomSheet, not an oversight. The Escape
 * handler, the scroll lock and the focus move below are the same three
 * behaviours BottomSheet implements, in the same shapes. They are not shared,
 * because sharing them means either extracting a Modal primitive — which would
 * rewrite the four sheets already shipped on Learn, Progress and More — or
 * bending a bottom sheet into a centred celebration, which is the wrong shape
 * for both. What is NOT duplicated is the part that would rot: BottomSheet's
 * general focus trap walks a FOCUSABLE selector list because its content is
 * arbitrary; this panel has exactly one focusable element by construction, so
 * the trap here is two lines and cannot fall out of step with a selector list.
 * If a second focusable control is ever added here, that assumption breaks and
 * the real trap has to come with it.
 *
 * THE BACKDROP DOES NOT DISMISS, unlike BottomSheet's. A moment appears exactly
 * where the "Next Question" button was a moment ago, and a student tapping
 * ahead would blow through a badge they never read. The sheet's backdrop closes
 * something the student opened on purpose; this covers something they did not
 * ask for. One deliberate acknowledgement each.
 */
export default function MomentOverlay({ moment, onDismiss }) {
  const buttonRef = useRef(null)
  const headingId = useId()

  /* Focus the one control, on every moment — not just on mount. Two moments in
     a row reuse this component, and without the key in the dependency list the
     second would render with focus still on the first one's (now unmounted)
     button, which drops focus to <body>. */
  useEffect(() => {
    buttonRef.current?.focus()
  }, [moment.key])

  /* Escape, Enter and Space dismiss; Tab has nowhere to go.

     document, CAPTURE PHASE, and it stops propagation — the same registration
     BottomSheet uses, and for the same reason. QuizScreen binds Escape to the
     exit confirmation and Enter/Space to `next` on window in the BUBBLE phase,
     so without this an Escape here would also open the exit sheet behind the
     overlay, and an Enter would advance the question underneath it. Capture
     runs first and the stopped event never reaches window.

     ENTER AND SPACE ARE HANDLED EXPLICITLY rather than left to the browser
     activating the focused button. Relying on native activation would make
     dismissal depend on focus actually being on the button — true today, but
     silently false the moment anything steals focus, and there is no way to
     notice that from the code. Handling the keys here dismisses from wherever
     focus happens to be.

     preventDefault IS WHAT KEEPS IT TO ONE DISMISSAL. Without it the browser
     would also activate the focused button — Enter on keydown, Space on keyup —
     and fire onDismiss a second time, skipping a queued moment entirely.
     Cancelling the default on keydown suppresses that activation for both keys.

     QuizScreen ALSO guards its handler on the moment being present. Both are
     kept: this one is local and precise, that one holds even for a key this
     listener never sees. */
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        e.stopPropagation()
        onDismiss()
        return
      }
      if (e.key === 'Tab') {
        e.preventDefault()
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [onDismiss])

  /* Lock background scroll, restoring whatever was set before. Same shape as
     BottomSheet's, including the restore — the two never overlap in practice,
     but a naive reset to '' would be wrong if they ever did. */
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  return (
    /* z-70 sits above BottomSheet's z-60 and the sticky quiz header's z-40.
       The backdrop is opaque enough to hide the question behind it: the moment
       is the only thing on screen, which is what makes "one at a time" true
       visually and not just in state. */
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div aria-hidden="true" className="absolute inset-0 bg-navy/90" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-navy px-6 py-8 text-center"
      >
        {/* aria-hidden: the eyebrow is read as part of the heading below via
            aria-labelledby's ordering, and announcing it twice is noise. */}
        <p className="text-eyebrow font-semibold tracking-wider text-slate-400 uppercase">
          {moment.eyebrow}
        </p>

        {/* Emoji only where the data already supplies one — a badge's own icon
            or the streak gauge. Nothing here invents a glyph, and nothing here
            reads LEVEL_CONFIG.badge. */}
        {moment.glyph && (
          <p aria-hidden="true" className="mt-4 text-6xl leading-none">
            {moment.glyph}
          </p>
        )}

        <h2
          id={headingId}
          className={`font-playfair text-2xl leading-tight font-bold text-white ${
            moment.glyph ? 'mt-4' : 'mt-3'
          }`}
        >
          {moment.title}
        </h2>

        {moment.body && <p className="mt-2 text-sm text-slate-300">{moment.body}</p>}

        {/* The one purple surface, and the only focusable element on screen. */}
        <button
          ref={buttonRef}
          type="button"
          onClick={onDismiss}
          className="min-touch mt-6 w-full rounded-xl bg-primary px-4 font-semibold text-white transition-opacity hover:opacity-90"
        >
          {moment.cta}
        </button>
      </div>
    </div>
  )
}

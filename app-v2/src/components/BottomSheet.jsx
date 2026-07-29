import { useEffect, useId, useRef, useState } from 'react'
import { X } from './icons.jsx'

/**
 * Reusable bottom sheet.
 *
 * Used three times on Learn alone, and will be reused on Progress and More.
 *
 * Behaviour:
 *   - slides up from the bottom over a dimmed backdrop
 *   - closes on backdrop tap, close button, and Escape
 *   - traps Tab focus while open, returns focus to the trigger on close
 *   - role="dialog" + aria-modal, labelled by its heading
 *   - locks background scroll while open
 *   - honours prefers-reduced-motion: appears immediately, no slide
 *
 * The slide uses core transform + transition utilities rather than a keyframe
 * animation, so it needs no new @theme token. motion-reduce:transition-none
 * drops the movement when the user asks for reduced motion.
 */
export default function BottomSheet({ isOpen, onClose, title, children }) {
  const panelRef = useRef(null)
  const previouslyFocused = useRef(null)
  const headingId = useId()

  // Drives the enter transition: mount off-screen, then flip on next frame.
  const [entered, setEntered] = useState(false)

  // A timer, not requestAnimationFrame: rAF is tied to compositing and does
  // not fire in a backgrounded or non-compositing page, which would strand the
  // panel at translate-y-full — off-screen and unusable. A timer still fires.
  useEffect(() => {
    if (!isOpen) {
      setEntered(false)
      return
    }
    const id = setTimeout(() => setEntered(true), 0)
    return () => clearTimeout(id)
  }, [isOpen])

  // Remember the trigger, restore focus to it on close.
  useEffect(() => {
    if (!isOpen) return
    previouslyFocused.current = document.activeElement
    return () => {
      const el = previouslyFocused.current
      if (el && typeof el.focus === 'function' && document.contains(el)) el.focus()
    }
  }, [isOpen])

  // Lock background scroll while open, restoring whatever was set before.
  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  // Escape to close, Tab cycles within the panel.
  useEffect(() => {
    if (!isOpen) return

    const FOCUSABLE =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return
      const items = [...panel.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null,
      )
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first || !panel.contains(document.activeElement)) {
          e.preventDefault()
          last.focus()
        }
      } else if (document.activeElement === last || !panel.contains(document.activeElement)) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [isOpen, onClose])

  // Move focus into the sheet once it mounts. Done directly rather than in a
  // requestAnimationFrame callback — the panel already exists when this effect
  // runs, and rAF would not fire in a non-compositing page.
  useEffect(() => {
    if (!isOpen) return
    const panel = panelRef.current
    if (!panel) return
    const target = panel.querySelector('button, [href], input, [tabindex]:not([tabindex="-1"])')
    if (target) target.focus()
    else panel.focus()
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop — tap to close. Escape and the close button are the
          keyboard routes, so this is not focusable. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex={-1}
        className={`safe-area-bottom absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl border-t border-white/10 bg-navy transition-transform duration-300 ease-out motion-reduce:transition-none ${
          entered ? 'translate-y-0' : 'translate-y-full'
        } motion-reduce:translate-y-0`}
      >
        {/* Panel is a bounded flex column: the handle and header stay put and
            only the body scrolls, so the heading and close button remain
            reachable however long the content is. */}
        <div className="mx-auto flex min-h-0 w-full max-w-content flex-col px-4 pt-3 pb-6">
          {/* Grab handle — decorative */}
          <div
            className="mx-auto mb-4 h-1 w-10 shrink-0 rounded-full bg-white/20"
            aria-hidden="true"
          />

          <div className="mb-4 flex shrink-0 items-start justify-between gap-4">
            <h2 id={headingId} className="text-lg font-semibold text-white">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="min-touch -mt-2 -mr-2 flex items-center justify-center rounded-lg text-slate-400 transition-colors hover:text-white"
            >
              <X width="20" height="20" />
            </button>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
        </div>
      </div>
    </div>
  )
}

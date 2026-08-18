/**
 * The celebration queue, owned in one place.
 *
 * EXTRACTED FROM useQuizSession, not written for the daily challenge. The
 * challenge needs the identical behaviour — one moment on screen at a time, a
 * cursor rather than a shifted array, sound keyed on the moment being SHOWN,
 * and a session that cannot end while a moment is pending — and a second copy
 * of that is exactly the duplication the moments design was built to avoid. The
 * quiz hook now calls this too, so there is one implementation and not two that
 * agree today.
 *
 * WHAT STAYS WITH THE CALLER: what to enqueue and when. buildMoments turns
 * scoring output into moments; this owns only the showing of them. The quiz
 * enqueues per answer, the daily challenge once at completion, and neither
 * detail belongs here.
 *
 * A CURSOR, NOT A SHIFTED ARRAY — carried over verbatim from the original.
 * Dismissing by slicing would make the queue change identity on every
 * dismissal, and the sound effect keys off the current moment: a new array
 * reference holding the same remaining moment would replay its sound.
 *
 * NO TIMERS, for the reason moments.js records at length. Completion unmounts
 * the whole subtree synchronously, so a moment held by a setTimeout on the
 * final answer is destroyed before it paints. Every moment is dismissed by the
 * student, and the caller's `next` refuses to advance while `current` is set.
 */

import { useCallback, useEffect, useState } from 'react'
import { SoundManager } from '../logic/sound.js'

/**
 * @returns {Object}
 *   current  The moment on screen, or null
 *   show     Replace the queue and rewind the cursor
 *   dismiss  Advance the cursor. The only way a moment is dismissed
 *   clear    Empty the queue
 */
export function useMomentQueue() {
  const [moments, setMoments] = useState([])
  const [index, setIndex] = useState(0)

  /**
   * Derived, never stored. Two sources of truth for "what is showing" is how a
   * queue ends up rendering one moment while blocking on another.
   */
  const current = moments[index] ?? null

  /* Pulled out as scalars so the sound effect depends on values rather than on
     an object identity it would have to be told to ignore. */
  const key = current?.key ?? null
  const kind = current?.kind ?? null

  /**
   * Sound rides the moment being SHOWN, not the answer being scored.
   *
   * js/ plays each sound beside the setState that reveals it (app.js:1390,
   * 1400), and with a serialised queue those are different instants: a level-up
   * queued behind a badge is heard when the badge is dismissed, not when the
   * answer was given. Playing both at scoring time would stack two fanfares over
   * one another and leave the level-up silent when it finally appears.
   *
   * STREAK AND GOAL ARE SILENT, matching js/ — it plays nothing for either.
   *
   * Keyed on the moment's `key` rather than the object, so a re-render with an
   * equal-but-new object cannot replay. On mount `current` is null, which is why
   * React 19 StrictMode's double-invoked mount effect plays nothing twice; every
   * later run is a genuine dependency change and fires once.
   */
  useEffect(() => {
    if (kind === 'badge') SoundManager.playAchievement()
    else if (kind === 'levelUp') SoundManager.playLevelUp()
  }, [key, kind])

  /* Queue and cursor move together, in one call, so a queue can never be shown
     from an index the previous enqueue left behind. */
  const show = useCallback((next) => {
    setMoments(Array.isArray(next) ? next : [])
    setIndex(0)
  }, [])

  const dismiss = useCallback(() => {
    setIndex((i) => i + 1)
  }, [])

  const clear = useCallback(() => {
    setMoments([])
    setIndex(0)
  }, [])

  return { current, show, dismiss, clear }
}

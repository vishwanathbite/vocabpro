import { LAUNCH_MESSAGE } from './startQuiz.js'

/**
 * The line under a tile that was tapped but has not produced a quiz.
 *
 * ONE COMPONENT, TWO LAUNCH POINTS. Practice and Learn both start Smart Review
 * and both need to say the same things about it; rendering the notice in each
 * screen would put the same three-branch decision in two files and let them
 * drift, which is the failure this codebase keeps recording.
 *
 * NOT AN ERROR SURFACE. No icon, no red, no dismiss control, and the tile above
 * stays live. Two of the three states resolve by tapping again and the third is
 * the student having nothing left to review — none of them is a fault, so none
 * of them is dressed as one. 'starting' gets aria-live="polite" because it
 * announces work in progress; the settled states are read as ordinary text.
 *
 * Renders nothing unless `launch` names THIS mode, so a failure on one tile
 * cannot print itself under another.
 *
 * @param {Object|null} launch AppShell's quiz state
 * @param {string}      mode   The mode id of the tile this sits under
 */
export default function LaunchNotice({ launch, mode }) {
  if (!launch || launch.mode !== mode) return null

  if (launch.status === 'starting') {
    return (
      <p role="status" aria-live="polite" className="px-1 text-sm text-slate-400">
        {LAUNCH_MESSAGE.starting}
      </p>
    )
  }

  if (launch.status !== 'failed') return null

  return <p className="px-1 text-sm text-slate-400">{LAUNCH_MESSAGE[launch.reason]}</p>
}

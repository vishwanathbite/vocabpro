/**
 * The label/value rows detailRows produces, rendered.
 *
 * EXTRACTED AT THE AGREED TRIGGER, and one step later than the data was.
 * item-details.js says "PAIRS, NOT JSX" because its two callers wrapped them
 * differently — but they had already converged: QuizScreen and SearchScreen
 * carried the same <dl>, the same divided <div> per row, the same
 * `dt`/`dd` weights and colours, differing only in the margin above the block.
 * Word of the Day would have been the third copy of that markup, which is the
 * point at which it stops being a coincidence.
 *
 * THE SPACING IS THE PROP, because that is the only thing the callers ever
 * disagreed about: the answer panel sits in a roomy result card and uses 4s,
 * the search row is a denser expander and uses 3s. Passing the whole class
 * string rather than a size token keeps Tailwind's scanner able to see the
 * literals — the same reason chrome.js holds strings rather than assembling
 * them.
 *
 * RENDERS NOTHING FOR AN EMPTY LIST, so no caller needs its own length guard.
 *
 * @param {Array<[string, string]>} rows From detailRows
 * @param {string} [className] Spacing and rule for the block
 */
export default function DetailList({ rows, className = 'mt-4 border-t border-white/10 pt-4' }) {
  if (!rows || rows.length === 0) return null

  return (
    <dl className={`space-y-1.5 text-sm ${className}`}>
      {rows.map(([label, value]) => (
        <div key={label} className="flex gap-2">
          <dt className="shrink-0 font-semibold text-white">{label}:</dt>
          <dd className="text-slate-300">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

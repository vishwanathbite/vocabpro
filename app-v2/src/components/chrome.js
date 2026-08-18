/**
 * Shared surface chrome.
 *
 * Extracted in Phase 5b step 7b, at the agreed trigger: CARD had been copied
 * verbatim into Learn, Practice and More, and Progress would have been the
 * fourth. ROW came with it — Learn's "Continue practising", Practice's tiles and
 * More's rows had all independently composed the identical string.
 *
 * CLASS STRINGS, NOT A WRAPPER COMPONENT. A <Card> component would have meant
 * rewriting every row in three already-shipped screens, and each of those rows
 * composes CARD with its own layout utilities (`${CARD} flex items-center
 * gap-2.5 px-4 py-3`, `${CARD} min-touch mt-1 w-full px-4 py-3`, …). Sharing the
 * strings leaves every composition site untouched and provably identical, which
 * a component could not promise.
 *
 * These are literal strings on purpose: Tailwind v4 scans source text, so a
 * class assembled at runtime would not be generated.
 */

/* Hairline border on navy, no coloured fill. The neutral surface — nothing here
   is ever purple. One purple primary-action zone per screen state is the rule,
   and it is spent on a real action, never on a container. */
export const CARD = 'rounded-xl border border-white/10 bg-white/[0.03]'

/* A full-width tappable CARD row: label left, chevron or trailing value right.
   min-touch keeps it at the 48px floor. */
export const ROW = `${CARD} min-touch flex w-full items-center justify-between px-4 text-left transition-colors hover:bg-white/[0.06]`

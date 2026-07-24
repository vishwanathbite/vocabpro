# VocabPro — App Logic Changes: Full Implementation Brief

**Context:** Three related changes to fix progress persistence, fix a live crash, and
convert the marketing form into a clean opt-in. These are APPLICATION LOGIC changes
(React state, effects, storage, a modal), not data transformations. Each should be a
SEPARATE branch + PR so it can be tested in isolation. Test in the running app after each.

All file/line references below come from a prior code audit and MUST be re-confirmed
against the live files before editing (line numbers drift).

---

## Change 1 — Fix the `StorageManager.updateStats` crash (DO FIRST — quick, isolated)

### Problem
`js/app.js:1352` (idiom / idiom-reverse quiz completion path) calls
`StorageManager.updateStats(newStats)`, but the exported `window.StorageManager`
object in `js/storage.js` (~lines 675–691) defines **no `updateStats` method**.
Result: finishing any idiom or idiom-reverse quiz throws
`TypeError: StorageManager.updateStats is not a function`.

### Fix (choose the approach that matches the real code)
- Inspect how stats are saved elsewhere (the "save current user" effect at
  `js/app.js:506–516` and wherever `stats` is written). Identify the correct,
  existing persistence path.
- Either:
  (a) Add a proper `updateStats(newStats)` method to the `StorageManager` object in
      `storage.js` that writes stats the same way the rest of the app does, OR
  (b) Replace the `app.js:1352` call with the same save mechanism used by the other
      quiz modes (so idiom mode matches vocab/synonym/etc.).
- Prefer whichever makes idiom mode behave IDENTICALLY to the other modes.

### Test checklist
- Complete a normal vocab quiz — stats update, no error (regression check).
- Complete an **idiom** quiz — no TypeError in console, stats update correctly.
- Complete an **idiom-reverse** quiz — same.
- Branch: `fix/idiom-stats-crash`
- Commit: `fix(app): add StorageManager.updateStats so idiom quizzes stop crashing`

---

## Change 2 — Persist gamification stats locally for ALL users (streak protection)

### Problem
Points, answer-streak, badges, and mastered-words (`stats`) only persist when a local
account exists. The save effect at `js/app.js:506–516` is gated `if (currentUser)`, and
`initializeStats()` (`js/gamification.js:213–239`) always returns a hardcoded zeroed
object (never reads storage). So a **guest loses points/streak/badges on every reload**.

(Note: daily-challenge streak, SRS, bookmarks, settings ALREADY persist for everyone —
this change brings gamification stats in line with those.)

### Goal
Every user — signed in or not — keeps their points, answer-streak, badges, and
mastered-words across reloads. No account required. Purely local (localStorage).

### Implementation
1. **Define a stable storage key for guest/global stats**, e.g. `vocabProStats`
   (confirm naming against existing keys to avoid collision; existing keys include
   `vocabProState`, `vocabProUsers`, `vocabProCurrentUser`, etc.).
2. **Persist on change:** add an effect that writes `stats` to localStorage whenever it
   changes, for ALL users (not gated on `currentUser`). If a user IS logged in, keep the
   existing per-account save too (so multi-account still works) — this new effect is the
   guest/global fallback.
3. **Load on init:** change `initializeStats()` (or its caller) to read from
   localStorage first and fall back to the zeroed object only if nothing is stored.
4. **Account interaction:** when a user logs into a local account, the existing
   per-account stats should take precedence (load that account's stats). When no account,
   use the global `vocabProStats`. Decide and document the merge rule clearly:
   - Recommended: guest stats live under `vocabProStats`; account stats live under the
     account (as today). On login, load account stats; on logout/guest, load
     `vocabProStats`. Keep them separate to avoid clobbering.
5. Coordinate with Change 1 — both touch the stats-save path; implement Change 1 first,
   then build this on top so there's one coherent save mechanism.

### Test checklist (critical — this is the core value)
- As a GUEST (never create an account): answer questions, earn points/streak, then
  **reload the page** → points, streak, badges, mastered-words all survive. ✅
- Earn a badge as guest, reload → badge still present.
- Build an answer-streak as guest, reload → streak intact.
- Create a local account after being a guest → confirm no crash, sensible behavior.
- Existing account users → their stats still load correctly (regression).
- Branch: `fix/persist-guest-stats`
- Commit: `feat(app): persist gamification stats locally for all users (protect streaks without sign-up)`

---

## Change 3 — Convert marketing form to skippable email+name opt-in

### Current state
`SignUpModal` (`js/components.js:954`, handler `handleSignUp` at `js/app.js:713–755`)
collects **name, email, WhatsApp, city, state, exam preference** and POSTs to a Google
Apps Script → Google Sheet. It sets `vocabProSignedUp` / `vocabProUserName` /
`vocabProUserEmail`. It does NOT touch stats (confirmed). This is pure lead capture.

### Goal
A clean, OPTIONAL, skippable email + name opt-in ("Get exam prep updates & new features").
Not a gate. Only name + email leave the device, and only if the user submits.

### Implementation
1. **Remove fields** from the modal (`components.js`, form fields ~lines 1009–1086):
   delete WhatsApp number, city, state, exam preference. Keep **name + email** only.
2. **Update the POST** in `handleSignUp` (`app.js:713–755`) to send only name + email to
   the Google Apps Script endpoint. Confirm the Apps Script / Sheet still accepts the
   reduced payload (may need a matching tweak on the Sheet side — flag to user).
3. **Make it skippable:** add a clear "Skip" / "Maybe later" button that closes the modal
   and sends NOTHING. Ensure skipping still lets the user use the full app.
4. **Reframe copy:** make it explicitly optional — e.g. heading "Stay in the loop
   (optional)", subtext "Get exam prep tips and new-feature updates. You can skip this and
   keep using the app fully." No language implying it's required to save progress
   (because after Change 2, progress saves for everyone anyway).
5. **Don't reappear aggressively:** if shown at launch, set a flag so a user who skips
   isn't nagged every session (a `vocabProOptInDismissed` flag or similar).
6. **Decouple from progress:** ensure NOTHING about progress/stats/streak depends on
   this modal. After Change 2, it shouldn't — verify.

### Test checklist
- Open the opt-in → see only Name + Email fields (no WhatsApp/city/state/exam).
- Click Skip → modal closes, nothing sent (check network tab: no POST to script.google.com),
  app fully usable, progress still saving (from Change 2).
- Submit with name + email → POST succeeds, data appears in the Google Sheet with just
  those two fields.
- Skip once → confirm it doesn't nag again next session.
- Branch: `fix/optin-email-name-only`
- Commit: `feat(app): simplify sign-up to optional email+name opt-in, drop phone/location`

---

## Recommended order & why
1. **Change 1 (crash fix)** — isolated, safe, immediate quality win. Merge first.
2. **Change 2 (stats persistence)** — highest value; builds on the fixed save path.
3. **Change 3 (opt-in form)** — depends on Change 2 (so the form no longer implies it
   gates progress); also the one tied to the privacy policy / data safety form.

Each as its own branch + PR, started from a clean `main` (checkout main; pull; new branch).
Test in the running app before committing each.

## What this unlocks downstream (privacy / Play Store)
After Change 3 merges, the app's real data behavior becomes:
- All learning progress, streaks, stats, SRS, bookmarks → LOCAL only (localStorage).
- The ONLY data leaving the device → name + email, and ONLY if the user opts in.
Then the privacy policy + Data safety form can be written to match this precisely
(Personal info: name + email; optional; used for communications; sent to Google Sheets
as processor). Clean, accurate, low-risk.

## Notes for the implementer
- Re-confirm every line number against the live files before editing.
- Keep each PR focused; do not mix the three.
- Do not push to main; branch + PR each.
- The Google Apps Script endpoint may need a matching change to accept the reduced
  payload — flag to the user if so; do not silently break the Sheet write.

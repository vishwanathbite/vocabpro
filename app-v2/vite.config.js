import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/* ---------------------------------------------------------------------------
   WHERE THE APP IS HOSTED — declared exactly once.

   Vite's `base`, the manifest `scope`, the manifest `start_url` and the service
   worker's registration scope all have to agree, and the TWA validates the last
   three. So they are all derived from DEPLOY_BASE rather than written out
   separately anywhere below.

     npm run build              -> '/'          preview deploys at a domain root
     npm run build:ghpages      -> '/vocabpro/' production, replacing the legacy
                                                build at that path

   `vite build` forces NODE_ENV=production regardless of --mode, so the ghpages
   mode is a deploy-path switch only; both commands produce a production build.
   ------------------------------------------------------------------------- */
const DEPLOY_BASE = (mode) => (mode === 'ghpages' ? '/vocabpro/' : '/')

/* The manifest icon set, matching the legacy manifest.json at the repo root
   one-for-one. `src` stays relative — the browser resolves it against the
   manifest's own URL, so these work at any DEPLOY_BASE without being restated.

   This list is also what gets copied into the build (see legacyIcons below), so
   the icon set exists in one place only. */
const MANIFEST_ICONS = [
  { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
  { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
  { src: 'icons/icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
  { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  { src: 'icons/icon-144.png', sizes: '144x144', type: 'image/png' },
  { src: 'icons/icon-96.png', sizes: '96x96', type: 'image/png' },
  { src: 'icons/icon-72.png', sizes: '72x72', type: 'image/png' },
  { src: 'icons/icon-48.png', sizes: '48x48', type: 'image/png' },
  { src: 'icons/apple-touch-icon-180.png', sizes: '180x180', type: 'image/png' },
]

const LEGACY_ICONS_DIR = fileURLToPath(new URL('../icons', import.meta.url))

/* The PNG artwork lives at the repo root in /icons/ and is shared with the
   legacy build. Copying it into app-v2/public/ would leave two sets of icons to
   keep in step, so the build reads the originals and emits them into
   dist/icons/ instead. Emitting during generateBundle means they are on disk
   before vite-plugin-pwa globs dist, so they land in the precache manifest. */
function legacyIcons() {
  return {
    name: 'vocabpro:legacy-icons',
    apply: 'build',
    generateBundle() {
      for (const { src } of MANIFEST_ICONS) {
        this.emitFile({
          type: 'asset',
          fileName: src,
          source: readFileSync(resolve(LEGACY_ICONS_DIR, basename(src))),
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const base = DEPLOY_BASE(mode)

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      legacyIcons(),
      VitePWA({
        /* 'prompt' is what keeps a student mid-quiz from being reloaded: it
           builds the worker without skipWaiting and without clientsClaim, so a
           new worker downloads and installs silently, then sits in `waiting`
           until every tab of the app is closed. The next launch gets the new
           version. 'autoUpdate' would do the opposite — it claims open clients
           and the injected registration reloads the page underneath them.

           No update UI is wired up: nothing imports `virtual:pwa-register`, so
           the callbacks that would drive a prompt are never registered. */
        registerType: 'prompt',
        injectRegister: 'auto',
        manifest: {
          // Matched to the legacy manifest.json so the installed TWA keeps its
          // identity and chrome. `id` in particular must not drift — a changed
          // id makes the browser treat this as a different app.
          id: 'com.literaryrides.vocabpro',
          name: 'Literary Rides VocabPro',
          short_name: 'VocabPro',
          /* 4,800+, NOT the legacy manifest's 5,900+. That figure counted the
             1,116 idioms app-v2 does not ship — idioms.js was never ported — so
             carrying it across field-for-field carried a false claim with it.
             The corpus is 4,809: 4,009 vocabulary words, 300 acronyms, 500
             one-word substitutes. The legacy manifest.json keeps its own figure,
             because it still serves the build that has those idioms.

             THE ONLY CORPUS FIGURE A STUDENT CAN READ. The other one in the tree
             (OnboardingManager.steps) has no renderer. If that changes, or a
             third appears, they should read one exported constant — the corpus
             targets 10,000 within the year and both strings will be edited. */
          description:
            'Master 4,800+ vocabulary items for UPSC, SSC, Banking, Railways & CAT. Free forever.',
          scope: base,
          start_url: base,
          display: 'standalone',
          orientation: 'portrait-primary',
          background_color: '#1e1b4b',
          theme_color: '#7c3aed',
          categories: ['education', 'books'],
          lang: 'en',
          dir: 'ltr',
          prefer_related_applications: false,
          privacy_policy_url: 'https://literaryrides.com/privacy-policy/',
          icons: MANIFEST_ICONS,
        },
        workbox: {
          /* App shell, CSS, self-hosted fonts, icons and all five vocabulary
             chunks. Workbox precaches as one batch — see the note below. */
          globPatterns: ['**/*.{html,js,css,woff2,png,svg}'],
        },
      }),
    ],
  }
})

/* PRECACHE ORDERING — what Workbox actually does.

   generateSW has no way to say "these entries first, those behind them". The
   precache manifest is one flat list; on install Workbox requests all of it in
   parallel and the worker only reaches `installed` once every entry is stored.
   There is no priority, no staging and no partial success.

   What that means in practice: the first visit is served from the network as
   normal — this worker never claims the page that installed it — so the student
   is using the app while the precache fills in behind them, and the shell being
   "first" is not something they can observe. The consequence of the flat list
   is only that offline readiness is all-or-nothing: until the whole precache
   lands, an offline reload has nothing to serve.

   Genuine two-phase caching would mean writing the worker by hand under
   `strategies: 'injectManifest'` — precache the shell and vocab-easy, then warm
   the remaining four chunks from an activate handler. That is a real service
   worker to maintain, so it is not done here. */

/**
 * CUTOVER ONLY — retire the legacy build's caches.
 *
 * WHY THIS FILE EXISTS AT ALL. generateSW writes the whole worker from a
 * template and takes no arbitrary `activate` handler, so custom worker code has
 * exactly one sanctioned entry point under that strategy: `workbox.importScripts`,
 * which the template emits as an importScripts() call at the top of sw.js. That
 * runs in the worker's global scope before precacheAndRoute, so a listener
 * registered here is in place for the activate that follows. Nothing here forces
 * a move to injectManifest — see the note in vite.config.js.
 *
 * WHAT IT DELETES, AND WHAT IT MUST NOT. Workbox only cleans caches it owns
 * (workbox-precache-v2-*), so `vocabpro-v47` — the legacy worker's ~29 precached
 * entries plus its four CDN bundles — would otherwise sit against the origin's
 * quota forever, on a build that can no longer read it. The match is anchored to
 * the `vocabpro-v` prefix the legacy sw.js and index.html both construct, so it
 * cannot touch a Workbox cache, and it deletes ALL versions rather than "all but
 * the current" the way the legacy cleaner did: there is no current one any more.
 *
 * NOT A TOMBSTONE, and it does not unregister anything. app-v2's worker lands at
 * the same script URL and scope as the legacy one, so the browser treats it as
 * an update to the existing registration — there is nothing to unregister, and
 * calling unregister() here would retire the NEW worker.
 *
 * DELETE THIS FILE IN DEPLOY 2, together with the importScripts entry that names
 * it. It is idempotent, so a second run is harmless; it is simply dead weight
 * once no device holds a vocabpro-v* cache.
 */

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys()
      await Promise.all(
        names
          .filter((name) => name.startsWith('vocabpro-v'))
          .map((name) => caches.delete(name))
      )
    })()
  )
})

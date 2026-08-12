/**
 * Service Worker for VocabPro PWA
 *
 * Version 48 - Offline reliability. Two testers reported the app needing a
 * connection despite a service worker that precaches everything; it precached
 * nothing, some of the time, and could not tell.
 *
 *   - Precaching is now PER ASSET. cache.addAll() is atomic: one failed request
 *     rejects the whole call and adds NOTHING. With 29 assets, several of them
 *     megabyte-scale data files, a single blip on a flaky connection left the
 *     cache completely empty. The rejection was caught and only logged, so the
 *     worker installed and activated as if it had succeeded.
 *   - Activation no longer deletes the previous cache unless the new one
 *     actually populated. Before, the empty-cache case above went on to wipe
 *     the last known-good cache, turning a bad install into a broken app.
 *
 * NOTE: CACHE_VERSION below is mirrored by window.VOCABPRO_CACHE_VERSION in
 * index.html (pre-SW cache cleaner). Bump both together or the cleaner will
 * delete the live cache on every page load.
 *
 * The "Version NN" line above is prose and has drifted from CACHE_VERSION
 * before — it read 43 while the constant was 47. CACHE_VERSION is the only one
 * that does anything.
 *
 * Strategy:
 * - Precache all critical assets on install, individually
 * - Cache-first for local assets (fast, reliable offline)
 * - Network-first with cache fallback for CDN resources
 * - Always serve cached index.html for navigation when offline
 */

const CACHE_VERSION = 48;
const CACHE_NAME = `vocabpro-v${CACHE_VERSION}`;

// Critical local assets that MUST be cached for offline use
const PRECACHE_ASSETS = [
  './Literary-Rides.webp',
  './',
  './index.html',
  './manifest.json',
  './js/storage.js?v=40',
  './js/icons.js?v=40',
  './js/utils.js?v=40',
  './js/gamification.js?v=40',
  './js/srs.js?v=40',
  './js/bookmarks.js?v=40',
  './js/dailygoals.js?v=40',
  './js/settings.js?v=40',
  './js/components.js?v=40',
  './js/screens.js?v=40',
  './js/app.js?v=40',
  './js/data/index.js?v=40',
  './js/data/vocab-easy.js?v=40',
  './js/data/vocab-medium.js?v=40',
  './js/data/vocab-hard.js?v=40',
  './js/data/acronyms.js?v=40',
  './js/data/oneword.js?v=40',
  './js/data/idioms.js?v=40',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon-180.png',
  './icons/apple-touch-icon-152.png',
  './privacy.html'
];

// External CDN resources - cached opportunistically
const CDN_ASSETS = [
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.jsdelivr.net/npm/@twind/cdn@1.0.7/cdn.global.js'
];

/**
 * Install event - precache critical assets
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Cache local assets INDIVIDUALLY, not with addAll.
      //
      // cache.addAll() is ATOMIC: per spec it rejects if any single request
      // fails and adds none of them. That is the whole offline bug. There are 29
      // assets here and several are megabyte-scale data files, so on a slow or
      // flaky connection the odds of all 29 succeeding in one shot are not good
      // — and the cost of one failure was all 29. The rejection was then caught
      // and logged, so the worker installed and activated reporting success with
      // an empty cache, which is why this was invisible.
      //
      // Promise.allSettled over individual cache.add() calls: one failure costs
      // exactly that one asset. A partial cache is worth far more than none —
      // most of these are independently useful, and the misses self-heal on the
      // next online load through handleLocalRequest's cache-on-fetch.
      const results = await Promise.allSettled(
        PRECACHE_ASSETS.map(asset => cache.add(asset))
      );

      // Name the failures. "Precached local assets" told us nothing; the whole
      // reason this shipped broken is that a total failure and a total success
      // logged the same way.
      const failed = PRECACHE_ASSETS.filter((_, i) => results[i].status === 'rejected');
      const cached = PRECACHE_ASSETS.length - failed.length;

      console.log(`[SW] Precached ${cached}/${PRECACHE_ASSETS.length} local assets`);
      if (failed.length > 0) {
        console.warn('[SW] Failed to precache:', failed);
      }

      // Cache CDN assets - best effort, don't block install
      for (const url of CDN_ASSETS) {
        try {
          const response = await fetch(url, { mode: 'cors', credentials: 'omit' });
          if (response.ok) {
            await cache.put(url, response);
            console.log('[SW] Cached CDN asset:', url);
          }
        } catch (error) {
          console.warn('[SW] Could not cache CDN asset:', url);
        }
      }

      // Don't auto-skipWaiting — let the client show an update prompt
      // The client can send a 'skipWaiting' message when the user opts to update
      console.log('[SW] Installed, waiting for client activation');
    })()
  );
});

/**
 * Activate event - clean up old caches and claim clients
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // NEVER DISCARD THE LAST KNOWN-GOOD CACHE FOR AN EMPTY NEW ONE.
      //
      // This used to delete every non-current cache unconditionally. Combined
      // with an install that swallowed its own failure, a single bad install
      // did not merely fail to help — it actively destroyed the working offline
      // copy the user already had, and there was no way back without a
      // successful online load. A user whose install blipped went from "works
      // offline" to "needs a connection", permanently, with no signal.
      //
      // index.html is the probe because it is the one asset with no substitute:
      // handleNavigationRequest falls back to it for every route, so a cache
      // without it cannot serve a cold offline start whatever else it holds. It
      // is a proxy for "did precaching do anything", not a claim that the cache
      // is complete.
      //
      // Matched against the NEW cache specifically rather than caches.match(),
      // which searches every cache and would happily find the old one — passing
      // the check by finding exactly what it is meant to be deciding whether to
      // delete.
      const newCache = await caches.open(CACHE_NAME);
      const populated = await newCache.match('./index.html');

      if (!populated) {
        console.warn(
          `[SW] ${CACHE_NAME} has no ./index.html — precaching did not populate it. ` +
          'Keeping previous caches so the app can still work offline. ' +
          'They will be cleaned up on the next activation that populates cleanly.'
        );
      } else {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames
            .filter(name => name.startsWith('vocabpro-') && name !== CACHE_NAME)
            .map(name => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      }

      // Take control of all clients immediately
      await self.clients.claim();
      console.log('[SW] Activated and claimed clients');
    })()
  );
});

/**
 * Fetch event - serve from cache with network fallback
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle navigation requests (HTML pages)
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(handleNavigationRequest(request));
    return;
  }

  // Handle same-origin requests (local assets)
  if (url.origin === self.location.origin) {
    event.respondWith(handleLocalRequest(request));
    return;
  }

  // Handle CDN/external requests
  event.respondWith(handleExternalRequest(request));
});

/**
 * Handle navigation requests
 * Always try to serve from network, fallback to cached index.html
 */
async function handleNavigationRequest(request) {
  try {
    // Try network first for HTML
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache the response for future offline use
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    // Network failed, fall through to cache
    console.log('[SW] Network failed for navigation, using cache');
  }

  // Try to serve from cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Fallback to cached index.html for SPA routing
  const indexResponse = await caches.match('./index.html');
  if (indexResponse) {
    return indexResponse;
  }

  // Last resort - try root
  const rootResponse = await caches.match('./');
  if (rootResponse) {
    return rootResponse;
  }

  // Nothing cached - return offline page
  return new Response(getOfflinePage(), {
    headers: { 'Content-Type': 'text/html' }
  });
}

/**
 * Handle local (same-origin) requests
 * Cache-first strategy for fast offline performance
 */
async function handleLocalRequest(request) {
  // Try cache first
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    // Optionally refresh cache in background (stale-while-revalidate)
    refreshCache(request);
    return cachedResponse;
  }

  // Not in cache, try network
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    return networkResponse;
  } catch (error) {
    // Network failed and not in cache
    console.warn('[SW] Request failed:', request.url);

    // Data files carry the vocabulary itself. An empty 200 here would execute
    // fine, fire the loader's onload and leave it with no data — a silent
    // failure the user sees as "No words available for this difficulty".
    // Return a real error so the loader's onerror path fires instead.
    const isDataFile = new URL(request.url).pathname.includes('/js/data/');

    // For other JS, an empty response still degrades more gracefully than a
    // hard failure — a missing UI module should not take the whole app down.
    if (request.destination === 'script' && !isDataFile) {
      return new Response('/* offline */', {
        headers: { 'Content-Type': 'application/javascript' }
      });
    }

    return new Response('Offline', { status: 503 });
  }
}

/**
 * Handle external (CDN) requests
 * Network-first with cache fallback
 */
async function handleExternalRequest(request) {
  // Try network first for CDN resources
  try {
    const networkResponse = await fetch(request, {
      mode: 'cors',
      credentials: 'omit'
    });

    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    // Network failed, fall through to cache
    console.log('[SW] CDN request failed, trying cache:', request.url);
  }

  // Try cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // CDN unavailable and not cached
  console.error('[SW] CDN resource unavailable:', request.url);
  return new Response('/* CDN unavailable */', {
    status: 503,
    headers: { 'Content-Type': 'application/javascript' }
  });
}

/**
 * Refresh cache in background (stale-while-revalidate)
 */
async function refreshCache(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse);
    }
  } catch (error) {
    // Silently fail - we already served from cache
  }
}

/**
 * Generate offline fallback page
 */
function getOfflinePage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VocabPro - Offline</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #581c87 0%, #1e3a8a 50%, #312e81 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: white;
      padding: 20px;
    }
    .container {
      text-align: center;
      max-width: 400px;
    }
    .emoji { font-size: 4rem; margin-bottom: 1rem; }
    h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    p { opacity: 0.8; margin-bottom: 1.5rem; }
    button {
      padding: 12px 24px;
      background: #7c3aed;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      margin: 0.5rem;
      min-height: 44px;
    }
    button:hover { background: #6d28d9; }
    button:active { transform: scale(0.98); }
    .secondary { background: #4f46e5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="emoji">📴</div>
    <h1>You're Offline</h1>
    <p>VocabPro needs an internet connection to load for the first time. Once loaded, it works offline!</p>
    <button onclick="location.reload()">Try Again</button>
    <button class="secondary" onclick="clearAndReload()">Clear Cache & Reload</button>
  </div>
  <script>
    async function clearAndReload() {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) await reg.unregister();
        const keys = await caches.keys();
        for (const key of keys) await caches.delete(key);
      } catch (e) {}
      location.reload(true);
    }
  </script>
</body>
</html>`;
}

/**
 * Message handler for cache updates
 */
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }

  if (event.data === 'getVersion') {
    event.ports[0].postMessage({ version: CACHE_VERSION, cacheName: CACHE_NAME });
  }
});

/**
 * Background sync for offline actions (placeholder for future use)
 */
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress());
  }
});

async function syncProgress() {
  // Future: sync any pending data when back online
  console.log('[SW] Background sync triggered');
}

/**
 * Push notification support (for future use)
 */
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Time to practice your vocabulary!',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📚</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📚</text></svg>',
    vibrate: [100, 50, 100],
    tag: 'vocabpro-notification',
    renotify: true,
    data: {
      dateOfArrival: Date.now(),
      url: './'
    }
  };

  event.waitUntil(
    self.registration.showNotification('VocabPro', options)
  );
});

/**
 * Notification click handler
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Focus existing window if open
        for (const client of clientList) {
          if (client.url.includes('vocabpro') && 'focus' in client) {
            return client.focus();
          }
        }
        // Otherwise open new window
        return clients.openWindow(event.notification.data?.url || './');
      })
  );
});

console.log(`[SW] VocabPro Service Worker v${CACHE_VERSION} loaded`);

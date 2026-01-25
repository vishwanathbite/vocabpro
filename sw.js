/**
 * Service Worker for VocabPro PWA
 * Version 16 - Robust offline-first caching
 *
 * Strategy:
 * - Precache all critical assets on install
 * - Cache-first for local assets (fast, reliable offline)
 * - Network-first with cache fallback for CDN resources
 * - Always serve cached index.html for navigation when offline
 */

const CACHE_VERSION = 16;
const CACHE_NAME = `vocabpro-v${CACHE_VERSION}`;

// Critical local assets that MUST be cached for offline use
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './js/storage.js',
  './js/icons.js',
  './js/utils.js',
  './js/gamification.js',
  './js/srs.js',
  './js/bookmarks.js',
  './js/dailygoals.js',
  './js/settings.js',
  './js/components.js',
  './js/screens.js',
  './js/app.js',
  './js/data/index.js',
  './js/data/vocab-easy.js',
  './js/data/vocab-medium.js',
  './js/data/vocab-hard.js',
  './js/data/acronyms.js',
  './js/data/oneword.js'
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

      // Cache local assets - these MUST succeed
      try {
        await cache.addAll(PRECACHE_ASSETS);
        console.log('[SW] Precached local assets');
      } catch (error) {
        console.error('[SW] Failed to precache local assets:', error);
        // Don't throw - allow SW to install even if some assets fail
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

      // Activate immediately without waiting for old SW to stop
      await self.skipWaiting();
      console.log('[SW] Installed and skipped waiting');
    })()
  );
});

/**
 * Activate event - clean up old caches and claim clients
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Delete all caches that don't match current version
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => name.startsWith('vocabpro-') && name !== CACHE_NAME)
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );

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

    // For JS files, return empty response to prevent breaking the app
    if (request.destination === 'script') {
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

/**
 * Service Worker for VocabPro PWA
 * Enables offline functionality and caching
 */

const CACHE_NAME = 'vocabpro-v10';

// Use relative paths for GitHub Pages compatibility
const CACHE_URLS = [
  './',
  './index.html',
  './js/icons.js?v=10',
  './js/utils.js?v=10',
  './js/gamification.js?v=10',
  './js/srs.js?v=10',
  './js/bookmarks.js?v=10',
  './js/dailygoals.js?v=10',
  './js/settings.js?v=10',
  './js/components.js?v=10',
  './js/screens.js?v=10',
  './js/app.js?v=10',
  './js/data/index.js?v=10',
  './js/data/vocab-easy.js?v=10',
  './js/data/vocab-medium.js?v=10',
  './js/data/vocab-hard.js?v=10',
  './js/data/acronyms.js?v=10',
  './js/data/oneword.js?v=10'
];

// External CDN resources
const CDN_URLS = [
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.tailwindcss.com'
];

// Install event - cache all resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Cache local files
        return cache.addAll(CACHE_URLS);
      })
      .then(() => {
        // Try to cache CDN resources (may fail due to CORS)
        return caches.open(CACHE_NAME).then((cache) => {
          return Promise.all(
            CDN_URLS.map((url) => {
              return fetch(url, { mode: 'cors' })
                .then((response) => {
                  if (response.ok) {
                    return cache.put(url, response);
                  }
                })
                .catch(() => {
                  // Could not cache CDN resource
                });
            })
          );
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version
          return cachedResponse;
        }

        // Fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200) {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the fetched resource
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Offline fallback for HTML pages
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }
          });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress());
  }
});

async function syncProgress() {
  // Sync any pending data when back online
}

// Push notification support (for future use)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New word of the day available!',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📚</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📚</text></svg>',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('VocabPro', options)
  );
});

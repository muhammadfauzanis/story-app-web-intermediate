const CACHE_NAME = 'app-shell-v1';
const APP_SHELL = [
  '/',
  '/index.html',
  '/styles/styles.css',
  '/scripts/index.js',
  '/favicon.png',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});

// Push event: show notification
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');

  let data = { title: 'Notifikasi', options: { body: 'Pesan masuk!' } };

  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (e) {
    console.error('[Service Worker] Error parsing push data:', e);
    data = {
      title: 'Push Error',
      options: { body: 'Format push tidak valid.' },
    };
  }

  console.log('[Service Worker] Showing notification:', data);

  event.waitUntil(self.registration.showNotification(data.title, data.options));
});

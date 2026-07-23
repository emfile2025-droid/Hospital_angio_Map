// Service Worker Ver 1.2
// ネットワーク優先（オフライン時はキャッシュ表示）の戦略

const CACHE_NAME = 'angio-app-v3';
const urlsToCache = [
  './index.html',
  './angio_dashboard_lowread.html',
  './manifest.json',
  './apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)));
    })
  );
});

self.addEventListener('fetch', (event) => {
  // ネットワークを優先し、だめならキャッシュを使う
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

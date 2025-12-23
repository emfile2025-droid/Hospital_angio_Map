// Service Worker Ver 1.0
// ネットワーク優先（オフライン時はキャッシュ表示）の戦略

const CACHE_NAME = 'angio-app-v1';
const urlsToCache = [
  './index.html',
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

self.addEventListener('fetch', (event) => {
  // ネットワークを優先し、だめならキャッシュを使う
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
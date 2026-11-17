const CACHE_NAME = 'miei-libri-v1';
const ASSETS = [
  './',
  './index.html',
  './viewer.html',
  './home.css',
  './manifest.webmanifest',
  './search-index.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './Arte e Immagine.html',
  './Educazione civica.html',
  './Educazione fisica.html',
  './Geografia.html',
  './Inglese.html',
  './Italiano.html',
  './Matematica.html',
  './Musica.html',
  './Religione.html',
  './Scienze.html',
  './Storia.html',
  './Tecnologia e Informatica.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        if (event.request.method === 'GET' && response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});
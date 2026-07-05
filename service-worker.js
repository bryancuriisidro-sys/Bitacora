const CACHE_NAME = 'bitacora-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

// Estrategia simple: intenta la red primero, y si falla (sin internet),
// devuelve lo que haya en caché. No guarda nada de forma agresiva,
// porque Bitácora necesita datos frescos de Supabase para funcionar bien.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

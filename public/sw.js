// Service Worker básico para evitar errores
const CACHE_NAME = 'weblisy-cache-v1';

self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalado');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Solo manejar peticiones GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Para desarrollo, no usar cache
  if (event.request.url.includes('localhost') || event.request.url.includes('127.0.0.1')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // Si falla la red, intentar usar cache
        return caches.match(event.request);
      })
  );
}); 
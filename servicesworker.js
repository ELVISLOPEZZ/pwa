const CACHE_NAME = 'coffe-pwa-v5';

const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './css/style.css',
    './javascript/app.js',
    './javascript/detalle.html',
    './javascript/detalle.js',

    // Imágenes de los cafés
    './images/expreso.jpeg',
    './images/cafe-capuchino.jpeg',
    './images/cafe-latte.jpg',
    './images/cafe-americano.jpeg',
    './images/cafe-mocha.jpeg',
    './images/cafe-macchiato.jpeg',

    // Imagen general
    './images/coffee.jpg',

    // Íconos
    './images/icons/icon-48x48.png',
    './images/icons/icon-72x72.png',
    './images/icons/icon-152x152.png',
    './images/icons/icon-192x192.png',
    './images/icons/icon-256x256.jpeg',
    './images/icons/icon-384x384.jpeg',
    './images/icons/icon-512x512.jpeg',
    './images/icons/icon-720x720.jpeg',
    './images/icons/icon-790x790.jpeg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Evento Fetch optimizado para manejar rutas con parámetros sin conexión
self.addEventListener('fetch', event => {
    const requestURL = new URL(event.request.url);

    // Si es una petición HTML (incluyendo páginas de detalle con parámetros ?id=...)
    if (event.request.mode === 'navigate' || requestURL.pathname.endsWith('.html') || requestURL.pathname.endsWith('/')) {
        event.respondWith(
            fetch(event.request)
                .then(networkResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    // Si no hay red, intentamos buscar la página exacta en el caché
                    return caches.match(event.request).then(cachedResponse => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        // Si falla (por ejemplo, por los parámetros de la URL), devolvemos el detalle.html base
                        if (requestURL.pathname.includes('detalle.html')) {
                            return caches.match('./javascript/detalle.html');
                        }
                        // O el index principal como respaldo general
                        return caches.match('./index.html');
                    });
                })
        );
        return;
    }

    // Estrategia Cache-First para recursos estáticos (imágenes, CSS, JS)
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request).then(networkResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
    );
});

const CACHE_NAME = 'coffe-pwa-v4';

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

// Evento Fetch con estrategia híbrida (Network-First para HTML y Cache-First para recursos estáticos)
self.addEventListener('fetch', event => {
    const requestURL = new URL(event.request.url);

    // 1. ESTRATEGIA NETWORK-FIRST PARA HTML / NAVEGACIÓN
    // Si el usuario solicita una página HTML, intentamos traerla de la red primero.
    if (event.request.mode === 'navigate' || requestURL.pathname.endsWith('.html') || requestURL.pathname.endsWith('/')) {
        event.respondWith(
            fetch(event.request)
                .then(networkResponse => {
                    // Si la red responde, actualizamos el caché de forma dinámica y devolvemos la respuesta
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    // Si falla la red (sin internet), buscamos en el caché
                    return caches.match(event.request);
                })
        );
        return;
    }

    // 2. ESTRATEGIA CACHE-FIRST PARA RECURSOS ESTÁTICOS (Imágenes, CSS, JS)
    // Para el resto de archivos, buscamos primero en el caché para mayor velocidad.
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse; // Encontrado en caché
                }
                // Si no está en caché, lo descargamos de la red y lo guardamos
                return fetch(event.request).then(networkResponse => {
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
    );
});
const CACHE_NAME = 'coffe-pwa-v1';

const urlsToCache = [
    './index.html',
    './app.js',
    './detalle.html',
    './detalle.js',
    './manifest.json',
    '../css/style.css',
    '../images/coffee.jpg',
    '../images/icons/icon-48x48.png',
    '../images/icons/icon-72x72.png',
    '../images/icons/icon-152x152.png',
    '../images/icons/icon-192x192.png',
    '../images/icons/icon-256x256.jpeg',
    '../images/icons/icon-384x384.jpeg',
    '../images/icons/icon-512x512.jpeg'
];

// Evento de Instalación
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
            .catch(err => console.log('Error al cachear:', err))
    );
});

// Evento de Activación
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
        })
    );
});

// Evento Fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
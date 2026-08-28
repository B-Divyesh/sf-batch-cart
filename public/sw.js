const VERSION = 'batch-cart-v7';
const SHELL = ['/', '/demo', '/offline.html', '/offline.css', '/manifest.webmanifest', '/favicon.svg', '/hero-glass.webp', '/hero-glass-600.webp', '/social-card.webp', '/icons/icon-192.png', '/icons/icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    const response = await fetch('/');
    const html = await response.clone().text();
    const builtAssets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(match => match[1]);
    await cache.put('/', response);
    await cache.addAll([...SHELL.filter(path => path !== '/'), ...builtAssets]);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== VERSION).map(key => caches.delete(key)))),
    self.clients.claim(),
  ]));
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      caches.open(VERSION).then(cache => cache.put(request, response.clone()));
      return response;
    }).catch(async () => (await caches.match(request, { ignoreSearch: true, ignoreVary: true })) || (await caches.match('/', { ignoreVary: true })) || caches.match('/offline.html', { ignoreVary: true })));
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(request, { ignoreVary: true });
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(VERSION);
      await cache.put(request, response.clone());
    }
    return response;
  })());
});

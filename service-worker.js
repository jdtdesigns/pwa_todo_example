self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('my-cache').then(function (cache) {
      return cache.addAll([
        '/index.html',
        '/style.css',
        '/script.js',
        '/icon-192x192.png',
        '/icon-512x512.png'
      ]);
    })
  );
});

// Network First
self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).then(function (response) {
      return caches.open('cache').then(function (cache) {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch(function () {
      return caches.match(event.request);
    })
  );
});

// Cache First
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
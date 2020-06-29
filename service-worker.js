const cacheName = "my-cache-v1";
const assets = [
  "stopwatch-pwa/",
  "stopwatch-pwa/index.html",
  "stopwatch-pwa/style.css",
  "stopwatch-pwa/app.js",
  "stopwatch-pwa/manifest.json",
  "stopwatch-pwa/images/icons/favicon.ico",
  "https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap",
  "https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxIIzIXKMny.woff2",
];
//
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((res) => {
      return res || fetch(evt.request);
    })
  );
});

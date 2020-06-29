const cacheName = "my-cache-v1";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/images/icons/favicon.ico",
  "https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap",
  "https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1MmgVxIIzIXKMny.woff2",
];
//
self.addEventListener("install", (evt) => {
  console.log("Caching all assets");

  evt.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (evt) => {
  //console.log("Activated", evt);
  evt.waitUntil(
    caches.keys().then((keys) => {
      console.log(keys);

      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (evt) => {
  // console.log("Fetch event", evt);
  evt.respondWith(
    caches.match(evt.request).then((res) => {
      return res || fetch(evt.request);
    })
  );
});

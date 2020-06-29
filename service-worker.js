const cacheName = "my-cache";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/images/icons/favicon.ico",
  "https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap",
];

self.addEventListener("install", (evt) => {
  console.log("Caching all assets");

  evt.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (evt) => {
  console.log("Activated", evt);
});

self.addEventListener("fetch", (evt) => {
  // console.log("Fetch event", evt);
  evt.respondWith(
    caches.match(evt.request).then((res) => {
      return res || fetch(evt.request);
    })
  );
});

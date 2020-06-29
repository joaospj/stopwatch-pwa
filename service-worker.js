self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll(["./index.html", "./style.css", "./app.js"]);
    })
  );
});

self.addEventListener("activate", (evt) => {
  console.log("Activated", evt);
});

self.addEventListener("fetch", (evt) => {
  console.log("Fetch event", evt);
});

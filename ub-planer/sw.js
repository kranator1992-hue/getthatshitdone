// Service Worker des UB-Planers. Geltungsbereich: nur dieser Unterordner.
const CACHE = "ubplaner-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;

  if(req.mode === "navigate"){
    e.respondWith(caches.match("./index.html").then(r => r || fetch(req)));
    return;
  }

  e.respondWith(
    caches.match(req).then(hit => {
      if(hit) return hit;
      return fetch(req).then(res => {
        if(res && res.ok && res.type === "basic"){
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
    })
  );
});

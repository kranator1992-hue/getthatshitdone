// Service Worker der WOCHENLISTE. Gehoert ins Hauptverzeichnis.
// Diese Datei hat Geltung fuer die gesamte Seite, also auch fuer Unterordner
// wie /ub-planer/. Der Zweig fuer Seitenaufrufe greift deshalb nur fuer die
// Wochenliste selbst; alles andere wird durchgelassen.
const CACHE = "wochenliste-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

const SCOPE_PATH = new URL(self.registration.scope).pathname;

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
    const rest = new URL(req.url).pathname.slice(SCOPE_PATH.length);
    // Nur das Hauptverzeichnis selbst bedienen, keine Unterordner.
    if(rest !== "" && rest !== "index.html") return;
    e.respondWith(caches.match("./index.html").then(r => r || fetch(req)));
    return;
  }

  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).catch(() => hit))
  );
});

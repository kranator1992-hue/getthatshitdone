// Aufraeumen. Diese Datei ersetzt den alten Service Worker im Hauptverzeichnis.
// Sie speichert nichts mehr zwischen, loescht die alten Caches der Wochenliste
// und hebt danach ihre eigene Registrierung auf. Der Geltungsbereich des
// Hauptverzeichnisses ist damit frei, sodass die Apps in den Unterordnern
// jede fuer sich installiert werden koennen.
const ALT = ["wochenliste-v1", "wochenliste-v2"];

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => ALT.indexOf(k) > -1).map(k => caches.delete(k)));
    await self.registration.unregister();
  })());
});

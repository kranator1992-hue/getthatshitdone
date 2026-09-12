# Wochenliste

Offline-fähige To-do-App für die Woche, sortiert nach Priorität (hoch / mittel / gering).

## Dateien

- `index.html` – die komplette App (Layout, Logik, Stil in einer Datei)
- `sw.js` – Service Worker, macht die App offline verfügbar
- `manifest.webmanifest` – damit Android sie als App installiert
- `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` – Startsymbol

Alle Pfade sind relativ. Der Ordner funktioniert also auch in einem Unterverzeichnis.

## Veröffentlichen

Ein Service Worker braucht HTTPS. Die Dateien müssen deshalb einmal auf einem
Webserver liegen – danach läuft die App dauerhaft ohne Netz.

**GitHub Pages**

1. Auf github.com ein neues, öffentliches Repository anlegen.
2. Die Dateien aus diesem Ordner hochladen (Add file → Upload files).
3. Settings → Pages → Source: „Deploy from a branch“, Branch `main`, Ordner `/root`.
4. Nach ein bis zwei Minuten liegt die App unter
   `https://DEINNAME.github.io/REPONAME/`.

## Auf dem Handy installieren

1. Die Adresse in Chrome auf dem Pixel öffnen.
2. Menü (⋮) → „Zum Startbildschirm hinzufügen“ bzw. „App installieren“.
3. Die App einmal öffnen, solange noch Netz da ist. Dabei legt der Service
   Worker seinen Zwischenspeicher an.
4. Danach funktioniert sie im Flugmodus genauso.

## Daten

Die Liste liegt in `localStorage` – also ausschließlich auf dem Gerät.
Kein Server, kein Konto, keine Synchronisation zwischen Geräten.

Wenn du die App deinstallierst oder in Chrome die Website-Daten löschst,
ist die Liste weg. Unten in der App gibt es deshalb „Sicherung herunterladen“
und „Sicherung einlesen“ (JSON-Datei).

## Ändern

Farben stehen als CSS-Variablen am Anfang von `index.html` unter `:root`
(und in der `prefers-color-scheme: dark`-Variante darunter).

Wenn du `index.html` oder `sw.js` änderst, erhöhe in `sw.js` die Zeile
`const CACHE = "wochenliste-v1";` auf `-v2`, `-v3` usw. Sonst liefert der
Zwischenspeicher weiter die alte Fassung aus.

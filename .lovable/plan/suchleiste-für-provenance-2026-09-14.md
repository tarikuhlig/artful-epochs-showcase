# Suchleiste für Provenance

Eine globale Suche, die Künstler, Werke, Epochen und Museen durchsucht — an zwei Stellen erreichbar, ein gemeinsames Suchfenster.

## 1. Suche auf „Entdecken“ (Startseite)

Direkt unter der Begrüßung oben auf der Startseite erscheint ein gut sichtbares
Suchfeld (runde Form, Lupen-Symbol, Platzhalter „Künstler, Werk, Epoche oder Museum suchen“).
Ein Tippen darauf öffnet das Suchfenster — so bleibt die Seite ruhig und die Suche
bekommt beim Tippen den ganzen Fokus.

## 2. Lupe oben rechts

Zusätzlich kommt ein Lupen-Symbol in die Leiste oben rechts — auf dem Handy neben
den Coin-Stand, am Desktop in die Kopfzeile neben den Einstellungen. Es öffnet
dasselbe Suchfenster von überall in der App.

## 3. Das Suchfenster

Ein Fenster von oben (am Handy bildschirmfüllend, am Desktop mittig), mit
Eingabefeld und sofortigen Ergebnissen beim Tippen — gruppiert:

```text
Künstler        → Leonardo da Vinci, Rembrandt …
Werke           → Mona Lisa, Sternennacht …
Epochen         → Renaissance, Impressionismus …
Museen          → Louvre, Rijksmuseum …
```

- Jede Gruppe zeigt bis zu 5 Treffer mit kleinem Bild (Werke) bzw. Symbol,
  dazu Epoche bzw. Lebensdaten als Nebenzeile.
- Ein Tipp auf einen Treffer führt direkt zur Künstler-, Werk-, Epochen- oder
  Museumseite und schließt das Fenster.
- Bei keinem Treffer: kurzer freundlicher Hinweis.
- Auf dem Handy schiebt sich das Fenster von unten hoch, Schließen per X,
  Wischen nach unten oder Tipp auf den dunklen Hintergrund; Tastatur öffnet
  sich automatisch.
- Suche ist tolerant gegenüber Kleinschreibung und findet auch Herkunft,
  Stil und Museum des Werks.

## Technische Umsetzung

- Neu: `src/components/GlobalSearch.tsx` — Suchfenster (Dialog), durchsucht
  `allPainters`, `allWorks`, `epochs` (aus `src/lib/art-data.ts`) und `museums`
  (aus `src/lib/museums.ts`) lokal im Speicher; keine Datenbank, keine externen
  Aufrufe, keine Kosten. Suchlogik wird einmal pro Modul vorbereitet
  (kleingeschriebene Suchtexte), damit das Server-Render der Startseite
  unverändert schnell bleibt.
- `src/routes/index.tsx`: Suchfeld-Button unter der Begrüßung, öffnet das Fenster.
- `src/routes/__root.tsx`: Lupen-Button in `SiteHeader` (Desktop) und in der
  mobilen Leiste oben rechts neben dem Coin-Stand; Fenster einmal im Root
  gerendert, Öffnen über einen kleinen geteilten Zustand.
- Tastatur: `Esc` schließt, `Enter` springt zum ersten Treffer; Pfeiltasten
  optional.

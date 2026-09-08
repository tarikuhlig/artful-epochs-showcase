# Kunst-Lern-App „Ars" — Maler, Epochen, Werke

Eine schlichte, moderne Web-App (clean, chrome-weiß), mit der man Maler nach Epochen kategorisiert entdecken, ihre Werke ansehen und sein Wissen in einem kleinen Quiz testen kann.

## Inhalte (zum Testen)

- 3–4 Epochen, z. B. Renaissance, Impressionismus, Expressionismus, Moderne
- Pro Epoche 1–2 Maler (z. B. Leonardo da Vinci, Michelangelo, Monet, van Gogh, Picasso, Kandinsky)
- Pro Maler 2–3 echte, gemeinfreie Werke (Bilder per direktem Wikimedia-Commons-Link, mit Jahr und kurzer Beschreibung auf Deutsch)
- Alle Inhalte liegen fest in einer lokalen Datendatei — kein Login, keine Datenbank nötig

## Seiten

- **Startseite (/):** Hero + Epochen-Übersicht als elegante Karten
- **Epoche (/epochen/$epoche):** Zeitraum, Kurztext zur Epoche, Liste der Maler
- **Maler (/maler/$slug):** Kurzbiografie + Werksgalerie mit kurzen Beschreibungen
- **Werk (/werke/$id):** Großansicht des Gemäldes mit Detailtext
- **Quiz (/quiz):** „Wer hat dieses Werk gemalt?" / Epoche erkennen — zufällige Fragen aus den Werken, Punkteanzeige am Ende

## Design

- Clean Look: weißer/Chrom-Hintergrund, viel Weißraum, dezente Schatten, dünne Linien
- Serif-Display-Font für Überschriften (museumsartig), schlichte Sans für Fließtext
- Sanfte Einblend-Übergänge, Bilder im Mittelpunkt, Galerie-Charakter
- Jede Seite bekommt eigene SEO-Metadaten (Titel, Beschreibung)

## Technik

- TanStack-Start-Routes wie oben; Inhalte in `src/lib/art-data.ts`
- Design-Tokens in `src/styles.css` (oklch), semantische Farben, keine hartcodierten Farben
- Quiz-State lokal im Browser (kein Backend)

# Moderne Künstler lernen – ohne Bildrechte zu verletzen

Zwölf große Namen der Moderne (u. a. Rothko, Picasso, Warhol, Kahlo) kommen in die App, ohne dass ein einziges geschütztes Bild in der App gespeichert oder angezeigt wird. Gelernt wird über Text, Analyse und offizielle Museums-Links.

## Wie es für den Nutzer aussieht

- Eigener Bereich „Moderne & Gegenwart – Kunst unter Urheberrecht“, erreichbar über Entdecken und die Epochenübersicht.
- Jede Künstlerseite zeigt: Lebensdaten, Biografie, Bedeutung, typische Farben/Techniken/Formate, Museen und eine Liste der Hauptwerke mit Jahr, Museum, Beschreibung und Bildbeschreibung in Worten („so sieht es aus“).
- Statt eines Bildes steht bei jedem Werk eine ruhige Platzhalter-Kachel mit Hinweis „Abbildung urheberrechtlich geschützt“ und dem Knopf „Beim Museum ansehen“ (Link auf die offizielle Sammlungsseite, öffnet in neuem Tab).
- Deutlich sichtbarer Rechte-Hinweis oben auf jeder dieser Seiten sowie am Werk selbst: nicht gemeinfrei, Abbildung nur beim Rechteinhaber.
- Diese Künstler erscheinen nur im Lernbereich – nicht im Karten-Quiz und nicht im Auktionshaus, da dort Bilder gebraucht werden.

## Künstler (12)

Pablo Picasso, Henri Matisse, Salvador Dalí, René Magritte, Frida Kahlo, Edward Hopper, Mark Rothko, Jackson Pollock, Andy Warhol, Francis Bacon, Jean-Michel Basquiat, Bridget Riley.
Je 5 Hauptwerke mit Jahr, Museum, Beschreibung, Bedeutung und offiziellem Museums-Link.

## Rechtlicher Rahmen

- Keine Kopie geschützter Bilder: keine Datei, kein Hotlink, keine Vorschaubilder.
- Verlinkt wird ausschließlich auf offizielle Museums-/Stiftungsseiten (Deep-Link auf das Werk), also auf die Quelle, die die Rechte hält.
- Kurzer Rechtehinweis pro Werk (Rechteinhaber/Museum) plus eine Impressum-taugliche Erklärseite „Warum sieht man hier keine Bilder?“.
- Beschreibungen sind eigene Formulierungen, keine übernommenen Katalogtexte.

## Technische Umsetzung

- Neue Datei `src/lib/modern-artists.ts`: `ModernArtist` (slug, name, life, origin, bio, significance, palette, techniken, museen) und `ModernWork` (id, title, year, museum, museumUrl, description, visualDescription, rightsHolder). Rein lokal, keine Laufzeit-API.
- Neue Routen `src/routes/moderne.index.tsx` (Übersicht) und `src/routes/moderne.$slug.tsx` (Künstlerprofil) mit eigenen head()-Metadaten.
- Neue Komponente `src/components/RightsNotice.tsx` (Hinweisbanner) und `ProtectedWorkCard.tsx` (Platzhalter-Kachel + Museums-Link, `rel="noopener noreferrer"`).
- Getrennt vom bestehenden Katalog: kein Eintrag in `art-data.ts`, damit Auktionshaus, Karten-Quiz, Reise und Sammlung unverändert nur gemeinfreie Werke nutzen.
- Verlinkung aus `src/routes/index.tsx` (Entdecken) und `src/routes/epochen.index.tsx`.
- Kein Datenbankwechsel nötig; Fortschritt/Entdeckungen bleiben wie bisher.

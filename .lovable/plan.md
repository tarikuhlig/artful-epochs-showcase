# Plan: Tägliche Coin-Challenge

## Ziel
Eine neue tägliche Kunst-Challenge in der Galerie ermöglicht zusätzliche Provenance Coins. Alle Fragen entstehen deterministisch aus den bereits in der App enthaltenen Künstlern, Werken und Epochen; bei der Nutzung werden keine KI-Dienste aufgerufen und keine Lovable Credits verbraucht.

## Umsetzung

- In „Meine Galerie“ einen deutlich sichtbaren Bereich „Tägliche Coin-Challenge“ ergänzen.
- Pro Kalendertag drei wechselnde Wissensfragen anbieten, darunter:
  - Werk einem Künstler zuordnen
  - Epoche oder Entstehungszeit erkennen
  - zwei vorhandene Werke vergleichen
- Ausschließlich bestehende lokale Katalogdaten und Werkbilder verwenden; keine Laufzeit-Abfragen an KI- oder externe Inhaltsdienste.
- Nach jeder Antwort direkt eine kurze Erklärung zeigen, damit die Challenge zugleich Wissen vermittelt.
- Ausgewogene tägliche Belohnung:
  - 10 Coins pro richtiger Antwort
  - 30 Bonus-Coins bei drei richtigen Antworten
  - maximal 60 Coins pro Tag
- Nach dem Abschluss Ergebnis, verdiente Coins und den Zeitpunkt der nächsten Challenge anzeigen.
- Den Coin-Stand unmittelbar in Galerie, Kopfzeile und Auktionshaus aktualisieren.

## Sichere Speicherung

- Einen täglichen Challenge-Nachweis pro Nutzer und Datum speichern.
- Coin-Gutschrift atomar und serverseitig ausführen, damit ein Neuladen oder wiederholtes Absenden keine Coins doppelt vergibt.
- Nutzer dürfen ausschließlich ihre eigenen Ergebnisse lesen; direkte Coin-Manipulation bleibt ausgeschlossen.
- Fragen und korrekte Antworten werden serverseitig aus demselben lokalen Tagesdatensatz geprüft.

## Gestaltung und Mobil

- Weißen, ruhigen Grundstil beibehalten und die Challenge mit wenigen pastellgrünen Akzenten kennzeichnen.
- Werkbilder groß genug für Bildfragen darstellen; Antworten als gut erreichbare, mobile Auswahlflächen gestalten.
- Abgeschlossenen Zustand kompakt anzeigen, ohne das Galerie-Dashboard zu überladen.

## Prüfung

- Richtige, falsche und wiederholte Antworten testen.
- Sicherstellen, dass pro Tag höchstens 60 Coins gutgeschrieben werden.
- Wechsel zum nächsten Kalendertag sowie Aktualisierung des Guthabens prüfen.
- Handy- und Desktop-Darstellung sowie fehlerfreien Seitenaufbau kontrollieren.

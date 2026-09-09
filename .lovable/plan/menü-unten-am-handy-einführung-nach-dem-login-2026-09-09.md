# Menü unten am Handy + Einführung nach dem Login

## 1. Tab-Leiste unten (nur Handy)

Auf dem Handy wandert das Menü aus dem Hamburger-Button nach unten an den
Bildschirmrand, wie bei Apple-Apps: eine feste weiße Leiste mit Symbol und
kurzem Text, aktiver Punkt schwarz hervorgehoben.

Fünf Plätze (mehr wird auf schmalen Geräten unleserlich):

```text
Entdecken   Reise   Studieren   Galerie   Mehr
```

- „Galerie" zeigt bei nicht angemeldeten Nutzern stattdessen „Anmelden".
- „Mehr" öffnet ein Blatt von unten mit den restlichen Punkten:
  Epochen, Museen, Auktionshaus, Moderne, Premium, Einstellungen.
- Oben bleibt auf dem Handy nur das Logo; der Hamburger-Button entfällt.
- Die Leiste respektiert den iPhone-Bereich unten (Home-Indikator), und
  Seiteninhalt bekommt unten Platz, damit nichts verdeckt wird.
- Auf Tablet und Desktop ändert sich nichts.

## 2. Einführung nach dem Login (alle Geräte)

Direkt nach der Anmeldung (und nach dem Intro) startet einmalig eine kurze
Führung durch die App — überspringbar, jederzeit erneut startbar in den
Einstellungen.

Ablauf, sechs Schritte:

1. Willkommen — worum es in Provenance geht
2. Entdecken — Werk und Künstler des Tages
3. Reise — 30 Stationen, Wissen und Coins
4. Studieren — unendliche Lernkarten
5. Auktionshaus & Sammlung — Coins in eigene Bilder verwandeln
6. Galerie — Fortschritt, Level, Coins

Darstellung: mittiges Kartenfenster mit Bild/Symbol, Titel, kurzem Text,
Punkte-Anzeige, „Weiter", „Zurück" und „Überspringen". Am Ende landet der
Nutzer auf dem Startbildschirm.

Merken: pro Konto in der Datenbank (Profil-Feld), damit die Führung auf
jedem Gerät nur einmal erscheint; ohne Konto wird sie nicht gezeigt.

## Technische Umsetzung

- Neu: `src/components/MobileTabBar.tsx` — feste Leiste `fixed bottom-0
  md:hidden` mit `pb-[env(safe-area-inset-bottom)]`, Lucide-Symbolen,
  `activeProps` für den aktiven Zustand; „Mehr" über ein Sheet.
- `src/routes/__root.tsx`: Hamburger-Menü und mobile Navigation entfernen,
  `<MobileTabBar />` einhängen, `<main>` bekommt `pb-20 md:pb-0`.
- Neu: `src/components/AppTour.tsx` — Schritt-Zustand lokal, Overlay-Karte,
  gerendert im Root, nur wenn `user` vorhanden und Tour nicht abgeschlossen.
- Migration: Spalte `tour_completed_at timestamptz` in `public.profiles`;
  bestehende RLS-Policies decken Lesen/Schreiben des eigenen Profils ab.
- Abschluss/Überspringen schreibt den Zeitstempel per Supabase-Update und
  invalidiert die Profil-Query.
- `src/routes/_authenticated/einstellungen.tsx`: Knopf „Einführung erneut
  ansehen" setzt das Feld zurück.

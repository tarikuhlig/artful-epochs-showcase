# Epochen verstehen + Coins verdienen

Zwei Ergänzungen: Nutzer sollen jede Epoche wirklich verstehen (Zeitgeschehen, Maltechnik, Farbwelt) — und Coins nicht nur durch tägliches Lernen, sondern auch durch Spielen, Sammeln und Verkaufen bekommen, damit Privatauktionen flüssig laufen.

## Teil 1 — Epochen erklären, interaktiv

Heute zeigt eine Epochenseite nur einen Zeitraum, einen Zweizeiler und die Malerkarten. Das wird ausgebaut zu drei Wissensbereichen, die man antippt statt liest:

- **Was geschah** — kurze Zeitleiste der Epoche: Auftraggeber, Städte, Umbrüche, warum Bilder so aussahen wie sie aussahen. Punkte klappen für mehr Kontext auf.
- **Wie gemalt wurde** — die Maltechnik als Schrittfolge (Bildträger, Grundierung, Vorzeichnung, Farbauftrag, Lasur/Firnis). Jeder Schritt einzeln antippbar, mit einem Satz, was dieser Schritt im Bild bewirkt.
- **Die Farbwelt** — anklickbare Farbfelder der typischen Pigmente. Tippen zeigt Herkunft, Kosten und Wirkung. Dazu ein Beispielwerk der Epoche, an dem man die Farben wiedererkennt.

Abschluss jeder Epochenseite: ein kurzer **Epochen-Check** (drei Fragen aus genau diesen Inhalten, Bild- und Merkmalsfragen, mit erklärender Rückmeldung). Einmal je Epoche bestanden gibt es Coins. Freie Epochen bleiben frei, gesperrte behalten die bestehende Premium-Logik.

Dieselben Wissensblöcke werden im Reise-Flow an der passenden Station eingebunden, ohne das dortige Kartendesign zu ändern.

## Teil 2 — Coins durch Spielen, Sammeln, Verkaufen

- **Spielen:** Epochen-Check je Epoche einmalig 40 Coins. Zusätzlich eine wiederholbare Runde „Erkenne die Epoche" (Werk zeigen, Epoche wählen) mit kleinem Tageslimit, damit es nicht ausufert.
- **Sammeln:** Sammler-Meilensteine mit Prämie, jeweils einmalig — 5/10/25/50 Werke in der Sammlung, alle Werke eines Künstlers, alle Werke einer Epoche. In der Sammlung sichtbar als Fortschritt mit „Prämie abholen".
- **Verkaufen:** Werke aus der Sammlung wieder abgeben — Rückkaufwert 60 % des Schätzwerts, mit Sicherheitsabfrage. Ausgestellte und gemerkte Favoriten werden vorher deutlich markiert. Verkaufte Werke lassen sich später erneut erwerben.

Die Beträge werden ins bestehende Coin-Budget eingerechnet und dokumentiert, damit das Auktionshaus nicht zu schnell leerkauft wird.

## Technische Umsetzung

- Neue Inhaltsdatei `src/lib/epoch-guide.ts`: pro Epochen-Slug Zeitleiste, Techniksequenz, Pigmentliste (Namen aus `pigment-colors.ts`), Merkmale und drei Check-Fragen. Rein redaktionell, keine Laufzeit-KI, keine externen Abrufe.
- `src/routes/epochen.$epoche.tsx`: Wissensbereiche als Tabs/Accordion, Farbfelder klickbar, `EpochCheck`-Komponente am Seitenende. `src/routes/epochen.index.tsx` bekommt Hinweis auf Check-Fortschritt.
- Migration: Tabelle `public.coin_awards` (`user_id`, `kind`, `award_key`, `coins`, unique auf user+kind+key) mit GRANTs und RLS (nur eigene Zeilen lesbar, Schreiben ausschließlich über Security-Definer-Funktionen).
- Neue Datenbankfunktionen: `award_epoch_check_for_user`, `claim_collection_milestone_for_user`, `sell_owned_item_for_user` (prüft Besitz, entfernt `owned_items`-Zeile, schreibt Coins gut).
- Server-Funktionen in `src/lib/economy.functions.ts` mit `requireSupabaseAuth`; Preise/Prämien serverseitig aus `art-valuation.ts` bzw. festen Konstanten berechnet, nie vom Client übernommen.
- `src/lib/coin-economy.ts`: neue Töpfe Spielen/Sammeln/Verkaufen dokumentieren und Konstanten zentral halten.
- Sammlung (`src/routes/_authenticated/sammlung.tsx`): Meilenstein-Leiste und Verkaufsdialog; nach Verkauf `owned_items`, `user_stats`, Favoriten-Caches invalidieren.

## Prüfung

- Jede Epoche hat vollständige Wissensblöcke und drei Fragen; keine leeren Abschnitte.
- Epochen-Check und Meilensteine zahlen nur einmal aus (zweiter Versuch gibt 0 Coins).
- Verkauf entfernt das Werk aus Sammlung und Ausstellung und schreibt korrekt gut.
- Typprüfung, Build sowie Durchklicken auf iPhone-Breite und Desktop.

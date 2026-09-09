# Favoriten & Privatauktion

Werke lassen sich überall mit einem Herz merken. Die Favoriten landen in einer eigenen Liste in der Sammlung — und von dort aus kann jedes Werk über eine **Privatauktion gegen Aufpreis** erworben werden, auch wenn es gerade nicht im Auktionshaus hängt.

## Was der Nutzer bekommt

**Herz-Button** auf Werkdetailseiten, an Auktionslosen, an Werken in Reise und Studieren sowie auf Entdecken/Maler-Karten. Ein Tippen merkt, ein zweites entfernt. Bereits gesammelte Werke zeigen statt des Herzens den Sammlungs-Haken.

**Favoritenliste** als eigener Bereich in der Sammlung: Bild, Titel, Künstler, Rang (Platin/Gold/Bronze), Privatauktionspreis und der aktuelle Coin-Stand. Sortierung nach Rang oder Zuletzt gemerkt, Entfernen direkt in der Liste.

**Privatauktion**: Wer ein Favoritenwerk sofort will, zahlt einen Aufpreis von 40 % gegenüber dem regulären Auktionspreis. Ablauf:
1. „Privatauktion anfragen" öffnet ein ruhiges Auktions-Overlay mit Werk, Schätzwert, Aufpreis und Endpreis.
2. Fehlen Coins, zeigt das Overlay, wie viele noch fehlen und wo man sie verdient (Reise, Studieren, Tageskarten) — statt einer Fehlermeldung.
3. Nach dem Zuschlag wandert das Werk in die Sammlung, das bekannte Glückwunsch-Popup für Werk und Künstler erscheint, der Favorit wird als „erworben" markiert.

**Fairness**: Läuft das Werk gerade als Los im Auktionshaus, zeigt die Favoritenliste einen Hinweis auf den günstigeren regulären Preis samt Link dorthin, statt den Aufpreis zu verlangen.

## Preisbildung

Ein Werk hat bisher nur dann einen Preis, wenn es zufällig eines der 35 Auktionslose ist. Deshalb bekommt jedes Werk einen deterministischen Schätzwert aus Bekanntheit des Künstlers, Epoche und Werkstellung — im gleichen Bereich wie die bestehenden Lose (450–2400 Coins). Privatpreis = Schätzwert × 1,4, auf 10 gerundet. Derselbe Wert wird auf Server und Oberfläche berechnet, sodass angezeigter und abgebuchter Preis immer identisch sind.

## Technische Umsetzung

- **Migration**: Tabelle `public.favorites` (`user_id`, `work_slug`, `created_at`, unique auf beiden), GRANTs für `authenticated`/`service_role`, RLS mit `auth.uid() = user_id` für alle Operationen.
- **Migration**: SQL-Funktion `purchase_private_auction_for_user(target_user uuid, work_slug text, expected_price integer)` (SECURITY DEFINER, `search_path = public`), analog zu `purchase_auction_offer_for_user`: prüft Doppelbesitz, legt fehlende `user_stats`-Zeile an, zieht Coins nur bei ausreichendem Guthaben, schreibt `owned_items` mit `kind = 'private'`, gibt neuen Coin-Stand zurück. Der Preis wird in der Funktion aus einer gespiegelten Bewertungstabelle geprüft, `expected_price` dient nur als Abgleich — weicht er ab, bricht der Kauf mit verständlicher Meldung ab.
- **Neu** `src/lib/art-valuation.ts`: Schätzwert- und Privatpreis-Funktion, genutzt von Oberfläche und Server-Funktion.
- **Neu** `src/lib/favorites.ts`: React-Query-Hooks `useFavorites`, `useToggleFavorite` (optimistisch), plus Server-Funktion für den Privatkauf in `src/lib/economy.functions.ts`.
- **Neu** `src/components/FavoriteButton.tsx` (Herz, dezent, Touch-tauglich) und `src/components/PrivateAuctionDialog.tsx`.
- **Angepasst**: `werke.$id.tsx`, `_authenticated/auktionshaus.tsx`, `_authenticated/sammlung.tsx`, `kunstpfad.tsx`, `studieren.tsx`, `maler.$slug.tsx`, `PainterCard.tsx`.
- Kauf-Erfolg nutzt das bestehende `emitCollected`, damit die Sammlungs-Popups unverändert greifen.
- Ohne Anmeldung zeigt das Herz eine kurze „Anmelden, um zu merken"-Aufforderung statt zu speichern.

## Nicht enthalten

Keine Echtgeld-Käufe — die Privatauktion läuft ausschließlich über Provenance-Coins.

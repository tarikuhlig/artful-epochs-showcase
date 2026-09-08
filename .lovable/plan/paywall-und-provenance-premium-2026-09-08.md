# Paywall und Provenance Premium

## Ziel
Provenance erhält eine stark begrenzte Gratisversion: Der gesamte Umfang bleibt sichtbar und macht neugierig, aber nur etwa 15 % der Lerninhalte sind vollständig nutzbar. Premium wird mit **7,99 € pro Monat** und **59,99 € pro Jahr** präsentiert. Paddle wird jetzt ausdrücklich **nicht aktiviert**; daher gibt es noch keinen echten Kauf oder Abo-Abschluss.

## Zugang und Vorschau
- Eine zentrale Zugangslogik kennzeichnet Inhalte als **Gratis**, **Premium** oder **Vorschau**, damit dieselben Regeln auf allen Seiten gelten.
- Gratis bleiben die Startseite, Anmeldung, der Künstler des Tages und ungefähr 15 % des redaktionellen Angebots.
- In der Reise sind die ersten zwei von zwölf Epochen vollständig spielbar; alle weiteren Stationen bleiben sichtbar, zeigen Titel, Zeitraum, Bilder und einen kurzen Vorgeschmack, öffnen aber beim Weiterlernen die Paywall.
- Epochen, Künstler, Werke und Museen bleiben vollständig im Katalog sichtbar. Eine stabile Auswahl von etwa 15 % ist frei; Premium-Inhalte zeigen Bild, Name und Kurzinfo, sperren aber die vollständige Detailansicht.
- Galerie, Auktionshaus, Coin-Challenge, Ausstellungen und der Großteil des Fortschritts werden als Premium-Vorteile sichtbar beworben, statt aus der Navigation zu verschwinden.
- Bereits gesammelte Daten und Coins bleiben erhalten; die Paywall löscht oder verändert keinen Fortschritt.

## Premium-Ansicht
- Eine eigene, klare Premium-Seite im bestehenden weißen Provenance-Stil erklärt die Freischaltung anhand echter Werkbilder aus dem lokalen Katalog.
- Zwei Preisoptionen: **Monatlich 7,99 €** und hervorgehoben **Jährlich 59,99 €** mit transparenter Ersparnis gegenüber zwölf Monatszahlungen.
- Gesperrte Inhalte öffnen eine kompakte Paywall mit Bezug zum angeklickten Werk, Künstler oder Reiseabschnitt und führen zur vollständigen Premium-Seite.
- Weil Zahlungen noch nicht aktiviert werden, sind die Abschlussflächen ehrlich als **„Bald verfügbar“** gekennzeichnet und lösen keinen Kauf aus. Die spätere Paddle-Anbindung kann diese Stellen übernehmen.

## Technische Umsetzung
- Die 15-%-Auswahl wird deterministisch aus den bereits gebündelten Katalogdaten berechnet; es gibt keine KI- oder externen Inhaltsabfragen während der Nutzung.
- Ein zentraler Premium-Status wird zunächst als vorbereitete Zugriffsschicht umgesetzt. Bis Paddle angeschlossen ist, gilt jedes Konto als Gratis-Konto; es werden keine fiktiven Abo-Daten gespeichert.
- Inhaltsseiten und geschützte Bereiche erhalten wiederverwendbare Sperr-/Vorschau-Elemente, ohne die vorhandene Anmeldung, Coins oder Reise-Freischaltung zu umgehen.
- Neue Premium-Seite mit eigenen Seitentiteln und Beschreibungen; Navigation und mobile Darstellung werden entsprechend ergänzt.
- Die bestehenden lokalen Bilder und Inhalte werden weiterverwendet, sodass normale Nutzung keine Lovable-/AI-Credits verbraucht.

## Prüfung
- Gratiszugang und gesperrte Vorschauen auf Handy und Desktop durchspielen.
- Prüfen, dass ungefähr 15 % zugänglich sind, alle Inhalte weiterhin sichtbar bleiben und Premium-Inhalte nicht über direkte Links vollständig geöffnet werden können.
- Reise-Fortschritt, Anmeldung, Coins und bestehende Galerie-Daten auf Regressionen prüfen.
- Sicherstellen, dass kein Kauf möglich ist und keine Zahlungsintegration aktiviert wurde.

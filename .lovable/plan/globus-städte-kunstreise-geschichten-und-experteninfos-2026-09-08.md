# Globus-Städte, Kunstreise-Geschichten und Experteninfos

## Ziel
Der Globus wird zum direkten Reiseeinstieg: Jede Stecknadel öffnet eine eigene Stadtseite mit Museen, kuratierter Route und verständlicher Karte. Kunstreisen bekommen mehr historischen Tiefgang. Museumsangaben werden transparent mit offizieller Quelle und Prüfdatum gepflegt.

## Umsetzung

1. **Eigene Stadtseiten**
   - Stabile Stadt-Slugs und eine neue Seite `/stadt/[stadt]` ergänzen.
   - Museen, Tagesroute, passende Kunstreise und eine schematische Stadtkarte mit nummerierten Stationen darstellen.
   - Stecknadeln auf dem Globus und die Stadt-Chips direkt mit diesen Stadtseiten verknüpfen.

2. **Kunstreisen als Geschichten**
   - Das Datenmodell jeder bestehenden Reise um historischen Kontext, zentrale Künstler, Konflikte/Kämpfe, Entdeckungen und Nachwirkung erweitern.
   - Diese Kapitel auf der jeweiligen Reisedetailseite als klare redaktionelle Erzählung vor den bisherigen Werk-Etappen zeigen.

3. **Museumsdaten für anspruchsvolle Reiseplanung**
   - Öffnungszeiten und Preise mit „zuletzt geprüft“-Datum und direkten offiziellen Quellseiten versehen.
   - Aktuelle oder unmittelbar bevorstehende Ausstellungen mit Laufzeit und offizieller Quelle ergänzen, soweit offiziell veröffentlicht.
   - Wo keine belastbare aktuelle Ausstellung vorliegt, klar auf das offizielle laufende Programm verweisen statt Inhalte zu erfinden.
   - Feiertags-, Umbau- und kurzfristige Änderungsrisiken sichtbar kennzeichnen.

4. **Atelier-Globus und Handy-Leistung**
   - Sanftes Renaissance-Fensterlicht, weiche Kontaktschatten und natürliche Materialwirkung abstimmen.
   - Auf kleinen Geräten Auflösung, Kugelsegmente, Schatten und Texturgröße reduzieren; Nadeln und Gestell bleiben sichtbar.
   - Drag, Schwung, Pinch-Zoom und Klick-vs.-Dreh-Geste sauber trennen.

5. **Prüfung**
   - Stadt-Navigation von mehreren Stecknadeln, Museum-/Reiselinks und mobile Bedienung testen.
   - Desktop- und iPhone-Ansicht visuell prüfen; WebGL-, Laufzeit- und Ladefehler ausschließen.

## Technische Details
- Bestehende TanStack-Routen und React-Three-Fiber-Szene bleiben erhalten.
- Keine Karten- oder Bilddaten werden von unsicheren Drittseiten eingebettet; die Stadtkarte ist eine performante, lokale Orientierungskarte.
- Veränderliche Museumsdaten bleiben redaktionelle Momentaufnahmen mit offiziellen Links, nicht als Echtzeit-Garantie dargestellt.

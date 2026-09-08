# Galerie, Sammlerränge und Profil

## Ziel
Das Sammeln soll begehrlicher wirken: Werke erhalten sichtbare Berühmtheitsränge, Lieblingsbilder können ausgestellt werden, und jede Person erhält ein persönlicheres Profil.

## Umsetzung
- Auktionshaus und gekaufte Werke mit den Rängen **Platin**, **Gold** und **Bronze** kennzeichnen; besonders ikonische und teure Werke erscheinen als Platin.
- „Atelier“ in der Oberfläche zu **Galerie** umbenennen und den bisherigen Fortschrittsbereich dort weiterführen.
- In der persönlichen Galerie mehrere gekaufte Lieblingswerke als „ausgestellt“ markieren und prominent in einer eigenen Ausstellungswand zeigen; Auswahl dauerhaft im Benutzerkonto speichern.
- Profil um einen eindeutigen Benutzernamen und ein Profilbild ergänzen; Bild-Upload, Vorschau, Speichern und sinnvolle Ersatzdarstellung bereitstellen.
- Navigation, Seitentitel und Texte auf die neue Galerie-Bezeichnung abstimmen.
- Darstellung auf Handy und Desktop prüfen.

## Technische Details
- Bestehendes Profil sicher um `username`, `avatar_url` und ausgestellte Werk-IDs erweitern; Benutzer können ausschließlich ihr eigenes Profil ändern.
- Profilbilder in einem eigenen Bildspeicher ablegen und den Zugriff auf den jeweiligen Benutzerordner begrenzen.
- Die bestehende URL `/atelier` bleibt erhalten, damit alte Links funktionieren; sichtbar heißt der Bereich künftig „Galerie“.
- Ranglogik wird zentral aus dem Coin-Preis abgeleitet: Platin ab 1.500, Gold ab 850, Bronze darunter.

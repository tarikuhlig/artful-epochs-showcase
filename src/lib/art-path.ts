import { findWork } from "@/lib/art-data";

export type ArtPathStation = {
  index: number;
  title: string;
  era: string;
  years: string;
  place: string;
  lat: number;
  lon: number;
  workId: string;
  lesson: string;
  turningPoint: string;
  coinReward: number;
};

export const artPath: ArtPathStation[] = [
  { index: 0, title: "Das Bild wird Wirklichkeit", era: "Spätmittelalter", years: "um 1434", place: "Brügge", lat: 51.21, lon: 3.22, workId: "arnolfini-hochzeit", lesson: "Ölfarbe, Spiegel und winzige Details lassen die sichtbare Welt erstmals beinahe greifbar erscheinen.", turningPoint: "Jan van Eyck macht Beobachtung zum Ereignis und öffnet den Weg in die Neuzeit.", coinReward: 40 },
  { index: 1, title: "Der Mensch im Mittelpunkt", era: "Renaissance", years: "um 1485", place: "Florenz", lat: 43.77, lon: 11.26, workId: "geburt-der-venus", lesson: "Antike Mythen kehren zurück. Schönheit, Körper und Natur werden zu eigenständigen Themen.", turningPoint: "Botticelli zeigt, wie Humanismus die religiöse Bildwelt erweitert.", coinReward: 40 },
  { index: 2, title: "Wissen wird Kunst", era: "Hochrenaissance", years: "1503–1511", place: "Florenz · Rom", lat: 42.6, lon: 12.4, workId: "mona-lisa", lesson: "Sfumato, Anatomie und Perspektive verbinden Forschung mit einer neuen Idee vom Individuum.", turningPoint: "Leonardos Porträt ist nicht nur Abbild, sondern psychologische Begegnung.", coinReward: 80 },
  { index: 3, title: "Der Künstler als Schöpfer", era: "Nordische Renaissance", years: "1500", place: "Nürnberg", lat: 49.45, lon: 11.08, workId: "duerer-selbstbildnis", lesson: "Dürer erhebt den Maler vom Handwerker zum selbstbewussten geistigen Autor.", turningPoint: "Das moderne Künstlerbild beginnt mit einem direkten Blick.", coinReward: 40 },
  { index: 4, title: "Licht wird Drama", era: "Barock", years: "1599–1600", place: "Rom", lat: 41.9, lon: 12.5, workId: "berufung-des-matthaeus", lesson: "Caravaggio bringt Heilige in dunkle Wirtshäuser und lenkt die Handlung mit einem Lichtstrahl.", turningPoint: "Wahrheit, Körper und Theater ersetzen ideale Distanz.", coinReward: 40 },
  { index: 5, title: "Der stille Augenblick", era: "Goldenes Zeitalter", years: "um 1658", place: "Delft", lat: 52.01, lon: 4.36, workId: "dienstmagd-mit-milchkrug", lesson: "Vermeer entdeckt Größe im Alltag: Licht, Arbeit und Konzentration werden bildwürdig.", turningPoint: "Das Private wird zum großen Thema der europäischen Malerei.", coinReward: 80 },
  { index: 6, title: "Das Ich vor der Natur", era: "Romantik", years: "um 1818", place: "Dresden", lat: 51.05, lon: 13.74, workId: "wanderer-nebelmeer", lesson: "Die Rückenfigur lädt dich ein, mit ihr in eine unendliche Landschaft zu schauen.", turningPoint: "Natur wird Spiegel innerer Erfahrung statt bloßer Kulisse.", coinReward: 40 },
  { index: 7, title: "Der flüchtige Eindruck", era: "Impressionismus", years: "1872", place: "Le Havre · Paris", lat: 49.49, lon: 0.1, workId: "impression-sonnenaufgang", lesson: "Schnelle Pinselstriche halten nicht Gegenstände, sondern Licht und Atmosphäre fest.", turningPoint: "Ein Spottname wird zum Programm der modernen Malerei.", coinReward: 40 },
  { index: 8, title: "Farbe wird Gefühl", era: "Post-Impressionismus", years: "1889", place: "Saint-Rémy", lat: 43.79, lon: 4.83, workId: "sternennacht", lesson: "Van Gogh verwandelt den sichtbaren Himmel in Rhythmus, Energie und seelische Bewegung.", turningPoint: "Farbe muss nicht mehr naturgetreu sein, um wahr zu wirken.", coinReward: 80 },
  { index: 9, title: "Der Schrei der Moderne", era: "Expressionismus", years: "1893", place: "Oslo", lat: 59.91, lon: 10.75, workId: "der-schrei", lesson: "Linie und Farbe verformen die Welt, um Angst unmittelbar fühlbar zu machen.", turningPoint: "Innere Wahrheit tritt an die Stelle äußerer Ähnlichkeit.", coinReward: 40 },
  { index: 10, title: "Die Befreiung vom Gegenstand", era: "Abstraktion", years: "1913", place: "München", lat: 48.14, lon: 11.58, workId: "komposition-vii", lesson: "Kandinsky komponiert Farben und Linien wie Musik — ohne erzählenden Gegenstand.", turningPoint: "Das Bild muss nichts abbilden, um Bedeutung zu tragen.", coinReward: 40 },
  { index: 11, title: "Eine universelle Ordnung", era: "De Stijl", years: "1930", place: "Paris · New York", lat: 46.2, lon: -22.0, workId: "komposition-rot-blau-gelb", lesson: "Mondrian reduziert Malerei auf Linie, Fläche und Grundfarbe.", turningPoint: "Die Avantgarde wird zur globalen Designsprache des 20. Jahrhunderts.", coinReward: 80 },
];

export const artPathWithWorks = artPath.map((station) => ({
  ...station,
  work: findWork(station.workId),
}));

export const totalArtPathCoins = artPath.reduce((sum, station) => sum + station.coinReward, 0);

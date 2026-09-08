import { allWorks, type Work } from "@/lib/art-data";

export type MuseumMeta = {
  slug: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  note: string;
};

/** Museumsstring aus den Werkdaten -> Haus. Mehrere Schreibweisen zeigen auf dasselbe Haus. */
const ALIASES: Record<string, string> = {
  "Musée d'Orsay, Paris (u. a.)": "Musée d'Orsay, Paris",
};

const META: Record<string, MuseumMeta> = {
  "Musée du Louvre, Paris": {
    slug: "louvre-paris",
    name: "Musée du Louvre",
    city: "Paris",
    country: "Frankreich",
    lat: 48.8606,
    lon: 2.3376,
    note: "Ehemaliger Königspalast, seit 1793 öffentliches Museum – und bis heute der Ort, an dem die Renaissance für Millionen beginnt.",
  },
  "Musée d'Orsay, Paris": {
    slug: "orsay-paris",
    name: "Musée d'Orsay",
    city: "Paris",
    country: "Frankreich",
    lat: 48.86,
    lon: 2.3266,
    note: "Ein Bahnhof von 1900, umgebaut zum wichtigsten Haus für Impressionismus und Post-Impressionismus.",
  },
  "Musée Marmottan Monet, Paris": {
    slug: "marmottan-paris",
    name: "Musée Marmottan Monet",
    city: "Paris",
    country: "Frankreich",
    lat: 48.8592,
    lon: 2.268,
    note: "Hier hängt das Bild, das der Bewegung ihren Namen gab: Monets „Impression, Sonnenaufgang“.",
  },
  "Centre Pompidou, Paris": {
    slug: "pompidou-paris",
    name: "Centre Pompidou",
    city: "Paris",
    country: "Frankreich",
    lat: 48.8607,
    lon: 2.3522,
    note: "Museum mit Rohrleitungen nach außen – Europas größte Sammlung moderner und zeitgenössischer Kunst.",
  },
  "Musée Toulouse-Lautrec, Albi": {
    slug: "toulouse-lautrec-albi",
    name: "Musée Toulouse-Lautrec",
    city: "Albi",
    country: "Frankreich",
    lat: 43.928,
    lon: 2.143,
    note: "Im Bischofspalast der Geburtsstadt des Malers: die weltweit größte Lautrec-Sammlung.",
  },
  "National Gallery, London": {
    slug: "national-gallery-london",
    name: "National Gallery",
    city: "London",
    country: "Vereinigtes Königreich",
    lat: 51.5089,
    lon: -0.1283,
    note: "Am Trafalgar Square, Eintritt frei seit der Gründung 1824 – westeuropäische Malerei von Giotto bis van Gogh.",
  },
  "Courtauld Gallery, London": {
    slug: "courtauld-london",
    name: "Courtauld Gallery",
    city: "London",
    country: "Vereinigtes Königreich",
    lat: 51.5115,
    lon: -0.117,
    note: "Kleine, dichte Sammlung im Somerset House – berühmt für Manets „Bar in den Folies-Bergère“.",
  },
  "National Galleries of Scotland, Edinburgh": {
    slug: "national-galleries-edinburgh",
    name: "National Galleries of Scotland",
    city: "Edinburgh",
    country: "Vereinigtes Königreich",
    lat: 55.9509,
    lon: -3.1955,
    note: "Klassizistischer Bau am Fuß der Altstadt mit schottischer und europäischer Malerei.",
  },
  "Museo del Prado, Madrid": {
    slug: "prado-madrid",
    name: "Museo del Prado",
    city: "Madrid",
    country: "Spanien",
    lat: 40.4138,
    lon: -3.6921,
    note: "Die königliche Sammlung Spaniens: Velázquez, Goya und die Höhepunkte des Barock.",
  },
  "Uffizien, Florenz": {
    slug: "uffizien-florenz",
    name: "Uffizien",
    city: "Florenz",
    country: "Italien",
    lat: 43.7678,
    lon: 11.2553,
    note: "Die Kunstsammlung der Medici in ihren eigenen Amtsräumen – Herz der Frührenaissance.",
  },
  "Gallerie dell'Accademia, Venedig": {
    slug: "accademia-venedig",
    name: "Gallerie dell'Accademia",
    city: "Venedig",
    country: "Italien",
    lat: 45.4314,
    lon: 12.328,
    note: "Venezianische Malerei am Canal Grande, dazu Leonardos „Vitruvianischer Mensch“.",
  },
  "Sixtinische Kapelle, Vatikan": {
    slug: "sixtinische-kapelle",
    name: "Sixtinische Kapelle",
    city: "Vatikanstadt",
    country: "Vatikan",
    lat: 41.9029,
    lon: 12.4545,
    note: "Michelangelos Deckenfresko: vier Jahre auf dem Gerüst, 500 Jahre Wirkung.",
  },
  "Stanza della Segnatura, Vatikan": {
    slug: "stanza-della-segnatura",
    name: "Stanza della Segnatura",
    city: "Vatikanstadt",
    country: "Vatikan",
    lat: 41.9038,
    lon: 12.4547,
    note: "Raffaels Bibliotheksraum für den Papst – hier hängt „Die Schule von Athen“ an der Wand.",
  },
  "San Luigi dei Francesi, Rom": {
    slug: "san-luigi-dei-francesi",
    name: "San Luigi dei Francesi",
    city: "Rom",
    country: "Italien",
    lat: 41.8992,
    lon: 12.4746,
    note: "Kirche statt Museum: Caravaggios Matthäus-Zyklus hängt dort, wofür er gemalt wurde.",
  },
  "Palazzo Barberini, Rom": {
    slug: "palazzo-barberini-rom",
    name: "Palazzo Barberini",
    city: "Rom",
    country: "Italien",
    lat: 41.9033,
    lon: 12.4899,
    note: "Barockpalast mit der Nationalgalerie alter Kunst – u. a. Artemisia Gentileschi.",
  },
  "Rijksmuseum, Amsterdam": {
    slug: "rijksmuseum-amsterdam",
    name: "Rijksmuseum",
    city: "Amsterdam",
    country: "Niederlande",
    lat: 52.36,
    lon: 4.8852,
    note: "Nationalmuseum des Goldenen Zeitalters – die „Nachtwache“ hat hier ihren eigenen Saal.",
  },
  "Mauritshuis, Den Haag": {
    slug: "mauritshuis-den-haag",
    name: "Mauritshuis",
    city: "Den Haag",
    country: "Niederlande",
    lat: 52.0801,
    lon: 4.3145,
    note: "Ein Stadtpalais mit nur wenigen Sälen – darin Vermeers „Mädchen mit dem Perlenohrring“.",
  },
  "Kathedrale, Antwerpen": {
    slug: "kathedrale-antwerpen",
    name: "Liebfrauenkathedrale",
    city: "Antwerpen",
    country: "Belgien",
    lat: 51.2205,
    lon: 4.4025,
    note: "Rubens' Altarbilder am Originalort, für den Kirchenraum und sein Licht gemalt.",
  },
  "Alte Pinakothek, München": {
    slug: "alte-pinakothek-muenchen",
    name: "Alte Pinakothek",
    city: "München",
    country: "Deutschland",
    lat: 48.1485,
    lon: 11.57,
    note: "Wittelsbacher Sammlung: Dürer, Rubens und die alten Meister in einem Bau von 1836.",
  },
  "Lenbachhaus, München": {
    slug: "lenbachhaus-muenchen",
    name: "Lenbachhaus",
    city: "München",
    country: "Deutschland",
    lat: 48.1465,
    lon: 11.5637,
    note: "Die Heimat des Blauen Reiter – Kandinsky, Marc und Münter in einer Künstlervilla.",
  },
  "Gemäldegalerie Alte Meister, Dresden": {
    slug: "gemaeldegalerie-dresden",
    name: "Gemäldegalerie Alte Meister",
    city: "Dresden",
    country: "Deutschland",
    lat: 51.053,
    lon: 13.7333,
    note: "Im Zwinger: Raffaels „Sixtinische Madonna“ samt der zwei berühmtesten Engel der Kunstgeschichte.",
  },
  "Alte Nationalgalerie, Berlin": {
    slug: "alte-nationalgalerie-berlin",
    name: "Alte Nationalgalerie",
    city: "Berlin",
    country: "Deutschland",
    lat: 52.52,
    lon: 13.3983,
    note: "Tempelbau auf der Museumsinsel mit der deutschen Romantik als Schwerpunkt.",
  },
  "Hamburger Kunsthalle": {
    slug: "hamburger-kunsthalle",
    name: "Hamburger Kunsthalle",
    city: "Hamburg",
    country: "Deutschland",
    lat: 53.5545,
    lon: 10.0021,
    note: "Hier steht Caspar David Friedrichs „Wanderer über dem Nebelmeer“ vor seinem Abgrund.",
  },
  "Museum Ludwig, Köln": {
    slug: "museum-ludwig-koeln",
    name: "Museum Ludwig",
    city: "Köln",
    country: "Deutschland",
    lat: 50.941,
    lon: 6.96,
    note: "Direkt am Dom: Moderne, Pop Art und eine der größten Picasso-Sammlungen Europas.",
  },
  "Kunsthistorisches Museum, Wien": {
    slug: "kunsthistorisches-museum-wien",
    name: "Kunsthistorisches Museum",
    city: "Wien",
    country: "Österreich",
    lat: 48.2038,
    lon: 16.3617,
    note: "Habsburgische Sammelleidenschaft in einem Prachtbau an der Ringstraße.",
  },
  "Belvedere, Wien": {
    slug: "belvedere-wien",
    name: "Belvedere",
    city: "Wien",
    country: "Österreich",
    lat: 48.1915,
    lon: 16.3809,
    note: "Barockschloss mit Klimts „Der Kuss“ – Wiener Jugendstil in Blattgold.",
  },
  "Albertina, Wien": {
    slug: "albertina-wien",
    name: "Albertina",
    city: "Wien",
    country: "Österreich",
    lat: 48.2043,
    lon: 16.3682,
    note: "Eine der größten Grafiksammlungen der Welt, darunter Dürers „Feldhase“.",
  },
  "Kunsthaus Zürich": {
    slug: "kunsthaus-zuerich",
    name: "Kunsthaus Zürich",
    city: "Zürich",
    country: "Schweiz",
    lat: 47.3703,
    lon: 8.548,
    note: "Schweizer Hauptsammlung von der Moderne bis zur Gegenwart.",
  },
  "Nasjonalmuseet, Oslo": {
    slug: "nasjonalmuseet-oslo",
    name: "Nasjonalmuseet",
    city: "Oslo",
    country: "Norwegen",
    lat: 59.911,
    lon: 10.7295,
    note: "Seit 2022 am Hafen: Munchs „Der Schrei“ in einem eigenen, abgedunkelten Kabinett.",
  },
  "Tretjakow-Galerie, Moskau": {
    slug: "tretjakow-moskau",
    name: "Tretjakow-Galerie",
    city: "Moskau",
    country: "Russland",
    lat: 55.7415,
    lon: 37.6208,
    note: "Aus einer Kaufmannssammlung entstanden – russische Kunst von Ikonen bis Avantgarde.",
  },
  "Art Institute of Chicago": {
    slug: "art-institute-chicago",
    name: "Art Institute of Chicago",
    city: "Chicago",
    country: "USA",
    lat: 41.8796,
    lon: -87.6237,
    note: "Löwen vor der Tür, Seurats „Grande Jatte“ dahinter – die große Impressionismus-Sammlung Amerikas.",
  },
  "National Gallery of Art, Washington": {
    slug: "national-gallery-washington",
    name: "National Gallery of Art",
    city: "Washington",
    country: "USA",
    lat: 38.8913,
    lon: -77.0199,
    note: "An der National Mall, Eintritt frei – das einzige Leonardo-Gemälde in Amerika hängt hier.",
  },
  "The Phillips Collection, Washington": {
    slug: "phillips-collection-washington",
    name: "The Phillips Collection",
    city: "Washington",
    country: "USA",
    lat: 38.9116,
    lon: -77.0468,
    note: "Amerikas erstes Museum für moderne Kunst, wohnzimmerhaft in einem Stadthaus.",
  },
  "Museum of Modern Art, New York": {
    slug: "moma-new-york",
    name: "Museum of Modern Art",
    city: "New York",
    country: "USA",
    lat: 40.7614,
    lon: -73.9776,
    note: "Das MoMA schrieb die Erzählung der Moderne – von van Goghs „Sternennacht“ bis zur New Yorker Schule.",
  },
  "Solomon R. Guggenheim Museum, New York": {
    slug: "guggenheim-new-york",
    name: "Solomon R. Guggenheim Museum",
    city: "New York",
    country: "USA",
    lat: 40.783,
    lon: -73.959,
    note: "Frank Lloyd Wrights Spirale, gebaut für die abstrakte Malerei Kandinskys.",
  },
  "Neue Galerie, New York": {
    slug: "neue-galerie-new-york",
    name: "Neue Galerie",
    city: "New York",
    country: "USA",
    lat: 40.7813,
    lon: -73.9601,
    note: "Deutsche und österreichische Kunst an der Museumsmeile – Klimt in einem Wiener Kaffeehausrahmen.",
  },
  "Museum of Fine Arts, Boston": {
    slug: "mfa-boston",
    name: "Museum of Fine Arts",
    city: "Boston",
    country: "USA",
    lat: 42.3394,
    lon: -71.094,
    note: "Frühe amerikanische Sammler kauften hier Impressionisten, als Europa noch spottete.",
  },
  "Walker Art Center, Minneapolis": {
    slug: "walker-art-center-minneapolis",
    name: "Walker Art Center",
    city: "Minneapolis",
    country: "USA",
    lat: 44.9683,
    lon: -93.2887,
    note: "Haus für Kunst nach 1945, mit einem der bekanntesten Skulpturengärten der USA.",
  },
};

export type Museum = MuseumMeta & { works: Work[] };

function canonical(museumString: string) {
  return ALIASES[museumString] ?? museumString;
}

const byKey = new Map<string, Museum>();
for (const work of allWorks) {
  const key = canonical(work.museum);
  const meta = META[key];
  if (!meta) continue;
  const existing = byKey.get(key);
  if (existing) existing.works.push(work);
  else byKey.set(key, { ...meta, works: [work] });
}

export const museums: Museum[] = Array.from(byKey.values()).sort(
  (a, b) => b.works.length - a.works.length || a.name.localeCompare(b.name),
);

export function findMuseum(slug: string) {
  return museums.find((m) => m.slug === slug);
}

export type City = {
  city: string;
  country: string;
  lat: number;
  lon: number;
  museums: Museum[];
  workCount: number;
};

export const cities: City[] = (() => {
  const map = new Map<string, City>();
  for (const m of museums) {
    const existing = map.get(m.city);
    if (existing) {
      existing.museums.push(m);
      existing.workCount += m.works.length;
    } else {
      map.set(m.city, {
        city: m.city,
        country: m.country,
        lat: m.lat,
        lon: m.lon,
        museums: [m],
        workCount: m.works.length,
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.workCount - a.workCount);
})();

export function museumForWork(work: Work) {
  return museums.find((m) => m.slug === META[canonical(work.museum)]?.slug);
}

export type Work = {
  id: string;
  title: string;
  year: string;
  image: string;
  description: string;
};

export type Painter = {
  slug: string;
  name: string;
  life: string;
  bio: string;
  works: Work[];
};

export type Epoch = {
  slug: string;
  name: string;
  period: string;
  description: string;
  painters: Painter[];
};

export const epochs: Epoch[] = [
  {
    slug: "renaissance",
    name: "Renaissance",
    period: "ca. 1400–1600",
    description:
      "Die Wiedergeburt der Antike: Zentralperspektive, Anatomie und Humanismus prägen eine Kunst, die den Menschen ins Zentrum stellt.",
    painters: [
      {
        slug: "leonardo-da-vinci",
        name: "Leonardo da Vinci",
        life: "1452–1519",
        bio: "Universalgenie der italienischen Renaissance: Maler, Bildhauer, Architekt und Naturforscher. Seine Sfumato-Technik – weiche, rauchige Übergänge – machte seine Porträts unsterblich.",
        works: [
          {
            id: "mona-lisa",
            title: "Mona Lisa",
            year: "um 1503–1506",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/687px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
            description:
              "Das berühmteste Porträt der Welt. Das rätselhafte Lächeln entsteht durch Leonardos Sfumato: feinste Farbschichten ohne harte Konturen.",
          },
          {
            id: "vitruvianischer-mensch",
            title: "Der vitruvianische Mensch",
            year: "um 1490",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg/600px-Da_Vinci_Vitruve_Luc_Viatour.jpg",
            description:
              "Federzeichnung nach den Proportionslehren des römischen Architekten Vitruv: der Mensch als Maß aller Dinge, eingeschrieben in Kreis und Quadrat.",
          },
        ],
      },
      {
        slug: "michelangelo",
        name: "Michelangelo Buonarroti",
        life: "1475–1564",
        bio: "Bildhauer, Maler und Architekt der Hochrenaissance. Er sah sich selbst vor allem als Bildhauer – sein Deckenfresko der Sixtinischen Kapelle wurde dennoch zum Inbegriff abendländischer Malerei.",
        works: [
          {
            id: "erschaffung-adams",
            title: "Die Erschaffung Adams",
            year: "um 1511",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1024px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
            description:
              "Ausschnitt aus dem Deckenfresko der Sixtinischen Kapelle: Der Moment, in dem Gott Adam mit fast berührenden Fingern Leben einhaucht.",
          },
        ],
      },
    ],
  },
  {
    slug: "romantik",
    name: "Romantik",
    period: "ca. 1800–1850",
    description:
      "Gefühl statt Vernunft: Die Romantik feiert die Erhabenheit der Natur, die Sehnsucht und das Unendliche – oft mit Rückenfiguren, die den Betrachter ins Bild ziehen.",
    painters: [
      {
        slug: "caspar-david-friedrich",
        name: "Caspar David Friedrich",
        life: "1774–1840",
        bio: "Der bedeutendste Maler der deutschen Romantik. Seine nebligen Landschaften und einsamen Rückenfiguren sind Meditationen über Natur, Vergänglichkeit und das Unendliche.",
        works: [
          {
            id: "wanderer-nebelmeer",
            title: "Wanderer über dem Nebelmeer",
            year: "um 1818",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg/687px-Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
            description:
              "Sinnbild der Romantik schlechthin: Ein Wanderer blickt von einem Felsgipfel auf ein Meer aus Nebel – Triumph und Einsamkeit zugleich.",
          },
          {
            id: "moench-am-meer",
            title: "Der Mönch am Meer",
            year: "1808–1810",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Caspar_David_Friedrich_-_Der_M%C3%B6nch_am_Meer_-_Google_Art_Project.jpg/1024px-Caspar_David_Friedrich_-_Der_M%C3%B6nch_am_Meer_-_Google_Art_Project.jpg",
            description:
              "Radikal reduziert: Eine winzige Gestalt vor dem endlosen Himmel. Das Bild gilt als Vorläufer der abstrakten Malerei.",
          },
        ],
      },
    ],
  },
  {
    slug: "impressionismus",
    name: "Impressionismus",
    period: "ca. 1860–1900",
    description:
      "Malerei im Freien: Flüchtige Lichtstimmungen, sichtbare Pinselstriche und das moderne Leben lösen die glatte akademische Malerei ab.",
    painters: [
      {
        slug: "claude-monet",
        name: "Claude Monet",
        life: "1840–1926",
        bio: "Begründer des Impressionismus. Monet malte dasselbe Motiv – Kathedralen, Heuhaufen, Seerosen – immer wieder, um das wechselnde Licht des Augenblicks festzuhalten.",
        works: [
          {
            id: "impression-sonnenaufgang",
            title: "Impression, Sonnenaufgang",
            year: "1872",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1024px-Monet_-_Impression%2C_Sunrise.jpg",
            description:
              "Das Bild, das einer ganzen Epoche den Namen gab: der Hafen von Le Havre im Morgendunst, gemalt mit lockeren, schnellen Strichen.",
          },
          {
            id: "seerosen",
            title: "Seerosen",
            year: "1906",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg/1024px-Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
            description:
              "Aus seinem Garten in Giverny: Über 250 Seerosen-Bilder schuf Monet – die Wasseroberfläche wird zum Spiegel von Licht und Himmel.",
          },
        ],
      },
      {
        slug: "vincent-van-gogh",
        name: "Vincent van Gogh",
        life: "1853–1890",
        bio: "Post-Impressionist mit unverwechselbarer Handschrift: dichte, wogende Pinselstriche und leuchtende Farben. Zu Lebzeiten kaum beachtet, heute einer der bekanntesten Maler der Welt.",
        works: [
          {
            id: "sternennacht",
            title: "Die Sternennacht",
            year: "1889",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
            description:
              "Blick aus dem Fenster der Anstalt von Saint-Rémy: Ein wirbelnder Nachthimmel über einem stillen Dorf – gemalt aus Erinnerung und Imagination.",
          },
          {
            id: "sonnenblumen",
            title: "Sonnenblumen",
            year: "1888",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg/687px-Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg",
            description:
              "Teil einer Serie für das Gelbe Haus in Arles. Für van Gogh symbolisierten die Blumen Dankbarkeit und Freundschaft.",
          },
        ],
      },
    ],
  },
  {
    slug: "moderne",
    name: "Klassische Moderne",
    period: "ca. 1900–1945",
    description:
      "Abschied von der Abbildung: Farbe, Linie und Form werden zu eigenen Sprachen. Die abstrakte Kunst befreit das Bild vom Gegenstand.",
    painters: [
      {
        slug: "wassily-kandinsky",
        name: "Wassily Kandinsky",
        life: "1866–1944",
        bio: "Pionier der abstrakten Malerei und Lehrer am Bauhaus. Kandinsky glaubte, Farben und Formen wirken wie Musik direkt auf die Seele.",
        works: [
          {
            id: "komposition-vii",
            title: "Komposition VII",
            year: "1913",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Vassily_Kandinsky%2C_1913_-_Composition_7.jpg/1024px-Vassily_Kandinsky%2C_1913_-_Composition_7.jpg",
            description:
              "Kandinskys größtes und komplexestes Frühwerk: ein Sturm aus Farben und Linien, komponiert wie eine Sinfonie.",
          },
          {
            id: "komposition-viii",
            title: "Komposition VIII",
            year: "1923",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Vassily_Kandinsky%2C_1923_-_Composition_8.jpg/1024px-Vassily_Kandinsky%2C_1923_-_Composition_8.jpg",
            description:
              "Aus der Bauhaus-Zeit: strenge Geometrie – Kreise, Dreiecke, Geraden – in präzisem Gleichgewicht.",
          },
          {
            id: "gelb-rot-blau",
            title: "Gelb-Rot-Blau",
            year: "1925",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Vassily_Kandinsky%2C_1925_-_Yellow_-_Red_-_Blue.jpg/1024px-Vassily_Kandinsky%2C_1925_-_Yellow_-_Red_-_Blue.jpg",
            description:
              "Die drei Grundfarben treffen aufeinander: links helle, flächige Klarheit, rechts dunkle, kreisende Formen – ein Bild über Gegensätze.",
          },
        ],
      },
    ],
  },
];

export const allPainters: (Painter & { epoch: Epoch })[] = epochs.flatMap(
  (epoch) => epoch.painters.map((p) => ({ ...p, epoch })),
);

export const allWorks: (Work & { painter: Painter; epoch: Epoch })[] =
  epochs.flatMap((epoch) =>
    epoch.painters.flatMap((painter) =>
      painter.works.map((work) => ({ ...work, painter, epoch })),
    ),
  );

export function findEpoch(slug: string) {
  return epochs.find((e) => e.slug === slug);
}

export function findPainter(slug: string) {
  return allPainters.find((p) => p.slug === slug);
}

export function findWork(id: string) {
  return allWorks.find((w) => w.id === id);
}

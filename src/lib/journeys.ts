export type JourneyStop = {
  title: string;
  text: string;
  /** Optional: verweist auf ein Werk im Katalog */
  workId?: string;
};

export type Journey = {
  slug: string;
  title: string;
  subtitle: string;
  kind: "Strömung" | "Ort" | "Thema";
  era: string;
  intro: string;
  reward: number;
  stops: JourneyStop[];
};

export const journeys: Journey[] = [
  {
    slug: "florenz-der-medici",
    title: "Florenz der Medici",
    subtitle: "Wie eine Bankiersfamilie die Renaissance finanzierte",
    kind: "Ort",
    era: "1450–1520",
    reward: 40,
    intro:
      "Eine Stadt mit 60.000 Einwohnern erfindet die moderne Bildsprache. Diese Reise führt von der Frührenaissance in Botticellis Werkstatt bis zu den Giganten Leonardo, Michelangelo und Raffael.",
    stops: [
      {
        title: "Der Auftrag",
        text: "Die Medici bezahlen Kunst nicht aus Frömmigkeit allein, sondern als politisches Kapital. Wer die schönsten Bilder besitzt, regiert die Stadt der Bilder.",
      },
      { title: "Antike als Sehnsucht", workId: "primavera", text: "Botticelli übersetzt die Philosophenzirkel der Medici in einen Frühlingsgarten." },
      { title: "Die Göttin steigt an Land", workId: "geburt-der-venus", text: "Zum ersten Mal seit der Antike wieder ein lebensgroßer Akt – und niemand ruft nach dem Inquisitor." },
      { title: "Die Wissenschaft des Sehens", workId: "vitruvianischer-mensch", text: "Leonardo misst den Menschen aus. Kunst und Forschung sprechen dieselbe Sprache." },
      { title: "Das Porträt wird Seele", workId: "mona-lisa", text: "Weicher Übergang statt harter Kontur: Sfumato macht aus einem Gesicht eine Stimmung." },
      { title: "Der Berührungspunkt", workId: "erschaffung-adams", text: "In Rom setzt Michelangelo fort, was Florenz vorbereitet hat – Körper als Träger göttlicher Kraft." },
      { title: "Die Ordnung des Wissens", workId: "schule-von-athen", text: "Raffael versammelt die Antike in einer perfekten Perspektive. Die Renaissance hat ihr Selbstporträt gefunden." },
    ],
  },
  {
    slug: "amsterdam-goldenes-zeitalter",
    title: "Amsterdam im Goldenen Zeitalter",
    subtitle: "Der erste freie Kunstmarkt der Geschichte",
    kind: "Ort",
    era: "1600–1680",
    reward: 35,
    intro:
      "Keine Fürsten, keine Altarbilder: In der Republik der Niederlande kaufen Handwerker und Kaufleute Bilder auf dem Markt. Das verändert, was gemalt wird.",
    stops: [
      { title: "Bilder für Bürger", text: "Statt Heiligen hängen Landschaften, Stillleben und Nachbarn an der Wand. Malerei wird Ware – und dadurch vielfältig." },
      { title: "Das Gruppenbild in Bewegung", workId: "nachtwache", text: "Rembrandt sprengt das Reihenporträt und macht daraus ein Schauspiel." },
      { title: "Ein Leben in Selbstbildnissen", workId: "rembrandt-selbstbildnis", text: "Nach dem Bankrott malt Rembrandt sich selbst ohne Schutz – Malerei als Bilanz." },
      { title: "Stille als Ereignis", workId: "dienstmagd-mit-milchkrug", text: "Vermeer macht das Eingießen von Milch zur feierlichen Handlung." },
      { title: "Der Blick über die Schulter", workId: "maedchen-mit-perlenohrring", text: "Kein Auftrag, kein Name – nur ein Blick, der bis heute anhält." },
    ],
  },
  {
    slug: "paris-1874",
    title: "Paris 1874",
    subtitle: "Die Revolte des flüchtigen Augenblicks",
    kind: "Strömung",
    era: "1860–1900",
    reward: 40,
    intro:
      "Eine Gruppe abgelehnter Maler stellt in einem Fotoatelier aus. Der Spottname des Kritikers – „Impressionisten“ – wird zum Programm einer ganzen Epoche.",
    stops: [
      { title: "Der Skandal davor", workId: "fruehstueck-im-gruenen", text: "Manet zeigt eine nackte Zeitgenossin statt einer Göttin. Der Salon ist empört, die Jungen sind begeistert." },
      { title: "Der Namensgeber", workId: "impression-sonnenaufgang", text: "Ein Hafen im Dunst, in Minuten hingesetzt – und der Titel, der Geschichte schreibt." },
      { title: "Licht auf Haut", workId: "moulin-de-la-galette", text: "Renoir malt Sonnenflecken auf tanzenden Menschen. Das Leben selbst ist das Motiv." },
      { title: "Die Kehrseite", workId: "der-absinth", text: "Degas zeigt, dass das moderne Paris auch Einsamkeit heißt." },
      { title: "Der Spiegel lügt", workId: "bar-in-den-folies-bergere", text: "Manets letztes Meisterwerk stellt die Frage, wo eigentlich der Betrachter steht." },
      { title: "Eine Amerikanerin in Paris", workId: "das-bad-des-kindes", text: "Mary Cassatt bringt japanische Flächigkeit und weibliche Alltagsarbeit in die Bewegung." },
    ],
  },
  {
    slug: "wege-in-die-abstraktion",
    title: "Wege in die Abstraktion",
    subtitle: "Vom Nebel zum reinen Rechteck",
    kind: "Thema",
    era: "1810–1930",
    reward: 45,
    intro:
      "Die Abstraktion fällt nicht vom Himmel. Sie wird über hundert Jahre vorbereitet – von der Leere bei Friedrich bis zum Raster bei Mondrian.",
    stops: [
      { title: "Die Leere", workId: "moench-am-meer", text: "Friedrich streicht alles, woran das Auge sich festhalten könnte. Übrig bleibt Fläche." },
      { title: "Geschwindigkeit löst Form auf", workId: "regen-dampf-geschwindigkeit", text: "Turner malt nicht den Zug, sondern das Tempo." },
      { title: "Farbe als Struktur", workId: "mont-sainte-victoire", text: "Cézanne baut den Berg aus Farbflecken – Konstruktion statt Abbild." },
      { title: "Malerei ohne Ufer", workId: "seerosen", text: "Monets Teich verliert den Horizont. Übrig bleibt reine Farbfläche." },
      { title: "Der Sprung", workId: "komposition-vii", text: "Kandinsky verzichtet ganz auf den Gegenstand: Farbe klingt wie Musik." },
      { title: "Die Ordnung danach", workId: "komposition-rot-blau-gelb", text: "Mondrian reduziert alles auf Linie, Fläche und drei Farben." },
    ],
  },
  {
    slug: "new-yorker-schule",
    title: "Die New Yorker Schule",
    subtitle: "Wie das Zentrum der Kunst nach Manhattan zog",
    kind: "Strömung",
    era: "1943–1965",
    reward: 50,
    intro:
      "Der Abstrakte Expressionismus ist die erste Kunstbewegung, die von den USA aus die Welt prägt. Weil diese Werke noch urheberrechtlich geschützt sind, erzählen wir die Strömung – und zeigen ihre europäischen Wurzeln im Katalog.",
    stops: [
      { title: "Emigration", text: "Ab 1933 fliehen europäische Künstler und Sammler nach New York. Mit ihnen kommen Surrealismus, Bauhaus und die Idee des automatischen Malens." },
      { title: "Die Wurzel im Teich", workId: "seerosen", text: "Als das MoMA 1955 ein spätes Seerosenbild kauft, feiern die New Yorker Monet als ihren Vorläufer: Malerei ganz ohne Rand." },
      { title: "Die geistige Linie", workId: "komposition-vii", text: "Kandinskys Idee, Farbe wirke wie Musik, wird über das Guggenheim Museum zur Gründungslegende der amerikanischen Abstraktion." },
      { title: "Action Painting", text: "Jackson Pollock legt die Leinwand auf den Boden und lässt Farbe tropfen. Nicht das Bild zählt, sondern der Akt – Kritiker Harold Rosenberg nennt es „Arena zum Handeln“." },
      { title: "Farbfeld", text: "Mark Rothko und Barnett Newman gehen den Gegenweg: riesige, atmende Farbflächen, vor denen man stehen soll wie vor einer Landschaft." },
      { title: "Der Kritiker als Macht", text: "Clement Greenberg erklärt Flachheit zum Ziel der Malerei. Zum ersten Mal schreibt ein Kritiker mit an der Kunstgeschichte, während sie entsteht." },
    ],
  },
  {
    slug: "nachkriegsmalerei",
    title: "Nachkriegsmalerei in Europa",
    subtitle: "Informel, ZERO und das Blau von Yves Klein",
    kind: "Strömung",
    era: "1945–1970",
    reward: 45,
    intro:
      "Nach 1945 misstraut Europa den großen Erzählungen. Malerei wird Material, Geste und Farbe an sich. Auch diese Werke sind noch geschützt – hier ist ihre Geschichte.",
    stops: [
      { title: "Nach dem Bild", text: "Wer den Krieg gesehen hat, malt keine Heldenszenen mehr. Das Informel setzt auf Spur, Kruste und Zufall statt auf Motiv." },
      { title: "Die Vorgeschichte der Geste", workId: "sternennacht", text: "Van Goghs Pinselschrift wird zum Vorbild: Der Strich selbst ist der Inhalt." },
      { title: "Klein-Blau", text: "Yves Klein lässt 1960 ein eigenes Ultramarin patentieren – IKB. Ein Bild ist nur noch: Farbe, monochrom, unendlich. Das Blau dieser App zitiert genau diesen Gedanken." },
      { title: "ZERO", text: "Düsseldorf, 1957: Otto Piene und Heinz Mack starten bei null. Licht, Feuer und Bewegung ersetzen die Leinwand als Träger." },
      { title: "Die deutsche Antwort", text: "Ab den 1960ern verbinden Gerhard Richter und Sigmar Polke Fotografie und Malerei – „Kapitalistischer Realismus“ als ironische Antwort auf die Pop Art." },
      { title: "Was bleibt", workId: "der-schrei", text: "Der Blick zurück: Munchs Angstbild wird in der Nachkriegszeit neu gelesen – als Bild einer Gesellschaft, die ihre Fassung verloren hat." },
    ],
  },
];

export function findJourney(slug: string) {
  return journeys.find((j) => j.slug === slug);
}

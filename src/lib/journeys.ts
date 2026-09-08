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
  story: {
    context: string;
    artists: string[];
    conflict: string;
    discovery: string;
    legacy: string;
  };
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
    story: {
      context: "Florenz ist im 15. Jahrhundert keine ruhige Museumskulisse, sondern eine reiche, nervöse Republik. Zünfte, Bankhäuser und Familien regieren über Aufträge. Nach der Pest wächst der Wunsch, den Menschen und die sichtbare Welt neu zu vermessen.",
      artists: ["Sandro Botticelli", "Leonardo da Vinci", "Michelangelo", "Raffael", "Filippo Brunelleschi"],
      conflict: "Die Medici sichern Macht durch Geld, Netzwerke und Bilder. Savonarolas religiöse Bewegung verurteilt Luxus; 1497 brennen beim „Fegefeuer der Eitelkeiten“ kostbare Gegenstände. Künstler arbeiten zwischen humanistischer Freiheit, kirchlichen Regeln und politischem Auftrag.",
      discovery: "Linearperspektive, Anatomie und das Studium antiker Skulpturen verändern das Bild. Kunst wird zu einer Form von Forschung: Räume werden berechenbar, Körper glaubwürdig und Porträts psychologisch.",
      legacy: "Der Florentiner Wettstreit macht den individuellen Künstler zum gefeierten Autor. Seine Bildsprache wandert nach Rom und prägt die europäische Kunst für Jahrhunderte.",
    },
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
    story: {
      context: "Im 17. Jahrhundert wird Amsterdam zum Handelszentrum einer jungen Republik. Wohlhabende Bürger, nicht nur Kirche und Hof, kaufen Bilder für ihre Häuser. Tausende Werke kommen jedes Jahr auf einen offenen Markt.",
      artists: ["Rembrandt van Rijn", "Johannes Vermeer", "Frans Hals", "Judith Leyster", "Jacob van Ruisdael"],
      conflict: "Wohlstand aus globalem Handel steht neben Krieg, Kolonialgewalt und sozialer Unsicherheit. Maler konkurrieren in einem übersättigten Markt; selbst Rembrandt gerät in Konkurs. Frauen wie Judith Leyster kämpfen zusätzlich um Anerkennung als selbstständige Meisterinnen.",
      discovery: "Spezialisierte Genres entstehen: Stadtansicht, Interieur, Stillleben und Gruppenporträt. Licht wird nicht bloß Beleuchtung, sondern Erzählmittel; optische Geräte schärfen den Blick auf Atmosphäre und Raum.",
      legacy: "Die niederländische Malerei zeigt, dass Alltag, Arbeit und private Räume große Kunst tragen können. Ihr Einfluss reicht von Chardin über den Realismus bis zur Fotografie.",
    },
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
    story: {
      context: "Nach Krieg, Kommune und dem Umbau von Paris verändert sich das Großstadtleben radikal. Eisenbahn, Boulevards und Freizeitorte liefern neue Motive; tragbare Farbtuben machen Malen unter freiem Himmel praktikabel.",
      artists: ["Claude Monet", "Berthe Morisot", "Edgar Degas", "Pierre-Auguste Renoir", "Mary Cassatt", "Édouard Manet"],
      conflict: "Der staatlich kontrollierte Salon entscheidet über Karrieren und weist neue Malweisen zurück. Frauen dürfen viele öffentliche Orte nicht frei besuchen und werden vom Kunstbetrieb begrenzt. Die unabhängige Ausstellung von 1874 ist deshalb zugleich Marktstrategie und Aufstand.",
      discovery: "Gebrochene Pinselstriche und Komplementärfarben ersetzen die glatte Atelieroberfläche. Serienbilder untersuchen, wie Licht ein Motiv stündlich verändert; ungewöhnliche Ausschnitte reagieren auf Fotografie und japanische Drucke.",
      legacy: "Aus einem Spottwort wird die bekannteste Bewegung der Moderne. Der unabhängige Ausstellungsraum und die Idee einer Künstlergruppe außerhalb der Akademie werden zum Modell der Avantgarde.",
    },
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
    story: {
      context: "Zwischen Romantik und Zwischenkriegszeit verliert das Bild Schritt für Schritt seine Pflicht, die Welt naturgetreu abzubilden. Fotografie übernimmt Dokumentation, während Künstler Farbe, Fläche und Wahrnehmung selbst untersuchen.",
      artists: ["Caspar David Friedrich", "J. M. W. Turner", "Paul Cézanne", "Claude Monet", "Wassily Kandinsky", "Piet Mondrian"],
      conflict: "Akademien halten Zeichnung und erkennbare Gegenstände für unverzichtbar. Die Abstraktion wird als Dekoration, Irrtum oder kulturelle Bedrohung angegriffen; später diffamieren Diktaturen viele ihrer Vertreter als „entartet“.",
      discovery: "Farbe kann Stimmung ohne Gegenstand erzeugen, eine Leinwand kann ihren eigenen Rhythmus besitzen. Cézannes konstruktive Farbfelder, Monets randlose Seerosen und Kandinskys musikalische Kompositionen öffnen verschiedene Wege aus der Abbildung.",
      legacy: "Abstraktion wird keine einheitliche Sprache, sondern ein Feld: geometrisch oder gestisch, streng oder spirituell. Fast jede ungegenständliche Bewegung des 20. Jahrhunderts greift auf einen dieser Wege zurück.",
    },
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
    story: {
      context: "New York wird in den 1940er-Jahren Zufluchtsort für europäische Exilanten und zugleich Zentrum eines neuen amerikanischen Selbstbewusstseins. Galerien, Museen und staatliche Kulturpolitik verschieben den Kunstmarkt von Paris nach Manhattan.",
      artists: ["Jackson Pollock", "Lee Krasner", "Mark Rothko", "Willem de Kooning", "Barnett Newman", "Helen Frankenthaler"],
      conflict: "Die Maler streiten über Geste und Stille, Figur und Fläche. Künstlerinnen werden trotz zentraler Beiträge übergangen. Im Kalten Krieg wird die Freiheit abstrakter Kunst politisch instrumentalisiert, während viele Künstler selbst jeder Propaganda misstrauen.",
      discovery: "Die Leinwand wächst zum körperlichen Gegenüber. Pollocks Drip Painting registriert Bewegung; Rothkos Farbfelder erzeugen langsame Wahrnehmung. Das Bild ist nicht länger Fenster, sondern Ereignis und Raum.",
      legacy: "Zum ersten Mal bestimmt eine amerikanische Bewegung den internationalen Diskurs. Pop Art, Minimalismus und Performance entstehen auch als Reaktion auf ihren Pathos und Maßstab.",
    },
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
    story: {
      context: "Europa beginnt 1945 zwischen Ruinen, Teilung und moralischem Zusammenbruch neu. Viele Künstler misstrauen heroischen Bildern und suchen in Material, Spur und elementarer Farbe einen Anfang ohne alte Gewissheiten.",
      artists: ["Yves Klein", "Wols", "Jean Fautrier", "Emil Schumacher", "Otto Piene", "Heinz Mack", "Lucio Fontana"],
      conflict: "Westliche Abstraktion und sozialistischer Realismus werden im Kalten Krieg zu konkurrierenden Weltbildern. Gleichzeitig ringen Künstler darum, ob nach der Katastrophe überhaupt Schönheit möglich ist und wer im wiederaufgebauten Kunstbetrieb sichtbar wird.",
      discovery: "Leinwände werden verbrannt, geritzt, durchstoßen oder mit Erde aufgebaut. ZERO arbeitet mit Licht und Bewegung; Klein erklärt reines Ultramarin zum immateriellen Raum. Technik und Material werden selbst zum Thema.",
      legacy: "Die Nachkriegsexperimente lösen die Grenze zwischen Malerei, Objekt und Aktion. Sie bereiten Installation, Performance und medienübergreifende Gegenwartskunst vor.",
    },
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

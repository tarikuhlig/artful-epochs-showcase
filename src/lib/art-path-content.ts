/**
 * Redaktioneller Lernstoff der Reise: 30 Stationen von der Gotik bis zum Bauhaus.
 * Jede Station liefert Stoff zum Studieren (Geschichte, Werkstatt, Werkzeuge, Merksätze)
 * und die Grundlage für die anschließenden Fragen.
 */
export type StationContent = {
  title: string;
  era: string;
  years: string;
  place: string;
  /** Vier prägende Künstler — die Namen entsprechen exakt dem Katalog. */
  artists: string[];
  lesson: string;
  turningPoint: string;
  experience: { title: string; story: string; mission: string };
  history: string;
  palette: string[];
  pigments: string;
  supports: string;
  tools: string;
  brushes: string;
  technique: string;
  /** Ein Satz je Künstler, in Reihenfolge der artists. */
  artistLens: string[];
  /** Drei Merksätze, die im Quiz abgefragt werden — zusätzlich mit vertiefendem Text. */
  mnemonics: { text: string; detail: string }[];
};

export const stationContent: StationContent[] = [
  {
    title: "Die Figur bekommt Gewicht",
    era: "Gotik in Siena und Florenz",
    years: "1300–1350",
    place: "Siena · Florenz",
    artists: ["Giotto di Bondone", "Duccio di Buoninsegna", "Simone Martini", "Ambrogio Lorenzetti"],
    lesson: "Vor Giotto schweben Figuren auf Goldgrund. Jetzt stehen sie auf Boden, werfen Schatten, wenden sich einander zu und zeigen Trauer, Zorn und Zärtlichkeit.",
    turningPoint: "Das Bild wird zum Raum, in dem Menschen handeln — der Anfang der westlichen Malerei der Neuzeit.",
    experience: { title: "Morgen in der Arenakapelle", story: "Du stehst in Padua vor frisch verputzten Wänden. Der Maler arbeitet in Tagesabschnitten; der blaue Himmel über den Figuren ersetzt zum ersten Mal das Gold.", mission: "Suche in jeder Szene die Figur, deren Körper eine Bewegung wirklich zu Ende führt." },
    history: "Italienische Stadtrepubliken werden reich durch Tuch und Bankgeschäfte. Bettelorden wollen Bilder, die einfache Gläubige unmittelbar verstehen — und Rathäuser bestellen erstmals weltliche Wandbilder über gute Regierung.",
    palette: ["Blattgold", "Azuritblau", "Zinnober", "Grüne Erde", "Kalkweiß"],
    pigments: "Mineralische Pigmente werden mit Eigelb (Tempera) oder Kalkwasser (Fresko) gebunden. Grüne Erde dient als Untermalung für Hauttöne, Azurit als Himmel.",
    supports: "Frischer Kalkputz für Wandbilder, Pappelholztafeln mit Kreidegrund und Blattgold für Altäre.",
    tools: "Reibstein, Kohle für die Vorzeichnung (Sinopia), Zirkel, Punzeisen zum Mustern des Goldes.",
    brushes: "Spitze Marder- und Eichhörnchenhaarpinsel für Tempera, breitere Borstenpinsel für den nassen Putz.",
    technique: "Fresko: Farbe verbindet sich chemisch mit dem trocknenden Kalk und ist unkorrigierbar. Deshalb wird jeder Tag genau geplant.",
    artistLens: [
      "Giotto gibt seinen Figuren Volumen, Gewicht und echte Gefühle — Zeitgenossen feiern ihn als Erneuerer der Malerei.",
      "Duccio verbindet byzantinische Goldpracht mit weichen, erzählenden Gesten seiner sienesischen Altäre.",
      "Simone Martini malt höfisch elegant: schwingende Linien, kostbare Stoffe, feine Farbe.",
      "Ambrogio Lorenzetti malt im Rathaus von Siena Stadt und Land als politisches Lehrbild.",
    ],
    mnemonics: [
    {
      text: "Merke: Fresko heißt Malen auf nassem Kalk — Korrekturen sind unmöglich.",
      detail: "Der Kalkputz muss noch feucht sein, damit sich Pigment und Wand dauerhaft verbinden. Trocknet die Wand, kann der Maler den Fehler nur noch überdecken oder neu verputzen. Deshalb plant er jeden Tag genau, was in den nächsten Stunden zu schaffen ist.",
    },
    {
      text: "Merke: Giotto ersetzt den Goldgrund durch Raum, Körper und Schatten.",
      detail: "Vor Giotto schwebten Heilige vor goldenem Hintergrund, jenseits von Zeit und Raum. Giotto stellt sie auf festen Boden, lässt sie einander zuwenden und Schatten werfen — damit wird die Szene zu einem erlebten Moment.",
    },
    {
      text: "Merke: Siena bleibt elegant und golden, Florenz wird plastisch und erdverbunden.",
      detail: "Sienesische Maler wie Duccio und Simone Martini bewahren die byzantinische Pracht aus Gold und geschwungenen Linien. Florentiner Maler unter Giotto setzen dagegen auf plastische Körper, echte Räume und irdische Schwere.",
    }
  ],
  },
  {
    title: "Höfische Pracht und erster Realismus",
    era: "Internationale Gotik",
    years: "1380–1430",
    place: "Köln · Genf · Tournai",
    artists: ["Gentile da Fabriano", "Stefan Lochner", "Konrad Witz", "Robert Campin"],
    lesson: "Zwischen den Höfen Europas reist ein gemeinsamer Stil: schlanke Figuren, kostbare Gewänder, Gold — und daneben plötzlich genau beobachtete Pflanzen, Seen und Gesichter.",
    turningPoint: "Beobachtung tritt neben Pracht: Konrad Witz malt als Erster eine wiedererkennbare Landschaft, den Genfer See.",
    experience: { title: "Karawane der Könige", story: "Ein Altar wird ausgepackt: Gold, Brokat, exotische Tiere. Doch im Hintergrund erkennst du eine Straße, die tatsächlich existiert.", mission: "Finde in jedem Werk eine Stelle, die nicht mehr Symbol, sondern Beobachtung ist." },
    history: "Höfe in Burgund, Prag, Paris und Köln konkurrieren um Prunk. Handschriften, Goldschmiedearbeit und Malerei folgen demselben eleganten Geschmack, während Städte bürgerliche Stifter hervorbringen.",
    palette: ["Blattgold", "Ultramarin", "Karminrot", "Weiß", "Grün"],
    pigments: "Kostbares Ultramarin und Gold zeigen Rang. Lacke aus Kermes-Läusen ergeben tiefes Rot; Eitempera bleibt Standard, Öl kommt für Lasuren auf.",
    supports: "Eichen- oder Nadelholztafeln mit Kreidegrund, Pergament für Buchmalerei.",
    tools: "Polierstein (Achat) für Gold, Punzen für Muster, feine Zeichenfedern, Musterbücher als Vorlagensammlung.",
    brushes: "Sehr feine Haarpinsel für Gold- und Brokatmuster, kleine Rundpinsel für Gesichter.",
    technique: "Gold wird poliert und punziert, damit es im Kerzenlicht funkelt; darüber liegen dünne Farbschichten.",
    artistLens: [
      "Gentile da Fabriano inszeniert den Zug der Könige als goldenes Fest — Prunk als Frömmigkeit.",
      "Stefan Lochner malt in Köln zarte Madonnen mit Blumen, deren Arten botanisch bestimmbar sind.",
      "Konrad Witz verlegt ein biblisches Wunder an den Genfer See — die erste erkennbare Landschaft.",
      "Robert Campin stellt heilige Szenen in bürgerliche Wohnräume mit Kaminen und Kupferkesseln.",
    ],
    mnemonics: [
    {
      text: "Merke: Internationale Gotik = eleganter Hofstil quer durch Europa.",
      detail: "Höfe in Burgund, Frankreich, Prag und Köln tauschen Künstler, Musterbücher und Ideen aus. Der Stil ist überall erkennbar: schlanke Figuren, kostbare Stoffe, filigrane Details — unabhängig vom Auftraggeber.",
    },
    {
      text: "Merke: Konrad Witz malt 1444 die erste porträthafte Landschaft (Genfer See).",
      detail: "In der 'Wunderbaren Fischmadonna' spiegelt sich der Genfer See so genau, dass man die Stelle heute noch identifizieren kann. Damit wird die Landschaft nicht nur Kulisse, sondern realer Schauplatz.",
    },
    {
      text: "Merke: Gold steht für Heiligkeit — beobachtete Details für die neue Wirklichkeit.",
      detail: "Goldgrund und Strahlenkranz signalisieren göttliche Gegenwart. Doch neben dem Symbolischen tauchen plötzlich botanisch genaue Blumen, erkennbare Seen und individuelle Gesichter auf — die Welt wird beobachtbar.",
    }
  ],
  },
  {
    title: "Das Bild wird Wirklichkeit",
    era: "Frühe Niederländer",
    years: "1430–1470",
    place: "Brügge · Gent",
    artists: ["Jan van Eyck", "Rogier van der Weyden", "Hugo van der Goes", "Antonello da Messina"],
    lesson: "Öllasuren, Spiegelungen und mikroskopische Details machen Stoffe, Haut und Räume beinahe greifbar. Religiöse Symbolik versteckt sich in Alltagsdingen: Kerze, Hund, Orangen.",
    turningPoint: "Die genaue Beobachtung der sichtbaren Welt öffnet den Weg von der mittelalterlichen Bildform in die Neuzeit — und die Öltechnik reist nach Italien.",
    experience: { title: "Ein Morgen in Brügge", story: "Du betrittst eine Werkstatt nahe dem Handelskontor. Pigmente, Harze und Leinöl stehen bereit, während ein Konvexspiegel das ganze Zimmer in einem winzigen Kreis verdoppelt.", mission: "Finde im Arnolfini-Porträt drei Details, die zugleich wirklich und symbolisch sind." },
    history: "Brügge ist Europas Handelsdrehscheibe. Kaufleute, der burgundische Hof und Kirchen verlangen Bilder, in denen Waren, Frömmigkeit und Rang bis ins kleinste Detail lesbar sind.",
    palette: ["Ultramarin", "Zinnober", "Malachitgrün", "Bleiweiß", "Ocker"],
    pigments: "Ultramarin aus Lapislazuli ist teurer als Gold. Zinnober liefert leuchtendes Rot, Azurit und Malachit Blau und Grün — gebunden in Lein- oder Walnussöl.",
    supports: "Geglättete Eichentafeln mit heller Kreidegrundierung; Gold wird zunehmend als gemaltes Licht dargestellt.",
    tools: "Reibstein und Läufer zum Mahlen, Muschelnäpfe für Farbe, Lupe und Spiegel als Hilfsmittel.",
    brushes: "Winzige Marderhaarpinsel — teils nur wenige Haare stark — für Perlen, Pelz und Bartstoppeln.",
    technique: "Dünne, durchscheinende Öllasuren liegen übereinander. Licht dringt durch die Schichten, wird vom hellen Grund zurückgeworfen und lässt alles tief leuchten.",
    artistLens: [
      "Jan van Eyck, Hofmaler und Diplomat, signiert selbstbewusst und malt Stoffe wie ein Optiker.",
      "Rogier van der Weyden faltet Gewänder wie Architektur und macht Trauer körperlich spürbar.",
      "Hugo van der Goes malt Hirten mit rauen, echten Gesichtern — ein Schock für italienische Betrachter.",
      "Antonello da Messina bringt die niederländische Öltechnik nach Italien und verbindet sie mit klarer Geometrie.",
    ],
    mnemonics: [
    {
      text: "Merke: Öl trocknet langsam — deshalb sind Lasuren, Glanz und feinste Details möglich.",
      detail: "Tempera trocknet innerhalb Minuten und erlaubt keine Korrektur. Öl hingegen bleibt stunden- oder tagelang nass, sodass Farben verwischt, übereinandergelagert und bis zur Trocknung bearbeitet werden können.",
    },
    {
      text: "Merke: Alltagsdinge sind Symbole (Kerze = Gottes Gegenwart, Hund = Treue).",
      detail: "Ein Hund im Hochzeitsbild bedeutet Treue, eine erloschene Kerze das Ende des Lebens, eine Zitrone gleichzeitig Süße und Bitterkeit. Diese verborgene Sprache macht das Bild zu einem geistigen Rätsel.",
    },
    {
      text: "Merke: Antonello ist die Brücke, über die Öl von Flandern nach Venedig gelangt.",
      detail: "Antonello da Messina lernt die niederländische Öltechnik und bringt sie nach Italien. Venedig übernimmt sie, weil Öl auf Leinwand in der feuchten Lagunenluft besser hält als Tempera auf Holz.",
    }
  ],
  },
  {
    title: "Der gebaute Raum",
    era: "Florentiner Frührenaissance",
    years: "1420–1470",
    place: "Florenz",
    artists: ["Masaccio", "Fra Angelico", "Paolo Uccello", "Fra Filippo Lippi"],
    lesson: "Brunelleschis Zentralperspektive gibt der Malerei ein mathematisches Werkzeug: ein Fluchtpunkt, klare Größenverhältnisse, ein Raum, den man betreten möchte.",
    turningPoint: "Perspektive und Anatomie machen das Bild zu einem berechenbaren Fenster in die Welt.",
    experience: { title: "Fluchtpunkt in der Brancacci-Kapelle", story: "Ein Faden ist im Putz befestigt und markiert den Fluchtpunkt. Die Figuren stehen so fest, als könnte man um sie herumgehen.", mission: "Verfolge in jedem Bild die Linien des Bodens bis zu dem Punkt, an dem sie sich treffen." },
    history: "Florenz erlebt Zunftstolz, Wettbewerbe um Kirchentüren und eine neue Verehrung antiker Bauformen. Mönchsmaler und weltliche Werkstätten arbeiten Tür an Tür.",
    palette: ["Ultramarin", "Zinnober", "Ocker", "Grüne Erde", "Bleiweiß"],
    pigments: "Eitempera für Tafeln, Kalkfarben für Fresken. Grüne Erde bleibt Untermalung der Haut, Ultramarin bleibt dem Mantel Marias vorbehalten.",
    supports: "Pappelholz mit Gesso, Kirchenwände im Fresko, große Kartons zur Übertragung.",
    tools: "Lot, Schnur, Zirkel und Lineal — Perspektive wird buchstäblich in den Putz geritzt.",
    brushes: "Feine Temperapinsel für Konturen, breitere Pinsel für Fresko-Flächen.",
    technique: "Die geritzten Hilfslinien (Incisioni) im Putz zeigen bis heute, wie exakt der Raum konstruiert wurde.",
    artistLens: [
      "Masaccio malt mit 25 Jahren Figuren von solcher Schwere, dass die ganze Renaissance davon lernt.",
      "Fra Angelico verbindet mathematische Klarheit mit stiller Andacht in den Zellen von San Marco.",
      "Paolo Uccello ist besessen von Verkürzung — sogar zerbrochene Lanzen ordnen sich zum Raster.",
      "Fra Filippo Lippi, Mönch mit Skandalgeschichte, malt Madonnen mit unerhört menschlicher Zärtlichkeit.",
    ],
    mnemonics: [
    {
      text: "Merke: Zentralperspektive = ein Fluchtpunkt, in dem alle Tiefenlinien zusammenlaufen.",
      detail: "Brunelleschi demonstrierte das Prinzip am Florentiner Baptisterium: Parallele Linien schienen in einem einzigen Punkt zu verschwinden. Damit wurde der Bildraum mathematisch berechenbar.",
    },
    {
      text: "Merke: Masaccio bringt Licht von einer festen Quelle — Körper werfen echte Schatten.",
      detail: "In der Brancacci-Kapelle fällt das Licht immer von derselben Seite ein. Figuren werfen konsistente Schatten auf Boden und Wand, wodurch sie plastisch und im Raum verankert wirken.",
    },
    {
      text: "Merke: Fresko in Florenz, Tempera auf Pappelholz für Altäre.",
      detail: "Die Wahl des Bildträgers ist keine Modefrage: Feuchte Kirchenwände tragen Fresko, tragbare Altärtafeln brauchen leichtes Holz mit Kreidegrund. Jeder Träger bestimmt, wie die Farbe aufgetragen wird.",
    }
  ],
  },
  {
    title: "Ordnung, Licht und Hof",
    era: "Perspektive und Fürstenhöfe",
    years: "1450–1490",
    place: "Urbino · Mantua · Venedig",
    artists: ["Piero della Francesca", "Andrea Mantegna", "Giovanni Bellini", "Cosimo Tura"],
    lesson: "Perspektive wird zur Weltanschauung: kühle Geometrie, gleichmäßiges Licht, Figuren so ruhig wie Architektur. In Venedig kommt weiche Farbe hinzu.",
    turningPoint: "Die Kunst wandert an die Höfe — Maler werden Berater, Theoretiker und Statussymbole der Fürsten.",
    experience: { title: "Audienz in Urbino", story: "In der Studierstube des Herzogs hängen Bücher, Instrumente und ein Bild, dessen Räume so ruhig sind wie ein mathematischer Beweis.", mission: "Prüfe, wie Licht in jedem Werk gleichmäßig oder gerichtet eingesetzt wird." },
    history: "Kleine Fürstentümer wie Urbino, Mantua und Ferrara investieren in Bildung und Kunst. Venedig wird durch Handel mit dem Osten reich und offen für neue Materialien.",
    palette: ["Ultramarin", "Rosa", "Ocker", "Silbergrau", "Karmin"],
    pigments: "In Venedig gelangen Pigmente über den Orienthandel in die Werkstätten; Öl verdrängt langsam die Tempera.",
    supports: "Holztafeln, Fresko, in Venedig zunehmend Leinwand — sie widersteht der feuchten Lagunenluft besser.",
    tools: "Zirkel, Winkel, perspektivische Traktate; Mantegna nutzt Kupferstiche zur Verbreitung seiner Entwürfe.",
    brushes: "Feine Pinsel für harte Konturen bei Mantegna, weichere für Bellinis Farbübergänge.",
    technique: "Mischtechnik: Tempera-Untermalung, darüber Öllasuren — die Übergangsform zur reinen Ölmalerei.",
    artistLens: [
      "Piero della Francesca schreibt Traktate über Perspektive; seine Figuren stehen wie Säulen im Licht.",
      "Andrea Mantegna studiert antike Steine und malt Körper, als wären sie gemeißelt.",
      "Giovanni Bellini macht Landschaftslicht zur Stimmung und wird zum Lehrer Tizians.",
      "Cosimo Tura arbeitet in Ferrara scharfkantig, nervös und beinahe metallisch.",
    ],
    mnemonics: [
    {
      text: "Merke: Piero = Mathematik und ruhiges, gleichmäßiges Licht.",
      detail: "Piero della Francesca ordnet Figuren, Architektur und Landschaft nach Proportionen. Sein Licht ist klar und gleichmäßig, ohne dramatische Schatten — das Bild wirkt wie ein geometrischer Beweis.",
    },
    {
      text: "Merke: Mantegna = extreme Verkürzung und Antikenbegeisterung.",
      detail: "Mantegna malt Christus so von unten, dass die Füße riesig und der Körper verkürzt erscheinen. Diese Verkürzung beweist virtuoses Raumdenken und die Bewunderung römischer Reliefs.",
    },
    {
      text: "Merke: Venedig malt auf Leinwand, weil Feuchtigkeit Holz und Putz zerstört.",
      detail: "In der feuchten Lagunenluft biegen sich Holztafeln und bröckelt der Kalkputz. Leinwand auf Keilrahmen ist leichter, günstiger und widerstandsfähiger — und lässt zudem größere Formate zu.",
    }
  ],
  },
  {
    title: "Der Mensch im Mittelpunkt",
    era: "Medici-Florenz",
    years: "1470–1500",
    place: "Florenz",
    artists: ["Sandro Botticelli", "Domenico Ghirlandaio", "Andrea del Verrocchio", "Filippino Lippi"],
    lesson: "Humanismus und antike Mythologie verändern die Bildthemen: Venus darf so bedeutend sein wie eine Heilige. Linie, Bewegung und Schönheit tragen den Sinn.",
    turningPoint: "Kunst erzählt nicht mehr nur Heilsgeschichte, sondern erforscht den Menschen, die Antike und die eigene Stadt.",
    experience: { title: "Frühling im Medici-Florenz", story: "Dichter sprechen über Ovid, Gärten duften nach Orangen, und in Botticellis Werkstatt entsteht eine Göttin wie eine neue Idee.", mission: "Vergleiche Venus und Primavera: Folge den Linien von Haaren, Stoffen und Händen." },
    history: "Die Medici finanzieren Werkstätten, Feste und Gelehrte. Am Ende des Jahrhunderts predigt Savonarola gegen den Luxus — Bilder brennen im 'Feuer der Eitelkeiten'.",
    palette: ["Azuritblau", "Zinnober", "Ocker", "Grüne Erde", "Blattgold"],
    pigments: "Tempera erlaubt klare, helle Farbflächen; Gold wird sparsamer, dafür kostbar akzentuierend eingesetzt.",
    supports: "Pappelholz, Fresko in Familienkapellen und große Leinwände für die Mythologien.",
    tools: "Silberstift und Kohle für Studien, Werkstattbücher, Kartons und Modellzeichnungen nach lebenden Modellen.",
    brushes: "Feine Konturpinsel — Botticellis Linie lebt von einem gleichmäßigen, schwingenden Strich.",
    technique: "Tempera trocknet schnell: Modellierung entsteht durch feine, parallel gesetzte Striche statt durch Verwischen.",
    artistLens: [
      "Botticelli malt Bewegung als Musik: Kontur und Rhythmus sind wichtiger als Körperlichkeit.",
      "Ghirlandaio porträtiert die Florentiner Oberschicht mitten in heiligen Szenen — sein Lehrling heißt Michelangelo.",
      "Verrocchio führt die wichtigste Werkstatt der Stadt, in der auch Leonardo lernt.",
      "Filippino Lippi bringt fantastische, nervöse Details in die klare Florentiner Ordnung.",
    ],
    mnemonics: [
    {
      text: "Merke: Mythologie wird bildwürdig — Antike als neues Vorbild.",
      detail: "Unter dem Einfluss von Humanismus und Medici-Förderung rücken Venus, Mars und die Musen neben Heilige und Märtyrer. Die Antike wird nicht nur zitiert, sondern als lebendige Bildsprache neu erfunden.",
    },
    {
      text: "Merke: Botticellis Kraft liegt in der Linie, nicht im Schatten.",
      detail: "Botticelli modelliert Körper und Stoffe durch fließende Konturen statt durch Licht-Schatten-Modellierung. Seine Figuren wirken fast zweidimensional, rhythmisch und zeitlos.",
    },
    {
      text: "Merke: Werkstätten sind Schulen — Verrocchio unterrichtet Leonardo, Ghirlandaio Michelangelo.",
      detail: "Junge Künstler lernen jahrelang im Atelier eines Meisters, indem sie Grundierungen auftragen, Details malen und Skizzen anfertigen. Aus diesen Werkstätten gingen einige der bedeutendsten Maler der Renaissance hervor.",
    }
  ],
  },
  {
    title: "Fantasie und Menschentheater",
    era: "Niederländische Bilderwelten",
    years: "1480–1565",
    place: "’s-Hertogenbosch · Antwerpen",
    artists: ["Hieronymus Bosch", "Pieter Bruegel der Ältere", "Quentin Massys", "Joachim Patinir"],
    lesson: "Der Norden erfindet eigene Bildgattungen: Weltlandschaft, Bauernfest, Sittenbild und Albtraum. Der Blick geht von oben auf ein Gewimmel voller Sprichwörter.",
    turningPoint: "Landschaft und Alltag werden eigenständige Themen — nicht mehr nur Hintergrund für Heiligengeschichten.",
    experience: { title: "Jahrmarkt und Höllenschlund", story: "Zwischen Marktständen in Antwerpen siehst du ein Tafelbild voller Mischwesen. Daneben hängt eine Landschaft, in der der Horizont hoch oben liegt wie von einem Berg gesehen.", mission: "Zähle in einem Bruegel-Bild, wie viele kleine Geschichten gleichzeitig erzählt werden." },
    history: "Antwerpen wird zur größten Handelsstadt Europas, mit offenem Kunstmarkt statt reinem Auftragswesen. Reformation, Bilderstürme und spanische Herrschaft prägen die Stimmung.",
    palette: ["Kupfergrün", "Bleizinngelb", "Zinnober", "Erdbraun", "Blaugrau"],
    pigments: "Öl auf Eichenholz; für Fernblicke wird die Farbe nach hinten kühler und blauer (Luftperspektive).",
    supports: "Eichentafeln, oft dreiteilig als Triptychon; Bruegel malt auch auf Leinwand in Leimfarbe.",
    tools: "Skizzenbücher von Reisen (Bruegel überquert die Alpen), Vorlagenblätter, Druckgrafik als Zweitgeschäft.",
    brushes: "Feine Pinsel für Hunderte winziger Figuren, breitere für Himmel und Landschaftsgründe.",
    technique: "Luftperspektive: braun im Vordergrund, grün in der Mitte, blau in der Ferne — die Landschaft bekommt Tiefe ohne Konstruktion.",
    artistLens: [
      "Hieronymus Bosch erfindet Höllenmaschinen und Mischwesen als moralische Warnung.",
      "Pieter Bruegel der Ältere beobachtet Bauern, Jahreszeiten und Sprichwörter aus erhöhter Sicht.",
      "Quentin Massys verbindet Frömmigkeit mit Geldwechslern und satirischen Gesichtern.",
      "Joachim Patinir erfindet die Weltlandschaft, in der die biblische Figur winzig wird.",
    ],
    mnemonics: [
    {
      text: "Merke: Luftperspektive = braun vorn, grün in der Mitte, blau hinten.",
      detail: "Die Luft zwischen Betrachter und Horizont filtert das Licht. Deshalb erscheinen nahe Dinge warm und scharf, mittlere in Grüntönen und ferne Berge blau und verschwommen — eine Beobachtung, die schon Leonardo beschrieb.",
    },
    {
      text: "Merke: Patinir macht die Landschaft zum Hauptthema, die Erzählung zur Nebensache.",
      detail: "Bei Patinir wird die biblische Figur winzig in eine riesige, detailliert gemalte Welt gesetzt. Zum ersten Mal ist nicht das Heilige, sondern die Natur der wahre Protagonist des Bildes.",
    },
    {
      text: "Merke: Bruegels Bilder liest man wie ein Buch voller Sprichwörter.",
      detail: "Jede Figur, jede Geste und jedes Tier in Bruegels Bauern- und Jahreszeitenszenen entspricht einem bekannten Sprichwort. Das Bild ist eine moralische Komödie, die der Betrachter Wort für Wort entschlüsseln kann.",
    }
  ],
  },
  {
    title: "Der Künstler als Schöpfer",
    era: "Nordische Renaissance",
    years: "1490–1540",
    place: "Nürnberg · Wittenberg · Colmar",
    artists: ["Albrecht Dürer", "Matthias Grünewald", "Lucas Cranach der Ältere", "Hans Baldung"],
    lesson: "Druckgrafik verbreitet Bilder über Grenzen hinweg. Naturstudium, Proportionslehre und selbstbewusste Selbstbildnisse machen den Maler zum geistigen Autor.",
    turningPoint: "Mit Signatur, Selbstbild und reproduzierbarer Grafik entsteht ein modernes Verständnis von Urheberschaft.",
    experience: { title: "In Dürers Nürnberger Werkstatt", story: "Kupferplatten, Holzstöcke und Naturstudien füllen den Raum. Ein gedrucktes Blatt erreicht plötzlich Hunderte Menschen — die Medienrevolution der Renaissance.", mission: "Betrachte Fell und Haare: Wo zeigt Dürer Naturtreue, wo inszeniert er sich selbst?" },
    history: "Nürnberg liegt an europäischen Handelswegen. Gedruckte Bücher tragen humanistische und reformatorische Ideen; Cranach wird zum Bildproduzenten der Reformation.",
    palette: ["Bleiweiß", "Zinnober", "Azurit", "Ocker", "Pflanzenschwarz"],
    pigments: "Ölfarbe für genaue Oberflächen, Aquarell für transparente Naturstudien, Druckfarbe aus Ruß und Firnisöl.",
    supports: "Linden- und Eichenholz, Birnbaumholzstöcke für Schnitte, Kupferplatten, geschöpftes Papier.",
    tools: "Grabstichel, Schneidemesser, Druckpresse, Zirkel, Proportionslineal.",
    brushes: "Haarpinsel bis zur Einzelhaar-Spitze für Fell und Haare — plus Feder und Stichel als 'Pinselersatz' in der Grafik.",
    technique: "Holzschnitt = Hochdruck mit kräftigem Hell-Dunkel; Kupferstich = Tiefdruck mit dichten Kreuzschraffuren. Alles muss spiegelverkehrt gearbeitet werden.",
    artistLens: [
      "Albrecht Dürer verbindet nördliche Detailtreue mit italienischer Proportionslehre; sein Monogramm wird Markenzeichen.",
      "Matthias Grünewald steigert Leiden mit grellen Farben und verzerrten Körpern zur Erschütterung.",
      "Lucas Cranach der Ältere führt eine Bildfabrik in Wittenberg und liefert die Bilder der Reformation.",
      "Hans Baldung malt Hexen, Tod und Sinnlichkeit — die dunkle Seite der Renaissance.",
    ],
    mnemonics: [
    {
      text: "Merke: Holzschnitt druckt die stehengebliebenen Stege, Kupferstich die eingegrabenen Linien.",
      detail: "Beim Holzschnitt werden die nicht bedruckten Stellen weggeschnitten; die erhabenen Linien nehmen die Farbe auf. Beim Kupferstich gräbt der Stichel Furchen in die Platte, die beim Druck mit Tinte gefüllt werden.",
    },
    {
      text: "Merke: Dürers Monogramm 'AD' ist eines der ersten Künstlerzeichen Europas.",
      detail: "Albrecht Dürer signierte seine Werke konsequent mit einem stilisierten 'AD' und ließ sogar einen gerichtlichen Nachweis seiner Urheberschaft führen. Damit wird der Künstler bewusst zur Marke.",
    },
    {
      text: "Merke: Die Presse macht Bilder erstmals massenhaft verfügbar.",
      detail: "Ein einzelnes Kupfer- oder Holzplateau kann Hunderte gleichwertige Abzüge liefern. Drucke reisen schneller als Gemälde und verbreiten Stile, Ideen und Künstlerrenommee über Landesgrenzen hinweg.",
    }
  ],
  },
  {
    title: "Wissen wird Kunst",
    era: "Hochrenaissance",
    years: "1500–1520",
    place: "Florenz · Rom",
    artists: ["Leonardo da Vinci", "Raffael", "Michelangelo Buonarroti", "Pietro Perugino"],
    lesson: "Sfumato, Anatomie, Zentralperspektive und ideale Proportion verbinden Forschung mit einer neuen Vorstellung vom Individuum.",
    turningPoint: "Künstler werden gefeierte Universalgelehrte; ihre Werke beanspruchen Wissen, Schönheit und geistige Autorität zugleich.",
    experience: { title: "Audienz bei den Meistern", story: "Von Leonardos Studienblättern führt der Weg in die päpstlichen Räume. Philosophen diskutieren unter Raffaels Bögen, während Michelangelo über dir die Schöpfung malt.", mission: "Suche in allen drei Werken Gesten, die eine Beziehung zwischen Menschen herstellen." },
    history: "Florenz und das päpstliche Rom konkurrieren um die berühmtesten Meister. Anatomie, Mathematik, Antike und kirchliche Macht verbinden sich in monumentalen Aufträgen.",
    palette: ["Ultramarin", "Bleiweiß", "Zinnober", "Ocker", "Kupfergrün"],
    pigments: "Ultramarin wird oft gesondert abgerechnet. Für Haut mischt man Bleiweiß, rote Erde und Ocker; dunkle Lasuren modellieren Volumen.",
    supports: "Pappelholz und Leinwand für Öl, frischer Kalkputz für Fresken, großformatige Kartons zur Übertragung.",
    tools: "Rötel, Lochpausen (Spolvero), Gerüste, anatomische Studien und Wachsmodelle.",
    brushes: "Weiche, sehr feine Pinsel für Sfumato; Leonardo trägt Farbe teils mit den Fingern auf.",
    technique: "Sfumato: viele hauchdünne Lasuren lassen Konturen 'wie Rauch' verschwinden — es gibt keine harte Linie mehr.",
    artistLens: [
      "Leonardo da Vinci erforscht Wasser, Anatomie und Optik; Malen ist für ihn eine Form des Denkens.",
      "Raffael ordnet komplexe Gruppen mit scheinbarer Leichtigkeit und führt eine große Werkstatt.",
      "Michelangelo Buonarroti behandelt gemalte Körper wie aus dem Stein befreite Skulpturen.",
      "Pietro Perugino, Raffaels Lehrer, entwickelt die ruhige, symmetrische Bildordnung dieser Zeit.",
    ],
    mnemonics: [
    {
      text: "Merke: Sfumato = weiche Übergänge ohne Kontur (Leonardo).",
      detail: "Leonardo trägt zahllose hauchdünne Farbschichten übereinander, bis Konturen wie Rauch verschwinden. Lippen und Wangen werden nicht gezeichnet, sondern in Farbübergängen aufgelöst.",
    },
    {
      text: "Merke: Fresko wird in Tagwerken (giornate) gemalt — sichtbar an den Putzkanten.",
      detail: "Da der Kalkputz nur an einem Tag bemalt werden kann, arbeitet der Maler in Abschnitten. An den Übergängen entstehen feine Kanten, die heute noch den Arbeitsrhythmus der Renaissance sichtbar machen.",
    },
    {
      text: "Merke: Die Schule von Athen zeigt Philosophie als Architektur des Denkens.",
      detail: "Raffael gruppiert die großen Denker um zwei Zentralfiguren: Plato zeigt zur Ideenwelt hinauf, Aristoteles zur irdischen Erfahrung hinab. Die Baukörper selbst werden zum Symbol für Ordnung und Wissen.",
    }
  ],
  },
  {
    title: "Die Macht der Farbe",
    era: "Venezianische Renaissance",
    years: "1500–1580",
    place: "Venedig",
    artists: ["Giorgione", "Tizian", "Lorenzo Lotto", "Paolo Veronese"],
    lesson: "In Venedig entscheidet nicht die Zeichnung (disegno), sondern die Farbe (colorito). Bilder entstehen direkt auf der Leinwand, Schicht für Schicht, ohne festen Entwurf.",
    turningPoint: "Der sichtbare Pinselstrich wird zum Ausdrucksmittel — die Grundlage aller späteren freien Malerei.",
    experience: { title: "Licht über der Lagune", story: "Feuchte Luft, glitzerndes Wasser, Stoffe aus dem Orient. In Tizians Atelier steht eine Leinwand, die monatelang immer wieder übermalt wird.", mission: "Suche Stellen, an denen du einzelne Pinselstriche erkennen kannst." },
    history: "Venedig lebt vom Seehandel und ist politisch stabil. Große Bruderschaften und Kirchen bestellen riesige Leinwände; Farbe kommt als Handelsware direkt aus dem Osten.",
    palette: ["Venezianischrot", "Ultramarin", "Bleizinngelb", "Karmin", "Goldocker"],
    pigments: "Feine Pigmenthändler (vendecolori) beliefern die Werkstätten — ein Beruf, den es nur in Venedig gibt.",
    supports: "Grobe Leinwand auf Keilrahmen, oft in gewaltigen Formaten für Kirchensäle.",
    tools: "Palette, Malstock, Firnisse und Harze; Farbe wird pastos aufgetragen und wieder lasiert.",
    brushes: "Große Borstenpinsel, im Alterswerk Tizians auch Lappen und Finger.",
    technique: "Colorito: die Form entsteht aus Farbschichten. Tizian dreht Bilder monatelang zur Wand und übermalt sie erneut.",
    artistLens: [
      "Giorgione erfindet stimmungsvolle, rätselhafte Bilder ohne klare Erzählung.",
      "Tizian arbeitet für Kaiser und Päpste; sein Spätwerk löst Formen fast in Farbe auf.",
      "Lorenzo Lotto malt psychologisch scharfe Porträts abseits des großen Ruhms.",
      "Paolo Veronese inszeniert Festmähler in prächtiger Architektur — bis die Inquisition nachfragt.",
    ],
    mnemonics: [
    {
      text: "Merke: Florenz = disegno (Zeichnung), Venedig = colorito (Farbe).",
      detail: "Florentiner Künstler planen das Bild durch Zeichnung und Konstruktion; für sie ist die Idee oberstes Prinzip. Venezianer Maler entwickeln die Form erst beim Malen auf der Leinwand durch Farbschichten.",
    },
    {
      text: "Merke: Leinwand statt Holz, weil die Lagunenluft feucht ist.",
      detail: "Feuchtigkeit lässt Holztafeln sich verziehen und Kalkputz bröckeln. Leinwand ist flexibel, leicht und preiswert; sie eignet sich besonders für die riesigen Altargemälde der venezianischen Kirchen.",
    },
    {
      text: "Merke: Tizians Spätwerk zeigt den Pinselstrich offen — Vorbild für Rubens und Rembrandt.",
      detail: "Im Alter malt Tizian immer freier; Konturen lösen sich auf, Farbe wird zum Hauptträger des Ausdrucks. Diese Freiheit inspiriert spätere Maler, den sichtbaren Pinselstrich als eigenständiges Mittel zu nutzen.",
    }
  ],
  },
  {
    title: "Das Gesicht der Macht",
    era: "Porträt der Reformationszeit",
    years: "1520–1570",
    place: "Basel · London · Cremona",
    artists: ["Hans Holbein der Jüngere", "Jean Clouet", "Sofonisba Anguissola", "Andrea del Sarto"],
    lesson: "Im konfessionellen Streit verlieren Altarbilder an Boden — das Porträt gewinnt. Kleidung, Gegenstände und Blick werden zur genauen Sprache von Rang und Charakter.",
    turningPoint: "Das Bildnis wird zum wichtigsten Auftrag Europas und macht Maler zu Hofdiplomaten.",
    experience: { title: "Am Hof Heinrichs VIII.", story: "Ein Maler misst mit Kreide ein Gesicht aus, notiert Farben am Rand des Blattes und überträgt die Züge später exakt auf die Tafel.", mission: "Untersuche, was Hände, Schmuck und Bücher über die dargestellte Person verraten." },
    history: "Reformation und Bildersturm verändern das Auftragswesen. Fürstenhöfe tauschen Porträts wie Visitenkarten; erstmals gelingt auch Malerinnen wie Anguissola eine internationale Karriere.",
    palette: ["Zinnober", "Ultramarin", "Bleiweiß", "Schwarz", "Blattgold"],
    pigments: "Reine, deckende Farbflächen und schwarze Gewänder betonen Kostbarkeit; Gold wird als gemalter Schmuck gesetzt.",
    supports: "Eichentafeln, Pergament für Miniaturen, Leinwand für große Hofbildnisse.",
    tools: "Farbige Kreiden für Porträtstudien, Durchpausblätter, Zirkel für Ornamente.",
    brushes: "Feinste Haarpinsel für Stickereien, Pelze und Bartlinien.",
    technique: "Zuerst eine exakte Kreidestudie nach dem Leben, dann Übertragung und ruhige Ölmalerei ohne sichtbare Handschrift.",
    artistLens: [
      "Hans Holbein der Jüngere malt Macht als kühle, unbestechliche Oberfläche.",
      "Jean Clouet begründet mit Kreideporträts die französische Hofbildnis-Tradition.",
      "Sofonisba Anguissola wird als Malerin an den spanischen Hof berufen und malt Familien voller Leben.",
      "Andrea del Sarto gilt in Florenz als 'fehlerloser Maler' mit weichem, gedämpftem Kolorit.",
    ],
    mnemonics: [
    {
      text: "Merke: Nach der Reformation wird das Porträt zur wichtigsten Gattung im Norden.",
      detail: "Wo religiöse Bilder verboten oder verkleinert werden, verliert der Altar seinen Vorrang. Adlige und Bürger bestellen stattdessen Porträts als diplomatische Geschenke und Statusdokumente.",
    },
    {
      text: "Merke: Holbein arbeitet nach exakten Kreidestudien — nicht frei aus dem Kopf.",
      detail: "Holbein zeichnete seine Modelle mit farbigen Kreiden direkt nach dem Leben und notierte Farbproben am Rand. Erst im Atelier übertrug er diese Studien präzise auf die Tafel.",
    },
    {
      text: "Merke: Attribute (Buch, Handschuh, Schädel) erzählen Beruf, Rang und Vergänglichkeit.",
      detail: "Ein Federkiel weist auf einen Gelehrten hin, ein Totenschädel an einem Stillleben erinnert an die Vergänglichkeit, ein bestimmter Handschuh kennzeichnet den Stand. Attribute sind stumme Biografien.",
    }
  ],
  },
  {
    title: "Die schöne Übertreibung",
    era: "Manierismus",
    years: "1520–1600",
    place: "Parma · Mantua · Toledo",
    artists: ["Parmigianino", "Rosso Fiorentino", "Giulio Romano", "El Greco"],
    lesson: "Nach der perfekten Harmonie folgt die bewusste Regelverletzung: überlange Glieder, enge Räume, künstliche Farben, gedrehte Figuren (figura serpentinata).",
    turningPoint: "Kunst zeigt offen ihre eigene Künstlichkeit — Stil wird wichtiger als Naturtreue.",
    experience: { title: "Verzerrter Spiegel", story: "In einem Palast in Mantua scheinen die Säulen zu rutschen. Ein Selbstbildnis im Konvexspiegel dehnt die Hand ins Riesenhafte.", mission: "Finde in jedem Werk eine Stelle, die absichtlich 'falsch' proportioniert ist." },
    history: "Der Sacco di Roma 1527 erschüttert Italien. Unsicherheit, Höfe mit exklusivem Geschmack und die Konkurrenz zu Raffael und Michelangelo begünstigen extreme, gelehrte Bilderfindungen.",
    palette: ["Säuregrün", "Rosaviolett", "Zitronengelb", "Kaltes Blau", "Silbergrau"],
    pigments: "Schillernde 'cangianti'-Farben wechseln im Faltenwurf den Ton — Rosa geht in Grün über.",
    supports: "Leinwand und Holz, Fresko in Palästen und Grotten.",
    tools: "Konvexspiegel, Wachsmodelle in verdrehter Haltung, gelehrte Bildprogramme.",
    brushes: "Feine Pinsel für glatte, emailartige Oberflächen ohne sichtbare Spur.",
    technique: "Figura serpentinata: die Figur windet sich spiralförmig, damit sie von allen Seiten spannend wirkt.",
    artistLens: [
      "Parmigianino dehnt Hälse und Hände zu einer kühlen, unerreichbaren Eleganz.",
      "Rosso Fiorentino setzt grelle Farben und harte Kontraste gegen die klassische Ruhe.",
      "Giulio Romano, Raffaels Schüler, lässt in Mantua gemalte Architektur einstürzen.",
      "El Greco verbindet byzantinische Herkunft und venezianische Farbe zu flammenden, langgezogenen Figuren.",
    ],
    mnemonics: [
    {
      text: "Merke: Manierismus = bewusste Übertreibung nach der Hochrenaissance.",
      detail: "Nach der vermeintlich vollendeten Harmonie von Raffael und Michelangelo setzen Künstler bewusst auf Verzerrung, Künstlichkeit und Eleganz. Der Körper wird länger, der Raum enger, die Farbe unnatürlicher.",
    },
    {
      text: "Merke: Cangianti-Farben wechseln in der Falte den Farbton.",
      detail: "Statt Schatten durch Schwarz abdunkeln, wechseln manieristische Maler die Farbe in den Falten — etwa von Gelb zu Grün oder von Rosa zu Silber. Das Gewand wirkt dadurch schillernd und unecht.",
    },
    {
      text: "Merke: Figura serpentinata = spiralig gedrehte Körperhaltung.",
      detail: "Die Figur windet sich wie eine Schlange und bietet von jeder Seite eine andere Ansicht. Diese Drehung macht den Körper dynamisch, elegant und künstlich zugleich.",
    }
  ],
  },
  {
    title: "Licht wird Drama",
    era: "Barock in Rom",
    years: "1590–1640",
    place: "Rom · Neapel",
    artists: ["Michelangelo Merisi da Caravaggio", "Artemisia Gentileschi", "Orazio Gentileschi", "Georges de La Tour"],
    lesson: "Hell-Dunkel, bewegte Körper und starke Diagonalen verwandeln das Bild in eine Bühne. Kunst soll nicht erklären, sondern überwältigen.",
    turningPoint: "Heilige treten als körperlich glaubhafte Menschen mit schmutzigen Füßen in scharfes Licht.",
    experience: { title: "Eine Nacht in Rom", story: "Du folgst einer Gasse bis San Luigi dei Francesi. Aus dem Halbdunkel schneidet ein Lichtstrahl durch eine alltägliche Tischrunde.", mission: "Verfolge in jedem Werk die hellste Stelle und frage, warum gerade sie leuchtet." },
    history: "Im Rom der Gegenreformation soll Kunst Gläubige unmittelbar bewegen. Kirchen, Kardinäle und ein wachsender Markt verlangen dramatische, sofort lesbare Bilder.",
    palette: ["Bleiweiß", "Zinnober", "Ocker", "Umbra", "Beinschwarz"],
    pigments: "Warme Erdfarben und tiefe Schwarztöne bilden die Bühne für wenige leuchtende Akzente.",
    supports: "Große Leinwände auf Keilrahmen — leichter zu transportieren als Holztafeln.",
    tools: "Verdunkelte Ateliers mit einem hochgesetzten Fenster, lebende Modelle von der Straße, Kerzen als Lichtquelle.",
    brushes: "Kräftige Borstenpinsel; Caravaggio verzichtet fast völlig auf Vorzeichnungen und ritzt nur Markierungen in den Grund.",
    technique: "Tenebrismus: dunkler Grund, ein einziger harter Lichtkegel. Chiaroscuro modelliert Körper allein durch Licht und Schatten.",
    artistLens: [
      "Caravaggio malt direkt nach Modellen aus den Straßen Roms und lebt selbst rastlos zwischen Ruhm und Flucht.",
      "Artemisia Gentileschi behauptet sich als gefeierte Malerin; ihre Heldinnen handeln entschlossen.",
      "Orazio Gentileschi trägt den römischen Stil bis an den englischen Hof.",
      "Georges de La Tour reduziert die Szene auf eine einzige Kerze und stille, geometrische Ruhe.",
    ],
    mnemonics: [
    {
      text: "Merke: Chiaroscuro = Modellieren durch Hell-Dunkel; Tenebrismus = extremer Dunkelgrund.",
      detail: "Chiaroscuro formt Körper allmählich aus Licht und Schatten. Tenebrismus, besonders bei Caravaggio, taucht fast das ganze Bild in Schwarz und lässt nur einen grellen Lichtkegel die Handlung zeigen.",
    },
    {
      text: "Merke: Caravaggio malt ohne Zeichnung direkt auf die dunkle Grundierung.",
      detail: "Caravaggio ritzt nur wenige Linien in einen braunen Grund und malt die Figuren direkt mit Licht und Farbe heraus. Diese Unmittelbarkeit macht seine Szenen unwirklich real.",
    },
    {
      text: "Merke: Ein Lichtkegel führt den Blick zum entscheidenden Moment.",
      detail: "Im Dunkel des Bildes öffnet sich ein einziger heller Bereich wie auf einer Bühne. Dort liegt die Handlung, der Blick des Betrachters wird gezwungen, genau diesen Punkt zu sehen.",
    }
  ],
  },
  {
    title: "Bewegung und Repräsentation",
    era: "Höfischer Barock",
    years: "1600–1660",
    place: "Antwerpen · Madrid · Bologna",
    artists: ["Peter Paul Rubens", "Anthonis van Dyck", "Diego Velázquez", "Domenichino"],
    lesson: "Der Barock der Höfe arbeitet mit Diagonalen, wehenden Stoffen und wirbelnden Körpern. Zugleich entsteht das elegante Staatsporträt.",
    turningPoint: "Die Werkstatt wird zum Unternehmen: Rubens organisiert Aufträge für ganz Europa und wird Diplomat.",
    experience: { title: "Im Antwerpener Atelierhaus", story: "Dutzende Mitarbeiter arbeiten an Ölskizzen, Kartons und riesigen Leinwänden. Der Meister setzt nur die entscheidenden Akzente.", mission: "Achte darauf, wie eine Diagonale den Blick durch das ganze Bild führt." },
    history: "Katholische Höfe in Flandern, Spanien und Frankreich nutzen Kunst zur Selbstdarstellung. Velázquez steigt am spanischen Hof bis zum Kammerherrn auf.",
    palette: ["Karmin", "Bleiweiß", "Umbra", "Zinnober", "Ultramarin"],
    pigments: "Warme, transparente Lasuren über heller Untermalung geben Haut ihren Schimmer; Rubens malt Fleischtöne aus wenigen Grundfarben.",
    supports: "Große Leinwände, dazu kleine Ölskizzen auf Holz als Entwurf und Verkaufsargument.",
    tools: "Ölskizze (bozzetto), Werkstatt mit Spezialisten für Tiere, Blumen und Landschaft, Kartons für Wandteppiche.",
    brushes: "Breite, weiche Pinsel für schwungvolle Züge; Velázquez arbeitet mit langen Pinseln aus Distanz zur Leinwand.",
    technique: "Alla prima in Teilen: dünne, flüssige Farbe wird zügig gesetzt, damit Bewegung nicht erstarrt.",
    artistLens: [
      "Peter Paul Rubens verbindet Gelehrsamkeit, Diplomatie und eine europaweit arbeitende Werkstatt.",
      "Anthonis van Dyck erfindet das elegante Herrscherporträt, das England 200 Jahre prägt.",
      "Diego Velázquez untersucht mit lockerer Farbe Rang, Wahrnehmung und die Rolle des Malers selbst.",
      "Domenichino hält in Bologna und Rom an klassischer Klarheit gegen das Caravaggio-Fieber fest.",
    ],
    mnemonics: [
    {
      text: "Merke: Barockkomposition lebt von Diagonale und Bewegung statt Symmetrie.",
      detail: "Renaissance-Kompositionen ruhen oft in ruhiger Symmetrie. Barocke Bilder setzen auf schräge Linien, wirbelnde Gewänder und Figuren, die aus dem Bildrand zu fallen drohen — Bewegung wird zum Inhalt.",
    },
    {
      text: "Merke: Die Ölskizze ist Rubens' Entwurfswerkzeug für Großaufträge.",
      detail: "Rubens fertigte kleine, lebhafte Ölskizzen an, um Komposition, Licht und Farbe zu erproben. Aufträge bestätigten die Kunden oft erst nach dieser Skizze, bevor die riesige Leinwand begonnen wurde.",
    },
    {
      text: "Merke: Las Meninas zeigt den Maler im Bild — Malerei über das Sehen.",
      detail: "Velázquez steht selbst vor einer riesigen Leinwand und blickt zum Betrachter. Im Hintergrund spiegelt sich das Königspaar, das eigentlich das Motiv sein könnte — das Bild wird zum Spiel aus Blicken.",
    }
  ],
  },
  {
    title: "Menschen im Halbdunkel",
    era: "Rembrandts Amsterdam",
    years: "1630–1670",
    place: "Amsterdam · Haarlem",
    artists: ["Rembrandt van Rijn", "Frans Hals", "Judith Leyster", "Carel Fabritius"],
    lesson: "Ein freier Kunstmarkt bringt Gruppenporträts, Selbstbildnisse und Radierungen hervor. Licht wird zum Werkzeug der Psychologie.",
    turningPoint: "Bürgerliche Auftraggeber und Sammler entscheiden, welche Motive bedeutend sind — Kunst wird Ware und Charakterstudie zugleich.",
    experience: { title: "Auftrag der Schützengilde", story: "Achtzehn Männer zahlen für ein Gruppenbild — und bekommen keine Reihe, sondern einen Aufbruch mitten in der Bewegung.", mission: "Suche im Gruppenbild die Figur, die die Handlung wirklich auslöst." },
    history: "Die protestantische Republik hat kaum kirchliche Aufträge, dafür wohlhabende Bürger. Bilder werden auf Märkten gehandelt; Rembrandt erlebt Ruhm und Bankrott.",
    palette: ["Bleiweiß", "Ocker", "Umbra", "Beinschwarz", "Krapplack"],
    pigments: "Wenige, warme Erdfarben. Rembrandt setzt Licht pastos auf und lässt die Schatten dünn und transparent.",
    supports: "Leinwand mit warmbrauner oder grauer Grundierung, Kupferplatten für Radierungen.",
    tools: "Radiernadel, Ätzbad, Druckpresse, Spachtel, Malstock.",
    brushes: "Von feinsten Haarpinseln bis zu harten Borsten; Rembrandt kratzt Farbe auch mit dem Pinselstiel.",
    technique: "Impasto: dicke Farbe fängt echtes Licht ein. In der Radierung entstehen Grautöne durch die Dichte der Nadellinien.",
    artistLens: [
      "Rembrandt van Rijn malt sich selbst ein Leben lang und macht Scheitern zum Bildthema.",
      "Frans Hals fängt Lachen und Haltung mit schnellen, sichtbaren Strichen ein.",
      "Judith Leyster führt als eine der wenigen Frauen eine eigene Werkstatt in Haarlem.",
      "Carel Fabritius, Rembrandt-Schüler, erforscht helles Licht und Perspektive — er stirbt jung bei der Delfter Pulverexplosion.",
    ],
    mnemonics: [
    {
      text: "Merke: Impasto = dick aufgetragene Farbe, die Licht physisch reflektiert.",
      detail: "Rembrandt trug Farbe so dick auf, dass sie Schatten wirft und Licht reflektiert. Ein Kragen oder eine Stirnleiste wird dadurch zur plastischen, begehbaren Oberfläche.",
    },
    {
      text: "Merke: Radierung entsteht durch Säure, Kupferstich durch den Stichel.",
      detail: "Bei der Radierung deckt der Künstler die Platte mit wachsfester Grundierung ab, kratzt das Motiv frei und taucht sie in Säure. Beim Kupferstich gräbt er jede Linie selbst mit dem Stichel.",
    },
    {
      text: "Merke: Die Nachtwache ist kein Nachtbild — nur alter Firnis hatte sie verdunkelt.",
      detail: "Jahrhundertelang verdunkelte ein gelb gewordener Firnis das Gemälde. Als man ihn in der Moderne entfernte, entstand der Eindruck eines nächtlichen Szenarios — ursprünglich spielt sie bei Tageslicht.",
    }
  ],
  },
  {
    title: "Die Ruhe des Alltags",
    era: "Delfter Stille",
    years: "1650–1675",
    place: "Delft",
    artists: ["Johannes Vermeer", "Pieter de Hooch", "Gabriel Metsu", "Pieter Saenredam"],
    lesson: "Ein Fenster links, eine Frau bei einer stillen Tätigkeit, Licht auf einer weißen Wand: Alltag wird durch Geometrie und Licht zum kostbaren Ereignis.",
    turningPoint: "Das kleine Format des Innenraums beweist, dass Bedeutung nicht von der Größe des Themas abhängt.",
    experience: { title: "Licht auf der weißen Wand", story: "Im Delfter Haus fällt Vormittagslicht durch Bleiglas. Auf dem Brot sitzen winzige Farbtupfen wie Perlen.", mission: "Bestimme in jedem Bild, wo das Licht herkommt und was es zuerst trifft." },
    history: "Nach der Explosion des Pulvermagazins 1654 baut sich Delft neu auf. Eine kleine Gruppe Maler perfektioniert Innenraum, Perspektive und Lichtbeobachtung.",
    palette: ["Natürliches Ultramarin", "Bleizinngelb", "Bleiweiß", "Ocker", "Krapplack"],
    pigments: "Vermeer verwendet teures Ultramarin sogar in Schatten — deshalb wirken seine Halbschatten kühl und blau.",
    supports: "Feine Leinwand, glatt grundiert, in kleinen Formaten.",
    tools: "Camera obscura als Sehhilfe (umstritten), Fadenspannung für Fluchtpunkte, Nadelloch in der Leinwand als Perspektivzentrum.",
    brushes: "Kleine, weiche Pinsel; Lichtpunkte werden als runde 'Pointillés' aufgesetzt.",
    technique: "Farbschichten aus dünner Untermalung und pastosen Lichtpunkten; Konturen bleiben absichtlich leicht unscharf.",
    artistLens: [
      "Johannes Vermeer arbeitet extrem langsam und hinterlässt nur rund 35 Bilder.",
      "Pieter de Hooch öffnet Durchblicke von Zimmer zu Hof — Raum wird zur Erzählung.",
      "Gabriel Metsu verbindet feine Stofflichkeit mit warmherzigem Alltagshumor.",
      "Pieter Saenredam malt weiß getünchte Kirchenräume als reine Studien von Licht und Proportion.",
    ],
    mnemonics: [
    {
      text: "Merke: Vermeers Licht kommt fast immer von links durch ein Fenster.",
      detail: "In fast allen Interieurs von Vermeer fällt das Tageslicht von links ein und trifft auf eine weiße Wand. Diese Regelmäßigkeit ist ein Merkmal seines Ateliers und seiner kompositorischen Gewohnheit.",
    },
    {
      text: "Merke: Pointillés = perlenartige Lichttupfen auf Brot, Perlen und Metall.",
      detail: "Vermeer setzte winzige, pastose Farbpunkte, die wie Perlen wirken. Sie simulieren das Glitzern von Licht auf glatten Oberflächen und verleihen Dingen eine stoffliche Präsenz.",
    },
    {
      text: "Merke: Blaue Schatten entstehen durch teures Ultramarin, nicht durch Schwarz.",
      detail: "Vermeer mischte teures Lapislazuli-Blau in seine Schatten, statt Schwarz zu verwenden. Das macht sein Halblicht kühl und leuchtend zugleich — ein Luxus, den sich nur wenige Maler leisten konnten.",
    }
  ],
  },
  {
    title: "Dinge, Wetter und Vergänglichkeit",
    era: "Stillleben und Landschaft",
    years: "1620–1680",
    place: "Haarlem · Antwerpen",
    artists: ["Willem Kalf", "Willem Claesz. Heda", "Clara Peeters", "Jacob van Ruisdael"],
    lesson: "Wenn Heiligenbilder verboten sind, werden Dinge und Wolken zum Thema: Stillleben, Landschaft, Seestücke — jede Gattung mit eigenen Spezialisten.",
    turningPoint: "Die Malerei spezialisiert sich; das Stillleben erzählt über Reichtum, Handel und Vergänglichkeit.",
    experience: { title: "Frühstück und Sturmhimmel", story: "Auf einem gedeckten Tisch liegt eine halb geschälte Zitrone, deren Schale sich spiralig ringelt. Draußen zieht über den Dünen ein Wolkenberg auf.", mission: "Suche im Stillleben das Detail, das an die Vergänglichkeit erinnert." },
    history: "Die Niederlande handeln weltweit; Zitronen, Porzellan und Nautiluspokale zeigen globale Verbindungen — und koloniale Handelsmacht.",
    palette: ["Bleizinngelb", "Grau", "Braun", "Olivgrün", "Silberweiß"],
    pigments: "Monochrome 'Banketje'-Stillleben nutzen wenige Grau- und Brauntöne; Ruisdael baut Himmel aus Bleiweiß und feinen Grauabstufungen.",
    supports: "Leinwand und Eichenholz mit glattem, hellem Grund.",
    tools: "Spiegel für Reflexionen, Glasgefäße und echte Objekte als Modelle, Wolkenstudien im Freien.",
    brushes: "Feinste Pinsel für Glanzlichter auf Glas und Silber, breite für Himmelsflächen.",
    technique: "Glanzlicht-Technik: ein einziger weißer Punkt lässt Glas hart, Perle weich und Silber kalt erscheinen.",
    artistLens: [
      "Willem Kalf inszeniert Luxus in dunklem Raum: Porzellan, Teppich, Zitrone.",
      "Willem Claesz. Heda beherrscht das stille graue Frühstücksstillleben mit umgekipptem Glas.",
      "Clara Peeters gehört zu den ersten Frauen im Fach und versteckt Selbstporträts in Reflexionen.",
      "Jacob van Ruisdael macht den Himmel zur Hauptperson — zwei Drittel des Bildes sind Wolken.",
    ],
    mnemonics: [
    {
      text: "Merke: Vanitas = Symbole der Vergänglichkeit (Schädel, Uhr, erloschene Kerze).",
      detail: "Niederländische Stillleben erinnern den Betrachter an Tod, Zeit und Eitelkeit. Jeder Gegenstand ist eine Mahnung: Der Blumenstrauß verwelkt, die Uhr tickt, der Schädel bleibt.",
    },
    {
      text: "Merke: Bei Ruisdael nimmt der Himmel meist zwei Drittel der Bildhöhe ein.",
      detail: "Ruisdael öffnet den Blick nach oben und macht Wolken, Licht und Wetter zum eigentlichen Drama. Die Erde wird klein, der Himmel zum Protagonisten.",
    },
    {
      text: "Merke: Die geschälte Zitrone steht für Schönheit mit bitterem Kern.",
      detail: "In Stillleben symbolisiert die Zitrone die zweifache Natur des Lebens: süß äußerlich, bitter im Kern. Sie ist ein Vanitas-Symbol für vergängliche Schönheit und irdischen Reichtum.",
    }
  ],
  },
  {
    title: "Die geordnete Natur",
    era: "Klassische Landschaft",
    years: "1620–1690",
    place: "Rom · Sevilla",
    artists: ["Nicolas Poussin", "Claude Lorrain", "Bartolomé Esteban Murillo", "Paulus Potter"],
    lesson: "Neben dem lauten Barock entsteht ein ruhiger, klassischer Ton: Landschaft nach antikem Vorbild, sanftes Abendlicht, klare Bildbühnen.",
    turningPoint: "Die 'ideale Landschaft' wird zum europäischen Vorbild bis weit ins 19. Jahrhundert.",
    experience: { title: "Abendlicht in der Campagna", story: "Vor den Toren Roms zeichnest du Ruinen und Hirten. Die Sonne steht tief; die Bäume rahmen die Sicht wie Theaterkulissen.", mission: "Erkenne die drei Bildbühnen: dunkler Vordergrund, heller Mittelgrund, blaue Ferne." },
    history: "Nordeuropäische Maler leben in Rom und studieren Antike und Landschaft. In Spanien entsteht parallel eine warme, volksnahe Frömmigkeit.",
    palette: ["Goldocker", "Olivgrün", "Himmelblau", "Karmin", "Bleiweiß"],
    pigments: "Warme Erdtöne bauen den Vordergrund, kühle Blautöne die Ferne. Firnis vertieft die Abendstimmung.",
    supports: "Leinwand mittleren Formats für Sammler; Skizzen auf Papier direkt in der Natur.",
    tools: "Freiluft-Zeichenbuch, Wachsmodelle für Figurengruppen (Poussin baut kleine Bühnen), Claude-Glas zum Abdunkeln der Aussicht.",
    brushes: "Weiche Pinsel für Laub und Dunst, feine Pinsel für Staffagefiguren.",
    technique: "Repoussoir: ein dunkler Baum oder Fels am Bildrand schiebt den Blick in die Tiefe.",
    artistLens: [
      "Nicolas Poussin baut jede Komposition wie ein Philosoph, mit Modellbühne und klarem Sinn.",
      "Claude Lorrain erfindet das Bild gegen die Sonne — Licht als eigentliches Motiv.",
      "Bartolomé Esteban Murillo malt in Sevilla weiche, mitfühlende Szenen von Kindern und Heiligen.",
      "Paulus Potter macht ein junges Rind in Lebensgröße zum Hauptdarsteller.",
    ],
    mnemonics: [
    {
      text: "Merke: Repoussoir = dunkler Randabschluss, der Tiefe erzeugt.",
      detail: "Ein dunkler Baum oder Fels am linken oder rechten Bildrand schiebt den Blick in die Tiefe. Diese 'Stoßvorrichtung' rahmt die Landschaft und verstärkt die räumliche Wirkung.",
    },
    {
      text: "Merke: Ideale Landschaft = Antike, Abendlicht, drei Bildbühnen.",
      detail: "Poussin und Claude konstruierten Landschaften aus Vordergrund, Mittelgrund und Ferne. Darin tauchen antike Ruinen, Hirten und ein gleichmäßiges, goldenes Abendlicht auf.",
    },
    {
      text: "Merke: Claude Lorrain malt als Erster direkt in die Sonne.",
      detail: "Claude Lorrain richtete den Blick gegen das Licht und ließ Bäume, Figuren und Ruinen in den Sonnenschein treten. Dieser Gegenlicht-Effekt wurde zum Vorbild für die Landschaftsmalerei der folgenden Jahrhunderte.",
    }
  ],
  },
  {
    title: "Leichtigkeit und Puder",
    era: "Rokoko",
    years: "1700–1770",
    place: "Paris · Venedig",
    artists: ["Jean-Antoine Watteau", "François Boucher", "Jean-Honoré Fragonard", "Rosalba Carriera"],
    lesson: "Nach dem strengen Hof Ludwigs XIV. wird alles kleiner, heller, privater: Pastelltöne, Schäferspiele, Liebesgärten und flirrende Pinselschrift.",
    turningPoint: "Das Bild zieht aus dem Schloss in den Salon — intime Formate für private Sammler.",
    experience: { title: "Fest im Park", story: "Seidenkleider rascheln, Musik klingt aus dem Gebüsch. Doch in Watteaus Bild liegt hinter der Heiterkeit eine leise Melancholie.", mission: "Suche im heiteren Fest den Hinweis auf Abschied und Vergänglichkeit." },
    history: "Der Adel lebt in Stadtpalais mit kleinen Räumen. Pastell wird Mode, Frauen wie Rosalba Carriera erreichen europäischen Ruhm; die Aufklärung kritisiert bald diesen Luxus.",
    palette: ["Rosé", "Himmelblau", "Cremeweiß", "Blassgrün", "Silber"],
    pigments: "Helle, mit Weiß gebrochene Töne; Pastellkreiden aus reinem Pigment und Bindemittel erlauben samtige Oberflächen.",
    supports: "Leinwand in kleinem Format, Papier für Pastelle, Wandvertäfelungen und Supraporten.",
    tools: "Rötel-Schwarz-Weiß-Zeichnung (trois crayons), Pastellkreiden, Fixativ, kleine Handstaffelei.",
    brushes: "Kurze, weiche Pinsel für tupfende Striche; beim Pastell arbeiten Finger und Wischer statt Pinsel.",
    technique: "Trois crayons: drei Kreidefarben auf getöntem Papier ergeben in Sekunden lebendige Hauttöne.",
    artistLens: [
      "Jean-Antoine Watteau erfindet die 'fête galante' — Feste voller feiner Traurigkeit.",
      "François Boucher liefert der Marquise de Pompadour Bilder wie duftige Bühnenbilder.",
      "Jean-Honoré Fragonard malt Schwung und Sinnlichkeit mit blitzschnellem Pinsel.",
      "Rosalba Carriera macht das Pastellporträt zur europäischen Mode und arbeitet für Höfe von Paris bis Dresden.",
    ],
    mnemonics: [
    {
      text: "Merke: Fête galante = elegantes Gartenfest als eigene Bildgattung (Watteau).",
      detail: "Watteau erfand die 'fête galante': Musikanten, verliebte Paare und Schäferspiele in einem Park. Hinter der Leichtigkeit liegt oft eine leise Melancholie des Abschieds.",
    },
    {
      text: "Merke: Pastell ist reines Pigment in Stäbchenform — samtig, aber empfindlich.",
      detail: "Pastellkreiden bestehen aus wenig Bindemittel und viel Pigment. Sie erzeugen samtige, leuchtende Oberflächen, sind aber so brüchig, dass sie fixiert oder unter Glas geschützt werden müssen.",
    },
    {
      text: "Merke: Rokoko = klein, hell, privat; Barock = groß, dunkel, öffentlich.",
      detail: "Während Barockbilder oft für Kirchen und Paläste entstanden und mit dramatischem Licht arbeiten, sind Rokoko-Szenen für kleine Salons gedacht: hell, zart, intimer Ton.",
    }
  ],
  },
  {
    title: "Der prüfende Blick",
    era: "Bürgerliche Aufklärung",
    years: "1730–1780",
    place: "Paris · London",
    artists: ["Jean-Siméon Chardin", "William Hogarth", "Joshua Reynolds", "Maurice Quentin de La Tour"],
    lesson: "Gegen das Rokoko setzt das Bürgertum Nüchternheit, Moral und Beobachtung: ein Glas Wasser, eine erzählte Lebensgeschichte, ein Charakterkopf.",
    turningPoint: "Erste öffentliche Ausstellungen und Kunstkritik entstehen — das Publikum diskutiert Bilder in Zeitungen.",
    experience: { title: "Im Salon von 1765", story: "Menschen drängen sich vor bis unter die Decke gehängten Bildern. Ein Kritiker notiert, warum ein einfaches Stillleben mehr bewegt als ein Götterhimmel.", mission: "Vergleiche, wie ein Alltagsgegenstand Würde bekommt." },
    history: "Aufklärung, Zeitungen und ein wachsendes Bürgertum verändern Auftraggeber und Themen. Hogarth erfindet die Bildserie als Gesellschaftskritik und kämpft für ein Urheberrecht.",
    palette: ["Erdbraun", "Grauweiß", "Zinnober", "Ocker", "Olivgrün"],
    pigments: "Gedämpfte, mit Grau gebrochene Farben; Chardin baut Oberflächen aus vielen kleinen, körnigen Farbtupfen.",
    supports: "Leinwand, Kupfer für kleine Formate, Papier für Pastelle und Druckserien.",
    tools: "Druckpresse für Serien, Pastellkreiden, Rahmenmuster für Ausstellungen (Salon).",
    brushes: "Steife, kurze Borstenpinsel für Chardins tupfende Materialwirkung.",
    technique: "Malerische Textur: Farbe wird nicht geglättet — aus der Nähe Krümel, aus der Distanz Brot und Zinn.",
    artistLens: [
      "Jean-Siméon Chardin macht Küchengerät und Kinderspiel zu stiller, ernsthafter Malerei.",
      "William Hogarth erzählt Karrieren und Abstürze in mehrteiligen, druckbaren Bildserien.",
      "Joshua Reynolds gründet die Royal Academy und hebt das Porträt in den 'großen Stil'.",
      "Maurice Quentin de La Tour trifft im Pastell den Ausdruck eines Lächelns wie kein Zweiter.",
    ],
    mnemonics: [
    {
      text: "Merke: Der Pariser Salon macht Kunstkritik und Publikum wichtig.",
      detail: "Ab 1737 öffnet der jährliche Pariser Salon die Akademieausstellung für die Öffentlichkeit. Erstmals entscheidet ein anonymes Publikum und schreibende Kritiker mit über den Ruf eines Künstlers.",
    },
    {
      text: "Merke: Hogarths Serien sind Bildergeschichten mit Moral — und als Druck bezahlbar.",
      detail: "Hogarth erzählte in mehrteiligen Bildserien vom Aufstieg und Fall seiner Helden. Die Drucke waren erschwinglich und erreichten ein breites Publikum — Kunst als gesellschaftliche Satire.",
    },
    {
      text: "Merke: Chardins Wirkung entsteht erst aus Betrachtungsabstand.",
      detail: "Chardin setzte kleine, körnige Farbtupfen, die aus der Nähe wie Krümel wirken. Erst aus einiger Entfernung verschmelzen sie im Auge zu glänzendem Brot, Porzellan oder zarter Haut.",
    }
  ],
  },
  {
    title: "Strenge Linie, große Geste",
    era: "Klassizismus und Revolution",
    years: "1770–1815",
    place: "Paris · Rom",
    artists: ["Jacques-Louis David", "Jean-Auguste-Dominique Ingres", "Angelika Kauffmann", "Anton Raphael Mengs"],
    lesson: "Ausgrabungen in Pompeji machen die Antike zum Vorbild für Haltung und Moral: klare Linien, harte Schatten, heroische Schwüre statt Puderfarben.",
    turningPoint: "Kunst wird politisch — David inszeniert Revolution und Kaiserreich als Bildpropaganda.",
    experience: { title: "Schwur im leeren Raum", story: "Drei Brüder strecken die Arme nach Schwertern. Der Raum ist kahl, das Licht hart — kein Ornament lenkt ab.", mission: "Achte darauf, wie Leere und Linie Ernsthaftigkeit erzeugen." },
    history: "Herculaneum und Pompeji werden ausgegraben; Winckelmann formuliert das Ideal 'edler Einfalt, stiller Größe'. Revolution und Napoleon brauchen Bilder, die überzeugen.",
    palette: ["Rot", "Blau", "Ocker", "Marmorweiß", "Braun"],
    pigments: "Glatt gemalte, deckende Farbflächen mit fast unsichtbarem Pinselstrich; Farbe dient der Zeichnung.",
    supports: "Große Leinwände für Salon und Staatsauftrag, Papier für strenge Aktstudien.",
    tools: "Antikenabgüsse, Aktstudium in der Akademie, Reise nach Rom als Ausbildungspflicht.",
    brushes: "Feine, weiche Pinsel — die Handschrift soll verschwinden.",
    technique: "Disegno-Vorrang: erst die perfekte Linie, dann die Farbe. Ingres schleift Konturen wie geschliffenen Stein.",
    artistLens: [
      "Jacques-Louis David wird Maler der Revolution und später Napoleons Bildregisseur.",
      "Jean-Auguste-Dominique Ingres verteidigt die reine Linie und verlängert dafür sogar Wirbelsäulen.",
      "Angelika Kauffmann ist gefeierte Gründungsmitgliedsmalerin der Royal Academy und Star der Grand Tour.",
      "Anton Raphael Mengs formuliert in Rom die Theorie des neuen Klassizismus.",
    ],
    mnemonics: [
    {
      text: "Merke: Klassizismus = Antike als moralisches Vorbild, Linie vor Farbe.",
      detail: "Nach den Ausgrabungen von Pompeji und Herculaneum galt die Antike als Inbegriff von Tugend und Maß. Klassizistische Maler bevorzugten klare Kontur und glatte Oberflächen gegenüber farbiger Malerei.",
    },
    {
      text: "Merke: 'Edle Einfalt und stille Größe' stammt von Winckelmann.",
      detail: "Johann Joachim Winckelmann formulierte in den 1750er Jahren das Ideal griechischer Kunst. Der Satz wurde zum Programm eines ganzen Jahrhunderts und legitimierte den Rückgriff auf die Antike.",
    },
    {
      text: "Merke: David nutzt Kunst als politisches Werkzeug.",
      detail: "Jacques-Louis David malte zuerst für die Revolution, dann für Napoleon. Seine Bilder inszenierten Schwüre, Tode und Krönungen als politische Ikonen und verbreiteten die offizielle Geschichte.",
    }
  ],
  },
  {
    title: "Die Nachtseite der Vernunft",
    era: "Zwischen Aufklärung und Romantik",
    years: "1790–1830",
    place: "Madrid · Zürich · Paris",
    artists: ["Francisco de Goya", "Johann Heinrich Füssli", "Anne-Louis Girodet-Trioson", "Antoine-Jean Gros"],
    lesson: "Während die Vernunft regiert, malen Künstler Träume, Wahn und Krieg. Goya zeigt Erschießungen ohne Heldentum — die Geburt der modernen Kriegsdarstellung.",
    turningPoint: "Das Bild darf anklagen. Der Künstler wird Zeuge statt Verherrlicher.",
    experience: { title: "Drei Uhr nachts, Madrid", story: "Eine Laterne steht auf dem Boden. Sie beleuchtet ein weißes Hemd und die Gewehrläufe, aber keine Gesichter der Schützen.", mission: "Frage bei jedem Bild: Wer wird gezeigt — und wer bleibt anonym?" },
    history: "Napoleons Kriege ziehen durch Europa. Goya erlebt die spanische Besatzung, verliert sein Gehör und malt später die 'Schwarzen Gemälde' direkt auf die Wände seines Hauses.",
    palette: ["Beinschwarz", "Bleiweiß", "Ocker", "Blutrot", "Graubraun"],
    pigments: "Reduzierte, düstere Paletten; Goya arbeitet mit Spachtel und breiter, roher Farbe.",
    supports: "Leinwand, Wandputz (Schwarze Gemälde), Papier für Radierfolgen.",
    tools: "Aquatinta-Technik für flächige Grautöne, Spachtel, Schwamm, Radiernadel.",
    brushes: "Grobe Borstenpinsel; Goya malt zunehmend ohne Rücksicht auf glatte Oberflächen.",
    technique: "Aquatinta: Harzstaub auf der Platte erzeugt beim Ätzen samtige Schattenflächen — ideal für Albtraumszenen.",
    artistLens: [
      "Francisco de Goya beginnt als Hofmaler und endet als schonungsloser Chronist der Gewalt.",
      "Johann Heinrich Füssli malt Albträume und Dämonen als Bühnenszenen der Fantasie.",
      "Anne-Louis Girodet-Trioson verbindet klassische Form mit unheimlichem Mondlicht.",
      "Antoine-Jean Gros zeigt Napoleon zwischen Pestkranken — Heldentum mit Rissen.",
    ],
    mnemonics: [
    {
      text: "Merke: Aquatinta erzeugt Grauflächen, Radierung erzeugt Linien.",
      detail: "Bei der Aquatinta bestäubt man die Platte mit Harz, bevor die Säure eingreift. So entstehen flächige Graustufen statt Linien — perfekt für Himmel, Schatten und düstere Stimmungen.",
    },
    {
      text: "Merke: 'Der Schlaf der Vernunft gebiert Ungeheuer' — Goyas Titel für die Kehrseite der Aufklärung.",
      detail: "Goyas Radierfolge 'Los Caprichos' kritisiert Aberglauben, Korruption und Dummheit. Der Titelblatt-Satz warnt: Wenn die Vernunft ruht, erwachen Albträume und Missstände.",
    },
    {
      text: "Merke: Der Dritte Mai zeigt Opfer individuell, Täter anonym.",
      detail: "In Goyas berühmtem Bild liegt der erschossene Spanier mit ausgebreiteten Armen im Vordergrund — individuell, verletzlich, menschlich. Die französischen Schützen dagegen sind eine anonyme, mechanische Masse.",
    }
  ],
  },
  {
    title: "Das Ich vor der Natur",
    era: "Deutsche Romantik",
    years: "1800–1840",
    place: "Dresden · Berlin",
    artists: ["Caspar David Friedrich", "Philipp Otto Runge", "Carl Blechen", "Karl Friedrich Schinkel"],
    lesson: "Die Landschaft wird zum Spiegel der Seele. Rückenfiguren laden ein, mit ihnen zu schauen; Nebel, Ruinen und Morgenrot tragen Sehnsucht und Glauben.",
    turningPoint: "Nicht das Motiv zählt, sondern die Empfindung — Landschaft wird Andachtsbild ohne Kirche.",
    experience: { title: "Auf dem Felsen im Morgennebel", story: "Der Aufstieg endet an einer Kante. Vor dir ein Meer aus Nebel, aus dem einzelne Gipfel ragen — und niemand erklärt dir, was du sehen sollst.", mission: "Beschreibe, ob du dich in jedem Bild klein, frei oder bedroht fühlst." },
    history: "Nach Napoleon suchen Deutsche nach Identität in Natur, Geschichte und Mittelalter. Friedrich arbeitet zurückgezogen in Dresden, Schinkel prägt zugleich Berlins Architektur.",
    palette: ["Preußischblau", "Kobaltblau", "Rosa", "Elfenbeinschwarz", "Silbergrau"],
    pigments: "Preußischblau ist das erste moderne synthetische Pigment — tief und vergleichsweise günstig.",
    supports: "Grundierte Leinwand im Atelier; Ölstudien auf Papier und Karton im Freien.",
    tools: "Skizzenbuch, tragbarer Malkasten, Sepia-Zeichnung als Vorstufe, exakte Naturstudien.",
    brushes: "Feine, weiche Pinsel für glatte Übergänge — Friedrichs Oberfläche bleibt fast spurlos.",
    technique: "Atelierkomposition: einzeln vor der Natur gezeichnete Felsen und Bäume werden zu einer erfundenen Landschaft montiert.",
    artistLens: [
      "Caspar David Friedrich verwandelt genaue Studien in Bilder über Einsamkeit und Endlichkeit.",
      "Philipp Otto Runge entwirft einen Farbenkreis und plant Bilder als kosmische Zyklen.",
      "Carl Blechen bringt Ironie und moderne Industrie in die romantische Landschaft.",
      "Karl Friedrich Schinkel malt Architekturvisionen, die Baukunst und Traumbild verbinden.",
    ],
    mnemonics: [
    {
      text: "Merke: Rückenfigur = Einladung, mit der Figur mitzuschauen.",
      detail: "Caspar David Friedrich stellt oft einen Menschen mit dem Rücken zum Betrachter vor eine Landschaft. Der Betrachter projiziert sich in diese Figur und schaut gleichsam über ihre Schulter mit.",
    },
    {
      text: "Merke: Preußischblau ist das erste synthetische moderne Pigment (ab 1706).",
      detail: "Preußischblau entstand eigentlich durch einen Zufall bei der Farbenherstellung. Es war billiger als echtes Ultramarin und ermöglichte tiefes Blau in großflächigen Landschaften.",
    },
    {
      text: "Merke: Romantische Landschaften sind komponiert, nicht abgemalt.",
      detail: "Friedrich und seine Zeitgenossen zeichneten einzelne Felsen, Bäume und Wolken in der Natur, setzten sie aber im Atelier zu einer idealen, seelischen Landschaft neu zusammen.",
    }
  ],
  },
  {
    title: "Wetter, Dampf und Geschwindigkeit",
    era: "Englische Landschaft",
    years: "1780–1850",
    place: "London · Suffolk",
    artists: ["William Turner", "John Constable", "Thomas Gainsborough", "Samuel Palmer"],
    lesson: "England erfindet die Wolkenstudie und die Auflösung der Form im Licht. Turner malt Dampf, Sturm und Sonne, bis Schiffe fast verschwinden.",
    turningPoint: "Licht und Atmosphäre werden wichtiger als der Gegenstand — ein direkter Vorläufer des Impressionismus.",
    experience: { title: "Sturm vor der Küste", story: "Regen peitscht über das Deck. Später notiert der Maler nicht Formen, sondern Farbwirbel — das Wetter selbst wird zum Motiv.", mission: "Suche das Bild, in dem du den Gegenstand kaum noch erkennst." },
    history: "Industrialisierung, Dampfschiffe und Eisenbahn verändern die Landschaft. Constable malt dagegen die vertraute Heimat seines Vaters — beide zeigen eine Welt im Umbruch.",
    palette: ["Chromgelb", "Zinnoberrot", "Weiß", "Ultramarin", "Erdbraun"],
    pigments: "Neue Chromfarben ermöglichen glühendes Gelb. Aquarellfarben in Näpfchen machen Studien im Freien praktisch.",
    supports: "Leinwand, Aquarellpapier, Skizzenbücher in Taschenformat.",
    tools: "Tragbarer Aquarellkasten, Palettmesser, Kratzwerkzeuge, ab 1841 die Zinn-Farbtube.",
    brushes: "Breite Aquarellpinsel, Borstenpinsel für Constables weiße Lichtakzente ('Constable's snow').",
    technique: "Nass-in-nass im Aquarell und pastose Lichter im Öl; Turner reibt und kratzt Farbe, um Dunst zu erzeugen.",
    artistLens: [
      "William Turner reist unermüdlich und löst Gegenstände in Licht und Energie auf.",
      "John Constable studiert Wolken mit Datum und Windrichtung wie ein Naturforscher.",
      "Thomas Gainsborough verbindet elegante Porträts mit erfundenen, weich gemalten Landschaften.",
      "Samuel Palmer malt englische Täler als visionäre, fast leuchtende Fruchtbarkeit.",
    ],
    mnemonics: [
    {
      text: "Merke: Constable datiert seine Wolkenstudien wie ein Wetterbericht.",
      detail: "Constable malte in den 1820er Jahren über hundert Wolkenbilder und notierte Datum, Uhrzeit und Windrichtung. Für ihn war die Natur ein dynamisches System, kein statisches Dekor.",
    },
    {
      text: "Merke: Turner nimmt die Auflösung der Form vorweg — Licht schlägt Kontur.",
      detail: "In Turners späten Werken verschwinden Schiffe, Brücken und Menschen in Farbnebel und Licht. Der Gegenstand wird zweitrangig; Atmosphäre und Energie übernehmen die Komposition.",
    },
    {
      text: "Merke: Die Farbtube (1841) macht Malen im Freien überhaupt praktikabel.",
      detail: "Vor der Zinn-Farbtube mussten Maler Farben in Blasen oder Tierhäuten transportieren. Die Tube hält die Farbe frisch, ist leicht und erlaubt das Arbeiten unter freiem Himmel.",
    }
  ],
  },
  {
    title: "Leidenschaft gegen Regel",
    era: "Französische Romantik",
    years: "1815–1860",
    place: "Paris · Barbizon",
    artists: ["Théodore Géricault", "Eugène Delacroix", "Camille Corot", "Honoré Daumier"],
    lesson: "Farbe, Bewegung und aktuelle Katastrophen fordern die Akademie heraus. Ein Schiffbruch aus der Zeitung wird zum monumentalen Historienbild.",
    turningPoint: "Der Streit 'Linie gegen Farbe' entscheidet sich zugunsten der Farbe — und öffnet den Weg in die Moderne.",
    experience: { title: "Das Floß in der Werkstatt", story: "Der Maler baut ein Modellfloß, studiert Leichen im Krankenhaus und arbeitet monatelang an einer Welle, die niemanden rettet.", mission: "Verfolge die Diagonale vom Verzweifeln bis zur winzigen Hoffnung am Horizont." },
    history: "Nach Napoleon wechseln Regime und Zensur. Zeitungen, Lithografie und Karikatur machen Bilder politisch; Barbizon wird zum Freiluft-Labor der Landschaftsmalerei.",
    palette: ["Karminrot", "Smaragdgrün", "Kobaltblau", "Ocker", "Bitumenbraun"],
    pigments: "Delacroix setzt Komplementärfarben nebeneinander, damit sie sich gegenseitig steigern. Bitumen dunkelt bei Géricault nach.",
    supports: "Riesige Salonleinwände, Ölstudien auf Papier, Lithosteine für Zeitungsdrucke.",
    tools: "Lithografiestein und Fettkreide, Farbtagebücher, Reiseskizzen aus Nordafrika.",
    brushes: "Kräftige Borstenpinsel für offene, energische Züge.",
    technique: "Komplementärkontrast: Rot neben Grün, Blau neben Orange — Farbe wird durch Nachbarschaft intensiver.",
    artistLens: [
      "Théodore Géricault macht ein politisches Skandalereignis zum Monumentalbild.",
      "Eugène Delacroix verteidigt Farbe gegen die Linie und findet in Marokko neues Licht.",
      "Camille Corot malt silbrige Landschaften im Freien und wird Vorbild der Impressionisten.",
      "Honoré Daumier zeichnet in Tausenden Lithografien die Gesellschaft — und geht dafür ins Gefängnis.",
    ],
    mnemonics: [
    {
      text: "Merke: Ingres = Linie, Delacroix = Farbe. Der Streit prägt das 19. Jahrhundert.",
      detail: "Die französische Akademie debattierte, ob Zeichnung (disegno) oder Farbe (colorito) vorrangig sei. Ingres vertrat die kontrollierte Linie, Delacroix die befreite, emotionale Farbe.",
    },
    {
      text: "Merke: Komplementärfarben verstärken sich gegenseitig.",
      detail: "Rot neben Grün, Blau neben Orange oder Gelb neben Violett leuchten stärker, wenn sie direkt aneinandergrenzen. Delacroix und später die Impressionisten nutzten diesen Effekt gezielt.",
    },
    {
      text: "Merke: Lithografie druckt fettige Zeichnung vom Stein — Massenmedium der Karikatur.",
      detail: "Auf dem Kalkstein zeichnet der Künstler mit fettiger Kreide; anschließend wird der Stein angefeuchtet und eingefärbt. Fettige Stellen nehmen die Farbe auf — so entstehen schnelle, viele Abzüge, ideal für Zeitungen und Karikaturen.",
    }
  ],
  },
  {
    title: "Die Würde der Arbeit",
    era: "Realismus",
    years: "1848–1880",
    place: "Ornans · Barbizon · Berlin",
    artists: ["Gustave Courbet", "Jean-François Millet", "Rosa Bonheur", "Adolph Menzel"],
    lesson: "Steinklopfer, Ährenleserinnen und Eisenwalzwerke erhalten die Bildgröße, die früher Göttern vorbehalten war. 'Zeige mir einen Engel, und ich male ihn' — Courbet.",
    turningPoint: "Die Gegenwart wird bildwürdig; Kunst wird zur sozialen Aussage.",
    experience: { title: "Auf dem abgeernteten Feld", story: "Drei Frauen bücken sich nach den letzten Halmen. Kein Pathos, kein Himmelslicht — nur Rücken, Staub und Abendsonne.", mission: "Suche, wie Haltung und Licht Respekt statt Mitleid erzeugen." },
    history: "Nach der Revolution von 1848 rücken Arbeit und Klasse in den Blick. Die Fotografie zwingt die Malerei, ihre Aufgabe neu zu bestimmen; Courbet stellt trotzig in eigenen Pavillons aus.",
    palette: ["Erdbraun", "Olivgrün", "Grau", "Ocker", "Schwarz"],
    pigments: "Erdige, gedeckte Töne; Courbet trägt Farbe mit dem Spachtel in dicken Schichten auf.",
    supports: "Große Leinwände für den Salon, kleine Ölstudien vor Ort.",
    tools: "Palettmesser, Fotografie als Hilfsmittel, Skizzen in Fabriken und auf Feldern.",
    brushes: "Grobe Borstenpinsel — sichtbare Materialität statt akademischer Glätte.",
    technique: "Spachteltechnik: Farbe wird geschoben und gepresst, damit Fels, Erde und Stoff körperlich wirken.",
    artistLens: [
      "Gustave Courbet erklärt den Realismus zum Programm und provoziert den Salon.",
      "Jean-François Millet malt Landarbeit ernst und monumental, ohne sie zu verklären.",
      "Rosa Bonheur erhält behördliche Erlaubnis, in Hosen auf Viehmärkte zu gehen, und wird international gefeiert.",
      "Adolph Menzel zeigt in Berlin die Fabrik als neue Kathedrale der Arbeit.",
    ],
    mnemonics: [
    {
      text: "Merke: Realismus zeigt die Gegenwart in der Größe des Historienbildes.",
      detail: "Courbet und Millet malten Arbeiter, Bauern und Steinbrecher in Abmessungen, die früher Königen und Heiligen vorbehalten waren. Sie beanspruchten Würde und Bedeutung für das alltägliche Leben.",
    },
    {
      text: "Merke: Courbet arbeitet oft mit dem Spachtel statt mit dem Pinsel.",
      detail: "Mit dem Palettmesser schob Courbet dicke Farbschichten auf die Leinwand. So entstehen raue, materielle Oberflächen, die Erde, Stein und Stoff physisch spürbar machen.",
    },
    {
      text: "Merke: Die Fotografie (ab 1839) verändert, wozu Malerei noch gebraucht wird.",
      detail: "Als die Fotografie Szenen exakt festhalten konnte, musste die Malerei neue Aufgaben finden: Stimmung, subjektive Wahrnehmung, Farbtheorie und Interpretation statt bloßer Wiedergabe.",
    }
  ],
  },
  {
    title: "Der flüchtige Eindruck",
    era: "Impressionismus",
    years: "1860–1886",
    place: "Paris · Le Havre",
    artists: ["Claude Monet", "Pierre-Auguste Renoir", "Edgar Degas", "Édouard Manet"],
    lesson: "Malen im Freien, Tubenfarben und die moderne Großstadt verändern den Blick. Sichtbare Striche halten Licht und Atmosphäre statt fester Konturen fest.",
    turningPoint: "Eine unabhängige Ausstellung 1874 und ein spöttischer Kritikertitel werden zum Beginn der modernen Malerei.",
    experience: { title: "Ein Tag im modernen Paris", story: "Im Morgengrauen am Hafen, nachmittags hinter der Opernbühne, abends unter den Lampions des Moulin de la Galette.", mission: "Entdecke, wie Ausschnitt, Bewegung und Licht einen Augenblick erzeugen." },
    history: "Paris wird durch Boulevards und Bahnhöfe umgebaut. Künstler verlassen den offiziellen Salon und organisieren zwischen 1874 und 1886 acht eigene Ausstellungen.",
    palette: ["Kobaltblau", "Ultramarin", "Chromgelb", "Viridiangrün", "Zinkweiß"],
    pigments: "Industriefarben sind heller und verlässlicher. Schwarz wird oft ganz gestrichen — Schatten sind farbig.",
    supports: "Vorgefertigte, hell grundierte Leinwände in transportablen Formaten.",
    tools: "Zinn-Farbtube, Feldstaffelei, Malkasten, Klapphocker; Bahn und Boot als Atelier auf Reisen.",
    brushes: "Flache Pinsel (brosses plates) mit gerader Kante — sie erzeugen die typischen kurzen Striche.",
    technique: "Optische Mischung: nebeneinandergesetzte reine Farben mischen sich erst im Auge des Betrachters.",
    artistLens: [
      "Claude Monet malt Serien vor demselben Motiv und arbeitet an mehreren Leinwänden parallel.",
      "Pierre-Auguste Renoir malt das gesellige Paris in warmem, flimmerndem Licht.",
      "Edgar Degas nennt sich Realist und studiert Bewegung, Proben und ungewöhnliche Blickwinkel.",
      "Édouard Manet fordert den Salon mit modernen Motiven und flacher Malweise heraus.",
    ],
    mnemonics: [
    {
      text: "Merke: Der Name stammt von Monets 'Impression, Sonnenaufgang' (1872) — ursprünglich Spott.",
      detail: "Ein Kritiker griff 1874 den Titel von Monets Hafenbild auf und nannte die Künstler spöttisch 'Impressionisten'. Der Schimpfname wurde bald zum Programm einer Bewegung.",
    },
    {
      text: "Merke: Impressionisten meiden Schwarz; Schatten sind blau oder violett.",
      detail: "Weil Schatten im Freien von reflektiertem Himmellicht durchflutet sind, erscheinen sie farbig. Impressionisten mischten Schatten aus Komplementärfarben statt Schwarz und erreichten so Leuchtkraft.",
    },
    {
      text: "Merke: Flachpinsel + Farbtube = Malerei im Freien.",
      detail: "Der kurze, flache Pinsel erlaubt schnelle, trennscharfe Striche; die Farbtube macht die Palette mobil. Zusammen ermöglichten sie das Arbeiten vor dem Motiv in Wald, Hafen und Garten.",
    }
  ],
  },
  {
    title: "Farbe wird Gefühl und Ordnung",
    era: "Post-Impressionismus",
    years: "1886–1905",
    place: "Arles · Aix-en-Provence · Bretagne",
    artists: ["Vincent van Gogh", "Paul Cézanne", "Paul Gauguin", "Georges Seurat"],
    lesson: "Nach dem flüchtigen Eindruck suchen vier Künstler vier Wege: Ausdruck, Struktur, Symbol und wissenschaftliches System.",
    turningPoint: "Die sichtbare Welt wird zum Ausgangspunkt persönlicher Bildsprachen — das Sprungbrett der Moderne.",
    experience: { title: "Mit dem Nachtzug in die Provence", story: "Van Goghs gelbe Felder bei Saint-Rémy, dann Cézannes Blick auf den Mont Sainte-Victoire: dieselbe Landschaft wird einmal Gefühl, einmal gebaute Form.", mission: "Vergleiche Rhythmus (van Gogh) und Fläche (Cézanne): Wie hält jeder das Bild zusammen?" },
    history: "Nach der letzten Impressionisten-Ausstellung 1886 trennen sich die Wege. Japanische Holzschnitte, Farbtheorie und die Suche nach 'Ursprünglichkeit' prägen die Zeit — Gauguins kolonialer Blick wird heute kritisch gelesen.",
    palette: ["Chromgelb", "Kobaltblau", "Smaragdgrün", "Zinnober", "Violett"],
    pigments: "Leuchtende Industriepigmente ermöglichen starke Kontraste, sind aber teils instabil: Van Goghs Chromgelb ist heute nachgedunkelt.",
    supports: "Leinwand, grobes Jutegewebe, Karton; die Grundierung bleibt oft sichtbar.",
    tools: "Rohrfeder für Zeichnungen, Spachtel, Perspektivrahmen (van Gogh), Farbkreis nach Chevreul (Seurat).",
    brushes: "Steife Borstenpinsel für van Goghs gerichtete Striche, kleine Rundpinsel für Seurats Punkte.",
    technique: "Pointillismus: winzige reine Farbpunkte; Impasto: dicke, gerichtete Striche, die Bewegung sichtbar machen.",
    artistLens: [
      "Vincent van Gogh malt in nur zehn Jahren rund 2000 Werke und beschreibt seine Farbwahl genau in Briefen.",
      "Paul Cézanne baut die Welt aus Farbflächen — 'Zylinder, Kugel, Kegel' — und wird Vater der Moderne genannt.",
      "Paul Gauguin sucht in der Bretagne und in Ozeanien Symbol und Fläche statt Naturtreue.",
      "Georges Seurat verwandelt Farbtheorie in ein geduldiges System aus Punkten.",
    ],
    mnemonics: [
    {
      text: "Merke: Pointillismus = reine Farbpunkte, die das Auge mischt (Seurat).",
      detail: "Seurat legte Tausende kleine, ungemischte Farbtupfen nebeneinander. Aus der Distanz verschmelzen sie im Auge des Betrachters zu leuchtenden Tönen und feinen Graustufen.",
    },
    {
      text: "Merke: Cézanne = Struktur, van Gogh = Ausdruck, Gauguin = Symbol, Seurat = System.",
      detail: "Nach dem Impressionismus spaltete sich die Malerei in vier Wege: Cézanne suchte hinter der Erscheinung die Form, van Gogh die Emotion, Gauguin das Symbol und Seurat die wissenschaftliche Ordnung.",
    },
    {
      text: "Merke: Cloisonnismus (Gauguin) umrandet Farbflächen wie Bleiglas.",
      detail: "Gauguin und seine Zeitgenossen begrenzten Farbflächen mit dunklen Konturen, ähnlich wie in Glasmalerei. Figuren und Hintergründe wurden flächig, dekorativ und symbolisch aufgeladen.",
    }
  ],
  },
  {
    title: "Der Schrei der Moderne",
    era: "Symbolismus und Wien 1900",
    years: "1890–1918",
    place: "Oslo · Wien · Genf",
    artists: ["Edvard Munch", "Gustav Klimt", "Egon Schiele", "Ferdinand Hodler"],
    lesson: "Linie, Ornament und unnatürliche Farbe machen Angst, Begehren und Tod sichtbar. Äußere Ähnlichkeit verliert ihren Vorrang.",
    turningPoint: "Innere Wahrheit schlägt akademische Schönheit — das Bild wird unmittelbarer seelischer Ausdruck.",
    experience: { title: "Zwischen Fjord und Ringstraße", story: "Auf Munchs Fjordweg kippt die Landschaft in Angst. In Wien glänzt Klimts Gold, während nebenan Schiele Körper bis auf die Nerven freilegt.", mission: "Wähle in jedem Werk eine Farbe und benenne das Gefühl, das sie unabhängig vom Motiv trägt." },
    history: "Großstädte wachsen, Freud erforscht das Unbewusste, junge Künstler gründen Secessionen und verlassen die Akademien. 1918 sterben Klimt und Schiele in derselben Grippewelle.",
    palette: ["Ultramarin", "Cadmiumgelb", "Zinnober", "Blattgold", "Elfenbeinschwarz"],
    pigments: "Intensive Tubenfarben werden ungemischt gesetzt. Klimt kombiniert Öl mit Blattgold und Silber; Munch mischt Öl, Tempera und Pastell.",
    supports: "Leinwand, Karton und Papier; Munch lässt Bilder bewusst draußen verwittern ('Rosskur').",
    tools: "Lithostein, Holzstock, Schneidemesser, Kreide; Klimt nutzt Goldauflagen wie ein Goldschmied.",
    brushes: "Breite Pinsel für Munchs fließende Bahnen, feinste Pinsel für Klimts Ornament.",
    technique: "Fläche und Linie statt Modellierung: Kontur, Muster und Farbfeld erzeugen die Wirkung.",
    artistLens: [
      "Edvard Munch fasst wiederkehrende Motive zum 'Lebensfries' über Liebe, Angst und Tod zusammen.",
      "Gustav Klimt gründet die Wiener Secession und verschmilzt Ornament, Gold und Körper.",
      "Egon Schiele entwickelt eine kantige, schonungslose Körpersprache voller Verletzlichkeit.",
      "Ferdinand Hodler ordnet Figuren im 'Parallelismus' zu rhythmischen Reihen.",
    ],
    mnemonics: [
    {
      text: "Merke: Secession = Auszug junger Künstler aus der Akademie (Wien 1897).",
      detail: "Klimt und andere Künstler verließen die konservative Wiener Künstlerhaus-Gemeinschaft, um modernere, freiere Ausstellungen zu zeigen. Ihr Ausstellungsbau wurde zum Symbol des neuen Kunstwillens.",
    },
    {
      text: "Merke: Munchs 'Der Schrei' existiert in mehreren Fassungen und Techniken.",
      detail: "Munch malte, zeichnete und druckte den Schrei mehrfach zwischen 1893 und 1910. Jede Fassung variiert Farbe, Technik und Stimmung — das Motiv wird zum wiederkehrenden Lebensfries.",
    },
    {
      text: "Merke: Klimts Goldene Periode nutzt echtes Blattgold auf Leinwand.",
      detail: "In Werken wie 'Der Kuss' und 'Adele Bloch-Bauer' klebte Klimt echtes Blattgold auf die Leinwand und verband es mit Ornament und Figur. Das Gold erinnert an byzantinische Mosaiken und veredelt die Darstellung.",
    }
  ],
  },
  {
    title: "Die Befreiung vom Gegenstand",
    era: "Abstraktion und Bauhaus",
    years: "1910–1940",
    place: "München · Weimar · Paris",
    artists: ["Wassily Kandinsky", "Paul Klee", "Piet Mondrian", "László Moholy-Nagy"],
    lesson: "Farben, Linien und Formen werden wie Klänge komponiert. Am Bauhaus wird daraus eine Lehre, die Malerei, Handwerk, Typografie und Architektur verbindet.",
    turningPoint: "Ein Bild braucht keinen erkennbaren Gegenstand mehr, um Bewegung, Spannung und Bedeutung zu erzeugen.",
    experience: { title: "Klangprobe im Atelier", story: "Kandinsky spricht über Musik, während ein Motiv Schritt für Schritt verschwindet. Am Bauhaus werden Farbe und Form anschließend systematisch untersucht.", mission: "Lies eine Komposition wie Musik: Finde Auftakt, laute Passage und ruhigen Schluss." },
    history: "Nach dem Ersten Weltkrieg wollen Avantgarden eine universelle Sprache. Das Bauhaus (1919–1933) verbindet Kunst und Technik, bis es von den Nationalsozialisten geschlossen wird und die Lehrenden emigrieren.",
    palette: ["Primärrot", "Primärblau", "Primärgelb", "Schwarz", "Weiß"],
    pigments: "Reine, deckende Industriefarben. Entscheidend ist die Funktion der Farbe im System, nicht ihre Kostbarkeit.",
    supports: "Leinwand, Hartfaser, Papier, Glas, Metall und Fotopapier.",
    tools: "Lineal, Winkel, Klebeband, Schablone, Spritzpistole, Kamera und Fotogramm.",
    brushes: "Feine Pinsel für exakte Kanten; Mondrian zieht Linien mit Malerkrepp und mehreren Schichten.",
    technique: "Konstruktion statt Abbild: Fläche, Kante und Grundfarbe werden zur Grammatik. Moholy-Nagy belichtet Fotogramme ganz ohne Kamera.",
    artistLens: [
      "Wassily Kandinsky verbindet Malerei mit Musik und formuliert am Bauhaus eine Lehre von Farbe und Form.",
      "Paul Klee entwickelt aus Punkt und Linie poetische, oft humorvolle Bildwelten.",
      "Piet Mondrian reduziert Baum und Fassade Schritt für Schritt zum Raster aus Grundfarben.",
      "László Moholy-Nagy bringt Fotografie, Licht und Material als Werkzeuge in die Kunstlehre.",
    ],
    mnemonics: [
    {
      text: "Merke: Bauhaus 1919 Weimar – 1925 Dessau – 1933 geschlossen.",
      detail: "Das Bauhaus vereinte Kunst, Handwerk und Technik unter einem Dach. Wegen politischen Drucks zog es von Weimar nach Dessau und wurde 1933 von den Nationalsozialisten geschlossen; viele Lehrende emigrierten in die USA.",
    },
    {
      text: "Merke: Mondrian nutzt nur Rot, Gelb, Blau, Schwarz, Weiß und rechte Winkel.",
      detail: "Mondrian reduzierte die Welt auf horizontale und vertikale Linien sowie die drei Primärfarben plus Schwarz, Grau und Weiß. Sein Ziel war eine universelle, harmonische Ordnung jenseits der sichtbaren Natur.",
    },
    {
      text: "Merke: Fotogramm = Bild ohne Kamera, direkt auf Fotopapier belichtet.",
      detail: "Moholy-Nagy legte Gegenstände auf Fotopapier und belichtete sie von oben. Die Schatten und Konturen entstanden direkt als abstrakte, lichtgezeichnete Formen.",
    }
  ],
  },
];

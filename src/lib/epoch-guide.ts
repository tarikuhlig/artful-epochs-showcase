/**
 * Wissensteil jeder Epochenseite: Was geschah, wie gemalt wurde, welche Farben
 * benutzt wurden — plus drei Prüfungsfragen für den Epochen-Check.
 * Rein redaktionell, keine externen Abrufe, keine KI zur Laufzeit.
 */

export type GuideStep = { label: string; text: string };
export type TimelineEntry = { when: string; title: string; text: string };
export type GuideQuestion = { prompt: string; options: string[]; answer: string; explain: string };

export type EpochGuide = {
  headline: string;
  timeline: TimelineEntry[];
  technique: GuideStep[];
  palette: string[];
  paletteNote: string;
  marks: string[];
  questions: GuideQuestion[];
};

export const epochGuides: Record<string, EpochGuide> = {
  gotik: {
    headline: "Gold statt Raum: Bilder sind Andachtsgegenstände, keine Fenster.",
    timeline: [
      { when: "um 1305", title: "Giotto in Padua", text: "In der Arenakapelle stehen Figuren erstmals körperlich im Raum, mit Gewicht und echten Gesten. Das gilt als Startpunkt der neuen Malerei." },
      { when: "14. Jh.", title: "Stadtrepubliken zahlen", text: "Nicht nur Kirchen, auch Zünfte und Kaufleute in Siena und Florenz bestellen Altäre — Kunst wird Ausdruck städtischen Stolzes." },
      { when: "1348", title: "Die Pest", text: "Ein Drittel Europas stirbt. Bilder werden strenger, frömmer, wieder goldener — der Tod ist überall Thema." },
      { when: "um 1400", title: "Höfischer Stil", text: "An den Höfen entsteht ein zarter, linienreicher Stil mit kostbaren Stoffen: die letzte große Blüte des Goldgrunds." },
    ],
    technique: [
      { label: "Bildträger", text: "Pappelholztafel, verleimt und mit Leinwandstreifen gegen Risse gesichert." },
      { label: "Grundierung", text: "Viele Lagen Gesso — Kreide mit Hautleim — spiegelglatt geschliffen." },
      { label: "Vergoldung", text: "Blattgold auf roten Bolus gelegt und mit Achatstein poliert, bis es im Kerzenlicht glüht." },
      { label: "Vorzeichnung", text: "Die Umrisse werden in den Grund geritzt; Heiligenscheine werden mit Punzen ins Gold gestempelt." },
      { label: "Farbauftrag", text: "Eitempera in kleinen, parallelen Strichen — Schicht für Schicht vom Dunklen ins Helle." },
    ],
    palette: ["Blattgold", "Ultramarin", "Zinnober", "Grüne Erde", "Ocker", "Bleiweiß"],
    paletteNote: "Der Preis bestimmt die Bedeutung: Ultramarin und Gold gehen an Maria und den Himmel, Erdfarben an alles Irdische. Grüne Erde liegt als kühle Untermalung unter der Haut — deshalb wirken viele Gesichter heute leicht grünlich.",
    marks: ["Goldener Hintergrund statt Landschaft", "Größe zeigt Rang, nicht Entfernung", "Feine, klare Konturlinien", "Kostbare Stoffe, flächige Muster"],
    questions: [
      { prompt: "Warum ist der Hintergrund golden statt blau?", options: ["Blau war noch unbekannt", "Gold zeigt keinen Ort, sondern den Himmel als überirdischen Raum", "Gold schützt das Holz", "Es war eine Vorschrift der Stadt"], answer: "Gold zeigt keinen Ort, sondern den Himmel als überirdischen Raum", explain: "Der Goldgrund ist kein Ort, sondern ein Zustand: zeitloses Licht. Erst als Maler die Welt vermessen wollen, weicht er der Landschaft." },
      { prompt: "Womit wird die Farbe in der Tempera gebunden?", options: ["Mit Leinöl", "Mit Eigelb", "Mit Wachs", "Mit Kalk"], answer: "Mit Eigelb", explain: "Eitempera trocknet in Minuten. Deshalb malt man in kurzen, parallelen Strichen — weiche Übergänge sind fast unmöglich." },
      { prompt: "Eine Figur ist doppelt so groß wie die daneben. Was heißt das?", options: ["Sie steht näher", "Sie ist wichtiger", "Der Maler hat sich verrechnet", "Sie ist älter"], answer: "Sie ist wichtiger", explain: "Bedeutungsperspektive: Rang bestimmt Größe. Erst die Zentralperspektive der Renaissance macht Größe zur Frage der Entfernung." },
    ],
  },

  renaissance: {
    headline: "Der Mensch wird vermessen: Perspektive, Anatomie und antike Vorbilder.",
    timeline: [
      { when: "1420er", title: "Perspektive in Florenz", text: "Brunelleschi und Alberti machen Raum berechenbar: Alle Tiefenlinien laufen auf einen Fluchtpunkt zu." },
      { when: "1450er", title: "Öl kommt aus dem Norden", text: "Flämische Ölmalerei erreicht Italien. Farbe bleibt länger feucht — Übergänge und Lasuren werden möglich." },
      { when: "um 1480", title: "Die Medici als Mäzene", text: "Bankiers bestellen erstmals große Bilder aus der antiken Mythologie — nicht jede Wand zeigt noch Heilige." },
      { when: "1508–1512", title: "Sixtinische Decke", text: "Michelangelo malt in Tagesabschnitten auf feuchten Putz. Der Künstler gilt jetzt als Genie, nicht als Handwerker." },
    ],
    technique: [
      { label: "Entwurf", text: "Karton in Originalgröße; die Linien werden durchgepaust oder mit Kohlestaub durch Löcher gestäubt." },
      { label: "Untermalung", text: "Graue oder grünliche Anlage klärt Licht und Schatten, bevor die Farbe kommt." },
      { label: "Fresko", text: "Auf frischem Kalkputz bindet die Farbe chemisch mit der Wand ab — Korrekturen sind unmöglich." },
      { label: "Öllasur", text: "Dünne, durchscheinende Schichten übereinander lassen Haut und Stoff von innen leuchten." },
      { label: "Sfumato", text: "Leonardos rauchige Übergänge: Konturen verschwinden, Formen gehen weich in Schatten über." },
    ],
    palette: ["Ultramarin", "Azurit", "Zinnober", "Ocker", "Grüne Erde", "Bleiweiß"],
    paletteNote: "Ultramarin wird im Vertrag gesondert abgerechnet — der Auftraggeber bestimmt, wie viel echtes Blau ins Bild darf. Für Haut mischt man Bleiweiß, rote Erde und Ocker über einer kühlen Untermalung.",
    marks: ["Ein Fluchtpunkt ordnet den Raum", "Ausgewogene, oft dreieckige Gruppen", "Körper nach anatomischer Studie", "Ruhige, klare Beleuchtung"],
    questions: [
      { prompt: "Was passiert bei der Zentralperspektive mit allen Tiefenlinien?", options: ["Sie laufen parallel", "Sie treffen sich in einem Fluchtpunkt", "Sie steigen nach oben", "Sie verschwinden hinter Gold"], answer: "Sie treffen sich in einem Fluchtpunkt", explain: "Der Fluchtpunkt macht den Bildraum berechenbar — der Betrachter bekommt einen festen Standpunkt zugewiesen." },
      { prompt: "Was bedeutet Sfumato?", options: ["Dick aufgetragene Farbe", "Weiche, rauchige Übergänge ohne harte Kontur", "Malerei auf nassem Putz", "Gold auf rotem Bolus"], answer: "Weiche, rauchige Übergänge ohne harte Kontur", explain: "Leonardo legt dutzende hauchdünne Lasuren übereinander, bis die Kontur verschwindet — daher der Blick der Mona Lisa." },
      { prompt: "Warum duldet ein Fresko keine Korrektur?", options: ["Die Farbe ist zu teuer", "Sie bindet chemisch mit dem trocknenden Kalk ab", "Es wird sofort übermalt", "Der Putz ist zu dünn"], answer: "Sie bindet chemisch mit dem trocknenden Kalk ab", explain: "Was am Tagesende trocken ist, ist Wand geworden. Deshalb arbeitet man in genau geplanten Tagesabschnitten." },
    ],
  },

  barock: {
    headline: "Licht als Regie: Das Bild wird zur Bühne, der Betrachter zum Zeugen.",
    timeline: [
      { when: "1563", title: "Konzil von Trient", text: "Die katholische Kirche verlangt Bilder, die sofort verständlich sind und Gefühle wecken — Kunst als Überzeugungsmittel." },
      { when: "um 1600", title: "Caravaggio in Rom", text: "Er malt Heilige nach Modellen von der Straße, aus tiefem Dunkel ins scharfe Licht gestellt." },
      { when: "1620er", title: "Höfe rüsten auf", text: "Rubens, Velázquez und van Dyck arbeiten für Fürsten: Malerei wird Staatsrepräsentation und Diplomatie." },
      { when: "17. Jh.", title: "Leinwand siegt", text: "Große Leinwände auf Keilrahmen lassen sich rollen und verschicken — Bilder werden europäische Handelsware." },
    ],
    technique: [
      { label: "Bildträger", text: "Grob gewebte Leinwand auf Keilrahmen, oft mit warmbrauner Grundierung." },
      { label: "Anlage", text: "Der dunkle Grund bleibt an vielen Stellen stehen und übernimmt die Schatten." },
      { label: "Licht setzen", text: "Ein einziges gerichtetes Licht — meist von links oben — modelliert Gesichter und Hände." },
      { label: "Impasto", text: "Dick aufgesetzte Höhungen fangen das echte Kerzenlicht des Raums körperlich ein." },
      { label: "Lasur", text: "Dünne rote und braune Schichten über den Körperfarben geben Tiefe und Glut." },
    ],
    palette: ["Bleiweiß", "Zinnober", "Krapplack", "Ocker", "Umbra", "Beinschwarz"],
    paletteNote: "Wenige leuchtende Farben in einem Meer aus warmen Erden. Der dunkle Grund spart Arbeit und schafft Dramatik — allerdings dunkeln solche Bilder mit der Zeit weiter nach.",
    marks: ["Harte Hell-Dunkel-Kontraste (Tenebrismus)", "Diagonale Bewegung statt ruhiger Symmetrie", "Der dramatischste Moment einer Geschichte", "Figuren drängen aus dem Bild heraus"],
    questions: [
      { prompt: "Was meint Tenebrismus?", options: ["Malen im Freien", "Figuren treten aus tiefer Finsternis in scharfes Licht", "Reine Farbpunkte", "Malerei ohne Gegenstand"], answer: "Figuren treten aus tiefer Finsternis in scharfes Licht", explain: "Das Dunkel ist kein Raum, sondern eine Bühne. Was das Licht trifft, ist wichtig — alles andere verschwindet." },
      { prompt: "Warum wählt der Barock oft den Moment kurz vor der Entscheidung?", options: ["Er ist leichter zu malen", "Er zieht den Betrachter in die Handlung", "Die Kirche verlangte es wörtlich", "Damit weniger Figuren nötig sind"], answer: "Er zieht den Betrachter in die Handlung", explain: "Der Höhepunkt macht aus dem Bild ein Ereignis: Man sieht nicht zu, man ist dabei." },
      { prompt: "Warum setzt sich die Leinwand gegen die Holztafel durch?", options: ["Sie ist heller", "Sie lässt sich rollen und transportieren", "Farbe hält besser", "Holz war verboten"], answer: "Sie lässt sich rollen und transportieren", explain: "Große Aufträge gehen quer durch Europa — nur gerollte Leinwand macht das praktisch möglich." },
    ],
  },

  rokoko: {
    headline: "Leichtigkeit, Privatheit, Vernunft: Vom Fest im Park zum bürgerlichen Zimmer.",
    timeline: [
      { when: "um 1715", title: "Nach Ludwig XIV.", text: "Der Hof zieht sich aus Versailles in Pariser Stadtpalais zurück. Räume werden kleiner, Bilder intimer." },
      { when: "1720er", title: "Fête galante", text: "Watteau erfindet die Bildgattung des eleganten Gesellschaftsspiels im Park — heiter mit einem Hauch Melancholie." },
      { when: "1750er", title: "Bürgerlicher Ernst", text: "Chardin malt Küche, Brot und Kinder. Die Aufklärung stellt der höfischen Leichtigkeit ein stilles Gegenbild entgegen." },
      { when: "1789", title: "Revolution", text: "Der strenge Klassizismus verdrängt das Rokoko: Pastellblau gilt plötzlich als Zeichen der alten Ordnung." },
    ],
    technique: [
      { label: "Format", text: "Kleine bis mittlere Leinwände für Salons — Malerei wird Teil der Zimmerausstattung." },
      { label: "Heller Grund", text: "Hell grundierte Leinwand hält die Farben leicht und luftig." },
      { label: "Pastell", text: "Trockene Farbstifte auf rauem Papier erlauben samtige Haut und schnelle Porträts." },
      { label: "Pinselschrift", text: "Lockere, sichtbare Striche bleiben stehen; Details werden nur angedeutet." },
      { label: "Firnis", text: "Ein abschließender Glanzüberzug fasst die Farben zusammen und schützt die Oberfläche." },
    ],
    palette: ["Rosé", "Himmelblau", "Blei-Zinn-Gelb", "Bleiweiß", "Karmin", "Grau"],
    paletteNote: "Alle Töne werden mit viel Weiß gebrochen — daher die pudrige Wirkung. Schwarz wird sparsam eingesetzt: Schatten sind hier eher grau, blau oder violett.",
    marks: ["Helle, mit Weiß gebrochene Töne", "Geschwungene Linien und asymmetrischer Aufbau", "Alltag, Spiel und Liebe statt großer Historie", "Kleine Formate für private Räume"],
    questions: [
      { prompt: "Was ist eine Fête galante?", options: ["Ein Schlachtenbild", "Eine elegante Gesellschaftsszene im Park", "Ein Altarbild", "Ein Stillleben mit Totenschädel"], answer: "Eine elegante Gesellschaftsszene im Park", explain: "Watteaus Erfindung: Musik, Liebe, Kostüm — und immer ein Schatten von Vergänglichkeit im Hintergrund." },
      { prompt: "Warum wirken Rokoko-Bilder pudrig hell?", options: ["Die Farbe ist verblasst", "Fast jeder Ton wird mit Bleiweiß gebrochen", "Es fehlt der Firnis", "Sie sind auf Papier gemalt"], answer: "Fast jeder Ton wird mit Bleiweiß gebrochen", explain: "Weiß nimmt der Farbe die Wucht. Zusammen mit hellen Grundierungen entsteht der schwebende Eindruck." },
      { prompt: "Was ändert sich mit Chardin?", options: ["Bilder werden größer", "Der stille bürgerliche Alltag wird bildwürdig", "Gold kehrt zurück", "Perspektive wird abgeschafft"], answer: "Der stille bürgerliche Alltag wird bildwürdig", explain: "Ein Krug, ein Kind, ein Stück Brot — die Aufklärung findet Würde im Gewöhnlichen." },
    ],
  },

  romantik: {
    headline: "Die Natur wird größer als der Mensch — und das Innere zum Thema.",
    timeline: [
      { when: "1789–1815", title: "Revolution und Krieg", text: "Napoleons Feldzüge erschüttern Europa. Goya malt Erschießungen ohne Heldenpathos — Krieg als bloßes Grauen." },
      { when: "um 1810", title: "Landschaft als Glaube", text: "Friedrich stellt Rückenfiguren vor Nebel und Meer: Der Betrachter blickt mit ihnen ins Unendliche." },
      { when: "1830er", title: "Dampf und Geschwindigkeit", text: "Eisenbahn und Industrie verändern das Sehen. Turner malt Licht, Dampf und Bewegung statt fester Dinge." },
      { when: "1830", title: "Farbe gegen Linie", text: "Delacroix führt mit bewegten, farbstarken Bildern den Streit gegen die akademische Linienstrenge." },
    ],
    technique: [
      { label: "Studie", text: "Ölskizzen und Aquarelle vor Ort halten Wetter, Licht und Wolken fest." },
      { label: "Komposition", text: "Im Atelier entsteht daraus eine erfundene Landschaft — nicht der Ort, sondern die Stimmung zählt." },
      { label: "Lasur", text: "Übereinandergelegte dünne Schichten erzeugen Tiefe von Dunst und Ferne." },
      { label: "Auflösung", text: "Turner kratzt, wischt und tupft, bis Gegenstände in Licht zerfallen." },
      { label: "Rückenfigur", text: "Eine Gestalt von hinten öffnet die Landschaft als Raum für eigene Gedanken." },
    ],
    palette: ["Preußischblau", "Kobaltblau", "Chromgelb", "Ocker", "Umbra", "Elfenbeinschwarz"],
    paletteNote: "Preußischblau ist das erste synthetische Blau und viel billiger als Ultramarin — plötzlich kann jeder Maler weite Himmel und tiefe Fernen bauen. Chromgelb bringt dazu ein grelles, neues Licht.",
    marks: ["Mensch klein, Natur überwältigend", "Rückenfiguren blicken in die Ferne", "Wetter, Nebel, Dämmerung als Hauptmotiv", "Gefühl vor Genauigkeit"],
    questions: [
      { prompt: "Wozu dient die Rückenfigur bei Friedrich?", options: ["Sie verdeckt Fehler", "Der Betrachter blickt mit ihr in die Ferne", "Sie zeigt den Auftraggeber", "Sie markiert den Fluchtpunkt"], answer: "Der Betrachter blickt mit ihr in die Ferne", explain: "Man sieht kein Gesicht, sondern denselben Ausblick — die Landschaft wird zum Bild des eigenen Inneren." },
      { prompt: "Was ist neu an Preußischblau?", options: ["Es ist das teuerste Pigment", "Es ist das erste synthetische Blau und günstig", "Es stammt aus Lapislazuli", "Es leuchtet im Dunkeln"], answer: "Es ist das erste synthetische Blau und günstig", explain: "Ab 1706 im Labor herstellbar. Es macht Himmel und Ferne für jeden Maler bezahlbar." },
      { prompt: "Was interessiert Turner an Dampf und Sturm?", options: ["Die genaue Technik der Maschinen", "Wie Licht und Bewegung feste Formen auflösen", "Die Größe der Schiffe", "Historische Genauigkeit"], answer: "Wie Licht und Bewegung feste Formen auflösen", explain: "Bei ihm wird Farbe zur Energie — ein Vorgriff auf Impressionismus und Abstraktion." },
    ],
  },

  realismus: {
    headline: "Malt, was ihr seht: Arbeit, Armut und Alltag kommen ins große Format.",
    timeline: [
      { when: "1848", title: "Revolutionsjahr", text: "In ganz Europa fordern Bürger und Arbeiter Rechte. Kunst beginnt, deren Leben ernst zu nehmen." },
      { when: "1849", title: "Courbet malt Ornans", text: "Ein Begräbnis auf dem Dorf, lebensgroß — ein Format, das bis dahin Königen vorbehalten war. Skandal." },
      { when: "1855", title: "Eigene Ausstellung", text: "Vom Salon abgelehnt, baut Courbet einen eigenen Pavillon: der Künstler emanzipiert sich vom Staat." },
      { when: "1863", title: "Salon der Zurückgewiesenen", text: "Manets moderne Motive und flache Malweise spalten Paris — die Moderne beginnt sich abzulösen." },
    ],
    technique: [
      { label: "Bildträger", text: "Große Leinwand, wie sie sonst für Historienbilder verwendet wird." },
      { label: "Grundierung", text: "Mittlere graue oder braune Töne, auf denen Licht schneller sitzt." },
      { label: "Spachtel", text: "Courbet trägt Stein und Erde mit dem Palettmesser auf — die Oberfläche wird selbst rau." },
      { label: "Direkt malen", text: "Alla prima: nass in nass in einer Sitzung, ohne monatelange Lasurschichten." },
      { label: "Flächigkeit", text: "Manet reduziert Zwischentöne — Figuren wirken flach, das Bild bekennt sich als Malerei." },
    ],
    palette: ["Erdbraun", "Ocker", "Beinschwarz", "Bleiweiß", "Venezianischrot", "Grau"],
    paletteNote: "Erden und Schwarz dominieren, nicht aus Armut, sondern als Haltung: keine Schönfärberei. Manet nutzt Schwarz sogar als leuchtende Farbe, nicht bloß als Schatten.",
    marks: ["Arbeitende Menschen im großen Format", "Gedeckte Erdfarben", "Kein Pathos, keine Idealisierung", "Sichtbare, oft raue Oberfläche"],
    questions: [
      { prompt: "Warum war Courbets Dorfbegräbnis ein Skandal?", options: ["Es war zu klein", "Einfache Leute erscheinen im Format eines Königsbildes", "Es zeigte einen Heiligen", "Es war unvollendet"], answer: "Einfache Leute erscheinen im Format eines Königsbildes", explain: "Das Format ist die Botschaft: Wer riesig gemalt wird, gilt als geschichtswürdig." },
      { prompt: "Was heißt alla prima?", options: ["Erste Skizze", "In einer Sitzung nass in nass gemalt", "Nur mit Grundfarben", "Nach Fotografie gemalt"], answer: "In einer Sitzung nass in nass gemalt", explain: "Ohne wochenlanges Trocknen entsteht eine frische, direkte Oberfläche — Voraussetzung für die Freilichtmalerei." },
      { prompt: "Was macht Manet mit Schwarz?", options: ["Er meidet es", "Er nutzt es als leuchtende Farbe", "Er mischt es nur in Schatten", "Er ersetzt es durch Blau"], answer: "Er nutzt es als leuchtende Farbe", explain: "Sein Schwarz ist samtig und farbig — anders als die Impressionisten, die Schwarz aus der Palette streichen." },
    ],
  },

  impressionismus: {
    headline: "Nicht der Gegenstand, das Licht ist das Motiv.",
    timeline: [
      { when: "1841", title: "Die Farbtube", text: "Farbe in Metalltuben bleibt feucht und ist tragbar. Ohne sie gäbe es keine Malerei im Freien." },
      { when: "1853–1870", title: "Paris wird umgebaut", text: "Breite Boulevards, Bahnhöfe, Cafés: Die moderne Freizeitstadt liefert die neuen Motive." },
      { when: "1874", title: "Erste eigene Ausstellung", text: "Abseits des Salons zeigen Monet, Degas und Renoir gemeinsam. Ein Kritiker spottet über „Impression“ — der Name bleibt." },
      { when: "1890er", title: "Serien", text: "Monet malt dasselbe Motiv zu verschiedenen Tageszeiten: Das Thema ist die Veränderung selbst." },
    ],
    technique: [
      { label: "Vor Ort", text: "Feldstaffelei, Klapphocker, kleines Format — gemalt wird dort, wo das Licht ist." },
      { label: "Heller Grund", text: "Weiß grundierte Leinwand hält alles hell; kein dunkler Untergrund zieht die Farbe herunter." },
      { label: "Farbfleck", text: "Kurze, nebeneinandergesetzte Striche mischen sich erst im Auge des Betrachters." },
      { label: "Farbige Schatten", text: "Schatten sind blau oder violett, nicht schwarz — Schwarz verschwindet von der Palette." },
      { label: "Schnell fertig", text: "Eine Sitzung, ein Lichtzustand. Was länger dauert, ist ein anderes Bild." },
    ],
    palette: ["Kobaltblau", "Ultramarin", "Chromgelb", "Viridiangrün", "Zinkweiß", "Zinnober"],
    paletteNote: "Industriell gefertigte, reine Farben aus der Tube. Sie werden kaum vorgemischt, sondern direkt nebeneinandergesetzt — die Mischung übernimmt das Auge auf Distanz.",
    marks: ["Sichtbare, kurze Pinselstriche", "Kein Schwarz, farbige Schatten", "Angeschnittene, wie zufällige Ausschnitte", "Flüchtige Momente: Wetter, Wasser, Menschenmengen"],
    questions: [
      { prompt: "Welche Erfindung macht Malen im Freien praktisch möglich?", options: ["Der Keilrahmen", "Die Farbtube aus Metall", "Der Firnis", "Der Spachtel"], answer: "Die Farbtube aus Metall", explain: "Vorher musste Farbe frisch angerieben werden. Die Tube macht die Palette tragbar — und den Impressionismus möglich." },
      { prompt: "Warum fehlt Schwarz in vielen impressionistischen Bildern?", options: ["Es war zu teuer", "Schatten werden als farbig gesehen", "Es trocknet zu langsam", "Die Tuben gab es nicht"], answer: "Schatten werden als farbig gesehen", explain: "Im Freien ist Schatten kein Loch, sondern Blau oder Violett vom Himmelslicht." },
      { prompt: "Wozu malt Monet dasselbe Motiv immer wieder?", options: ["Zum Üben", "Um Licht und Zeit als eigentliches Thema zu zeigen", "Weil Käufer es verlangten", "Weil die Farbe ablief"], answer: "Um Licht und Zeit als eigentliches Thema zu zeigen", explain: "Die Kathedrale ist nur der Anlass. Gemalt wird der Unterschied zwischen morgens und abends." },
    ],
  },

  postimpressionismus: {
    headline: "Farbe hört auf zu beschreiben — sie baut, fühlt und bedeutet.",
    timeline: [
      { when: "1886", title: "Letzte gemeinsame Schau", text: "Die Impressionisten stellen zum achten und letzten Mal zusammen aus. Danach geht jeder eigene Wege." },
      { when: "1886", title: "Seurats System", text: "Ein Sonntagnachmittag aus Millionen Punkten: Farblehre wird zur Methode, das Bild zur Konstruktion." },
      { when: "1888", title: "Van Gogh in Arles", text: "Das südliche Licht treibt ihn zu reinen Komplementärkontrasten und dick aufgesetzter Farbe." },
      { when: "1890er", title: "Cézanne in der Provence", text: "Er sucht hinter dem Eindruck die Form: Kugel, Kegel, Zylinder — die Vorstufe des Kubismus." },
    ],
    technique: [
      { label: "Grober Träger", text: "Jute und raue Leinwand geben der Farbe Halt und der Oberfläche Struktur." },
      { label: "Impasto", text: "Van Gogh drückt Farbe fast unvermischt aus der Tube; jeder Strich bleibt als Spur sichtbar." },
      { label: "Punkt", text: "Seurat setzt kleine reine Punkte nebeneinander — die Mischung entsteht im Auge." },
      { label: "Farbfläche", text: "Gauguin umrandet flache Farbfelder dunkel — Farbe wird Symbol, nicht Beschreibung." },
      { label: "Modulation", text: "Cézanne baut Volumen aus schräg gesetzten Farbflecken statt aus Licht und Schatten." },
    ],
    palette: ["Chromgelb", "Kobaltblau", "Smaragdgrün", "Zinnober", "Krapplack", "Violett"],
    paletteNote: "Komplementärpaare treiben die Wirkung: Gelb gegen Blau, Rot gegen Grün. Manche Industriepigmente sind chemisch instabil — van Goghs Chromgelb ist teilweise nachgedunkelt, seine Sonnenblumen waren einmal greller.",
    marks: ["Farbe frei vom natürlichen Vorbild", "Deutlich sichtbare Strichstruktur", "Flächen mit Kontur statt weicher Übergänge", "Form wird geordnet, nicht abgebildet"],
    questions: [
      { prompt: "Wo mischen sich die Farben beim Pointillismus?", options: ["Auf der Palette", "Im Auge des Betrachters", "Im Firnis", "In der Untermalung"], answer: "Im Auge des Betrachters", explain: "Reine Punkte bleiben rein. Erst auf Distanz verbinden sie sich — dadurch wirkt die Fläche vibrierend hell." },
      { prompt: "Was sucht Cézanne hinter dem Eindruck?", options: ["Die Erzählung", "Die feste Form und Ordnung des Gesehenen", "Das perfekte Licht", "Historische Genauigkeit"], answer: "Die feste Form und Ordnung des Gesehenen", explain: "Er will „aus dem Impressionismus etwas Dauerhaftes machen“ — deshalb gilt er als Vater der Moderne." },
      { prompt: "Warum sehen van Goghs Gelbtöne heute anders aus?", options: ["Sie wurden übermalt", "Chromgelb ist chemisch instabil und dunkelt nach", "Der Firnis fehlt", "Sie waren nie gelb"], answer: "Chromgelb ist chemisch instabil und dunkelt nach", explain: "Neue Industriepigmente waren leuchtend, aber nicht immer haltbar — Bildwirkung ist auch Chemiegeschichte." },
    ],
  },

  moderne: {
    headline: "Das Bild löst sich vom Gegenstand — und wird eigene Wirklichkeit.",
    timeline: [
      { when: "um 1900", title: "Innenleben wird Thema", text: "Großstadt, Psychoanalyse und Nervosität: Munch und Klimt malen Angst, Begehren und Rausch statt Ähnlichkeit." },
      { when: "1911", title: "Der Blaue Reiter", text: "Kandinsky und Marc verbinden Malerei mit Musik. Farbe bekommt eine eigene, geistige Bedeutung." },
      { when: "1915", title: "Schwarzes Quadrat", text: "Malewitsch erklärt die reine Form zum Bildereignis — ein Nullpunkt, von dem aus neu gebaut wird." },
      { when: "1919", title: "Bauhaus", text: "Kunst, Handwerk und Industrie werden zusammengeführt: Gestaltung soll den Alltag verändern." },
    ],
    technique: [
      { label: "Reine Farbe", text: "Tubenfarbe wird ungemischt eingesetzt — nach Wirkung, nicht nach Naturtreue." },
      { label: "Fläche", text: "Klare Farbfelder und Konturen ersetzen räumliche Modellierung." },
      { label: "Material", text: "Blattgold, Metall, Papier, Fotografie und Glas kommen ins Bild." },
      { label: "Werkzeug", text: "Lineal, Schablone und Spritzpistole treten neben den Pinsel." },
      { label: "Ordnung", text: "Linie, Fläche und Farbe funktionieren wie Stimmen in der Musik — Komposition statt Erzählung."},
    ],
    palette: ["Primärrot", "Primärblau", "Primärgelb", "Schwarz", "Weiß", "Cadmiumgelb"],
    paletteNote: "Reine, deckende Industriefarben. Am Bauhaus wird systematisch untersucht, welches Gewicht, welche Temperatur und welche räumliche Wirkung eine Farbe hat — Farbe wird Lehrstoff.",
    marks: ["Kein Fluchtpunkt, keine Tiefenillusion", "Reine, ungemischte Farbflächen", "Geometrie oder verzerrte, ausdrucksstarke Linien", "Titel wie Komposition statt Motivnamen"],
    questions: [
      { prompt: "Was bedeutet Abstraktion in der Malerei?", options: ["Ungenau malen", "Das Bild verzichtet auf den erkennbaren Gegenstand", "Nur mit Schwarz arbeiten", "Sehr klein malen"], answer: "Das Bild verzichtet auf den erkennbaren Gegenstand", explain: "Farbe und Form wirken für sich, wie Töne in der Musik — Kandinsky nennt Malerei deshalb eine Komposition." },
      { prompt: "Was ist das Ziel des Bauhauses?", options: ["Nur Malerei zu lehren", "Kunst, Handwerk und Industrie zu verbinden", "Die Antike wiederzubeleben", "Kirchenbilder zu erneuern"], answer: "Kunst, Handwerk und Industrie zu verbinden", explain: "Ein Stuhl, ein Plakat, eine Lampe zählen so viel wie ein Gemälde: Gestaltung soll den Alltag prägen." },
      { prompt: "Warum benutzt Mondrian nur Primärfarben, Schwarz und Weiß?", options: ["Andere Farben gab es nicht", "Er sucht eine reduzierte, allgemeingültige Grammatik", "Es war billiger", "Zur besseren Haltbarkeit"], answer: "Er sucht eine reduzierte, allgemeingültige Grammatik", explain: "Waagrechte, Senkrechte und drei Farben sollen ein universelles Gleichgewicht ergeben — gültig überall." },
    ],
  },
};

export function epochGuide(slug: string): EpochGuide | undefined {
  return epochGuides[slug];
}

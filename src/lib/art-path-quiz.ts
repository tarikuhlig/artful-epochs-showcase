export type ArtPathQuiz = {
  question: string;
  options: [string, string, string];
  answer: string;
  explanation: string;
};

export const artPathQuizzes: ArtPathQuiz[] = [
  { question: "Welche Technik machte van Eycks Bildwelt so detailreich?", options: ["Ölfarbe in feinen Schichten", "Fresko auf nassem Putz", "Grobe Holzschnitte"], answer: "Ölfarbe in feinen Schichten", explanation: "Transparente Öllasuren erzeugen Tiefe, Glanz und feinste Oberflächen." },
  { question: "Was verbindet Leonardo in der Mona Lisa?", options: ["Forschung und psychologische Beobachtung", "Zufall und reine Geometrie", "Mittelalterliche Goldgründe"], answer: "Forschung und psychologische Beobachtung", explanation: "Sfumato, Anatomie und genaue Beobachtung machen das Porträt zu einer Begegnung." },
  { question: "Welche Idee prägt Botticellis Renaissancebild?", options: ["Der Mensch und die Antike rücken ins Zentrum", "Nur religiöse Regeln zählen", "Farbe wird vollständig vermieden"], answer: "Der Mensch und die Antike rücken ins Zentrum", explanation: "Humanismus und antike Mythologie erweiterten die Bildthemen der Renaissance." },
  { question: "Was verändert Dürers Selbstbildnis am Künstlerbild?", options: ["Der Künstler erscheint als selbstbewusster Schöpfer", "Der Maler bleibt anonym", "Nur der Auftraggeber ist wichtig"], answer: "Der Künstler erscheint als selbstbewusster Schöpfer", explanation: "Dürer präsentiert sich nicht als Handwerker, sondern als geistiger Autor." },
  { question: "Womit lenkt Caravaggio die Handlung?", options: ["Mit dramatischem Licht", "Mit einer Vogelperspektive", "Mit pastellfarbenen Flächen"], answer: "Mit dramatischem Licht", explanation: "Der harte Lichtstrahl führt Blick, Handlung und religiöse Bedeutung zusammen." },
  { question: "Was macht Vermeer zum großen Bildthema?", options: ["Den konzentrierten Alltag", "Antike Schlachten", "Königliche Zeremonien"], answer: "Den konzentrierten Alltag", explanation: "Stilles Licht und alltägliche Arbeit erhalten bei Vermeer Würde und Größe." },
  { question: "Welche Rolle spielt die Natur in der Romantik?", options: ["Sie spiegelt innere Erfahrung", "Sie ist nur Dekoration", "Sie wird exakt vermessen"], answer: "Sie spiegelt innere Erfahrung", explanation: "Die Landschaft wird zur Projektionsfläche für Sehnsucht, Erhabenheit und das Ich." },
  { question: "Was wollten die Impressionisten festhalten?", options: ["Licht und flüchtige Atmosphäre", "Unsichtbare Mythen", "Perfekte Umrisslinien"], answer: "Licht und flüchtige Atmosphäre", explanation: "Sichtbare Pinselstriche erfassen den momentanen Eindruck statt dauerhafter Konturen." },
  { question: "Warum wirkt van Goghs Farbe so modern?", options: ["Sie drückt Gefühl statt Naturtreue aus", "Sie bleibt vollkommen neutral", "Sie folgt fotografischer Genauigkeit"], answer: "Sie drückt Gefühl statt Naturtreue aus", explanation: "Farbe und Rhythmus übersetzen die sichtbare Welt in seelische Energie." },
  { question: "Was steht im Expressionismus an erster Stelle?", options: ["Die innere Wahrheit", "Die perfekte Ähnlichkeit", "Die höfische Etikette"], answer: "Die innere Wahrheit", explanation: "Verformung und intensive Farbe machen Gefühle unmittelbar sichtbar." },
  { question: "Was befreit Kandinsky in der Abstraktion?", options: ["Das Bild vom Gegenstand", "Die Kunst von Farbe", "Die Malerei von Musik"], answer: "Das Bild vom Gegenstand", explanation: "Farben und Linien können wie Musik wirken, ohne etwas Gegenständliches abzubilden." },
  { question: "Worauf reduziert Mondrian seine Malerei?", options: ["Linie, Fläche und Grundfarbe", "Licht, Schatten und Anatomie", "Mythos, Landschaft und Porträt"], answer: "Linie, Fläche und Grundfarbe", explanation: "Aus wenigen elementaren Mitteln entwickelt Mondrian eine universelle Ordnung." },
];
// Zwischenfragen je Station (kein Freischalten, nur Lernen)
export const stationQuizSets: ArtPathQuiz[][] = [
  [
    { question: "Womit malten van Eyck und seine Zeitgenossen ihre glänzenden Oberflächen?", options: ["Öl in dünnen Lasuren", "Nur Eitempera", "Acrylfarbe"], answer: "Öl in dünnen Lasuren", explanation: "Öl trocknet langsam und lässt sich Schicht für Schicht auftragen — ideal für Glanz und Tiefe." },
    { question: "Was zeigt der runde Spiegel im Arnolfini-Porträt?", options: ["Den Raum samt weiterer Personen", "Eine Landschaft draußen", "Nur die Farbe Gold"], answer: "Den Raum samt weiterer Personen", explanation: "Der Spiegel erweitert das Bild um alles, was hinter dem Betrachterstandpunkt liegt." },
    { question: "In welcher Region entstand diese frühe Ölmalerei?", options: ["In den flämischen Handelsstädten", "Auf Sizilien", "In Nordschweden"], answer: "In den flämischen Handelsstädten", explanation: "Reiche Kaufleute in Brügge und Gent bestellten kleine, kostbar gemalte Tafeln." },
  ],
  [
    { question: "Welche Familie förderte die Kunst in Florenz besonders?", options: ["Die Medici", "Die Habsburger", "Die Tudors"], answer: "Die Medici", explanation: "Als Bankiers finanzierten die Medici Werkstätten, Feste und Gelehrte." },
    { question: "Woher stammen Botticellis Bildthemen?", options: ["Aus der antiken Mythologie", "Aus Reiseberichten nach Asien", "Aus wissenschaftlichen Atlanten"], answer: "Aus der antiken Mythologie", explanation: "Venus und Frühlingsgöttinnen kehren mit dem Humanismus in die Malerei zurück." },
    { question: "Welche Technik ordnet den Bildraum neu?", options: ["Die Zentralperspektive", "Der Goldgrund", "Die Fotografie"], answer: "Die Zentralperspektive", explanation: "Fluchtlinien zu einem Punkt lassen die Fläche zum begehbaren Raum werden." },
  ],
  [
    { question: "Was bedeutet Sfumato?", options: ["Weiche Übergänge ohne harte Konturen", "Grelle Farbkontraste", "Ein Bildformat"], answer: "Weiche Übergänge ohne harte Konturen", explanation: "Leonardo lässt Licht und Schatten wie Rauch ineinanderfließen." },
    { question: "Wo befindet sich die Erschaffung Adams?", options: ["An der Decke der Sixtinischen Kapelle", "Im Louvre", "In der Hagia Sophia"], answer: "An der Decke der Sixtinischen Kapelle", explanation: "Michelangelo malte das Deckenfresko zwischen 1508 und 1512 in Rom." },
    { question: "Wen versammelt Raffael in der Schule von Athen?", options: ["Antike Philosophen", "Römische Kaiser", "Heilige des Mittelalters"], answer: "Antike Philosophen", explanation: "Platon und Aristoteles stehen im Zentrum einer idealen Denkgemeinschaft." },
  ],
  [
    { question: "Welche Technik verbreitete Bilder erstmals in großer Zahl?", options: ["Die Druckgrafik", "Das Mosaik", "Die Freskomalerei"], answer: "Die Druckgrafik", explanation: "Holzschnitt und Kupferstich machen ein Motiv hundertfach verfügbar." },
    { question: "Was ist Dürers Feldhase?", options: ["Eine genaue Naturstudie in Wasserfarbe", "Ein Altarbild", "Ein Wandteppich"], answer: "Eine genaue Naturstudie in Wasserfarbe", explanation: "Jedes Haar ist beobachtet — Naturstudium wird zur eigenständigen Kunst." },
    { question: "In welcher Stadt arbeitete Dürer?", options: ["Nürnberg", "Köln", "Prag"], answer: "Nürnberg", explanation: "Nürnberg war Handels- und Druckzentrum des Heiligen Römischen Reiches." },
  ],
  [
    { question: "Wie heißt die starke Hell-Dunkel-Malerei?", options: ["Chiaroscuro", "Grisaille", "Pointillismus"], answer: "Chiaroscuro", explanation: "Aus dem Dunkel geschnittenes Licht macht die Szene zur Bühne." },
    { question: "Wer malte eine besonders drastische Judith mit Holofernes?", options: ["Artemisia Gentileschi", "Sofonisba Anguissola", "Rosalba Carriera"], answer: "Artemisia Gentileschi", explanation: "Gentileschi zeigt die Tat als körperliche Anstrengung zweier Frauen." },
    { question: "Was wollte barocke Kirchenkunst erreichen?", options: ["Den Betrachter emotional ergreifen", "Möglichst abstrakt bleiben", "Nur Texte illustrieren"], answer: "Den Betrachter emotional ergreifen", explanation: "Nach der Reformation setzte die Kirche bewusst auf Ergriffenheit statt Belehrung." },
  ],
  [
    { question: "Wer bestellte in Holland die meisten Bilder?", options: ["Bürger, Kaufleute und Gilden", "Nur der König", "Nur Klöster"], answer: "Bürger, Kaufleute und Gilden", explanation: "Ein freier Markt entsteht: Bilder hängen im Wohnhaus statt im Palast." },
    { question: "Was zeigt Rembrandts Nachtwache?", options: ["Eine Schützenkompanie im Aufbruch", "Eine Seeschlacht", "Ein Königsporträt"], answer: "Eine Schützenkompanie im Aufbruch", explanation: "Rembrandt verwandelt das steife Gruppenbild in eine bewegte Szene." },
    { question: "In welcher Stadt arbeitete Vermeer?", options: ["Delft", "Utrecht", "Antwerpen"], answer: "Delft", explanation: "Vermeers stille Innenräume entstehen fast alle in seiner Heimatstadt." },
  ],
  [
    { question: "Was bewirkt Friedrichs Rückenfigur?", options: ["Wir blicken mit ihr in die Ferne", "Sie verdeckt die Landschaft", "Sie erklärt die Handlung"], answer: "Wir blicken mit ihr in die Ferne", explanation: "Die Figur wird zur Einladung, das eigene Empfinden ins Bild zu legen." },
    { question: "Was zeigt Goyas Der dritte Mai 1808?", options: ["Die Erschießung von Aufständischen", "Eine Krönung", "Ein Volksfest"], answer: "Die Erschießung von Aufständischen", explanation: "Goya malt Krieg ohne Heldentum — als Anklage." },
    { question: "Was löst Turner in seinen späten Bildern auf?", options: ["Die feste Form im Licht", "Die Farbigkeit", "Das Bildformat"], answer: "Die feste Form im Licht", explanation: "Dampf, Nebel und Sonne verschlucken die Konturen." },
  ],
  [
    { question: "Woher kommt der Name Impressionismus?", options: ["Von Monets Impression, Sonnenaufgang", "Von einer Pariser Straße", "Von einem Farbhersteller"], answer: "Von Monets Impression, Sonnenaufgang", explanation: "Ein Kritiker meinte es spöttisch — die Gruppe übernahm das Wort." },
    { question: "Was ermöglichte das Malen im Freien?", options: ["Farbe in Metalltuben", "Elektrisches Licht", "Der Fotoapparat"], answer: "Farbe in Metalltuben", explanation: "Erst tragbare Farbe machte die Staffelei am Flussufer möglich." },
    { question: "Welches Motiv untersuchte Degas immer wieder?", options: ["Tänzerinnen und Bühnenproben", "Bergpanoramen", "Seeschlachten"], answer: "Tänzerinnen und Bühnenproben", explanation: "Ungewöhnliche Ausschnitte zeigen Arbeit statt Aufführung." },
  ],
  [
    { question: "Welchen Berg malte Cézanne über 80-mal?", options: ["Mont Sainte-Victoire", "Montmartre", "Mont Blanc"], answer: "Mont Sainte-Victoire", explanation: "Am selben Motiv erforscht Cézanne den Bildaufbau aus Farbflächen." },
    { question: "Wo entstand van Goghs Sternennacht?", options: ["In Saint-Rémy-de-Provence", "In Amsterdam", "In London"], answer: "In Saint-Rémy-de-Provence", explanation: "Der Blick aus dem Fenster der Heilanstalt wird zur kosmischen Vision." },
    { question: "Wie heißt Seurats Malweise aus kleinen Farbpunkten?", options: ["Pointillismus", "Impasto", "Sgraffito"], answer: "Pointillismus", explanation: "Die Punkte mischen sich erst im Auge des Betrachters." },
  ],
  [
    { question: "Womit arbeitete Klimt in seiner Goldphase?", options: ["Mit Blattgold", "Mit Sand", "Mit Emaille"], answer: "Mit Blattgold", explanation: "Gold macht Ornament und Fläche zum Ausdrucksmittel." },
    { question: "Was macht Munchs Der Schrei sichtbar?", options: ["Eine innere Erschütterung", "Eine historische Schlacht", "Ein Familienporträt"], answer: "Eine innere Erschütterung", explanation: "Die Landschaft schwingt im selben Rhythmus wie die Figur." },
    { question: "Welche Farbe steht bei Franz Marc für das Geistige?", options: ["Blau", "Braun", "Grau"], answer: "Blau", explanation: "Marc ordnet den Farben feste seelische Bedeutungen zu." },
  ],
  [
    { question: "Womit verglich Kandinsky die Malerei?", options: ["Mit Musik", "Mit Architektur", "Mit Literatur"], answer: "Mit Musik", explanation: "Farbe klingt für ihn wie ein Instrument, ganz ohne Gegenstand." },
    { question: "Wie hieß die Münchner Künstlergruppe um Kandinsky und Marc?", options: ["Der Blaue Reiter", "Die Brücke", "Der Sturm"], answer: "Der Blaue Reiter", explanation: "Almanach und Ausstellungen bündelten die Suche nach dem Geistigen in der Kunst." },
    { question: "Was verband das Bauhaus?", options: ["Kunst, Handwerk und Gestaltung", "Malerei und Theologie", "Musik und Medizin"], answer: "Kunst, Handwerk und Gestaltung", explanation: "Werkstattarbeit sollte Alltag und Kunst wieder zusammenbringen." },
  ],
  [
    { question: "Welche Farben verwendet Mondrian in seinen Rastern?", options: ["Rot, Blau und Gelb mit Schwarz und Weiß", "Alle Mischtöne", "Nur Erdfarben"], answer: "Rot, Blau und Gelb mit Schwarz und Weiß", explanation: "Die Reduktion soll eine allgemeingültige Ordnung sichtbar machen." },
    { question: "Wie heißt die niederländische Bewegung um Mondrian?", options: ["De Stijl", "Fauvismus", "Vorticismus"], answer: "De Stijl", explanation: "Zeitschrift und Gruppe verbreiteten die Idee einer neuen Gestaltung." },
    { question: "Welches Bild gilt als radikalster Schritt Malewitschs?", options: ["Das Schwarze Quadrat", "Die Sonnenblumen", "Der Wanderer"], answer: "Das Schwarze Quadrat", explanation: "Ein Bild ohne jeden Gegenstand — der Nullpunkt der Malerei." },
  ],
];

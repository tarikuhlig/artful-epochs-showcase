export type EpochAtelier = {
  history: string;
  palette: string[];
  pigments: string;
  supports: string;
  tools: string;
  technique: string;
  artistLens: string[];
};

export const epochAteliers: EpochAtelier[] = [
  {
    history: "Brügge ist ein internationales Handelszentrum. Wohlhabende Kaufleute, der burgundische Hof und kirchliche Auftraggeber verlangen Bilder, in denen kostbare Waren, Frömmigkeit und gesellschaftlicher Rang bis ins kleinste Detail lesbar werden.",
    palette: ["Ultramarin", "Zinnober", "Malachitgrün", "Bleiweiß", "Ocker"],
    pigments: "Echtes Ultramarin wird aus Lapislazuli gewonnen und ist teurer als Gold. Zinnober liefert ein leuchtendes Rot; Azurit und Malachit erzeugen Blau und Grün. Gemahlene Pigmente werden mit Lein- oder Walnussöl gebunden.",
    supports: "Sorgfältig geglättete Eichenholztafeln mit heller Kreidegrundierung; Gold kommt weiterhin vor, wird aber zunehmend als gemaltes Licht dargestellt.",
    tools: "Sehr feine Pinsel aus Tierhaar, Reibstein und Läufer zum Mahlen der Pigmente, Muscheln oder kleine Näpfe für die Farben.",
    technique: "Dünne, durchscheinende Öllasuren liegen übereinander. Licht dringt durch diese Schichten, wird vom hellen Grund zurückgeworfen und lässt Schmuck, Haut und Stoffe tief leuchten.",
    artistLens: ["Hofmaler und Diplomat: Seine Reisen und Nähe zum burgundischen Hof schärfen van Eycks Blick für Status, Stoffe und internationale Kultur.", "Er übersetzt Trauer in klar gebaute Gesten und faltet Gewänder wie Architektur; seine Figuren sollen Mitgefühl körperlich spürbar machen.", "Bosch verbindet vertraute Andachtsbilder mit rätselhaften Mischwesen und moralischen Warnungen – eine Bildwelt zwischen Glauben und Fantasie.", "Bruegel beobachtet Bauern, Landschaft und Jahreszeiten aus erhöhter Sicht und macht den Alltag selbst zum großen Menschentheater."],
  },
  {
    history: "Florenz wird von Handel, Banken und dem Mäzenatentum der Medici geprägt. Humanisten lesen antike Texte neu; Künstler studieren Natur, Geometrie und den menschlichen Körper.",
    palette: ["Azuritblau", "Zinnoberrot", "Ocker", "Grüne Erde", "Blattgold"],
    pigments: "Neben kostbarem Ultramarin nutzen Maler Azurit, Zinnober, rote und gelbe Erden sowie Grünspan. Die Farben stammen aus Mineralien, Pflanzen und chemisch hergestellten Verbindungen.",
    supports: "Pappelholztafeln mit Gesso-Grund, Wandputz für Fresken und zunehmend Leinwand. Botticellis große Mythologien sind mit Tempera auf Leinwand gemalt.",
    tools: "Silberstift und Kohle für Vorzeichnungen, Zirkel und Schnüre für Perspektive, feine Pinsel; Eitempera trocknet rasch und verlangt präzise Striche.",
    technique: "Lineare Perspektive ordnet Tiefe mathematisch. Tempera erzeugt klare, helle Flächen; Konturen führen wie ein Rhythmus durch Haare, Hände und wehende Gewänder.",
    artistLens: ["Botticelli arbeitet im Kreis der Medici. Seine Figuren wirken weniger körperlich als musikalisch: Kontur, Bewegung und antike Dichtung tragen die Bedeutung.", "Fra Angelico verbindet die neue räumliche Klarheit mit stiller Andacht; Licht und Farbe lassen das Heilige ruhig und menschennah erscheinen.", "Piero ist Maler und Mathematiker. Seine geometrisch gebauten Räume und reglosen Figuren machen Licht zu einer ordnenden Kraft.", "Mantegna studiert antike Skulptur und extreme Verkürzungen. Stein, Körper und Architektur wirken bei ihm beinahe gemeißelt."],
  },
  {
    history: "Nürnberg liegt an europäischen Handelswegen; gedruckte Bücher und Bilder verbreiten reformatorische und humanistische Ideen. Künstler reisen, publizieren und schützen erstmals bewusst ihr Zeichen als Marke.",
    palette: ["Bleiweiß", "Zinnober", "Azurit", "Ocker", "Pflanzenschwarz"],
    pigments: "Ölfarbe erlaubt genaue Oberflächen, Aquarell transparente Naturstudien. In der Druckgrafik bestimmt schwarze Druckfarbe aus Ruß und Öl den Ausdruck.",
    supports: "Linden- und Eichenholz für Gemälde und Holzstöcke, Kupferplatten für Stiche, handgeschöpftes Papier für Drucke und Aquarelle.",
    tools: "Grabstichel, Schneidemesser, Druckpresse, Feder, Pinsel und Zirkel. Jeder Strich muss vor dem Druck spiegelverkehrt in Holz oder Metall gesetzt werden.",
    technique: "Holzschnitt arbeitet mit kräftigen Hell-Dunkel-Flächen, Kupferstich mit dichten Kreuzschraffuren. Dürers Monogramm macht das vervielfältigte Bild unverwechselbar.",
    artistLens: ["Dürer wächst in einer Goldschmiedefamilie auf, reist nach Italien und verbindet nördliche Detailtreue mit Proportionslehre. Sein Monogramm wird zum frühen Künstlerzeichen.", "Holbein bewegt sich zwischen Basel und dem englischen Hof. Stoffe, Gesichter und Gegenstände nutzt er als genaue Sprache von Macht und Persönlichkeit.", "Cranach führt eine produktive Werkstatt in Wittenberg und ist eng mit der Reformation verbunden; seine Bildtypen zirkulieren in vielen Varianten.", "Grünewald bleibt biografisch geheimnisvoll. Seine grellen Farben und verzerrten Körper steigern religiöses Leiden zu einer unmittelbaren Erfahrung."],
  },
  {
    history: "Florenz und das päpstliche Rom konkurrieren um die berühmtesten Meister. Anatomie, Mathematik, antike Kunst und kirchliche Macht verbinden sich in monumentalen Aufträgen.",
    palette: ["Ultramarin", "Bleiweiß", "Zinnober", "Ocker", "Kupfergrün"],
    pigments: "Auftraggeber rechnen kostbares Ultramarin oft gesondert ab. Für Haut werden Bleiweiß, rote Erde und Ocker gemischt; dunkle Lasuren und rauchige Übergänge modellieren Volumen.",
    supports: "Pappelholz und Leinwand für Ölgemälde, frischer Kalkputz für Fresken, großformatige Kartons zur Übertragung von Entwürfen.",
    tools: "Zeichenstift, Rötel, Lochpausen, Pinsel und Gerüste. Anatomische Studien und Modelle gehen dem endgültigen Bild voraus.",
    technique: "Leonardos Sfumato löst harte Konturen in Dunst auf; Raffael baut harmonische Gruppen; Michelangelo malt in Tagesabschnitten direkt auf feuchten Putz.",
    artistLens: ["Leonardo untersucht Wasser, Anatomie, Optik und Bewegung. Langsames Arbeiten und zahllose Studien machen Malerei für ihn zu einer Form des Denkens.", "Raffael kommt jung nach Florenz und Rom, führt eine große Werkstatt und ordnet komplexe Gruppen mit scheinbarer Leichtigkeit und sozialer Eleganz.", "Michelangelo versteht sich zuerst als Bildhauer. Auch gemalte Körper behandelt er wie gespannte, aus dem Stein befreite Formen.", "Tizian prägt Venedigs farborientierte Malerei. Mit sichtbaren, später oft lockeren Pinselzügen baut er Haut, Stoff und Atmosphäre aus Farbe."],
  },
  {
    history: "Im Rom der Gegenreformation soll Kunst Gläubige unmittelbar bewegen. Kirchliche Großaufträge, höfische Repräsentation und ein wachsender Markt verlangen dramatische, leicht lesbare Bilder.",
    palette: ["Bleiweiß", "Zinnober", "Ocker", "Umbra", "Lapislazuli"],
    pigments: "Warme Erdfarben und tiefe Schwarztöne bilden die Bühne für wenige leuchtende Akzente. Kostbares Blau und kräftiges Rot lenken den Blick auf Hauptfiguren.",
    supports: "Große Leinwände auf Keilrahmen sind leichter zu transportieren als Holztafeln; dazu kommen Fresken für Kirchen- und Palastdecken.",
    tools: "Borstenpinsel für kraftvolle Spuren, weiche Pinsel für Lasuren, Kreidezeichnungen und lebende Modelle unter gerichteter Beleuchtung.",
    technique: "Tenebrismus lässt Figuren aus tiefem Dunkel hervortreten. Diagonalen, verkürzte Körper und ein genau gewählter dramatischer Moment ziehen Betrachter in die Handlung.",
    artistLens: ["Caravaggio lebt rastlos zwischen Ruhm, Streit und Flucht. Er malt direkt nach Modellen aus den Straßen Roms und macht Heilige körperlich gegenwärtig.", "Artemisia Gentileschi behauptet sich in einer männlich dominierten Welt. Ihre Heldinnen handeln entschlossen; Licht, Körper und Perspektive geben ihnen Macht.", "Rubens ist Maler, Gelehrter und Diplomat. Seine große Antwerpener Werkstatt organisiert bewegte Kompositionen für Höfe in ganz Europa.", "Velázquez steigt am spanischen Hof zum Kammermaler auf. Mit lockerer Farbe untersucht er Rang, Wahrnehmung und die Stellung des Malers selbst."],
  },
  {
    history: "Die protestantische Republik besitzt kaum kirchliche Großaufträge, dafür viele wohlhabende Bürger. Bilder werden auf Märkten und in Werkstätten für Häuser, Gilden und Sammler produziert.",
    palette: ["Blei-Zinn-Gelb", "Ultramarin", "Ocker", "Umbra", "Beinschwarz"],
    pigments: "Vermeer setzt teures natürliches Ultramarin selbst in Schatten ein. Gelb, Ocker und Bleiweiß erzeugen warmes Innenlicht; dunkle Erden tragen Rembrandts Tiefe.",
    supports: "Meist Leinwand, für kleine feine Bilder auch Holztafeln. Grundierungen können hell, grau oder warmbraun sein und bestimmen die Gesamtstimmung.",
    tools: "Palette, Borsten- und Haarpinsel, Mahlstein; optische Hilfsmittel wie die Camera obscura werden diskutiert, sind aber nicht für jedes Werk sicher belegt.",
    technique: "Dünne Lasuren treffen auf pastose Lichtpunkte. Unterschiedliche Oberflächen – Brot, Perle, Haut, Metall – entstehen durch wechselnde Dichte und Pinselführung.",
    artistLens: ["Vermeer arbeitet langsam und hinterlässt nur wenige Gemälde. Er macht alltägliche Innenräume durch Licht, Geometrie und Farbbeziehungen still und kostbar.", "Rembrandt erlebt Erfolg, Schulden und persönliche Verluste. Seine dicke Farbe und tiefen Schatten werden mit den Jahren freier und psychologisch eindringlicher.", "Frans Hals fängt Haltung und Lachen mit schnellen, sichtbaren Pinselzügen ein; die scheinbare Spontaneität ist präzise kontrolliert.", "Jan Steen führt zeitweise eine Schenke und malt turbulente Haushalte. Komik und kleine Hinweise verwandeln Alltagsszenen in moralische Erzählungen."],
  },
  {
    history: "Revolution, Krieg und Industrialisierung erschüttern Europa. Als Gegenbild zur nüchternen Vernunft suchen Künstler das Erhabene in Natur, Erinnerung, Freiheit und Albtraum.",
    palette: ["Preußischblau", "Kobaltblau", "Ocker", "Elfenbeinschwarz", "Chromgelb"],
    pigments: "Neue künstliche Pigmente erweitern die Palette: Preußischblau ist tief und vergleichsweise günstig, später bringen Kobalt- und Chromfarben neue Intensität.",
    supports: "Grundierte Leinwand dominiert; Ölstudien auf Papier oder kleinen Tafeln halten Licht und Wetter fest. Aquarell wird besonders in England wichtig.",
    tools: "Breite und feine Pinsel, Spachtel, Skizzenbuch und tragbare Malkästen. Studien vor der Natur werden im Atelier zu großen Bildern verdichtet.",
    technique: "Lasuren schaffen Tiefe, sichtbare Spuren erzeugen Wetter und Bewegung. Rückenfiguren öffnen Landschaften als geistigen Raum; Farbe kann Formen beinahe auflösen.",
    artistLens: ["Friedrich arbeitet zurückgezogen in Dresden. Wanderungen und genaue Studien werden im Atelier zu erfundenen Landschaften über Einsamkeit, Glauben und Endlichkeit.", "Turner reist unermüdlich und notiert Wetter in Aquarellen. Licht, Dampf und Sturm lösen feste Gegenstände zunehmend in farbige Energie auf.", "Goya wird Hofmaler und zugleich schonungsloser Beobachter von Gewalt. Krankheit und Krieg verdunkeln seine Bildwelt bis zu den privaten Schwarzen Gemälden.", "Delacroix führt Tagebuch, reist nach Nordafrika und verteidigt Farbe gegen akademische Linienstrenge. Politik und Literatur werden zu bewegten Bilddramen."],
  },
  {
    history: "Paris wird durch Boulevards, Bahnhöfe und Freizeitorte neu geordnet. Künstler verlassen den offiziellen Salon, zeigen gemeinsam aus und malen das moderne Leben aus ungewohnten Ausschnitten.",
    palette: ["Kobaltblau", "Ultramarin", "Chromgelb", "Viridiangrün", "Zinkweiß"],
    pigments: "Industriell gefertigte Farben sind heller und verlässlicher. Metalltuben halten sie feucht und transportabel; neue Blau-, Grün- und Gelbtöne fördern reine Farbflecken.",
    supports: "Vorgefertigte, grundierte Leinwände und leichte Feldstaffeleien. Kleinere Formate lassen sich mit Bahn und Boot ins Freie tragen.",
    tools: "Metalltuben, Flachpinsel, Feldstaffelei, Malkasten und faltbarer Hocker. Fotografie und japanische Drucke inspirieren überraschende Ausschnitte.",
    technique: "Kurze, sichtbare Pinselstriche und nebeneinandergesetzte Farben mischen sich erst im Auge. Farbige Schatten ersetzen häufig Schwarz.",
    artistLens: ["Monet organisiert Serien vor demselben Motiv und arbeitet an mehreren Leinwänden parallel. Nicht der Gegenstand, sondern wechselndes Licht wird zum Thema.", "Renoir malt das gesellige Paris mit warmer, flimmernder Farbe. Figuren und Umgebung verschmelzen in einem Rhythmus aus Flecken und Blicken.", "Degas nennt sich Realist und beobachtet Proben, Arbeit und Bewegung. Fotografie und japanische Drucke prägen seine angeschnittenen Räume.", "Manet fordert den Salon mit modernen Motiven und flacher Malweise heraus. Seine Bilder verbinden alte Meister mit dem Blick der Großstadt."],
  },
  {
    history: "Nach der letzten Impressionisten-Ausstellung suchen Künstler getrennte Wege. Provence, Bretagne und ferne Reiseziele werden zu Laboren für Struktur, Symbol und persönlichen Ausdruck.",
    palette: ["Chromgelb", "Kobaltblau", "Smaragdgrün", "Zinnober", "Mauvein"],
    pigments: "Leuchtende Industriepigmente ermöglichen starke Komplementärkontraste, können aber chemisch instabil sein. Van Goghs Chromgelb ist deshalb heute teilweise nachgedunkelt.",
    supports: "Leinwand, teils grobes Jutegewebe, Karton und Holz. Grundierungen bleiben stellenweise sichtbar und werden Teil der Wirkung.",
    tools: "Flachpinsel, Rohrfeder, Spachtel; Seurat arbeitet mit kleinen systematischen Punkten, Van Gogh mit dicken gerichteten Strichen.",
    technique: "Farbe beschreibt nicht nur Licht: Sie baut Form bei Cézanne, trägt Gefühl bei van Gogh, wird Symbol bei Gauguin und optisches System bei Seurat.",
    artistLens: ["Van Gogh beginnt spät zu malen und arbeitet in wenigen Jahren mit großer Intensität. Briefe an Theo zeigen, wie bewusst er Farbe, Linie und Vorbilder studiert.", "Cézanne zieht sich immer wieder in die Provence zurück. Mit Farbflecken prüft er, wie Sehen, Raum und Dauer in einem Bild zusammenfinden.", "Gauguin verlässt Beruf und Familie und sucht außerhalb Europas eine vermeintlich ursprüngliche Kunst; heute wird auch sein kolonialer Blick kritisch gelesen.", "Seurat verbindet Farblehre mit geduldiger Atelierarbeit. Kleine Punkte und streng gebaute Figuren machen den flüchtigen Eindruck zu einem System."],
  },
  {
    history: "Um 1900 wachsen Großstädte rasant, traditionelle Gewissheiten bröckeln und neue Psychologien untersuchen das Unbewusste. Kunst macht innere Spannung wichtiger als äußere Ähnlichkeit.",
    palette: ["Ultramarin", "Cadmiumgelb", "Zinnober", "Gold", "Elfenbeinschwarz"],
    pigments: "Intensive Tubenfarben werden ungemischt eingesetzt. Klimt kombiniert Ölfarbe mit Blattgold und Metallauflagen; Munch experimentiert mit Öl, Tempera, Pastell und Druckfarbe.",
    supports: "Leinwand, Karton und Papier; Goldgrund erinnert bewusst an Mosaik und Ikone. Holzstöcke und Lithosteine verbreiten expressive Motive als Drucke.",
    tools: "Breite Pinsel, Spachtel, Kreide, Schneidemesser und Druckpresse. Kratzen, trockene Farbe und sichtbare Konturen dürfen rau bleiben.",
    technique: "Unnatürliche Farben, flächiges Ornament und verzerrte Linien übersetzen Angst, Begehren und geistige Vorstellungen unmittelbar ins Bild.",
    artistLens: ["Munch verarbeitet Krankheit, Verlust und komplizierte Beziehungen in wiederkehrenden Motiven. Er nennt die Folge seiner Bilder einen Fries des Lebens.", "Klimt bricht mit dem konservativen Wiener Kunstbetrieb und gründet die Secession mit. Ornament, Gold und Körper verschmelzen zu moderner Ikonenwirkung.", "Marc sucht im Tierbild eine geistige Gegenwelt zur modernen Zivilisation. Seine Farbsymbolik und der Blaue Reiter führen ihn zur Abstraktion.", "Schiele entwickelt nach der Wiener Akademie eine kantige Körpersprache. Leere Flächen und nervöse Linien zeigen Verletzlichkeit statt idealer Schönheit."],
  },
  {
    history: "Vor und nach dem Ersten Weltkrieg suchen Künstler nach einer neuen Sprache. Der Blaue Reiter verbindet Kunst und Musik; das Bauhaus führt später Kunst, Handwerk und Technik zusammen.",
    palette: ["Zitronengelb", "Karminrot", "Ultramarin", "Schwarz", "Bleiweiß"],
    pigments: "Industrielle Tubenfarben werden nach Wirkung statt Naturtreue gewählt. Am Bauhaus untersucht man systematisch Kontrast, Temperatur, Gewicht und räumliche Wirkung der Farbe.",
    supports: "Leinwand und Papier, aber auch Glas, Metall, Fotopapier und Druckmedien. Das Bild öffnet sich zu Gestaltung und Experiment.",
    tools: "Pinsel, Feder, Spritzpistole, Kamera, Fotogramm und geometrische Zeichenwerkzeuge. Handwerkliche Übungen stehen neben freier Komposition.",
    technique: "Linie, Fläche und Farbe funktionieren wie musikalische Stimmen. Transparenz, Überlagerung und geometrische Ordnung ersetzen die Erzählung eines sichtbaren Gegenstands.",
    artistLens: ["Kandinsky gibt eine juristische Laufbahn auf und verbindet Malerei mit Musik. In München und am Bauhaus formuliert er eine umfassende Lehre von Farbe und Form.", "Klee ist Geiger, Zeichner und genauer Naturbeobachter. Seine kleinen Bilder entwickeln aus Punkten und Linien poetische, oft humorvolle Welten.", "Marc verbindet Tiermotive mit einer festen Farbsymbolik. Sein Weg zur Abstraktion endet 1916 im Ersten Weltkrieg.", "Moholy-Nagy bringt Fotografie, Typografie, Metall und Licht ans Bauhaus. Für ihn ist künstlerische Bildung ein Labor moderner Wahrnehmung."],
  },
  {
    history: "Nach Krieg und Revolution wollen Avantgarden eine universelle, internationale Ordnung schaffen. Kunst soll nicht dekorieren, sondern Häuser, Möbel, Bücher und den modernen Alltag verändern.",
    palette: ["Primärrot", "Primärblau", "Primärgelb", "Schwarz", "Weiß"],
    pigments: "Reine, deckende Industriefarben ersetzen nuancierte Naturtöne. Entscheidend ist weniger die Kostbarkeit des Pigments als seine klare Funktion im System.",
    supports: "Leinwand, Hartfaser, Papier, Glas und Metall. Gemalte Ideen wandern in Architektur, Typografie, Bühne und Möbelbau.",
    tools: "Lineal, Winkel, Klebeband, Schablone, Zirkel und Spritztechnik ergänzen den Pinsel. Präzision und reproduzierbare Gestaltung gewinnen Gewicht.",
    technique: "Vertikale und horizontale schwarze Linien halten asymmetrische Flächen im Gleichgewicht. Primärfarben und Nichtfarben werden zu einer reduzierten visuellen Grammatik.",
    artistLens: ["Mondrian beginnt mit Landschaften und reduziert Baum, Düne und Fassade schrittweise zum Raster. In Paris und New York sucht er darin ein dynamisches Gleichgewicht.", "Malewitsch nennt seine radikale geometrische Kunst Suprematismus. Das Schwarze Quadrat erklärt die einfache Form zum eigenständigen Bildereignis.", "Moholy-Nagy verbindet am Bauhaus Materialexperimente mit Fotografie und Licht. Kunst wird für ihn Training des Sehens in einer technischen Welt.", "Schlemmer macht den menschlichen Körper zur Figur im geometrischen Raum. Im Triadischen Ballett verschmelzen Farbe, Kostüm, Bewegung und Bühne."],
  },
];
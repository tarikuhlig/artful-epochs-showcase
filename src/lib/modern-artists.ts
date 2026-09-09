/**
 * Moderne und zeitgenössische Künstler, deren Werke NICHT gemeinfrei sind.
 *
 * Wichtig: In diesem Modul liegen bewusst keine Bilddateien und keine
 * Bild-URLs. Gelernt wird über eigene Beschreibungen; die Abbildung selbst
 * bleibt beim Rechteinhaber und wird nur verlinkt.
 */

export type ModernWork = {
  id: string;
  title: string;
  year: string;
  museum: string;
  museumUrl: string;
  technique: string;
  description: string;
  /** Bildbeschreibung in Worten — ersetzt die Abbildung. */
  visualDescription: string;
  rightsHolder: string;
};

export type ModernArtist = {
  slug: string;
  name: string;
  life: string;
  origin: string;
  movement: string;
  bio: string;
  significance: string;
  palette: string;
  techniques: string;
  museums: string;
  works: ModernWork[];
};

export const modernArtists: ModernArtist[] = [
  {
    slug: "pablo-picasso",
    name: "Pablo Picasso",
    life: "1881–1973",
    origin: "Málaga, Spanien",
    movement: "Kubismus, Klassische Moderne",
    bio: "Picasso durchlief mehr Stilphasen als die meisten Künstler Werke schaffen: blaue und rosa Periode, der gemeinsam mit Georges Braque entwickelte Kubismus, klassizistische Figuren, Surrealistisches, spätes freies Malen. Er arbeitete in Malerei, Skulptur, Keramik und Grafik und blieb bis ins hohe Alter produktiv.",
    significance: "Er zerlegte den festen Blickpunkt der Renaissance. Ein Gegenstand darf gleichzeitig von vorne, von der Seite und von innen erscheinen — das änderte, was ein Bild überhaupt sein kann.",
    palette: "Erdtöne und Grau im analytischen Kubismus, kräftiges Rot, Blau und Ocker in den Figurenbildern, reduziertes Schwarz-Weiß-Grau in Guernica.",
    techniques: "Öl auf Leinwand, Collage und Papier collé, Assemblage, Linolschnitt, Keramik.",
    museums: "Museo Picasso Barcelona, Musée Picasso Paris, Museo Reina Sofía Madrid, MoMA New York.",
    works: [
      { id: "picasso-demoiselles", title: "Les Demoiselles d'Avignon", year: "1907", museum: "MoMA, New York", museumUrl: "https://www.moma.org/collection/works/79766", technique: "Öl auf Leinwand", description: "Fünf Frauenfiguren, scharfkantig gebaut, zwei Gesichter maskenhaft nach afrikanischen und iberischen Vorbildern. Der Bruch mit der europäischen Aktmalerei.", visualDescription: "Rosa und ockerfarbene Körper vor blauen, wie zerbrochenem Glas gefalteten Vorhängen; die Perspektive kippt in jeder Figur anders.", rightsHolder: "Succession Picasso / MoMA" },
      { id: "picasso-guernica", title: "Guernica", year: "1937", museum: "Museo Reina Sofía, Madrid", museumUrl: "https://www.museoreinasofia.es/en/collection/artwork/guernica", technique: "Öl auf Leinwand, 349 × 776 cm", description: "Reaktion auf die Bombardierung der baskischen Stadt Gernika. Ein Antikriegsbild ohne Flugzeuge, nur Schreie, Tiere und Licht.", visualDescription: "Wandgroß, nur Schwarz, Weiß und Grau; Stier, sterbendes Pferd, eine Glühbirne wie ein Auge, eine Frau mit totem Kind.", rightsHolder: "Succession Picasso / Museo Reina Sofía" },
      { id: "picasso-weinender-frau", title: "Weeping Woman", year: "1937", museum: "Tate Modern, London", museumUrl: "https://www.tate.org.uk/art/artworks/picasso-weeping-woman-t05010", technique: "Öl auf Leinwand", description: "Entstanden im Umfeld von Guernica: der Schmerz konzentriert in einem einzigen Gesicht.", visualDescription: "Grelles Grün, Gelb und Violett; das Gesicht wirkt wie zersplittertes Glas, ein Taschentuch wird in den Mund gepresst.", rightsHolder: "Succession Picasso / Tate" },
      { id: "picasso-drei-musikanten", title: "Three Musicians", year: "1921", museum: "MoMA, New York", museumUrl: "https://www.moma.org/collection/works/78630", technique: "Öl auf Leinwand", description: "Höhepunkt des synthetischen Kubismus: Figuren aus flachen, wie ausgeschnittenen Farbflächen.", visualDescription: "Drei maskierte Musiker nebeneinander, gebaut aus Rechtecken in Braun, Ocker, Schwarz und Weiß, fast wie Papierschnitte.", rightsHolder: "Succession Picasso / MoMA" },
      { id: "picasso-portraet-dora", title: "Portrait de Dora Maar", year: "1937", museum: "Musée national Picasso, Paris", museumUrl: "https://www.museepicassoparis.fr/en/collection", technique: "Öl auf Leinwand", description: "Bildnis der Fotografin Dora Maar, sitzend, in Picassos zugleich zärtlicher und zerlegender Sicht.", visualDescription: "Sitzende Frau in Rot und Grün, Gesicht halb im Profil und halb frontal in einem Kopf vereint, lange lackierte Fingernägel.", rightsHolder: "Succession Picasso / Musée Picasso" },
    ],
  },
  {
    slug: "henri-matisse",
    name: "Henri Matisse",
    life: "1869–1954",
    origin: "Le Cateau-Cambrésis, Frankreich",
    movement: "Fauvismus, Klassische Moderne",
    bio: "Matisse begann als Jurist und kam spät zur Malerei. Mit den Fauves setzte er Farbe frei von der Beschreibung der Natur ein. Nach einer Krebsoperation konnte er kaum noch stehen und erfand die Scherenschnitte — Malen mit der Schere.",
    significance: "Er zeigte, dass Farbe selbst der Inhalt sein kann. Ruhe, Rhythmus und Fläche zählen bei ihm mehr als Tiefenillusion.",
    palette: "Reines Zinnoberrot, Ultramarin, Smaragdgrün, Rosa; große ungebrochene Flächen.",
    techniques: "Öl auf Leinwand, Gouache découpée (bemaltes Papier, geschnitten), Zeichnung, Glasfenster.",
    museums: "Musée Matisse Nizza, Centre Pompidou Paris, MoMA New York, Tate Modern London.",
    works: [
      { id: "matisse-tanz", title: "La Danse", year: "1910", museum: "Eremitage, Sankt Petersburg", museumUrl: "https://www.hermitagemuseum.org/wps/portal/hermitage/digital-collection", technique: "Öl auf Leinwand", description: "Fünf Figuren im Reigen — Bewegung als reine Linie und Farbe.", visualDescription: "Ziegelrote Körper auf tiefgrünem Hügel vor kobaltblauem Himmel, ohne Schatten, ohne Details.", rightsHolder: "Succession H. Matisse / Eremitage" },
      { id: "matisse-rotes-atelier", title: "The Red Studio", year: "1911", museum: "MoMA, New York", museumUrl: "https://www.moma.org/collection/works/78389", technique: "Öl auf Leinwand", description: "Sein Atelier, komplett in Rot getaucht; Möbel bleiben nur als helle Umrisslinien stehen.", visualDescription: "Eine einzige rote Fläche für Wand und Boden, darin schwebend eigene kleine Bilder und Skulpturen.", rightsHolder: "Succession H. Matisse / MoMA" },
      { id: "matisse-gruener-streifen", title: "Portrait de Madame Matisse (La raie verte)", year: "1905", museum: "SMK — Statens Museum for Kunst, Kopenhagen", museumUrl: "https://open.smk.dk/en/artwork/image/KMS3573", technique: "Öl auf Leinwand", description: "Das Skandalbild des Fauvismus: ein grüner Streifen teilt das Gesicht der Ehefrau.", visualDescription: "Gesicht in Rosa und Ocker, mittig ein grüner Schattenstreifen, Hintergrund in Orange, Violett und Grün geteilt.", rightsHolder: "Succession H. Matisse / SMK" },
      { id: "matisse-blauer-akt-ii", title: "Nu bleu II", year: "1952", museum: "Centre Pompidou, Paris", museumUrl: "https://www.centrepompidou.fr/en/collection", technique: "Gouache découpée, geschnittenes Papier", description: "Spätwerk aus der Schere: Körper aus blau bemaltem Papier, direkt auf Weiß gesetzt.", visualDescription: "Sitzende Figur aus wenigen ultramarinblauen Papierteilen, Arme über dem Kopf, weiße Zwischenräume als Gelenke.", rightsHolder: "Succession H. Matisse / Centre Pompidou" },
      { id: "matisse-ikarus", title: "Icare (aus „Jazz“)", year: "1947", museum: "Tate, London", museumUrl: "https://www.tate.org.uk/art/artists/henri-matisse-1593", technique: "Pochoir nach Scherenschnitt", description: "Blatt aus dem Buch „Jazz“, entstanden aus Papierschnitten.", visualDescription: "Schwarze Figur mit rotem Punkt als Herz, fallend vor tiefblauem Grund mit gelben Sternformen.", rightsHolder: "Succession H. Matisse / Tate" },
    ],
  },
  {
    slug: "salvador-dali",
    name: "Salvador Dalí",
    life: "1904–1989",
    origin: "Figueres, Katalonien",
    movement: "Surrealismus",
    bio: "Dalí verband akademisch präzise Ölmalerei mit Traumlogik. Seine „paranoisch-kritische Methode“ suchte gezielt Doppelbilder und Wahnvorstellungen. Er inszenierte sich selbst als Marke — Schnurrbart, Auftritte, Filme mit Buñuel und Disney.",
    significance: "Er machte das Unbewusste sichtbar mit den Mitteln alter Meister: je realistischer gemalt, desto verstörender das Unmögliche.",
    palette: "Leuchtendes Katalonien-Blau, Sandocker, Fleischrosa, tiefe Schatten.",
    techniques: "Feine Öllasuren auf glattem Grund, dünne Pinsel, altmeisterlicher Aufbau; später Optik- und Hologrammexperimente.",
    museums: "Teatre-Museu Dalí Figueres, Salvador Dalí Museum St. Petersburg (Florida), MoMA New York.",
    works: [
      { id: "dali-bestaendigkeit", title: "Die Beständigkeit der Erinnerung", year: "1931", museum: "MoMA, New York", museumUrl: "https://www.moma.org/collection/works/79018", technique: "Öl auf Leinwand, 24 × 33 cm", description: "Das berühmteste Bild des Surrealismus — und erstaunlich klein.", visualDescription: "Weiche, schmelzende Taschenuhren über Ast, Tischkante und einem schlafenden Kopfprofil am Strand von Portlligat.", rightsHolder: "Fundació Gala-Salvador Dalí / MoMA" },
      { id: "dali-buergerkrieg", title: "Weiche Konstruktion mit gekochten Bohnen (Vorahnung des Bürgerkriegs)", year: "1936", museum: "Philadelphia Museum of Art", museumUrl: "https://philamuseum.org/collection/object/51315", technique: "Öl auf Leinwand", description: "Vorahnung des Spanischen Bürgerkriegs: ein Körper, der sich selbst zerreißt.", visualDescription: "Riesige Gliedmaßen, die sich gegenseitig würgen, über weiter Ebene; kleine Bohnen im Vordergrund.", rightsHolder: "Fundació Gala-Salvador Dalí / Philadelphia Museum of Art" },
      { id: "dali-narziss", title: "Metamorphose des Narziss", year: "1937", museum: "Tate Modern, London", museumUrl: "https://www.tate.org.uk/art/artworks/dali-metamorphosis-of-narcissus-t02343", technique: "Öl auf Leinwand", description: "Doppelbild: die kauernde Figur links ist zugleich eine Hand mit Ei rechts.", visualDescription: "Zwei fast gleiche Formen nebeneinander — einmal Körper, einmal steinerne Hand, aus der eine Narzisse wächst.", rightsHolder: "Fundació Gala-Salvador Dalí / Tate" },
      { id: "dali-kreuzigung", title: "Christus des heiligen Johannes vom Kreuz", year: "1951", museum: "Kelvingrove Art Gallery, Glasgow", museumUrl: "https://www.glasgowlife.org.uk/museums/venues/kelvingrove-art-gallery-and-museum", technique: "Öl auf Leinwand", description: "Kreuzigung von oben gesehen, ohne Nägel, ohne Blut.", visualDescription: "Steil verkürzter Christus über einer dunklen Bucht mit Booten; Licht von oben, tiefes Schwarzblau.", rightsHolder: "Fundació Gala-Salvador Dalí / Glasgow Life Museums" },
      { id: "dali-letztes-abendmahl", title: "Das Sakrament des letzten Abendmahls", year: "1955", museum: "National Gallery of Art, Washington", museumUrl: "https://www.nga.gov/artworks/46590-sacrament-last-supper", technique: "Öl auf Leinwand", description: "Religiöses Spätwerk in strenger, geometrischer Ordnung.", visualDescription: "Zwölf gebeugte Jünger in einem gläsernen Zwölfeck, dahinter die Bucht von Cadaqués in Morgenblau.", rightsHolder: "Fundació Gala-Salvador Dalí / National Gallery of Art" },
    ],
  },
  {
    slug: "rene-magritte",
    name: "René Magritte",
    life: "1898–1967",
    origin: "Lessines, Belgien",
    movement: "Surrealismus",
    bio: "Magritte arbeitete zunächst als Werbegrafiker, was seine klare, plakative Malweise prägt. Er malte gewöhnliche Dinge — Pfeifen, Hüte, Äpfel, Wolken — und brachte sie in Beziehungen, die das Denken kurzschließen.",
    significance: "Er stellte die Frage, wie Bild, Wort und Wirklichkeit zusammenhängen. Ohne ihn wäre die Konzeptkunst kaum denkbar.",
    palette: "Nüchternes Himmelblau, Grau, Grün, Fleischton; alles gleichmäßig ausgeleuchtet.",
    techniques: "Glatte Ölmalerei ohne sichtbaren Pinselduktus, illustrative Präzision, Wort-Bild-Kombinationen.",
    museums: "Musée Magritte Brüssel, MoMA New York, LACMA Los Angeles, SFMOMA.",
    works: [
      { id: "magritte-bilderverrat", title: "La trahison des images", year: "1929", museum: "LACMA, Los Angeles", museumUrl: "https://collections.lacma.org/node/239578", technique: "Öl auf Leinwand", description: "„Ceci n'est pas une pipe“ — das Bild einer Pfeife ist keine Pfeife.", visualDescription: "Eine braune Pfeife auf hellem Grund, darunter in Schulschrift der widersprechende Satz.", rightsHolder: "Succession Magritte / LACMA" },
      { id: "magritte-menschensohn", title: "Le fils de l'homme", year: "1964", museum: "Privatsammlung", museumUrl: "https://www.musee-magritte-museum.be/en", technique: "Öl auf Leinwand", description: "Selbstporträt als Mann, dessen Gesicht verdeckt bleibt.", visualDescription: "Mann in Mantel und Melone vor Mauer und Wolkenhimmel, vor dem Gesicht schwebt ein grüner Apfel.", rightsHolder: "Succession Magritte" },
      { id: "magritte-reich-der-lichter", title: "L'empire des lumières", year: "1954", museum: "Musées royaux des Beaux-Arts, Brüssel", museumUrl: "https://www.musee-magritte-museum.be/en", technique: "Öl auf Leinwand", description: "Tag und Nacht im selben Bild, ohne dass es zunächst auffällt.", visualDescription: "Heller Mittagshimmel mit weißen Wolken über einer nächtlichen Straße mit einer einzelnen Laterne.", rightsHolder: "Succession Magritte / MRBAB" },
      { id: "magritte-golconde", title: "Golconde", year: "1953", museum: "The Menil Collection, Houston", museumUrl: "https://www.menil.org/collection", technique: "Öl auf Leinwand", description: "Regen aus identischen Männern über einer Vorstadt.", visualDescription: "Dutzende Männer mit Melone schweben gleichmäßig verteilt vor Häuserfassaden und blassblauem Himmel.", rightsHolder: "Succession Magritte / The Menil Collection" },
      { id: "magritte-liebenden", title: "Les amants", year: "1928", museum: "MoMA, New York", museumUrl: "https://www.moma.org/collection/works/79933", technique: "Öl auf Leinwand", description: "Ein Kuss durch Stoff — Nähe und Trennung zugleich.", visualDescription: "Zwei Köpfe in weiße Tücher gehüllt, aneinandergelehnt vor grauer Wand und rotem Vorhang.", rightsHolder: "Succession Magritte / MoMA" },
    ],
  },
  {
    slug: "frida-kahlo",
    name: "Frida Kahlo",
    life: "1907–1954",
    origin: "Coyoacán, Mexiko",
    movement: "Mexikanische Moderne, Surrealismus-nah",
    bio: "Nach einem schweren Busunfall begann Kahlo im Bett zu malen, mit einem Spiegel über sich. Ihr Werk kreist um Körper, Schmerz, Herkunft und Identität, gespeist aus mexikanischer Volkskunst, Votivbildern und aztekischer Bildwelt.",
    significance: "Sie machte den eigenen Körper zum politischen und kulturellen Thema — lange bevor das üblich war.",
    palette: "Kräftiges Grün, Karminrot, Kobaltblau, Gelbocker — Farben mexikanischer Volkskunst.",
    techniques: "Öl auf Metall und Masonit im Format kleiner Votivbilder, feine Pinsel, klare Konturen.",
    museums: "Museo Dolores Olmedo und Museo Frida Kahlo (Casa Azul) Mexiko-Stadt, MoMA New York.",
    works: [
      { id: "kahlo-zwei-fridas", title: "Las dos Fridas", year: "1939", museum: "Museo de Arte Moderno, Mexiko-Stadt", museumUrl: "https://mam.inba.gob.mx/", technique: "Öl auf Leinwand", description: "Doppelselbstbildnis nach der Trennung von Diego Rivera.", visualDescription: "Zwei sitzende Fridas Hand in Hand, eine im weißen Spitzenkleid, eine in Tehuana-Tracht; beide Herzen liegen offen, eine Ader verbindet sie.", rightsHolder: "Banco de México Diego Rivera Frida Kahlo Museums Trust" },
      { id: "kahlo-dornenkette", title: "Selbstbildnis mit Dornenhalsband und Kolibri", year: "1940", museum: "Harry Ransom Center, Austin", museumUrl: "https://hrc.contentdm.oclc.org/digital/collection/p15878coll4", technique: "Öl auf Leinwand", description: "Selbstbildnis mit Symbolen für Schmerz, Tod und Hoffnung.", visualDescription: "Frontales Gesicht vor großen grünen Blättern, Dornenkette am Hals mit totem schwarzem Kolibri, Affe und schwarze Katze hinter den Schultern.", rightsHolder: "Banco de México Diego Rivera Frida Kahlo Museums Trust" },
      { id: "kahlo-gebrochene-saeule", title: "La columna rota", year: "1944", museum: "Museo Dolores Olmedo, Mexiko-Stadt", museumUrl: "https://museodoloresolmedo.org.mx/", technique: "Öl auf Masonit", description: "Bild ihres Rückenkorsetts und der ständigen Schmerzen.", visualDescription: "Aufgebrochener Oberkörper mit einer zerbrochenen ionischen Säule statt Wirbelsäule, Nägel in der Haut, karge Rissenlandschaft dahinter.", rightsHolder: "Banco de México Diego Rivera Frida Kahlo Museums Trust" },
      { id: "kahlo-henry-ford", title: "Hospital Henry Ford", year: "1932", museum: "Museo Dolores Olmedo, Mexiko-Stadt", museumUrl: "https://museodoloresolmedo.org.mx/", technique: "Öl auf Metall", description: "Nach einer Fehlgeburt in Detroit gemalt, im Format eines Votivbildes.", visualDescription: "Nackte Figur auf einem Bett im leeren Feld, sechs rote Nabelschnüre führen zu Fötus, Becken, Orchidee und Maschine; Fabrikskyline am Horizont.", rightsHolder: "Banco de México Diego Rivera Frida Kahlo Museums Trust" },
      { id: "kahlo-kurzhaar", title: "Autorretrato con pelo cortado", year: "1940", museum: "MoMA, New York", museumUrl: "https://www.moma.org/collection/works/78333", technique: "Öl auf Leinwand", description: "Selbstbildnis im Männeranzug nach der Scheidung.", visualDescription: "Sitzende Figur im übergroßen dunklen Anzug, Schere in der Hand, abgeschnittene Haare ringsum auf dem Boden verstreut.", rightsHolder: "Banco de México Diego Rivera Frida Kahlo Museums Trust / MoMA" },
    ],
  },
  {
    slug: "edward-hopper",
    name: "Edward Hopper",
    life: "1882–1967",
    origin: "Nyack, New York",
    movement: "Amerikanischer Realismus",
    bio: "Hopper arbeitete lange als Illustrator, bevor seine Bilder Anerkennung fanden. Er malte Tankstellen, Diner, Hotelzimmer, Kinos — Orte des Durchgangs, meist mit einer oder zwei stillen Figuren.",
    significance: "Er fand die Bildsprache für moderne Einsamkeit; Film, Fotografie und Werbung zehren bis heute von seinen Lichtsituationen.",
    palette: "Kühles Nachtgrün, Kadmiumgelb der Kunstlichtflächen, Ziegelrot, Schattenviolett.",
    techniques: "Öl auf Leinwand, streng gebaute Kompositionen nach vielen Vorzeichnungen, harte Licht-Schatten-Kanten.",
    museums: "Whitney Museum New York, Art Institute of Chicago, MoMA New York.",
    works: [
      { id: "hopper-nighthawks", title: "Nighthawks", year: "1942", museum: "Art Institute of Chicago", museumUrl: "https://www.artic.edu/artworks/111628/nighthawks", technique: "Öl auf Leinwand", description: "Vier Menschen in einem nächtlichen Diner, ohne sichtbare Tür.", visualDescription: "Große Glasfront, gelbes Kunstlicht auf die leere dunkle Straße fallend, drei Gäste und ein Kellner in Weiß.", rightsHolder: "Art Institute of Chicago" },
      { id: "hopper-morgensonne", title: "Morning Sun", year: "1952", museum: "Columbus Museum of Art", museumUrl: "https://www.columbusmuseum.org/collections/", technique: "Öl auf Leinwand", description: "Eine Frau auf dem Bett, ins Morgenlicht blickend.", visualDescription: "Rosafarbenes Kleid, kahle Wand, ein Rechteck Sonnenlicht auf dem Bett, dahinter Backsteinfassaden.", rightsHolder: "Columbus Museum of Art" },
      { id: "hopper-automat", title: "Automat", year: "1927", museum: "Des Moines Art Center", museumUrl: "https://www.desmoinesartcenter.org/art/collection", technique: "Öl auf Leinwand", description: "Frau allein mit einer Tasse Kaffee in einem Automatenrestaurant.", visualDescription: "Runder Tisch, dunkles Fenster, in dem sich zwei Lampenreihen ins Schwarze verlieren; grüner Mantel, gelber Hut.", rightsHolder: "Des Moines Art Center" },
      { id: "hopper-gas", title: "Gas", year: "1940", museum: "MoMA, New York", museumUrl: "https://www.moma.org/collection/works/78330", technique: "Öl auf Leinwand", description: "Eine Tankstelle am Waldrand in der Abenddämmerung.", visualDescription: "Drei rote Zapfsäulen, ein Mann in Hemd und Weste, dahinter beginnt dunkler Wald; letztes Tageslicht am Himmel.", rightsHolder: "MoMA" },
      { id: "hopper-fruehsonntag", title: "Early Sunday Morning", year: "1930", museum: "Whitney Museum of American Art, New York", museumUrl: "https://whitney.org/collection/works/1052", technique: "Öl auf Leinwand", description: "Eine leere Ladenzeile im ersten Sonnenlicht.", visualDescription: "Langgestreckte Backsteinfassade mit Ladenfronten und Markisen, lange Schatten von links, kein Mensch zu sehen.", rightsHolder: "Whitney Museum of American Art" },
    ],
  },
  {
    slug: "mark-rothko",
    name: "Mark Rothko",
    life: "1903–1970",
    origin: "Dwinsk, Russisches Reich (heute Daugavpils, Lettland)",
    movement: "Abstrakter Expressionismus, Colour Field",
    bio: "Rothko kam als Kind in die USA. Nach figurativen und surrealistischen Anfängen fand er um 1949 seine Form: wenige weiche Farbrechtecke, übereinandergesetzt auf großformatiger Leinwand. Er wollte keine Dekoration, sondern eine Begegnung.",
    significance: "Er verlagerte das Bild vom Motiv zur Erfahrung. Wer nah vor einem Rothko steht, sieht keine Form mehr, sondern Farbe als Raum.",
    palette: "Tiefes Weinrot, Orange, Schwarz, Kastanienbraun, in Spätwerken fast nur Dunkeltöne.",
    techniques: "Stark verdünnte Öl- und Eitempera-Schichten, mit weichen Bürsten in vielen Lasuren aufgetragen; unscharfe, atmende Ränder.",
    museums: "Rothko Chapel Houston, Tate Modern London, National Gallery of Art Washington, MoMA New York.",
    works: [
      { id: "rothko-no61", title: "No. 61 (Rust and Blue)", year: "1953", museum: "MOCA, Los Angeles", museumUrl: "https://www.moca.org/collection", technique: "Öl auf Leinwand", description: "Klassisches Dreiband-Bild seiner reifen Phase.", visualDescription: "Rostbraunes Band über tiefem Blau auf blassem Grund; alle Kanten weich ausgefranst.", rightsHolder: "Kate Rothko Prizel & Christopher Rothko / MOCA" },
      { id: "rothko-orange-red-yellow", title: "Orange, Red, Yellow", year: "1961", museum: "Privatsammlung", museumUrl: "https://www.nga.gov/artists/1892-mark-rothko", technique: "Öl auf Leinwand", description: "Eines der hellsten und teuersten Werke Rothkos.", visualDescription: "Drei glühende Farbfelder in Orange, Rot und Gelb, die ineinander zu strahlen scheinen.", rightsHolder: "Kate Rothko Prizel & Christopher Rothko" },
      { id: "rothko-black-on-maroon", title: "Black on Maroon (Seagram Murals)", year: "1958", museum: "Tate Modern, London", museumUrl: "https://www.tate.org.uk/art/artworks/rothko-black-on-maroon-t01031", technique: "Öl, Acryl und Pigment auf Leinwand", description: "Teil der Seagram-Serie, die Rothko dem Restaurant entzog und der Tate schenkte.", visualDescription: "Dunkelrote Fläche mit schwarzem, torartigem Rechteck; wirkt wie ein verschlossener Durchgang.", rightsHolder: "Kate Rothko Prizel & Christopher Rothko / Tate" },
      { id: "rothko-white-center", title: "White Center (Yellow, Pink and Lavender on Rose)", year: "1950", museum: "Privatsammlung", museumUrl: "https://www.nga.gov/artists/1892-mark-rothko", technique: "Öl auf Leinwand", description: "Frühes Beispiel der klassischen Form, noch leicht und hell.", visualDescription: "Rosafarbener Grund, darauf ein gelbes, ein weißes und ein lavendelfarbenes Band.", rightsHolder: "Kate Rothko Prizel & Christopher Rothko" },
      { id: "rothko-chapel", title: "Rothko Chapel Paintings", year: "1964–67", museum: "Rothko Chapel, Houston", museumUrl: "https://rothkochapel.org/", technique: "Öl und Ei-Öl-Emulsion auf Leinwand", description: "Vierzehn Bilder für einen achteckigen Andachtsraum, sein Vermächtnis.", visualDescription: "Fast schwarze, violett schimmernde Tafeln rings um den Raum; erst nach Minuten treten Farbunterschiede hervor.", rightsHolder: "Kate Rothko Prizel & Christopher Rothko / Rothko Chapel" },
    ],
  },
  {
    slug: "jackson-pollock",
    name: "Jackson Pollock",
    life: "1912–1956",
    origin: "Cody, Wyoming",
    movement: "Abstrakter Expressionismus, Action Painting",
    bio: "Pollock legte ab 1947 die Leinwand auf den Atelierboden und ließ flüssige Farbe von Stöcken und aus Dosen darauf laufen. Der Malprozess selbst — Gehen, Schwingen, Tropfen — wurde zum Thema.",
    significance: "Er löste das Bild vom Pinsel und vom Bildzentrum. Die Malfläche wird zum Feld ohne Anfang und Ende.",
    palette: "Aluminiumsilber, Schwarz, Weiß, Ocker, gelegentlich kräftige Farbspritzer.",
    techniques: "Drip Painting mit Industrie-Emaillelack, Stöcken, Kellen und Spritzen auf ungrundierte Leinwand am Boden.",
    museums: "MoMA New York, Guggenheim New York, National Gallery of Art Washington, Tate Modern.",
    works: [
      { id: "pollock-no5", title: "No. 5, 1948", year: "1948", museum: "Privatsammlung", museumUrl: "https://www.moma.org/artists/4675", technique: "Öl und Emaillelack auf Faserplatte", description: "Dichtes Geflecht aus geschütteter Farbe, eines der bekanntesten Drip Paintings.", visualDescription: "Braun-gelbe Fadenmasse aus überlagerten Farbspuren, kein Vorder- oder Hintergrund erkennbar.", rightsHolder: "Pollock-Krasner Foundation" },
      { id: "pollock-autumn-rhythm", title: "Autumn Rhythm (Number 30)", year: "1950", museum: "The Met, New York", museumUrl: "https://www.metmuseum.org/art/collection/search/488978", technique: "Emaillelack auf Leinwand", description: "Ein Höhepunkt der Drip-Phase, fast fünf Meter breit.", visualDescription: "Schwarze, weiße und braune Bahnen tanzen über hellen Leinwandgrund; Rhythmus wie Regen im Wind.", rightsHolder: "Pollock-Krasner Foundation / The Met" },
      { id: "pollock-one", title: "One: Number 31, 1950", year: "1950", museum: "MoMA, New York", museumUrl: "https://www.moma.org/collection/works/78386", technique: "Öl und Emaillelack auf Leinwand", description: "Monumentales Feldbild, gemalt beim Umschreiten der Leinwand.", visualDescription: "Weiße, schwarze und graublaue Schlingen über beigem Grund, gleichmäßig bis an alle Ränder.", rightsHolder: "Pollock-Krasner Foundation / MoMA" },
      { id: "pollock-blue-poles", title: "Blue Poles", year: "1952", museum: "National Gallery of Australia, Canberra", museumUrl: "https://nga.gov.au/collection/", technique: "Emaillelack, Öl, Glas auf Leinwand", description: "Späte Drip-Arbeit mit acht senkrechten „Pfählen“ als Ordnung im Chaos.", visualDescription: "Wildes Farbgeflecht in Orange, Silber und Schwarz, durchzogen von acht schräg gestellten blauen Balken.", rightsHolder: "Pollock-Krasner Foundation / National Gallery of Australia" },
      { id: "pollock-lavender-mist", title: "Number 1, 1950 (Lavender Mist)", year: "1950", museum: "National Gallery of Art, Washington", museumUrl: "https://www.nga.gov/artworks/41541", technique: "Öl, Emaille und Aluminiumfarbe auf Leinwand", description: "Trotz des Namens ohne Violett — die Mischung erzeugt den Eindruck.", visualDescription: "Nebliges Grau-Rosa-Weiß-Geflecht, am rechten Rand Handabdrücke des Malers.", rightsHolder: "Pollock-Krasner Foundation / National Gallery of Art" },
    ],
  },
  {
    slug: "andy-warhol",
    name: "Andy Warhol",
    life: "1928–1987",
    origin: "Pittsburgh, Pennsylvania",
    movement: "Pop Art",
    bio: "Warhol kam aus der Werbegrafik und übertrug deren Mittel in die Kunst: Wiederholung, Massenmotiv, Siebdruck. Seine „Factory“ war Atelier, Filmstudio und Treffpunkt zugleich.",
    significance: "Er hob die Grenze zwischen Kunst, Ware und Berühmtheit auf und stellte die Frage nach Original und Kopie neu.",
    palette: "Signalfarben aus dem Druck: Magenta, Türkis, Zitronengelb, Schwarz.",
    techniques: "Siebdruck auf Acryl-Grundierung, Fotovorlagen, serielle Wiederholung, Polaroid als Ausgangsbild.",
    museums: "The Andy Warhol Museum Pittsburgh, MoMA New York, Tate Modern London.",
    works: [
      { id: "warhol-campbell", title: "Campbell's Soup Cans", year: "1962", museum: "MoMA, New York", museumUrl: "https://www.moma.org/collection/works/79809", technique: "Acryl auf 32 Leinwänden", description: "32 Dosen — für jede damals erhältliche Sorte eine.", visualDescription: "Gitter aus 32 gleich großen Bildern, jede Dose rot-weiß, nur der Sortenname wechselt.", rightsHolder: "The Andy Warhol Foundation for the Visual Arts / MoMA" },
      { id: "warhol-marilyn", title: "Marilyn Diptych", year: "1962", museum: "Tate Modern, London", museumUrl: "https://www.tate.org.uk/art/artworks/warhol-marilyn-diptych-t03093", technique: "Siebdruck und Acryl auf Leinwand", description: "Kurz nach Monroes Tod entstanden: Ruhm links, Verblassen rechts.", visualDescription: "50 gleiche Porträts; links grell in Gelb, Rosa und Türkis, rechts schwarz-weiß und teils verwischt.", rightsHolder: "The Andy Warhol Foundation for the Visual Arts / Tate" },
      { id: "warhol-brillo", title: "Brillo Box (Soap Pads)", year: "1964", museum: "MoMA, New York", museumUrl: "https://www.moma.org/collection/works/81384", technique: "Siebdruck auf Sperrholz", description: "Skulptur, die von einer Supermarktkiste kaum zu unterscheiden ist.", visualDescription: "Weiße Holzkiste mit rot-blauem Brillo-Schriftzug, gestapelt wie im Lager.", rightsHolder: "The Andy Warhol Foundation for the Visual Arts / MoMA" },
      { id: "warhol-mao", title: "Mao", year: "1972", museum: "Art Institute of Chicago", museumUrl: "https://www.artic.edu/artworks/76244", technique: "Acryl und Siebdruck auf Leinwand", description: "Das Porträt des Parteivorsitzenden als Popstar behandelt.", visualDescription: "Offizielles Mao-Foto, übermalt mit rosa Wangen, blauem Lidschatten und groben Farbstreifen.", rightsHolder: "The Andy Warhol Foundation for the Visual Arts / Art Institute of Chicago" },
      { id: "warhol-car-crash", title: "Green Car Crash (Green Burning Car I)", year: "1963", museum: "Privatsammlung", museumUrl: "https://www.warhol.org/collections/", technique: "Siebdruck und Acryl auf Leinwand", description: "Aus der Serie „Death and Disaster“ — Wiederholung stumpft ab.", visualDescription: "Ein Pressefoto eines brennenden Autowracks, grün eingefärbt und vielfach untereinander wiederholt.", rightsHolder: "The Andy Warhol Foundation for the Visual Arts" },
    ],
  },
  {
    slug: "francis-bacon",
    name: "Francis Bacon",
    life: "1909–1992",
    origin: "Dublin, Irland",
    movement: "Figurative Nachkriegsmalerei",
    bio: "Bacon war Autodidakt, arbeitete zunächst als Möbeldesigner und malte in einem berüchtigt chaotischen Londoner Atelier. Seine Figuren wirken wie in Käfigen, verzerrt, aber niemals abstrakt.",
    significance: "Er hielt an der Figur fest, als die Abstraktion dominierte, und fand ein Bild für Gewalt und Verletzlichkeit des Körpers.",
    palette: "Orange, Blutrot, kaltes Violett, tiefes Schwarz vor flachen Farbfeldern.",
    techniques: "Öl auf ungrundierter Leinwandrückseite, trockene Bürste, Schwämme, geschleuderte Farbe; Triptychon als bevorzugte Form.",
    museums: "Tate Britain London, Centre Pompidou Paris, Hugh Lane Gallery Dublin (Atelierrekonstruktion).",
    works: [
      { id: "bacon-three-studies", title: "Three Studies for Figures at the Base of a Crucifixion", year: "1944", museum: "Tate Britain, London", museumUrl: "https://www.tate.org.uk/art/artworks/bacon-three-studies-for-figures-at-the-base-of-a-crucifixion-n06171", technique: "Öl und Pastell auf Faserplatte", description: "Sein Durchbruch, kurz vor Kriegsende gezeigt.", visualDescription: "Drei Tafeln in grellem Orange, darauf schnabelartige, hautlose Kreaturen mit aufgerissenen Mündern.", rightsHolder: "The Estate of Francis Bacon / Tate" },
      { id: "bacon-velazquez", title: "Study after Velázquez's Portrait of Pope Innocent X", year: "1953", museum: "Des Moines Art Center", museumUrl: "https://www.desmoinesartcenter.org/art/collection", technique: "Öl auf Leinwand", description: "Umdeutung eines Barockporträts in einen Schrei.", visualDescription: "Papst auf goldenem Thron, in senkrechte Farbschlieren aufgelöst, der Mund weit offen im Dunkel.", rightsHolder: "The Estate of Francis Bacon / Des Moines Art Center" },
      { id: "bacon-triptych-1976", title: "Triptych, 1976", year: "1976", museum: "Privatsammlung", museumUrl: "https://www.francis-bacon.com/artworks", technique: "Öl und Pastell auf Leinwand, drei Tafeln", description: "Mythologische Anspielungen in seiner strengsten Dreiteilung.", visualDescription: "Drei Figuren in leeren Farbräumen, umkreist von schwarzen Vögeln, verbunden durch dünne Raumlinien.", rightsHolder: "The Estate of Francis Bacon" },
      { id: "bacon-george-dyer", title: "Triptych — In Memory of George Dyer", year: "1971", museum: "Fondation Beyeler, Riehen/Basel", museumUrl: "https://www.fondationbeyeler.ch/en/collection", technique: "Öl auf Leinwand, drei Tafeln", description: "Trauerbild für seinen Partner, der kurz vor Bacons Pariser Ausstellung starb.", visualDescription: "Rosa und violette Räume, eine Treppe, ein Schlüssel im Schloss, der Körper zerfließt im Schatten.", rightsHolder: "The Estate of Francis Bacon / Fondation Beyeler" },
      { id: "bacon-lucian-freud", title: "Three Studies of Lucian Freud", year: "1969", museum: "Privatsammlung", museumUrl: "https://www.francis-bacon.com/artworks", technique: "Öl auf Leinwand, drei Tafeln", description: "Porträt des Malerfreundes, 2013 zum damaligen Auktionsrekord versteigert.", visualDescription: "Drei Ansichten eines sitzenden Mannes auf einem Holzstuhl in orangefarbenem Raum, jeweils anders verdreht.", rightsHolder: "The Estate of Francis Bacon" },
    ],
  },
  {
    slug: "jean-michel-basquiat",
    name: "Jean-Michel Basquiat",
    life: "1960–1988",
    origin: "Brooklyn, New York",
    movement: "Neo-Expressionismus, Street Art",
    bio: "Basquiat begann als SAMO© mit Sprüchen an Hauswänden in Downtown Manhattan und wurde binnen weniger Jahre zum Star der Kunstszene. Er starb mit 27 Jahren.",
    significance: "Er brachte Schwarze Geschichte, Jazz, Anatomie und Straßensprache in die Museen und verband Malerei mit Schrift und Zeichen.",
    palette: "Grelles Gelb, Rot, Türkis auf Schwarz oder rohem Grund; Ölkreide über Acryl.",
    techniques: "Acryl, Ölkreide und Spraydose auf Leinwand, Holz oder gefundenen Türen; Schrift, Listen, Durchstreichungen.",
    museums: "The Broad Los Angeles, Whitney Museum New York, MoMA New York.",
    works: [
      { id: "basquiat-untitled-1982", title: "Untitled (Skull-Kopf)", year: "1982", museum: "Privatsammlung / The Broad Los Angeles (Leihgaben)", museumUrl: "https://www.thebroad.org/art/jean-michel-basquiat", technique: "Acryl und Ölkreide auf Leinwand", description: "Kopf zwischen Totenschädel und Maske, sein bekanntestes Motiv.", visualDescription: "Großer Kopf mit gezeichnetem Gebiss und offenen Schädelnähten, in Rot, Gelb und Schwarz auf blauem Grund.", rightsHolder: "Estate of Jean-Michel Basquiat" },
      { id: "basquiat-hollywood-africans", title: "Hollywood Africans", year: "1983", museum: "Whitney Museum of American Art, New York", museumUrl: "https://whitney.org/collection/works/12385", technique: "Acryl und Ölkreide auf Leinwand", description: "Kommentar zu Rollenklischees für Schwarze Schauspieler.", visualDescription: "Gelber Grund, drei Köpfe, ringsum Wörter und durchgestrichene Begriffe wie Sternnotizen.", rightsHolder: "Estate of Jean-Michel Basquiat / Whitney Museum" },
      { id: "basquiat-irony", title: "Irony of a Negro Policeman", year: "1981", museum: "Privatsammlung", museumUrl: "https://www.basquiat.com/", technique: "Acryl und Ölkreide auf Holz", description: "Bild über Macht, die den eigenen Leuten gegenübersteht.", visualDescription: "Steife schwarze Figur mit käfigartiger Mütze auf grau gescheuertem Grund, Schrift im Bildfeld.", rightsHolder: "Estate of Jean-Michel Basquiat" },
      { id: "basquiat-charles-first", title: "Charles the First", year: "1982", museum: "Privatsammlung", museumUrl: "https://www.basquiat.com/", technique: "Acryl und Ölkreide auf Leinwand, drei Tafeln", description: "Hommage an Charlie Parker; die Krone steht für Heldentum und Preis des Ruhms.", visualDescription: "Drei Tafeln voller Wörter, Kronen, Superman-Zeichen; unten der Satz über gefallene Helden.", rightsHolder: "Estate of Jean-Michel Basquiat" },
      { id: "basquiat-riding-death", title: "Riding with Death", year: "1988", museum: "Privatsammlung", museumUrl: "https://www.basquiat.com/", technique: "Acryl und Ölkreide auf Leinwand", description: "Eines der letzten Bilder, ruhig und fast leer.", visualDescription: "Braune Figur reitet auf einem Skelett-Pferd über nahezu leeren beigen Grund.", rightsHolder: "Estate of Jean-Michel Basquiat" },
    ],
  },
  {
    slug: "bridget-riley",
    name: "Bridget Riley",
    life: "geb. 1931",
    origin: "London, England",
    movement: "Op Art",
    bio: "Riley begann mit Schwarz-Weiß-Bildern, deren Muster im Auge zu flimmern beginnen. Seit den späten 1960er-Jahren arbeitet sie mit Farbstreifen und Kurven; ihre Bilder entstehen nach präzisen Studien, oft mit Assistenz ausgeführt.",
    significance: "Sie machte die Wahrnehmung selbst zum Bildinhalt — das Bild passiert im Auge des Betrachters, nicht auf der Leinwand.",
    palette: "Zunächst reines Schwarz-Weiß, später abgestufte Türkis-, Ocker-, Rosa- und Grüntöne.",
    techniques: "Emulsion und Acryl auf Leinwand oder Platte, exakt vorgezeichnete Kurven, Streifen und Punktraster; Wandmalerei.",
    museums: "Tate London, National Gallery London (Wandarbeiten), MoMA New York.",
    works: [
      { id: "riley-movement-in-squares", title: "Movement in Squares", year: "1961", museum: "Arts Council Collection, London", museumUrl: "https://www.southbankcentre.co.uk/venues/arts-council-collection/", technique: "Tempera auf Hartfaser", description: "Ein Schachbrett, das zur Mitte hin einzustürzen scheint.", visualDescription: "Schwarz-weiße Quadrate, die nach rechts immer schmaler werden, bis die Fläche wie ein Knick wirkt.", rightsHolder: "Bridget Riley / Arts Council Collection" },
      { id: "riley-fall", title: "Fall", year: "1963", museum: "Tate, London", museumUrl: "https://www.tate.org.uk/art/artworks/riley-fall-t00616", technique: "Emulsion auf Hartfaser", description: "Wellenlinien, die beim Betrachten körperlich zu vibrieren beginnen.", visualDescription: "Dicht gestaffelte schwarze Kurvenlinien auf Weiß, nach unten enger werdend.", rightsHolder: "Bridget Riley / Tate" },
      { id: "riley-current", title: "Current", year: "1964", museum: "MoMA, New York", museumUrl: "https://www.moma.org/collection/works/79804", technique: "Synthetische Polymerfarbe auf Hartfaser", description: "Titelbild der Ausstellung „The Responsive Eye“, die Op Art bekannt machte.", visualDescription: "Parallele Wellenlinien in Schwarz auf Weiß; die Fläche scheint zu strömen.", rightsHolder: "Bridget Riley / MoMA" },
      { id: "riley-nataraja", title: "Nataraja", year: "1993", museum: "Tate, London", museumUrl: "https://www.tate.org.uk/art/artworks/riley-nataraja-t06859", technique: "Öl auf Leinwand", description: "Farbrhythmus statt Schwarz-Weiß-Flimmern; benannt nach dem tanzenden Shiva.", visualDescription: "Schräge Farbparallelogramme in Türkis, Violett, Orange und Grün, die sich überlagern.", rightsHolder: "Bridget Riley / Tate" },
      { id: "riley-achaean", title: "Achæan", year: "1981", museum: "Privatsammlung", museumUrl: "https://www.bridgetriley.online/", technique: "Öl auf Leinen", description: "Streifenbild aus der Ägyptenreise-Phase, Farben nach altägyptischen Malereien.", visualDescription: "Senkrechte Streifen in Ocker, Türkis, Rot und Blau, gleichmäßig, aber nie regelmäßig wiederholt.", rightsHolder: "Bridget Riley" },
    ],
  },
];

export function findModernArtist(slug: string): ModernArtist | undefined {
  return modernArtists.find((artist) => artist.slug === slug);
}

export const modernWorkCount = modernArtists.reduce((sum, a) => sum + a.works.length, 0);

/**
 * Kleines Lexikon der Reise: Orte und Fachbegriffe, die im Lernstoff auftauchen,
 * werden hier kurz erklärt. So bekommt der Nutzer bei jeder Karte neuen Input
 * statt derselben Sätze in anderer Form.
 */
export type GlossaryEntry = { term: string; kind: "ort" | "begriff"; text: string };

export const glossary: GlossaryEntry[] = [
  // Orte
  { term: "Siena", kind: "ort", text: "Toskanische Stadtrepublik, Rivalin von Florenz. Ihre Maler bleiben länger beim goldenen, höfisch-eleganten Stil — Bilder wirken zart, linienbetont und kostbar." },
  { term: "Florenz", kind: "ort", text: "Bank- und Tuchstadt am Arno, ab dem 15. Jahrhundert von den Medici gefördert. Hier werden Perspektive, Anatomie und antike Vorbilder zum Programm." },
  { term: "Padua", kind: "ort", text: "Universitätsstadt in Norditalien. In der Arenakapelle malt Giotto den Bilderzyklus, der die Figur zum ersten Mal körperlich in den Raum stellt." },
  { term: "Brügge", kind: "ort", text: "Reicher Handelshafen in Flandern mit burgundischem Hof. Kaufleute bezahlen Bilder, in denen Stoffe, Schmuck und Frömmigkeit bis ins Detail lesbar sind." },
  { term: "Gent", kind: "ort", text: "Flämische Tuchstadt, bekannt für den Genter Altar der Brüder van Eyck — ein Hauptwerk der frühen Ölmalerei." },
  { term: "Antwerpen", kind: "ort", text: "Nach Brügge der größte Hafen Nordeuropas. Große Werkstätten wie die von Rubens produzieren hier für den Export in ganz Europa." },
  { term: "Köln", kind: "ort", text: "Größte Stadt des deutschen Reichs im Mittelalter, Wallfahrtsort. Bürgerliche Stifter bestellen zarte Altarbilder für ihre Kapellen." },
  { term: "Nürnberg", kind: "ort", text: "Handels- und Handwerksstadt an europäischen Fernwegen. Druckpressen machen Bilder erstmals vervielfältigbar — Dürers Grafik reist bis Italien." },
  { term: "Wittenberg", kind: "ort", text: "Universitätsstadt der Reformation. Cranachs Werkstatt liefert die Bilder zu Luthers Ideen — Kunst wird Teil eines Medienstreits." },
  { term: "Venedig", kind: "ort", text: "Seemacht und Drehscheibe zum Orient. Feuchte Luft verdirbt Fresken, deshalb malt man auf Leinwand — und setzt auf Farbe statt Linie." },
  { term: "Rom", kind: "ort", text: "Sitz der Päpste und Ort der antiken Ruinen. Kirchliche Großaufträge ziehen die berühmtesten Meister an und machen die Stadt zum Maßstab." },
  { term: "Neapel", kind: "ort", text: "Spanisch regierte Millionenstadt im Süden. Caravaggios dunkle Malweise verbreitet sich von hier über ganz Süditalien." },
  { term: "Madrid", kind: "ort", text: "Residenz der spanischen Könige. Am Hof sammelt man italienische und flämische Malerei — Velázquez lernt dort an königlichen Beständen." },
  { term: "Sevilla", kind: "ort", text: "Hafen des Amerikahandels und Ausbildungsort von Velázquez. Volksnahe Küchenszenen entstehen hier neben strenger Frömmigkeit." },
  { term: "Delft", kind: "ort", text: "Kleine niederländische Stadt mit Tuch- und Keramikgewerbe. Vermeer malt hier wenige, extrem sorgfältige Innenräume." },
  { term: "Amsterdam", kind: "ort", text: "Handelsmetropole der niederländischen Republik. Bilder werden hier wie Waren auf einem freien Markt für Bürgerhäuser gekauft." },
  { term: "Haarlem", kind: "ort", text: "Brauerei- und Malerstadt nahe Amsterdam. Frans Hals prägt hier das lockere, schnelle Porträt der Bürgergarden." },
  { term: "Dresden", kind: "ort", text: "Residenzstadt an der Elbe mit berühmter Gemäldegalerie. Caspar David Friedrich arbeitet hier zurückgezogen an seinen Landschaften." },
  { term: "Berlin", kind: "ort", text: "Preußische Hauptstadt, im 19. Jahrhundert rasant wachsende Industriestadt — Museen, Akademie und Avantgarde stoßen hier aufeinander." },
  { term: "London", kind: "ort", text: "Größte Stadt der Welt im 19. Jahrhundert, Motor der Industrialisierung. Dampf, Nebel und Handel werden bei Turner selbst zum Bildthema." },
  { term: "Paris", kind: "ort", text: "Kunsthauptstadt des 19. Jahrhunderts. Der staatliche Salon entscheidet über Karrieren — bis Künstler eigene Ausstellungen organisieren." },
  { term: "Barbizon", kind: "ort", text: "Dorf am Wald von Fontainebleau. Maler ziehen hierher, um direkt vor der Natur zu arbeiten — die Vorstufe der Freilichtmalerei." },
  { term: "Le Havre", kind: "ort", text: "Hafenstadt am Ärmelkanal, Monets Jugendort. Sein Hafenbild „Impression“ gibt dem Impressionismus den Namen." },
  { term: "Arles", kind: "ort", text: "Südfranzösische Stadt, in die van Gogh 1888 zieht. Das harte Licht der Provence treibt ihn zu reinen, ungemischten Farben." },
  { term: "Bretagne", kind: "ort", text: "Küstenregion im Westen Frankreichs. Gauguin sucht dort einfache Frömmigkeit und malt Flächen in kräftiger, symbolischer Farbe." },
  { term: "Wien", kind: "ort", text: "Hauptstadt der Habsburgermonarchie um 1900: Psychoanalyse, Musik und Secession machen das Innenleben zum Thema der Kunst." },
  { term: "München", kind: "ort", text: "Kunststadt mit Akademie und Bohème-Viertel Schwabing. Hier gründen Kandinsky und Marc den Blauen Reiter." },
  { term: "Weimar", kind: "ort", text: "Kleine Residenzstadt in Thüringen, 1919 Gründungsort des Bauhauses und Namensgeber der ersten deutschen Republik." },
  { term: "Oslo", kind: "ort", text: "Damals Kristiania: nordische Hauptstadt, in der Munch Krankheit, Angst und Liebe zu wiederkehrenden Bildmotiven verdichtet." },
  { term: "Toledo", kind: "ort", text: "Alte spanische Bischofsstadt. El Greco entwickelt hier seine gelängten Figuren und kalt-flackernden Farben." },
  { term: "Urbino", kind: "ort", text: "Kleiner, hochgebildeter Hof in den Marken. Von hier stammen Raffael und ein Ideal klarer, maßvoller Architekturräume." },
  { term: "Mantua", kind: "ort", text: "Hofstadt der Gonzaga. Mantegna malt hier Räume, deren gemalte Architektur den echten Raum fortzusetzen scheint." },
  { term: "Parma", kind: "ort", text: "Norditalienische Stadt, in der Correggio weiche Lichtübergänge und schwindelerregende Kuppelbilder entwickelt." },
  { term: "Basel", kind: "ort", text: "Humanistenstadt am Rhein mit Druckereien. Holbein arbeitet hier für Gelehrte wie Erasmus, bevor er nach England geht." },
  { term: "Genf", kind: "ort", text: "Stadt am See in der Schweiz. Konrad Witz malt dort die erste wiedererkennbare Landschaft der europäischen Malerei." },
  { term: "Ornans", kind: "ort", text: "Courbets Heimatstädtchen im Jura. Er malt dessen Bauern lebensgroß — ein Format, das bis dahin Königen vorbehalten war." },

  // Begriffe
  { term: "Fresko", kind: "begriff", text: "Malerei auf frischem, feuchtem Kalkputz. Die Farbe bindet chemisch mit dem Kalk ab und wird Teil der Wand — Korrekturen sind unmöglich." },
  { term: "Tempera", kind: "begriff", text: "Farbe, deren Pigment mit Eigelb gebunden ist. Sie trocknet schnell, bleibt matt und verlangt präzise, kleine Striche." },
  { term: "Lasur", kind: "begriff", text: "Hauchdünne, durchscheinende Farbschicht über einer trockenen Lage. Licht fällt hindurch, wird zurückgeworfen und lässt Farben tief leuchten." },
  { term: "Sfumato", kind: "begriff", text: "Von italienisch „verraucht“: Leonardos Übergänge ohne harte Kontur, bei denen Formen weich in Schatten übergehen." },
  { term: "Tenebrismus", kind: "begriff", text: "Extremes Hell-Dunkel: Figuren treten aus tiefer Finsternis in ein scharfes, gerichtetes Licht — typisch für Caravaggio." },
  { term: "Chiaroscuro", kind: "begriff", text: "Das gezielte Zusammenspiel von Licht und Schatten, um Körper plastisch und Szenen dramatisch wirken zu lassen." },
  { term: "Goldgrund", kind: "begriff", text: "Hintergrund aus poliertem Blattgold. Er zeigt keinen Ort, sondern den Himmel als überirdischen Raum — bis der Landschaftsraum ihn ablöst." },
  { term: "Perspektive", kind: "begriff", text: "Konstruktion, bei der alle Tiefenlinien auf einen Fluchtpunkt zulaufen. Der Raum wird damit mathematisch berechenbar." },
  { term: "Gesso", kind: "begriff", text: "Kreide-Leim-Grundierung auf Holz. Sie wird spiegelglatt geschliffen und gibt Tempera und Gold ihren strahlenden Untergrund." },
  { term: "Pigment", kind: "begriff", text: "Der farbgebende Feststoff, meist gemahlenes Mineral oder Pflanzenauszug. Erst ein Bindemittel — Ei, Öl, Kalk — macht daraus Farbe." },
  { term: "Ultramarin", kind: "begriff", text: "Blau aus gemahlenem Lapislazuli, importiert aus Afghanistan. Es war zeitweise teurer als Gold und wurde gesondert abgerechnet." },
  { term: "Impasto", kind: "begriff", text: "Dick aufgetragene Farbe, deren Pinsel- oder Spachtelspur sichtbar stehen bleibt und Licht körperlich einfängt." },
  { term: "Pointillismus", kind: "begriff", text: "Nebeneinandergesetzte reine Farbpunkte, die sich erst im Auge des Betrachters zur Mischung verbinden." },
  { term: "Freilichtmalerei", kind: "begriff", text: "Arbeiten direkt vor dem Motiv im Freien. Farbtuben aus Metall und leichte Staffeleien machen es ab etwa 1840 praktisch möglich." },
  { term: "Salon", kind: "begriff", text: "Die staatliche Jahresausstellung in Paris. Wer dort abgelehnt wurde, war vom Markt fast ausgeschlossen — daher die eigenen Schauen der Impressionisten." },
  { term: "Secession", kind: "begriff", text: "Abspaltung junger Künstler vom offiziellen Kunstbetrieb, um eigene Ausstellungen zu zeigen — in Wien 1897 unter Klimt." },
  { term: "Suprematismus", kind: "begriff", text: "Malewitschs Kunst reiner geometrischer Formen ohne Gegenstand: das Quadrat als eigenständiges Bildereignis." },
  { term: "Bauhaus", kind: "begriff", text: "1919 gegründete Schule, die Kunst, Handwerk und Industrie verbindet. Gestaltung soll den Alltag prägen, nicht nur die Wand schmücken." },
  { term: "Kupferstich", kind: "begriff", text: "In eine Metallplatte gegrabene Linien nehmen Farbe auf und werden gedruckt. So entstehen viele gleichwertige Blätter aus einer Hand." },
  { term: "Holzschnitt", kind: "begriff", text: "Alles, was weiß bleiben soll, wird aus dem Holzstock geschnitten. Übrig bleibt ein kräftiges Hell-Dunkel-Bild für den Druck." },
  { term: "Camera obscura", kind: "begriff", text: "Dunkle Kammer mit kleiner Öffnung, die ein Bild der Außenwelt auf eine Fläche wirft — ein Hilfsmittel, das im 17. Jahrhundert diskutiert wird." },
  { term: "Grundierung", kind: "begriff", text: "Die vorbereitete Schicht auf Holz oder Leinwand. Ihre Farbe — hell, grau oder braun — bestimmt die Stimmung des fertigen Bildes mit." },
];

const byTerm = new Map(glossary.map((entry) => [entry.term.toLowerCase(), entry]));

function escape(term: string): string {
  return term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Findet Begriffe, die in den übergebenen Texten wirklich vorkommen,
 * und lässt bereits erklärte Begriffe (`skip`) aus — so wiederholt sich nichts.
 */
export function explainTerms(texts: (string | undefined)[], skip: Set<string>, limit = 2): GlossaryEntry[] {
  const haystack = texts.filter(Boolean).join(" ");
  const found: GlossaryEntry[] = [];
  for (const entry of glossary) {
    if (found.length >= limit) break;
    if (skip.has(entry.term)) continue;
    const pattern = new RegExp(`(^|[^\\p{L}])${escape(entry.term)}`, "iu");
    if (pattern.test(haystack)) found.push(entry);
  }
  return found;
}

/** Ein Begriff, der noch nicht erklärt wurde — für die Rückmeldung nach einer Frage. */
export function nextTerm(texts: (string | undefined)[], skip: Set<string>): GlossaryEntry | undefined {
  return explainTerms(texts, skip, 1)[0];
}

export function lookup(term: string): GlossaryEntry | undefined {
  return byTerm.get(term.toLowerCase());
}

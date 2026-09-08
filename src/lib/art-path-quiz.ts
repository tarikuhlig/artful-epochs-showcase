export type ArtPathQuiz = {
  question: string;
  options: [string, string, string];
  answer: string;
  explanation: string;
};

export const artPathQuizzes: ArtPathQuiz[] = [
  { question: "Welche Technik machte van Eycks Bildwelt so detailreich?", options: ["Ölfarbe in feinen Schichten", "Fresko auf nassem Putz", "Grobe Holzschnitte"], answer: "Ölfarbe in feinen Schichten", explanation: "Transparente Öllasuren erzeugen Tiefe, Glanz und feinste Oberflächen." },
  { question: "Welche Idee prägt Botticellis Renaissancebild?", options: ["Der Mensch und die Antike rücken ins Zentrum", "Nur religiöse Regeln zählen", "Farbe wird vollständig vermieden"], answer: "Der Mensch und die Antike rücken ins Zentrum", explanation: "Humanismus und antike Mythologie erweiterten die Bildthemen der Renaissance." },
  { question: "Was verbindet Leonardo in der Mona Lisa?", options: ["Forschung und psychologische Beobachtung", "Zufall und reine Geometrie", "Mittelalterliche Goldgründe"], answer: "Forschung und psychologische Beobachtung", explanation: "Sfumato, Anatomie und genaue Beobachtung machen das Porträt zu einer Begegnung." },
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
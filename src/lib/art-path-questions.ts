import { artPathWithWorks } from "@/lib/art-path";
import { allWorks, epochs } from "@/lib/art-data";

/** Fragetypen des Lernzyklus: Fakten, Verständnis, Bilderkennung, Vergleich, Transfer. */
export type QuestionKind = "fakt" | "verstaendnis" | "bild" | "vergleich" | "transfer";

export type ArtQuestion = {
  /** Stabiler Schlüssel je Station — nötig für Wiederholungen nach falschen Antworten. */
  id: string;
  kind: QuestionKind;
  question: string;
  options: string[];
  answer: string;
  /** Rückmeldung bei richtiger Antwort. */
  explanation: string;
  /** Erklärende Rückmeldung bei falscher oder unsicherer Antwort. */
  hint?: string;
  /** Thema, das bei Fehlern zum Wiederholen vorgemerkt wird. */
  topic?: string;
  image?: string;
  compare?: { src: string; label: string; caption: string }[];
};

const KIND_LABEL: Record<QuestionKind, string> = {
  fakt: "Faktenwissen",
  verstaendnis: "Verständnis",
  bild: "Bilderkennung",
  vergleich: "Vergleich",
  transfer: "Transfer",
};

export function questionKindLabel(kind: QuestionKind): string {
  return KIND_LABEL[kind];
}

function yearNumber(year: string): number {
  const match = year.match(/\d{3,4}/);
  return match ? Number(match[0]) : 0;
}

function shuffle<T>(items: T[], seed: number): T[] {
  const copy = [...items];
  let state = (seed * 9301 + 49297) % 233280 || 7;
  for (let i = copy.length - 1; i > 0; i--) {
    state = (state * 9301 + 49297) % 233280;
    const j = state % (i + 1);
    const a = copy[i] as T;
    const b = copy[j] as T;
    copy[i] = b;
    copy[j] = a;
  }
  return copy;
}

function short(text: string, max = 120): string {
  const clean = text.replace(/^Merke:\s*/, "").trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

/** Stationen, aus denen falsche Antworten stammen — immer zwei andere Epochen. */
function otherStations(index: number) {
  const others = artPathWithWorks.filter((item) => item.index !== index);
  const first = others[(index * 7 + 3) % others.length];
  let second = others[(index * 13 + 11) % others.length];
  if (second && first && second.index === first.index) {
    second = others[(others.indexOf(first) + 5) % others.length];
  }
  return [first, second].filter((item): item is (typeof artPathWithWorks)[number] => item !== undefined);
}

/**
 * Die Abschlussfrage einer Station. Sie prüft den Merksatz, der auf den
 * Lernkarten dieser Station ausdrücklich hervorgehoben wurde.
 * Wird von Client und Server identisch verwendet.
 */
export function stationFinalQuestion(index: number): ArtQuestion | undefined {
  const station = artPathWithWorks[index];
  if (!station) return undefined;
  const others = otherStations(index);
  const answer = short(station.turningPoint, 150);
  const wrong = others.map((item) => short(item.turningPoint, 150));
  if (wrong.length < 2) return undefined;
  return {
    id: `final-${index}`,
    kind: "verstaendnis",
    question: `Abschlussfrage: Was verändert ${station.era} dauerhaft an der Malerei?`,
    options: shuffle([answer, wrong[0] as string, wrong[1] as string], index + 101),
    answer,
    explanation: station.mnemonics[0]?.detail ?? station.history,
    hint: `Frag dich, was in ${station.place} (${station.years}) zum ersten Mal möglich wird — nicht, was schon vorher üblich war.`,
    topic: "Wendepunkt der Epoche",
  };
}

/** Neun Übungsfragen je Station — alle beziehen sich auf den zuvor gelernten Stoff. */
export function stationQuestions(index: number): ArtQuestion[] {
  const station = artPathWithWorks[index];
  if (!station) return [];
  const others = otherStations(index);
  const artists = station.artistProfiles;
  const names = artists.map((artist) => artist.name);
  const questions: ArtQuestion[] = [];

  // Bildzuordnung — genau die Werke der Künstlerkarten
  const attributionFor = (position: number, seed: number, id: string): ArtQuestion | undefined => {
    const artist = artists[position];
    const work = station.works[position];
    if (!artist || !work) return undefined;
    const wrong = names.filter((name) => name !== artist.name).slice(0, 2);
    if (wrong.length < 2) return undefined;
    return {
      id,
      kind: "bild",
      question: `Von wem stammt dieses Werk — «${work.title}»?`,
      options: shuffle([artist.name, ...wrong], seed),
      answer: artist.name,
      explanation: `${work.title} (${work.year}) malte ${artist.name} (${artist.life}). Achte auf: ${short(work.technique, 110)}`,
      hint: `${artist.name} (${artist.life}): ${short(station.artistLens[position] ?? station.technique, 150)}`,
      topic: `Werke von ${artist.name} erkennen`,
      image: work.image,
    };
  };

  const first = attributionFor(0, index + 1, `bild-1-${index}`);
  if (first) questions.push(first);

  // Technik
  const techniqueAnswer = short(station.technique, 130);
  if (others.length >= 2) {
    questions.push({
      id: `technik-${index}`,
      kind: "verstaendnis",
      question: `Welche Technik kennzeichnet die Werkstatt dieser Epoche?`,
      options: shuffle([techniqueAnswer, short(others[0]!.technique, 130), short(others[1]!.technique, 130)], index + 21),
      answer: techniqueAnswer,
      explanation: station.technique,
      hint: `Frag dich: Welches Bindemittel und welcher Bildträger sind in ${station.years} überhaupt verfügbar?`,
      topic: "Technik der Epoche",
      ...(station.work?.image ? { image: station.work.image } : {}),
    });
  }

  // Bildvergleich — wer hat gemalt?
  const workA = station.works[0];
  const workB = station.works[1];
  if (workA && workB && artists[0] && artists[1]) {
    questions.push({
      id: `vergleich-maler-${index}`,
      kind: "vergleich",
      question: `Welches der beiden Bilder malte ${artists[0].name}?`,
      options: ["Linkes Bild", "Rechtes Bild"],
      answer: "Linkes Bild",
      explanation: `Links: ${workA.title} von ${artists[0].name}. Rechts: ${workB.title} von ${artists[1].name}.`,
      hint: `Vergleiche Handschrift und Bildaufbau: ${short(station.artistLens[0] ?? "", 150)}`,
      topic: "Handschriften unterscheiden",
      compare: [
        { src: workA.image, label: "Linkes Bild", caption: artists[0].name },
        { src: workB.image, label: "Rechtes Bild", caption: artists[1].name },
      ],
    });
  }

  // Handschriften der Station unterscheiden: Welcher Satz gehört zu welchem Künstler?
  if (artists[0] && artists[1] && artists[2] && station.artistLens.length >= 3) {
    const target = artists[index % 3] ?? artists[0];
    const position = artists.indexOf(target);
    const answer = short(station.artistLens[position] ?? "", 150);
    const wrong = station.artistLens
      .filter((_, i) => i !== position)
      .slice(0, 2)
      .map((lens) => short(lens, 150));
    if (answer && wrong.length >= 2) {
      questions.push({
        id: `maler-profil-${index}`,
        kind: "verstaendnis",
        question: `Alle vier arbeiten in derselben Epoche — was unterscheidet ${target.name} von den anderen?`,
        options: shuffle([answer, wrong[0] as string, wrong[1] as string], index + 31),
        answer,
        explanation: `${target.name} (${target.life}): ${station.artistLens[position]} Die übrigen Sätze beschreiben seine Zeitgenossen auf dieser Station — dieselbe Werkstattkultur, andere Handschrift.`,
        hint: `Die Falschantworten gehören zu den anderen Malern dieser Station. Frag dich, wofür gerade ${target.name} berühmt wurde.`,
        topic: "Künstler der Epoche unterscheiden",
      });
    }
  }

  // Werkzeuge und Pinsel
  if (others.length >= 2) {
    const answer = short(station.brushes, 130);
    questions.push({
      id: `werkzeug-${index}`,
      kind: "fakt",
      question: "Womit wurde in dieser Epoche gemalt?",
      options: shuffle([answer, short(others[0]!.brushes, 130), short(others[1]!.brushes, 130)], index + 41),
      answer,
      explanation: `${station.brushes} Werkzeuge: ${station.tools}`,
      hint: "Werkzeug verrät die Technik: feine Haarpinsel für Lasuren, Borsten für pastose Spuren, Stichel und Presse für Druckgrafik.",
      topic: "Werkzeug und Material",
    });
  }

  // Bildvergleich — welches Werk entstand früher?
  if (workA && workB) {
    const earlierLeft = yearNumber(workA.year) <= yearNumber(workB.year);
    questions.push({
      id: `vergleich-zeit-${index}`,
      kind: "vergleich",
      question: "Welches der beiden Werke entstand später — und woran erkennst du es?",
      options: ["Linkes Bild", "Rechtes Bild"],
      answer: earlierLeft ? "Rechtes Bild" : "Linkes Bild",
      explanation: `${workA.title} (${workA.year}) gegenüber ${workB.title} (${workB.year}). Später heißt hier: ${short(station.technique, 110)}`,
      hint: `Achte auf Malmittel, Raumtiefe und Detailschärfe. ${workA.title}: ${workA.year}, ${workB.title}: ${workB.year}.`,
      topic: "Werke zeitlich einordnen",
      compare: [
        { src: workA.image, label: "Linkes Bild", caption: workA.year },
        { src: workB.image, label: "Rechtes Bild", caption: workB.year },
      ],
    });
  }

  // Farben und Pigmente
  const paletteAnswer = station.palette[0];
  if (paletteAnswer && others.length >= 2) {
    const used = new Set(station.palette);
    const wrong: string[] = [];
    for (const item of others) {
      const color = item.palette.find((candidate) => !used.has(candidate));
      if (color) { used.add(color); wrong.push(color); }
    }
    if (wrong.length < 2) {
      const fallback = artPathWithWorks
        .filter((item) => item.index !== index)
        .flatMap((item) => item.palette)
        .find((color) => !used.has(color));
      if (fallback) { used.add(fallback); wrong.push(fallback); }
    }
    if (wrong.length >= 2) {
      questions.push({
        id: `palette-${index}`,
        kind: "fakt",
        question: `Welche Farbe gehört zur typischen Palette von ${station.era}?`,
        options: shuffle([paletteAnswer, wrong[0] as string, wrong[1] as string], index + 51),
        answer: paletteAnswer,
        explanation: `Palette dieser Epoche: ${station.palette.join(", ")}. ${station.pigments}`,
        hint: `Pigmente hängen an Handel und Technik: ${short(station.pigments, 150)}`,
        topic: "Farben und Pigmente",
      });
    }
  }

  // Ort und Zeit
  if (others.length >= 2) {
    questions.push({
      id: `ort-${index}`,
      kind: "fakt",
      question: `Wo und wann entsteht ${station.era}?`,
      options: shuffle([
        `${station.place}, ${station.years}`,
        `${others[0]!.place}, ${others[0]!.years}`,
        `${others[1]!.place}, ${others[1]!.years}`,
      ], index + 61),
      answer: `${station.place}, ${station.years}`,
      explanation: `${station.era} entfaltet sich in ${station.place} (${station.years}).`,
      hint: `Denk an die Ankunftskarte: ${short(station.experience.story, 150)}`,
      topic: "Ort und Zeit der Epoche",
    });
  }

  // Gesellschaftlicher Hintergrund — warum entsteht diese Kunst gerade hier?
  if (others.length >= 2) {
    const answer = short(station.history, 150);
    questions.push({
      id: `kontext-${index}`,
      kind: "verstaendnis",
      question: `Wer bestellt die Bilder — und warum entsteht ${station.era} gerade dort?`,
      options: shuffle([answer, short(others[0]!.history, 150), short(others[1]!.history, 150)], index + 71),
      answer,
      explanation: `${station.history} ${station.mnemonics[2]?.detail ?? ""}`.trim(),
      hint: `Denk an Geld und Auftraggeber in ${station.place}: Kirche, Hof, Stadtrat oder Bürgertum — davon hängen Format, Thema und Material ab.`,
      topic: "Auftraggeber und Zeitgeschehen",
    });
  }

  const last = attributionFor(2, index + 81, `bild-2-${index}`) ?? attributionFor(1, index + 91, `bild-2-${index}`);
  if (last) questions.push(last);

  return questions.slice(0, 9);
}

/**
 * Transferfrage am Stationsende: ein Werk, das auf dieser Station nicht gezeigt wurde.
 * Der Nutzer muss die Epoche allein anhand der Stilmerkmale einordnen.
 */
export function stationTransferQuestion(index: number): ArtQuestion | undefined {
  const station = artPathWithWorks[index];
  if (!station) return undefined;
  const epoch = station.artistProfiles[0]?.epoch;
  if (!epoch) return undefined;
  const known = new Set(station.works.map((work) => work.id));
  const knownPainters = new Set(station.artistProfiles.map((artist) => artist.slug));
  const pool = allWorks.filter(
    (work) => work.epoch.slug === epoch.slug && !known.has(work.id) && !knownPainters.has(work.painter.slug),
  );
  const candidate = pool[(index * 17 + 5) % (pool.length || 1)];
  if (!candidate) return undefined;
  const wrongEpochs = epochs
    .filter((item) => item.slug !== epoch.slug)
    .filter((_, position) => position % 2 === index % 2)
    .slice(0, 3)
    .map((item) => item.name);
  if (wrongEpochs.length < 2) return undefined;
  return {
    id: `transfer-${index}`,
    kind: "transfer",
    question: "Neues Werk, das du noch nicht studiert hast: Welche Epoche ist wahrscheinlich?",
    options: shuffle([epoch.name, ...wrongEpochs.slice(0, 3)], index + 131),
    answer: epoch.name,
    explanation: `Richtig: ${candidate.title} (${candidate.year}) von ${candidate.painter.name} gehört zu ${epoch.name}. Entscheidend sind ${short(station.technique, 120)}`,
    hint: `Prüfe Malmittel, Licht und Raum. Merkmale dieser Epoche: ${short(station.technique, 140)} Palette: ${station.palette.slice(0, 3).join(", ")}.`,
    topic: "Stilmerkmale auf neue Werke übertragen",
    image: candidate.image,
  };
}

/** Kompakte Zusammenfassung am Stationsende. */
export function stationSummary(index: number) {
  const station = artPathWithWorks[index];
  if (!station) return undefined;
  return {
    style: `${short(station.turningPoint, 180)} Palette: ${station.palette.slice(0, 4).join(", ")}.`,
    artists: station.artistProfiles.map((artist) => `${artist.name} (${artist.life})`),
    technique: station.technique,
    context: station.history,
  };
}

/**
 * Wiederholung in anderer Form: gleiche Sache, neu formuliert und neu gemischt,
 * damit falsch beantwortete Inhalte später erneut geprüft werden.
 */
export function repeatVariant(question: ArtQuestion, seed: number): ArtQuestion {
  return {
    ...question,
    id: `${question.id}-wdh`,
    question: question.compare
      ? `Noch einmal genau hinsehen: ${question.question}`
      : `Wiederholung — ${question.question}`,
    options: shuffle(question.options, seed + 977),
  };
}

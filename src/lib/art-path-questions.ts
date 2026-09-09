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
  const answer = short(station.mnemonics[0] ?? station.turningPoint);
  const wrong = others.map((item) => short(item.mnemonics[0] ?? item.turningPoint));
  if (wrong.length < 2) return undefined;
  return {
    question: `Abschlussfrage: Welcher Merksatz gehört zu ${station.era}?`,
    options: shuffle([answer, wrong[0] as string, wrong[1] as string], index + 101),
    answer,
    explanation: `${station.era} (${station.years}): ${station.turningPoint}`,
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

  // 1 & 9: Bildzuordnung — genau die Werke der Künstlerkarten
  const attributionFor = (position: number, seed: number): ArtQuestion | undefined => {
    const artist = artists[position];
    const work = station.works[position];
    if (!artist || !work) return undefined;
    const wrong = names.filter((name) => name !== artist.name).slice(0, 2);
    if (wrong.length < 2) return undefined;
    return {
      question: `Von wem stammt dieses Werk — «${work.title}»?`,
      options: shuffle([artist.name, ...wrong], seed),
      answer: artist.name,
      explanation: `${work.title} (${work.year}) malte ${artist.name} (${artist.life}).`,
      image: work.image,
    };
  };

  const first = attributionFor(0, index + 1);
  if (first) questions.push(first);

  // 2: Merksatz zur Technik
  const techniqueAnswer = short(station.technique, 130);
  if (others.length >= 2) {
    questions.push({
      question: `Welche Technik kennzeichnet die Werkstatt dieser Epoche?`,
      options: shuffle([techniqueAnswer, short(others[0]!.technique, 130), short(others[1]!.technique, 130)], index + 21),
      answer: techniqueAnswer,
      explanation: station.technique,
      ...(station.work?.image ? { image: station.work.image } : {}),
    });
  }

  // 3: Bildvergleich — wer hat gemalt?
  const workA = station.works[0];
  const workB = station.works[1];
  if (workA && workB && artists[0] && artists[1]) {
    questions.push({
      question: `Welches der beiden Bilder malte ${artists[0].name}?`,
      options: ["Linkes Bild", "Rechtes Bild"],
      answer: "Linkes Bild",
      explanation: `Links: ${workA.title} von ${artists[0].name}. Rechts: ${workB.title} von ${artists[1].name}.`,
      compare: [
        { src: workA.image, label: "Linkes Bild", caption: artists[0].name },
        { src: workB.image, label: "Rechtes Bild", caption: artists[1].name },
      ],
    });
  }

  // 4: Merksatz 2
  if (station.mnemonics[1] && others.length >= 2) {
    const answer = short(station.mnemonics[1]);
    questions.push({
      question: "Welche Aussage hast du auf den Merkkarten dieser Station gelernt?",
      options: shuffle([answer, short(others[0]!.mnemonics[1] ?? others[0]!.turningPoint), short(others[1]!.mnemonics[1] ?? others[1]!.turningPoint)], index + 31),
      answer,
      explanation: station.mnemonics[1],
    });
  }

  // 5: Werkzeuge und Pinsel
  if (others.length >= 2) {
    const answer = short(station.brushes, 130);
    questions.push({
      question: "Womit wurde in dieser Epoche gemalt?",
      options: shuffle([answer, short(others[0]!.brushes, 130), short(others[1]!.brushes, 130)], index + 41),
      answer,
      explanation: `${station.brushes} Werkzeuge: ${station.tools}`,
    });
  }

  // 6: Bildvergleich — welches Werk entstand früher?
  if (workA && workB) {
    const earlierLeft = yearNumber(workA.year) <= yearNumber(workB.year);
    questions.push({
      question: "Welches der beiden Werke entstand früher?",
      options: ["Linkes Bild", "Rechtes Bild"],
      answer: earlierLeft ? "Linkes Bild" : "Rechtes Bild",
      explanation: `${workA.title} (${workA.year}) gegenüber ${workB.title} (${workB.year}).`,
      compare: [
        { src: workA.image, label: "Linkes Bild", caption: workA.year },
        { src: workB.image, label: "Rechtes Bild", caption: workB.year },
      ],
    });
  }

  // 7: Farben und Pigmente
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
        question: `Welche Farbe gehört zur typischen Palette von ${station.era}?`,
        options: shuffle([paletteAnswer, wrong[0] as string, wrong[1] as string], index + 51),
        answer: paletteAnswer,
        explanation: `Palette dieser Epoche: ${station.palette.join(", ")}. ${station.pigments}`,
      });
    }
  }

  // 8: Ort und Zeit
  if (others.length >= 2) {
    questions.push({
      question: `Wo und wann entsteht ${station.era}?`,
      options: shuffle([
        `${station.place}, ${station.years}`,
        `${others[0]!.place}, ${others[0]!.years}`,
        `${others[1]!.place}, ${others[1]!.years}`,
      ], index + 61),
      answer: `${station.place}, ${station.years}`,
      explanation: `${station.era} entfaltet sich in ${station.place} (${station.years}).`,
    });
  }

  // 9: Merksatz 3
  if (station.mnemonics[2] && others.length >= 2) {
    const answer = short(station.mnemonics[2]);
    questions.push({
      question: "Und zum Schluss: Welcher Merksatz stimmt?",
      options: shuffle([answer, short(others[0]!.mnemonics[2] ?? others[0]!.lesson), short(others[1]!.mnemonics[2] ?? others[1]!.lesson)], index + 71),
      answer,
      explanation: station.mnemonics[2],
    });
  }

  const last = attributionFor(2, index + 81) ?? attributionFor(1, index + 91);
  if (last) questions.push(last);

  return questions.slice(0, 9);
}

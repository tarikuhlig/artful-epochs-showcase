import { allWorks, epochs, type Work } from "@/lib/art-data";

export type StudyMode = "painter" | "title" | "epoch" | "year" | "mixed";

export const STUDY_MODES: { value: StudyMode; label: string; hint: string }[] = [
  { value: "painter", label: "Wer hat es gemalt?", hint: "Bild sehen, Maler nennen" },
  { value: "title", label: "Wie heißt das Werk?", hint: "Bild sehen, Titel nennen" },
  { value: "epoch", label: "Welche Epoche?", hint: "Bild sehen, Epoche zuordnen" },
  { value: "year", label: "Aus welchem Jahr?", hint: "Bild sehen, Entstehung schätzen" },
  { value: "mixed", label: "Alles gemischt", hint: "Zufällig aus allen Fragearten" },
];

export type StudyCard = {
  key: string;
  work: Work;
  mode: Exclude<StudyMode, "mixed">;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

export const studyEpochs = [...epochs].sort(
  (a, b) =>
    Number(a.period.match(/\d{3,4}/)?.[0] ?? 9999) - Number(b.period.match(/\d{3,4}/)?.[0] ?? 9999),
);

export function studyPool(epochSlug: string): Work[] {
  if (epochSlug === "alle") return allWorks;
  return allWorks.filter((work) => work.epoch.slug === epochSlug);
}

function sample<T>(items: T[]): T | undefined {
  return items[Math.floor(Math.random() * items.length)];
}

function distractors(values: string[], answer: string, count: number): string[] {
  const pool = Array.from(new Set(values.filter((value) => value && value !== answer)));
  const picked: string[] = [];
  while (picked.length < count && pool.length > 0) {
    const index = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(index, 1)[0] as string);
  }
  return picked;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j] as T, copy[i] as T];
  }
  return copy;
}

/** Zieht eine neue, zufällige Lernkarte — der Stapel ist damit unendlich. */
export function drawStudyCard(pool: Work[], mode: StudyMode, seen: number): StudyCard | null {
  const work = sample(pool);
  if (!work) return null;
  const resolved: Exclude<StudyMode, "mixed"> =
    mode === "mixed"
      ? (["painter", "title", "epoch", "year"][Math.floor(Math.random() * 4)] as Exclude<StudyMode, "mixed">)
      : mode;

  let question = "";
  let answer = "";
  let options: string[] = [];
  let explanation = "";

  if (resolved === "painter") {
    question = "Wer hat dieses Werk gemalt?";
    answer = work.painter.name;
    options = [answer, ...distractors(pool.map((item) => item.painter.name), answer, 3)];
    explanation = `${work.title} (${work.year}) stammt von ${work.painter.name}, ${work.painter.life}.`;
  } else if (resolved === "title") {
    question = "Wie heißt dieses Werk?";
    answer = work.title;
    const sameHand = pool.filter((item) => item.painter.slug === work.painter.slug).map((item) => item.title);
    options = [answer, ...distractors([...sameHand, ...pool.map((item) => item.title)], answer, 3)];
    explanation = `Das Werk heißt „${work.title}“ (${work.year}) von ${work.painter.name}.`;
  } else if (resolved === "epoch") {
    question = "Zu welcher Epoche gehört dieses Werk?";
    answer = work.epoch.name;
    options = [answer, ...distractors(epochs.map((epoch) => epoch.name), answer, 3)];
    explanation = `${work.title} gehört zur Epoche ${work.epoch.name} (${work.epoch.period}).`;
  } else {
    question = "Aus welcher Zeit stammt dieses Werk?";
    answer = work.year;
    options = [answer, ...distractors(pool.map((item) => item.year), answer, 3)];
    explanation = `${work.title} von ${work.painter.name} entstand ${work.year}.`;
  }

  return {
    key: `${work.id}-${resolved}-${seen}`,
    work,
    mode: resolved,
    question,
    options: shuffle(options),
    answer,
    explanation,
  };
}

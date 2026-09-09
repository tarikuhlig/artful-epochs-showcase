import { allPainters, allWorks, type Work } from "@/lib/art-data";
import { painterOfTheDay, worksOfPainter } from "@/lib/daily-artist";
import { workOfTheDay } from "@/lib/farm";

export type LessonKind = "work" | "artist";

export type LessonQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type DailyLesson = {
  kind: LessonKind;
  title: string;
  subtitle: string;
  image: string;
  /** Lernstoff — genau daraus stammen die beiden Fragen. */
  study: { label: string; text: string }[];
  questions: LessonQuestion[];
  link: { workId?: string; painterSlug?: string };
};

function seed(text: string) {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

function choices(all: string[], answer: string, key: string, count = 3): string[] {
  const pool = Array.from(new Set(all.filter((value) => value && value !== answer)));
  const picked: string[] = [];
  let state = seed(key);
  while (picked.length < count && pool.length > 0) {
    state = (state * 1103515245 + 12345) % 2147483648;
    picked.push(pool.splice(state % pool.length, 1)[0] as string);
  }
  const options = [answer, ...picked];
  const rotate = seed(`${key}#rotate`) % options.length;
  return [...options.slice(rotate), ...options.slice(0, rotate)];
}

function firstSentence(text: string) {
  const match = text.match(/^[^.!?]+[.!?]/);
  return (match?.[0] ?? text).trim();
}

/** Tageswerk: Lernstoff plus zwei Fragen, die genau diesen Stoff abfragen. */
export function workLesson(dateISO: string): DailyLesson {
  const work: Work = workOfTheDay(dateISO);
  const study = [
    { label: "Wer und wann", text: `„${work.title}“ wurde von ${work.painter.name} (${work.painter.life}) geschaffen und entstand ${work.year}. Der Künstler gehört zur Epoche ${work.epoch.name} (${work.epoch.period}).` },
    { label: "Technik und Ort", text: `Ausgeführt als ${work.technique}. Heute ist das Werk ${work.museum ? `zu sehen in: ${work.museum}` : "in Privatbesitz bzw. der Standort ist nicht gesichert"}.` },
    { label: "Worum es geht", text: firstSentence(work.description) },
    { label: "Warum es zählt", text: firstSentence(work.significance) },
  ];
  const questions: LessonQuestion[] = [
    {
      question: `Aus welchem Jahr stammt „${work.title}“?`,
      options: choices(allWorks.map((item) => item.year), work.year, `${dateISO}-work-year`),
      answer: work.year,
      explanation: `${work.painter.name} schuf das Werk ${work.year}.`,
    },
    {
      question: `Mit welcher Technik ist „${work.title}“ ausgeführt?`,
      options: choices(allWorks.map((item) => item.technique), work.technique, `${dateISO}-work-technique`),
      answer: work.technique,
      explanation: `Die Technik lautet: ${work.technique}.`,
    },
  ];
  return {
    kind: "work",
    title: work.title,
    subtitle: `${work.painter.name} · ${work.year}`,
    image: work.image,
    study,
    questions,
    link: { workId: work.id },
  };
}

/** Tageskünstler: Lernstoff plus zwei Fragen, die genau diesen Stoff abfragen. */
export function artistLesson(dateISO: string): DailyLesson {
  const painter = painterOfTheDay(dateISO);
  const works = worksOfPainter(painter.slug);
  const keyWork = works[seed(`${dateISO}-key`) % Math.max(1, works.length)];
  const study = [
    { label: "Leben", text: `${painter.name}, ${painter.life}, stammt aus ${painter.origin}.` },
    { label: "Epoche", text: `Zugeordnet wird ${painter.name} der Epoche ${painter.epoch.name} (${painter.epoch.period}).` },
    { label: "Handschrift", text: firstSentence(painter.bio) },
    { label: "Schlüsselwerk", text: keyWork ? `Ein Hauptwerk ist „${keyWork.title}“ (${keyWork.year}).` : "Zu diesem Künstler sind mehrere Hauptwerke im Katalog." },
  ];
  const questions: LessonQuestion[] = [
    {
      question: `Zu welcher Epoche zählt ${painter.name}?`,
      options: choices(allPainters.map((item) => item.epoch.name), painter.epoch.name, `${dateISO}-artist-epoch`),
      answer: painter.epoch.name,
      explanation: `${painter.name} gehört zur Epoche ${painter.epoch.name} (${painter.epoch.period}).`,
    },
    {
      question: `Welches Werk stammt von ${painter.name}?`,
      options: choices(
        allWorks.filter((item) => item.painter.slug !== painter.slug).map((item) => item.title),
        keyWork?.title ?? "",
        `${dateISO}-artist-work`,
      ),
      answer: keyWork?.title ?? "",
      explanation: keyWork ? `„${keyWork.title}“ (${keyWork.year}) stammt von ${painter.name}.` : "",
    },
  ];
  return {
    kind: "artist",
    title: painter.name,
    subtitle: `${painter.life} · ${painter.origin}`,
    image: keyWork?.image ?? works[0]?.image ?? "",
    study,
    questions,
    link: { painterSlug: painter.slug },
  };
}

export function dailyLesson(kind: LessonKind, dateISO: string): DailyLesson {
  return kind === "work" ? workLesson(dateISO) : artistLesson(dateISO);
}

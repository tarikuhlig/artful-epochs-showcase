import { allWorks } from "@/lib/art-data";

export type DailyChallengeQuestion = {
  id: string;
  prompt: string;
  image?: string;
  comparisonImage?: string;
  options: { value: string; label: string }[];
  answer: string;
  explanation: string;
};

function hash(input: string) {
  return [...input].reduce((value, character) => ((value * 31) + character.charCodeAt(0)) >>> 0, 2166136261);
}

function pickDistinct<T>(items: T[], count: number, seed: number) {
  const copy = [...items];
  const selected: T[] = [];
  let state = seed || 1;
  while (copy.length && selected.length < count) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const index = state % copy.length;
    const [item] = copy.splice(index, 1);
    if (item !== undefined) selected.push(item);
  }
  return selected;
}

function shuffledOptions(options: { value: string; label: string }[], seed: number) {
  return pickDistinct(options, options.length, seed);
}

function workYear(year: string) {
  return Number(year.match(/\d{3,4}/)?.[0] ?? 0);
}

export function dailyChallenge(dateISO: string): DailyChallengeQuestion[] {
  const eligible = allWorks.filter((work) => work.image && work.painter.name && work.epoch.name && workYear(work.year) > 0);
  const seed = hash(dateISO);
  const picked = pickDistinct(eligible, 7, seed);
  const artistWork = picked[0];
  const epochWork = picked[1];
  const olderA = picked[2];
  const olderB = picked[3];
  if (!artistWork || !epochWork || !olderA || !olderB) return [];

  const otherPainters = pickDistinct(
    eligible.filter((work) => work.painter.slug !== artistWork.painter.slug),
    3,
    seed + 11,
  );
  const epochNames = [...new Set(eligible.map((work) => work.epoch.name).filter((name) => name !== epochWork.epoch.name))];
  const otherEpochs = pickDistinct(epochNames, 3, seed + 29);
  const older = workYear(olderA.year) <= workYear(olderB.year) ? olderA : olderB;

  return [
    {
      id: "artist",
      prompt: `Wer malte „${artistWork.title}“?`,
      image: artistWork.image,
      options: shuffledOptions([
        { value: artistWork.painter.slug, label: artistWork.painter.name },
        ...otherPainters.map((work) => ({ value: work.painter.slug, label: work.painter.name })),
      ], seed + 41),
      answer: artistWork.painter.slug,
      explanation: `${artistWork.painter.name} schuf „${artistWork.title}“ ${artistWork.year}.`,
    },
    {
      id: "epoch",
      prompt: `Zu welcher Epoche gehört „${epochWork.title}“?`,
      image: epochWork.image,
      options: shuffledOptions([
        { value: epochWork.epoch.slug, label: epochWork.epoch.name },
        ...otherEpochs.map((name) => ({ value: name, label: name })),
      ], seed + 53),
      answer: epochWork.epoch.slug,
      explanation: `Das Werk von ${epochWork.painter.name} wird in Provenance der Epoche ${epochWork.epoch.name} zugeordnet.`,
    },
    {
      id: "older",
      prompt: "Welches dieser beiden Werke entstand früher?",
      image: olderA.image,
      comparisonImage: olderB.image,
      options: [
        { value: olderA.id, label: `${olderA.title} — ${olderA.painter.name}` },
        { value: olderB.id, label: `${olderB.title} — ${olderB.painter.name}` },
      ],
      answer: older.id,
      explanation: `„${older.title}“ entstand ${older.year} und damit früher als das Vergleichswerk.`,
    },
  ];
}
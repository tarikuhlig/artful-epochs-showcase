import { artPathWithWorks } from "@/lib/art-path";
import { stationQuizSets } from "@/lib/art-path-quiz";

export type ArtQuestion = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  image?: string;
  compare?: { src: string; label: string; caption: string }[];
};

function yearNumber(year: string): number {
  const match = year.match(/\d{3,4}/);
  return match ? Number(match[0]) : 0;
}

function shuffle<T>(items: T[], seed: number): T[] {
  const copy = [...items];
  let state = seed * 9301 + 49297;
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

/** Zehn Fragen je Station: drei kuratierte, sieben aus dem Katalog erzeugte (inkl. Bildvergleich). */
export function stationQuestions(index: number): ArtQuestion[] {
  const station = artPathWithWorks[index];
  if (!station) return [];
  const curated: ArtQuestion[] = (stationQuizSets[index] ?? []).map((quiz) => ({
    question: quiz.question,
    options: [...quiz.options],
    answer: quiz.answer,
    explanation: quiz.explanation,
  }));

  const artists = station.artistProfiles;
  const names = artists.map((artist) => artist.name);
  const generated: ArtQuestion[] = [];

  // 1. Bildzuordnung – Werk aus dem Katalog eines Stationskünstlers
  artists.forEach((artist, position) => {
    const work = artist.works[position % Math.max(1, artist.works.length)] ?? artist.works[0];
    if (!work) return;
    const wrong = names.filter((name) => name !== artist.name).slice(0, 2);
    if (wrong.length < 2) return;
    generated.push({
      question: `Von wem stammt dieses Werk — «${work.title}»?`,
      options: shuffle([artist.name, ...wrong], index + position + 1),
      answer: artist.name,
      explanation: `${work.title} (${work.year}) malte ${artist.name} (${artist.life}).`,
      image: work.image,
    });
  });

  // 2. Jahreszahl
  const dated = station.works[0];
  if (dated) {
    const year = yearNumber(dated.year);
    generated.push({
      question: `In welchem Zeitraum entstand «${dated.title}»?`,
      options: shuffle([dated.year, `${year - 40}`, `${year + 60}`], index + 7),
      answer: dated.year,
      explanation: `${dated.title} entstand ${dated.year} — mitten in der Epoche ${station.era}.`,
    });
  }

  // 3. Bildvergleich – zwei Werke verschiedener Künstler nebeneinander
  const first = artists[0]?.works[0];
  const second = artists[1]?.works[0];
  if (first && second && artists[0] && artists[1]) {
    generated.push({
      question: `Welches der beiden Bilder malte ${artists[0].name}?`,
      options: ["Linkes Bild", "Rechtes Bild"],
      answer: "Linkes Bild",
      explanation: `Links: ${first.title} von ${artists[0].name}. Rechts: ${second.title} von ${artists[1].name}.`,
      compare: [
        { src: first.image, label: "Linkes Bild", caption: "A" },
        { src: second.image, label: "Rechtes Bild", caption: "B" },
      ],
    });
    generated.push({
      question: "Welches der beiden Werke entstand früher?",
      options: ["Linkes Bild", "Rechtes Bild"],
      answer: yearNumber(first.year) <= yearNumber(second.year) ? "Linkes Bild" : "Rechtes Bild",
      explanation: `${first.title} (${first.year}) gegenüber ${second.title} (${second.year}).`,
      compare: [
        { src: first.image, label: "Linkes Bild", caption: first.year },
        { src: second.image, label: "Rechtes Bild", caption: second.year },
      ],
    });
  }

  // 4. Epoche zuordnen
  const otherEras = artPathWithWorks
    .filter((item) => item.index !== index)
    .map((item) => item.era)
    .filter((era) => era !== station.era);
  if (station.work && otherEras.length >= 2) {
    generated.push({
      question: `Zu welcher Epoche zählt «${station.work.title}»?`,
      options: shuffle([station.era, otherEras[0] as string, otherEras[otherEras.length - 1] as string], index + 3),
      answer: station.era,
      explanation: `${station.work.title} gehört zur Epoche ${station.era} (${station.years}).`,
      image: station.work.image,
    });
  }

  // 5. Ort der Epoche
  const otherPlaces = artPathWithWorks
    .filter((item) => item.index !== index)
    .map((item) => item.place)
    .filter((place) => place !== station.place);
  if (otherPlaces.length >= 2) {
    generated.push({
      question: `Wo liegt das Zentrum dieser Epoche?`,
      options: shuffle([station.place, otherPlaces[0] as string, otherPlaces[1] as string], index + 11),
      answer: station.place,
      explanation: `${station.era} entfaltet sich vor allem in ${station.place} (${station.years}).`,
    });
  }

  // 6. Wendepunkt der Epoche
  const otherTurns = artPathWithWorks.filter((item) => item.index !== index);
  if (otherTurns.length >= 2) {
    const wrongA = otherTurns[0]?.turningPoint;
    const wrongB = otherTurns[otherTurns.length - 1]?.turningPoint;
    if (wrongA && wrongB) {
      const short = (text: string) => (text.length > 110 ? `${text.slice(0, 108)}…` : text);
      generated.push({
        question: "Welcher Satz beschreibt den Wendepunkt dieser Epoche?",
        options: shuffle([short(station.turningPoint), short(wrongA), short(wrongB)], index + 5),
        answer: short(station.turningPoint),
        explanation: station.turningPoint,
      });
    }
  }

  const attribution = generated.filter((q) => q.image && !q.compare);
  const compares = generated.filter((q) => q.compare);
  const rest = generated.filter((q) => !q.image && !q.compare);
  const mixed = [
    attribution[0], compares[0], attribution[1], compares[1],
    rest[0], attribution[2], rest[1], rest[2], attribution[3],
  ].filter((q): q is ArtQuestion => Boolean(q));
  const generatedOrdered = mixed;
  generated.length = 0;
  generated.push(...generatedOrdered);
  const all = [...curated, ...generated];
  const ordered: ArtQuestion[] = [];
  // kuratierte und erzeugte Fragen abwechselnd
  for (let i = 0; i < Math.max(curated.length, generated.length); i++) {
    if (curated[i]) ordered.push(curated[i] as ArtQuestion);
    if (generated[i]) ordered.push(generated[i] as ArtQuestion);
  }
  const unique = ordered.length >= 9 ? ordered : all;
  return unique.slice(0, 9);
}

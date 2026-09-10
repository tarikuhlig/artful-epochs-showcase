/**
 * „Erkenne die Epoche" — tägliches Spiel aus dem eigenen Katalog.
 * Deterministisch aus Datum und Runde erzeugt, damit Oberfläche und
 * Server-Prüfung immer dieselben Aufgaben sehen. Keine externen Abrufe.
 */
import { allWorks } from "@/lib/art-data";
import { epochGuides } from "@/lib/epoch-guide";

export const EPOCH_GAME_ROUNDS_PER_DAY = 3;
export const EPOCH_GAME_CARDS = 4;
export const EPOCH_GAME_COINS_PER_HIT = 40;

export type EpochGameCard = {
  workId: string;
  title: string;
  image: string;
  options: string[];
  answer: string;
  hint: string;
};

const guidedSlugs = Object.keys(epochGuides);
const pool = allWorks.filter((work) => guidedSlugs.includes(work.epoch.slug) && !!work.image);
const epochNames = guidedSlugs.map((slug) => pool.find((work) => work.epoch.slug === slug)?.epoch.name).filter(Boolean) as string[];

function seed(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pick<T>(list: T[], key: string, index: number) {
  return list[(seed(`${key}:${index}`) % list.length + list.length) % list.length] as T;
}

export function epochGameRound(date: string, round: number): EpochGameCard[] {
  if (pool.length === 0) return [];
  const cards: EpochGameCard[] = [];
  const used = new Set<string>();
  let cursor = 0;
  while (cards.length < EPOCH_GAME_CARDS && cursor < EPOCH_GAME_CARDS * 40) {
    const work = pick(pool, `${date}:${round}:work`, cursor);
    cursor += 1;
    if (!work || used.has(work.id)) continue;
    used.add(work.id);
    const answer = work.epoch.name;
    const distractors = epochNames.filter((name) => name !== answer);
    const options = [answer];
    let step = 0;
    while (options.length < 4 && step < 60) {
      const candidate = pick(distractors, `${date}:${round}:${work.id}:opt`, step);
      step += 1;
      if (candidate && !options.includes(candidate)) options.push(candidate);
    }
    options.sort((a, b) => (seed(`${work.id}:${a}`) % 1000) - (seed(`${work.id}:${b}`) % 1000));
    cards.push({
      workId: work.id,
      title: work.title,
      image: work.image,
      options,
      answer,
      hint: work.styles[0] ?? work.technique,
    });
  }
  return cards;
}

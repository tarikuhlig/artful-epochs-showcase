import { allWorks } from "@/lib/art-data";

export type CardQuizCard = {
  workId: string;
  title: string;
  year: string;
  image: string;
  options: string[];
  answer: string;
};

export const CARD_QUIZ_ROUNDS_PER_DAY = 8;
export const CARD_QUIZ_CARDS = 8;

function seedFrom(text: string): number {
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash);
}

function nextRandom(state: number): number {
  return (state * 1103515245 + 12345) % 2147483648;
}

function pick<T>(items: T[], state: number, count: number): { picked: T[]; state: number } {
  const pool = [...items];
  const picked: T[] = [];
  let current = state;
  while (picked.length < count && pool.length > 0) {
    current = nextRandom(current);
    const index = current % pool.length;
    picked.push(pool.splice(index, 1)[0] as T);
  }
  return { picked, state: current };
}

/** Acht Bildkarten für eine Runde — täglich und pro Runde identisch auf Client und Server. */
export function cardQuizRound(dateISO: string, round: number): CardQuizCard[] {
  const painterNames = Array.from(new Set(allWorks.map((work) => work.painter.name)));
  let state = seedFrom(`${dateISO}#${round}`) % 2147483648;
  const chosen = pick(allWorks, state, CARD_QUIZ_CARDS);
  state = chosen.state;
  return chosen.picked.map((work) => {
    const others = painterNames.filter((name) => name !== work.painter.name);
    const wrong = pick(others, state + work.id.length, 2);
    state = wrong.state;
    const options = [work.painter.name, ...wrong.picked];
    // deterministisch mischen
    const rotate = seedFrom(work.id) % options.length;
    const shuffled = [...options.slice(rotate), ...options.slice(0, rotate)];
    return {
      workId: work.id,
      title: work.title,
      year: work.year,
      image: work.image,
      options: shuffled,
      answer: work.painter.name,
    };
  });
}

/** 10 Coins je Treffer, 20 Bonus bei 8/8 — bis zu 800 Coins pro Tag. */
export function cardQuizReward(score: number): number {
  return score * 10 + (score === CARD_QUIZ_CARDS ? 20 : 0);
}

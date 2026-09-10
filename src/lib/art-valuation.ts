/**
 * Deterministische Bewertung jedes Werks im Katalog.
 * Dieselbe Rechnung läuft in der Oberfläche und in der Server-Funktion,
 * damit angezeigter und abgebuchter Preis immer identisch sind.
 */
import { allWorks } from "@/lib/art-data";

const MIN_PRICE = 450;
const MAX_PRICE = 2400;

/** Aufpreis für den sofortigen Erwerb außerhalb der Tagesrotation. */
export const PRIVATE_AUCTION_SURCHARGE = 0.4;

function hashNorm(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return ((hash >>> 0) % 10000) / 10000;
}

const worksPerPainter = new Map<string, number>();
for (const work of allWorks) {
  worksPerPainter.set(work.painter.slug, (worksPerPainter.get(work.painter.slug) ?? 0) + 1);
}
const maxWorksPerPainter = Math.max(1, ...worksPerPainter.values());

function round10(value: number) {
  return Math.round(value / 10) * 10;
}

/** Schätzwert eines Werks in Provenance-Coins (450 – 2400). */
export function workEstimate(workId: string) {
  const work = allWorks.find((entry) => entry.id === workId);
  if (!work) return MAX_PRICE;
  const prominence = (worksPerPainter.get(work.painter.slug) ?? 1) / maxWorksPerPainter;
  const richness = Math.min(1, (work.significance.length + work.reception.length) / 900);
  const factor = 0.45 * hashNorm(work.id) + 0.35 * prominence + 0.2 * richness;
  return round10(MIN_PRICE + factor * (MAX_PRICE - MIN_PRICE));
}

/** Preis in der Privatauktion — Schätzwert plus Aufpreis. */
export function privateAuctionPrice(workId: string) {
  return round10(workEstimate(workId) * (1 + PRIVATE_AUCTION_SURCHARGE));
}

/** Anteil des Schätzwerts, den ein Verkauf aus der Sammlung einbringt. */
export const SELL_RATE = 0.6;

/** Verkaufserlös eines gesammelten Werks in Coins. */
export function sellPrice(workId: string) {
  return round10(workEstimate(workId) * SELL_RATE);
}

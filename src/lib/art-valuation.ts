/**
 * Deterministische Bewertung jedes Werks im Katalog.
 * Dieselbe Rechnung läuft in der Oberfläche und in der Server-Funktion,
 * damit angezeigter und abgebuchter Preis immer identisch sind.
 */
import { allWorks } from "@/lib/art-data";

const MIN_PRICE = 320;
const MAX_PRICE = 1700;

/** Aufpreis für den sofortigen Erwerb außerhalb der Tagesrotation. */
export const PRIVATE_AUCTION_SURCHARGE = 0.25;

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

/**
 * Legendäre Werke: Ikonen der Kunstgeschichte. Sie kosten ein Vielfaches
 * eines normalen Loses und sind das große Fernziel jeder Sammlung.
 */
export const LEGENDARY_ESTIMATES: Record<string, number> = {
  "mona-lisa": 60000,
  sternennacht: 48000,
  "der-schrei": 44000,
  "erschaffung-adams": 38000,
  "maedchen-mit-perlenohrring": 36000,
  "das-abendmahl": 36000,
  nachtwache: 34000,
  "las-meninas": 34000,
  "geburt-der-venus": 32000,
  "der-kuss": 32000,
  "schule-von-athen": 28000,
  sonnenblumen: 28000,
  primavera: 26000,
  "der-garten-der-lueste": 24000,
  "wanderer-nebelmeer": 24000,
  "arnolfini-hochzeit": 22000,
  "dame-mit-dem-hermelin": 22000,
  "freiheit-fuehrt-das-volk": 22000,
  "impression-sonnenaufgang": 20000,
  "das-floss-der-medusa": 18000,
  "turmbau-zu-babel": 18000,
  seerosen: 18000,
  "vincents-schlafzimmer-in-arles": 16800,
  "die-jaeger-im-schnee": 16000,
  "fruehstueck-im-gruenen": 16000,
  "vitruvianischer-mensch": 16000,
  "der-dritte-mai": 16000,
  olympia: 15200,
  "berufung-des-matthaeus": 14000,
  "isenheimer-altar": 14000,
  "judith-enthauptet-holofernes": 14000,
  saturn: 14000,
  ophelia: 12800,
  "die-anatomie-des-dr-tulp": 12000,
  "venus-vor-dem-spiegel": 12000,
  "die-kaempfende-temeraire": 12000,
  "woher-kommen-wir": 12000,
  "moench-am-meer": 11200,
};

/** Ist dieses Werk eine Legende? */
export function isLegendary(workId: string) {
  return workId in LEGENDARY_ESTIMATES;
}

/** Schätzwert eines Werks in Provenance-Coins (320 – 1700, Legenden weit darüber). */
export function workEstimate(workId: string) {
  const legendary = LEGENDARY_ESTIMATES[workId];
  if (legendary) return legendary;
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

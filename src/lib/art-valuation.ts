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

/**
 * Legendäre Werke: Ikonen der Kunstgeschichte. Sie kosten ein Vielfaches
 * eines normalen Loses und sind das große Fernziel jeder Sammlung.
 */
export const LEGENDARY_ESTIMATES: Record<string, number> = {
  "mona-lisa": 150000,
  sternennacht: 120000,
  "der-schrei": 110000,
  "erschaffung-adams": 95000,
  "maedchen-mit-perlenohrring": 90000,
  "das-abendmahl": 90000,
  nachtwache: 85000,
  "las-meninas": 85000,
  "geburt-der-venus": 80000,
  "der-kuss": 80000,
  "schule-von-athen": 70000,
  sonnenblumen: 70000,
  primavera: 65000,
  "der-garten-der-lueste": 60000,
  "wanderer-nebelmeer": 60000,
  "arnolfini-hochzeit": 55000,
  "dame-mit-dem-hermelin": 55000,
  "freiheit-fuehrt-das-volk": 55000,
  "impression-sonnenaufgang": 50000,
  "das-floss-der-medusa": 45000,
  "turmbau-zu-babel": 45000,
  seerosen: 45000,
  "vincents-schlafzimmer-in-arles": 42000,
  "die-jaeger-im-schnee": 40000,
  "fruehstueck-im-gruenen": 40000,
  "vitruvianischer-mensch": 40000,
  "der-dritte-mai": 40000,
  olympia: 38000,
  "berufung-des-matthaeus": 35000,
  "isenheimer-altar": 35000,
  "judith-enthauptet-holofernes": 35000,
  saturn: 35000,
  ophelia: 32000,
  "die-anatomie-des-dr-tulp": 30000,
  "venus-vor-dem-spiegel": 30000,
  "die-kaempfende-temeraire": 30000,
  "woher-kommen-wir": 30000,
  "moench-am-meer": 28000,
};

/** Ist dieses Werk eine Legende? */
export function isLegendary(workId: string) {
  return workId in LEGENDARY_ESTIMATES;
}

/** Schätzwert eines Werks in Provenance-Coins (450 – 2400, Legenden weit darüber). */
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

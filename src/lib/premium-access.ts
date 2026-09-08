import { allPainters, allWorks, epochs } from "@/lib/art-data";
import { museums } from "@/lib/museums";

export const MONTHLY_PRICE = "7,99 €";
export const YEARLY_PRICE = "59,99 €";
export const FREE_SHARE_LABEL = "15 % gratis";
export const FREE_JOURNEY_STATIONS = 2;

function isInFreeSelection(id: string, orderedIds: string[]) {
  const index = orderedIds.indexOf(id);
  return index >= 0 && index % 20 < 3;
}

const chronologicalEpochIds = [...epochs]
  .sort((a, b) => Number(a.period.match(/\d{3,4}/)?.[0] ?? 9999) - Number(b.period.match(/\d{3,4}/)?.[0] ?? 9999))
  .map((epoch) => epoch.slug);

export function isFreeEpoch(slug: string) {
  return chronologicalEpochIds.slice(0, FREE_JOURNEY_STATIONS).includes(slug);
}

export function isFreePainter(slug: string) {
  return isInFreeSelection(slug, allPainters.map((painter) => painter.slug));
}

export function isFreeWork(id: string) {
  return isInFreeSelection(id, allWorks.map((work) => work.id));
}

export function isFreeMuseum(slug: string) {
  return isInFreeSelection(slug, museums.map((museum) => museum.slug));
}

export function isFreeJourneyStation(index: number) {
  return index < FREE_JOURNEY_STATIONS;
}
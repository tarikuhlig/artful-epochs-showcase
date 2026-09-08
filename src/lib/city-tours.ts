import { cities, type City, type Museum } from "@/lib/museums";
import { getVisitInfo } from "@/lib/museum-info";
import { journeys } from "@/lib/journeys";

export type TourStop = {
  slot: string;
  museum: Museum;
  highlight?: { id: string; title: string; painter: string } | undefined;
  hours?: string | undefined;
  tip?: string | undefined;
  minutes: number;
};

export type CityTour = {
  city: string;
  country: string;
  title: string;
  summary: string;
  totalMinutes: number;
  stops: TourStop[];
  journeySlug?: string | undefined;
};

/** Stadt -> passende geführte Kunstreise */
export const JOURNEY_BY_CITY: Record<string, string> = {
  Florenz: "florenz-der-medici",
  Amsterdam: "amsterdam-goldenes-zeitalter",
  Paris: "paris-1874",
  München: "wege-in-die-abstraktion",
  "New York": "new-yorker-schule",
  Köln: "nachkriegsmalerei",
};

const SLOTS = ["9:30 Uhr", "12:00 Uhr", "14:30 Uhr", "16:30 Uhr"];

function firstSentence(text?: string) {
  if (!text) return undefined;
  const m = text.match(/^[^.!?]+[.!?]/);
  return (m ? m[0] : text).trim();
}

export function buildCityTour(city: City): CityTour {
  const ordered = [...city.museums].sort((a, b) => b.works.length - a.works.length);
  const stops: TourStop[] = ordered.slice(0, 4).map((m, i) => {
    const info = getVisitInfo(m.slug);
    const w = m.works[0];
    return {
      slot: SLOTS[i] ?? "flexibel",
      museum: m,
      highlight: w ? { id: w.id, title: w.title, painter: w.painter.name } : undefined,
      hours: info?.hours,
      tip: firstSentence(info?.tip),
      minutes: m.works.length > 3 ? 150 : m.works.length > 1 ? 105 : 60,
    };
  });
  const totalMinutes = stops.reduce((n, s) => n + s.minutes, 0);
  return {
    city: city.city,
    country: city.country,
    title: `Ein Kunsttag in ${city.city}`,
    summary:
      stops.length > 1
        ? `${stops.length} Häuser, ${city.workCount} Werke aus dem Katalog — von morgens bis zum späten Nachmittag zu Fuß machbar.`
        : `Ein Haus, ${city.workCount} ${city.workCount === 1 ? "Werk" : "Werke"} aus dem Katalog — gut als Halbtagesbesuch.`,
    totalMinutes,
    stops,
    journeySlug: JOURNEY_BY_CITY[city.city],
  };
}

export function cityTour(cityName: string): CityTour | undefined {
  const c = cities.find((x) => x.city === cityName);
  return c ? buildCityTour(c) : undefined;
}

export function journeyForCity(cityName: string) {
  const slug = JOURNEY_BY_CITY[cityName];
  return slug ? journeys.find((j) => j.slug === slug) : undefined;
}

export function formatDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} Std. ${m} Min.` : `${h} Std.`;
}

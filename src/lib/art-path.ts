import { allPainters, allWorks, type Work } from "@/lib/art-data";
import { stationContent, type StationContent } from "@/lib/art-path-content";

type CatalogPainter = (typeof allPainters)[number];

export type ArtPathStation = StationContent & {
  index: number;
  coinReward: number;
};

const aliases: Record<string, string> = {
  "J. M. W. Turner": "william-turner",
  "Édouard Manet": "edouard-manet",
};

function findPainter(name: string): CatalogPainter | undefined {
  const alias = aliases[name];
  if (alias) return allPainters.find((painter) => painter.slug === alias);
  return allPainters.find((painter) => painter.name === name);
}

/**
 * Coin-Ökonomie: Die Reise trägt 50 % des Gesamtbudgets (21.000 Coins).
 * Muss mit `complete_art_path_station_for_user` in der Datenbank übereinstimmen.
 */
export const STATION_REWARD = 650;
export const MILESTONE_REWARD = 900;

export const artPath: ArtPathStation[] = stationContent.map((content, index) => ({
  ...content,
  index,
  coinReward: (index + 1) % 5 === 0 ? MILESTONE_REWARD : STATION_REWARD,
}));

export type ArtPathStationWithWorks = ArtPathStation & {
  /** Alias, damit bestehende Karten weiter auf station.atelier zugreifen können. */
  atelier: StationContent;
  artistProfiles: CatalogPainter[];
  /** Ein Schlüsselwerk je Künstler — genau die Werke, die auf der Station studiert werden. */
  works: Work[];
  work: Work | undefined;
};

export const artPathWithWorks: ArtPathStationWithWorks[] = artPath.map((station) => {
  const artistProfiles = station.artists
    .map((name) => findPainter(name))
    .filter((painter): painter is CatalogPainter => painter !== undefined);
  const works = artistProfiles
    .map((painter) => allWorks.find((work) => work.painter.slug === painter.slug))
    .filter((work): work is Work => work !== undefined);
  return {
    ...station,
    atelier: station,
    artistProfiles,
    works,
    work: works[0],
  };
});

export const totalArtPathCoins = artPath.reduce((sum, station) => sum + station.coinReward, 0);

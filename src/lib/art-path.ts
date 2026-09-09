import { allPainters, type Painter, type Work } from "@/lib/art-data";
import { stationContent, type StationContent } from "@/lib/art-path-content";

export type ArtPathStation = StationContent & {
  index: number;
  coinReward: number;
};

const aliases: Record<string, string> = {
  "J. M. W. Turner": "william-turner",
  "Édouard Manet": "edouard-manet",
  "Piet Mondrian": "piet-mondrian",
};

function findPainter(name: string): Painter | undefined {
  const alias = aliases[name];
  if (alias) return allPainters.find((painter) => painter.slug === alias);
  return allPainters.find((painter) => painter.name === name);
}

export const artPath: ArtPathStation[] = stationContent.map((content, index) => ({
  ...content,
  index,
  coinReward: (index + 1) % 5 === 0 ? 80 : 40,
}));

export type ArtPathStationWithWorks = ArtPathStation & {
  atelier: StationContent;
  artistProfiles: Painter[];
  /** Ein Schlüsselwerk je Künstler — die Werke, die auf der Station studiert werden. */
  works: Work[];
  work: Work | undefined;
};

export const artPathWithWorks: ArtPathStationWithWorks[] = artPath.map((station) => {
  const artistProfiles = station.artists
    .map((name) => findPainter(name))
    .filter((painter): painter is Painter => painter !== undefined);
  const works = artistProfiles
    .map((painter) => painter.works[0])
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

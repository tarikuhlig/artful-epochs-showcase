import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import land from "world-atlas/land-110m.json";
import { artPath } from "@/lib/art-path";

type JourneyMapProps = {
  activeIndex: number;
  unlockedThrough: number;
};

const mapWidth = 720;
const mapHeight = 300;
const topology = land as unknown as Topology<{ land: GeometryCollection }>;
const geography = feature(topology, topology.objects.land);
const projection = geoNaturalEarth1().fitExtent(
  [[12, 12], [mapWidth - 12, mapHeight - 12]],
  geography,
);
const landPath = geoPath(projection)(geography);

export function ArtJourneyMap({ activeIndex, unlockedThrough }: JourneyMapProps) {
  const active = artPath[activeIndex];
  if (!active || !landPath) return null;

  const route = artPath
    .slice(0, Math.max(activeIndex + 1, 1))
    .map((station) => projection([station.lon, station.lat]))
    .filter((point): point is [number, number] => point !== null)
    .map((point) => point.join(","))
    .join(" ");

  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-path-sky">
      <svg
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        role="img"
        aria-label={`Karte der Kunstreise bis ${active.place}`}
        className="h-auto w-full"
      >
        <path d={landPath} className="fill-background stroke-border" strokeWidth="0.8" />
        {route && <polyline points={route} fill="none" className="stroke-coin" strokeWidth="2" strokeDasharray="5 6" />}
        {artPath.map((station) => {
          const point = projection([station.lon, station.lat]);
          if (!point) return null;
          const isActive = station.index === activeIndex;
          const isUnlocked = station.index <= unlockedThrough;
          return (
            <g key={station.index} transform={`translate(${point[0]} ${point[1]})`}>
              {isActive && <circle r="10" className="fill-coin-soft stroke-coin" strokeWidth="1.5" />}
              <circle r={isActive ? 4.5 : 3} className={isUnlocked ? "fill-coin" : "fill-muted-foreground"} />
            </g>
          );
        })}
      </svg>
      <figcaption className="flex items-center justify-between gap-3 border-t border-border bg-background px-4 py-3 text-xs">
        <span className="font-medium">{active.place}</span>
        <span className="text-muted-foreground">Station {active.index + 1} von {artPath.length}</span>
      </figcaption>
    </figure>
  );
}

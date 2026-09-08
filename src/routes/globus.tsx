import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Coins, Lock, MapPin } from "lucide-react";
import type { GlobeMarker } from "@/components/Globe3D";
import { artPathWithWorks } from "@/lib/art-path";
import { useArtPathProgress } from "@/lib/economy";
import studioBg from "@/assets/atelier-globe-room.jpg";

const Globe3D = lazy(() => import("@/components/Globe3D").then((m) => ({ default: m.Globe3D })));

export const Route = createFileRoute("/globus")({
  head: () => ({ meta: [
    { title: "Abenteuer-Globus — der Weltpfad der Kunst | Provenance" },
    { name: "description", content: "Drehe den antiken Globus und folge dem Kunstpfad von Brügge über Florenz und Paris bis New York." },
    { property: "og:title", content: "Abenteuer-Globus | Provenance" },
    { property: "og:description", content: "Eine spielbare Weltreise durch die Wendepunkte der Kunstgeschichte." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}), component: GlobePage,
});

function GlobePage() {
  const [mounted, setMounted] = useState(false);
  const { data: progress = [] } = useArtPathProgress();
  const [selected, setSelected] = useState("station-0");
  useEffect(() => setMounted(true), []);
  const markers: GlobeMarker[] = useMemo(() => artPathWithWorks.map((s) => ({ id: `station-${s.index}`, label: s.title, sublabel: s.place, lat: s.lat, lon: s.lon, weight: s.coinReward / 10 })), []);
  const index = Number(selected.replace("station-", ""));
  const station = artPathWithWorks[index] ?? artPathWithWorks[0];
  const done = new Set(progress.map((p) => p.station_index));
  const unlocked = index <= progress.length;
  return <div className="min-h-screen bg-background">
    <section className="mx-auto max-w-7xl px-0 pt-8 md:px-6 md:pt-14">
      <div className="px-5 md:px-0"><p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Der Weltpfad</p><h1 className="font-display mt-3 max-w-4xl text-4xl font-medium md:text-6xl">Drehe die Welt durch die Kunstgeschichte</h1><p className="mt-4 max-w-2xl text-muted-foreground">Die rote Route folgt zwölf Wendepunkten von alt bis neu. Jeder Stopp öffnet das nächste Kapitel.</p></div>
      <div className="relative mt-8 min-h-[74vh] overflow-hidden border-y border-border md:rounded-lg md:border">
        <img src={studioBg} alt="Historisches Atelier mit antikem Globus" width={1920} height={1280} className="absolute inset-0 h-full w-full object-cover object-center saturate-[0.7]" />
        <div className="absolute inset-0 bg-background/15" />
        <div className="relative grid min-h-[74vh] items-center lg:grid-cols-[1fr_340px]">
          <div className="min-w-0 p-0 sm:p-4 lg:p-0">{mounted ? <Suspense fallback={<div className="aspect-square" />}><Globe3D markers={markers} selectedId={selected} onSelect={setSelected} routeMode /></Suspense> : <div className="aspect-square" />}</div>
          {station && <aside className="m-4 rounded-lg border border-border bg-background/92 p-6 shadow-xl backdrop-blur-md lg:mr-8 lg:ml-0">
            <div className="flex items-center justify-between gap-3"><p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Station {station.index + 1} · {station.era}</p>{done.has(index) ? <Check className="h-4 w-4 text-primary" /> : !unlocked ? <Lock className="h-4 w-4 text-muted-foreground" /> : null}</div>
            {station.work && <img src={station.work.image} alt={station.work.title} loading="lazy" className="mt-4 aspect-[4/3] w-full rounded-md object-cover" />}
            <h2 className="font-display mt-4 text-2xl font-medium">{station.title}</h2><p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{station.place} · {station.years}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{unlocked ? station.lesson : "Diese Etappe wird sichtbar, sobald du die vorherige Station abgeschlossen hast."}</p>
            <div className="mt-5 flex items-center justify-between"><span className="flex items-center gap-1.5 text-sm text-coin"><Coins className="h-4 w-4" />+{station.coinReward}</span><Link to="/kunstpfad" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground">Zum Pfad <ArrowRight className="h-4 w-4" /></Link></div>
          </aside>}
        </div>
      </div>
      <div className="flex snap-x gap-2 overflow-x-auto px-5 py-5 md:px-0">{artPathWithWorks.map((s) => <button type="button" key={s.index} onClick={() => setSelected(`station-${s.index}`)} className={`shrink-0 rounded-full border px-4 py-2 text-sm ${selected === `station-${s.index}` ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background"}`}>{done.has(s.index) ? "✓ " : ""}{s.index + 1}. {s.place.split(" · ")[0]}</button>)}</div>
    </section>
  </div>;
}
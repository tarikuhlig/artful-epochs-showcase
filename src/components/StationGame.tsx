import { useEffect, useMemo, useState } from "react";
import { Check, Gamepad2, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Work } from "@/lib/art-data";

/** Feste Mischung je Station — gleiche Reihenfolge bei jedem Öffnen, kein Springen. */
function shuffle<T>(items: T[], seed: number): T[] {
  const list = [...items];
  let value = seed * 9301 + 49297;
  for (let i = list.length - 1; i > 0; i--) {
    value = (value * 9301 + 49297) % 233280;
    const j = Math.floor((value / 233280) * (i + 1));
    const a = list[i]!;
    const b = list[j]!;
    list[i] = b;
    list[j] = a;
  }
  return list;
}

function yearOf(work: Work): number {
  const match = String(work.year).match(/\d{3,4}/);
  return match ? Number(match[0]) : 0;
}

/**
 * Interaktiver Moment jeder Station: erst Werke den Malern zuordnen,
 * danach die gleichen Werke zeitlich ordnen. Beides lässt sich nur mit
 * dem Wissen aus den vorherigen Karten lösen.
 */
export function StationGame({ works, seed, era, onSolved }: { works: Work[]; seed: number; era: string; onSolved?: () => void }) {
  const pool = works.slice(0, 4);
  const painters = useMemo(() => shuffle(pool.map((work) => work.painter.name), seed + 3), [pool, seed]);
  const shuffled = useMemo(() => shuffle(pool, seed + 7), [pool, seed]);

  const [phase, setPhase] = useState<"match" | "order">("match");
  const [activeWork, setActiveWork] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, boolean>>({});
  const [missName, setMissName] = useState("");
  const [order, setOrder] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const matchedCount = Object.values(matched).filter(Boolean).length;
  const matchDone = matchedCount === pool.length && pool.length > 0;

  function pickPainter(name: string) {
    if (!activeWork) return;
    const work = pool.find((item) => item.id === activeWork);
    if (!work) return;
    if (work.painter.name === name) {
      setMatched((current) => ({ ...current, [work.id]: true }));
      setMissName("");
    } else {
      setMissName(`${name} passt hier nicht — schau dir noch einmal die Künstlerkarten an.`);
    }
    setActiveWork(null);
  }

  const correctOrder = [...pool].sort((a, b) => yearOf(a) - yearOf(b)).map((work) => work.id);
  const orderRight = checked && order.length === pool.length && order.every((id, index) => id === correctOrder[index]);

  /** Erst wenn das Rätsel geprüft (oder gar nicht spielbar) ist, geht die Reise weiter. */
  const tooFewWorks = pool.length < 2;
  useEffect(() => {
    if (checked || tooFewWorks) onSolved?.();
  }, [checked, tooFewWorks, onSolved]);

  if (tooFewWorks) {
    return <div className="flex min-h-[570px] items-center justify-center p-8 text-muted-foreground sm:min-h-[610px]">Für diese Station wird das Spiel noch vorbereitet.</div>;
  }

  return <div className="min-h-[570px] overflow-y-auto p-6 sm:min-h-[610px] sm:p-9">
    <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Gamepad2 className="h-4 w-4" /> Atelier-Spiel</div>
    <h3 className="font-display mt-3 text-3xl font-medium">{phase === "match" ? "Wer hat was gemalt?" : "Zeiträtsel"}</h3>
    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
      {phase === "match"
        ? `Tippe ein Werk aus ${era} an und wähle darunter den Maler. Alle Namen kennst du aus den Künstlerkarten.`
        : "Tippe die Werke in der Reihenfolge an, in der sie entstanden sind — vom ältesten zum jüngsten."}
    </p>

    {phase === "match" && <>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {shuffled.map((work) => {
          const solved = matched[work.id];
          const active = activeWork === work.id;
          return <button key={work.id} type="button" disabled={solved} onClick={() => setActiveWork(active ? null : work.id)} className={`overflow-hidden rounded-xl border text-left transition-colors ${solved ? "border-foreground bg-path-leaf" : active ? "border-foreground" : "border-border hover:border-foreground/40"}`}>
            <div className="aspect-[4/3] bg-muted p-1.5"><img src={work.image} alt={work.title} loading="lazy" className="h-full w-full object-contain" /></div>
            <p className="px-2.5 py-2 text-[11px] leading-snug">{solved ? <span className="font-medium">{work.painter.name}</span> : <span className="text-muted-foreground">{work.title}</span>}</p>
          </button>;
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {painters.map((name) => <Button key={name} type="button" variant="outline" disabled={!activeWork} onClick={() => pickPainter(name)} className="h-auto min-h-11 rounded-full px-4 py-2 text-sm font-normal">{name}</Button>)}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{missName || `${matchedCount} von ${pool.length} zugeordnet`}</p>

      {matchDone && <div className="mt-5 rounded-lg bg-path-leaf p-5">
        <p className="flex items-center gap-2 text-sm"><Check className="h-4 w-4" /> Alle Werke sitzen. Weiter zum Zeiträtsel.</p>
        <Button type="button" onClick={() => setPhase("order")} className="mt-4 h-auto min-h-11 rounded-full px-5">Zeiträtsel starten</Button>
      </div>}
    </>}

    {phase === "order" && <>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {shuffled.map((work) => {
          const position = order.indexOf(work.id);
          const placed = position >= 0;
          const rightSpot = checked && correctOrder[position] === work.id;
          return <button key={work.id} type="button" disabled={checked || placed} onClick={() => setOrder((current) => [...current, work.id])} className={`relative overflow-hidden rounded-xl border text-left transition-colors ${checked ? (rightSpot ? "border-foreground" : "border-destructive/50") : placed ? "border-foreground opacity-70" : "border-border hover:border-foreground/40"}`}>
            {placed && <span className="absolute top-2 left-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs text-background">{position + 1}</span>}
            <div className="aspect-[4/3] bg-muted p-1.5"><img src={work.image} alt={work.title} loading="lazy" className="h-full w-full object-contain" /></div>
            <p className="px-2.5 py-2 text-[11px] leading-snug text-muted-foreground">{work.title}{checked ? ` · ${work.year}` : ""}</p>
          </button>;
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button type="button" disabled={order.length !== pool.length || checked} onClick={() => setChecked(true)} className="h-auto min-h-11 rounded-full px-5">Reihenfolge prüfen</Button>
        <Button type="button" variant="ghost" onClick={() => { setOrder([]); setChecked(false); }} className="h-auto min-h-11 rounded-full px-4 font-normal"><RotateCcw className="h-4 w-4" /> Neu legen</Button>
        <span className="text-sm text-muted-foreground">{order.length} von {pool.length} gelegt</span>
      </div>

      {checked && <div className="mt-5 rounded-lg border border-border p-5 text-sm leading-relaxed">
        <p className="flex items-start gap-2">{orderRight ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />}
          <span>{orderRight ? "Genau richtig — du liest die Zeit aus den Bildern." : "Noch nicht ganz. So verlief die Zeit wirklich:"}</span></p>
        <ol className="mt-3 grid gap-1 text-muted-foreground">
          {correctOrder.map((id, index) => {
            const work = pool.find((item) => item.id === id);
            if (!work) return null;
            return <li key={id}>{index + 1}. {work.year} · {work.title} — {work.painter.name}</li>;
          })}
        </ol>
      </div>}
    </>}
  </div>;
}

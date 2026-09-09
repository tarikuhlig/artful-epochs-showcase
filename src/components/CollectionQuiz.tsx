import { useMemo, useState } from "react";
import { Check, Layers, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allWorks, type Work } from "@/lib/art-data";

type Mode = "painter" | "title" | "year";
const MODES: { value: Mode; label: string }[] = [
  { value: "painter", label: "Wer hat es gemalt?" },
  { value: "title", label: "Wie heißt das Werk?" },
  { value: "year", label: "Aus welchem Jahr?" },
];

function shuffle<T>(items: T[], seed: number): T[] {
  const pool = [...items];
  let state = seed || 1;
  for (let i = pool.length - 1; i > 0; i--) {
    state = (state * 1103515245 + 12345) % 2147483648;
    const j = state % (i + 1);
    [pool[i], pool[j]] = [pool[j] as T, pool[i] as T];
  }
  return pool;
}

function askFor(work: Work, pool: Work[], mode: Mode, seed: number) {
  const value = (item: Work) => mode === "painter" ? item.painter.name : mode === "title" ? item.title : item.year;
  const answer = value(work);
  const others = shuffle(pool.filter((item) => value(item) !== answer), seed).slice(0, 3).map(value);
  return { question: MODES.find((item) => item.value === mode)!.label, answer, options: shuffle([answer, ...others], seed + 7) };
}

/** Abfrage über die eigenen, bereits gesammelten Werke — reines Wiederholen, ohne Coins. */
export function CollectionQuiz({ ownedSlugs }: { ownedSlugs: string[] }) {
  const [mode, setMode] = useState<Mode>("painter");
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState("");
  const [right, setRight] = useState(0);
  const [seen, setSeen] = useState(0);

  const works = useMemo(
    () => ownedSlugs.map((slug) => allWorks.find((work) => work.id === slug)).filter((work): work is Work => !!work),
    [ownedSlugs.join(",")],
  );
  const distractors = works.length >= 4 ? works : allWorks;
  const work = works.length > 0 ? (shuffle(works, round + 31)[0] as Work) : undefined;
  const quiz = useMemo(() => (work ? askFor(work, distractors, mode, round + 5) : null), [work?.id, mode, round]);

  if (works.length === 0) {
    return <section className="rounded-lg border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Layers className="h-4 w-4" /> Sammlungs-Quiz</div>
      <p className="mt-3 text-sm text-muted-foreground">Sobald dein erstes Werk in der Sammlung hängt, kannst du dich hier selbst abfragen.</p>
    </section>;
  }

  function choose(option: string) {
    if (picked || !quiz) return;
    setPicked(option);
    setSeen((value) => value + 1);
    if (option === quiz.answer) setRight((value) => value + 1);
  }

  return <section className="rounded-lg border border-border bg-card p-6 sm:p-8">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Layers className="h-4 w-4" /> Sammlungs-Quiz</div>
        <h3 className="font-display mt-2 text-2xl font-medium">Kennst du deine Werke?</h3>
        <p className="text-sm text-muted-foreground">{right} von {seen} richtig · {works.length} Werke in deiner Sammlung</p>
      </div>
      <Button type="button" variant="ghost" size="sm" onClick={() => { setRight(0); setSeen(0); setPicked(""); setRound((value) => value + 1); }} className="rounded-full font-normal"><RotateCcw className="h-4 w-4" /> Zurücksetzen</Button>
    </div>

    <div className="mt-4 flex flex-wrap gap-2">
      {MODES.map((item) => <Button key={item.value} type="button" size="sm" variant="outline" onClick={() => { setMode(item.value); setPicked(""); setRound((value) => value + 1); }} className={`rounded-full font-normal ${mode === item.value ? "border-foreground bg-path-leaf" : ""}`}>{item.label}</Button>)}
    </div>

    {work && quiz && <div className="mt-6 grid gap-6 md:grid-cols-2">
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
        <img src={work.image} alt={picked ? work.title : "Werk aus deiner Sammlung"} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div>
        <p className="font-display text-lg font-medium">{quiz.question}</p>
        <div className="mt-3 grid gap-2">
          {quiz.options.map((option) => {
            const state = !picked ? "" : option === quiz.answer ? "border-foreground bg-path-leaf" : option === picked ? "border-destructive" : "opacity-60";
            return <Button key={option} type="button" variant="outline" onClick={() => choose(option)} className={`h-auto min-h-11 justify-start whitespace-normal rounded-lg px-4 py-3 text-left font-normal ${state}`}>
              {picked && option === quiz.answer && <Check className="h-4 w-4" />}
              {picked && option === picked && option !== quiz.answer && <X className="h-4 w-4" />}
              {option}
            </Button>;
          })}
        </div>
        {picked && <>
          <p className="mt-4 text-sm text-muted-foreground">{work.title} · {work.painter.name} · {work.year}{work.museum ? ` · ${work.museum}` : ""}</p>
          <Button type="button" onClick={() => { setPicked(""); setRound((value) => value + 1); }} className="mt-4 rounded-full">Nächste Karte</Button>
        </>}
      </div>
    </div>}
  </section>;
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, GraduationCap, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LicenseNotice } from "@/components/LicenseNotice";
import { STUDY_MODES, drawStudyCard, studyEpochs, studyPool, type StudyCard, type StudyMode } from "@/lib/study";
import { allWorks } from "@/lib/art-data";

export const Route = createFileRoute("/studieren")({
  head: () => ({ meta: [
    { title: "Studieren — unendliches Kartenquiz | Provenance" },
    { name: "description", content: "Unendlich viele Lernkarten: Epoche und Frageart selbst wählen und Maler, Titel, Epochen und Jahreszahlen trainieren." },
    { property: "og:title", content: "Studieren — unendliches Kartenquiz | Provenance" },
    { property: "og:description", content: "Stelle dir deinen Kartenstapel selbst zusammen und übe, so lange du willst." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: StudyPage,
});

function StudyPage() {
  const [epochSlug, setEpochSlug] = useState("alle");
  const [mode, setMode] = useState<StudyMode>("painter");
  const [card, setCard] = useState<StudyCard | null>(null);
  const [picked, setPicked] = useState("");
  const [seen, setSeen] = useState(0);
  const [right, setRight] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const pool = useMemo(() => studyPool(epochSlug), [epochSlug]);

  useEffect(() => {
    setCard(drawStudyCard(pool, mode, 0));
    setPicked("");
  }, [pool, mode]);

  function nextCard() {
    setCard(drawStudyCard(pool, mode, seen + 1));
    setPicked("");
  }

  function choose(option: string) {
    if (picked || !card) return;
    setPicked(option);
    setSeen((value) => value + 1);
    if (option === card.answer) {
      setRight((value) => value + 1);
      setStreak((value) => {
        const next = value + 1;
        setBestStreak((best) => Math.max(best, next));
        return next;
      });
    } else {
      setStreak(0);
    }
  }

  function resetStats() {
    setSeen(0); setRight(0); setStreak(0); setBestStreak(0);
    setCard(drawStudyCard(pool, mode, 0));
    setPicked("");
  }

  return <main className="min-h-screen bg-background">
    <header className="border-b border-border">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 md:py-16">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.24em] text-muted-foreground uppercase"><GraduationCap className="h-4 w-4" /> Studieren</div>
        <h1 className="font-display mt-4 text-4xl font-medium md:text-5xl">Dein unendlicher Kartenstapel</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
          Wähle, was du lernen willst — eine Epoche oder alle {allWorks.length} Werke, dazu die Frageart.
          Danach ziehst du Karte um Karte, so lange du magst. Ohne Limit, ohne Tageslimit, kostenlos.
        </p>
      </div>
    </header>

    <section className="mx-auto max-w-5xl px-5 py-8 sm:px-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Was möchtest du lernen?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => setEpochSlug("alle")} className={`h-9 rounded-full px-4 text-xs font-normal ${epochSlug === "alle" ? "border-foreground bg-foreground text-background hover:bg-foreground/90 hover:text-background" : ""}`}>Alle Epochen</Button>
            {studyEpochs.map((epoch) => <Button key={epoch.slug} type="button" variant="outline" onClick={() => setEpochSlug(epoch.slug)} className={`h-9 rounded-full px-4 text-xs font-normal ${epochSlug === epoch.slug ? "border-foreground bg-foreground text-background hover:bg-foreground/90 hover:text-background" : ""}`}>{epoch.name}</Button>)}
          </div>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Frageart</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {STUDY_MODES.map((item) => <Button key={item.value} type="button" variant="outline" onClick={() => setMode(item.value)} className={`h-auto justify-start rounded-lg px-4 py-3 text-left font-normal ${mode === item.value ? "border-foreground bg-path-leaf" : ""}`}>
              <span className="block"><span className="block text-sm">{item.label}</span><span className="block text-xs text-muted-foreground">{item.hint}</span></span>
            </Button>)}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4 text-sm">
        <p>{right} von {seen} richtig</p>
        <p className="text-muted-foreground">Serie: {streak} · Beste Serie: {bestStreak}</p>
        <p className="text-muted-foreground">Kartenpool: {pool.length} Werke</p>
        <Button type="button" variant="ghost" size="sm" onClick={resetStats} className="ml-auto rounded-full font-normal"><RotateCcw className="h-4 w-4" /> Zurücksetzen</Button>
      </div>

      {card ? <article key={card.key} className="mt-6 grid overflow-hidden rounded-lg border border-border bg-card shadow-sm md:grid-cols-[1fr_1fr]">
        <div className="relative min-h-64 bg-muted md:min-h-[440px]">
          <img src={card.work.image} alt={picked ? card.work.title : "Werk erraten"} className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Karte {seen + (picked ? 0 : 1)}</p>
          <h2 className="font-display mt-3 text-2xl font-medium sm:text-3xl">{card.question}</h2>
          <div className="mt-6 grid gap-2">
            {card.options.map((option) => {
              const isRight = option === card.answer;
              const state = !picked ? "" : isRight ? "border-foreground bg-path-leaf" : picked === option ? "border-destructive/40 bg-destructive/5" : "";
              return <Button key={option} type="button" variant="outline" disabled={!!picked} onClick={() => choose(option)} className={`h-auto min-h-11 justify-start whitespace-normal rounded-lg px-4 py-3 text-left font-normal ${state}`}>
                {picked && isRight && <Check className="h-4 w-4" />}
                {picked === option && !isRight && <X className="h-4 w-4 text-destructive" />}
                {option}
              </Button>;
            })}
          </div>
          {picked && <>
            <p className="mt-5 text-sm leading-relaxed">{card.explanation}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button type="button" onClick={nextCard} className="rounded-full">Nächste Karte</Button>
              <Button asChild variant="outline" className="rounded-full font-normal"><Link to="/werke/$id" params={{ id: card.work.id }}>Werk ansehen</Link></Button>
            </div>
          </>}
        </div>
      </article> : <p className="mt-8 text-sm text-muted-foreground">Für diese Auswahl gibt es keine Werke.</p>}

      <LicenseNotice context="Studieren nutzt ausschließlich den gemeinfreien Bestand der App." />
    </section>
  </main>;
}

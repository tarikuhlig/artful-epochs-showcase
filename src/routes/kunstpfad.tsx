import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronRight, Coins, Compass, Lock, MapPin, Palette, X } from "lucide-react";
import { artPathWithWorks, totalArtPathCoins } from "@/lib/art-path";
import { useArtPathProgress } from "@/lib/economy";
import { completePathStation } from "@/lib/economy.functions";
import { useAuth } from "@/hooks/useAuth";
import { useInvalidateFarm } from "@/lib/farm";
import coin from "@/assets/provenance-coin.png";
import { artPathQuizzes } from "@/lib/art-path-quiz";
import { ArtJourneyMap } from "@/components/ArtJourneyMap";

export const Route = createFileRoute("/kunstpfad")({
  head: () => ({ meta: [
    { title: "Reise — Kunstgeschichte Schritt für Schritt | Provenance" },
    { name: "description", content: "Eine spielbare Reise durch zwölf Wendepunkte der Kunstgeschichte — mit Werken, Geschichten und Provenance Coins." },
    { property: "og:title", content: "Die große Reise | Provenance" },
    { property: "og:description", content: "Kunstgeschichte von der Renaissance bis zur Abstraktion Schritt für Schritt erleben." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}),
  component: ArtPathPage,
});

function ArtPathPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: progress = [], refetch } = useArtPathProgress();
  const invalidateFarm = useInvalidateFarm();
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, "correct" | "wrong">>({});
  const completed = new Set(progress.map((entry) => entry.station_index));
  const next = progress.length;

  async function finish(index: number, answer: string) {
    if (!user) { void navigate({ to: "/auth" }); return; }
    const quiz = artPathQuizzes[index];
    if (!quiz || answer !== quiz.answer) {
      setFeedback((current) => ({ ...current, [index]: "wrong" }));
      return;
    }
    setBusy(index); setError("");
    try {
      await completePathStation({ data: { station: index, answer } });
      setFeedback((current) => ({ ...current, [index]: "correct" }));
      await refetch(); invalidateFarm();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Die Station konnte nicht abgeschlossen werden.");
    } finally { setBusy(null); }
  }

  return <div className="min-h-screen bg-background">
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
        <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Die große Reise</p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-medium md:text-6xl">Vom Spiegel zur reinen Farbe</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Zwölf Wendepunkte, ein Weg: Löse jede Station in Reihenfolge und verdiene insgesamt {totalArtPathCoins} Provenance Coins.</p>
        <div className="mt-7 flex items-center gap-4">
          <img src={coin} alt="Provenance Coin" width={1024} height={1024} className="h-12 w-12" />
          <div><p className="font-display text-2xl font-medium">{progress.reduce((sum, p) => sum + p.coin_reward, 0)} Coins verdient</p><p className="text-sm text-muted-foreground">{progress.length} von {artPathWithWorks.length} Stationen</p></div>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6">
      {error && <p className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{error}</p>}
      <ol className="relative space-y-8 before:absolute before:top-6 before:bottom-6 before:left-6 before:w-px before:bg-border sm:before:left-10">
        {artPathWithWorks.map((station) => {
          const done = completed.has(station.index); const unlocked = done || station.index === next; const work = station.work;
          const quiz = artPathQuizzes[station.index]; const selected = answers[station.index] ?? ""; const result = feedback[station.index];
          return <li key={station.index} className="relative pl-16 sm:pl-24">
            <span className={`absolute left-0 flex h-12 w-12 items-center justify-center rounded-full border sm:left-4 ${done ? "border-primary bg-primary text-primary-foreground" : unlocked ? "border-coin bg-background text-coin" : "border-border bg-muted text-muted-foreground"}`}>
              {done ? <Check className="h-5 w-5" /> : unlocked ? station.index + 1 : <Lock className="h-4 w-4" />}
            </span>
            <article className={`overflow-hidden rounded-lg border ${unlocked ? "border-border bg-card" : "border-border bg-muted/40 opacity-70"}`}>
              {work && <div className="grid sm:grid-cols-[220px_1fr]">
                <div className="aspect-[4/3] overflow-hidden bg-muted sm:aspect-auto"><img src={work.image} alt={work.title} loading="lazy" className="h-full w-full object-cover" /></div>
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-[10px] tracking-[0.24em] text-muted-foreground uppercase">{station.era} · {station.years}</p><span className="flex items-center gap-1 text-xs text-coin"><Coins className="h-3.5 w-3.5" /> +{station.coinReward}</span></div>
                  <h2 className="font-display mt-2 text-2xl font-medium">{station.title}</h2>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{station.place}</p>
                   <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{station.lesson}</p>
                   {unlocked && <>
                     <p className="mt-3 text-sm"><span className="font-medium">Der Wendepunkt:</span> {station.turningPoint}</p>
                     <div className="mt-5 flex items-start gap-3 rounded-lg bg-path-sky p-4">
                       <Compass className="mt-0.5 h-5 w-5 shrink-0 text-coin" />
                       <div><p className="font-display font-medium">{station.experience.title}</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{station.experience.story}</p><p className="mt-3 text-sm"><span className="font-medium">Deine Aufgabe:</span> {station.experience.mission}</p></div>
                     </div>
                      <div className="mt-5">
                        <ArtJourneyMap activeIndex={station.index} unlockedThrough={next} />
                      </div>
                     <div className="mt-5 flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Palette className="h-4 w-4" /> Künstler dieser Station</div>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {station.artistProfiles.map((artist) => {
                          const portrait = artist.works[0];
                          return <Link key={artist.slug} to="/maler/$slug" params={{ slug: artist.slug }} className="group flex gap-3 rounded-md border border-border p-3 transition-colors hover:bg-accent">
                            <div className="h-16 w-14 shrink-0 overflow-hidden rounded-md bg-muted">{portrait && <img src={portrait.image} alt={`Werk von ${artist.name}`} loading="lazy" className="h-full w-full object-cover" />}</div>
                            <div className="min-w-0"><p className="text-sm font-medium">{artist.name}</p><p className="text-xs text-muted-foreground">{artist.life}</p><p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{artist.bio}</p></div>
                          </Link>;
                        })}
                      </div>
                     <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                       {station.works.map((stationWork) => <Link key={stationWork.id} to="/werke/$id" params={{ id: stationWork.id }} className="group min-w-0"><div className="aspect-[4/3] overflow-hidden rounded-md bg-muted"><img src={stationWork.image} alt={stationWork.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div><p className="mt-2 truncate text-sm font-medium">{stationWork.title}</p><p className="truncate text-xs text-muted-foreground">{stationWork.painter.name} · {stationWork.year}</p></Link>)}
                     </div>
                   </>}
                   {!done && unlocked && quiz && <div className="mt-6 border-t border-border pt-5"><p className="text-[10px] tracking-[0.24em] text-muted-foreground uppercase">Prüfung zum Freischalten</p><h3 className="mt-2 text-base font-medium">{quiz.question}</h3><div className="mt-3 grid gap-2">{quiz.options.map((option) => <button key={option} type="button" onClick={() => { setAnswers((current) => ({ ...current, [station.index]: option })); setFeedback((current) => { const copy = { ...current }; delete copy[station.index]; return copy; }); }} className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${selected === option ? "border-coin bg-coin-soft" : "border-border bg-background hover:bg-accent"}`}>{option}</button>)}</div>{result === "wrong" && <p className="mt-3 flex items-center gap-2 text-sm text-destructive"><X className="h-4 w-4" />Noch nicht richtig – lies den Wendepunkt noch einmal.</p>}{result === "correct" && <p className="mt-3 flex items-center gap-2 text-sm text-coin"><Check className="h-4 w-4" />{quiz.explanation}</p>}<button type="button" disabled={!selected || busy === station.index} onClick={() => finish(station.index, selected)} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground disabled:opacity-40">{user ? (busy === station.index ? "Wird geprüft …" : `Antwort prüfen · Station ${station.index + 2 <= artPathWithWorks.length ? station.index + 2 : "abschließen"} öffnen`) : "Anmelden & antworten"}</button></div>}
                </div>
              </div>}
            </article>
          </li>;
        })}
      </ol>
    </section>
  </div>;
}

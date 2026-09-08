import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Check, ChevronLeft, ChevronRight, Coins, Compass, Eye, HelpCircle, Images, Landmark, Lock, Palette, ScrollText, UserRound, X } from "lucide-react";
import { artPathWithWorks } from "@/lib/art-path";
import { useArtPathProgress } from "@/lib/economy";
import { completePathStation } from "@/lib/economy.functions";
import { useAuth } from "@/hooks/useAuth";
import { useInvalidateFarm } from "@/lib/farm";
import coin from "@/assets/provenance-coin.png";
import { artPathQuizzes } from "@/lib/art-path-quiz";
import { stationQuestions, type ArtQuestion } from "@/lib/art-path-questions";
import { Button } from "@/components/ui/button";
import { PremiumLock } from "@/components/PremiumLock";
import { FREE_JOURNEY_STATIONS, isFreeJourneyStation } from "@/lib/premium-access";

export const Route = createFileRoute("/kunstpfad")({
  head: () => ({ meta: [
    { title: "Reise durch die Epochen | Provenance" },
    { name: "description", content: "Eine spielbare Reise von Epoche zu Epoche — mit Künstlern, Werken, Geschichten und Provenance Coins." },
    { property: "og:title", content: "Reise durch die Epochen | Provenance" },
    { property: "og:description", content: "Kunstgeschichte von den frühen Niederländern bis zur geometrischen Moderne Schritt für Schritt erleben." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}),
  component: ArtPathPage,
});

const CARD_COUNT = 20;
const QUIZ_SLOTS = [3, 4, 9, 10, 12, 14, 15, 17, 18];

function PracticeCard({ quiz, step, imageUrl }: { quiz: ArtQuestion; step: number; imageUrl?: string | undefined }) {
  const [picked, setPicked] = useState("");
  const options = (
    <div className="mt-6 grid gap-2">
      {quiz.options.map((option) => {
        const isPicked = picked === option;
        const isRight = option === quiz.answer;
        return <Button key={option} type="button" variant="outline" onClick={() => setPicked(option)} className={`h-auto min-h-12 justify-start whitespace-normal rounded-lg px-4 py-3 text-left font-normal ${isPicked ? (isRight ? "border-foreground bg-path-leaf" : "border-destructive/40 bg-destructive/5") : ""}`}>{option}</Button>;
      })}
    </div>
  );
  const feedback = picked && <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed">{picked === quiz.answer ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />}<span>{picked === quiz.answer ? quiz.explanation : "Noch nicht richtig — probiere eine andere Antwort."}</span></p>;
  const hint = <p className="mt-6 text-xs text-muted-foreground">Frage {step} von 10 — nur die Epochenfrage am Ende schaltet die nächste Station frei.</p>;

  if (quiz.compare) {
    return <div className="flex min-h-[570px] flex-col justify-center p-6 sm:min-h-[610px] sm:p-9">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Images className="h-4 w-4" /> Bildvergleich</div>
      <h3 className="font-display mt-3 text-2xl leading-snug font-medium sm:text-3xl">{quiz.question}</h3>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {quiz.compare.map((item) => <button key={item.label} type="button" onClick={() => setPicked(item.label)} className={`overflow-hidden rounded-lg border text-left transition-colors ${picked === item.label ? (item.label === quiz.answer ? "border-foreground" : "border-destructive/50") : "border-border hover:border-foreground/40"}`}>
          <div className="aspect-[4/3] overflow-hidden bg-muted"><img src={item.src} alt={item.label} loading="lazy" className="h-full w-full object-cover" /></div>
          <p className="px-3 py-2 text-xs text-muted-foreground">{item.label} · {item.caption}</p>
        </button>)}
      </div>
      {options}
      {feedback}
      {hint}
    </div>;
  }

  return <div className="grid min-h-[570px] sm:min-h-[610px] md:grid-cols-[0.85fr_1.15fr]">
    <div className="relative min-h-44 bg-muted md:min-h-full">{(quiz.image ?? imageUrl) && <img src={quiz.image ?? imageUrl} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-90" />}</div>
    <div className="flex flex-col justify-center p-6 sm:p-9">
      <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><HelpCircle className="h-4 w-4" /> Wissensfrage {step}</div>
      <h3 className="font-display mt-3 text-2xl leading-snug font-medium sm:text-3xl">{quiz.question}</h3>
      {options}
      {feedback}
      {hint}
    </div>
  </div>;
}

function ArtPathPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: progress = [], refetch } = useArtPathProgress();
  const invalidateFarm = useInvalidateFarm();
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, "correct" | "wrong">>({});
  const [activeStation, setActiveStation] = useState(0);
  const [card, setCard] = useState(0);
  const completed = new Set(progress.map((entry) => entry.station_index));
  const next = progress.length;
  const station = artPathWithWorks[activeStation] ?? artPathWithWorks[0];
  const quiz = artPathQuizzes[activeStation];
  const practice = stationQuestions(activeStation);
  const selected = answers[activeStation] ?? "";
  const result = feedback[activeStation];
  const done = completed.has(activeStation);

  function openStation(index: number) {
    setActiveStation(index);
    setCard(0);
    setError("");
  }

  function changeCard(direction: -1 | 1) {
    setCard((current) => Math.min(CARD_COUNT - 1, Math.max(0, current + direction)));
  }

  async function finish(index: number, answer: string) {
    if (!user) { void navigate({ to: "/auth" }); return; }
    const stationQuiz = artPathQuizzes[index];
    if (!stationQuiz || answer !== stationQuiz.answer) {
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

  const detailWork = station?.works[1] ?? station?.work;

  return <div className="min-h-screen bg-background">
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
        <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Die große Kunstreise</p>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-medium md:text-6xl">Von Epoche zu Epoche</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Jede Station ist eine Reise aus 20 Karten: Ankunft, Geschichten, vier prägende Künstler, Werke, Bildvergleiche und zehn Wissensfragen bis zur Epochenfrage.</p>
        <div className="mt-7 flex items-center gap-4">
          <img src={coin} alt="Provenance Coin" width={1024} height={1024} className="h-12 w-12" />
          <div><p className="font-display text-2xl font-medium">{progress.reduce((sum, p) => sum + p.coin_reward, 0)} Coins verdient</p><p className="text-sm text-muted-foreground">{progress.length} von {artPathWithWorks.length} Stationen</p></div>
        </div>
        <nav aria-label="Epochenfolge" className="mt-10 overflow-x-auto pb-2">
          <ol className="flex min-w-max items-center gap-2">
            {artPathWithWorks.map((item) => {
              const itemDone = completed.has(item.index);
               const itemUnlocked = itemDone || item.index === next;
               const free = isFreeJourneyStation(item.index);
              return <li key={item.index} className="flex items-center gap-2">
                 <Button type="button" variant="outline" onClick={() => openStation(item.index)} aria-current={activeStation === item.index ? "step" : undefined} className={`h-9 rounded-full px-3 text-xs font-normal ${itemDone ? "border-foreground bg-foreground text-background hover:bg-foreground/90 hover:text-background" : activeStation === item.index ? "border-foreground bg-background text-foreground" : "border-border bg-muted/50 text-muted-foreground"}`}>
                   {(!free || !itemUnlocked) && <Lock className="h-3 w-3" />}{item.index + 1}. {item.era}
                </Button>
                {item.index < artPathWithWorks.length - 1 && <span aria-hidden="true" className="text-border">→</span>}
              </li>;
            })}
          </ol>
        </nav>
      </div>
    </section>

    <section className="mx-auto max-w-4xl px-5 py-10 sm:px-6 md:py-14">
      {error && <p className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{error}</p>}
      {station && <>
        <div className="mb-4 flex items-center justify-between gap-3">
          <div><p className="text-xs text-muted-foreground">Epoche {station.index + 1} von {artPathWithWorks.length}</p><h2 className="font-display text-xl font-medium sm:text-2xl">{station.era}</h2></div>
          <span className="flex items-center gap-1 text-sm"><Coins className="h-4 w-4" /> +{station.coinReward}</span>
        </div>

        <div className="mb-4 flex flex-wrap justify-center gap-1.5" aria-label={`Karte ${card + 1} von ${CARD_COUNT}`}>
          {Array.from({ length: CARD_COUNT }, (_, index) => <Button key={index} type="button" variant="ghost" size="icon" aria-label={`Karte ${index + 1} öffnen`} onClick={() => setCard(index)} className="h-7 w-7 rounded-full p-0 hover:bg-transparent"><span className={`h-1.5 rounded-full transition-all ${index === card ? "w-6 bg-foreground" : index < card ? "w-3 bg-muted-foreground" : "w-3 bg-border"}`} /></Button>)}
        </div>

         {!isFreeJourneyStation(activeStation) ? <PremiumLock title={`${station.era} wartet auf dich`} description={`Du siehst alle ${artPathWithWorks.length} Epochen der Reise. Die ersten ${FREE_JOURNEY_STATIONS} sind frei; Premium öffnet diese und alle folgenden 20-Karten-Stationen.`} /> : <article className="relative min-h-[570px] overflow-hidden rounded-lg border border-border bg-card shadow-sm sm:min-h-[610px]">
          {card === 0 && <div className="grid min-h-[570px] sm:min-h-[610px] md:grid-cols-[1.08fr_0.92fr]">
            <div className="relative min-h-64 bg-muted md:min-h-full">{station.work && <img src={station.work.image} alt={station.work.title} className="absolute inset-0 h-full w-full object-cover" />}</div>
            <div className="flex flex-col justify-center p-6 sm:p-9"><BookOpen className="h-6 w-6" /><p className="mt-5 text-[10px] tracking-[0.24em] text-muted-foreground uppercase">{station.years} · {station.place}</p><h3 className="font-display mt-2 text-3xl font-medium sm:text-4xl">{station.title}</h3><p className="mt-5 leading-relaxed text-muted-foreground">{station.lesson}</p></div>
          </div>}

          {card === 1 && <div className="grid min-h-[570px] sm:min-h-[610px] md:grid-cols-[1fr_1fr]">
            <div className="flex flex-col justify-center p-6 sm:p-9"><div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Compass className="h-4 w-4" /> Ankunft</div><h3 className="font-display mt-3 text-3xl font-medium">{station.experience.title}</h3><p className="mt-5 leading-relaxed text-muted-foreground">{station.experience.story}</p><p className="mt-6 text-sm text-muted-foreground">Reiseziel: <span className="text-foreground">{station.place}</span> · {station.years}</p></div>
            <div className="relative min-h-56 bg-muted md:min-h-full">{station.works[1] && <img src={station.works[1].image} alt={station.works[1].title} className="absolute inset-0 h-full w-full object-cover" />}</div>
          </div>}

          {card === 2 && <div className="flex min-h-[570px] flex-col justify-center p-6 sm:min-h-[610px] sm:p-10"><div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><ScrollText className="h-4 w-4" /> Der Wendepunkt</div><h3 className="font-display mt-3 text-3xl font-medium">Was sich jetzt verändert</h3><p className="mt-5 max-w-2xl border-l-2 border-foreground pl-5 leading-relaxed">{station.turningPoint}</p><div className="mt-8 grid gap-3 sm:grid-cols-3">{[{ label: "Zeitraum", value: station.years }, { label: "Ort", value: station.place }, { label: "Epoche", value: station.era }].map((fact) => <div key={fact.label} className="rounded-lg border border-border p-4"><p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{fact.label}</p><p className="mt-1 text-sm">{fact.value}</p></div>)}</div></div>}

          {QUIZ_SLOTS.includes(card) && practice[QUIZ_SLOTS.indexOf(card)] && <PracticeCard quiz={practice[QUIZ_SLOTS.indexOf(card)] as ArtQuestion} step={QUIZ_SLOTS.indexOf(card) + 1} imageUrl={station.works[QUIZ_SLOTS.indexOf(card) % station.works.length]?.image ?? station.work?.image} />}

          {card >= 5 && card <= 8 && (() => {
            const artist = station.artistProfiles[card - 5];
            const portrait = artist?.works[0];
            if (!artist) return <div className="p-8 text-muted-foreground">Künstlerprofil wird vorbereitet.</div>;
            return <div className="grid min-h-[570px] sm:min-h-[610px] md:grid-cols-[0.95fr_1.05fr]"><div className="relative min-h-72 bg-muted md:min-h-full">{portrait && <img src={portrait.image} alt={`Werk von ${artist.name}`} className="absolute inset-0 h-full w-full object-cover" />}</div><div className="flex flex-col justify-center p-6 sm:p-9"><div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><UserRound className="h-4 w-4" /> Künstler {card - 4} von 4</div><h3 className="font-display mt-4 text-3xl font-medium sm:text-4xl">{artist.name}</h3><p className="mt-1 text-sm text-muted-foreground">{artist.life}</p><p className="mt-5 leading-relaxed text-muted-foreground">{artist.bio}</p><Button asChild variant="outline" className="mt-7 w-fit rounded-full font-normal"><Link to="/maler/$slug" params={{ slug: artist.slug }}>Profil und Werke ansehen</Link></Button></div></div>;
          })()}

                    {card === 11 && <div className="p-5 sm:p-8"><div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Images className="h-4 w-4" /> Werke der Epoche</div><h3 className="font-display mt-3 text-3xl font-medium">Bilder, die Geschichte schrieben</h3><div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">{station.works.map((stationWork) => <Link key={stationWork.id} to="/werke/$id" params={{ id: stationWork.id }} className="group min-w-0"><div className="aspect-[3/4] overflow-hidden rounded-md bg-muted"><img src={stationWork.image} alt={stationWork.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div><p className="mt-2 text-sm font-medium">{stationWork.title}</p><p className="mt-1 text-xs text-muted-foreground">{stationWork.painter.name} · {stationWork.year}</p></Link>)}</div></div>}

          {card === 13 && detailWork && <div className="grid min-h-[570px] sm:min-h-[610px] md:grid-cols-[1fr_1fr]">
            <div className="relative min-h-64 bg-muted md:min-h-full"><img src={detailWork.image} alt={detailWork.title} className="absolute inset-0 h-full w-full object-cover" /></div>
            <div className="flex flex-col justify-center overflow-y-auto p-6 sm:p-9"><div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Landmark className="h-4 w-4" /> Werk im Detail</div><h3 className="font-display mt-3 text-2xl font-medium sm:text-3xl">{detailWork.title}</h3><p className="mt-1 text-sm text-muted-foreground">{detailWork.painter.name} · {detailWork.year}</p><p className="mt-5 text-sm leading-relaxed text-muted-foreground">{detailWork.description}</p><p className="mt-4 text-sm leading-relaxed"><span className="font-medium">Bedeutung:</span> {detailWork.significance}</p><Button asChild variant="outline" className="mt-6 w-fit rounded-full font-normal"><Link to="/werke/$id" params={{ id: detailWork.id }}>Ganze Werkseite öffnen</Link></Button></div>
          </div>}

          {card === 16 && <div className="flex min-h-[570px] flex-col justify-center p-6 sm:min-h-[610px] sm:p-10"><div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Eye className="h-4 w-4" /> Blickschule & Rückblick</div><h3 className="font-display mt-3 text-3xl font-medium">Was du mitnimmst</h3><div className="mt-6 rounded-lg bg-path-leaf p-6"><p className="leading-relaxed">{station.experience.mission}</p></div><ul className="mt-6 grid gap-3 text-sm leading-relaxed"><li className="rounded-lg border border-border p-4"><span className="font-medium">Epoche:</span> {station.era} ({station.years}) in {station.place}</li><li className="rounded-lg border border-border p-4"><span className="font-medium">Künstler:</span> {station.artists.join(" · ")}</li><li className="rounded-lg border border-border p-4"><span className="font-medium">Kernidee:</span> {station.turningPoint}</li></ul></div>}


          {card === 19 && quiz && <div className="mx-auto flex min-h-[570px] max-w-2xl flex-col justify-center p-6 sm:min-h-[610px] sm:p-10"><div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Palette className="h-4 w-4" /> Abschlusskarte</div><h3 className="font-display mt-3 text-3xl font-medium">Epochenfrage</h3><p className="mt-5 text-lg leading-relaxed">{quiz.question}</p><div className="mt-5 grid gap-2">{quiz.options.map((option) => <Button key={option} type="button" variant="outline" onClick={() => { setAnswers((current) => ({ ...current, [station.index]: option })); setFeedback((current) => { const copy = { ...current }; delete copy[station.index]; return copy; }); }} className={`h-auto min-h-12 justify-start whitespace-normal rounded-lg px-4 py-3 text-left font-normal ${selected === option ? "border-foreground bg-coin-soft" : ""}`}>{option}</Button>)}</div>{result === "wrong" && <p className="mt-4 flex items-center gap-2 text-sm text-destructive"><X className="h-4 w-4" />Noch nicht richtig – blättere zurück zum Wendepunkt.</p>}{(result === "correct" || done) && <p className="mt-4 flex items-center gap-2 text-sm"><Check className="h-4 w-4" />{quiz.explanation}</p>}{!done && <Button type="button" disabled={!selected || busy === station.index} onClick={() => finish(station.index, selected)} className="mt-5 h-auto min-h-11 rounded-full px-5 py-2.5">{user ? (busy === station.index ? "Wird geprüft …" : "Antwort prüfen & nächste Epoche öffnen") : "Anmelden & antworten"}</Button>}{done && activeStation < artPathWithWorks.length - 1 && <Button type="button" onClick={() => openStation(activeStation + 1)} className="mt-5 rounded-full">Zur nächsten Epoche <ChevronRight className="h-4 w-4" /></Button>}</div>}
         </article>}

         {isFreeJourneyStation(activeStation) && <div className="mt-5 flex items-center justify-between gap-3">
          <Button type="button" variant="outline" disabled={card === 0} onClick={() => changeCard(-1)} className="rounded-full font-normal"><ChevronLeft className="h-4 w-4" /> Zurück</Button>
          <p className="hidden text-xs text-muted-foreground sm:block">Karte {card + 1} von {CARD_COUNT}</p>
          <Button type="button" disabled={card === CARD_COUNT - 1} onClick={() => changeCard(1)} className="rounded-full font-normal">Weiter <ChevronRight className="h-4 w-4" /></Button>
         </div>}
      </>}
    </section>
  </div>;
}

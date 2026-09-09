import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

/** Speicherort für den zuletzt geöffneten Reisepunkt. */
const RESUME_KEY = "provenance:journey";

import { BookOpen, Brush, Check, ChevronLeft, ChevronRight, Coins, Compass, Eye, HelpCircle, Images, Landmark, Lightbulb, Lock, Palette, ScrollText, Sparkles, UserRound, X } from "lucide-react";
import { artPathWithWorks } from "@/lib/art-path";
import { useArtPathProgress } from "@/lib/economy";
import { completePathStation } from "@/lib/economy.functions";
import { useAuth } from "@/hooks/useAuth";
import { useInvalidateFarm } from "@/lib/farm";
import { supabase } from "@/integrations/supabase/client";
import coin from "@/assets/provenance-coin.png";
import { questionKindLabel, repeatVariant, stationFinalQuestion, stationQuestions, stationSummary, stationTransferQuestion, type ArtQuestion } from "@/lib/art-path-questions";
import { explainTerms, type GlossaryEntry } from "@/lib/art-path-glossary";
import { pigmentSwatch } from "@/lib/pigment-colors";
import { Button } from "@/components/ui/button";
import { MagnifierImage } from "@/components/MagnifierImage";
import { PremiumLock } from "@/components/PremiumLock";
import { LicenseNotice } from "@/components/LicenseNotice";
import { FREE_JOURNEY_STATIONS, isFreeJourneyStation } from "@/lib/premium-access";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { allWorks } from "@/lib/art-data";
import { emitCollected } from "@/lib/collection-events";

export const Route = createFileRoute("/kunstpfad")({
  head: () => ({ meta: [
    { title: "Reise durch 30 Epochen | Provenance" },
    { name: "description", content: "30 Stationen Kunstgeschichte: Lernstoff, Merksätze, Werkzeuge und Farben jeder Epoche — danach neun Fragen und die Abschlussfrage." },
    { property: "og:title", content: "Reise durch 30 Epochen | Provenance" },
    { property: "og:description", content: "Von der Gotik bis zum Bauhaus: studieren, merken, abfragen und Provenance Coins verdienen." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}),
  component: ArtPathPage,
});

const STUDY_CARDS = 12;

type CardItem =
  | { type: "study"; study: number }
  | { type: "question"; quiz: ArtQuestion; step: number }
  | { type: "game" }
  | { type: "transfer" }
  | { type: "summary" }
  | { type: "final" };

/**
 * Lernzyklus je Station: nach zwei bis drei Lernkarten folgt eine kurze Abruffrage,
 * danach die Wiederholungen falscher Antworten, die Transferfrage, die Bilanz und
 * zum Schluss die Abschlussfrage, die weiterhin die nächste Station freischaltet.
 */
function buildSequence(practice: ArtQuestion[], repeatIds: string[], transfer: ArtQuestion | undefined): CardItem[] {
  const slots: Record<number, number[]> = { 2: [0], 4: [1], 6: [2], 7: [3], 8: [4], 9: [5], 10: [6], 11: [7, 8] };
  const items: CardItem[] = [];
  let step = 0;
  for (let study = 0; study < STUDY_CARDS; study++) {
    items.push({ type: "study", study });
    for (const position of slots[study] ?? []) {
      const quiz = practice[position];
      if (quiz) items.push({ type: "question", quiz, step: ++step });
    }
  }
  repeatIds.forEach((id, position) => {
    const original = practice.find((item) => item.id === id);
    if (original) items.push({ type: "question", quiz: repeatVariant(original, position + 1), step: ++step });
  });
  if (transfer) items.push({ type: "transfer" });
  items.push({ type: "summary" });
  items.push({ type: "final" });
  return items;
}

/** Zeigt, dass zwei Rückmeldungen dasselbe sagen — dann wird nur eine angezeigt. */
function saysTheSame(a: string, b: string): boolean {
  const normalize = (text: string) => text.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, "").trim();
  const one = normalize(a);
  const two = normalize(b);
  if (!one || !two) return true;
  const shorter = one.length <= two.length ? one : two;
  const longer = one.length <= two.length ? two : one;
  return longer.includes(shorter.slice(0, Math.min(50, shorter.length)));
}

function TermNotes({ entries }: { entries: GlossaryEntry[] }) {
  if (entries.length === 0) return null;
  return <div className="mt-6 grid gap-3 border-t border-border pt-4">
    <p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Kurz erklärt</p>
    {entries.map((item) => <p key={item.term} className="text-sm leading-relaxed"><span className="font-medium">{item.term}</span> <span className="text-muted-foreground">— {item.text}</span></p>)}
  </div>;
}

function PracticeCard({ quiz, step, total, imageUrl, term, onResult }: { quiz: ArtQuestion; step: number; total: number; imageUrl?: string | undefined; term?: GlossaryEntry | undefined; onResult: (correct: boolean) => void }) {
  const [picked, setPicked] = useState("");
  const [unsure, setUnsure] = useState(false);
  const correct = picked === quiz.answer;

  function choose(option: string) {
    if (picked) return;
    setPicked(option);
    onResult(option === quiz.answer && !unsure);
  }

  const options = (
    <div className="mt-6 grid gap-2">
      {quiz.options.slice(0, 4).map((option) => {
        const isPicked = picked === option;
        const isRight = option === quiz.answer;
        return <Button key={option} type="button" variant="outline" onClick={() => choose(option)} className={`h-auto min-h-12 justify-start whitespace-normal rounded-lg px-4 py-3 text-left font-normal transition-colors duration-300 ${picked ? (isRight ? "border-foreground bg-path-leaf" : isPicked ? "border-destructive/40 bg-destructive/5" : "opacity-60") : ""}`}>{option}</Button>;
      })}
    </div>
  );

  /** Nach der Antwort: genau eine Erklärung — plus ein Begriff, der neu dazukommt. */
  const lead = correct ? quiz.explanation : (quiz.hint ?? quiz.explanation);
  const extra = !correct && quiz.hint && !saysTheSame(quiz.hint, quiz.explanation) ? quiz.explanation : "";

  const feedback = picked
    ? <div className="animate-in fade-in mt-5 rounded-lg border border-border p-4 text-sm leading-relaxed duration-500">
        <p className="flex items-start gap-2">{correct ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />}<span>{lead}</span></p>
        {extra && <p className="mt-2 text-muted-foreground">{extra}</p>}
        {term && <p className="mt-3 border-t border-border pt-3"><span className="font-medium">{term.term}</span> <span className="text-muted-foreground">— {term.text}</span></p>}
      </div>
    : <Button type="button" variant="ghost" onClick={() => setUnsure((value) => !value)} className={`mt-4 w-fit rounded-full px-3 text-xs font-normal ${unsure ? "bg-muted" : ""}`}>{unsure ? "Als unsicher markiert" : "Ich bin unsicher"}</Button>;

  const hint = <p className="mt-6 text-xs text-muted-foreground">{total > 0 ? `Frage ${step} von ${total}` : "Transferfrage — sie entscheidet, ob die Station als beherrscht gilt."}</p>;
  const label = <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{quiz.kind === "transfer" ? <Sparkles className="h-4 w-4" /> : quiz.compare ? <Images className="h-4 w-4" /> : <HelpCircle className="h-4 w-4" />} {questionKindLabel(quiz.kind)}</div>;


  if (quiz.compare) {
    return <div className="flex min-h-[570px] flex-col justify-center p-6 sm:min-h-[610px] sm:p-9">
      {label}
      <h3 className="font-display mt-3 text-2xl leading-snug font-medium sm:text-3xl">{quiz.question}</h3>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {quiz.compare.map((item) => <button key={item.label} type="button" onClick={() => choose(item.label)} className={`overflow-hidden rounded-lg border text-left transition-colors ${picked === item.label ? (item.label === quiz.answer ? "border-foreground" : "border-destructive/50") : "border-border hover:border-foreground/40"}`}>
          <div className="aspect-[4/3] overflow-hidden bg-muted p-2"><img src={item.src} alt={item.label} loading="lazy" className="h-full w-full object-contain" /></div>
          <p className="px-3 py-2 text-xs text-muted-foreground">{item.label} · {item.caption}</p>
        </button>)}
      </div>
      {options}
      {feedback}
      {hint}
    </div>;
  }

  return <div className="grid min-h-[570px] sm:min-h-[610px] md:grid-cols-[0.85fr_1.15fr]">
    <div className="flex min-h-56 items-center justify-center bg-muted p-4 md:min-h-full">{(quiz.image ?? imageUrl) && <MagnifierImage src={(quiz.image ?? imageUrl)!} alt="Werk zur Frage" className="w-full" />}</div>
    <div className="flex flex-col justify-center p-6 sm:p-9">
      {label}
      <h3 className="font-display mt-3 text-2xl leading-snug font-medium sm:text-3xl">{quiz.question}</h3>
      {options}
      {feedback}
      {hint}
    </div>
  </div>;
}

function ArtPathPage() {
  const { user } = useAuth();
  const { hasAccess } = usePremiumAccess();
  const navigate = useNavigate();
  const { data: progress = [], refetch, isLoading: progressLoading } = useArtPathProgress();
  const invalidateFarm = useInvalidateFarm();
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, "correct" | "wrong">>({});
  const [activeStation, setActiveStation] = useState(0);
  const [card, setCard] = useState(0);
  /** Wurde der gespeicherte Stand schon geladen? Verhindert Überschreiben beim Start. */
  const [restored, setRestored] = useState(false);
  /** Isolierter Reise-Flow: die Station läuft in einem eigenen Vollbild-Fenster. */
  const [focus, setFocus] = useState(false);
  /** Ergebnisse je Station und Frage — Grundlage für Wiederholung und Lernstand. */
  const [results, setResults] = useState<Record<number, Record<string, boolean>>>({});
  const [repeats, setRepeats] = useState<Record<number, string[]>>({});
  const completed = new Set(progress.map((entry) => entry.station_index));
  const next = progress.length;

  const station = artPathWithWorks[activeStation] ?? artPathWithWorks[0];
  const quiz = stationFinalQuestion(activeStation);
  const practice = useMemo(() => stationQuestions(activeStation), [activeStation]);
  const transfer = useMemo(() => stationTransferQuestion(activeStation), [activeStation]);
  const summary = useMemo(() => stationSummary(activeStation), [activeStation]);
  const selected = answers[activeStation] ?? "";
  const result = feedback[activeStation];
  const done = completed.has(activeStation);

  /**
   * Begriffe dieser Station — jeder wird genau einmal erklärt und der Reihe nach
   * auf die Karten verteilt, damit jeder Klick neuen Inhalt bringt.
   */
  const stationTerms = useMemo(() => {
    const source = artPathWithWorks[activeStation];
    if (!source) return [] as GlossaryEntry[];
    return explainTerms([
      source.place, source.lesson, source.turningPoint, source.experience.story, source.experience.mission,
      source.history, source.pigments, source.supports, source.tools, source.brushes, source.technique,
      ...source.artistLens, ...source.mnemonics.map((m) => m.text),
    ], new Set(), 20);
  }, [activeStation]);
  /** Zwei Begriffe je Lernkarte, danach je einer als Zugabe nach den Fragen. */
  const termsForStudy = (slot: number) => stationTerms.slice(slot * 2, slot * 2 + 2);
  const questionTerm = (step: number) => stationTerms[12 + ((step - 1) % Math.max(1, stationTerms.length - 12))];


  const stationResults = results[activeStation] ?? {};
  const repeatIds = repeats[activeStation] ?? [];
  const sequence = useMemo(
    () => buildSequence(practice, repeatIds, transfer),
    [practice, repeatIds, transfer],
  );
  const entry = sequence[Math.min(card, sequence.length - 1)];
  const questionTotal = sequence.filter((item) => item.type === "question").length;
  const allPracticeCorrect = practice.length > 0 && practice.every((item) => stationResults[item.id]);
  const transferCorrect = transfer ? stationResults[transfer.id] === true : false;
  const mastery: "angesehen" | "gelernt" | "beherrscht" = transferCorrect && allPracticeCorrect
    ? "beherrscht"
    : allPracticeCorrect ? "gelernt" : "angesehen";
  const masteryLabel = mastery === "beherrscht" ? "Beherrscht" : mastery === "gelernt" ? "Gelernt" : "Angesehen";
  const reviewTopics = Array.from(new Set(
    [...practice, ...(transfer ? [transfer] : [])]
      .filter((item) => stationResults[item.id] !== true)
      .map((item) => item.topic ?? item.question),
  )).slice(0, 5);

  /** Falsch oder unsicher beantwortete Fragen kehren später in anderer Form zurück. */
  function recordAnswer(question: ArtQuestion, correct: boolean) {
    const baseId = question.id.replace(/-wdh$/, "");
    setResults((current) => ({
      ...current,
      [activeStation]: { ...(current[activeStation] ?? {}), [baseId]: correct },
    }));
    if (correct) return;
    if (question.id.endsWith("-wdh")) return;
    setRepeats((current) => {
      const list = current[activeStation] ?? [];
      if (list.includes(baseId)) return current;
      return { ...current, [activeStation]: [...list, baseId] };
    });
  }

  /** Letzten Stand laden: zuerst vom Server, dann lokal. */
  useEffect(() => {
    if (restored || progressLoading || !user) return;
    const userId = user.id;
    const nextStation = Math.min(progress.length, artPathWithWorks.length - 1);
    let cancelled = false;
    let station = nextStation;
    let savedCard = 0;

    async function loadServerResume() {
      const { data } = await supabase.from("art_path_resume").select("station_index, card_index, updated_at").eq("user_id", userId).maybeSingle();
      if (data && !cancelled) {
        const serverStation = Math.min(Math.max(0, data.station_index), artPathWithWorks.length - 1);
        const serverCard = Math.max(0, data.card_index ?? 0);
        if (serverStation < progress.length) {
          station = nextStation;
          savedCard = 0;
        } else {
          station = serverStation;
          savedCard = serverCard;
        }
      }
      if (cancelled) return;
      try {
        const raw = window.localStorage.getItem(RESUME_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as { station?: number; card?: number; ts?: number };
          const localTs = typeof parsed.ts === "number" ? parsed.ts : 0;
          const serverTs = data ? new Date(data.updated_at ?? 0).getTime() : 0;
          if (!data || localTs > serverTs) {
            if (typeof parsed.station === "number") {
              const localStation = Math.min(Math.max(0, parsed.station), artPathWithWorks.length - 1);
              if (localStation < progress.length) {
                station = nextStation;
                savedCard = 0;
              } else {
                station = localStation;
                savedCard = Math.max(0, parsed.card ?? 0);
              }
            }
          }
        }
      } catch {
        /* kein gespeicherter Stand */
      }
      if (!cancelled) {
        setActiveStation(station);
        setCard(savedCard);
        setRestored(true);
      }
    }

    void loadServerResume();
    return () => { cancelled = true; };
  }, [restored, progressLoading, progress.length, user]);

  /** Fortschritt automatisch merken — lokal sofort, auf den Server debounced. */
  useEffect(() => {
    if (!restored) return;
    const ts = Date.now();
    try {
      window.localStorage.setItem(RESUME_KEY, JSON.stringify({ station: activeStation, card, ts }));
    } catch {
      /* Speicher nicht verfügbar */
    }

    if (!user) return;
    const userId = user.id;
    const timeout = setTimeout(async () => {
      const { error } = await supabase.from("art_path_resume").upsert({
        user_id: userId,
        station_index: activeStation,
        card_index: card,
      }, { onConflict: "user_id" });
      if (error) {
        console.warn("Reise-Stand konnte nicht gespeichert werden:", error.message);
      }
    }, 800);
    return () => clearTimeout(timeout);
  }, [restored, activeStation, card, user]);

  function openStation(index: number) {
    setActiveStation(index);
    setCard(0);
    setFocus(true);
    setError("");
    setNotice("");
  }

  /** Weiterlernen an der zuletzt geöffneten Karte. */
  function resumeJourney() {
    setFocus(true);
    setError("");
    setNotice("");
  }


  function changeCard(direction: -1 | 1) {
    setCard((current) => Math.min(sequence.length - 1, Math.max(0, current + direction)));
  }

  async function finish(index: number, answer: string) {
    if (!user) { void navigate({ to: "/auth" }); return; }
    const stationQuiz = stationFinalQuestion(index);
    if (!stationQuiz || answer !== stationQuiz.answer) {
      setFeedback((current) => ({ ...current, [index]: "wrong" }));
      return;
    }
    setBusy(index); setError("");
    try {
      const result = await completePathStation({ data: { station: index, answer } });
      setFeedback((current) => ({ ...current, [index]: "correct" }));
      const gained = (result as { unlocked?: number } | null)?.unlocked ?? 0;
      setNotice(gained > 0
        ? `Station geschafft — ${gained} studierte Werke wurden deiner Sammlung hinzugefügt.`
        : "Station geschafft — die nächste Epoche ist offen.");
      /** Sammlungs-Fenster: erst die Künstler, dann die Werke dieser Station. */
      const finished = artPathWithWorks[index];
      if (finished) {
        for (const painter of finished.artistProfiles) emitCollected({ kind: "painter", slug: painter.slug });
        for (const stationWork of finished.works) emitCollected({ kind: "work", slug: stationWork.id });
      }
      await refetch(); invalidateFarm();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Die Station konnte nicht abgeschlossen werden.");
    } finally { setBusy(null); }
  }

  const detailWork = station?.works[1] ?? station?.work;
  const unlocked = hasAccess || isFreeJourneyStation(activeStation);
  /** Index der Lernkarte, wenn gerade eine Lernkarte offen ist. */
  const study = entry?.type === "study" ? entry.study : -1;

  return <div className="min-h-screen bg-background">
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Die große Kunstreise</p>
            <h1 className="font-display mt-3 text-4xl font-medium md:text-6xl">Von Epoche zu Epoche</h1>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              {artPathWithWorks.length} Stationen von der Gotik bis zum Bauhaus. Dein Fortschritt wird automatisch gespeichert — du steigst immer dort wieder ein, wo du aufgehört hast.
            </p>

            <div className="mt-8 max-w-md">
              <div className="flex items-end justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={coin} alt="Provenance Coin" width={1024} height={1024} className="h-10 w-10" />
                  <div>
                    <p className="font-display text-xl font-medium">{progress.reduce((sum, p) => sum + p.coin_reward, 0)} Coins verdient</p>
                    <p className="text-sm text-muted-foreground">{progress.length} von {artPathWithWorks.length} Stationen</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{Math.round((progress.length / artPathWithWorks.length) * 100)} %</span>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-foreground transition-all duration-700" style={{ width: `${Math.max(2, (progress.length / artPathWithWorks.length) * 100)}%` }} />
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button type="button" onClick={resumeJourney} className="h-auto min-h-11 rounded-full px-6">
                {progress.length > 0 || card > 0 ? "Reise fortsetzen" : "Reise beginnen"} <ChevronRight className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {progress.length > 0 || card > 0
                  ? `Du bist bei Station ${activeStation + 1} · ${station?.era}${card > 0 ? ` · Karte ${card + 1}` : ""}`
                  : `Station ${activeStation + 1} · ${station?.era}`}
              </span>
            </div>
          </div>

          {station && (
            <div className="overflow-hidden rounded-2xl bg-muted">
              <img
                src={station.work?.image}
                alt={station.work?.title ?? station.era}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="bg-card p-5">
                <p className="text-[10px] tracking-[0.24em] text-muted-foreground uppercase">{station.years}</p>
                <p className="font-display mt-1 text-xl font-medium">{station.era}</p>
                <p className="mt-1 text-sm text-muted-foreground">{station.work?.title} · {station.work?.painter.name}</p>
              </div>
            </div>
          )}
        </div>

        <nav aria-label="Epochenfolge" className="mt-12 overflow-x-auto pb-2">
          <ol className="flex min-w-max items-center gap-2">
            {artPathWithWorks.map((item) => {
              const itemDone = completed.has(item.index);
              const itemUnlocked = itemDone || item.index === next;
              const free = hasAccess || isFreeJourneyStation(item.index);
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


    <section className={focus ? "fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-background px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(5rem,env(safe-area-inset-bottom))] sm:px-6" : "mx-auto max-w-4xl px-5 py-10 sm:px-6 md:py-14"}>
      <div className={focus ? "mx-auto w-full max-w-4xl" : ""}>
      {focus && <div className="mb-5 flex items-center justify-between gap-3">
        <p className="pl-14 text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Station {activeStation + 1} von {artPathWithWorks.length}</p>
        <Button type="button" variant="outline" size="icon" aria-label="Reise verlassen" onClick={() => setFocus(false)} className="h-10 w-10 rounded-full"><X className="h-4 w-4" /></Button>
      </div>}
      {error && <p className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{error}</p>}
      {notice && <p role="status" className="mb-6 rounded-lg border border-border bg-path-leaf p-4 text-sm">{notice}</p>}
      {station && <>
        <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0"><p className="text-xs text-muted-foreground">Station {station.index + 1} von {artPathWithWorks.length} · {station.years}</p><h2 className="font-display text-xl font-medium sm:text-2xl">{station.era}</h2></div>
          <div className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-2">
            <span className="rounded-full border border-border px-3 py-1 text-[11px] tracking-wide">{masteryLabel}</span>
            <span className="flex items-center gap-1 text-sm"><Coins className="h-4 w-4 shrink-0" /> +{station.coinReward}</span>
          </div>
        </div>

        {!focus && <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <p className="leading-relaxed text-muted-foreground">{station.lesson}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button type="button" onClick={resumeJourney} className="h-auto min-h-11 rounded-full px-6">{card > 0 ? `Weiter bei Karte ${card + 1}` : "Station starten"} <ChevronRight className="h-4 w-4" /></Button>
            {card > 0 && <Button type="button" variant="outline" onClick={() => openStation(activeStation)} className="h-auto min-h-11 rounded-full px-6">Von vorn</Button>}
          </div>
        </div>}


        {focus && <>
        <div className="mb-2 flex flex-wrap justify-center gap-1.5" aria-label={`Karte ${card + 1} von ${sequence.length}`}>
          {sequence.map((item, index) => <Button key={`${item.type}-${index}`} type="button" variant="ghost" size="icon" aria-label={`Karte ${index + 1} öffnen`} onClick={() => setCard(index)} className="h-7 w-7 rounded-full p-0 hover:bg-transparent"><span className={`h-1.5 rounded-full transition-all ${index === card ? "w-6 bg-foreground" : index < card ? "w-3 bg-muted-foreground" : item.type === "study" ? "w-3 bg-border" : "w-1.5 bg-border"}`} /></Button>)}
        </div>
        <p className="mb-4 text-center text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{entry?.type === "study" ? "Lernen" : entry?.type === "question" ? "Abrufen" : entry?.type === "transfer" ? "Anwenden" : entry?.type === "summary" ? "Bilanz" : "Abschluss"}</p>

        {!unlocked ? <PremiumLock title={`${station.era} wartet auf dich`} description={`Du siehst alle ${artPathWithWorks.length} Stationen der Reise. Die ersten ${FREE_JOURNEY_STATIONS} sind frei; Premium öffnet diese und alle folgenden Lernstationen.`} /> : <article className="relative min-h-[570px] rounded-lg border border-border bg-card shadow-sm sm:min-h-[610px]">
          {study === 0 && <div className="grid min-h-[570px] sm:min-h-[610px] md:grid-cols-[1.08fr_0.92fr]">
            <div className="flex min-h-64 items-center justify-center bg-muted p-4 md:min-h-full">{station.work && <MagnifierImage src={station.work.image} alt={station.work.title} className="w-full" />}</div>
            <div className="flex flex-col justify-center overflow-y-auto p-6 sm:p-9"><BookOpen className="h-6 w-6" /><p className="mt-5 text-[10px] tracking-[0.24em] text-muted-foreground uppercase">{station.years} · {station.place}</p><h3 className="font-display mt-2 text-3xl font-medium sm:text-4xl">{station.title}</h3><p className="mt-5 leading-relaxed text-muted-foreground">{station.lesson}</p><TermNotes entries={termsForStudy(0)} /></div>
          </div>}

          {study === 1 && <div className="grid min-h-[570px] sm:min-h-[610px] md:grid-cols-[1fr_1fr]">
            <div className="flex flex-col justify-center overflow-y-auto p-6 sm:p-9"><div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Compass className="h-4 w-4" /> Ankunft</div><h3 className="font-display mt-3 text-3xl font-medium">{station.experience.title}</h3><p className="mt-5 leading-relaxed text-muted-foreground">{station.experience.story}</p><TermNotes entries={termsForStudy(1)} /></div>
            <div className="flex min-h-56 items-center justify-center bg-muted p-4 md:min-h-full">{station.works[1] && <MagnifierImage src={station.works[1]!.image} alt={station.works[1]!.title} className="w-full" />}</div>
          </div>}

          {study === 2 && <div className="flex min-h-[570px] flex-col justify-center overflow-y-auto p-6 sm:min-h-[610px] sm:p-10"><div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><ScrollText className="h-4 w-4" /> Zeit & Wendepunkt</div><h3 className="font-display mt-3 text-3xl font-medium">Was die Welt verändert</h3><p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{station.history}</p><p className="mt-6 max-w-2xl border-l-2 border-foreground pl-5 leading-relaxed">{station.turningPoint}</p><div className="max-w-2xl"><TermNotes entries={termsForStudy(2)} /></div></div>}

          {study === 3 && <div className="min-h-[570px] overflow-y-auto p-6 sm:min-h-[610px] sm:p-9">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Palette className="h-4 w-4" /> Farben & Pigmente</div>
            <h3 className="font-display mt-3 text-3xl font-medium">Woraus Bilder gemacht sind</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Diese Farben liegen auf der Palette dieser Epoche. Jede hat ihren eigenen Ursprung — Stein, Erde, Pflanze, Tier oder Labor — und genau das prägt, wie die Bilder wirken.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {station.palette.map((color) => {
                const swatch = pigmentSwatch(color);
                return <div key={color} className="flex items-start gap-3 rounded-xl border border-border p-3">
                  <span aria-hidden className="mt-0.5 h-10 w-10 shrink-0 rounded-lg border border-border shadow-inner" style={{ backgroundColor: swatch.hex }} />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{color}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{swatch.note}</span>
                  </span>
                </div>;
              })}
            </div>
            <div className="mt-7 grid gap-x-8 gap-y-6 md:grid-cols-2">
              {[{ label: "Pigmente & Bindemittel", value: station.pigments }, { label: "Bildträger", value: station.supports }, { label: "Maltechnik", value: station.technique }, { label: "Farbe im Werk", value: `${station.work?.title ?? "Das Schlüsselwerk"} zeigt diese Palette in der Praxis: ${station.artistLens[0] ?? station.lesson}` }].map((item) => <section key={item.label} className="border-t border-border pt-4"><p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">{item.label}</p><p className="mt-2 text-sm leading-relaxed">{item.value}</p></section>)}
            </div>
            {station.work && <figure className="mt-7 overflow-hidden rounded-xl border border-border">
              <img src={station.work.image} alt={`Farben in ${station.work.title}`} loading="lazy" className="max-h-72 w-full bg-muted object-contain p-2" />
              <figcaption className="border-t border-border p-3 text-xs text-muted-foreground">{station.work.title} · {station.work.painter.name} — achte auf die Farbflächen, die aus den Pigmenten oben entstehen.</figcaption>
            </figure>}
            <TermNotes entries={termsForStudy(3)} />
          </div>}


          {study === 4 && <div className="min-h-[570px] overflow-y-auto p-6 sm:min-h-[610px] sm:p-9"><div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Brush className="h-4 w-4" /> Werkzeug & Technik</div><h3 className="font-display mt-3 text-3xl font-medium">Pinsel, Griffel, Presse</h3><div className="mt-7 grid gap-x-8 gap-y-6 md:grid-cols-2">{[{ label: "Pinsel", value: station.brushes }, { label: "Werkzeuge", value: station.tools }, { label: "Technik", value: station.technique }].map((item) => <section key={item.label} className="border-t border-border pt-4"><p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">{item.label}</p><p className="mt-2 text-sm leading-relaxed">{item.value}</p></section>)}</div><TermNotes entries={termsForStudy(4)} /><p className="mt-7 rounded-lg bg-muted p-5 text-sm leading-relaxed"><span className="font-medium">Übung:</span> {station.experience.mission}</p></div>}

          {study === 5 && <div className="flex min-h-[570px] flex-col justify-center overflow-y-auto p-6 sm:min-h-[610px] sm:p-10"><div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Lightbulb className="h-4 w-4" /> Merkkarte</div><h3 className="font-display mt-3 text-3xl font-medium">Drei Sätze, die sitzen müssen</h3><ul className="mt-7 grid gap-4">{station.mnemonics.map((tip, tipIndex) => <li key={tip.text} className="flex gap-4 rounded-lg bg-path-leaf p-5"><span className="font-display text-2xl font-medium">{tipIndex + 1}</span><div className="min-w-0"><p className="font-medium leading-relaxed">{tip.text.replace(/^Merke:\s*/, "")}</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tip.detail}</p></div></li>)}</ul><TermNotes entries={termsForStudy(5)} /></div>}

          {study >= 6 && study <= 9 && (() => {
            const artist = station.artistProfiles[study - 6];
            const portrait = station.works[study - 6];
            if (!artist) return <div className="p-8 text-muted-foreground">Künstlerprofil wird vorbereitet.</div>;
            const artistWorks = allWorks.filter((item) => item.painter.slug === artist.slug).slice(0, 5);
            const houses = Array.from(new Set(artistWorks.map((item) => item.museum).filter(Boolean))).slice(0, 4);
            return <div className="grid min-h-[570px] sm:min-h-[610px] md:grid-cols-[0.95fr_1.05fr]">
              <div className="flex min-h-72 items-center justify-center bg-muted p-4 md:min-h-full">{portrait && <MagnifierImage src={portrait.image} alt={`Werk von ${artist.name}`} className="w-full" />}</div>
              <div className="flex flex-col justify-center overflow-y-auto p-6 sm:p-9">
                <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><UserRound className="h-4 w-4" /> Künstler {study - 5} von 4</div>
                <h3 className="font-display mt-4 text-3xl font-medium sm:text-4xl">{artist.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{artist.life} · {artist.origin}</p>
                <p className="mt-3 rounded-lg bg-muted px-4 py-3 text-xs leading-relaxed text-muted-foreground">Lebte mitten in der Zeit dieser Station: {station.era}, {station.years}. Wer damals in {station.place} stand, sah genau diese Bilder entstehen.</p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{artist.bio}</p>
                <div className="mt-5 border-l-2 border-foreground pl-4"><p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">In dieser Zeit</p><p className="mt-2 text-sm leading-relaxed">{station.artistLens[study - 6]}</p></div>
                {portrait && <div className="mt-5 rounded-lg border border-border p-4">
                  <p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Blick ins Werk</p>
                  <p className="mt-2 text-sm font-medium">{portrait.title} · {portrait.year}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{portrait.technique}</p>
                  <p className="mt-2 text-xs leading-relaxed"><span className="font-medium">Heute zu sehen:</span> {portrait.museum}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{portrait.description}</p>
                </div>}
                {artistWorks.length > 0 && <div className="mt-5 border-t border-border pt-4">
                  <p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Bekannte Werke und ihre Häuser</p>
                  <ul className="mt-2 grid gap-1.5 text-xs leading-relaxed">
                    {artistWorks.map((item) => <li key={item.id}><span className="font-medium">{item.title}</span> <span className="text-muted-foreground">· {item.year} · {item.museum}</span></li>)}
                  </ul>
                </div>}
                {houses.length > 0 && <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Auf einer Reise findest du {artist.name} vor allem in: {houses.join(" · ")}.</p>}
                <Button asChild variant="outline" className="mt-6 w-fit rounded-full font-normal"><Link to="/maler/$slug" params={{ slug: artist.slug }}>Profil und Werke ansehen</Link></Button>
              </div>
            </div>;
          })()}

          {study === 10 && detailWork && <div className="grid min-h-[570px] sm:min-h-[610px] md:grid-cols-[1fr_1fr]">
            <div className="flex min-h-64 items-center justify-center bg-muted p-4 md:min-h-full"><MagnifierImage src={detailWork.image} alt={detailWork.title} className="w-full" /></div>
            <div className="flex flex-col justify-center overflow-y-auto p-6 sm:p-9">
              <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Landmark className="h-4 w-4" /> Werk im Detail</div>
              <h3 className="font-display mt-3 text-2xl font-medium sm:text-3xl">{detailWork.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{detailWork.painter.name} · {detailWork.year} · gemalt in der Zeit von {station.era} ({station.years})</p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{detailWork.description}</p>
              <p className="mt-4 text-sm leading-relaxed"><span className="font-medium">Bedeutung:</span> {detailWork.significance}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground"><span className="font-medium text-foreground">Damals aufgenommen:</span> {detailWork.reception}</p>
              <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                <section className="border-t border-border pt-3"><p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Heute zu sehen</p><p className="mt-1.5 text-sm leading-relaxed">{detailWork.museum}</p></section>
                <section className="border-t border-border pt-3"><p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Material & Maß</p><p className="mt-1.5 text-sm leading-relaxed">{detailWork.technique}</p></section>
              </div>
              <Button asChild variant="outline" className="mt-6 w-fit rounded-full font-normal"><Link to="/werke/$id" params={{ id: detailWork.id }}>Ganze Werkseite öffnen</Link></Button>
            </div>
          </div>}

          {study === 11 && <div className="min-h-[570px] p-6 sm:min-h-[610px] sm:p-9"><div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Eye className="h-4 w-4" /> Bilder einprägen</div><h3 className="font-display mt-3 text-3xl font-medium">Vier Werke, vier Namen</h3><p className="mt-3 text-sm text-muted-foreground">Präge dir Bild und Maler ein — gleich musst du zuordnen.</p><div className="mt-6 grid grid-cols-2 gap-4">{station.works.slice(0, 4).map((stationWork) => <figure key={stationWork.id} className="min-w-0"><div className="aspect-[4/3] overflow-hidden rounded-md bg-muted p-1.5"><img src={stationWork.image} alt={stationWork.title} loading="lazy" className="h-full w-full object-contain" /></div><figcaption className="mt-2 text-xs leading-snug"><span className="font-medium">{stationWork.painter.name}</span><br /><span className="text-muted-foreground">{stationWork.title} · {stationWork.year}</span></figcaption></figure>)}</div></div>}

          {entry?.type === "question" && <PracticeCard key={`${station.index}-${entry.quiz.id}`} quiz={entry.quiz} step={entry.step} total={questionTotal} imageUrl={station.works[entry.step % Math.max(1, station.works.length)]?.image ?? station.work?.image} term={questionTerm(entry.step)} onResult={(correct) => recordAnswer(entry.quiz, correct)} />}

          {entry?.type === "transfer" && transfer && <PracticeCard key={`${station.index}-transfer`} quiz={transfer} step={0} total={0} onResult={(correct) => recordAnswer(transfer, correct)} />}

          {entry?.type === "summary" && summary && <div className="min-h-[570px] p-6 sm:min-h-[610px] sm:p-9">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><ScrollText className="h-4 w-4" /> Stationsbilanz</div>
            <h3 className="font-display mt-3 text-3xl font-medium">Was du jetzt kannst</h3>
            <p className="mt-3 text-sm text-muted-foreground">Stand: <span className="text-foreground">{masteryLabel}</span></p>
            <div className="mt-6 grid gap-x-8 gap-y-5 md:grid-cols-2">
              <section className="border-t border-border pt-4"><p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Stil erkennen</p><p className="mt-2 text-sm leading-relaxed">{summary.style}</p></section>
              <section className="border-t border-border pt-4"><p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Künstler</p><p className="mt-2 text-sm leading-relaxed">{summary.artists.join(" · ")}</p></section>
              <section className="border-t border-border pt-4"><p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Technik</p><p className="mt-2 text-sm leading-relaxed">{summary.technique}</p></section>
              <section className="border-t border-border pt-4"><p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Kontext</p><p className="mt-2 text-sm leading-relaxed">{summary.context}</p></section>
            </div>
            <div className="mt-6 rounded-lg bg-path-leaf p-5"><p className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">Themen zum Wiederholen</p>{reviewTopics.length > 0 ? <ul className="mt-2 grid gap-1 text-sm leading-relaxed">{reviewTopics.map((topic) => <li key={topic}>· {topic}</li>)}</ul> : <p className="mt-2 text-sm leading-relaxed">Nichts offen — du hast alle Fragen dieser Station sicher beantwortet.</p>}</div>
          </div>}

          {entry?.type === "final" && quiz && <div className="mx-auto flex min-h-[570px] max-w-2xl flex-col justify-center p-6 sm:min-h-[610px] sm:p-10"><div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Palette className="h-4 w-4" /> Abschlusskarte</div><h3 className="font-display mt-3 text-3xl font-medium">Epochenfrage</h3><p className="mt-5 text-lg leading-relaxed">{quiz.question}</p><div className="mt-5 grid gap-2">{quiz.options.map((option) => <Button key={option} type="button" variant="outline" onClick={() => { setAnswers((current) => ({ ...current, [station.index]: option })); setFeedback((current) => { const copy = { ...current }; delete copy[station.index]; return copy; }); }} className={`h-auto min-h-12 justify-start whitespace-normal rounded-lg px-4 py-3 text-left font-normal ${selected === option ? "border-foreground bg-coin-soft" : ""}`}>{option}</Button>)}</div>{result === "wrong" && <p className="mt-4 flex items-center gap-2 text-sm text-destructive"><X className="h-4 w-4" />Noch nicht richtig – blättere zurück zur Merkkarte.</p>}{(result === "correct" || done) && <p className="mt-4 flex items-center gap-2 text-sm"><Check className="h-4 w-4" />{quiz.explanation}</p>}{!done && <Button type="button" disabled={!selected || busy === station.index} onClick={() => finish(station.index, selected)} className="mt-5 h-auto min-h-11 rounded-full px-5 py-2.5">{user ? (busy === station.index ? "Wird geprüft …" : "Antwort prüfen & nächste Station öffnen") : "Anmelden & antworten"}</Button>}{done && activeStation < artPathWithWorks.length - 1 && <Button type="button" onClick={() => openStation(activeStation + 1)} className="mt-5 rounded-full">Zur nächsten Station <ChevronRight className="h-4 w-4" /></Button>}</div>}
        </article>}

        {unlocked && <div className="mt-5 flex items-center justify-between gap-3">
          <Button type="button" variant="outline" disabled={card === 0} onClick={() => changeCard(-1)} className="rounded-full font-normal"><ChevronLeft className="h-4 w-4" /> Zurück</Button>
          <p className="hidden text-xs text-muted-foreground sm:block">Karte {card + 1} von {sequence.length}</p>
          <Button type="button" disabled={card === sequence.length - 1} onClick={() => changeCard(1)} className="rounded-full font-normal">Weiter <ChevronRight className="h-4 w-4" /></Button>
        </div>}
        </>}
      </>}
      <LicenseNotice context="Die Reise zeigt ausschließlich Werke, deren Schutzfrist abgelaufen ist." />
      </div>
    </section>
  </div>;
}

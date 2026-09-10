import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Check, Clock, Coins, Palette, Brush, Sparkles } from "lucide-react";
import type { EpochGuide as GuideData } from "@/lib/epoch-guide";
import { pigmentSwatch } from "@/lib/pigment-colors";
import { GlossaryText } from "@/components/GlossaryText";
import { Button } from "@/components/ui/button";
import { awardEpochCheck } from "@/lib/economy.functions";
import { useCoinAwards } from "@/lib/coin-awards";
import { useAuth } from "@/hooks/useAuth";

export const EPOCH_CHECK_COINS = 40;

type Tab = "zeit" | "technik" | "farbe" | "check";

const tabs: { key: Tab; label: string; icon: typeof Clock }[] = [
  { key: "zeit", label: "Was geschah", icon: Clock },
  { key: "technik", label: "Wie gemalt wurde", icon: Brush },
  { key: "farbe", label: "Farbwelt", icon: Palette },
  { key: "check", label: "Epochen-Check", icon: Sparkles },
];

export function EpochGuide({ slug, guide }: { slug: string; guide: GuideData }) {
  const [tab, setTab] = useState<Tab>("zeit");

  return (
    <section className="mt-12">
      <p className="max-w-2xl text-lg leading-relaxed">
        <GlossaryText text={guide.headline} />
      </p>

      <div className="-mx-4 mt-7 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {tabs.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${tab === item.key ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            <item.icon className="h-4 w-4" /> {item.label}
          </button>
        ))}
      </div>

      <div className="mt-7">
        {tab === "zeit" && (
          <ol className="grid gap-5 sm:grid-cols-2">
            {guide.timeline.map((entry) => (
              <li key={entry.when + entry.title} className="border-t border-border pt-4">
                <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{entry.when}</p>
                <p className="font-display mt-1 text-xl font-medium">{entry.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <GlossaryText text={entry.text} />
                </p>
              </li>
            ))}
          </ol>
        )}

        {tab === "technik" && <TechniqueSteps guide={guide} />}

        {tab === "farbe" && (
          <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {guide.palette.map((name) => (
                <Swatch key={name} name={name} />
              ))}
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              <GlossaryText text={guide.paletteNote} />
            </p>
            <ul className="mt-6 grid gap-2 text-sm">
              {guide.marks.map((mark) => (
                <li key={mark} className="flex items-start gap-2 text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" /> <GlossaryText text={mark} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "check" && <EpochCheck slug={slug} guide={guide} />}
      </div>
    </section>
  );
}

function TechniqueSteps({ guide }: { guide: GuideData }) {
  const [step, setStep] = useState(0);
  const current = guide.technique[step];
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {guide.technique.map((item, index) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setStep(index)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${index === step ? "border-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            {index + 1}. {item.label}
          </button>
        ))}
      </div>
      {current && (
        <div className="mt-6 rounded-lg bg-muted p-6">
          <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Schritt {step + 1} von {guide.technique.length}</p>
          <p className="font-display mt-2 text-2xl font-medium">{current.label}</p>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            <GlossaryText text={current.text} />
          </p>
          <div className="mt-6 flex gap-3">
            <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>Zurück</Button>
            <Button size="sm" disabled={step >= guide.technique.length - 1} onClick={() => setStep((value) => Math.min(guide.technique.length - 1, value + 1))}>Weiter</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Swatch({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const swatch = pigmentSwatch(name);
  return (
    <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-lg border border-border p-3 text-left transition-colors hover:border-foreground">
      <span className="block h-14 w-full rounded-md" style={{ backgroundColor: swatch.hex }} />
      <span className="mt-3 block text-sm font-medium">{name}</span>
      <span className="mt-1 block text-xs text-muted-foreground">{open ? swatch.note : "Antippen für die Herkunft"}</span>
    </button>
  );
}

function EpochCheck({ slug, guide }: { slug: string; guide: GuideData }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const award = useServerFn(awardEpochCheck);
  const { data: awards = [] } = useCoinAwards();
  const alreadyPaid = awards.some((entry) => entry.kind === "epoch_check" && entry.award_key === slug);
  const [answers, setAnswers] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [result, setResult] = useState<{ coins: number; score: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const question = guide.questions[index];

  async function next(answer: string) {
    const collected = [...answers, answer];
    setAnswers(collected);
    setPicked(null);
    if (index < guide.questions.length - 1) {
      setIndex(index + 1);
      return;
    }
    const score = guide.questions.reduce((total, item, position) => total + (collected[position] === item.answer ? 1 : 0), 0);
    if (!user) {
      setResult({ coins: 0, score });
      return;
    }
    setBusy(true);
    try {
      const response = (await award({ data: { epoch: slug, answers: collected } })) as { coins?: number; awarded?: number; score?: number };
      setResult({ coins: response.awarded ?? 0, score: response.score ?? score });
      await queryClient.invalidateQueries({ queryKey: ["user_stats"] });
      await queryClient.invalidateQueries({ queryKey: ["coin_awards"] });
    } catch {
      setResult({ coins: 0, score });
    } finally {
      setBusy(false);
    }
  }

  if (result) {
    return (
      <div className="rounded-lg border border-border p-7">
        <p className="font-display text-2xl font-medium">{result.score} von {guide.questions.length} richtig</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {result.coins > 0
            ? `Belohnung gesichert: ${result.coins} Coins für diese Epoche.`
            : alreadyPaid || result.score === guide.questions.length
              ? "Diese Epoche hast du bereits abgeschlossen — die Belohnung gibt es einmalig."
              : `Mit ${guide.questions.length} von ${guide.questions.length} bekommst du ${EPOCH_CHECK_COINS} Coins. Lies die Karten oben noch einmal und versuch es erneut.`}
        </p>
        <ul className="mt-6 grid gap-4">
          {guide.questions.map((item, position) => (
            <li key={item.prompt} className="border-t border-border pt-3 text-sm">
              <p className="font-medium">{item.prompt}</p>
              <p className="mt-1 text-muted-foreground">{answers[position] === item.answer ? "Richtig. " : `Richtig wäre: ${item.answer}. `}{item.explain}</p>
            </li>
          ))}
        </ul>
        <Button className="mt-6" variant="outline" size="sm" onClick={() => { setAnswers([]); setIndex(0); setResult(null); }}>Noch einmal</Button>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="rounded-lg border border-border p-7">
      <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
        <span>Frage {index + 1} von {guide.questions.length}</span>
        {!alreadyPaid && <span className="flex items-center gap-1"><Coins className="h-3.5 w-3.5" /> {EPOCH_CHECK_COINS} Coins</span>}
      </div>
      <p className="font-display mt-3 text-2xl font-medium">{question.prompt}</p>
      <div className="mt-6 grid gap-3">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            disabled={busy}
            onClick={() => { setPicked(option); void next(option); }}
            className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${picked === option ? "border-foreground" : "border-border hover:border-foreground"}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

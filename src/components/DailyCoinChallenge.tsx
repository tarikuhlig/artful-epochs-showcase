import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, Coins, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dailyChallenge } from "@/lib/daily-coin-challenge";
import { completeDailyCoinChallenge } from "@/lib/economy.functions";
import { useDailyCoinChallenge } from "@/lib/economy";
import { todayISO, useInvalidateFarm } from "@/lib/farm";
import coin from "@/assets/provenance-coin.png";

export function DailyCoinChallenge() {
  const date = todayISO();
  const questions = dailyChallenge(date);
  const { data: completed, refetch } = useDailyCoinChallenge(date);
  const completeChallenge = useServerFn(completeDailyCoinChallenge);
  const invalidateFarm = useInvalidateFarm();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const question = questions[step];

  if (completed) {
    return <section className="mt-14 overflow-hidden rounded-xl border border-border bg-path-leaf p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div><p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Tägliche Coin-Challenge</p><h2 className="font-display mt-2 text-2xl font-medium">Heute gemeistert</h2><p className="mt-2 text-sm text-muted-foreground">{completed.score} von 3 richtig · Morgen wartet eine neue Kunstfrage auf dich.</p></div>
        <div className="flex items-center gap-3"><img src={coin} alt="" className="h-12 w-12" /><p className="font-display text-2xl font-medium">+{completed.coin_reward} <span className="text-sm text-muted-foreground">Coins</span></p></div>
      </div>
    </section>;
  }

  if (!question) return null;
  const isCorrect = selected === question.answer;

  async function next() {
    if (!selected) return;
    const nextAnswers = [...answers, selected];
    if (step < questions.length - 1) {
      setAnswers(nextAnswers); setStep(step + 1); setSelected(""); setRevealed(false); return;
    }
    setBusy(true); setError("");
    try {
      await completeChallenge({ data: { date, answers: nextAnswers } });
      await refetch(); invalidateFarm();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Die Belohnung konnte nicht gespeichert werden.");
    } finally { setBusy(false); }
  }

  return <section className="mt-14 overflow-hidden rounded-xl border border-border bg-path-leaf">
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-5 sm:px-8">
      <div><p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Tägliche Coin-Challenge</p><h2 className="font-display mt-1 text-2xl font-medium">Kunstwissen zahlt sich aus</h2></div>
      <div className="flex items-center gap-2 rounded-full bg-background px-4 py-2 text-sm"><img src={coin} alt="" className="h-6 w-6" /><span>bis zu 60 Coins</span></div>
    </div>
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between text-xs text-muted-foreground"><span>Frage {step + 1} von 3</span><span>10 Coins je Treffer · 30 Bonus bei 3/3</span></div>
      <div className="mt-3 flex gap-2">{questions.map((item, index) => <span key={item.id} className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-coin" : "bg-background"}`} />)}</div>
      <h3 className="font-display mt-7 text-2xl font-medium">{question.prompt}</h3>
      <div className={`mt-6 grid gap-3 ${question.comparisonImage ? "grid-cols-2" : "grid-cols-1"}`}>
        {question.image && <img src={question.image} alt="Werk für die heutige Kunstfrage" className="h-52 w-full rounded-lg object-cover sm:h-72" />}
        {question.comparisonImage && <img src={question.comparisonImage} alt="Vergleichswerk für die heutige Kunstfrage" className="h-52 w-full rounded-lg object-cover sm:h-72" />}
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">{question.options.map((option) => {
        const picked = selected === option.value;
        const resultStyle = revealed && option.value === question.answer ? "border-coin bg-background" : revealed && picked ? "border-destructive bg-background" : picked ? "border-foreground bg-background" : "border-border bg-background";
        return <Button key={option.value} type="button" variant="outline" disabled={revealed} onClick={() => setSelected(option.value)} className={`h-auto min-h-12 justify-start whitespace-normal rounded-lg px-4 py-3 text-left font-normal ${resultStyle}`}>{option.label}</Button>;
      })}</div>
      {revealed && <div className="mt-5 flex gap-3 rounded-lg bg-background p-4 text-sm"><span className={`mt-0.5 ${isCorrect ? "text-coin" : "text-destructive"}`}>{isCorrect ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}</span><p><span className="font-medium">{isCorrect ? "Richtig." : "Nicht ganz."}</span> {question.explanation}</p></div>}
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      <div className="mt-6 flex justify-end">{!revealed ? <Button type="button" disabled={!selected} onClick={() => setRevealed(true)} className="rounded-full px-6"><Sparkles className="h-4 w-4" /> Antwort prüfen</Button> : <Button type="button" disabled={busy} onClick={next} className="rounded-full px-6">{busy ? "Coins werden gutgeschrieben …" : step === 2 ? <><Coins className="h-4 w-4" /> Challenge abschließen</> : "Nächste Frage"}</Button>}</div>
    </div>
  </section>;
}
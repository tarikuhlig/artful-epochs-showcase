import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Layers, LockKeyhole, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CARD_QUIZ_CARDS, CARD_QUIZ_ROUNDS_PER_DAY, cardQuizRound, cardQuizReward } from "@/lib/card-quiz";
import { useCardQuizRounds } from "@/lib/economy";
import { completeCardQuizRound } from "@/lib/economy.functions";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useInvalidateFarm } from "@/lib/farm";
import coin from "@/assets/provenance-coin.png";

export function CardQuiz() {
  const today = new Date().toISOString().slice(0, 10);
  const { hasAccess } = usePremiumAccess();
  const { data: rounds = [], refetch } = useCardQuizRounds(today);
  const submit = useServerFn(completeCardQuizRound);
  const queryClient = useQueryClient();
  const invalidateFarm = useInvalidateFarm();
  const [answers, setAnswers] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const playedRounds = rounds.map((round) => round.round_index);
  const nextRound = useMemo(() => {
    for (let i = 0; i < CARD_QUIZ_ROUNDS_PER_DAY; i++) if (!playedRounds.includes(i)) return i;
    return -1;
  }, [playedRounds.join(",")]);
  const cards = useMemo(() => (nextRound >= 0 ? cardQuizRound(today, nextRound) : []), [today, nextRound]);
  const card = cards[index];
  const earnedToday = rounds.reduce((sum, round) => sum + round.coin_reward, 0);

  async function choose(option: string) {
    if (busy || !card) return;
    const nextAnswers = [...answers, option];
    setAnswers(nextAnswers);
    if (nextAnswers.length < CARD_QUIZ_CARDS) {
      setTimeout(() => setIndex((current) => current + 1), 550);
      return;
    }
    setBusy(true);
    try {
      const score = cards.reduce((total, item, i) => total + (nextAnswers[i] === item.answer ? 1 : 0), 0);
      await submit({ data: { date: today, round: nextRound, answers: nextAnswers } });
      setMessage(`${score} von ${CARD_QUIZ_CARDS} richtig — ${cardQuizReward(score)} Coins gutgeschrieben.`);
      setAnswers([]); setIndex(0);
      await refetch();
      invalidateFarm();
      await queryClient.invalidateQueries({ queryKey: ["user_stats"] });
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Die Runde konnte nicht gewertet werden.");
      setAnswers([]); setIndex(0);
    } finally { setBusy(false); }
  }

  return <section className="rounded-lg border border-border bg-card p-6 sm:p-8">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><Layers className="h-4 w-4" /> Karten-Quiz</div>
        <h2 className="font-display mt-2 text-2xl font-medium">Bilder erkennen, Coins verdienen</h2>
        <p className="mt-1 text-sm text-muted-foreground">Acht Bildkarten pro Runde, fünf Runden am Tag. 5 Coins je Treffer, 20 Bonus bei 8/8.</p>
      </div>
      <p className="flex items-center gap-2 text-sm"><img src={coin} alt="" className="h-6 w-6" />{earnedToday} heute</p>
    </div>

    {message && <p role="status" className="mt-5 text-sm">{message}</p>}

    {!hasAccess ? <p className="mt-6 flex items-center gap-2 rounded-lg bg-muted p-4 text-sm text-muted-foreground"><LockKeyhole className="h-4 w-4" /> Mit Premium verdienst du hier täglich bis zu {CARD_QUIZ_ROUNDS_PER_DAY * (CARD_QUIZ_CARDS * 5 + 20)} Coins fürs Auktionshaus.</p>
      : nextRound < 0 ? <p className="mt-6 rounded-lg bg-path-leaf p-5 text-sm">Alle {CARD_QUIZ_ROUNDS_PER_DAY} Runden von heute gespielt. Morgen warten neue Karten.</p>
      : card ? <div className="mt-6">
        <p className="text-xs text-muted-foreground">Runde {nextRound + 1} von {CARD_QUIZ_ROUNDS_PER_DAY} · Karte {index + 1} von {CARD_QUIZ_CARDS}</p>
        <div className="mt-4 grid gap-5 md:grid-cols-[1fr_1fr]">
          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted"><img src={card.image} alt="Werk erraten" className="h-full w-full object-cover" /></div>
          <div className="flex flex-col justify-center">
            <p className="font-display text-xl font-medium">Wer malte dieses Werk?</p>
            <div className="mt-4 grid gap-2">{card.options.map((option) => {
              const picked = answers[index];
              const state = !picked ? "" : option === card.answer ? "border-foreground bg-path-leaf" : picked === option ? "border-destructive/40 bg-destructive/5" : "";
              return <Button key={option} type="button" variant="outline" disabled={!!picked || busy} onClick={() => choose(option)} className={`h-auto min-h-11 justify-start whitespace-normal rounded-lg px-4 py-3 text-left font-normal ${state}`}>
                {picked && option === card.answer && <Check className="h-4 w-4" />}
                {picked === option && option !== card.answer && <X className="h-4 w-4 text-destructive" />}
                {option}
              </Button>;
            })}</div>
            {answers[index] && <p className="mt-3 text-xs text-muted-foreground">{card.title} · {card.year}</p>}
          </div>
        </div>
      </div> : null}
  </section>;
}

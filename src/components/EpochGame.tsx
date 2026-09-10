import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Coins } from "lucide-react";
import { EPOCH_GAME_COINS_PER_HIT, EPOCH_GAME_ROUNDS_PER_DAY, epochGameRound } from "@/lib/epoch-game";
import { awardEpochGame } from "@/lib/economy.functions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

/** Wiederholbares Spiel: Epoche eines unbekannten Werks erkennen und Coins verdienen. */
export function EpochGame() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const play = useServerFn(awardEpochGame);
  const date = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [round, setRound] = useState(0);
  const cards = useMemo(() => epochGameRound(date, round), [date, round]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState<{ score: number; coins: number; roundsToday: number } | null>(null);
  const [error, setError] = useState("");
  const card = cards[index];

  async function choose(option: string) {
    setPicked(option);
    const collected = [...answers, option];
    setAnswers(collected);
    window.setTimeout(async () => {
      setPicked(null);
      if (index < cards.length - 1) {
        setIndex(index + 1);
        return;
      }
      const score = cards.reduce((total, item, position) => total + (collected[position] === item.answer ? 1 : 0), 0);
      if (!user) {
        setDone({ score, coins: 0, roundsToday: 0 });
        return;
      }
      try {
        const response = (await play({ data: { date, round, answers: collected } })) as { awarded?: number; rounds_today?: number; score?: number };
        setDone({ score: response.score ?? score, coins: response.awarded ?? 0, roundsToday: response.rounds_today ?? 0 });
        await queryClient.invalidateQueries({ queryKey: ["user_stats"] });
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "Die Runde konnte nicht gewertet werden.");
        setDone({ score, coins: 0, roundsToday: EPOCH_GAME_ROUNDS_PER_DAY });
      }
    }, 450);
  }

  function nextRound() {
    setRound((value) => value + 1);
    setIndex(0);
    setAnswers([]);
    setDone(null);
    setError("");
  }

  if (cards.length === 0) return null;

  if (done) {
    const canContinue = round + 1 < EPOCH_GAME_ROUNDS_PER_DAY;
    return (
      <div className="rounded-lg border border-border p-7">
        <p className="font-display text-2xl font-medium">{done.score} von {cards.length} Epochen erkannt</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {done.coins > 0 ? `+${done.coins} Coins.` : "Diesmal ohne Coins."} {error || (canContinue ? `Noch ${EPOCH_GAME_ROUNDS_PER_DAY - round - 1} Runde(n) heute möglich.` : "Das war die letzte Runde für heute — morgen gibt es neue Werke.")}
        </p>
        <ul className="mt-5 grid gap-2 text-sm text-muted-foreground">
          {cards.map((item, position) => (
            <li key={item.workId}>
              <span className="text-foreground">{item.title}</span> — {item.answer}
              {answers[position] !== item.answer && <span> (du: {answers[position]})</span>}
            </li>
          ))}
        </ul>
        {canContinue && <Button className="mt-6" size="sm" onClick={nextRound}>Nächste Runde</Button>}
      </div>
    );
  }

  if (!card) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="relative aspect-[16/10] bg-muted">
        <img src={card.image} alt="Unbekanntes Werk" className="absolute inset-0 h-full w-full object-contain" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          <span>Werk {index + 1} von {cards.length} · Runde {round + 1}</span>
          <span className="flex items-center gap-1"><Coins className="h-3.5 w-3.5" /> {EPOCH_GAME_COINS_PER_HIT} je Treffer</span>
        </div>
        <p className="font-display mt-3 text-xl font-medium">Aus welcher Epoche stammt dieses Werk?</p>
        <p className="mt-1 text-xs text-muted-foreground">Hinweis: {card.hint}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {card.options.map((option) => (
            <button
              key={option}
              type="button"
              disabled={!!picked}
              onClick={() => void choose(option)}
              className={`rounded-lg border px-4 py-3 text-left text-sm transition-colors ${picked === option ? "border-foreground" : "border-border hover:border-foreground"}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

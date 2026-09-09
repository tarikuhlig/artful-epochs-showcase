import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { BookOpen, Check, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dailyLesson, type LessonKind } from "@/lib/daily-lessons";
import { completeDailyLesson } from "@/lib/economy.functions";
import { useDailyLessons } from "@/lib/economy";
import { DAILY_LESSON_MAX } from "@/lib/coin-economy";
import { todayISO, useInvalidateFarm } from "@/lib/farm";
import coin from "@/assets/provenance-coin.png";

/** Tageswerk oder Tageskünstler: erst Stoff lesen, dann zwei Fragen dazu beantworten. */
export function DailyLesson({ kind }: { kind: LessonKind }) {
  const date = todayISO();
  const lesson = dailyLesson(kind, date);
  const { data: done = [], refetch } = useDailyLessons(date);
  const submit = useServerFn(completeDailyLesson);
  const invalidateFarm = useInvalidateFarm();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const finished = done.find((entry) => entry.kind === kind);
  const label = kind === "work" ? "Werk des Tages" : "Künstler des Tages";
  const total = lesson.questions.length;

  async function next() {
    if (!selected) return;
    const nextAnswers = [...answers, selected];
    setAnswers(nextAnswers);
    setSelected("");
    if (nextAnswers.length < total) { setStep((value) => value + 1); return; }
    setBusy(true); setError("");
    try {
      await submit({ data: { date, kind, answers: nextAnswers } });
      await refetch();
      invalidateFarm();
      await queryClient.invalidateQueries({ queryKey: ["user_stats"] });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Die Tageskarte konnte nicht gewertet werden.");
      setAnswers([]); setStep(0);
    } finally { setBusy(false); }
  }

  const question = lesson.questions[step];

  return <section className="rounded-lg border border-border bg-card p-6 sm:p-8">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-[10px] tracking-[0.24em] text-muted-foreground uppercase">{label}</p>
        <h3 className="font-display mt-2 text-2xl font-medium">{lesson.title}</h3>
        <p className="text-sm text-muted-foreground">{lesson.subtitle}</p>
      </div>
      <p className="flex items-center gap-2 text-sm text-muted-foreground"><img src={coin} alt="" className="h-6 w-6" /> bis {DAILY_LESSON_MAX}</p>
    </div>

    <div className="mt-5 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {lesson.image && <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
        <img src={lesson.image} alt={lesson.title} loading="lazy" className="h-full w-full object-cover" />
      </div>}

      <div>
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><BookOpen className="h-4 w-4" /> Stoff für heute</div>
        <dl className="mt-3 space-y-2 text-sm leading-relaxed">
          {lesson.study.map((item) => <div key={item.label}>
            <dt className="text-xs text-muted-foreground">{item.label}</dt>
            <dd>{item.text}</dd>
          </div>)}
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          {lesson.link.workId && <Button asChild variant="outline" size="sm" className="rounded-full font-normal"><Link to="/werke/$id" params={{ id: lesson.link.workId }}>Werk ansehen</Link></Button>}
          {lesson.link.painterSlug && <Button asChild variant="outline" size="sm" className="rounded-full font-normal"><Link to="/maler/$slug" params={{ slug: lesson.link.painterSlug }}>Künstler ansehen</Link></Button>}
        </div>
      </div>
    </div>

    <div className="mt-6 border-t border-border pt-5">
      {finished ? <p className="flex flex-wrap items-center gap-2 text-sm"><Sparkles className="h-4 w-4" />Heute gelernt: {finished.score} von {total} richtig — <span className="inline-flex items-center gap-1">+{finished.coin_reward} <img src={coin} alt="Coins" className="h-4 w-4" /></span> gutgeschrieben. Morgen wartet die nächste Karte.</p>
        : question ? <>
        <p className="text-xs text-muted-foreground">Frage {step + 1} von {total} · beide richtig gibt Bonus</p>
        <p className="font-display mt-2 text-lg font-medium">{question.question}</p>
        <div className="mt-3 grid gap-2">{question.options.map((option) => <Button key={option} type="button" variant="outline" onClick={() => setSelected(option)} className={`h-auto min-h-11 justify-start whitespace-normal rounded-lg px-4 py-3 text-left font-normal ${selected === option ? "border-foreground bg-path-leaf" : ""}`}>
          {selected === option && <Check className="h-4 w-4" />}{option}
        </Button>)}</div>
        <Button type="button" disabled={!selected || busy} onClick={next} className="mt-4 rounded-full">{busy ? "Wird gewertet …" : step < total - 1 ? "Weiter" : "Antworten abgeben"}</Button>
        {error && <p className="mt-3 flex items-center gap-2 text-sm text-destructive"><X className="h-4 w-4" />{error}</p>}
      </> : null}
    </div>
  </section>;
}

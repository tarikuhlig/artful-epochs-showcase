import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { allWorks } from "@/lib/art-data";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Kunst-Quiz — Wer hat dieses Werk gemalt? | Ars" },
      {
        name: "description",
        content:
          "Teste dein Kunstwissen: Erkenne Meisterwerke und ordne sie dem richtigen Maler zu.",
      },
      { property: "og:title", content: "Kunst-Quiz — Wer hat dieses Werk gemalt? | Ars" },
      {
        property: "og:description",
        content: "Teste dein Kunstwissen mit Meisterwerken der großen Epochen.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: QuizPage,
});

type Question = {
  workId: string;
  image: string;
  title: string;
  correct: string;
  options: string[];
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(): Question[] {
  const painters = [...new Set(allWorks.map((w) => w.painter.name))];
  return shuffle(allWorks)
    .slice(0, 6)
    .map((work) => {
      const wrong = shuffle(painters.filter((p) => p !== work.painter.name)).slice(0, 2);
      return {
        workId: work.id,
        image: work.image,
        title: work.title,
        correct: work.painter.name,
        options: shuffle([work.painter.name, ...wrong]),
      };
    });
}

function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>(() => buildQuestions());
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const done = index >= questions.length;

  const question = questions[index]!;

  const progress = useMemo(
    () => (done ? 100 : Math.round((index / questions.length) * 100)),
    [index, questions.length, done],
  );

  function pick(option: string) {
    if (picked) return;
    setPicked(option);
    if (option === question.correct) setScore((s) => s + 1);
  }

  function next() {
    setPicked(null);
    setIndex((i) => i + 1);
  }

  function restart() {
    setQuestions(buildQuestions());
    setIndex(0);
    setPicked(null);
    setScore(0);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <header className="text-center">
        <h1 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
          Kunst-Quiz
        </h1>
        <p className="mt-3 text-muted-foreground">
          Wer hat dieses Werk gemalt? Sechs Fragen warten auf dich.
        </p>
      </header>

      <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {done ? (
        <div className="mt-12 rounded-2xl border border-border bg-card p-10 text-center">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            Dein Ergebnis
          </p>
          <p className="font-display mt-2 text-6xl font-medium">
            {score} <span className="text-2xl text-muted-foreground">/ {questions.length}</span>
          </p>
          <p className="mt-3 text-muted-foreground">
            {score === questions.length
              ? "Perfekt! Ein wahrer Kunstkenner."
              : score >= questions.length / 2
                ? "Stark! Ein Blick in die Epochen lohnt sich trotzdem."
                : "Guter Anfang — schau dir die Maler in Ruhe an und versuch es nochmal."}
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <RotateCcw className="h-4 w-4" />
              Nochmal spielen
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              Weiterlernen
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-border bg-muted">
            <img
              src={question.image}
              alt="Zu erratendes Kunstwerk"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Frage {index + 1} von {questions.length}
            {picked ? ` — „${question.title}"` : ""}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {question.options.map((option) => {
              const isCorrect = picked && option === question.correct;
              const isWrongPick = picked === option && option !== question.correct;
              return (
                <button
                  key={option}
                  onClick={() => pick(option)}
                  disabled={!!picked}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                    isCorrect
                      ? "border-primary bg-primary text-primary-foreground"
                      : isWrongPick
                        ? "border-destructive bg-destructive text-destructive-foreground"
                        : "border-border bg-card hover:bg-accent"
                  }`}
                >
                  {isCorrect && <Check className="h-4 w-4" />}
                  {isWrongPick && <X className="h-4 w-4" />}
                  {option}
                </button>
              );
            })}
          </div>
          {picked && (
            <div className="mt-6 text-center">
              <button
                onClick={next}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {index + 1 === questions.length ? "Zum Ergebnis" : "Nächste Frage"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

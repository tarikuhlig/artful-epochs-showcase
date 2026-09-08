import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { findJourney } from "@/lib/journeys";
import { findWork } from "@/lib/art-data";
import { useAuth } from "@/hooks/useAuth";
import { completeJourney, useInvalidateFarm, useJourneyProgress } from "@/lib/farm";

export const Route = createFileRoute("/reisen/$slug")({
  loader: ({ params }) => {
    const journey = findJourney(params.slug);
    if (!journey) throw notFound();
    return journey;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Kunstreise | Provenance` },
          { name: "description", content: loaderData.intro.slice(0, 155) },
          { property: "og:title", content: `${loaderData.title} — Kunstreise | Provenance` },
          { property: "og:description", content: loaderData.subtitle },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Kunstreise nicht gefunden | Provenance" }, { name: "robots", content: "noindex" }],
  }),
  component: JourneyPage,
});

function JourneyPage() {
  const journey = Route.useLoaderData();
  const { user } = useAuth();
  const { data: done } = useJourneyProgress();
  const invalidate = useInvalidateFarm();
  const [saving, setSaving] = useState(false);
  const [justFinished, setJustFinished] = useState(false);

  const completed = !!done?.some((d) => d.journey_slug === journey.slug) || justFinished;

  async function finish() {
    if (!user) return;
    setSaving(true);
    try {
      await completeJourney(user.id, journey.slug, journey.reward);
      setJustFinished(true);
      invalidate();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
      <Link
        to="/reisen"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Alle Kunstreisen
      </Link>

      <p className="mt-8 text-xs tracking-[0.2em] text-muted-foreground uppercase">
        {journey.kind} · {journey.era}
      </p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight md:text-5xl">
        {journey.title}
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">{journey.subtitle}</p>
      <p className="mt-6 text-base leading-relaxed">{journey.intro}</p>

      <ol className="mt-14 space-y-12">
        {journey.stops.map((stop, i) => {
          const work = stop.workId ? findWork(stop.workId) : undefined;
          return (
            <li key={i} className="relative border-l border-border pl-8">
              <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-[11px] font-medium">
                {i + 1}
              </span>
              <h2 className="font-display text-2xl font-medium">{stop.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{stop.text}</p>
              {work && (
                <Link
                  to="/werke/$id"
                  params={{ id: work.id }}
                  className="group mt-5 block overflow-hidden rounded-xl border border-border bg-card"
                >
                  <div className="aspect-16/9 overflow-hidden bg-muted">
                    <img
                      src={work.image}
                      alt={`${work.title} von ${work.painter.name}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs tracking-widest text-muted-foreground uppercase">
                      {work.painter.name} · {work.year}
                    </p>
                    <p className="font-display mt-1 text-lg font-medium">{work.title}</p>
                  </div>
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-16 rounded-xl border border-border bg-muted/40 p-8 text-center">
        {completed ? (
          <p className="inline-flex items-center gap-2 text-sm font-medium">
            <Check className="h-4 w-4" />
            Reise abgeschlossen — {journey.reward} Punkte gesichert
          </p>
        ) : user ? (
          <>
            <p className="text-sm text-muted-foreground">
              Reise beendet? Sichere dir {journey.reward} Punkte für dein Atelier.
            </p>
            <button
              onClick={finish}
              disabled={saving}
              className="mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Wird gesichert …" : "Reise abschließen"}
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              Melde dich an, um Reisen abzuschließen und Punkte zu sammeln.
            </p>
            <Link
              to="/auth"
              className="mt-4 inline-flex rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Anmelden
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

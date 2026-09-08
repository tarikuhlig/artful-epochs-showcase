import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { journeys } from "@/lib/journeys";
import { findWork } from "@/lib/art-data";

export const Route = createFileRoute("/reisen/")({
  head: () => ({
    meta: [
      { title: "Kunstreisen — geführte Touren durch Strömungen und Orte | Provenance" },
      {
        name: "description",
        content:
          "Kuratierte Kunstreisen: Florenz der Medici, Paris 1874, die New Yorker Schule und die Nachkriegsmalerei — Schritt für Schritt erzählt.",
      },
      { property: "og:title", content: "Kunstreisen | Provenance" },
      {
        property: "og:description",
        content: "Geführte Touren durch Epochen, Städte und Strömungen der Kunstgeschichte.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReisenPage,
});

function ReisenPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
        Kunstreisen
      </p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight md:text-5xl">
        Geführte Touren
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Jede Reise führt in mehreren Etappen durch eine Stadt, eine Strömung oder eine Idee. Am Ende
        gibt es Punkte für deine Sammlung.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {journeys.map((j) => {
          const cover = j.stops.map((s) => s.workId).find(Boolean);
          const work = cover ? findWork(cover) : undefined;
          return (
            <Link
              key={j.slug}
              to="/reisen/$slug"
              params={{ slug: j.slug }}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              {work && (
                <div className="aspect-16/9 overflow-hidden bg-muted">
                  <img
                    src={work.image}
                    alt={j.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="text-xs tracking-widest text-muted-foreground uppercase">
                  {j.kind} · {j.era} · {j.stops.length} Etappen
                </p>
                <h2 className="font-display mt-2 text-2xl font-medium">{j.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{j.subtitle}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                  Reise starten
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

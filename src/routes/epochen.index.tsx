import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { epochs, allPainters, allWorks } from "@/lib/art-data";

export const Route = createFileRoute("/epochen/")({
  head: () => ({
    meta: [
      { title: "Epochen der Malerei — von der Gotik bis zur Moderne | Provenance" },
      {
        name: "description",
        content:
          "Alle Epochen der Kunstgeschichte im Überblick: Gotik, Renaissance, Barock, Rokoko, Realismus, Moderne — mit Malern und Meisterwerken.",
      },
      { property: "og:title", content: "Epochen der Malerei | Provenance" },
      {
        property: "og:description",
        content: "Die großen Kapitel der Malerei, jedes mit seinen Malern und Werken.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EpochenIndex,
});

function EpochenIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="font-display text-[11px] tracking-[0.35em] text-muted-foreground uppercase">
        {epochs.length} Epochen · {allPainters.length} Maler · {allWorks.length} Werke
      </p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-[-0.03em] uppercase md:text-5xl">
        Die Epochen
      </h1>
      <p className="mt-4 mb-10 max-w-2xl text-muted-foreground">
        Die großen Kapitel der Malerei — jedes mit seinen Malern, Werken und Ideen.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {epochs.map((epoch, i) => {
          const cover = epoch.painters[0]?.works[0];
          return (
            <Link
              key={epoch.slug}
              to="/epochen/$epoche"
              params={{ epoche: epoch.slug }}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                {cover && (
                  <img
                    src={cover.image}
                    alt={cover.title}
                    loading={i > 1 ? "lazy" : undefined}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="font-display text-[10px] font-medium tracking-[0.3em] text-white/80 uppercase">
                    {epoch.period}
                  </p>
                  <h2 className="font-display mt-1 text-3xl font-medium tracking-[-0.02em] text-white uppercase">
                    {epoch.name}
                  </h2>
                </div>
              </div>
              <div className="flex items-center justify-between p-6">
                <p className="text-sm text-muted-foreground">
                  {epoch.painters.length} Maler ·{" "}
                  {epoch.painters.reduce((n, p) => n + p.works.length, 0)} Werke
                </p>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { epochs, allPainters, allWorks } from "@/lib/art-data";
import { isFreeEpoch } from "@/lib/premium-access";
import { PremiumBadge } from "@/components/PremiumLock";

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
  const chronologicalEpochs = [...epochs].sort((a, b) => {
    const firstYear = (period: string) => Number(period.match(/\d{3,4}/)?.[0] ?? Number.MAX_SAFE_INTEGER);
    return firstYear(a.period) - firstYear(b.period);
  });

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
        {chronologicalEpochs.map((epoch, i) => {
          const cover = epoch.painters[0]?.works[0];
          const free = isFreeEpoch(epoch.slug);
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
                {!free && <span className="absolute right-4 top-4"><PremiumBadge /></span>}
              </div>
              <div className="flex items-center justify-between p-6">
                <p className="text-sm text-muted-foreground">
                  {free ? "Gratis" : "Vorschau"} · {epoch.painters.length} Maler ·{" "}
                  {epoch.painters.reduce((n, p) => n + p.works.length, 0)} Werke
                </p>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

      <Link
        to="/moderne"
        className="group mt-8 flex items-center justify-between gap-4 rounded-xl border border-border p-6 transition-colors hover:bg-accent"
      >
        <span>
          <span className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            Noch geschützt
          </span>
          <span className="font-display mt-1 block text-2xl font-medium">
            Moderne &amp; Gegenwart
          </span>
          <span className="mt-1 block text-sm text-muted-foreground">
            Rothko, Picasso, Kahlo, Warhol und mehr — lernen ohne Abbildung, mit Weg zum Museum.
          </span>
        </span>
        <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

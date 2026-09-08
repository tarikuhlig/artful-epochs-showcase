import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Palette } from "lucide-react";
import { epochs, allPainters, allWorks } from "@/lib/art-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Provenance — Maler, Epochen und ihre Werke entdecken" },
      {
        name: "description",
        content:
          "Lerne die großen Maler der Kunstgeschichte kennen: von der Renaissance über Romantik und Impressionismus bis zur Moderne — mit Werken, Beschreibungen und Quiz.",
      },
      { property: "og:title", content: "Provenance — Maler, Epochen und ihre Werke entdecken" },
      {
        property: "og:description",
        content:
          "Die großen Epochen der Malerei entdecken: Maler, Werke und Geschichten — klar und schön geordnet.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 text-center md:pt-32">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          <Palette className="h-3.5 w-3.5" />
          Kunstgeschichte zum Lernen
        </p>
        <h1 className="font-display text-5xl leading-tight font-medium tracking-tight md:text-7xl">
          Die großen Maler
          <br />
          <span className="text-muted-foreground italic">und ihre Werke</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
          Entdecke {allPainters.length} Maler aus {epochs.length} Epochen — mit{" "}
          {allWorks.length} Meisterwerken, kurzen Erklärungen und einem Quiz, das
          dein Wissen testet.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="#epochen"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Epochen entdecken
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            Zum Quiz
          </Link>
        </div>
      </section>

      {/* Epochen */}
      <section id="epochen" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {epochs.map((epoch, i) => {
            const cover = epoch.painters[0]?.works[0];
            return (
              <Link
                key={epoch.slug}
                to="/epochen/$epoche"
                params={{ epoche: epoch.slug }}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  {cover && (
                    <img
                      src={cover.image}
                      alt={cover.title}
                      loading={i > 0 ? "lazy" : undefined}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <p className="text-xs font-medium tracking-widest text-white/80 uppercase">
                      {epoch.period}
                    </p>
                    <h2 className="font-display mt-1 text-3xl font-medium text-white">
                      {epoch.name}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center justify-between p-6">
                  <p className="text-sm text-muted-foreground">
                    {epoch.painters.length}{" "}
                    {epoch.painters.length === 1 ? "Maler" : "Maler"} ·{" "}
                    {epoch.painters.reduce((n, p) => n + p.works.length, 0)} Werke
                  </p>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

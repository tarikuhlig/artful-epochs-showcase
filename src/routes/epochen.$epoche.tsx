import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { findEpoch } from "@/lib/art-data";

export const Route = createFileRoute("/epochen/$epoche")({
  loader: ({ params }) => {
    const epoch = findEpoch(params.epoche);
    if (!epoch) throw notFound();
    return epoch;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Epoche | Ars` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.name} — Epoche | Ars` },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Epoche nicht gefunden | Ars" }, { name: "robots", content: "noindex" }],
  }),
  component: EpochPage,
});

function EpochPage() {
  const epoch = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Alle Epochen
      </Link>

      <header className="mt-8 max-w-2xl">
        <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
          {epoch.period}
        </p>
        <h1 className="font-display mt-2 text-4xl font-medium tracking-tight md:text-6xl">
          {epoch.name}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {epoch.description}
        </p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {epoch.painters.map((painter) => {
          const cover = painter.works[0];
          return (
            <Link
              key={painter.slug}
              to="/maler/$slug"
              params={{ slug: painter.slug }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                {cover && (
                  <img
                    src={cover.image}
                    alt={cover.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex items-center justify-between p-6">
                <div>
                  <h2 className="font-display text-2xl font-medium">{painter.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {painter.life} · {painter.works.length}{" "}
                    {painter.works.length === 1 ? "Werk" : "Werke"}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

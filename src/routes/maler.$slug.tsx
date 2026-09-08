import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { findPainter } from "@/lib/art-data";
import { useTrackDiscovery } from "@/lib/progress";

export const Route = createFileRoute("/maler/$slug")({
  loader: ({ params }) => {
    const painter = findPainter(params.slug);
    if (!painter) throw notFound();
    return painter;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Maler | Provenance` },
          { name: "description", content: loaderData.bio },
          { property: "og:title", content: `${loaderData.name} — Maler | Provenance` },
          { property: "og:description", content: loaderData.bio },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Maler nicht gefunden | Provenance" }, { name: "robots", content: "noindex" }],
  }),
  component: PainterPage,
});

function PainterPage() {
  const painter = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <Link
        to="/epochen/$epoche"
        params={{ epoche: painter.epoch.slug }}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {painter.epoch.name}
      </Link>

      <header className="mt-8 max-w-2xl">
        <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
          {painter.life} · {painter.epoch.name}
        </p>
        <h1 className="font-display mt-2 text-4xl font-medium tracking-tight md:text-6xl">
          {painter.name}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {painter.bio}
        </p>
      </header>

      <h2 className="font-display mt-16 mb-6 text-2xl font-medium md:text-3xl">
        Werke
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {painter.works.map((work) => (
          <Link
            key={work.id}
            to="/werke/$id"
            params={{ id: work.id }}
            className="group"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-muted">
              <img
                src={work.image}
                alt={`${work.title} von ${painter.name}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="font-display mt-3 text-lg font-medium">{work.title}</h3>
            <p className="text-sm text-muted-foreground">{work.year}</p>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {work.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

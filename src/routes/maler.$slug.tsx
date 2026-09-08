import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { findPainter } from "@/lib/art-data";
import { useTrackDiscovery } from "@/lib/progress";
import { isFreePainter } from "@/lib/premium-access";
import { PremiumLock } from "@/components/PremiumLock";

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
  const free = isFreePainter(painter.slug);
  useTrackDiscovery("painter", painter.slug, free);

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

      <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Lebensdaten", value: painter.life },
          { label: "Epoche", value: painter.epoch.name },
          { label: "Zeitraum", value: painter.epoch.period },
          {
            label: "Werke hier",
            value: `${painter.works.length}`,
          },
        ].map((fact) => (
          <div key={fact.label} className="rounded-md border border-border p-4">
            <dt className="text-[11px] tracking-widest text-muted-foreground uppercase">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm font-medium">{fact.value}</dd>
          </div>
        ))}
      </dl>

      {free ? <><h2 className="font-display mt-16 mb-2 text-2xl font-medium md:text-3xl">
        Werke von {painter.name}
      </h2>
      <ul className="mb-8 divide-y divide-border rounded-md border border-border">
        {painter.works.map((work) => (
          <li key={work.id}>
            <Link
              to="/werke/$id"
              params={{ id: work.id }}
              className="flex items-center justify-between gap-4 px-4 py-3 text-sm transition-colors hover:bg-accent"
            >
              <span className="font-medium">{work.title}</span>
              <span className="flex items-center gap-3 text-muted-foreground">
                {work.year}
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
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
      </div></> : <div className="mt-14"><PremiumLock title={`Alle Werke von ${painter.name} ansehen`} description={`Du hast das Künstlerporträt kennengelernt. Premium öffnet die vollständige Galerie mit ${painter.works.length} Werken, Einordnungen und Bildanalysen.`} /></div>}
    </div>
  );
}

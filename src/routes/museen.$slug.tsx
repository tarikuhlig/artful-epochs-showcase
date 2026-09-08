import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, ExternalLink, Lightbulb, MapPin } from "lucide-react";
import { findMuseum } from "@/lib/museums";
import { getVisitInfo } from "@/lib/museum-info";
import { useTrackDiscovery } from "@/lib/progress";


export const Route = createFileRoute("/museen/$slug")({
  loader: ({ params }) => {
    const museum = findMuseum(params.slug);
    if (!museum) throw notFound();
    return { museum };
  },
  head: ({ loaderData }) => {
    const m = loaderData?.museum;
    const title = m ? `${m.name}, ${m.city} — Museum bereisen | Provenance` : "Museum | Provenance";
    const description = m
      ? `${m.name} in ${m.city}: ${m.works.length} Werke im Provenance-Katalog. ${m.note}`
      : "Museen der Kunstgeschichte entdecken.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: MuseumPage,
});

function MuseumPage() {
  const { museum } = Route.useLoaderData();
  const info = getVisitInfo(museum.slug);
  useTrackDiscovery("museum", museum.slug);


  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-20">
      <Link
        to="/globus"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zum Globus
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-2 text-xs tracking-[0.25em] text-muted-foreground uppercase">
        <MapPin className="h-3.5 w-3.5" />
        {museum.city} · {museum.country}
      </div>
      <h1 className="font-display mt-3 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
        {museum.name}
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {museum.note}
      </p>
      <p className="mt-6 inline-flex rounded-full border border-input px-4 py-1.5 text-xs tracking-[0.2em] uppercase">
        Besucht · {museum.works.length} {museum.works.length === 1 ? "Werk" : "Werke"} im Katalog
      </p>

      {info && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-display text-lg font-medium">Besuch planen</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 text-muted-foreground">Adresse</dt>
                <dd>{info.address}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 text-muted-foreground">Geöffnet</dt>
                <dd className="flex items-start gap-1.5">
                  <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  {info.hours}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 text-muted-foreground">Ruhetag</dt>
                <dd>{info.closed}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 text-muted-foreground">Eintritt</dt>
                <dd>{info.ticket}</dd>
              </div>
            </dl>
            <a
              href={info.website}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground hover:underline"
            >
              Offizielle Seite <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              Zeiten redaktionell gepflegt und ohne Gewähr — an Feiertagen bitte auf der offiziellen
              Seite prüfen.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-muted/30 p-5">
            <h2 className="font-display flex items-center gap-2 text-lg font-medium">
              <Lightbulb className="h-4 w-4" /> Besuchstipp
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{info.tip}</p>
          </div>
        </div>
      )}


      <h2 className="font-display mt-14 text-2xl font-medium">Werke in diesem Haus</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {museum.works.map((w) => (
          <Link
            key={w.id}
            to="/werke/$id"
            params={{ id: w.id }}
            className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
          >
            <div className="aspect-4/3 overflow-hidden bg-muted">
              <img
                src={w.image}
                alt={`${w.title} von ${w.painter.name}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-5">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                {w.painter.name} · {w.year}
              </p>
              <h3 className="font-display mt-1 text-lg font-medium">{w.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{w.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

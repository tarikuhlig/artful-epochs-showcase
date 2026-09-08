import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin } from "lucide-react";
import { findMuseum } from "@/lib/museums";
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
  useTrackDiscovery("museum", museum.slug);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
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
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight md:text-5xl">
        {museum.name}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{museum.note}</p>
      <p className="mt-6 inline-flex rounded-full border border-input px-4 py-1.5 text-xs tracking-[0.2em] uppercase">
        Besucht · {museum.works.length} {museum.works.length === 1 ? "Werk" : "Werke"} im Katalog
      </p>

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

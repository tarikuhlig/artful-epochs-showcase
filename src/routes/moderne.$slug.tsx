import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { findModernArtist } from "@/lib/modern-artists";
import { RightsNotice } from "@/components/RightsNotice";
import { ProtectedWorkCard } from "@/components/ProtectedWorkCard";

export const Route = createFileRoute("/moderne/$slug")({
  loader: ({ params }) => {
    const artist = findModernArtist(params.slug);
    if (!artist) throw notFound();
    return artist;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — ${loaderData.movement} | Provenance` },
          { name: "description", content: loaderData.bio.slice(0, 155) },
          { property: "og:title", content: `${loaderData.name} | Provenance` },
          { property: "og:description", content: loaderData.significance.slice(0, 155) },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Künstler nicht gefunden | Provenance" }, { name: "robots", content: "noindex" }],
  }),
  component: ModernArtistPage,
});

function ModernArtistPage() {
  const artist = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <Link
        to="/moderne"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Moderne &amp; Gegenwart
      </Link>

      <header className="mt-8 max-w-2xl">
        <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
          {artist.life} · {artist.movement}
        </p>
        <h1 className="font-display mt-2 text-4xl font-medium tracking-tight md:text-6xl">
          {artist.name}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {artist.bio}
        </p>
        <div className="mt-5">
          <RightsNotice compact />
        </div>
      </header>

      <dl className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-2">
        {[
          { label: "Herkunft", value: artist.origin },
          { label: "Warum er zählt", value: artist.significance },
          { label: "Farben", value: artist.palette },
          { label: "Techniken & Material", value: artist.techniques },
          { label: "Wo zu sehen", value: artist.museums },
        ].map((fact) => (
          <div key={fact.label} className="rounded-lg border border-border p-4">
            <dt className="text-[11px] tracking-widest text-muted-foreground uppercase">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm leading-relaxed">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-14 max-w-3xl">
        <RightsNotice />
      </div>

      <h2 className="font-display mt-10 mb-6 text-2xl font-medium md:text-3xl">
        Hauptwerke von {artist.name}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {artist.works.map((work) => (
          <ProtectedWorkCard key={work.id} work={work} />
        ))}
      </div>
    </div>
  );
}

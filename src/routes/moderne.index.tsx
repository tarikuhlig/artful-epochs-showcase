import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { modernArtists, modernWorkCount } from "@/lib/modern-artists";
import { RightsNotice } from "@/components/RightsNotice";
import { ProtectedArtPlaceholder } from "@/components/ProtectedArtPlaceholder";
import { artistImageUrl, findArtistImageSource } from "@/lib/artist-image-sources";

export const Route = createFileRoute("/moderne/")({
  head: () => ({
    meta: [
      { title: "Moderne & Gegenwart — Kunst unter Urheberrecht | Provenance" },
      {
        name: "description",
        content:
          "Rothko, Picasso, Kahlo, Warhol und mehr: Lerne moderne Meister kennen — mit Biografie, Farben, Techniken und offiziellen Museums-Links statt geschützter Abbildungen.",
      },
      { property: "og:title", content: "Moderne & Gegenwart | Provenance" },
      {
        property: "og:description",
        content: "Zwölf moderne Meister lernen — rechtssicher, mit Museums-Links statt Abbildungen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ModerneIndex,
});

function ModerneIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="font-display text-[11px] tracking-[0.35em] text-muted-foreground uppercase">
        {modernArtists.length} Künstler · {modernWorkCount} Hauptwerke
      </p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-[-0.03em] uppercase md:text-5xl">
        Moderne &amp; Gegenwart
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Die Kunst des 20. Jahrhunderts ist noch geschützt. Hier lernst du sie trotzdem gründlich
        kennen — über Biografien, Farben, Techniken, genaue Bildbeschreibungen und den direkten Weg
        zum Museum, das die Rechte hält.
      </p>

      <div className="mt-8 max-w-3xl">
        <RightsNotice />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modernArtists.map((artist) => {
          const source = findArtistImageSource(artist.slug);
          const ownImage = artistImageUrl(artist.slug);
          return (
          <article
            key={artist.slug}
            className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
          >
            {ownImage ? (
              <figure className="m-0">
                <img
                  src={ownImage}
                  alt={`${artist.name} — freigegebene Abbildung`}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover"
                />
                {source?.credit && (
                  <figcaption className="px-4 pt-2 text-[11px] text-muted-foreground">
                    {source.credit}
                  </figcaption>
                )}
              </figure>
            ) : (
              <ProtectedArtPlaceholder
                className="aspect-[16/9]"
                label="Museums-Ansicht verfügbar"
                target={{
                  url: artist.works[0]?.museumUrl ?? source?.museumUrl ?? "",
                  artist: artist.name,
                  title: artist.works[0] ? `${artist.works[0].title} (${artist.works[0].year})` : undefined,
                  rightsHolder: artist.works[0]?.rightsHolder,
                }}
              />
            )}

            <Link to="/moderne/$slug" params={{ slug: artist.slug }} className="block p-6">
              <p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                {artist.movement}
              </p>
              <h2 className="font-display mt-2 text-2xl font-medium">{artist.name}</h2>
              <p className="text-sm text-muted-foreground">
                {artist.life} · {artist.origin}
              </p>
              <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{artist.significance}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                {artist.works.length} Hauptwerke
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </article>
          );
        })}
      </div>

      <section className="mt-14 max-w-3xl rounded-xl border border-border p-6">
        <h2 className="font-display text-xl font-medium">Warum siehst du hier keine Bilder?</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Gemälde sind bis 70 Jahre nach dem Tod der Künstlerin oder des Künstlers geschützt. Für
          Rothko, Picasso oder Basquiat gilt das noch. Provenance speichert und zeigt deshalb keine
          Abbildungen dieser Werke — weder als Datei noch als eingebundenes Fremdbild. Stattdessen
          verlinken wir auf die offizielle Seite des Museums oder Nachlasses. Alle Texte hier sind
          eigene Beschreibungen, keine übernommenen Katalogtexte. Im übrigen Katalog von Provenance
          findest du ausschließlich gemeinfreie Werke.
        </p>
      </section>
    </div>
  );
}

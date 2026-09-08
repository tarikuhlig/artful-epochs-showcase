import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Search } from "lucide-react";
import { OldGlobe, type GlobeMarker } from "@/components/OldGlobe";
import { cities } from "@/lib/museums";
import { allWorks, epochData, styles } from "@/lib/art-data";
import { journeys } from "@/lib/journeys";

export const Route = createFileRoute("/globus")({
  head: () => ({
    meta: [
      { title: "Globus — die Kunst der Welt bereisen | Provenance" },
      {
        name: "description",
        content:
          "Dreh den alten Globus, wähle eine Stadt und bereise ihre Museen: Werke, Häuser und Kunstreisen von Florenz bis New York.",
      },
      { property: "og:title", content: "Globus — die Kunst der Welt bereisen | Provenance" },
      {
        property: "og:description",
        content: "Interaktiver Globus mit Museen, Meisterwerken und geführten Kunstreisen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GlobusPage,
});

/** Stadt -> passende Kunstreise */
const JOURNEY_BY_CITY: Record<string, string> = {
  Florenz: "florenz-der-medici",
  Amsterdam: "amsterdam-goldenes-zeitalter",
  Paris: "paris-1874",
  München: "wege-in-die-abstraktion",
  "New York": "new-yorker-schule",
  Köln: "nachkriegsmalerei",
};

function GlobusPage() {
  const [selected, setSelected] = useState<string | null>("Paris");
  const [query, setQuery] = useState("");
  const [epoch, setEpoch] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);

  const markers: GlobeMarker[] = useMemo(
    () =>
      cities.map((c) => ({
        id: c.city,
        label: c.city,
        sublabel: c.country,
        lat: c.lat,
        lon: c.lon,
        weight: c.workCount,
      })),
    [],
  );

  const city = cities.find((c) => c.city === selected) ?? null;
  const journeySlug = city ? JOURNEY_BY_CITY[city.city] : undefined;
  const journey = journeys.find((j) => j.slug === journeySlug);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q && !epoch && !style) return [];
    return allWorks.filter((w) => {
      if (epoch && w.epoch.slug !== epoch) return false;
      if (style && !w.styles.includes(style)) return false;
      if (!q) return true;
      return (
        w.title.toLowerCase().includes(q) ||
        w.painter.name.toLowerCase().includes(q) ||
        w.epoch.name.toLowerCase().includes(q) ||
        w.museum.toLowerCase().includes(q) ||
        w.styles.some((s) => s.replace(/-/g, " ").includes(q))
      );
    });
  }, [query, epoch, style]);

  return (
    <div>
      {/* Globus */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-8 md:pt-20">
        <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Kunstreisen</p>
        <h1 className="font-display mt-3 text-4xl font-medium tracking-tight md:text-5xl">
          Die Welt der Kunst bereisen
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Dreh den Globus, wähle eine Stadt und geh in ihre Museen. {cities.length} Städte,{" "}
          {cities.reduce((n, c) => n + c.museums.length, 0)} Häuser, {allWorks.length} Werke.
        </p>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <OldGlobe markers={markers} selectedId={selected} onSelect={setSelected} />
          </div>

          <aside className="lg:col-span-2">
            {city ? (
              <div className="rounded-2xl border border-border bg-card p-6">
                <p className="text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
                  {city.country}
                </p>
                <h2 className="font-display mt-1 text-3xl font-medium">{city.city}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {city.museums.length} {city.museums.length === 1 ? "Haus" : "Häuser"} ·{" "}
                  {city.workCount} Werke
                </p>

                {journey && (
                  <Link
                    to="/reisen/$slug"
                    params={{ slug: journey.slug }}
                    className="mt-5 flex items-center gap-3 rounded-xl border border-input p-4 transition-colors hover:bg-accent"
                  >
                    <Compass className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0">
                      <span className="block text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                        Geführte Kunstreise
                      </span>
                      <span className="font-display block truncate text-base">{journey.title}</span>
                    </span>
                  </Link>
                )}

                <div className="mt-5 space-y-2">
                  {city.museums.map((m) => (
                    <Link
                      key={m.slug}
                      to="/museen/$slug"
                      params={{ slug: m.slug }}
                      className="group flex items-center gap-4 rounded-xl border border-transparent p-3 transition-colors hover:border-border hover:bg-accent"
                    >
                      <span className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {m.works[0] && (
                          <img
                            src={m.works[0].image}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="font-display block truncate text-base">{m.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {m.works.length} {m.works.length === 1 ? "Werk" : "Werke"}
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-border p-6 text-sm text-muted-foreground">
                Wähle einen Punkt auf dem Globus.
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {cities.slice(0, 8).map((c) => (
                <button
                  key={c.city}
                  onClick={() => setSelected(c.city)}
                  className={
                    "rounded-full border px-4 py-1.5 text-sm transition-colors " +
                    (selected === c.city
                      ? "border-foreground bg-foreground text-background"
                      : "border-input text-muted-foreground hover:bg-accent hover:text-foreground")
                  }
                >
                  {c.city}
                </button>
              ))}
              <Link
                to="/museen"
                className="rounded-full border border-input px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                Alle Museen
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Suche */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
            Gezielt suchen
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Nach Titel, Maler, Museum, Stilrichtung oder Epoche.
          </p>

          <div className="relative mt-6 max-w-xl">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="z. B. Vermeer, Jugendstil, Prado …"
              className="w-full rounded-full border border-input bg-background py-3 pr-4 pl-11 text-sm outline-none focus:border-foreground/40"
            />
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap gap-2">
              <Chip active={!epoch} onClick={() => setEpoch(null)}>
                Alle Epochen
              </Chip>
              {epochData.map((e) => (
                <Chip
                  key={e.slug}
                  active={epoch === e.slug}
                  onClick={() => setEpoch(epoch === e.slug ? null : e.slug)}
                >
                  {e.name}
                </Chip>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip active={!style} onClick={() => setStyle(null)}>
                Alle Stile
              </Chip>
              {styles.map((s) => (
                <Chip
                  key={s.slug}
                  active={style === s.slug}
                  onClick={() => setStyle(style === s.slug ? null : s.slug)}
                >
                  {s.name}
                </Chip>
              ))}
            </div>
          </div>

          {style && (
            <div className="mt-8 rounded-xl border border-border bg-muted/40 p-6">
              <h3 className="font-display text-xl font-medium">
                {styles.find((s) => s.slug === style)?.name}
              </h3>
              <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
                {styles.find((s) => s.slug === style)?.period}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {styles.find((s) => s.slug === style)?.description}
              </p>
            </div>
          )}

          {(query || epoch || style) && (
            <>
              <p className="mt-10 text-sm text-muted-foreground">{results.length} Treffer</p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((w) => (
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
                      <p className="mt-2 text-xs text-muted-foreground">{w.museum}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "rounded-full border px-4 py-1.5 text-sm transition-colors " +
        (active
          ? "border-foreground bg-foreground text-background"
          : "border-input text-muted-foreground hover:bg-accent hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}

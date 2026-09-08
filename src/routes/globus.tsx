import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Clock, Compass, ExternalLink, Lightbulb, MapPin, Search } from "lucide-react";
import type { GlobeMarker } from "@/components/Globe3D";
import { cities } from "@/lib/museums";
import { getVisitInfo } from "@/lib/museum-info";
import { buildCityTour, formatDuration, journeyForCity } from "@/lib/city-tours";
import { allWorks, epochData, styles } from "@/lib/art-data";
import studioBg from "@/assets/atelier-globe-room.jpg";

const Globe3D = lazy(() => import("@/components/Globe3D").then((m) => ({ default: m.Globe3D })));

export const Route = createFileRoute("/globus")({
  head: () => ({
    meta: [
      { title: "Globus — die Kunst der Welt bereisen | Provenance" },
      {
        name: "description",
        content:
          "Dreh die 3D-Weltkugel, wähle eine Stadt und plane deinen Kunsttag: echte Museen mit Öffnungszeiten, Besuchstipps und Kunstreisen von Florenz bis New York.",
      },
      { property: "og:title", content: "Globus — die Kunst der Welt bereisen | Provenance" },
      {
        property: "og:description",
        content: "3D-Globus mit Museen, Öffnungszeiten, Besuchstipps und geführten Kunstreisen.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: GlobusPage,
});

function GlobusPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>("Paris");
  const [query, setQuery] = useState("");
  const [epoch, setEpoch] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
  const tour = city ? buildCityTour(city) : null;
  const journey = city ? journeyForCity(city.city) : undefined;

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

  const openCity = (slug: string) => {
    const nextCity = cities.find((candidate) => candidate.slug === slug);
    if (nextCity) setSelected(nextCity.city);
    void navigate({ to: "/stadt/$slug", params: { slug } });
  };

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 md:pt-20">
        <p className="text-[11px] tracking-[0.25em] text-muted-foreground uppercase">Kunstreisen</p>
        <h1 className="font-display mt-3 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
          Die Welt der Kunst bereisen
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Dreh die Kugel mit dem Finger, stoß sie an und zoome hinein. {cities.length} Städte,{" "}
          {cities.reduce((n, c) => n + c.museums.length, 0)} Häuser, {allWorks.length} Werke.
        </p>

        <div className="mt-8 grid items-start gap-8 md:mt-10 lg:grid-cols-5 lg:gap-10">
          <div className="min-w-0 lg:col-span-3">
            <div className="relative mx-auto w-full max-w-[620px] min-w-0 overflow-hidden rounded-2xl border border-border bg-muted lg:max-w-none">
              <img
                src={studioBg}
                alt=""
                aria-hidden
                loading="lazy"
                width={1920}
                height={1280}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_58%,transparent_32%,rgba(38,22,10,0.42)_100%)]" />
              <div className="relative px-1 pt-8 pb-2 sm:px-4 sm:pt-10 sm:pb-4">
              {mounted ? (
                <Suspense fallback={<GlobePlaceholder />}>
                  <Globe3D
                    markers={markers.map((marker) => ({
                      ...marker,
                      id: cities.find((candidate) => candidate.city === marker.id)?.slug ?? marker.id,
                    }))}
                    selectedId={city?.slug}
                    onSelect={openCity}
                  />
                </Suspense>
              ) : (
                <GlobePlaceholder />
              )}
              </div>
            </div>

            <div className="mt-4 flex snap-x gap-2 overflow-x-auto pb-2 lg:flex-wrap lg:overflow-visible">
              {cities.slice(0, 10).map((c) => (
                <Link
                  key={c.city}
                  to="/stadt/$slug"
                  params={{ slug: c.slug }}
                  className={
                    "shrink-0 snap-start rounded-full border px-4 py-2 text-sm transition-colors " +
                    (selected === c.city
                      ? "border-foreground bg-foreground text-background"
                      : "border-input text-muted-foreground hover:bg-accent hover:text-foreground")
                  }
                >
                  {c.city}
                </Link>
              ))}
              <Link
                to="/museen"
                className="shrink-0 rounded-full border border-input px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                Alle Museen
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-2">
            {city && tour ? (
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
                <p className="text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
                  {city.country}
                </p>
                <h2 className="font-display mt-1 text-2xl font-medium sm:text-3xl">{city.city}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {city.museums.length} {city.museums.length === 1 ? "Haus" : "Häuser"} ·{" "}
                  {city.workCount} Werke · {formatDuration(tour.totalMinutes)} Besuchszeit
                </p>

                <Link
                  to="/stadt/$slug"
                  params={{ slug: city.slug }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Stadtseite öffnen <ArrowRight className="h-4 w-4" />
                </Link>

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

                {/* Karte: Kunstreise durch die gewählte Stadt */}
                <div className="mt-5 rounded-xl border border-border bg-background p-4 sm:p-5">
                  <h3 className="font-display text-lg font-medium">{tour.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {tour.summary}
                  </p>

                  <ol className="mt-4 space-y-4">
                    {tour.stops.map((s) => {
                      const info = getVisitInfo(s.museum.slug);
                      return (
                        <li key={s.museum.slug} className="border-l border-border pl-4">
                          <p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                            {s.slot} · {formatDuration(s.minutes)}
                          </p>
                          <Link
                            to="/museen/$slug"
                            params={{ slug: s.museum.slug }}
                            className="font-display mt-0.5 block text-base hover:underline"
                          >
                            {s.museum.name}
                          </Link>
                          {s.hours && (
                            <p className="mt-1 flex items-start gap-1.5 text-xs text-muted-foreground">
                              <Clock className="mt-0.5 h-3 w-3 shrink-0" />
                              <span>
                                {s.hours}
                                {info?.closed && info.closed !== "keine"
                                  ? ` · geschlossen: ${info.closed}`
                                  : ""}
                              </span>
                            </p>
                          )}
                          {s.highlight && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              Nicht verpassen:{" "}
                              <Link
                                to="/werke/$id"
                                params={{ id: s.highlight.id }}
                                className="text-foreground hover:underline"
                              >
                                {s.highlight.title}
                              </Link>{" "}
                              ({s.highlight.painter})
                            </p>
                          )}
                          {s.tip && (
                            <p className="mt-1 flex items-start gap-1.5 text-xs text-muted-foreground">
                              <Lightbulb className="mt-0.5 h-3 w-3 shrink-0" />
                              <span>{s.tip}</span>
                            </p>
                          )}
                        </li>
                      );
                    })}
                  </ol>

                  {city.museums.length > tour.stops.length && (
                    <p className="mt-4 text-xs text-muted-foreground">
                      + {city.museums.length - tour.stops.length} weitere Häuser in {city.city}
                    </p>
                  )}
                  <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                    Öffnungszeiten redaktionell gepflegt — an Feiertagen weichen sie ab, bitte vor
                    dem Besuch auf der Museumsseite prüfen.
                  </p>
                </div>

                <div className="mt-5 space-y-2">
                  {city.museums.map((m) => {
                    const info = getVisitInfo(m.slug);
                    return (
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
                          <span className="block truncate text-xs text-muted-foreground">
                            {info?.hours ?? `${m.works.length} Werke`}
                          </span>
                        </span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-border p-6 text-sm text-muted-foreground">
                Wähle einen Punkt auf dem Globus.
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* Suche */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="font-display text-xl font-medium tracking-tight sm:text-2xl md:text-3xl">
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
              className="w-full rounded-full border border-input bg-background py-3 pr-4 pl-11 text-base outline-none focus:border-foreground/40 sm:text-sm"
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
            <div className="mt-8 rounded-xl border border-border bg-muted/40 p-5 sm:p-6">
              <h3 className="font-display text-lg font-medium sm:text-xl">
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
              <div className="mt-4 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
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
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {w.museum}
                      </p>
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

function GlobePlaceholder() {
  return (
    <div className="flex aspect-square w-full items-center justify-center rounded-full border border-border bg-muted/30">
      <span className="flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
        <ExternalLink className="h-3 w-3" /> Globus wird geladen
      </span>
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
        "rounded-full border px-4 py-2 text-sm transition-colors " +
        (active
          ? "border-foreground bg-foreground text-background"
          : "border-input text-muted-foreground hover:bg-accent hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}

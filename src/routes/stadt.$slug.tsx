import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  Compass,
  ExternalLink,
  MapPin,
  Ticket,
} from "lucide-react";
import { buildCityTour, formatDuration, journeyForCity } from "@/lib/city-tours";
import { findCity } from "@/lib/museums";
import { getVisitInfo } from "@/lib/museum-info";

export const Route = createFileRoute("/stadt/$slug")({
  loader: ({ params }) => {
    const city = findCity(params.slug);
    if (!city) throw notFound();
    return { city, tour: buildCityTour(city), journey: journeyForCity(city.city) };
  },
  head: ({ loaderData }) => {
    const city = loaderData?.city;
    const title = city ? `${city.city}: Museen & Kunstreisen | Provenance` : "Stadt nicht gefunden | Provenance";
    const description = city
      ? `${city.city} für Kunstreisende: ${city.museums.length} Museen, aktuelle Besuchsinfos, Ausstellungen und eine kuratierte Tagesroute.`
      : "Kunststädte auf dem Provenance-Globus entdecken.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: CityPage,
});

function CityPage() {
  const { city, tour, journey } = Route.useLoaderData();

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-16">
          <Link to="/globus" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Zurück zum Globus
          </Link>
          <p className="mt-8 text-[11px] tracking-[0.28em] text-muted-foreground uppercase">{city.country}</p>
          <h1 className="font-display mt-2 text-4xl font-medium sm:text-5xl md:text-6xl">Kunststadt {city.city}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {city.museums.length} {city.museums.length === 1 ? "Haus" : "Häuser"}, {city.workCount} Werke im Katalog und eine Route für {formatDuration(tour.totalMinutes)}.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 md:py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.25em] text-muted-foreground uppercase">Orientierung</p>
              <h2 className="font-display mt-1 text-2xl font-medium">Karte der Kunststationen</h2>
            </div>
            <span className="text-xs text-muted-foreground">schematisch</span>
          </div>
          <CityMap city={city} />

          {journey && (
            <Link
              to="/reisen/$slug"
              params={{ slug: journey.slug }}
              className="group mt-6 flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
            >
              <Compass className="h-5 w-5 shrink-0 text-primary" />
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Historische Kunstreise</span>
                <span className="font-display mt-1 block text-lg font-medium">{journey.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{journey.subtitle}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        <div>
          <p className="text-[11px] tracking-[0.25em] text-muted-foreground uppercase">Tagesroute</p>
          <h2 className="font-display mt-1 text-2xl font-medium">{tour.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tour.summary}</p>
          <ol className="mt-7 space-y-6">
            {tour.stops.map((stop, index) => {
              const info = getVisitInfo(stop.museum.slug);
              return (
                <li key={stop.museum.slug} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-xs">{index + 1}</span>
                  <div className="min-w-0 border-b border-border pb-6">
                    <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{stop.slot} · {formatDuration(stop.minutes)}</p>
                    <Link to="/museen/$slug" params={{ slug: stop.museum.slug }} className="font-display mt-1 inline-block text-lg font-medium hover:underline">
                      {stop.museum.name}
                    </Link>
                    {info && (
                      <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                        <p className="flex items-start gap-2"><Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" />{info.hours}</p>
                        <p className="flex items-start gap-2"><Ticket className="mt-0.5 h-3.5 w-3.5 shrink-0" />{info.ticket}</p>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <h2 className="font-display text-2xl font-medium sm:text-3xl">Museen & aktuelle Programme</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Besuchsdaten sind redaktionelle Momentaufnahmen. Der offizielle Link ist bei kurzfristigen Änderungen verbindlich.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {city.museums.map((museum) => {
              const info = getVisitInfo(museum.slug);
              return (
                <article key={museum.slug} className="rounded-xl border border-border bg-card p-5 sm:p-6">
                  <p className="flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-muted-foreground uppercase"><MapPin className="h-3 w-3" />{info?.address ?? city.city}</p>
                  <h3 className="font-display mt-2 text-xl font-medium">{museum.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{museum.note}</p>
                  {info && (
                    <>
                      <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                        <div className="grid grid-cols-[5.5rem_1fr] gap-2"><dt className="text-muted-foreground">Geöffnet</dt><dd>{info.hours}</dd></div>
                        <div className="grid grid-cols-[5.5rem_1fr] gap-2"><dt className="text-muted-foreground">Eintritt</dt><dd>{info.ticket}</dd></div>
                      </dl>
                      <div className="mt-5 rounded-lg bg-muted/50 p-4">
                        <p className="flex items-center gap-2 text-xs font-medium"><CalendarDays className="h-4 w-4" />Aktuelle Ausstellungen</p>
                        {info.exhibitions?.length ? (
                          <ul className="mt-2 space-y-2 text-sm">
                            {info.exhibitions.map((exhibition) => (
                              <li key={exhibition.title}>
                                <a href={exhibition.sourceUrl} target="_blank" rel="noreferrer" className="hover:underline">{exhibition.title}</a>
                                <span className="block text-xs text-muted-foreground">{exhibition.dates}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <a href={info.exhibitionsUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm hover:underline">
                            Laufendes Programm auf der offiziellen Seite <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="mt-3 text-[11px] text-muted-foreground">Geprüft am {formatVerifiedDate(info.verifiedAt)} · <a href={info.visitUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">offizielle Besuchsinfo</a></p>
                    </>
                  )}
                  <Link to="/museen/$slug" params={{ slug: museum.slug }} className="mt-5 inline-flex items-center gap-2 text-sm font-medium hover:underline">Museum entdecken <ArrowRight className="h-4 w-4" /></Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function formatVerifiedDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}

function CityMap({ city }: { city: ReturnType<typeof findCity> extends infer T ? Exclude<T, undefined> : never }) {
  const points = city.museums.map((museum, index) => {
    const angle = city.museums.length === 1 ? 0 : (index / city.museums.length) * Math.PI * 2 - Math.PI / 2;
    const radius = city.museums.length === 1 ? 0 : 30;
    return { museum, x: 50 + Math.cos(angle) * radius, y: 50 + Math.sin(angle) * radius };
  });
  const path = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted/40">
      <svg viewBox="0 0 100 75" className="h-full w-full" role="img" aria-label={`Kunststationen in ${city.city}`}>
        <path d="M-8 18 C18 8, 30 28, 55 17 S92 8, 108 24" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="10" />
        <path d="M8 67 C30 55, 45 68, 68 54 S93 48, 110 60" fill="none" stroke="currentColor" strokeOpacity="0.06" strokeWidth="7" />
        {points.length > 1 && <polyline points={path} fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="0.7" strokeDasharray="2 2" />}
        {points.map((point, index) => (
          <g key={point.museum.slug} transform={`translate(${point.x} ${point.y * 0.75})`}>
            <circle r="4.6" className="fill-background stroke-foreground" strokeWidth="0.7" />
            <text textAnchor="middle" dominantBaseline="central" className="fill-foreground text-[4px] font-medium">{index + 1}</text>
          </g>
        ))}
      </svg>
      <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-x-4 gap-y-1 rounded-lg bg-background/90 p-3 text-[11px] backdrop-blur">
        {points.map((point, index) => <span key={point.museum.slug}><strong>{index + 1}</strong> {point.museum.name}</span>)}
      </div>
    </div>
  );
}
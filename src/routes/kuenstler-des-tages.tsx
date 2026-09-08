import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTrackDiscovery } from "@/lib/progress";
import {
  focusOfTheDay,
  formatDate,
  painterOfTheDay,
  recentPainters,
  todayISO,
  worksOfPainter,
} from "@/lib/daily-artist";

export const Route = createFileRoute("/kuenstler-des-tages")({
  head: () => ({
    meta: [
      { title: "Künstler des Tages — Provenance" },
      {
        name: "description",
        content:
          "Jeden Tag ein neuer Maler: Leben, Epoche, Stil und Schlüsselwerke kompakt erklärt — mit Archiv der letzten Tage.",
      },
      { property: "og:title", content: "Künstler des Tages | Provenance" },
      { property: "og:description", content: "Täglich ein Maler, seine Werke und was ihn besonders macht." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DailyArtistPage,
});

function DailyArtistPage() {
  const today = todayISO();
  const painter = painterOfTheDay(today);
  const works = worksOfPainter(painter.slug);
  const focus = focusOfTheDay(today);
  const archive = recentPainters(6, today);
  const hero = works[0];

  useTrackDiscovery("painter", painter.slug);

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="flex items-center gap-2 text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
              <CalendarDays className="h-3.5 w-3.5" /> Künstler des Tages · {formatDate(today)}
            </p>
            <h1 className="font-display mt-4 text-5xl leading-[1] font-medium md:text-6xl">{painter.name}</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {painter.life} · {painter.origin} · {painter.epoch.name}
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">{painter.bio}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {painter.styles.map((style) => (
                <span key={style} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                  {style}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link to="/maler/$slug" params={{ slug: painter.slug }}>
                  Ganzes Profil <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                <Link to="/epochen/$slug" params={{ slug: painter.epoch.slug }}>
                  Epoche {painter.epoch.name}
                </Link>
              </Button>
            </div>
          </div>
          {hero && (
            <Link
              to="/werke/$id"
              params={{ id: hero.id }}
              className="group relative block min-h-[320px] overflow-hidden rounded-xl bg-muted sm:min-h-[440px]"
            >
              <img
                src={hero.image}
                alt={`${hero.title} von ${painter.name}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-background/92 p-5 backdrop-blur-sm sm:m-4 sm:rounded-lg">
                <p className="text-[10px] tracking-[0.24em] text-muted-foreground uppercase">Schlüsselwerk</p>
                <h2 className="font-display mt-1 text-2xl font-medium">{hero.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{hero.year}</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid overflow-hidden rounded-xl bg-pastel-tip sm:grid-cols-[0.7fr_1.3fr]">
          <div className="aspect-[4/3] min-h-48 overflow-hidden sm:aspect-auto">
            {works[1]?.image && (
              <img src={works[1].image} alt={works[1].title} loading="lazy" className="h-full w-full object-cover" />
            )}
          </div>
          <div className="p-7 sm:p-9">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pastel-tip/60">
              <Compass className="h-5 w-5 text-background" />
            </div>
            <p className="mt-7 text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Heute üben</p>
            <h2 className="font-display mt-2 text-3xl font-medium">{focus.title}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{focus.text}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Werke</p>
              <h2 className="font-display mt-2 text-3xl font-medium">Selbst entdecken</h2>
            </div>
            <Sparkles className="hidden h-6 w-6 text-coin sm:block" />
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((work) => (
              <Link key={work.id} to="/werke/$id" params={{ id: work.id }} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                  <img
                    src={work.image}
                    alt={work.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="font-display mt-3 text-lg font-medium">{work.title}</h3>
                <p className="text-sm text-muted-foreground">{work.year}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Archiv</p>
        <h2 className="font-display mt-2 text-3xl font-medium">Die letzten Tage</h2>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {archive.map(({ date, painter: past }) => {
            const image = worksOfPainter(past.slug)[0]?.image;
            return (
              <Link
                key={date}
                to="/maler/$slug"
                params={{ slug: past.slug }}
                className="group flex items-center gap-4 overflow-hidden rounded-xl border border-border p-3 hover:border-pastel-tip/60"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {image && (
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{formatDate(date)}</p>
                  <h3 className="font-display mt-1 truncate text-lg font-medium">{past.name}</h3>
                  <p className="truncate text-sm text-muted-foreground">{past.epoch.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

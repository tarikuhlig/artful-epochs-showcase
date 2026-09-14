import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight, Brush, Coins, GraduationCap, Landmark, Layers, Map, Palette, Sparkles } from "lucide-react";
import { IntroTunnel } from "@/components/IntroTunnel";
import { PremiumUpsell } from "@/components/PremiumUpsell";
import { TitleGate } from "@/components/TitleGate";
import { Button } from "@/components/ui/button";
import { epochs, allWorks, allPainters } from "@/lib/art-data";
import { PainterCard } from "@/components/PainterCard";

import { museums } from "@/lib/museums";
import { journeys } from "@/lib/journeys";
import { ART_PATH_STATION_COUNT } from "@/lib/art-path-meta";
import { useAuth } from "@/hooks/useAuth";
import { useArtPathProgress } from "@/lib/economy";
import { workOfTheDay } from "@/lib/farm";
import { painterOfTheDay, worksOfPainter } from "@/lib/daily-artist";
import coin from "@/assets/provenance-coin.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kunst entdecken — Provenance" },
      { name: "description", content: "Entdecke täglich Meisterwerke, Künstler, Epochen und Museen und beginne deine Reise durch die Kunstgeschichte." },
      { property: "og:title", content: "Kunst entdecken | Provenance" },
      { property: "og:description", content: "Dein täglicher Einstieg in die Welt der Kunst." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

const DAILY_TIPS = [
  { title: "Folge zuerst dem Licht", text: "Woher fällt es ein, und worauf lenkt es deinen Blick? So erkennst du Stimmung und Komposition oft noch vor dem Motiv." },
  { title: "Suche die stärkste Farbe", text: "Die auffälligste Farbe ist selten zufällig. Beobachte, welche Formen sie verbindet und welches Gefühl sie auslöst." },
  { title: "Lies ein Bild von außen nach innen", text: "Beginne am Rand und wandere zur Mitte. Welche Details führen dich, und wo bleibt dein Blick schließlich stehen?" },
  { title: "Achte auf den Pinselstrich", text: "Ist die Oberfläche glatt oder bewegt? Die Handschrift des Pinsels verrät Tempo, Absicht und Nähe des Künstlers zum Motiv." },
  { title: "Vergleiche Größe und Wirkung", text: "Denke das echte Format mit: Ein kleines Bild lädt zur Nähe ein, ein monumentales Werk nimmt den ganzen Raum ein." },
];

const PREFERRED_TOURS = ["ein-wein-mit-leonardo", "starke-frauen-der-epochen", "nacht-und-kerzenlicht"];

/** Einmal pro Modul berechnet, damit der Server-Render der Startseite nichts wiederholt. */
const FEATURED_TOURS = (() => {
  const imageByWorkId = new Map(allWorks.map((item) => [item.id, item.image] as const));
  return journeys
    .filter((journey) => PREFERRED_TOURS.includes(journey.slug))
    .concat(journeys.filter((journey) => !PREFERRED_TOURS.includes(journey.slug)))
    .slice(0, 3)
    .map((journey) => ({
      slug: journey.slug,
      title: journey.title,
      subtitle: journey.subtitle,
      kind: journey.kind,
      era: journey.era,
      stopCount: journey.stops.length,
      image: journey.stops.map((stop) => imageByWorkId.get(stop.workId)).find(Boolean),
    }));
})();

const TOUR_COUNT = journeys.length;
const MUSEUM_COUNT = museums.length;

function readHasResume(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem("provenance:journey");
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { station?: number; card?: number };
    return typeof parsed.station === "number" && (parsed.station > 0 || (parsed.card ?? 0) > 0);
  } catch {
    return false;
  }
}

function HomePage() {
  const { user, loading } = useAuth();
  const { data: progress = [] } = useArtPathProgress();
  const [hasResume, setHasResume] = useState(readHasResume);
  const [stage, setStage] = useState<"boot" | "title" | "intro" | "app">("boot");

  useEffect(() => {
    if (sessionStorage.getItem("provenance-intro") === "done") return setStage("app");
    if (!loading) setStage(user ? "intro" : "title");
  }, [loading, user]);

  useEffect(() => {
    setHasResume(readHasResume());
  }, []);

  const finishIntro = useCallback(() => {
    sessionStorage.setItem("provenance-intro", "done");
    setStage("app");
  }, []);

  const canResume = progress.length > 0 || hasResume;
  const work = workOfTheDay();
  const workIndex = Math.max(0, allWorks.indexOf(work));
  const discoveries = [work, allWorks[(workIndex + 29) % allWorks.length], allWorks[(workIndex + 71) % allWorks.length]].filter(Boolean);
  const tip = DAILY_TIPS[new Date().getDay() % DAILY_TIPS.length];
  const dailyPainter = painterOfTheDay();
  const painterWorks = worksOfPainter(dailyPainter.slug);
  const dayIndex = Math.floor(Date.now() / 86_400_000);
  const featuredPainters = Array.from({ length: 6 }, (_, i) => allPainters[(dayIndex * 6 + i * 17) % allPainters.length]).filter((p): p is (typeof allPainters)[number] => Boolean(p));
  const preferredTours = ["ein-wein-mit-leonardo", "starke-frauen-der-epochen", "nacht-und-kerzenlicht"];
  const featuredTours = journeys
    .filter((journey) => preferredTours.includes(journey.slug))
    .concat(journeys.filter((journey) => !preferredTours.includes(journey.slug)))
    .slice(0, 3)
    .map((journey) => ({
      ...journey,
      image: journey.stops.map((stop) => allWorks.find((item) => item.id === stop.workId)?.image).find(Boolean),
    }));


  return (
    <div className="min-h-screen bg-background">
      {stage === "title" && <TitleGate onDone={() => setStage("intro")} />}
      {stage === "intro" && <IntroTunnel onDone={finishIntro} />}

      <section className="relative overflow-hidden bg-background">
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-16">
          <div>
            <p className="text-[11px] tracking-[0.32em] text-muted-foreground uppercase">Deine Welt der Kunst</p>
            <h1 className="font-display mt-4 max-w-xl text-5xl leading-[0.98] font-medium md:text-6xl">Jeden Tag ein neues Bild sehen.</h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">Reise durch Jahrhunderte, begegne Künstlern und lerne Meisterwerke mit neuen Augen zu betrachten.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-6"><Link to="/kunstpfad">{canResume ? "Reise fortsetzen" : "Reise beginnen"} <ArrowRight /></Link></Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6"><Link to="/epochen">Frei entdecken</Link></Button>
            </div>
          </div>
          <Link to="/werke/$id" params={{ id: work.id }} className="group relative block min-h-[360px] overflow-hidden rounded-xl bg-muted sm:min-h-[480px]">
            <img src={work.image} alt={`${work.title} von ${work.painter.name}`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
            <div className="absolute inset-x-0 bottom-0 bg-background/92 p-5 backdrop-blur-sm sm:m-4 sm:rounded-lg">
              <p className="text-[10px] tracking-[0.26em] text-muted-foreground uppercase">Werk des Tages</p>
              <div className="mt-2 flex items-end justify-between gap-4"><div><h2 className="font-display text-2xl font-medium">{work.title}</h2><p className="mt-1 text-sm text-muted-foreground">{work.painter.name} · {work.year}</p></div><ArrowRight className="mb-1 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" /></div>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-4">
        <Link to="/kuenstler-des-tages" className="group grid overflow-hidden rounded-xl border border-border sm:grid-cols-[1.15fr_0.85fr]">
          <div className="p-7 sm:p-9">
            <p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Künstler des Tages</p>
            <h2 className="font-display mt-2 text-3xl font-medium">{dailyPainter.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{dailyPainter.life} · {dailyPainter.epoch.name}</p>
            <p className="mt-4 line-clamp-3 max-w-xl leading-relaxed text-muted-foreground">{dailyPainter.bio}</p>
            <span className="font-display mt-6 inline-flex items-center gap-2 text-base">Künstler kennenlernen <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </div>
          <div className="grid grid-cols-2 gap-1 p-1 sm:p-2">
            {painterWorks.slice(0, 4).map((item) => (
              <div key={item.id} className="aspect-square overflow-hidden rounded-lg bg-muted">
                <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
            ))}
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-4 md:grid-cols-[1.35fr_0.65fr]">
          <div className="grid overflow-hidden rounded-xl bg-pastel-tip sm:grid-cols-[0.78fr_1.22fr]">
            <div className="aspect-[4/3] min-h-56 overflow-hidden sm:aspect-auto">
              <img src={discoveries[1]?.image} alt={discoveries[1]?.title ?? "Detail eines Kunstwerks"} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="p-7 sm:p-9">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pastel-tip/60"><Brush className="h-5 w-5 text-background" /></div>
              <p className="mt-8 text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Blickschule des Tages</p>
              <h2 className="font-display mt-2 text-3xl font-medium">{tip?.title}</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{tip?.text}</p>
            </div>
          </div>
          <Link to={user ? "/profil" : "/auth"} className="group relative min-h-80 overflow-hidden rounded-xl bg-muted">
            <img src={discoveries[2]?.image} alt="Kunstwerk aus deiner Sammlung" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-x-0 bottom-0 m-3 rounded-lg bg-background/92 p-5 backdrop-blur-sm">
              <div className="flex items-start justify-between"><img src={coin} alt="Provenance Coin" className="h-11 w-11" /><ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></div>
              <p className="mt-5 text-[10px] tracking-[0.24em] text-coin uppercase">Dein persönlicher Bereich</p><h2 className="font-display mt-1 text-2xl font-medium">Mein Profil</h2><p className="mt-1 text-sm text-muted-foreground">Level, Coins, Fortschritt und Galerie.</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Kuratierte Touren</p>
            <h2 className="font-display mt-2 text-3xl font-medium">Kunst einmal anders erzählt</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Ein Abend mit Leonardo, starke Frauen quer durch die Epochen, Malerei bei Kerzenlicht — jede Tour führt in wenigen Stationen durch eine eigene Geschichte.</p>
          </div>
          <Link to="/reisen" className="font-display inline-flex items-center gap-2 text-base">Alle {journeys.length} Touren <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTours.map((tour) => (
            <Link key={tour.slug} to="/reisen/$slug" params={{ slug: tour.slug }} className="group overflow-hidden rounded-xl border border-border">
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                {tour.image ? <img src={tour.image} alt={tour.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /> : null}
              </div>
              <div className="p-5">
                <p className="text-[10px] tracking-[0.24em] text-muted-foreground uppercase">{tour.kind} · {tour.era}</p>
                <h3 className="font-display mt-1 text-xl font-medium">{tour.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{tour.subtitle}</p>
                <span className="font-display mt-4 inline-flex items-center gap-2 text-sm">{tour.stops.length} Stationen <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Wähle deinen Einstieg</p>
          <h2 className="font-display mt-2 text-3xl font-medium">Was möchtest du heute entdecken?</h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <ExploreCard to="/kuenstler-des-tages" image={painterWorks[0]?.image} icon={<Palette />} title="Künstler des Tages" text={dailyPainter.name} />
            <ExploreCard to="/kunstpfad" image={allWorks[(workIndex + 101) % allWorks.length]?.image} icon={<Map />} title="Reise" text={`${artPathWithWorks.length} Epochen Schritt für Schritt`} />
            <ExploreCard to="/studieren" image={allWorks[(workIndex + 137) % allWorks.length]?.image} icon={<GraduationCap />} title="Studieren" text="Lernkarten zu Werken und Künstlern" />
            <ExploreCard to="/epochen" image={allWorks[(workIndex + 157) % allWorks.length]?.image} icon={<Layers />} title="Epochen" text={`${epochs.length} Kapitel der Kunstgeschichte`} />
            <ExploreCard to="/museen" image={allWorks[(workIndex + 223) % allWorks.length]?.image} icon={<Landmark />} title="Museen" text={`${museums.length} Häuser weltweit`} />
            <ExploreCard to="/auktionshaus" image={allWorks[(workIndex + 311) % allWorks.length]?.image} icon={<Coins />} title="Auktionshaus" text="Werke für deine Galerie finden" />
          </div>

          <Link to="/moderne" className="group mt-4 flex items-center justify-between gap-4 rounded-xl border border-border bg-background p-5 hover:border-pastel-tip/60">
            <span>
              <span className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Noch geschützt</span>
              <span className="font-display mt-1 block text-xl font-medium">Moderne &amp; Gegenwart</span>
              <span className="mt-1 block text-sm text-muted-foreground">Rothko, Picasso, Kahlo, Warhol — lernen ohne Abbildung, mit Weg zum Museum.</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-14"><PremiumUpsell /></section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Die Maler</p>
            <h2 className="font-display mt-2 text-3xl font-medium">Lebensweg, Stil und Hauptwerke</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Eine Karte für jeden Maler — tippe darauf und lerne seine Geschichte kennen.</p>
          </div>
          <Link to="/maler" className="font-display inline-flex items-center gap-2 text-base">Alle {allPainters.length} Maler <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPainters.map((painter) => <PainterCard key={painter.slug} painter={painter} />)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="flex items-end justify-between gap-4"><div><p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Heute entdecken</p><h2 className="font-display mt-2 text-3xl font-medium">Drei Werke, drei Perspektiven</h2></div><Sparkles className="hidden h-6 w-6 text-coin sm:block" /></div>
        <div className="mt-7 grid gap-6 sm:grid-cols-3">{discoveries.map((item, index) => item && <Link key={item.id} to="/werke/$id" params={{ id: item.id }} className="group"><div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted"><img src={item.image} alt={item.title} loading={index ? "lazy" : "eager"} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div><p className="mt-3 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{index === 0 ? "Meisterwerk" : index === 1 ? "Neue Technik" : "Anderer Blick"}</p><h3 className="font-display mt-1 text-lg font-medium">{item.title}</h3><p className="text-sm text-muted-foreground">{item.painter.name} · {item.year}</p></Link>)}</div>
      </section>

    </div>
  );
}

function ExploreCard({ to, image, icon, title, text }: { to: "/kunstpfad" | "/kuenstler-des-tages" | "/studieren" | "/epochen" | "/museen" | "/auktionshaus"; image: string | undefined; icon: React.ReactNode; title: string; text: string }) {
  return <Link to={to} className="group overflow-hidden rounded-xl border border-border bg-background hover:border-pastel-tip/60"><div className="aspect-[4/3] overflow-hidden bg-muted"><img src={image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" /></div><div className="p-5"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-pastel-tip/25 text-background [&_svg]:h-4 [&_svg]:w-4">{icon}</span><span className="font-display mt-5 flex items-center justify-between text-xl font-medium">{title}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span><span className="mt-2 block text-sm text-muted-foreground">{text}</span></div></Link>;
}
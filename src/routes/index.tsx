import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Globe2, Sparkles } from "lucide-react";
import { epochs, allPainters, allWorks } from "@/lib/art-data";
import { journeys } from "@/lib/journeys";
import { cities, museums } from "@/lib/museums";
import provenanceLogo from "@/assets/provenance-logo.png";
import atelierPalette from "@/assets/atelier/palette.png";
import atelierBrushes from "@/assets/atelier/brushes.png";
import atelierTube from "@/assets/atelier/tube.png";
import atelierEasel from "@/assets/atelier/easel.png";
import atelierInk from "@/assets/atelier/ink.png";
import atelierFrame from "@/assets/atelier/frame.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Provenance — Maler, Epochen und ihre Werke entdecken" },
      {
        name: "description",
        content:
          "Lerne die großen Maler der Kunstgeschichte kennen: Epochen, Werke mit Beschreibung, Museen auf dem Globus bereisen und Quiz spielen.",
      },
      { property: "og:title", content: "Provenance — Maler, Epochen und ihre Werke entdecken" },
      {
        property: "og:description",
        content:
          "Epochen, Maler, Meisterwerke, Museen auf dem Globus und geführte Kunstreisen — klar und schön geordnet.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type AtelierItem = {
  src: string;
  alt: string;
  className: string;
  style: React.CSSProperties;
};

const ATELIER_ITEMS: AtelierItem[] = [
  {
    src: atelierEasel,
    alt: "",
    className: "left-[3%] top-[16%] w-[clamp(110px,15vw,240px)]",
    style: { "--rot": "-6deg", "--fy": "-22px", "--dur": "15s" } as React.CSSProperties,
  },
  {
    src: atelierPalette,
    alt: "",
    className: "right-[4%] top-[12%] w-[clamp(120px,16vw,260px)]",
    style: { "--rot": "8deg", "--fy": "-26px", "--fx": "10px", "--dur": "13s", "--delay": "-3s" } as React.CSSProperties,
  },
  {
    src: atelierBrushes,
    alt: "",
    className: "left-[10%] bottom-[12%] w-[clamp(100px,13vw,220px)]",
    style: { "--rot": "14deg", "--fy": "-18px", "--dur": "11s", "--delay": "-5s" } as React.CSSProperties,
  },
  {
    src: atelierTube,
    alt: "",
    className: "right-[12%] bottom-[14%] w-[clamp(70px,8vw,140px)]",
    style: { "--rot": "-12deg", "--fy": "-20px", "--dur": "12s", "--delay": "-2s" } as React.CSSProperties,
  },
  {
    src: atelierInk,
    alt: "",
    className: "left-[26%] top-[6%] hidden w-[clamp(70px,7vw,120px)] md:block",
    style: { "--rot": "5deg", "--fy": "-16px", "--dur": "14s", "--delay": "-7s" } as React.CSSProperties,
  },
  {
    src: atelierFrame,
    alt: "",
    className: "right-[30%] bottom-[8%] hidden w-[clamp(90px,10vw,180px)] md:block",
    style: { "--rot": "-8deg", "--fy": "-24px", "--dur": "16s", "--delay": "-4s" } as React.CSSProperties,
  },
];

const HERO_WORKS = [
  allWorks.find((w) => w.id === "sternennacht") ?? allWorks[0]!,
  allWorks.find((w) => w.id === "mona-lisa") ?? allWorks[1]!,
  allWorks.find((w) => w.id === "der-kuss") ?? allWorks[2]!,
];

function Atelier() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* schwebende Bilder in Rahmen */}
      <img
        src={HERO_WORKS[0]!.image}
        alt=""
        loading="lazy"
        className="atelier-item absolute top-[24%] left-[19%] hidden w-[clamp(90px,11vw,180px)] rounded-sm border-[6px] border-card object-cover shadow-[0_24px_50px_-24px_rgba(0,0,0,0.45)] lg:block"
        style={{ "--rot": "-7deg", "--fy": "-20px", "--dur": "17s" } as React.CSSProperties}
      />
      <img
        src={HERO_WORKS[1]!.image}
        alt=""
        loading="lazy"
        className="atelier-item absolute top-[76%] left-[14%] hidden w-[clamp(70px,8vw,130px)] rounded-sm border-[6px] border-card object-cover shadow-[0_24px_50px_-24px_rgba(0,0,0,0.45)] lg:block"
        style={{ "--rot": "6deg", "--fy": "-16px", "--dur": "13s", "--delay": "-6s" } as React.CSSProperties}
      />
      <img
        src={HERO_WORKS[2]!.image}
        alt=""
        loading="lazy"
        className="atelier-item absolute top-[30%] right-[18%] hidden w-[clamp(90px,10vw,170px)] rounded-sm border-[6px] border-card object-cover shadow-[0_24px_50px_-24px_rgba(0,0,0,0.45)] lg:block"
        style={{ "--rot": "9deg", "--fy": "-22px", "--dur": "15s", "--delay": "-9s" } as React.CSSProperties}
      />

      {ATELIER_ITEMS.map((item, i) => (
        <img
          key={i}
          src={item.src}
          alt={item.alt}
          loading="lazy"
          width={768}
          height={768}
          className={`atelier-item absolute drop-shadow-[0_28px_40px_rgba(0,0,0,0.16)] ${item.className}`}
          style={item.style}
        />
      ))}
    </div>
  );
}

function Index() {
  const works = allWorks.length;
  return (
    <div className="min-h-screen">
      {/* Hero: Logo im Atelier */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-background">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 45%, color-mix(in oklab, var(--accent) 70%, transparent) 0%, transparent 62%)",
          }}
        />
        <Atelier />
        <div className="relative z-10 flex max-w-3xl flex-col items-center px-6 py-14 text-center">
          <img
            src={provenanceLogo}
            alt="Provenance"
            width={1920}
            height={640}
            className="w-[min(74vw,680px)] drop-shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
          />
          <h1 className="sr-only">Provenance — Kunstgeschichte lernen</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Das Atelier der Kunstgeschichte: Maler kennenlernen, Werke verstehen und Museen auf dem
            Globus bereisen.
          </p>
          <p className="font-display mt-4 text-[11px] tracking-[0.4em] text-muted-foreground uppercase">
            {epochs.length} Epochen · {allPainters.length} Maler · {works} Werke ·{" "}
            {museums.length} Museen
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/globus"
              className="font-display inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-xs font-normal tracking-[0.18em] text-background uppercase transition-transform hover:-translate-y-0.5"
            >
              <Globe2 className="h-4 w-4" />
              Globus öffnen
            </Link>
            <a
              href="#epochen"
              className="font-display inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-3.5 text-xs font-normal tracking-[0.18em] text-foreground uppercase transition-colors hover:bg-foreground/5"
            >
              Epochen ansehen
            </a>
          </div>
        </div>
      </section>

      {/* Drei Wege — intuitiver Einstieg */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-px px-6 py-4 sm:grid-cols-3">
          <StartCard
            to="/globus"
            icon={<Globe2 className="h-5 w-5" />}
            title="Globus & Museen"
            text={`${cities.length} Städte, ${museums.length} Häuser — dreh den Globus und geh hinein.`}
          />
          <StartCard
            to="/reisen"
            icon={<Compass className="h-5 w-5" />}
            title="Kunstreisen"
            text={`${journeys.length} geführte Touren durch Städte, Strömungen und Ideen.`}
          />
          <StartCard
            to="/quiz"
            icon={<Sparkles className="h-5 w-5" />}
            title="Quiz"
            text="Teste, was hängen geblieben ist — und sammle Punkte im Atelier."
          />
        </div>
      </section>

      {/* Epochen */}
      <section id="epochen" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
        <h2 className="font-display mb-3 text-4xl font-medium tracking-[-0.03em] uppercase md:text-5xl">
          Die Epochen
        </h2>
        <p className="mb-10 max-w-2xl text-muted-foreground">
          Der Anfang: sechs große Kapitel der Malerei, jedes mit seinen Malern und Werken.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {epochs.map((epoch, i) => {
            const cover = epoch.painters[0]?.works[0];
            return (
              <Link
                key={epoch.slug}
                to="/epochen/$epoche"
                params={{ epoche: epoch.slug }}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  {cover && (
                    <img
                      src={cover.image}
                      alt={cover.title}
                      loading={i > 0 ? "lazy" : undefined}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <p className="font-display text-[10px] font-medium tracking-[0.3em] text-white/80 uppercase">
                      {epoch.period}
                    </p>
                    <h3 className="font-display mt-1 text-3xl font-medium tracking-[-0.02em] text-white uppercase">
                      {epoch.name}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-between p-6">
                  <p className="text-sm text-muted-foreground">
                    {epoch.painters.length} Maler ·{" "}
                    {epoch.painters.reduce((n, p) => n + p.works.length, 0)} Werke
                  </p>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Kunstreisen */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="font-display mb-3 text-4xl font-medium tracking-[-0.03em] uppercase md:text-5xl">
            Kunstreisen
          </h2>
          <p className="mb-10 max-w-2xl text-muted-foreground">
            Geführte Touren durch Städte, Strömungen und Ideen — von Florenz der Medici bis zur New
            Yorker Schule.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {journeys.map((j) => (
              <Link
                key={j.slug}
                to="/reisen/$slug"
                params={{ slug: j.slug }}
                className="group rounded-xl border border-border p-6 transition-colors hover:bg-accent"
              >
                <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  {j.kind} · {j.era}
                </p>
                <h3 className="font-display mt-2 text-xl font-medium">{j.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{j.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StartCard({
  to,
  icon,
  title,
  text,
}: {
  to: "/globus" | "/reisen" | "/quiz";
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-start gap-4 rounded-xl p-6 transition-colors hover:bg-accent"
    >
      <span className="mt-0.5 text-muted-foreground">{icon}</span>
      <span>
        <span className="font-display flex items-center gap-2 text-lg font-medium">
          {title}
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </span>
        <span className="mt-1 block text-sm text-muted-foreground">{text}</span>
      </span>
    </Link>
  );
}

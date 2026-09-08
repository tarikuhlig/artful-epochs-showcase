import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { epochs, allPainters, allWorks } from "@/lib/art-data";
import provenanceLogo from "@/assets/provenance-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Provenance — Maler, Epochen und ihre Werke entdecken" },
      {
        name: "description",
        content:
          "Lerne die großen Maler der Kunstgeschichte kennen: von der Renaissance über Romantik und Impressionismus bis zur Moderne — mit Werken, Beschreibungen und Quiz.",
      },
      { property: "og:title", content: "Provenance — Maler, Epochen und ihre Werke entdecken" },
      {
        property: "og:description",
        content:
          "Die großen Epochen der Malerei entdecken: Maler, Werke und Geschichten — klar und schön geordnet.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const TUNNEL_POSITIONS = [
  { tx: "-32vw", ty: "-22vh", rot: "-4deg" },
  { tx: "30vw", ty: "-26vh", rot: "3deg" },
  { tx: "-36vw", ty: "18vh", rot: "5deg" },
  { tx: "34vw", ty: "20vh", rot: "-3deg" },
  { tx: "-18vw", ty: "30vh", rot: "2deg" },
  { tx: "20vw", ty: "-32vh", rot: "-5deg" },
  { tx: "-40vw", ty: "-2vh", rot: "3deg" },
  { tx: "40vw", ty: "4vh", rot: "-2deg" },
  { tx: "-12vw", ty: "-34vh", rot: "4deg" },
  { tx: "14vw", ty: "32vh", rot: "-4deg" },
  { tx: "-26vw", ty: "8vh", rot: "-3deg" },
  { tx: "26vw", ty: "-10vh", rot: "4deg" },
];

const TUNNEL_STEP = Math.max(1, Math.floor(allWorks.length / TUNNEL_POSITIONS.length));
const TUNNEL_WORKS = allWorks
  .filter((_, i) => i % TUNNEL_STEP === 0)
  .slice(0, TUNNEL_POSITIONS.length);



function Tunnel() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: "1100px", perspectiveOrigin: "50% 50%" }}
    >
      {TUNNEL_WORKS.map((work, i) => {
        const pos = TUNNEL_POSITIONS[i % TUNNEL_POSITIONS.length]!;
        return (
          <img
            key={work.id}
            src={work.image}
            alt=""
            loading="lazy"
            className="tunnel-tile absolute top-1/2 left-1/2 w-[clamp(190px,24vw,400px)] rounded-lg border border-black/5 object-cover shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]"
            style={
              {
                "--tx": pos.tx,
                "--ty": pos.ty,
                "--rot": pos.rot,
                "--dur": `${14 + (i % 4) * 2}s`,
                "--delay": `${-i * 1.25}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero mit Bilder-Tunnel */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-background">
        <Tunnel />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,var(--background)_88%)]" />
        <div
          className="relative z-10 flex flex-col items-center px-6 py-10 text-center"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center, var(--background) 0%, color-mix(in oklab, var(--background) 72%, transparent) 48%, transparent 74%)",
          }}
        >
          <img
            src={provenanceLogo}
            alt="Provenance"
            width={1920}
            height={640}
            className="w-[min(78vw,760px)] drop-shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
          />
          <p className="font-display mt-6 text-[11px] font-normal tracking-[0.42em] text-muted-foreground uppercase sm:text-xs">
            {epochs.length} Epochen · {allPainters.length} Maler · {allWorks.length} Werke
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/katalog"
              className="font-display inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-xs font-normal tracking-[0.18em] text-background uppercase transition-transform hover:-translate-y-0.5"
            >
              Katalog durchsuchen
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/reisen"
              className="font-display inline-flex items-center gap-2 rounded-full border border-foreground/25 px-7 py-3.5 text-xs font-normal tracking-[0.18em] text-foreground uppercase transition-colors hover:bg-foreground/5"
            >
              Kunstreisen
            </Link>
            <Link
              to="/quiz"
              className="font-display inline-flex items-center gap-2 rounded-full border border-foreground/25 px-7 py-3.5 text-xs font-normal tracking-[0.18em] text-foreground uppercase transition-colors hover:bg-foreground/5"
            >
              Zum Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Epochen */}
      <section id="epochen" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display mb-10 text-4xl font-medium tracking-[-0.03em] uppercase md:text-6xl">
          Die Epochen
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {epochs.map((epoch, i) => {
            const cover = epoch.painters[0]?.works[0];
            return (
              <Link
                key={epoch.slug}
                to="/epochen/$epoche"
                params={{ epoche: epoch.slug }}
                className="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
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
    </div>
  );
}

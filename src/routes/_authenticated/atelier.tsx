import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Coins, Flame, Sparkles, Trophy } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDiscoveries } from "@/lib/progress";
import { allWorks } from "@/lib/art-data";
import { journeys } from "@/lib/journeys";
import {
  POINTS_PER_DISCOVERY,
  harvestToday,
  levelFor,
  levelTitle,
  todayISO,
  useInvalidateFarm,
  useJourneyProgress,
  useUserStats,
  workOfTheDay,
} from "@/lib/farm";
import coin from "@/assets/provenance-coin.png";

export const Route = createFileRoute("/_authenticated/atelier")({
  head: () => ({
    meta: [
      { title: "Atelier — tägliche Ernte, Serie und Level | Provenance" },
      {
        name: "description",
        content:
          "Dein Atelier: Werk des Tages ernten, Serie halten, Punkte sammeln und neue Level freischalten.",
      },
      { property: "og:title", content: "Atelier | Provenance" },
      { property: "og:description", content: "Tägliche Ernte, Serie und Level in Provenance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AtelierPage,
});

function AtelierPage() {
  const { user } = useAuth();
  const { data: stats } = useUserStats();
  const { data: discoveries } = useDiscoveries();
  const { data: journeyProgress } = useJourneyProgress();
  const invalidate = useInvalidateFarm();
  const [busy, setBusy] = useState(false);

  const work = workOfTheDay();
  const harvestedToday = stats?.last_harvest_date === todayISO();
  const discoveryPoints = (discoveries?.length ?? 0) * POINTS_PER_DISCOVERY;
  const totalPoints = (stats?.points ?? 0) + discoveryPoints;
  const lvl = levelFor(totalPoints);

  async function harvest() {
    if (!user || !stats) return;
    setBusy(true);
    try {
      await harvestToday(user.id, stats);
      invalidate();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
        Atelier
      </p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight md:text-5xl">
        Level {lvl.level} · {levelTitle(lvl.level)}
      </h1>

      <div className="mt-6 max-w-xl">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${lvl.progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {totalPoints} Punkte · noch {lvl.toNext} bis Level {lvl.level + 1}
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-4">
        <Stat icon={<Sparkles className="h-4 w-4" />} label="Punkte" value={totalPoints} />
        <Stat
          icon={<Flame className="h-4 w-4" />}
          label="Serie"
          value={`${stats?.streak ?? 0} Tage`}
        />
        <Stat icon={<Coins className="h-4 w-4" />} label="Provenance Coins" value={stats?.coins ?? 0} />
        <Stat
          icon={<Trophy className="h-4 w-4" />}
          label="Beste Serie"
          value={`${stats?.best_streak ?? 0} Tage`}
        />
      </div>

      <section className="mt-14 overflow-hidden rounded-2xl border border-border bg-card md:grid md:grid-cols-[1.1fr_1fr]">
        <div className="aspect-4/3 overflow-hidden bg-muted md:aspect-auto">
          <img
            src={work.image}
            alt={`${work.title} von ${work.painter.name}`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-8">
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Werk des Tages</p>
          <h2 className="font-display mt-3 text-3xl font-medium">{work.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {work.painter.name} · {work.year}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{work.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={harvest}
              disabled={harvestedToday || busy}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              {harvestedToday ? "Heute geerntet" : busy ? "Wird geerntet …" : "Heute ernten"}
            </button>
            <Link
              to="/werke/$id"
              params={{ id: work.id }}
              className="rounded-full border border-input px-6 py-2.5 text-sm transition-colors hover:bg-accent"
            >
              Werk ansehen
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Jeder Tag in Folge erhöht deinen Bonus – bis zu 60 Punkte pro Ernte.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link to="/kunstpfad" className="flex items-center gap-4 rounded-xl border border-border bg-path-sky p-6 transition-transform hover:-translate-y-0.5"><img src={coin} alt="" width={1024} height={1024} className="h-14 w-14" /><span><span className="font-display block text-xl font-medium">Reise</span><span className="text-sm text-muted-foreground">Fragen lösen, Stationen öffnen und Coins verdienen</span></span></Link>
        <Link to="/auktionshaus" className="flex items-center gap-4 rounded-xl border border-border bg-coin-soft p-6 transition-transform hover:-translate-y-0.5"><Coins className="h-10 w-10 text-coin" /><span><span className="font-display block text-xl font-medium">Auktionshaus</span><span className="text-sm text-muted-foreground">Wechselnde Werke zum Festpreis</span></span></Link>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-medium">Kunstreisen</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {journeyProgress?.length ?? 0} von {journeys.length} abgeschlossen
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {journeys.map((j) => {
            const done = journeyProgress?.some((p) => p.journey_slug === j.slug);
            return (
              <Link
                key={j.slug}
                to="/reisen/$slug"
                params={{ slug: j.slug }}
                className="flex items-center justify-between rounded-xl border border-border px-5 py-4 text-sm transition-colors hover:bg-accent"
              >
                <span>
                  <span className="font-medium">{j.title}</span>
                  <span className="block text-xs text-muted-foreground">{j.kind}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {done ? "abgeschlossen" : `+${j.reward}`}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-16 rounded-xl border border-border bg-muted/40 p-8">
        <h2 className="font-display text-2xl font-medium">So sammelst du Punkte</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>+{POINTS_PER_DISCOVERY} für jedes neu entdeckte Werk, jeden Maler, jede Epoche</li>
          <li>+25 für die tägliche Ernte, plus 5 pro Tag Serie (max. 35 Bonus)</li>
          <li>+35 bis 50 für jede abgeschlossene Kunstreise</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          Bisher entdeckt: {discoveries?.length ?? 0} von{" "}
          {allWorks.length + new Set(allWorks.map((w) => w.painter.slug)).size + 6} Einträgen.
        </p>
        <Link
          to="/sammlung"
          className="mt-6 inline-flex rounded-full border border-input px-6 py-2.5 text-sm transition-colors hover:bg-accent"
        >
          Zur Sammlung
        </Link>
      </section>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="flex items-center gap-2 text-xs tracking-widest text-muted-foreground uppercase">
        {icon}
        {label}
      </p>
      <p className="font-display mt-2 text-2xl font-medium">{value}</p>
    </div>
  );
}

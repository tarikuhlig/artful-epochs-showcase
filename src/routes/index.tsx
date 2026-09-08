import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Compass, Flame, Globe2, Layers, Sparkles, Trophy } from "lucide-react";
import { IntroTunnel } from "@/components/IntroTunnel";
import { TitleGate } from "@/components/TitleGate";
import { epochs, allPainters, allWorks } from "@/lib/art-data";
import { journeys } from "@/lib/journeys";
import { cities, museums } from "@/lib/museums";
import { useAuth } from "@/hooks/useAuth";
import { useDiscoveries, useQuizResults } from "@/lib/progress";
import {
  POINTS_PER_DISCOVERY,
  levelFor,
  levelTitle,
  useJourneyProgress,
  useUserStats,
  workOfTheDay,
} from "@/lib/farm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — dein Kunstfortschritt | Provenance" },
      {
        name: "description",
        content:
          "Dein Provenance-Dashboard: Level, Punkte, Serie, entdeckte Maler und Werke, Werk des Tages und deine nächsten Kunstreisen.",
      },
      { property: "og:title", content: "Dashboard | Provenance" },
      {
        property: "og:description",
        content: "Fortschritt, Werk des Tages und Kunstreisen auf einen Blick.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const { data: stats } = useUserStats();
  const { data: discoveries } = useDiscoveries();
  const { data: quiz } = useQuizResults();
  const { data: journeyProgress } = useJourneyProgress();

  const list = discoveries ?? [];
  const count = (kind: string) => list.filter((d) => d.kind === kind).length;
  const totalPoints = (stats?.points ?? 0) + list.length * POINTS_PER_DISCOVERY;
  const lvl = levelFor(totalPoints);
  const work = workOfTheDay();
  const bestQuiz = (quiz ?? []).reduce(
    (best, q) => (q.total && q.score / q.total > best ? q.score / q.total : best),
    0,
  );
  const name =
    (user?.user_metadata?.["display_name"] as string | undefined) ??
    user?.email?.split("@")[0] ??
    null;

  return (
    <div className="min-h-screen">
      <IntroTunnel />

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <p className="font-display text-[11px] tracking-[0.35em] text-muted-foreground uppercase">
            Dashboard
          </p>
          <h1 className="font-display mt-3 text-4xl font-medium tracking-[-0.03em] md:text-5xl">
            {name ? `Willkommen zurück, ${name}` : "Willkommen bei Provenance"}
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            {user
              ? `Level ${lvl.level} · ${levelTitle(lvl.level)} — noch ${lvl.toNext} Punkte bis Level ${lvl.level + 1}.`
              : "Melde dich an, um Fortschritt, Punkte und deine Sammlung zu speichern."}
          </p>

          {user ? (
            <div className="mt-6 max-w-xl">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{ width: `${lvl.progress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/auth"
                className="font-display inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-xs tracking-[0.18em] text-background uppercase transition-transform hover:-translate-y-0.5"
              >
                Anmelden
              </Link>
              <Link
                to="/epochen"
                className="font-display inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-3.5 text-xs tracking-[0.18em] uppercase transition-colors hover:bg-foreground/5"
              >
                Epochen ansehen
              </Link>
            </div>
          )}

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat
              icon={<Trophy className="h-4 w-4" />}
              label="Punkte"
              value={user ? totalPoints : "—"}
            />
            <Stat
              icon={<Flame className="h-4 w-4" />}
              label="Serie"
              value={user ? `${stats?.streak ?? 0} Tage` : "—"}
            />
            <Stat
              icon={<Sparkles className="h-4 w-4" />}
              label="Entdeckt"
              value={user ? list.length : "—"}
            />
            <Stat
              icon={<Layers className="h-4 w-4" />}
              label="Bestes Quiz"
              value={user && bestQuiz ? `${Math.round(bestQuiz * 100)} %` : "—"}
            />
          </div>
        </div>
      </section>

      {/* Profilmerkmale */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-border p-6 lg:col-span-2">
            <h2 className="font-display text-xl font-medium">Dein Profil</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Mini label="Maler" value={count("painter")} total={allPainters.length} />
              <Mini label="Werke" value={count("work")} total={allWorks.length} />
              <Mini label="Museen" value={count("museum")} total={museums.length} />
              <Mini
                label="Kunstreisen"
                value={(journeyProgress ?? []).length}
                total={journeys.length}
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link
                to={user ? "/atelier" : "/auth"}
                className="rounded-full border border-input px-5 py-2.5 transition-colors hover:bg-accent"
              >
                Mein Atelier
              </Link>
              <Link
                to={user ? "/sammlung" : "/auth"}
                className="rounded-full border border-input px-5 py-2.5 transition-colors hover:bg-accent"
              >
                Meine Sammlung
              </Link>
              <Link
                to="/quiz"
                className="rounded-full border border-input px-5 py-2.5 transition-colors hover:bg-accent"
              >
                Quiz spielen
              </Link>
            </div>
          </div>

          <Link
            to="/werke/$id"
            params={{ id: work.id }}
            className="group overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={work.image}
                alt={work.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                Werk des Tages
              </p>
              <h3 className="font-display mt-2 text-lg font-medium">{work.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {typeof work.painter === "string" ? work.painter : work.painter.name}{" "}
                {work.year ? `· ${work.year}` : ""}
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Wege in die Sammlung */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-px px-6 py-4 sm:grid-cols-2 lg:grid-cols-4">
          <StartCard
            to="/epochen"
            icon={<Layers className="h-5 w-5" />}
            title="Epochen"
            text={`${epochs.length} Kapitel der Malerei, von der Gotik bis zur Moderne.`}
          />
          <StartCard
            to="/globus"
            icon={<Globe2 className="h-5 w-5" />}
            title="Globus & Museen"
            text={`${cities.length} Städte, ${museums.length} Häuser — dreh den Globus.`}
          />
          <StartCard
            to="/reisen"
            icon={<Compass className="h-5 w-5" />}
            title="Kunstreisen"
            text={`${journeys.length} geführte Touren durch Städte und Strömungen.`}
          />
          <StartCard
            to="/quiz"
            icon={<Sparkles className="h-5 w-5" />}
            title="Quiz"
            text="Teste, was hängen geblieben ist — und sammle Punkte."
          />
        </div>
      </section>

      {/* Kunstreisen */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display mb-3 text-3xl font-medium tracking-[-0.03em] uppercase md:text-4xl">
          Weiterreisen
        </h2>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          Geführte Touren durch Städte, Strömungen und Ideen.
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
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-5">
      <span className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
        {icon}
        {label}
      </span>
      <p className="font-display mt-2 text-2xl font-medium">{value}</p>
    </div>
  );
}

function Mini({ label, value, total }: { label: string; value: number; total: number }) {
  const pct = total ? Math.min(100, Math.round((value / total) * 100)) : 0;
  return (
    <div>
      <p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">{label}</p>
      <p className="font-display mt-1 text-xl font-medium">
        {value}
        <span className="text-sm text-muted-foreground"> / {total}</span>
      </p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function StartCard({
  to,
  icon,
  title,
  text,
}: {
  to: "/epochen" | "/globus" | "/reisen" | "/quiz";
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

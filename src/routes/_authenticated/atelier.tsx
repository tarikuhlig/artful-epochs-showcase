import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Coins, Flame, Images, Landmark, Layers, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useDiscoveries } from "@/lib/progress";
import { allPainters, allWorks } from "@/lib/art-data";
import { journeys } from "@/lib/journeys";
import { museums } from "@/lib/museums";
import { artPathWithWorks } from "@/lib/art-path";
import { useArtPathProgress, useAuctionTotals, useCardQuizRounds, useDailyLessons, useOwnedItems, useStudyRewards, useStudyTotals } from "@/lib/economy";
import { DAILY_DAILY_MAX, STUDY_CARDS_PER_DAY, STUDY_DAILY_MAX } from "@/lib/coin-economy";
import { DailyLesson } from "@/components/DailyLesson";
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
import { PremiumLock } from "@/components/PremiumLock";
import { PremiumUpsell } from "@/components/PremiumUpsell";
import { DailyCoinChallenge } from "@/components/DailyCoinChallenge";
import { CardQuiz } from "@/components/CardQuiz";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";

export const Route = createFileRoute("/_authenticated/atelier")({
  head: () => ({
    meta: [
      { title: "Galerie — Kunstsammlung & Fortschritt | Provenance" },
      {
        name: "description",
        content:
          "Deine Galerie: Lieblingswerke ausstellen, Fortschritt sehen, Coins sammeln und neue Level freischalten.",
      },
      { property: "og:title", content: "Galerie | Provenance" },
      { property: "og:description", content: "Kunstsammlung, Ausstellung und persönlicher Fortschritt in Provenance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AtelierPage,
});

function AtelierPage() {
  const { user } = useAuth();
  const access = usePremiumAccess();
  const { data: stats } = useUserStats();
  const { data: discoveries } = useDiscoveries();
  const { data: journeyProgress } = useJourneyProgress();
  const { data: pathProgress } = useArtPathProgress();
  const { data: ownedItems } = useOwnedItems();
  const invalidate = useInvalidateFarm();
  const [busy, setBusy] = useState(false);

  const work = workOfTheDay();
  const harvestedToday = stats?.last_harvest_date === todayISO();
  const discoveryPoints = (discoveries?.length ?? 0) * POINTS_PER_DISCOVERY;
  const totalPoints = (stats?.points ?? 0) + discoveryPoints;
  const lvl = levelFor(totalPoints);
  const list = discoveries ?? [];
  const count = (kind: string) => list.filter((item) => item.kind === kind).length;
  const name = (user?.user_metadata?.["display_name"] as string | undefined) ?? user?.email?.split("@")[0] ?? "Kunstfreund";

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
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
         Meine Galerie
      </p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight md:text-5xl">
        Willkommen, {name}
      </h1>
      <p className="mt-3 text-muted-foreground">Level {lvl.level} · {levelTitle(lvl.level)} — hier wächst deine persönliche Kunstwelt.</p>
      <p className="mt-3 inline-flex rounded-full border border-border px-3 py-1 text-xs">{access.isAdmin ? "Admin · Premium-Testzugang" : access.hasAccess ? "Premium aktiv" : "Free"}</p>

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

      <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
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

      <section className="mt-8 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-xl border border-border p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4"><div><p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Dein Dashboard</p><h2 className="font-display mt-2 text-2xl font-medium">Entdeckungen</h2></div><Sparkles className="h-5 w-5 text-coin" /></div>
          <div className="mt-7 grid grid-cols-2 gap-5 sm:grid-cols-4">
            <Progress label="Künstler" value={count("painter")} total={allPainters.length} icon={<Sparkles />} />
            <Progress label="Werke" value={count("work")} total={allWorks.length} icon={<Images />} />
            <Progress label="Museen" value={count("museum")} total={museums.length} icon={<Landmark />} />
            <Progress label="Reisen" value={pathProgress?.length ?? 0} total={artPathWithWorks.length} icon={<Layers />} />
          </div>
        </div>
        <Link to="/sammlung" className="group flex flex-col justify-between rounded-xl bg-path-leaf p-6 sm:p-8">
          <div className="flex items-start justify-between"><Images className="h-6 w-6" /><ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></div>
          <div className="mt-10"><p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Private Galerie</p><h2 className="font-display mt-2 text-2xl font-medium">{ownedItems?.length ?? 0} Werke gesammelt</h2><p className="mt-2 text-sm text-muted-foreground">Ordnen, vergleichen und deine Sammlung kuratieren.</p></div>
        </Link>
      </section>

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
            <Button
              onClick={harvest}
              disabled={harvestedToday || busy}
              className="rounded-full px-6"
            >
              {harvestedToday ? "Heute geerntet" : busy ? "Wird geerntet …" : "Heute ernten"}
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6"><Link to="/werke/$id" params={{ id: work.id }}>Werk ansehen</Link></Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Jeder Tag in Folge erhöht deinen Bonus – bis zu 60 Punkte pro Ernte.
          </p>
        </div>
      </section>

      <LearningProgress />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <DailyLesson kind="work" />
        <DailyLesson kind="artist" />
      </div>

      {access.hasAccess ? <div className="mt-10"><DailyCoinChallenge /></div> : <div className="mt-10 space-y-6"><PremiumLock title="Tägliche Coin-Challenge freischalten" description="Mit Premium löst du täglich drei Kunstfragen, verdienst bis zu 50 Coins und kannst sie im Auktionshaus für deine Galerie einsetzen." /><PremiumUpsell /></div>}

      <div className="mt-10"><CardQuiz /></div>

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

function Progress({ label, value, total, icon }: { label: string; value: number; total: number; icon: React.ReactNode }) {
  const percent = total ? Math.min(100, Math.round((value / total) * 100)) : 0;
  return <div><span className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase [&_svg]:h-3.5 [&_svg]:w-3.5">{icon}{label}</span><p className="font-display mt-2 text-xl font-medium">{value} <span className="text-sm text-muted-foreground">/ {total}</span></p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-coin" style={{ width: `${percent}%` }} /></div></div>;
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

/** Lernfortschritt: Stationen, Studierkarten und was bis zur Vollsammlung fehlt. */
function LearningProgress() {
  const { data: pathProgress = [] } = useArtPathProgress();
  const { data: owned = [] } = useOwnedItems();
  const { data: stats } = useUserStats();
  const today = todayISO();
  const { data: studyToday } = useStudyRewards(today);
  const { data: studyTotals } = useStudyTotals();
  const { data: quizRounds = [] } = useCardQuizRounds(today);
  const { data: lessons = [] } = useDailyLessons(today);
  const { data: auction } = useAuctionTotals();

  const ownedSlugs = new Set(owned.map((item) => item.item_slug));
  const missing = (auction?.offers ?? []).filter((offer) => !ownedSlugs.has(offer.work_slug));
  const missingCoins = missing.reduce((sum, offer) => sum + offer.price, 0);
  const stillNeeded = Math.max(0, missingCoins - (stats?.coins ?? 0));
  const perDay = STUDY_DAILY_MAX + DAILY_DAILY_MAX;
  const openStations = artPathWithWorks.length - pathProgress.length;
  const openStationCoins = artPathWithWorks
    .filter((station) => !pathProgress.some((entry) => entry.station_index === station.index))
    .reduce((sum, station) => sum + station.coinReward, 0);
  const days = Math.ceil(Math.max(0, stillNeeded - openStationCoins) / perDay);

  const earnedToday =
    (studyToday?.coins_awarded ?? 0) +
    quizRounds.reduce((sum, round) => sum + round.coin_reward, 0) +
    lessons.reduce((sum, lesson) => sum + lesson.coin_reward, 0);

  return (
    <section className="mt-10 rounded-xl border border-border p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Lernfortschritt</p>
          <h2 className="font-display mt-2 text-2xl font-medium">Was du gelernt hast</h2>
        </div>
        <p className="flex items-center gap-2 text-sm"><img src={coin} alt="" className="h-6 w-6" />{earnedToday} heute verdient · bis {perDay} täglich möglich</p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<Sparkles className="h-4 w-4" />} label="Reise-Stationen" value={`${pathProgress.length}/${artPathWithWorks.length}`} />
        <Stat icon={<Layers className="h-4 w-4" />} label="Studierte Karten" value={`${studyTotals?.cards ?? 0}`} />
        <Stat icon={<Layers className="h-4 w-4" />} label="Karten heute" value={`${studyToday?.cards_rewarded ?? 0}/${STUDY_CARDS_PER_DAY}`} />
        <Stat icon={<Images className="h-4 w-4" />} label="Werke in der Sammlung" value={`${owned.length}`} />
      </div>

      <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
        <p className="rounded-lg bg-muted p-4">
          Noch offen: <strong>{openStations} Stationen</strong> mit zusammen {openStationCoins.toLocaleString("de-DE")} Coins.
        </p>
        <p className="rounded-lg bg-coin-soft p-4">
          {missing.length === 0
            ? "Du besitzt bereits jedes Werk aus dem Auktionshaus."
            : stillNeeded === 0
              ? `Dein Guthaben reicht für alle ${missing.length} fehlenden Werke.`
              : <>Für die {missing.length} fehlenden Werke brauchst du noch <strong>{stillNeeded.toLocaleString("de-DE")} Coins</strong> — mit der Reise und rund {days} Lerntagen ist das geschafft.</>}
        </p>
      </div>
    </section>
  );
}

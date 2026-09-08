import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useDiscoveries, useQuizResults } from "@/lib/progress";
import { epochs, allPainters, allWorks } from "@/lib/art-data";

export const Route = createFileRoute("/_authenticated/sammlung")({
  head: () => ({
    meta: [
      { title: "Meine Sammlung — entdeckte Maler & Epochen | Provenance" },
      {
        name: "description",
        content:
          "Dein persönlicher Katalog: welche Maler, Epochen und Werke du schon entdeckt hast, dazu deine Quiz-Ergebnisse.",
      },
      { property: "og:title", content: "Meine Sammlung | Provenance" },
      {
        property: "og:description",
        content: "Dein Katalog entdeckter Maler, Epochen und Werke.",
      },
      { property: "og:type", content: "profile" },
    ],
  }),
  component: CollectionPage,
});

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border p-5">
      <p className="font-display text-3xl font-medium tracking-tight">{value}</p>
      <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">{label}</p>
    </div>
  );
}

function CollectionPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: discoveries = [] } = useDiscoveries();
  const { data: results = [] } = useQuizResults();

  const profile = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const sets = useMemo(() => {
    const make = (kind: string) =>
      new Set(discoveries.filter((d) => d.kind === kind).map((d) => d.slug));
    return { painter: make("painter"), work: make("work"), epoch: make("epoch") };
  }, [discoveries]);

  const best = results.reduce(
    (acc, r) => (r.total > 0 && r.score / r.total > acc ? r.score / r.total : acc),
    0,
  );

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  }

  const name = profile.data?.display_name ?? user?.email?.split("@")[0] ?? "";

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm tracking-widest text-muted-foreground uppercase">Meine Sammlung</p>
          <h1 className="font-display mt-2 text-4xl font-medium tracking-tight md:text-5xl">
            {name ? `Hallo, ${name}` : "Dein Katalog"}
          </h1>
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-md border border-input px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          Abmelden
        </button>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Epochen" value={`${sets.epoch.size}/${epochs.length}`} />
        <Stat label="Maler" value={`${sets.painter.size}/${allPainters.length}`} />
        <Stat label="Werke" value={`${sets.work.size}/${allWorks.length}`} />
        <Stat label="Bestes Quiz" value={best ? `${Math.round(best * 100)}%` : "—"} />
      </div>

      <h2 className="font-display mt-16 mb-4 text-2xl font-medium">Epochen</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {epochs.map((e) => {
          const found = sets.epoch.has(e.slug);
          return (
            <Link
              key={e.slug}
              to="/epochen/$epoche"
              params={{ epoche: e.slug }}
              className={`rounded-md border p-4 transition-colors ${found ? "border-border bg-accent/40" : "border-dashed border-border text-muted-foreground hover:bg-accent/30"}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{e.name}</span>
                {found ? <Check className="h-4 w-4" /> : <Lock className="h-4 w-4 opacity-50" />}
              </div>
              <p className="mt-1 text-xs">{e.period}</p>
            </Link>
          );
        })}
      </div>

      <h2 className="font-display mt-14 mb-4 text-2xl font-medium">Maler</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allPainters.map((p) => {
          const found = sets.painter.has(p.slug);
          return (
            <Link
              key={p.slug}
              to="/maler/$slug"
              params={{ slug: p.slug }}
              className={`rounded-md border p-4 transition-colors ${found ? "border-border bg-accent/40" : "border-dashed border-border text-muted-foreground hover:bg-accent/30"}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{p.name}</span>
                {found ? <Check className="h-4 w-4" /> : <Lock className="h-4 w-4 opacity-50" />}
              </div>
              <p className="mt-1 text-xs">
                {p.life} · {p.epoch.name}
              </p>
            </Link>
          );
        })}
      </div>

      <h2 className="font-display mt-14 mb-4 text-2xl font-medium">Werke</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {allWorks.map((w) => {
          const found = sets.work.has(w.id);
          return (
            <Link key={w.id} to="/werke/$id" params={{ id: w.id }} className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted">
                <img
                  src={w.image}
                  alt={`${w.title} von ${w.painter.name}`}
                  loading="lazy"
                  className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${found ? "" : "opacity-30 grayscale"}`}
                />
              </div>
              <p className="mt-2 text-sm font-medium">{found ? w.title : "Noch nicht entdeckt"}</p>
              <p className="text-xs text-muted-foreground">{found ? w.painter.name : w.year}</p>
            </Link>
          );
        })}
      </div>

      <h2 className="font-display mt-14 mb-4 text-2xl font-medium">Quiz-Ergebnisse</h2>
      {results.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Noch keine Ergebnisse —{" "}
          <Link to="/quiz" className="underline underline-offset-4">
            Quiz starten
          </Link>
          .
        </p>
      ) : (
        <ul className="divide-y divide-border rounded-md border border-border">
          {results.map((r) => (
            <li key={r.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <span>{new Date(r.created_at).toLocaleDateString("de-DE")}</span>
              <span className="font-medium">
                {r.score} / {r.total}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

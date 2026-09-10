import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Coins, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { claimCollectionMilestone, sellOwnedItem } from "@/lib/economy.functions";
import { useCoinAwards } from "@/lib/coin-awards";
import { useOwnedItems } from "@/lib/economy";
import { allWorks } from "@/lib/art-data";
import { sellPrice } from "@/lib/art-valuation";
import { useFavorites } from "@/lib/favorites";

const MILESTONES = [
  { key: "works:5" as const, need: 5, coins: 100 },
  { key: "works:10" as const, need: 10, coins: 200 },
  { key: "works:25" as const, need: 25, coins: 500 },
  { key: "works:50" as const, need: 50, coins: 1000 },
];

export function CollectionRewards({ featuredIds = [] }: { featuredIds?: string[] }) {
  const queryClient = useQueryClient();
  const claim = useServerFn(claimCollectionMilestone);
  const sell = useServerFn(sellOwnedItem);
  const { data: owned = [] } = useOwnedItems();
  const { data: awards = [] } = useCoinAwards();
  const { data: favorites = [] } = useFavorites();
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");
  const [confirmSlug, setConfirmSlug] = useState<string | null>(null);

  const ownedWorks = owned.filter((item) => item.kind !== "painter");
  const count = ownedWorks.length;
  const favoriteSlugs = new Set(favorites.map((entry) => entry.work_slug));

  async function claimMilestone(key: (typeof MILESTONES)[number]["key"]) {
    setBusy(key);
    setMessage("");
    try {
      const result = (await claim({ data: { key } })) as { awarded?: number };
      setMessage(result.awarded ? `+${result.awarded} Coins gutgeschrieben.` : "Diese Belohnung war schon eingelöst.");
      await queryClient.invalidateQueries({ queryKey: ["user_stats"] });
      await queryClient.invalidateQueries({ queryKey: ["coin_awards"] });
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : "Das hat nicht geklappt.");
    } finally {
      setBusy("");
    }
  }

  async function sellWork(slug: string) {
    setBusy(slug);
    setMessage("");
    try {
      const result = (await sell({ data: { workSlug: slug } })) as { price?: number };
      setMessage(`Verkauft für ${result.price ?? 0} Coins.`);
      setConfirmSlug(null);
      await queryClient.invalidateQueries({ queryKey: ["user_stats"] });
      await queryClient.invalidateQueries({ queryKey: ["owned_items"] });
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : "Der Verkauf hat nicht geklappt.");
    } finally {
      setBusy("");
    }
  }

  return (
    <section className="mt-14">
      <h2 className="font-display text-2xl font-medium">Coins verdienen</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Sammel-Meilensteine bringen einmalig Coins. Werke, die du nicht behalten willst, kannst du für
        60 % ihres Schätzwerts abgeben.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MILESTONES.map((milestone) => {
          const claimed = awards.some((entry) => entry.kind === "milestone" && entry.award_key === milestone.key);
          const reached = count >= milestone.need;
          return (
            <div key={milestone.key} className="rounded-lg border border-border p-5">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <p className="font-display mt-3 text-xl font-medium">{milestone.need} Werke</p>
              <p className="mt-1 text-xs text-muted-foreground">{Math.min(count, milestone.need)} / {milestone.need} · {milestone.coins} Coins</p>
              <Button
                className="mt-4 w-full"
                size="sm"
                variant={claimed ? "outline" : "default"}
                disabled={claimed || !reached || busy === milestone.key}
                onClick={() => void claimMilestone(milestone.key)}
              >
                {claimed ? "Eingelöst" : reached ? "Einlösen" : "Noch nicht erreicht"}
              </Button>
            </div>
          );
        })}
      </div>

      {ownedWorks.length > 0 && (
        <div className="mt-10">
          <h3 className="text-sm font-medium">Werke abgeben</h3>
          <ul className="mt-4 grid gap-3">
            {ownedWorks.map((item) => {
              const work = allWorks.find((entry) => entry.id === item.item_slug);
              if (!work) return null;
              const price = sellPrice(work.id);
              const flagged = featuredIds.includes(work.id) || favoriteSlugs.has(work.id);
              return (
                <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{work.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {work.painter.name}
                      {flagged && " · ausgestellt oder gemerkt"}
                    </p>
                  </div>
                  {confirmSlug === work.id ? (
                    <span className="flex items-center gap-2">
                      <Button size="sm" disabled={busy === work.id} onClick={() => void sellWork(work.id)}>
                        Für {price} Coins abgeben
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setConfirmSlug(null)}>Abbrechen</Button>
                    </span>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setConfirmSlug(work.id)}>
                      <Coins className="mr-1.5 h-3.5 w-3.5" /> {price}
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {message && <p className="mt-5 text-sm text-muted-foreground">{message}</p>}
    </section>
  );
}

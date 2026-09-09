import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Gavel, Heart, X } from "lucide-react";
import { allWorks, type Work } from "@/lib/art-data";
import { useFavorites, useToggleFavorite } from "@/lib/favorites";
import { useAuctionOffers, useOwnedItems } from "@/lib/economy";
import { privateAuctionPrice } from "@/lib/art-valuation";
import { artRank, artRankClasses } from "@/lib/art-rarity";
import { Button } from "@/components/ui/button";
import { PrivateAuctionDialog } from "@/components/PrivateAuctionDialog";
import coin from "@/assets/provenance-coin.png";

type Sort = "rank" | "recent";

/** Merkliste mit direktem Weg in die Privatauktion. */
export function FavoritesSection() {
  const { data: favorites = [] } = useFavorites();
  const { data: owned = [] } = useOwnedItems();
  const { data: offers = [] } = useAuctionOffers();
  const toggle = useToggleFavorite();
  const [sort, setSort] = useState<Sort>("recent");
  const [auctionWork, setAuctionWork] = useState<Work | null>(null);

  const ownedSlugs = new Set(owned.map((item) => item.item_slug));
  const offerSlugs = new Set(offers.map((offer) => offer.work_slug));

  const rows = useMemo(() => {
    const list = favorites
      .map((favorite) => ({ favorite, work: allWorks.find((entry) => entry.id === favorite.work_slug) }))
      .filter((row): row is { favorite: (typeof favorites)[number]; work: Work } => !!row.work)
      .map((row) => ({ ...row, price: privateAuctionPrice(row.work.id) }));
    return sort === "rank" ? [...list].sort((a, b) => b.price - a.price) : list;
  }, [favorites, sort]);

  return (
    <section className="mt-16 border-t border-border pt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Deine Merkliste</p>
          <h2 className="font-display mt-2 text-3xl font-medium">Favoriten & Privatauktion</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Gemerkte Werke kannst du jederzeit privat erwerben — gegen Aufpreis, auch außerhalb der Tagesrotation.
          </p>
        </div>
        {rows.length > 1 && (
          <div className="flex gap-2">
            {(["recent", "rank"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSort(option)}
                className={`rounded-full border px-4 py-2 text-[11px] tracking-wide transition-colors ${sort === option ? "border-foreground bg-foreground text-primary-foreground" : "border-border text-muted-foreground hover:bg-muted"}`}
              >
                {option === "recent" ? "Zuletzt gemerkt" : "Nach Wert"}
              </button>
            ))}
          </div>
        )}
      </div>

      {rows.length === 0 ? (
        <div className="mt-7 border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          <Heart className="mx-auto h-5 w-5" />
          <p className="mt-3">Noch keine Favoriten. Tippe bei einem Werk auf das Herz, um es hier zu sammeln.</p>
        </div>
      ) : (
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map(({ favorite, work, price }) => {
            const isOwned = ownedSlugs.has(work.id);
            const inAuction = offerSlugs.has(work.id);
            const rank = artRank(price / 1.4);
            return (
              <article key={favorite.id} className="group relative flex flex-col rounded-[1.5rem] border border-border bg-card p-3">
                <button
                  type="button"
                  onClick={() => toggle.mutate({ workSlug: work.id, active: true })}
                  aria-label={`${work.title} aus den Favoriten entfernen`}
                  className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 shadow-sm transition-colors hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                </button>
                <Link to="/werke/$id" params={{ id: work.id }} className="block overflow-hidden rounded-[1.1rem] bg-muted">
                  <div className="aspect-[4/3]">
                    <img src={work.image} alt={work.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                </Link>
                <div className="mt-3 flex flex-1 flex-col px-1">
                  <span className={`inline-flex w-fit rounded-full border px-2 py-0.5 text-[9px] tracking-[0.18em] uppercase ${artRankClasses(rank)}`}>{rank}</span>
                  <h3 className="font-display mt-2 text-xl font-medium leading-tight">{work.title}</h3>
                  <p className="text-sm text-muted-foreground">{work.painter.name} · {work.year}</p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm">
                      <img src={coin} alt="" className="h-4 w-4" />
                      {price.toLocaleString("de-DE")}
                    </span>
                    {isOwned ? (
                      <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground"><Check className="h-4 w-4" /> In der Sammlung</span>
                    ) : inAuction ? (
                      <Button asChild size="sm" variant="outline" className="rounded-full">
                        <Link to="/auktionshaus">Heute günstiger</Link>
                      </Button>
                    ) : (
                      <Button type="button" size="sm" className="rounded-full" onClick={() => setAuctionWork(work)}>
                        <Gavel /> Privatauktion
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <PrivateAuctionDialog work={auctionWork} open={!!auctionWork} onOpenChange={(open) => !open && setAuctionWork(null)} />
    </section>
  );
}

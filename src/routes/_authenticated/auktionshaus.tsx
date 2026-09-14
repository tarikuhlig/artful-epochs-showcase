import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Gem, LockKeyhole, Sparkles } from "lucide-react";
import { allWorks } from "@/lib/art-data";
import { useAuctionOffers, useOwnedItems } from "@/lib/economy";
import { Button } from "@/components/ui/button";
import { artRank, artRankClasses, type ArtRank } from "@/lib/art-rarity";
import coin from "@/assets/provenance-coin.png";
import { PremiumLock } from "@/components/PremiumLock";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { purchaseAuctionOffer } from "@/lib/economy.functions";
import { LicenseNotice } from "@/components/LicenseNotice";
import { emitCollected } from "@/lib/collection-events";
import { FavoriteButton } from "@/components/FavoriteButton";


export const Route = createFileRoute("/_authenticated/auktionshaus")({
  head: () => ({ meta: [
    { title: "Auktionshaus — Kunst mit Coins sammeln | Provenance" },
    { name: "description", content: "Täglich wechselnde Meisterwerke zu festen Provenance-Coin-Preisen kaufen und der eigenen Galerie hinzufügen." },
    { property: "og:title", content: "Auktionshaus | Provenance" }, { property: "og:description", content: "Wechselnde Kunstwerke für deine interaktive Sammlung." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ]}), component: AuctionPage,
});

function AuctionPage() {
  const { data: offers = [], refetch: refetchOffers } = useAuctionOffers();
  const { data: owned = [] } = useOwnedItems();
  const { hasAccess } = usePremiumAccess();
  const purchase = useServerFn(purchaseAuctionOffer);
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const ownedSlugs = new Set(owned.map((item) => item.item_slug));

  const rankedOffers = [...offers]
    .map((offer) => {
      const work = allWorks.find((w) => w.id === offer.work_slug);
      const rarity = work ? artRank(offer.price) : "Bronze";
      return { ...offer, work, rarity };
    })
    .filter((offer) => offer.work)
    .sort((a, b) => b.price - a.price);

  // Im Salon wird pro Tag genau ein Los je Klasse präsentiert:
  // ein legendäres, ein Platin-, ein Gold-, ein Silber- und ein Bronze-Werk.
  const RANK_ORDER: ArtRank[] = ["Legendär", "Platin", "Gold", "Silber", "Bronze"];
  const displayedOffers = RANK_ORDER
    .map((rank) => rankedOffers.find((offer) => offer.rarity === rank))
    .filter((offer) => offer !== undefined);

  const rankSummary = RANK_ORDER
    .map((rank) => {
      const count = displayedOffers.filter((o) => o.rarity === rank).length;
      return count ? `${count} ${rank}` : null;
    })
    .filter(Boolean)
    .join(" · ");

  void refetchOffers;
  return <main className="min-h-screen bg-background">
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16">
        <div>
          <div className="flex items-center gap-3 text-muted-foreground"><span className="h-px w-10 bg-foreground" /><p className="text-[10px] tracking-[0.28em] uppercase">Provenance · Privatauktion</p></div>
          <h1 className="font-display mt-5 text-4xl font-medium md:text-6xl">Der Salon der Meisterwerke</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Eine täglich wechselnde Auswahl für deine private Galerie. Ikonische Werke sind besonders selten und entsprechend wertvoll.</p>
        </div>
      </div>
    </header>

    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5"><div><p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">{displayedOffers.length} Lose · {rankSummary}</p><h2 className="font-display mt-1 text-2xl font-medium">Tageslose</h2></div><p className="flex items-center gap-2 text-sm text-muted-foreground"><Sparkles className="h-4 w-4" /> Wechsel in 24 Stunden</p></div>
      {!hasAccess && <div className="mt-8"><PremiumLock title="Auktionshaus für Premium-Sammler" description="Alle Tageslose bleiben sichtbar. Premium öffnet den Erwerb und deine private Ausstellung; dein Coin-Guthaben findest du ausschließlich im Galerie-Dashboard." /></div>}
      {message && <p role="status" className="mt-6 text-center text-sm text-muted-foreground">{message}</p>}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">{displayedOffers.map((offer, index) => {
        const { work, rarity } = offer;
        if (!work) return null;
        const isTopTier = rarity === "Platin" || rarity === "Legendär";
        const alreadyOwned = ownedSlugs.has(work.id);
        return <article key={offer.id} className={`flex flex-col gap-4 rounded-[2rem] border border-border bg-card p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_16px_44px_rgba(0,0,0,0.07)] ${isTopTier ? "w-full sm:col-span-2 sm:mx-auto sm:max-w-3xl" : ""}`}>
          <div className="flex items-center justify-between px-1 pt-1">
            <span className="text-[10px] font-medium tracking-[0.15em] text-muted-foreground uppercase">{isTopTier ? "Weltlos des Tages" : `Los ${String(index + 1).padStart(2, "0")}`}</span>
            <span className="flex items-center gap-2">
              <FavoriteButton workSlug={work.id} className="h-8 w-8" />
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium tracking-tight ${artRankClasses(rarity)}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />{rarity}
              </span>
            </span>
          </div>

          <Link to="/werke/$id" params={{ id: work.id }} className={`group relative block overflow-hidden rounded-[1.5rem] bg-muted ${isTopTier ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
            <img src={work.image} alt={`${work.title} von ${work.painter.name}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </Link>

          <div className="flex flex-col gap-1 px-1">
            <h3 className={`font-display leading-none font-normal tracking-tight ${isTopTier ? "text-3xl" : "text-2xl"}`}>{work.title}</h3>
            <p className="text-[13px] font-light text-muted-foreground">{work.painter.name} · {work.year}</p>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-[1.25rem] border border-border/60 bg-muted/40 p-2">
            <div className="flex items-center gap-2.5 pl-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow-sm"><img src={coin} alt="" className="h-5 w-5" /></span>
              <span className="flex flex-col">
                <span className="font-display text-lg leading-none">{offer.price.toLocaleString("de-DE")}</span>
                <span className="text-[9px] font-semibold tracking-wider text-muted-foreground uppercase">Coins</span>
              </span>
            </div>
            <Button type="button" disabled={!hasAccess || busy !== null || alreadyOwned} onClick={async () => { if (alreadyOwned) return; setBusy(offer.id); setMessage(""); try { await purchase({ data: { offerId: offer.id } }); setMessage(`${work.title} wurde deiner Galerie hinzugefügt.`); emitCollected({ kind: "work", slug: work.id }); emitCollected({ kind: "painter", slug: work.painter.slug }); await Promise.all([queryClient.invalidateQueries({ queryKey: ["owned_items"] }), queryClient.invalidateQueries({ queryKey: ["user_stats"] })]); } catch (cause) { setMessage(cause instanceof Error ? cause.message : "Der Ankauf war nicht möglich."); } finally { setBusy(null); } }} className="h-11 rounded-full px-6 text-[12px] font-medium tracking-wide">{alreadyOwned ? <><Check />Gekauft</> : hasAccess ? <Gem /> : <LockKeyhole />}{!alreadyOwned && (busy === offer.id ? "Wird erworben …" : hasAccess ? "Werk erwerben" : "Premium")}</Button>
          </div>
        </article>;
      })}</div>

      <LicenseNotice context="Im Auktionshaus werden nur gemeinfreie Werke gehandelt." />
    </div>
  </main>;

}
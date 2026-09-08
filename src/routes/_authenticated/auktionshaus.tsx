import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Coins } from "lucide-react";
import { allWorks } from "@/lib/art-data";
import { useAuctionOffers, useOwnedItems } from "@/lib/economy";
import { purchaseAuctionOffer } from "@/lib/economy.functions";
import { useInvalidateFarm, useUserStats } from "@/lib/farm";
import coin from "@/assets/provenance-coin.png";

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
  const { data: owned = [], refetch: refetchOwned } = useOwnedItems();
  const { data: stats } = useUserStats();
  const invalidate = useInvalidateFarm();
  const [busy, setBusy] = useState<string | null>(null); const [message, setMessage] = useState("");
  const ownedSlugs = new Set(owned.map((item) => item.item_slug));
  async function buy(id: string) {
    setBusy(id); setMessage("");
    try { await purchaseAuctionOffer({ data: { offerId: id } }); await Promise.all([refetchOwned(), refetchOffers()]); invalidate(); setMessage("Das Werk hängt jetzt in deiner Sammlung."); }
    catch (cause) { setMessage(cause instanceof Error && cause.message.includes("Insufficient") ? "Dir fehlen noch Provenance Coins." : "Dieses Werk konnte nicht gekauft werden."); }
    finally { setBusy(null); }
  }
  return <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 md:py-20">
    <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Täglich wechselnd</p><h1 className="font-display mt-3 text-4xl font-medium md:text-5xl">Auktionshaus</h1><p className="mt-3 max-w-xl text-muted-foreground">Kuratierte Werke, klare Festpreise. Das Angebot wechselt jeden Tag.</p></div><div className="flex items-center gap-3 rounded-full border border-coin/40 bg-coin-soft px-5 py-2.5"><img src={coin} alt="" width={1024} height={1024} className="h-8 w-8" /><span className="font-display text-xl font-medium">{stats?.coins ?? 0}</span><span className="text-sm text-muted-foreground">Coins</span></div></div>
    {message && <p className="mt-7 rounded-lg border border-border bg-muted/50 p-4 text-sm">{message}</p>}
    <div className="mt-10 grid gap-6 sm:grid-cols-2">{offers.map((offer) => { const work = allWorks.find((w) => w.id === offer.work_slug); if (!work) return null; const isOwned = ownedSlugs.has(work.id); return <article key={offer.id} className="overflow-hidden rounded-lg border border-border bg-card"><Link to="/werke/$id" params={{ id: work.id }} className="block aspect-[4/3] overflow-hidden bg-muted"><img src={work.image} alt={`${work.title} von ${work.painter.name}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]" /></Link><div className="p-6"><p className="text-xs text-muted-foreground">{work.painter.name} · {work.year}</p><h2 className="font-display mt-1 text-2xl font-medium">{work.title}</h2><div className="mt-5 flex items-center justify-between gap-4"><span className="flex items-center gap-2 font-medium text-coin"><Coins className="h-4 w-4" />{offer.price}</span><button type="button" disabled={isOwned || busy === offer.id || (stats?.coins ?? 0) < offer.price} onClick={() => buy(offer.id)} className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground disabled:opacity-40">{isOwned ? <span className="flex items-center gap-2"><Check className="h-4 w-4" />Gesammelt</span> : busy === offer.id ? "Kaufe …" : "Festpreis kaufen"}</button></div></div></article>; })}</div>
  </div>;
}
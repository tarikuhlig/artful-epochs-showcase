import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Gem, LockKeyhole, Sparkles } from "lucide-react";
import { allWorks } from "@/lib/art-data";
import { useAuctionOffers, useOwnedItems } from "@/lib/economy";
import { purchaseAuctionOffer } from "@/lib/economy.functions";
import { useInvalidateFarm, useUserStats } from "@/lib/farm";
import { Button } from "@/components/ui/button";
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
  return <main className="min-h-screen bg-background">
    <header className="border-b border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-6 md:grid-cols-[1fr_auto] md:items-end md:py-16">
        <div>
          <div className="flex items-center gap-3 text-muted-foreground"><span className="h-px w-10 bg-foreground" /><p className="text-[10px] tracking-[0.28em] uppercase">Provenance · Privatauktion</p></div>
          <h1 className="font-display mt-5 text-4xl font-medium md:text-6xl">Der Salon der Meisterwerke</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Eine täglich wechselnde Auswahl für deine private Galerie. Ikonische Werke sind besonders selten und entsprechend wertvoll.</p>
        </div>
        <div className="flex min-w-52 items-center gap-4 border-y border-foreground/20 py-4 md:justify-end">
          <img src={coin} alt="Provenance Coin" width={1024} height={1024} className="h-11 w-11" />
          <div><p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Dein Guthaben</p><p className="font-display text-2xl font-medium">{(stats?.coins ?? 0).toLocaleString("de-DE")} <span className="text-sm text-muted-foreground">Coins</span></p></div>
        </div>
      </div>
    </header>

    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5"><div><p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Heutige Auswahl</p><h2 className="font-display mt-1 text-2xl font-medium">Lose des Tages</h2></div><p className="flex items-center gap-2 text-sm text-muted-foreground"><Sparkles className="h-4 w-4" /> Morgen neu kuratiert</p></div>
      {message && <p role="status" className="mt-7 border-y border-border bg-muted/40 px-4 py-3 text-sm">{message}</p>}
      <div className="mt-8 grid gap-8 sm:grid-cols-2">{offers.map((offer, index) => {
        const work = allWorks.find((w) => w.id === offer.work_slug); if (!work) return null;
        const isOwned = ownedSlugs.has(work.id); const canAfford = (stats?.coins ?? 0) >= offer.price;
        const rarity = offer.price >= 1500 ? "Weltikone" : offer.price >= 850 ? "Museumsikone" : "Meisterwerk";
        return <article key={offer.id} className="group border border-border bg-card p-3 shadow-sm sm:p-4">
          <div className="relative bg-muted p-3 sm:p-5">
            <Link to="/werke/$id" params={{ id: work.id }} className="block aspect-[4/3] overflow-hidden bg-background shadow-md">
              <img src={work.image} alt={`${work.title} von ${work.painter.name}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            </Link>
            <span className="absolute left-5 top-5 border border-background/60 bg-background/95 px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase backdrop-blur-sm sm:left-7 sm:top-7">{rarity}</span>
          </div>
          <div className="px-2 pb-2 pt-5 sm:px-3 sm:pt-6">
            <div className="flex items-center justify-between gap-4"><p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Los {String(index + 1).padStart(2, "0")}</p><Gem className="h-4 w-4 text-muted-foreground" /></div>
            <h3 className="font-display mt-2 text-2xl font-medium sm:text-3xl">{work.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{work.painter.name} · {work.year}</p>
            <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="text-[9px] tracking-[0.18em] text-muted-foreground uppercase">Festpreis</p><p className="mt-1 flex items-center gap-2 font-display text-xl font-medium"><img src={coin} alt="" className="h-6 w-6" />{offer.price.toLocaleString("de-DE")}</p></div>
              <Button type="button" disabled={isOwned || busy === offer.id || !canAfford} onClick={() => buy(offer.id)} className="h-11 rounded-full px-6">
                {isOwned ? <><Check /> Gesammelt</> : busy === offer.id ? "Wird erworben …" : canAfford ? "Werk erwerben" : <><LockKeyhole /> Noch {Math.max(0, offer.price - (stats?.coins ?? 0)).toLocaleString("de-DE")} Coins</>}
              </Button>
            </div>
          </div>
        </article>;
      })}</div>
    </div>
  </main>;
}
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { Gem, LockKeyhole, Sparkles } from "lucide-react";
import { allWorks } from "@/lib/art-data";
import { useAuctionOffers } from "@/lib/economy";
import { Button } from "@/components/ui/button";
import { artRank, artRankClasses } from "@/lib/art-rarity";
import coin from "@/assets/provenance-coin.png";
import { PremiumLock } from "@/components/PremiumLock";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { purchaseAuctionOffer } from "@/lib/economy.functions";
import { LicenseNotice } from "@/components/LicenseNotice";

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
  const { hasAccess } = usePremiumAccess();
  const purchase = useServerFn(purchaseAuctionOffer);
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const rankedOffers = [...offers].sort((a, b) => b.price - a.price);
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
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5"><div><p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Heutige Auswahl · 1 Platin · 2 Gold · 2 Bronze</p><h2 className="font-display mt-1 text-2xl font-medium">Fünf Lose des Tages</h2></div><p className="flex items-center gap-2 text-sm text-muted-foreground"><Sparkles className="h-4 w-4" /> Wechsel in 24 Stunden</p></div>
      {!hasAccess && <div className="mt-8"><PremiumLock title="Auktionshaus für Premium-Sammler" description="Alle fünf Tageslose bleiben sichtbar. Premium öffnet den Erwerb und deine private Ausstellung; dein Coin-Guthaben findest du ausschließlich im Galerie-Dashboard." /></div>}
      {message && <p role="status" className="mt-6 text-center text-sm text-muted-foreground">{message}</p>}
      <div className="mt-8 grid gap-8 sm:grid-cols-2">{rankedOffers.map((offer, index) => {
        const work = allWorks.find((w) => w.id === offer.work_slug); if (!work) return null;
        const rarity = artRank(offer.price);
        const isPlatinum = rarity === "Platin";
        return <article key={offer.id} className={`group border bg-card p-3 shadow-sm sm:p-4 ${isPlatinum ? "w-full border-foreground sm:col-span-2 sm:mx-auto sm:max-w-3xl" : "border-border"}`}>
          <div className="relative bg-muted p-3 sm:p-5">
            <Link to="/werke/$id" params={{ id: work.id }} className={`block overflow-hidden bg-background shadow-md ${isPlatinum ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
              <img src={work.image} alt={`${work.title} von ${work.painter.name}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            </Link>
            <span className={`absolute left-5 top-5 border px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase backdrop-blur-sm sm:left-7 sm:top-7 ${artRankClasses(rarity)}`}>{rarity}{rarity === "Platin" ? " · Weltberühmt" : ""}</span>
          </div>
          <div className="px-2 pb-2 pt-5 sm:px-3 sm:pt-6">
            <div className="flex items-center justify-between gap-4"><p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{isPlatinum ? "Das Weltlos des Tages" : `Los ${String(index + 1).padStart(2, "0")}`}</p><Gem className="h-4 w-4 text-muted-foreground" /></div>
            <h3 className={`font-display mt-2 font-medium ${isPlatinum ? "text-3xl sm:text-center sm:text-4xl" : "text-2xl sm:text-3xl"}`}>{work.title}</h3>
            <p className={`mt-1 text-sm text-muted-foreground ${isPlatinum ? "sm:text-center" : ""}`}>{work.painter.name} · {work.year}</p>
            <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="text-[9px] tracking-[0.18em] text-muted-foreground uppercase">Festpreis</p><p className="mt-1 flex items-center gap-2 font-display text-xl font-medium"><img src={coin} alt="" className="h-6 w-6" />{offer.price.toLocaleString("de-DE")}</p></div>
               <Button type="button" disabled={!hasAccess || busy !== null} onClick={async () => { setBusy(offer.id); setMessage(""); try { await purchase({ data: { offerId: offer.id } }); setMessage(`${work.title} wurde deiner Galerie hinzugefügt.`); await Promise.all([queryClient.invalidateQueries({ queryKey: ["owned_items"] }), queryClient.invalidateQueries({ queryKey: ["user_stats"] })]); } catch (cause) { setMessage(cause instanceof Error ? cause.message : "Der Ankauf war nicht möglich."); } finally { setBusy(null); } }} className="h-11 rounded-full px-6">{hasAccess ? <Gem /> : <LockKeyhole />}{busy === offer.id ? "Wird erworben …" : hasAccess ? "Werk erwerben" : "Premium"}</Button>
            </div>
          </div>
        </article>;
      })}</div>
      <LicenseNotice context="Im Auktionshaus werden nur gemeinfreie Werke gehandelt." />
    </div>
  </main>;
}
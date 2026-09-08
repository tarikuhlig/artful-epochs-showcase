import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Crown, Images, Landmark, Route as RouteIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allWorks } from "@/lib/art-data";
import { FREE_SHARE_LABEL, MONTHLY_PRICE, YEARLY_PRICE } from "@/lib/premium-access";
import { useAuth } from "@/hooks/useAuth";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { openPaddleCheckout } from "@/lib/paddle";

export const Route = createFileRoute("/premium")({
  head: () => ({ meta: [
    { title: "Provenance Premium — alle Kunstwelten freischalten" },
    { name: "description", content: "Alle Epochen, Künstler, Werke, Reisen, Museen und deine private Galerie mit Provenance Premium entdecken." },
    { property: "og:title", content: "Provenance Premium" },
    { property: "og:description", content: "Die ganze Kunstgeschichte und alle Sammelfunktionen freischalten." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: PremiumPage,
});

const benefits = [
  [RouteIcon, "Alle 12 Epochenreisen", "240 reich bebilderte Lern- und Quizkarten"],
  [Images, "Die gesamte Kunstsammlung", "Hunderte Künstler und Werke ohne Sperren"],
  [Landmark, "Museen & Meisterwerke", "Besuchswissen, Ausstellungen und Sammlungen"],
  [Sparkles, "Galerie, Coins & Auktionen", "Sammeln, vergleichen und Lieblingswerke ausstellen"],
] as const;

function PremiumPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const access = usePremiumAccess();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const images = [allWorks[9], allWorks[68], allWorks[143], allWorks[301]].filter(Boolean);
  async function subscribe(priceId: string) {
    if (!user) { void navigate({ to: "/auth" }); return; }
    setBusy(priceId); setError("");
    try {
      const checkoutOptions: { priceId: string; userId: string; email?: string } = { priceId, userId: user.id };
      if (user.email) checkoutOptions.email = user.email;
      await openPaddleCheckout(checkoutOptions);
    }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Die Zahlungsseite konnte nicht geöffnet werden."); }
    finally { setBusy(null); }
  }
  return <main className="min-h-screen bg-background">
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-14 text-center sm:px-6 md:py-20">
        <Crown className="mx-auto h-8 w-8" />
        <p className="mt-5 text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Provenance Premium</p>
        <h1 className="font-display mx-auto mt-3 max-w-3xl text-4xl font-medium sm:text-5xl md:text-6xl">Die ganze Kunstwelt in deiner Hand.</h1>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted-foreground">Du kannst alle Inhalte sehen und {FREE_SHARE_LABEL} frei erkunden. Premium öffnet jede Geschichte, Reise, Sammlung und Herausforderung.</p>
        <div className="mx-auto mt-9 grid max-w-3xl grid-cols-4 gap-2 sm:gap-4">{images.map((work, index) => work && <div key={work.id} className={`overflow-hidden rounded-md bg-muted ${index % 2 ? "mt-6" : "mb-6"}`}><img src={work.image} alt={work.title} className="aspect-[3/4] h-full w-full object-cover" /></div>)}</div>
      </div>
    </section>

    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{benefits.map(([Icon, title, text]) => <article key={title} className="border-t border-foreground pt-5"><Icon className="h-5 w-5" /><h2 className="font-display mt-5 text-xl font-medium">{title}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></article>)}</div>

        {access.hasAccess && <div className="mx-auto mt-12 max-w-2xl rounded-lg border border-border bg-path-leaf p-6 text-center"><Check className="mx-auto h-6 w-6" /><h2 className="font-display mt-2 text-2xl font-medium">Premium ist freigeschaltet</h2><p className="mt-2 text-sm text-muted-foreground">{access.isAdmin ? "Adminzugang — alle Premium-Inhalte sind zum Testen geöffnet." : "Dein Abo ist aktiv. Alle Inhalte stehen dir offen."}</p></div>}
       <div className="mx-auto mt-16 grid max-w-4xl gap-5 md:grid-cols-2">
         <Plan name="Monatlich" price={MONTHLY_PRICE} suffix="pro Monat" priceId="provenance_premium_monthly" busy={busy} disabled={access.hasAccess} onSubscribe={subscribe} />
         <Plan name="Jährlich" price={YEARLY_PRICE} suffix="pro Jahr" priceId="provenance_premium_yearly" busy={busy} disabled={access.hasAccess} onSubscribe={subscribe} featured saving="Du sparst 35,89 € im Jahr" />
      </div>
       {error && <p role="alert" className="mt-5 text-center text-sm text-destructive">{error}</p>}
      <div className="mt-8 text-center"><Button asChild variant="ghost" className="rounded-full"><Link to="/">Erst kostenlos entdecken</Link></Button></div>
    </section>
  </main>;
}

function Plan({ name, price, suffix, priceId, busy, disabled, onSubscribe, saving, featured = false }: { name: string; price: string; suffix: string; priceId: string; busy: string | null; disabled: boolean; onSubscribe: (priceId: string) => Promise<void>; saving?: string; featured?: boolean }) {
  return <article className={`relative rounded-lg border p-7 ${featured ? "border-foreground bg-path-leaf" : "border-border bg-card"}`}>
    {featured && <span className="absolute right-5 top-5 rounded-full bg-foreground px-3 py-1 text-[9px] tracking-[0.16em] text-primary-foreground uppercase">Beste Wahl</span>}
    <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">{name}</p>
    <p className="font-display mt-5 text-4xl font-medium">{price}</p><p className="mt-1 text-sm text-muted-foreground">{suffix}</p>
    {saving && <p className="mt-4 flex items-center gap-2 text-sm"><Check className="h-4 w-4" />{saving}</p>}
    <Button disabled={disabled || busy !== null} onClick={() => onSubscribe(priceId)} className="mt-7 w-full rounded-full"><Crown />{disabled ? "Bereits freigeschaltet" : busy === priceId ? "Zahlungsseite wird geladen …" : "Premium wählen"}</Button>
    <p className="mt-3 text-center text-xs text-muted-foreground">Sicher bezahlen · jederzeit kündbar</p>
  </article>;
}
import { Link } from "@tanstack/react-router";
import { Crown, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PremiumBadge() {
  return <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] uppercase backdrop-blur-sm"><LockKeyhole className="h-3 w-3" /> Premium</span>;
}

export function PremiumLock({ title = "Weiterlernen mit Provenance Premium", description = "Schalte die ganze Kunstwelt frei: alle Epochen, Künstler, Werke, Museen, Reisen und deine private Galerie." }: { title?: string; description?: string }) {
  return (
    <section className="relative overflow-hidden rounded-lg border border-border bg-card px-6 py-10 text-center sm:px-10 sm:py-14">
      <Crown className="mx-auto h-7 w-7" />
      <p className="mt-4 text-[10px] tracking-[0.24em] text-muted-foreground uppercase">Provenance Premium</p>
      <h2 className="font-display mx-auto mt-2 max-w-xl text-2xl font-medium sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p>
      <Button asChild className="mt-6 rounded-full px-6"><Link to="/premium">Premium ansehen</Link></Button>
      <p className="mt-3 text-xs text-muted-foreground">Ab 5,00 € pro Monat bei jährlicher Zahlung</p>
    </section>
  );
}
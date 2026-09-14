import { Link } from "@tanstack/react-router";
import { Check, Crown, Lock, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { useAuth } from "@/hooks/useAuth";
import { MONTHLY_PRICE, YEARLY_PRICE, FREE_SHARE_LABEL } from "@/lib/premium-access";

const DISMISS_KEY = "provenance-premium-banner-dismissed";

/** Schlanker Abo-Banner für Free-Nutzer. */
export function PremiumBanner() {
  const { user } = useAuth();
  const { hasAccess, isLoading } = usePremiumAccess();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(sessionStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  if (!user || hasAccess || isLoading || hidden) return null;

  return (
    <div className="border-b border-border bg-path-leaf">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:px-6">
        <Crown className="h-4 w-4 shrink-0" />
        <p className="min-w-0 flex-1 truncate text-xs sm:text-sm">
          Du nutzt Provenance Free — {FREE_SHARE_LABEL}. Premium öffnet alle Epochen, Werke und deine Galerie.
        </p>
        <Button asChild size="sm" className="shrink-0 rounded-full px-4 text-xs">
          <Link to="/premium">Premium freischalten</Link>
        </Button>
        <button
          type="button"
          aria-label="Hinweis ausblenden"
          onClick={() => {
            sessionStorage.setItem(DISMISS_KEY, "1");
            setHidden(true);
          }}
          className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

const MISSING = [
  ["Alle 12 Reise-Epochen", "Free: nur die ersten 2 Epochen spielbar"],
  ["240 Künstler & 1.687 Werke in voller Tiefe", "Free: Vorschauen mit gesperrten Details"],
  ["Auktionshaus & private Galerie", "Free: Ansehen, aber kein Sammeln und Ausstellen"],
  ["Tägliche Coin-Challenge (bis 60 Coins)", "Free: gesperrt"],
  ["Museen, Reisegeschichten & Blickschule", "Free: nur Kurzinfos"],
  ["Sammlerränge Legendär bis Bronze", "Free: keine Ausstellungswand"],
] as const;

/** Große Abo-Werbung: zeigt konkret, was ohne Premium fehlt. */
export function PremiumUpsell({ compact = false }: { compact?: boolean }) {
  const { hasAccess, isLoading } = usePremiumAccess();
  if (hasAccess || isLoading) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Provenance Premium</p>
          <h2 className="font-display mt-3 text-3xl font-medium sm:text-4xl">Das verpasst du gerade.</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Mit Free siehst du {FREE_SHARE_LABEL} der Kunstwelt. Premium schaltet jede Epoche, jedes Werk und alle
            Sammelfunktionen frei — ab {MONTHLY_PRICE} im Monat oder {YEARLY_PRICE} im Jahr.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full px-6">
              <Link to="/premium">
                <Crown /> Premium freischalten
              </Link>
            </Button>
            <Button asChild variant="ghost" className="rounded-full px-5">
              <Link to="/premium">Alle Vorteile ansehen</Link>
            </Button>
          </div>
          {!compact && (
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Jederzeit kündbar · sicher bezahlen
            </p>
          )}
        </div>

        <ul className="space-y-3">
          {MISSING.map(([title, note]) => (
            <li key={title} className="flex items-start gap-3 rounded-xl border border-border px-4 py-3">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Check className="h-3.5 w-3.5" />
                  {title}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">{note}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

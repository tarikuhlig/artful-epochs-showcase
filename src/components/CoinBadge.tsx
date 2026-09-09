import { useUserStats } from "@/lib/farm";
import { useAuth } from "@/hooks/useAuth";
import coin from "@/assets/provenance-coin.png";

/** Kleine Coin-Anzeige für Dashboard und Entdecken-Seite. */
export function CoinBadge({ className = "" }: { className?: string }) {
  const { user } = useAuth();
  const { data: stats } = useUserStats();
  if (!user) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium ${className}`}
    >
      <img src={coin} alt="Provenance Coins" className="h-4 w-4" />
      {(stats?.coins ?? 0).toLocaleString("de-DE")}
    </span>
  );
}

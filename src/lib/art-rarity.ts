export type ArtRank = "Legendär" | "Platin" | "Gold" | "Silber" | "Bronze";

/** Ab diesem Schätzwert gilt ein Werk als legendär — die Krönung jeder Sammlung. */
export const LEGENDARY_THRESHOLD = 10000;

/**
 * Fünf Sammlerränge, abgestimmt auf die tatsächliche Wertverteilung
 * des Katalogs (normale Werke liegen zwischen ~660 und 1490 Coins).
 */
export function artRank(price: number): ArtRank {
  if (price >= LEGENDARY_THRESHOLD) return "Legendär";
  if (price >= 1200) return "Platin";
  if (price >= 1000) return "Gold";
  if (price >= 800) return "Silber";
  return "Bronze";
}

export function artRankClasses(rank: ArtRank) {
  if (rank === "Legendär") return "border-foreground bg-foreground text-background";
  if (rank === "Platin") return "border-foreground/60 bg-foreground/90 text-primary-foreground";
  if (rank === "Gold") return "border-coin/40 bg-coin-soft text-coin";
  if (rank === "Silber") return "border-foreground/25 bg-muted text-foreground";
  return "border-border bg-muted text-muted-foreground";
}

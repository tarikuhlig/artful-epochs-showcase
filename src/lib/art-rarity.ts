export type ArtRank = "Legendär" | "Platin" | "Gold" | "Bronze";

/** Ab diesem Schätzwert gilt ein Werk als legendär — die Krönung jeder Sammlung. */
export const LEGENDARY_THRESHOLD = 10000;

export function artRank(price: number): ArtRank {
  if (price >= LEGENDARY_THRESHOLD) return "Legendär";
  if (price >= 1100) return "Platin";
  if (price >= 620) return "Gold";
  return "Bronze";
}

export function artRankClasses(rank: ArtRank) {
  if (rank === "Legendär") return "border-foreground bg-foreground text-background";
  if (rank === "Platin") return "border-foreground bg-foreground text-primary-foreground";
  if (rank === "Gold") return "border-coin/40 bg-coin-soft text-coin";
  return "border-border bg-muted text-muted-foreground";
}

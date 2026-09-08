export type ArtRank = "Platin" | "Gold" | "Bronze";

export function artRank(price: number): ArtRank {
  if (price >= 1500) return "Platin";
  if (price >= 850) return "Gold";
  return "Bronze";
}

export function artRankClasses(rank: ArtRank) {
  if (rank === "Platin") return "border-foreground bg-foreground text-primary-foreground";
  if (rank === "Gold") return "border-coin/40 bg-coin-soft text-coin";
  return "border-border bg-muted text-muted-foreground";
}
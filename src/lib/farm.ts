import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { allWorks } from "@/lib/art-data";

export const POINTS_PER_DISCOVERY = 5;
export const POINTS_PER_HARVEST = 25;

export type UserStats = {
  points: number;
  coins: number;
  streak: number;
  best_streak: number;
  last_harvest_date: string | null;
};

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

/** Werk des Tages – für alle gleich, wechselt täglich. */
export function workOfTheDay(dateISO = todayISO()) {
  const seed = [...dateISO].reduce((acc, c) => acc * 31 + c.charCodeAt(0), 7);
  return allWorks[Math.abs(seed) % allWorks.length]!;
}

export function levelFor(points: number) {
  const level = Math.floor(Math.sqrt(points / 50)) + 1;
  const current = 50 * (level - 1) ** 2;
  const next = 50 * level ** 2;
  return {
    level,
    current,
    next,
    progress: Math.min(100, Math.round(((points - current) / (next - current)) * 100)),
    toNext: Math.max(0, next - points),
  };
}

export const levelTitles = [
  "Neugierig",
  "Museumsgast",
  "Sammler:in",
  "Kenner:in",
  "Kurator:in",
  "Provenienzforscher:in",
];

export function levelTitle(level: number) {
  return levelTitles[Math.min(level - 1, levelTitles.length - 1)]!;
}

export function useUserStats() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["user_stats", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<UserStats> => {
      const { data, error } = await supabase
        .from("user_stats")
        .select("points, coins, streak, best_streak, last_harvest_date")
        .maybeSingle();
      if (error) throw error;
      return data ?? { points: 0, coins: 120, streak: 0, best_streak: 0, last_harvest_date: null };
    },
  });
}

export function useJourneyProgress() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["journey_progress", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("journey_progress")
        .select("journey_slug, completed_at");
      if (error) throw error;
      return data ?? [];
    },
  });
}

function yesterdayISO() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

/** Tägliche Ernte: Punkte gutschreiben und Serie fortführen. */
export async function harvestToday(userId: string, stats: UserStats) {
  const today = todayISO();
  if (stats.last_harvest_date === today) return stats;
  const streak = stats.last_harvest_date === yesterdayISO() ? stats.streak + 1 : 1;
  const bonus = Math.min(streak, 7) * 5;
  const next = {
    user_id: userId,
    points: stats.points + POINTS_PER_HARVEST + bonus,
    coins: stats.coins,
    streak,
    best_streak: Math.max(stats.best_streak, streak),
    last_harvest_date: today,
  };
  const { error } = await supabase.from("user_stats").upsert(next, { onConflict: "user_id" });
  if (error) throw error;
  return next;
}

export async function completeJourney(userId: string, slug: string, reward: number) {
  const { error } = await supabase
    .from("journey_progress")
    .insert({ user_id: userId, journey_slug: slug });
  if (error) {
    if (error.code === "23505") return false; // schon abgeschlossen
    throw error;
  }
  await addPoints(userId, reward);
  return true;
}

export async function addPoints(userId: string, amount: number) {
  const { data } = await supabase.from("user_stats").select("points").maybeSingle();
  const points = (data?.points ?? 0) + amount;
  const { error } = await supabase
    .from("user_stats")
    .upsert({ user_id: userId, points }, { onConflict: "user_id" });
  if (error) throw error;
  return points;
}

export function useInvalidateFarm() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return () => {
    void queryClient.invalidateQueries({ queryKey: ["user_stats", user?.id] });
    void queryClient.invalidateQueries({ queryKey: ["journey_progress", user?.id] });
  };
}

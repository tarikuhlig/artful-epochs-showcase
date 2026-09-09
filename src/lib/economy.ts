import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function useArtPathProgress() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["art_path_progress", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("art_path_progress").select("station_index, coin_reward, completed_at").order("station_index");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useOwnedItems() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["owned_items", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("owned_items").select("id, item_slug, kind, purchase_price, purchased_at").order("purchased_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useDailyCoinChallenge(date: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["daily_coin_challenges", user?.id, date],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("daily_coin_challenges")
        .select("score, coin_reward, completed_at")
        .eq("challenge_date", date)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function utcRotationSlot() {
  const now = new Date();
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  return Math.floor((Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - start) / 86400000) % 7;
}

export function useAuctionOffers() {
  const slot = utcRotationSlot();
  return useQuery({
    queryKey: ["auction_offers", slot],
    queryFn: async () => {
      const { data, error } = await supabase.from("auction_offers").select("id, work_slug, price, rotation_slot").eq("rotation_slot", slot).order("price");
      if (error) throw error;
      return data ?? [];
    },
  });
}
export function useCardQuizRounds(date: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["card_quiz_rounds", user?.id, date],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("card_quiz_rounds")
        .select("round_index, score, coin_reward")
        .eq("round_date", date)
        .order("round_index");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useDailyLessons(date: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["daily_lessons", user?.id, date],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("daily_lessons")
        .select("kind, score, coin_reward")
        .eq("lesson_date", date);
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useStudyRewards(date: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["study_rewards", user?.id, date],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_rewards")
        .select("cards_rewarded, coins_awarded")
        .eq("reward_date", date)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

/** Gesamtwert aller Auktionslose — Basis für „was fehlt mir noch zur Vollsammlung?“. */
export function useAuctionTotals() {
  return useQuery({
    queryKey: ["auction_totals"],
    queryFn: async () => {
      const { data, error } = await supabase.from("auction_offers").select("work_slug, price");
      if (error) throw error;
      const rows = data ?? [];
      return { count: rows.length, total: rows.reduce((sum, row) => sum + row.price, 0), slugs: rows.map((row) => row.work_slug) };
    },
  });
}

/** Alle bisher gewerteten Studierkarten (über alle Tage). */
export function useStudyTotals() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["study_rewards_total", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("study_rewards").select("cards_rewarded, coins_awarded");
      if (error) throw error;
      const rows = data ?? [];
      return {
        cards: rows.reduce((sum, row) => sum + row.cards_rewarded, 0),
        coins: rows.reduce((sum, row) => sum + row.coins_awarded, 0),
      };
    },
  });
}

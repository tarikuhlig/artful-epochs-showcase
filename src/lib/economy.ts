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
      const { data, error } = await supabase.from("owned_items").select("id, item_slug, purchase_price, purchased_at").order("purchased_at", { ascending: false });
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
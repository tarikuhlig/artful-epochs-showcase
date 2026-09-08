import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type DiscoveryKind = "painter" | "work" | "epoch" | "museum";

export function useDiscoveries() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["discoveries", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("discoveries")
        .select("kind, slug, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useQuizResults() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["quiz_results", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quiz_results")
        .select("id, score, total, created_at")
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data ?? [];
    },
  });
}

/** Merkt sich automatisch, dass der angemeldete Nutzer etwas angesehen hat. */
export function useTrackDiscovery(kind: DiscoveryKind, slug: string, enabled = true) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const userId = user?.id;

  useEffect(() => {
    if (!userId || !enabled) return;
    let cancelled = false;
    void supabase
      .from("discoveries")
      .upsert({ user_id: userId, kind, slug }, { onConflict: "user_id,kind,slug" })
      .then(() => {
        if (!cancelled) {
          void queryClient.invalidateQueries({ queryKey: ["discoveries", userId] });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [userId, kind, slug, enabled, queryClient]);
}

export async function saveQuizResult(userId: string, score: number, total: number) {
  const { error } = await supabase
    .from("quiz_results")
    .insert({ user_id: userId, score, total });
  if (error) throw error;
}

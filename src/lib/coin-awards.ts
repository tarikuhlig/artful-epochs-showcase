import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

/** Bereits ausgezahlte Einmalbelohnungen (Epochen-Checks, Sammler-Meilensteine). */
export function useCoinAwards() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["coin_awards", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("coin_awards").select("kind, award_key, coins");
      if (error) throw error;
      return data ?? [];
    },
  });
}

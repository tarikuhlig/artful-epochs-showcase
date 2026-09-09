import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export type FavoriteRow = { id: string; work_slug: string; created_at: string };

export function useFavorites() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["favorites", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("id, work_slug, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as FavoriteRow[];
    },
  });
}

export function useToggleFavorite() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const key = ["favorites", user?.id];

  return useMutation({
    mutationFn: async ({ workSlug, active }: { workSlug: string; active: boolean }) => {
      if (!user) throw new Error("Melde dich an, um Werke zu merken.");
      if (active) {
        const { error } = await supabase.from("favorites").delete().eq("work_slug", workSlug).eq("user_id", user.id);
        if (error) throw error;
        return { workSlug, active: false };
      }
      const { error } = await supabase.from("favorites").insert({ user_id: user.id, work_slug: workSlug });
      if (error && error.code !== "23505") throw error;
      return { workSlug, active: true };
    },
    onMutate: async ({ workSlug, active }) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<FavoriteRow[]>(key) ?? [];
      const next = active
        ? previous.filter((row) => row.work_slug !== workSlug)
        : [{ id: `optimistic-${workSlug}`, work_slug: workSlug, created_at: new Date().toISOString() }, ...previous];
      queryClient.setQueryData(key, next);
      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) queryClient.setQueryData(key, context.previous);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: key });
    },
  });
}

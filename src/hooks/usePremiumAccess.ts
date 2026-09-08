import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { getPaddleEnvironment } from "@/lib/paddle";

export function usePremiumAccess() {
  const { user, loading: authLoading } = useAuth();
  const query = useQuery({
    queryKey: ["premium-access", user?.id, getPaddleEnvironment()],
    enabled: !!user,
    queryFn: async () => {
      if (!user) return { hasAccess: false, isAdmin: false, subscription: null };
      const [{ data: roles, error: roleError }, { data: subscriptions, error: subscriptionError }] = await Promise.all([
        supabase.from("user_roles").select("role").eq("user_id", user.id),
        supabase.from("subscriptions").select("status, price_id, current_period_end, cancel_at_period_end, environment").eq("user_id", user.id).eq("environment", getPaddleEnvironment()).order("created_at", { ascending: false }).limit(1),
      ]);
      if (roleError) throw roleError;
      if (subscriptionError) throw subscriptionError;
      const isAdmin = roles?.some((item) => item.role === "admin") ?? false;
      const subscription = subscriptions?.[0] ?? null;
      const activeStatus = subscription && ["active", "trialing", "past_due", "canceled"].includes(subscription.status);
      const withinPeriod = !subscription?.current_period_end || new Date(subscription.current_period_end).getTime() > Date.now();
      return { hasAccess: isAdmin || Boolean(activeStatus && withinPeriod), isAdmin, subscription };
    },
  });
  return { ...query, hasAccess: query.data?.hasAccess ?? false, isAdmin: query.data?.isAdmin ?? false, subscription: query.data?.subscription ?? null, isLoading: authLoading || (!!user && query.isLoading) };
}
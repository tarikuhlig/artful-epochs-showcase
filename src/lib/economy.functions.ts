import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const completePathStation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ station: z.number().int().min(0).max(11) }).parse(data))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: result, error } = await supabaseAdmin.rpc("complete_art_path_station_for_user", {
      target_user: context.userId,
      target_station: data.station,
    });
    if (error) throw new Error(error.message);
    return result?.[0] ?? null;
  });

export const purchaseAuctionOffer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ offerId: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: result, error } = await supabaseAdmin.rpc("purchase_auction_offer_for_user", {
      target_user: context.userId,
      target_offer: data.offerId,
    });
    if (error) throw new Error(error.message);
    return result?.[0] ?? null;
  });

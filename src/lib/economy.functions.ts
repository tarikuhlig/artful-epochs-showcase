import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { artPathQuizzes } from "@/lib/art-path-quiz";
import { dailyChallenge } from "@/lib/daily-coin-challenge";

export const completePathStation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ station: z.number().int().min(0).max(11), answer: z.string().trim().min(1).max(120) }).parse(data))
  .handler(async ({ data, context }) => {
    const quiz = artPathQuizzes[data.station];
    if (!quiz || data.answer !== quiz.answer) throw new Error("Die Antwort ist noch nicht richtig.");
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

export const completeDailyCoinChallenge = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), answers: z.array(z.string()).length(3) }).parse(data))
  .handler(async ({ data, context }) => {
    const today = new Date().toISOString().slice(0, 10);
    if (data.date !== today) throw new Error("Diese Challenge ist nicht mehr aktuell.");
    const questions = dailyChallenge(data.date);
    if (questions.length !== 3) throw new Error("Die Challenge konnte nicht geladen werden.");
    const score = questions.reduce((total, question, index) => total + (data.answers[index] === question.answer ? 1 : 0), 0);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: result, error } = await supabaseAdmin.rpc("complete_daily_coin_challenge_for_user", {
      target_user: context.userId,
      target_date: data.date,
      target_score: score,
    });
    if (error) throw new Error(error.message);
    return result?.[0] ?? null;
  });

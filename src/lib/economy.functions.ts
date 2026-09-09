import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { stationFinalQuestion } from "@/lib/art-path-questions";
import { dailyChallenge } from "@/lib/daily-coin-challenge";
import { CARD_QUIZ_CARDS, CARD_QUIZ_ROUNDS_PER_DAY, cardQuizRound } from "@/lib/card-quiz";

async function requirePremium(context: { supabase: any; userId: string }) {
  const token = process.env["VITE_PAYMENTS_CLIENT_TOKEN"] ?? "";
  const environment = token.startsWith("test_") ? "sandbox" : "live";
  const { data, error } = await context.supabase.rpc("has_active_subscription", { user_uuid: context.userId, check_env: environment });
  if (error || !data) throw new Error("Provenance Premium ist für diese Funktion erforderlich.");
}

export const completePathStation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ station: z.number().int().min(0).max(29), answer: z.string().trim().min(1).max(200) }).parse(data))
  .handler(async ({ data, context }) => {
    if (data.station >= 2) await requirePremium(context);
    const quiz = stationFinalQuestion(data.station);
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
    await requirePremium(context);
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
    await requirePremium(context);
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

import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { EventName, verifyWebhook, type PaddleEnv } from "@/lib/paddle.server";
import type { Database } from "@/integrations/supabase/types";

function getDatabase() {
  return createClient<Database>(process.env["SUPABASE_URL"]!, process.env["SUPABASE_SERVICE_ROLE_KEY"]!);
}

async function saveSubscription(data: any, environment: PaddleEnv) {
  const userId = data.customData?.userId;
  const item = data.items?.[0];
  const priceId = item?.price?.importMeta?.externalId;
  const productId = item?.product?.importMeta?.externalId;
  if (!userId || !priceId || !productId) { console.warn("Skipping subscription: missing attribution data"); return; }
  const { error } = await getDatabase().from("subscriptions").upsert({
    user_id: userId, paddle_subscription_id: data.id, paddle_customer_id: data.customerId,
    product_id: productId, price_id: priceId, status: data.status,
    current_period_start: data.currentBillingPeriod?.startsAt ?? null,
    current_period_end: data.currentBillingPeriod?.endsAt ?? null,
    cancel_at_period_end: data.scheduledChange?.action === "cancel", environment,
  }, { onConflict: "paddle_subscription_id" });
  if (error) throw error;
}

async function updateSubscription(data: any, environment: PaddleEnv, canceled = false) {
  const { error } = await getDatabase().from("subscriptions").update({
    status: canceled ? "canceled" : data.status,
    current_period_start: data.currentBillingPeriod?.startsAt ?? null,
    current_period_end: data.currentBillingPeriod?.endsAt ?? null,
    cancel_at_period_end: data.scheduledChange?.action === "cancel",
  }).eq("paddle_subscription_id", data.id).eq("environment", environment);
  if (error) throw error;
}

export const Route = createFileRoute("/api/public/payments/webhook")({ server: { handlers: { POST: async ({ request }) => {
  const environment = (new URL(request.url).searchParams.get("env") === "live" ? "live" : "sandbox") as PaddleEnv;
  try {
    const event = await verifyWebhook(request, environment);
    if (event.eventType === EventName.SubscriptionCreated) await saveSubscription(event.data, environment);
    else if (event.eventType === EventName.SubscriptionUpdated) await updateSubscription(event.data, environment);
    else if (event.eventType === EventName.SubscriptionCanceled) await updateSubscription(event.data, environment, true);
    return Response.json({ received: true });
  } catch (error) { console.error("Payment event error", error); return new Response("Invalid payment event", { status: 400 }); }
} } } });
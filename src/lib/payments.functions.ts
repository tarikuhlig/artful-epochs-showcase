import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { gatewayFetch, type PaddleEnv } from "@/lib/paddle.server";

export const resolvePaddlePrice = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ priceId: z.string().min(1), environment: z.enum(["sandbox", "live"]) }).parse(data))
  .handler(async ({ data }) => {
    const response = await gatewayFetch(data.environment as PaddleEnv, `/prices?external_id=${encodeURIComponent(data.priceId)}`);
    const result = await response.json() as { data?: Array<{ id: string }> };
    const price = result.data?.[0];
    if (!response.ok || !price) throw new Error("Preis konnte nicht geladen werden.");
    return price.id;
  });
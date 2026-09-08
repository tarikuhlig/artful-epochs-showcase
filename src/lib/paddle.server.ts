import { Environment, EventName, Paddle } from "@paddle/paddle-node-sdk";

export { EventName };
export type PaddleEnv = "sandbox" | "live";

const gatewayBaseUrl = "https://connector-gateway.lovable.dev/paddle";

function getEnv(key: string) {
  const value = process.env[key];
  if (!value) throw new Error(`${key} is not configured`);
  return value;
}

function getConnectionApiKey(environment: PaddleEnv) {
  return environment === "sandbox" ? getEnv("PADDLE_SANDBOX_API_KEY") : getEnv("PADDLE_LIVE_API_KEY");
}

export function getPaddleClient(environment: PaddleEnv) {
  const connectionApiKey = getConnectionApiKey(environment);
  return new Paddle(connectionApiKey, {
    environment: gatewayBaseUrl as unknown as Environment,
    customHeaders: {
      "X-Connection-Api-Key": connectionApiKey,
      "Lovable-API-Key": getEnv("LOVABLE_API_KEY"),
    },
  });
}

export async function gatewayFetch(environment: PaddleEnv, path: string, init?: RequestInit) {
  const connectionApiKey = getConnectionApiKey(environment);
  return fetch(`${gatewayBaseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-Connection-Api-Key": connectionApiKey,
      "Lovable-API-Key": getEnv("LOVABLE_API_KEY"),
      ...init?.headers,
    },
  });
}

export async function verifyWebhook(request: Request, environment: PaddleEnv) {
  const signature = request.headers.get("paddle-signature");
  const body = await request.text();
  const secret = environment === "sandbox" ? getEnv("PAYMENTS_SANDBOX_WEBHOOK_SECRET") : getEnv("PAYMENTS_LIVE_WEBHOOK_SECRET");
  if (!signature || !body) throw new Error("Missing signature or body");
  return await getPaddleClient(environment).webhooks.unmarshal(body, secret, signature);
}
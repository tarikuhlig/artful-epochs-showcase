import { resolvePaddlePrice } from "@/lib/payments.functions";

const clientToken = import.meta.env["VITE_PAYMENTS_CLIENT_TOKEN"];

type CheckoutOptions = {
  items: Array<{ priceId: string; quantity: number }>;
  customer?: { email: string };
  customData: Record<string, string>;
  settings: { displayMode: "overlay"; successUrl: string; allowLogout: boolean; variant: "one-page" };
};

declare global {
  interface Window {
    Paddle: {
      Environment: { set: (environment: "sandbox" | "production") => void };
      Initialize: (options: { token: string }) => void;
      Checkout: { open: (options: CheckoutOptions) => void };
    };
  }
}

export function getPaddleEnvironment(): "sandbox" | "live" {
  return clientToken?.startsWith("test_") ? "sandbox" : "live";
}

let initialized = false;
export async function initializePaddle() {
  if (initialized) return;
  if (!clientToken) throw new Error("Zahlungen sind gerade nicht verfügbar.");
  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://cdn.paddle.com/paddle/v2/paddle.js"]');
    const ready = () => {
      window.Paddle.Environment.set(getPaddleEnvironment() === "sandbox" ? "sandbox" : "production");
      window.Paddle.Initialize({ token: clientToken });
      initialized = true;
      resolve();
    };
    if (existing) { if (window.Paddle) ready(); else existing.addEventListener("load", ready, { once: true }); return; }
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.onload = ready;
    script.onerror = () => reject(new Error("Zahlungsseite konnte nicht geladen werden."));
    document.head.appendChild(script);
  });
}

export async function openPaddleCheckout(options: { priceId: string; userId: string; email?: string }) {
  await initializePaddle();
  const priceId = await resolvePaddlePrice({ data: { priceId: options.priceId, environment: getPaddleEnvironment() } });
  const checkout: CheckoutOptions = {
    items: [{ priceId, quantity: 1 }],
    customData: { userId: options.userId },
    settings: { displayMode: "overlay", successUrl: `${window.location.origin}/premium`, allowLogout: false, variant: "one-page" },
  };
  if (options.email) checkout.customer = { email: options.email };
  window.Paddle.Checkout.open(checkout);
}
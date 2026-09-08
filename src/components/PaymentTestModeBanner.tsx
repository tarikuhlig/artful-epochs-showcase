import { getPaddleEnvironment } from "@/lib/paddle";

export function PaymentTestModeBanner() {
  if (getPaddleEnvironment() !== "sandbox") return null;
  return <div className="border-b border-border bg-coin-soft px-4 py-2 text-center text-xs text-muted-foreground">Testbetrieb — es wird kein echtes Geld abgebucht.</div>;
}
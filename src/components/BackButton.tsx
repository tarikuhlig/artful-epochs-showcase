import { ArrowLeft } from "lucide-react";
import { useRouter, useRouterState } from "@tanstack/react-router";

/** Fester Zurück-Pfeil, der beim Scrollen sichtbar bleibt. */
export function BackButton() {
  const router = useRouter();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname === "/") return null;

  return (
    <button
      type="button"
      aria-label="Zurück zur vorherigen Seite"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) router.history.back();
        else void router.navigate({ to: "/" });
      }}
      className="fixed top-[calc(env(safe-area-inset-top)+0.75rem)] left-3 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-accent md:top-[calc(env(safe-area-inset-top)+4.75rem)] md:left-5"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
}

import { createFileRoute, redirect } from "@tanstack/react-router";

/** Alte Adresse: Die Galerie liegt jetzt vollständig unter /sammlung. */
export const Route = createFileRoute("/_authenticated/atelier")({
  beforeLoad: () => {
    throw redirect({ to: "/sammlung", replace: true });
  },
});

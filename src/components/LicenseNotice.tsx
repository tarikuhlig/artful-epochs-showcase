import { Link } from "@tanstack/react-router";

/**
 * Dezenter Fußnoten-Hinweis. Die vollständigen Rechte- und Bildnachweis-Angaben
 * stehen zentral auf /rechte, damit sie nicht auf jeder Seite plakativ erscheinen.
 */
export function LicenseNotice({ context }: { context?: string }) {
  return (
    <p className="mt-10 text-[11px] leading-relaxed text-muted-foreground/80">
      {context ? `${context} ` : ""}Abbildungen: gemeinfreie Werke (Wikimedia Commons).{" "}
      <Link to="/rechte" className="underline underline-offset-2 hover:text-foreground">
        Bildnachweis &amp; Rechte
      </Link>
    </p>
  );
}

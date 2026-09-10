import { cn } from "@/lib/utils";

type ProvenanceLogoProps = {
  className?: string;
  compact?: boolean;
  mark?: boolean;
};

/** Großzügige Lamour-Wortmarke für Intro, Anmeldung und Kopfzeile. */
export function ProvenanceLogo({ className, compact = false, mark = false }: ProvenanceLogoProps) {
  return (
    <span
      aria-label={mark ? "Provenance P" : "Provenance"}
      className={cn(
        "font-logo inline-block origin-center whitespace-nowrap text-foreground",
        mark
          ? "text-[clamp(5rem,21vw,8.5rem)] leading-none"
          : compact
            ? "scale-x-[1.2] text-[2.2rem] leading-none"
            : "scale-x-[1.42] text-[clamp(4rem,17vw,10rem)] leading-[0.85]",
        className,
      )}
    >
      {mark ? "P" : "Provenance"}
    </span>
  );
}
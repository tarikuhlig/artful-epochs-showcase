import { cn } from "@/lib/utils";

type ProvenanceLogoProps = {
  className?: string;
  compact?: boolean;
  mark?: boolean;
};

/** Feine Editorial-Wortmarke, abgeleitet aus klassischer Didone-Typografie. */
export function ProvenanceLogo({ className, compact = false, mark = false }: ProvenanceLogoProps) {
  return (
    <span
      aria-label={mark ? "Provenance P" : "Provenance"}
      className={cn(
        "font-logo inline-block whitespace-nowrap text-foreground",
        mark
          ? "text-[clamp(5rem,21vw,8.5rem)] leading-none"
          : compact
            ? "text-[2rem] leading-none"
            : "text-[clamp(3.25rem,13vw,7.5rem)] leading-[0.72]",
        className,
      )}
    >
      {mark ? "P" : "Provenance"}
    </span>
  );
}
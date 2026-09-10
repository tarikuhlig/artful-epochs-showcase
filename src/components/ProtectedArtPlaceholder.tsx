import { Eye } from "lucide-react";
import { useExternalArt, type ExternalArtTarget } from "@/components/ExternalArtModal";

/**
 * Platzhalter für geschützte Werke ohne eigenes Bild:
 * weicher Farbverlauf statt leerer Fläche, Klick öffnet die Museums-Ansicht.
 */
export function ProtectedArtPlaceholder({
  target,
  label = "Museums-Ansicht verfügbar",
  className = "aspect-[4/3]",
}: {
  target: ExternalArtTarget;
  label?: string;
  className?: string;
}) {
  const { open } = useExternalArt();

  return (
    <button
      type="button"
      onClick={() => open(target)}
      aria-label={`${target.artist}${target.title ? ` — ${target.title}` : ""} beim Museum ansehen`}
      className={`group relative w-full overflow-hidden ${className}`}
    >
      <span className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_10%,hsl(var(--muted))_0%,transparent_60%),linear-gradient(135deg,hsl(var(--pastel-tip)/0.55)_0%,hsl(var(--muted))_45%,hsl(var(--accent))_100%)] blur-[2px] transition-transform duration-700 group-hover:scale-105" />
      <span className="absolute inset-0 bg-background/25" />
      <span className="relative flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
        <Eye className="h-5 w-5 text-muted-foreground" />
        <span className="text-[10px] tracking-[0.22em] text-muted-foreground uppercase">{label}</span>
        {target.title && <span className="max-w-xs text-xs text-muted-foreground">{target.title}</span>}
      </span>
    </button>
  );
}

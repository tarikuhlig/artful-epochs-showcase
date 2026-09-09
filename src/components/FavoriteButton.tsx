import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites, useToggleFavorite } from "@/lib/favorites";
import { cn } from "@/lib/utils";

type Props = {
  workSlug: string;
  /** "icon" = kleines Herz über dem Bild, "inline" = Herz mit Beschriftung. */
  variant?: "icon" | "inline";
  className?: string;
};

/** Herz zum Merken eines Werks — überall im Katalog, in der Reise und im Auktionshaus. */
export function FavoriteButton({ workSlug, variant = "icon", className }: Props) {
  const { user } = useAuth();
  const { data: favorites = [] } = useFavorites();
  const toggle = useToggleFavorite();
  const active = favorites.some((row) => row.work_slug === workSlug);

  const handle = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!user) {
      toast("Melde dich an, um Werke zu merken.");
      return;
    }
    toggle.mutate(
      { workSlug, active },
      {
        onSuccess: (result) => toast(result.active ? "Zu deinen Favoriten gemerkt." : "Aus den Favoriten entfernt."),
        onError: (error) => toast(error instanceof Error ? error.message : "Das hat nicht geklappt."),
      },
    );
  };

  const label = active ? "Aus Favoriten entfernen" : "Werk merken";

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={handle}
        aria-pressed={active}
        className={cn(
          "inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-background px-5 text-[12px] font-medium tracking-wide transition-colors hover:bg-muted",
          active && "border-foreground/30 bg-muted",
          className,
        )}
      >
        <Heart className={cn("h-4 w-4", active && "fill-current")} />
        {active ? "Gemerkt" : "Merken"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handle}
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/85 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-background",
        className,
      )}
    >
      <Heart className={cn("h-[18px] w-[18px]", active && "fill-current")} />
    </button>
  );
}

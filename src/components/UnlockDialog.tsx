import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export type UnlockInfo = {
  /** Name des freigeschalteten Werks oder eine kurze Sammelbezeichnung. */
  title: string;
  /** Zusatzzeile, z. B. Künstler und Jahr. */
  subtitle?: string;
  image?: string;
};

/** Glückwunsch-Fenster, wenn ein Werk in der Sammlung landet. */
export function UnlockDialog({ unlock, onClose }: { unlock: UnlockInfo | null; onClose: () => void }) {
  return (
    <Dialog open={!!unlock} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-md rounded-3xl text-center">
        <DialogHeader className="items-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border">
            <Sparkles className="h-5 w-5" />
          </span>
          <DialogTitle className="font-display mt-3 text-2xl font-medium">Glückwunsch!</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Du hast <span className="text-foreground">{unlock?.title}</span> in deiner Sammlung freigeschaltet.
            {unlock?.subtitle ? ` ${unlock.subtitle}` : ""}
          </DialogDescription>
        </DialogHeader>

        {unlock?.image && (
          <div className="mx-auto mt-1 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
            <img src={unlock.image} alt={unlock.title} className="h-full w-full object-cover" />
          </div>
        )}

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button asChild className="rounded-full px-6"><Link to="/atelier" onClick={onClose}>Zur Galerie</Link></Button>
          <Button type="button" variant="outline" className="rounded-full px-6" onClick={onClose}>Weiter</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

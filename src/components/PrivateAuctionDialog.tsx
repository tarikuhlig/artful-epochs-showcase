import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { Gavel, LockKeyhole } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { purchasePrivateAuction } from "@/lib/economy.functions";
import { PRIVATE_AUCTION_SURCHARGE, privateAuctionPrice, workEstimate } from "@/lib/art-valuation";
import { artRank, artRankClasses } from "@/lib/art-rarity";
import { useUserStats } from "@/lib/farm";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { emitCollected } from "@/lib/collection-events";
import type { Work } from "@/lib/art-data";
import coin from "@/assets/provenance-coin.png";

type Props = {
  work: Work | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchased?: (workId: string) => void;
};

const number = (value: number) => value.toLocaleString("de-DE");

/** Privatauktion: ein gemerktes Werk sofort erwerben — gegen Aufpreis. */
export function PrivateAuctionDialog({ work, open, onOpenChange, onPurchased }: Props) {
  const { data: stats } = useUserStats();
  const { hasAccess } = usePremiumAccess();
  const purchase = useServerFn(purchasePrivateAuction);
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  if (!work) return null;

  const estimate = workEstimate(work.id);
  const price = privateAuctionPrice(work.id);
  const coins = stats?.coins ?? 0;
  const missing = Math.max(0, price - coins);
  const rank = artRank(estimate);

  const handle = async () => {
    setBusy(true);
    setMessage("");
    try {
      await purchase({ data: { workSlug: work.id } });
      emitCollected({ kind: "work", slug: work.id });
      emitCollected({ kind: "painter", slug: work.painter.slug });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["owned_items"] }),
        queryClient.invalidateQueries({ queryKey: ["user_stats"] }),
      ]);
      onPurchased?.(work.id);
      onOpenChange(false);
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "Der Zuschlag war nicht möglich.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg rounded-[2rem] p-0">
        <div className="aspect-[16/10] w-full overflow-hidden rounded-t-[2rem] bg-muted">
          <img src={work.image} alt={`${work.title} von ${work.painter.name}`} className="h-full w-full object-cover" />
        </div>
        <div className="px-6 pb-6">
          <DialogHeader className="space-y-1 text-left">
            <p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Privatauktion</p>
            <DialogTitle className="font-display text-2xl font-normal">{work.title}</DialogTitle>
            <DialogDescription className="text-[13px]">
              {work.painter.name} · {work.year} · {work.museum}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 space-y-2 rounded-[1.25rem] border border-border/60 bg-muted/40 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Schätzwert</span>
              <span className="flex items-center gap-2">
                {number(estimate)}
                <span className={`rounded-full border px-2 py-0.5 text-[10px] ${artRankClasses(rank)}`}>{rank}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Aufpreis Sofortzuschlag</span>
              <span>+ {Math.round(PRIVATE_AUCTION_SURCHARGE * 100)} %</span>
            </div>
            <div className="flex items-center justify-between border-t border-border/60 pt-2">
              <span className="font-medium">Endpreis</span>
              <span className="flex items-center gap-2 font-display text-lg">
                <img src={coin} alt="" className="h-5 w-5" />
                {number(price)}
              </span>
            </div>
            <p className="text-[12px] text-muted-foreground">Dein Guthaben: {number(coins)} Coins</p>
          </div>

          {missing > 0 && hasAccess && (
            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
              Dir fehlen noch <span className="text-foreground">{number(missing)} Coins</span>. Du verdienst sie in der{" "}
              <Link to="/kunstpfad" className="underline underline-offset-4">Reise</Link>, beim{" "}
              <Link to="/studieren" className="underline underline-offset-4">Studieren</Link> und mit den Tageskarten auf{" "}
              <Link to="/" className="underline underline-offset-4">Entdecken</Link>.
            </p>
          )}

          {!hasAccess && (
            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
              Die Privatauktion gehört zu Provenance Premium.{" "}
              <Link to="/premium" className="underline underline-offset-4">Premium ansehen</Link>
            </p>
          )}

          {message && <p role="status" className="mt-4 text-[13px] text-muted-foreground">{message}</p>}

          <Button
            type="button"
            disabled={!hasAccess || busy || missing > 0}
            onClick={handle}
            className="mt-5 h-12 w-full rounded-full text-[12px] font-medium tracking-wide"
          >
            {hasAccess ? <Gavel /> : <LockKeyhole />}
            {busy ? "Zuschlag läuft …" : missing > 0 ? "Noch nicht genug Coins" : `Für ${number(price)} Coins erwerben`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Images, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useOwnedItems } from "@/lib/economy";
import { allWorks } from "@/lib/art-data";
import { Button } from "@/components/ui/button";
import { CoinBadge } from "@/components/CoinBadge";
import { useDiscoveries } from "@/lib/progress";
import { POINTS_PER_DISCOVERY, levelFor, levelTitle, useUserStats } from "@/lib/farm";


export const Route = createFileRoute("/_authenticated/atelier")({
  head: () => ({
    meta: [
      { title: "Galerie — Meine Kunstsammlung | Provenance" },
      {
        name: "description",
        content:
          "Deine private Galerie in Provenance: gesammelte Werke, Lieblingsstücke und Sammlungsübersicht.",
      },
      { property: "og:title", content: "Galerie | Provenance" },
      { property: "og:description", content: "Deine private Kunstsammlung in Provenance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AtelierPage,
});

function AtelierPage() {
  const { user } = useAuth();
  const { data: ownedItems } = useOwnedItems();
  const name = (user?.user_metadata?.["display_name"] as string | undefined) ?? user?.email?.split("@")[0] ?? "Kunstfreund";

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
        Galerie
      </p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight md:text-5xl">
        {name}s Sammlung
      </h1>
      <p className="mt-3 text-muted-foreground">
        {ownedItems?.length ?? 0} Werke gesammelt — ausstellen, vergleichen und neu ordnen.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button asChild className="rounded-full px-6">
          <Link to="/sammlung">
            <Images className="h-4 w-4" />
            Galerie verwalten
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link to="/auktionshaus">
            Zum Auktionshaus
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {ownedItems && ownedItems.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {ownedItems.slice(0, 12).map((item) => {
            const owned = allWorks.find((candidate) => candidate.id === item.item_slug);
            if (!owned) return null;
            return (
              <Link key={item.id} to="/werke/$id" params={{ id: owned.id }} className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                  <img src={owned.image} alt={owned.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <p className="mt-2 truncate text-sm font-medium">{owned.title}</p>
                <p className="truncate text-xs text-muted-foreground">{owned.painter.name}</p>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">Noch keine Werke gesammelt.</p>
          <p className="mt-2 text-sm text-muted-foreground">Erledige Reise-Stationen oder ersteigere dein erstes Bild im Auktionshaus.</p>
          <Button asChild className="mt-5 rounded-full px-6"><Link to="/auktionshaus">Zum Auktionshaus</Link></Button>
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <Link to="/sammlung" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          Vollständige Galerie öffnen <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

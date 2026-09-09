import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/FavoriteButton";
import { PrivateAuctionDialog } from "@/components/PrivateAuctionDialog";
import { useOwnedItems } from "@/lib/economy";
import { findStyle, findWork } from "@/lib/art-data";
import { useTrackDiscovery } from "@/lib/progress";
import { isFreeWork } from "@/lib/premium-access";
import { PremiumLock } from "@/components/PremiumLock";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { MagnifierImage } from "@/components/MagnifierImage";

export const Route = createFileRoute("/werke/$id")({
  loader: ({ params }) => {
    const work = findWork(params.id);
    if (!work) throw notFound();
    return work;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.title} (${loaderData.year}) — ${loaderData.painter.name} | Provenance`,
          },
          { name: "description", content: loaderData.description },
          {
            property: "og:title",
            content: `${loaderData.title} — ${loaderData.painter.name} | Provenance`,
          },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Werk nicht gefunden | Provenance" }, { name: "robots", content: "noindex" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  const work = Route.useLoaderData();
  const { hasAccess } = usePremiumAccess();
  const free = hasAccess || isFreeWork(work.id);
  useTrackDiscovery("work", work.id, { enabled: free });
  const { data: owned = [] } = useOwnedItems();
  const [auctionOpen, setAuctionOpen] = useState(false);
  const isOwned = owned.some((item) => item.item_slug === work.id);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <Link
        to="/maler/$slug"
        params={{ slug: work.painter.slug }}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {work.painter.name}
      </Link>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
        <figure>
          <MagnifierImage
            src={work.image}
            alt={`${work.title} von ${work.painter.name}`}
            frameClassName="border border-border"
          />
        </figure>
        <div className="lg:sticky lg:top-8">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            {work.year} · {work.epoch.name}
          </p>
          <h1 className="font-display mt-2 text-4xl font-medium tracking-tight md:text-5xl">
            {work.title}
          </h1>
          <p className="mt-1 text-base text-muted-foreground">{work.painter.name}</p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <FavoriteButton workSlug={work.id} variant="inline" />
            {isOwned ? (
              <span className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-[12px] text-muted-foreground">
                <Check className="h-4 w-4" /> In deiner Sammlung
              </span>
            ) : (
              <Button type="button" variant="outline" className="h-11 rounded-full px-5 text-[12px] font-medium tracking-wide" onClick={() => setAuctionOpen(true)}>
                <Gavel /> Privatauktion
              </Button>
            )}
          </div>
          <PrivateAuctionDialog work={work} open={auctionOpen} onOpenChange={setAuctionOpen} />

          <dl className="mt-6 divide-y divide-border border-y border-border text-sm">
            <div className="flex justify-between gap-6 py-3">
              <dt className="text-muted-foreground">Entstanden</dt>
              <dd className="text-right font-medium">{work.year}</dd>
            </div>
            <div className="flex justify-between gap-6 py-3">
              <dt className="text-muted-foreground">Technik & Maß</dt>
              <dd className="text-right font-medium">{work.technique}</dd>
            </div>
            <div className="flex justify-between gap-6 py-3">
              <dt className="text-muted-foreground">Heute zu sehen</dt>
              <dd className="text-right font-medium">{work.museum}</dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-wrap gap-2">
            {work.styles.map((s) => {
              const style = findStyle(s);
              return style ? (
                <span
                  key={s}
                  className="rounded-full border border-input px-3 py-1 text-xs text-muted-foreground"
                >
                  {style.name}
                </span>
              ) : null;
            })}
          </div>

          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {work.description}
          </p>

          {free && work.significance ? (
            <>
              <h2 className="font-display mt-8 text-xl font-medium">Warum das Werk zählt</h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {work.significance}
              </p>
            </>
          ) : null}

          {free && work.reception ? (
            <>
              <h2 className="font-display mt-8 text-xl font-medium">Was die Kunstszene sagt</h2>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {work.reception}
              </p>
            </>
          ) : null}

          {!free && <div className="mt-8"><PremiumLock title="Die ganze Bildgeschichte lesen" description="Öffne Bedeutung, Rezeption, kunsthistorische Zusammenhänge und alle zugehörigen Lerninhalte mit Premium." /></div>}

          <Link
            to="/maler/$slug"
            params={{ slug: work.painter.slug }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Mehr von {work.painter.name}
          </Link>
          <p className="mt-6 text-xs text-muted-foreground">
            Abbildung: Wikimedia Commons (gemeinfrei)
          </p>
        </div>
      </div>
    </div>
  );
}

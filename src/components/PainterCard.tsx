import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { findStyle, type allPainters } from "@/lib/art-data";
import { FavoriteButton } from "@/components/FavoriteButton";

type PainterEntry = (typeof allPainters)[number];

export function PainterCard({ painter }: { painter: PainterEntry }) {
  const works = painter.works;
  const cover = works[0]?.image;
  const styleNames = painter.styles
    .map((slug) => findStyle(slug)?.name)
    .filter(Boolean)
    .slice(0, 2) as string[];

  return (
    <Link
      to="/maler/$slug"
      params={{ slug: painter.slug }}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-colors hover:border-pastel-tip/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {cover && (
          <img
            src={cover}
            alt={`Werk von ${painter.name}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
        {works[0] && <FavoriteButton workSlug={works[0].id} className="absolute top-3 right-3 h-9 w-9" />}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] tracking-[0.24em] text-muted-foreground uppercase">{painter.epoch.name}</p>
        <h3 className="font-display mt-2 flex items-center justify-between gap-3 text-xl font-medium">
          {painter.name}
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {painter.life}
          {painter.origin ? ` · ${painter.origin}` : ""}
        </p>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{painter.bio}</p>

        {styleNames.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {styleNames.map((name) => (
              <span key={name} className="rounded-full bg-pastel-tip/25 px-3 py-1 text-[11px] text-foreground">
                {name}
              </span>
            ))}
          </div>
        )}

        {works.length > 0 && (
          <div className="mt-4 border-t border-border pt-4">
            <p className="text-[10px] tracking-[0.24em] text-muted-foreground uppercase">Bekannteste Werke</p>
            <ul className="mt-2 space-y-1 text-sm">
              {works.slice(0, 3).map((work) => (
                <li key={work.id} className="truncate">
                  {work.title} <span className="text-muted-foreground">· {work.year}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Link>
  );
}

import { ExternalLink, Eye } from "lucide-react";
import type { ModernWork } from "@/lib/modern-artists";
import { ProtectedArtPlaceholder } from "@/components/ProtectedArtPlaceholder";
import { useExternalArt } from "@/components/ExternalArtModal";

/** Werkkarte ohne Abbildung: Platzhalter + Beschreibung + Link zum Rechteinhaber. */
export function ProtectedWorkCard({ work, artist }: { work: ModernWork; artist?: string }) {
  const { open } = useExternalArt();
  const target = {
    url: work.museumUrl,
    artist: artist ?? work.museum,
    title: `${work.title} (${work.year})`,
    rightsHolder: work.rightsHolder,
  };

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border">
        <ProtectedArtPlaceholder target={target} />
      </div>


      <div className="p-5">
        <h3 className="font-display text-lg font-medium">{work.title}</h3>
        <p className="text-sm text-muted-foreground">
          {work.year} · {work.technique}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{work.description}</p>

        <div className="mt-4 rounded-lg bg-muted/50 p-4">
          <p className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            <Eye className="h-3.5 w-3.5" /> So sieht es aus
          </p>
          <p className="mt-2 text-sm leading-relaxed">{work.visualDescription}</p>
        </div>

        <a
          href={work.museumUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          Beim Museum ansehen
          <ExternalLink className="h-4 w-4" />
        </a>

        <p className="mt-3 text-xs text-muted-foreground">Rechte: {work.rightsHolder}</p>
      </div>
    </article>
  );
}

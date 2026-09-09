import { ShieldAlert } from "lucide-react";

/** Deutlicher Hinweis: In diesem Bereich sind die Werke nicht gemeinfrei. */
export function RightsNotice({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="inline-flex items-center gap-1.5 rounded-full border border-input px-3 py-1 text-[11px] text-muted-foreground">
        <ShieldAlert className="h-3.5 w-3.5" />
        Nicht gemeinfrei — Abbildung nur beim Museum
      </p>
    );
  }

  return (
    <aside className="flex gap-3 rounded-xl border border-border bg-muted/40 p-5 text-sm">
      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
      <div>
        <p className="font-medium">Diese Kunst ist urheberrechtlich geschützt</p>
        <p className="mt-1 leading-relaxed text-muted-foreground">
          Die Werke in diesem Bereich sind <strong>nicht gemeinfrei</strong>. Provenance zeigt
          deshalb keine Abbildungen, sondern eigene Beschreibungen, Analysen und einen direkten
          Weg zur offiziellen Seite des Museums oder Nachlasses, wo du das Werk rechtmäßig
          ansehen kannst.
        </p>
      </div>
    </aside>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PainterCard } from "@/components/PainterCard";
import { Input } from "@/components/ui/input";
import { allPainters, epochs } from "@/lib/art-data";

export const Route = createFileRoute("/maler/")({
  head: () => ({
    meta: [
      { title: "Alle Maler — Lebensweg, Stil und Werke | Provenance" },
      {
        name: "description",
        content:
          "Entdecke jeden Maler mit Lebensweg, Stilmerkmalen und den bekanntesten Werken — von der Gotik bis zur klassischen Moderne.",
      },
      { property: "og:title", content: "Alle Maler | Provenance" },
      { property: "og:description", content: "Lebensweg, Stil und bekannteste Werke jedes Malers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PainterIndexPage,
});

function PainterIndexPage() {
  const [query, setQuery] = useState("");
  const [epoch, setEpoch] = useState<string>("alle");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPainters.filter((p) => {
      if (epoch !== "alle" && p.epoch.slug !== epoch) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.origin?.toLowerCase().includes(q) ||
        p.epoch.name.toLowerCase().includes(q) ||
        p.works.some((w) => w.title.toLowerCase().includes(q))
      );
    });
  }, [query, epoch]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <p className="text-[10px] tracking-[0.28em] text-muted-foreground uppercase">Alle Maler</p>
      <h1 className="font-display mt-2 text-4xl font-medium md:text-5xl">Lebensweg, Stil und Hauptwerke</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
        {allPainters.length} Künstlerinnen und Künstler aus {epochs.length} Epochen. Tippe auf eine Karte, um Biografie,
        Stilmerkmale und alle Werke zu öffnen.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <div className="relative max-w-md">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Maler, Herkunft oder Werk suchen"
            className="rounded-full pl-9"
            aria-label="Maler suchen"
          />
        </div>

        <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1">
          <FilterChip active={epoch === "alle"} onClick={() => setEpoch("alle")}>
            Alle Epochen
          </FilterChip>
          {epochs.map((e) => (
            <FilterChip key={e.slug} active={epoch === e.slug} onClick={() => setEpoch(e.slug)}>
              {e.name}
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">{filtered.length} Maler</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((painter) => (
          <PainterCard key={painter.slug} painter={painter} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-muted-foreground">Kein Maler gefunden. Versuche einen anderen Suchbegriff.</p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
        active ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

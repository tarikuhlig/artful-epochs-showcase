import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { allWorks, epochData, styles } from "@/lib/art-data";

export const Route = createFileRoute("/katalog")({
  head: () => ({
    meta: [
      { title: "Katalog — nach Stil, Epoche und Maler suchen | Provenance" },
      {
        name: "description",
        content:
          "Durchsuche alle Werke im Provenance-Katalog: nach Stilrichtung wie Pointillismus oder Jugendstil, nach Epoche, Maler oder Titel.",
      },
      { property: "og:title", content: "Katalog — Kunst nach Stil durchsuchen | Provenance" },
      {
        property: "og:description",
        content: "Alle Maler und Meisterwerke, filterbar nach Stilrichtung und Epoche.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: KatalogPage,
});

function KatalogPage() {
  const [query, setQuery] = useState("");
  const [epoch, setEpoch] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allWorks.filter((w) => {
      if (epoch && w.epoch.slug !== epoch) return false;
      if (style && !w.styles.includes(style)) return false;
      if (!q) return true;
      return (
        w.title.toLowerCase().includes(q) ||
        w.painter.name.toLowerCase().includes(q) ||
        w.epoch.name.toLowerCase().includes(q) ||
        w.museum.toLowerCase().includes(q) ||
        w.styles.some((s) => s.replace(/-/g, " ").includes(q))
      );
    });
  }, [query, epoch, style]);

  const styleCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const w of allWorks) for (const s of w.styles) map.set(s, (map.get(s) ?? 0) + 1);
    return map;
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
        Katalog
      </p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight md:text-5xl">
        Nach Stil suchen
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {allWorks.length} Werke von {new Set(allWorks.map((w) => w.painter.slug)).size} Malerinnen
        und Malern – filtere nach Stilrichtung, Epoche oder suche direkt nach einem Titel.
      </p>

      <div className="relative mt-8 max-w-xl">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="z. B. Vermeer, Jugendstil, Prado …"
          className="w-full rounded-full border border-input bg-background py-3 pr-4 pl-11 text-sm outline-none focus:border-foreground/40"
        />
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Chip active={!epoch} onClick={() => setEpoch(null)}>
            Alle Epochen
          </Chip>
          {epochData.map((e) => (
            <Chip
              key={e.slug}
              active={epoch === e.slug}
              onClick={() => setEpoch(epoch === e.slug ? null : e.slug)}
            >
              {e.name}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip active={!style} onClick={() => setStyle(null)}>
            Alle Stile
          </Chip>
          {styles.map((s) => {
            const count = styleCounts.get(s.slug) ?? 0;
            return (
              <Chip
                key={s.slug}
                active={style === s.slug}
                onClick={() => setStyle(style === s.slug ? null : s.slug)}
              >
                {s.name}
                <span className="ml-2 text-[11px] opacity-60">{count}</span>
              </Chip>
            );
          })}
        </div>
      </div>

      {style && (
        <div className="mt-8 rounded-xl border border-border bg-muted/40 p-6">
          <h2 className="font-display text-xl font-medium">
            {styles.find((s) => s.slug === style)?.name}
          </h2>
          <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
            {styles.find((s) => s.slug === style)?.period}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {styles.find((s) => s.slug === style)?.description}
          </p>
          {(style === "abstrakter-expressionismus" || style === "nachkriegsmalerei") && (
            <Link
              to="/reisen/$slug"
              params={{ slug: style === "nachkriegsmalerei" ? "nachkriegsmalerei" : "new-yorker-schule" }}
              className="mt-4 inline-flex rounded-full border border-input px-4 py-2 text-sm transition-colors hover:bg-accent"
            >
              Zur Kunstreise
            </Link>
          )}
        </div>
      )}

      <p className="mt-10 text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "Treffer" : "Treffer"}
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((w) => (
          <Link
            key={w.id}
            to="/werke/$id"
            params={{ id: w.id }}
            className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
          >
            <div className="aspect-4/3 overflow-hidden bg-muted">
              <img
                src={w.image}
                alt={`${w.title} von ${w.painter.name}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-5">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                {w.painter.name} · {w.year}
              </p>
              <h3 className="font-display mt-1 text-lg font-medium">{w.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{w.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {results.length === 0 && (
        <p className="mt-10 text-sm text-muted-foreground">
          Nichts gefunden. Versuch einen anderen Suchbegriff oder setz die Filter zurück.
        </p>
      )}
    </div>
  );
}

function Chip({
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
      onClick={onClick}
      className={
        "rounded-full border px-4 py-1.5 text-sm transition-colors " +
        (active
          ? "border-foreground bg-foreground text-background"
          : "border-input text-muted-foreground hover:bg-accent hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}

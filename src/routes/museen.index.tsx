import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Globe2 } from "lucide-react";
import { museums } from "@/lib/museums";

export const Route = createFileRoute("/museen/")({
  head: () => ({
    meta: [
      { title: "Museen der Welt — Häuser und ihre Meisterwerke | Provenance" },
      {
        name: "description",
        content:
          "Alle Museen im Provenance-Katalog: Louvre, Prado, Rijksmuseum, MoMA und mehr — mit den Werken, die dort hängen.",
      },
      { property: "og:title", content: "Museen der Welt | Provenance" },
      {
        property: "og:description",
        content: "Von Florenz bis New York: Museen bereisen und ihre Meisterwerke entdecken.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MuseenPage,
});

function MuseenPage() {
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = museums.filter(
      (m) =>
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.city.toLowerCase().includes(q) ||
        m.country.toLowerCase().includes(q) ||
        m.works.some((w) => w.title.toLowerCase().includes(q)),
    );
    const map = new Map<string, typeof museums>();
    for (const m of filtered) {
      const list = map.get(m.country) ?? [];
      list.push(m);
      map.set(m.country, list);
    }
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
  }, [query]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Reiseziele</p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight md:text-5xl">
        Museen der Welt
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {museums.length} Häuser in {new Set(museums.map((m) => m.city)).size} Städten. Jedes Haus
        zeigt die Werke, die dort tatsächlich hängen.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Stadt, Haus oder Werk …"
            className="w-full rounded-full border border-input bg-background py-3 pr-4 pl-11 text-sm outline-none focus:border-foreground/40"
          />
        </div>
        <Link
          to="/globus"
          className="inline-flex items-center gap-2 rounded-full border border-input px-5 py-3 text-sm transition-colors hover:bg-accent"
        >
          <Globe2 className="h-4 w-4" />
          Auf dem Globus ansehen
        </Link>
      </div>

      <div className="mt-14 space-y-12">
        {grouped.map(([country, list]) => (
          <section key={country}>
            <h2 className="font-display text-xs tracking-[0.3em] text-muted-foreground uppercase">
              {country}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((m) => (
                <Link
                  key={m.slug}
                  to="/museen/$slug"
                  params={{ slug: m.slug }}
                  className="group rounded-xl border border-border p-5 transition-colors hover:bg-accent"
                >
                  <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                    {m.city}
                  </p>
                  <h3 className="font-display mt-1.5 text-lg font-medium">{m.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{m.note}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {m.works.length} {m.works.length === 1 ? "Werk" : "Werke"}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {grouped.length === 0 && (
        <p className="mt-10 text-sm text-muted-foreground">Kein Haus gefunden.</p>
      )}
    </div>
  );
}

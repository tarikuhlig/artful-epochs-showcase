import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Brush, Image as ImageIcon, Landmark, Layers, Search, X } from "lucide-react";

import { allPainters, allWorks, epochs } from "@/lib/art-data";
import { museums } from "@/lib/museums";

type SearchContextValue = { open: () => void };
const GlobalSearchContext = createContext<SearchContextValue>({ open: () => {} });

/** Öffnet das globale Suchfenster — aus jeder Komponente nutzbar. */
export function useGlobalSearch() {
  return useContext(GlobalSearchContext);
}

type ResultItem =
  | { kind: "painter"; to: "/maler/$slug"; params: { slug: string }; title: string; sub: string }
  | { kind: "work"; to: "/werke/$id"; params: { id: string }; title: string; sub: string; image?: string }
  | { kind: "epoch"; to: "/epochen/$epoche"; params: { epoche: string }; title: string; sub: string }
  | { kind: "museum"; to: "/museen/$slug"; params: { slug: string }; title: string; sub: string };

type Indexed = ResultItem & { haystack: string };

/** Einmal pro Modul vorbereitet, damit die Suche sofort antwortet. */
const INDEX: Indexed[] = [
  ...allPainters.map((p): Indexed => ({
    kind: "painter" as const,
    to: "/maler/$slug",
    params: { slug: p.slug },
    title: p.name,
    sub: `${p.life} · ${p.epoch.name}`,
    haystack: `${p.name} ${p.origin} ${p.epoch.name} ${p.styles.join(" ")}`.toLowerCase(),
  })),
  ...allWorks.map((w): Indexed => ({
    kind: "work" as const,
    to: "/werke/$id",
    params: { id: w.id },
    title: w.title,
    sub: `${w.painter.name} · ${w.year}`,
    image: w.image,
    haystack: `${w.title} ${w.painter.name} ${w.museum} ${w.styles.join(" ")} ${w.year}`.toLowerCase(),
  })),
  ...epochs.map((e): Indexed => ({
    kind: "epoch" as const,
    to: "/epochen/$epoche",
    params: { epoche: e.slug },
    title: e.name,
    sub: e.period,
    haystack: `${e.name} ${e.period}`.toLowerCase(),
  })),
  ...museums.map((m): Indexed => ({
    kind: "museum" as const,
    to: "/museen/$slug",
    params: { slug: m.slug },
    title: m.name,
    sub: `${m.city}, ${m.country}`,
    haystack: `${m.name} ${m.city} ${m.country}`.toLowerCase(),
  })),
];

const GROUPS: { kind: ResultItem["kind"]; label: string }[] = [
  { kind: "painter", label: "Künstler" },
  { kind: "work", label: "Werke" },
  { kind: "epoch", label: "Epochen" },
  { kind: "museum", label: "Museen" },
];

const KIND_ICON = { painter: Brush, work: ImageIcon, epoch: Layers, museum: Landmark } as const;

function search(query: string): ResultItem[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/);
  const scored: { item: Indexed; score: number }[] = [];
  for (const item of INDEX) {
    if (!terms.every((term) => item.haystack.includes(term))) continue;
    const title = item.title.toLowerCase();
    const score = title.startsWith(q) ? 0 : title.includes(q) ? 1 : 2;
    scored.push({ item, score });
  }
  scored.sort((a, b) => a.score - b.score);
  return scored.map((entry) => entry.item);
}

export function GlobalSearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(() => ({ open: () => setIsOpen(true) }), []);
  return (
    <GlobalSearchContext.Provider value={value}>
      {children}
      <GlobalSearchDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </GlobalSearchContext.Provider>
  );
}

function GlobalSearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const results = useMemo(() => search(query), [query]);
  const first = results[0];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Suche">
      <div className="absolute inset-0 bg-foreground/25 backdrop-blur-[2px]" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 top-[calc(env(safe-area-inset-top))] flex flex-col bg-background sm:inset-x-auto sm:top-[12vh] sm:bottom-auto sm:left-1/2 sm:w-full sm:max-w-xl sm:-translate-x-1/2 sm:rounded-2xl sm:border sm:border-border sm:shadow-2xl">
        <form
          className="flex items-center gap-3 border-b border-border px-4 py-3"
          onSubmit={(event) => {
            event.preventDefault();
            firstLinkRef.current?.click();
          }}
        >
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Künstler, Werk, Epoche oder Museum suchen"
            aria-label="Suche"
            className="h-10 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            aria-label="Suche schließen"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-input text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </form>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-3 sm:max-h-[60vh]">
          {query.trim().length < 2 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              Tippe mindestens zwei Buchstaben — z. B. „Rembrandt“, „Sternennacht“ oder „Impressionismus“.
            </p>
          ) : results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              Nichts gefunden. Versuche einen anderen Begriff.
            </p>
          ) : (
            GROUPS.map((group) => {
              const items = results.filter((item) => item.kind === group.kind).slice(0, 5);
              if (items.length === 0) return null;
              return (
                <div key={group.kind} className="mb-2">
                  <p className="px-3 pt-2 pb-1 text-[10px] font-medium tracking-[0.22em] text-muted-foreground uppercase">
                    {group.label}
                  </p>
                  {items.map((item) => (
                    <SearchResultLink
                      key={`${item.kind}-${item.title}`}
                      item={item}
                      onClose={onClose}
                      linkRef={first === item ? firstLinkRef : undefined}
                    />
                  ))}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

const LINK_CLASS = "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-accent";

function SearchResultBody({ item }: { item: ResultItem }) {
  const Icon = KIND_ICON[item.kind];
  return (
    <>
      {item.kind === "work" && item.image ? (
        <img src={item.image} alt="" loading="lazy" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
      ) : (
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="h-4 w-4" />
        </span>
      )}
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-foreground">{item.title}</span>
        <span className="block truncate text-xs text-muted-foreground">{item.sub}</span>
      </span>
    </>
  );
}

function SearchResultLink({
  item,
  onClose,
  linkRef,
}: {
  item: ResultItem;
  onClose: () => void;
  linkRef?: React.Ref<HTMLAnchorElement> | undefined;
}) {
  switch (item.kind) {
    case "painter":
      return (
        <Link ref={linkRef} to="/maler/$slug" params={item.params} onClick={onClose} className={LINK_CLASS}>
          <SearchResultBody item={item} />
        </Link>
      );
    case "work":
      return (
        <Link ref={linkRef} to="/werke/$id" params={item.params} onClick={onClose} className={LINK_CLASS}>
          <SearchResultBody item={item} />
        </Link>
      );
    case "epoch":
      return (
        <Link ref={linkRef} to="/epochen/$epoche" params={item.params} onClick={onClose} className={LINK_CLASS}>
          <SearchResultBody item={item} />
        </Link>
      );
    case "museum":
      return (
        <Link ref={linkRef} to="/museen/$slug" params={item.params} onClick={onClose} className={LINK_CLASS}>
          <SearchResultBody item={item} />
        </Link>
      );
  }
}

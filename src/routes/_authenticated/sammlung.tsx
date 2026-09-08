import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Coins, GripVertical, Lock, Scale, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useDiscoveries } from "@/lib/progress";
import { epochs, allPainters, allWorks } from "@/lib/art-data";
import { useOwnedItems } from "@/lib/economy";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/sammlung")({
  head: () => ({
    meta: [
      { title: "Meine Sammlung — entdeckte Maler & Epochen | Provenance" },
      {
        name: "description",
        content:
          "Dein persönlicher Katalog mit entdeckten und im Auktionshaus erworbenen Werken.",
      },
      { property: "og:title", content: "Meine Sammlung | Provenance" },
      {
        property: "og:description",
        content: "Dein Katalog entdeckter Maler, Epochen und Werke.",
      },
      { property: "og:type", content: "profile" },
    ],
  }),
  component: CollectionPage,
});

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border p-5">
      <p className="font-display text-3xl font-medium tracking-tight">{value}</p>
      <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">{label}</p>
    </div>
  );
}

function CollectionPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: discoveries = [] } = useDiscoveries();
  const { data: owned = [] } = useOwnedItems();
  const [galleryOrder, setGalleryOrder] = useState<string[]>([]);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    const available = owned.map((item) => item.id);
    let saved: string[] = [];
    try { saved = JSON.parse(localStorage.getItem("provenance-gallery-order") ?? "[]") as string[]; } catch { saved = []; }
    setGalleryOrder([...saved.filter((id) => available.includes(id)), ...available.filter((id) => !saved.includes(id))]);
  }, [owned]);

  const orderedOwned = useMemo(() => {
    const positions = new Map(galleryOrder.map((id, index) => [id, index]));
    return [...owned].sort((a, b) => (positions.get(a.id) ?? owned.length) - (positions.get(b.id) ?? owned.length));
  }, [galleryOrder, owned]);

  function moveArtwork(targetId: string) {
    if (!draggedId || draggedId === targetId) return;
    const nextOrder = [...galleryOrder];
    const from = nextOrder.indexOf(draggedId);
    const to = nextOrder.indexOf(targetId);
    if (from < 0 || to < 0) return;
    nextOrder.splice(from, 1);
    nextOrder.splice(to, 0, draggedId);
    setGalleryOrder(nextOrder);
    localStorage.setItem("provenance-gallery-order", JSON.stringify(nextOrder));
    setDraggedId(null);
  }

  function toggleCompare(id: string) {
    setCompareIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current.slice(-1), id]);
  }

  const profile = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const sets = useMemo(() => {
    const make = (kind: string) =>
      new Set(discoveries.filter((d) => d.kind === kind).map((d) => d.slug));
    return { painter: make("painter"), work: make("work"), epoch: make("epoch") };
  }, [discoveries]);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    void navigate({ to: "/auth", replace: true });
  }

  const name = profile.data?.display_name ?? user?.email?.split("@")[0] ?? "";

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm tracking-widest text-muted-foreground uppercase">Meine Sammlung</p>
          <h1 className="font-display mt-2 text-4xl font-medium tracking-tight md:text-5xl">
            {name ? `Hallo, ${name}` : "Dein Katalog"}
          </h1>
        </div>
        <button
          onClick={handleSignOut}
          className="rounded-md border border-input px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
        >
          Abmelden
        </button>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Epochen" value={`${sets.epoch.size}/${epochs.length}`} />
        <Stat label="Maler" value={`${sets.painter.size}/${allPainters.length}`} />
        <Stat label="Werke" value={`${sets.work.size}/${allWorks.length}`} />
        <Stat label="Ankäufe" value={`${owned.length}`} />
      </div>

      <section className="mt-16 border-y border-border py-12">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Deine Ankäufe</p><h2 className="font-display mt-2 text-3xl font-medium">Private Galerie</h2></div><Link to="/auktionshaus" className="rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">Zum Auktionshaus</Link></div>
        {owned.length === 0 ? <div className="mt-7 rounded-lg bg-coin-soft p-7"><Coins className="h-6 w-6 text-coin" /><p className="mt-3 font-display text-xl">Noch ist die Wand frei.</p><p className="mt-1 text-sm text-muted-foreground">Verdiene Coins auf deiner Reise und ersteigere dein erstes Werk zum Festpreis.</p></div> : <>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground"><p>Ziehe die Bilder an ihren Griffen auf deinen Wunschplatz.</p><p>{compareIds.length}/2 für den Vergleich gewählt</p></div>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">{orderedOwned.map((item) => { const work = allWorks.find((candidate) => candidate.id === item.item_slug); if (!work) return null; const selected = compareIds.includes(item.id); return <article key={item.id} draggable onDragStart={() => setDraggedId(item.id)} onDragEnd={() => setDraggedId(null)} onDragOver={(event) => event.preventDefault()} onDrop={() => moveArtwork(item.id)} className={`group relative cursor-grab rounded-md border p-2 transition-colors active:cursor-grabbing ${selected ? "border-coin bg-coin-soft" : "border-transparent"}`}>
            <div className="absolute top-4 left-4 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-background/90 shadow-sm" aria-label="Bild verschieben"><GripVertical className="h-4 w-4" /></div>
            <button type="button" onClick={() => toggleCompare(item.id)} className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-background/90 shadow-sm" aria-label={selected ? "Aus Vergleich entfernen" : "Für Vergleich auswählen"}>{selected ? <Check className="h-4 w-4 text-coin" /> : <Scale className="h-4 w-4" />}</button>
            <Link to="/werke/$id" params={{ id: work.id }}><div className="aspect-[4/3] overflow-hidden rounded-md border-[6px] border-coin/50 bg-muted shadow-md"><img src={work.image} alt={work.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div><p className="mt-3 font-medium">{work.title}</p><p className="text-xs text-muted-foreground">{work.painter.name} · {item.purchase_price} Coins</p></Link>
          </article>; })}</div>
          {compareIds.length === 2 && <section className="mt-10 border-t border-border pt-8"><div className="flex items-center justify-between gap-3"><div><p className="text-xs tracking-widest text-muted-foreground uppercase">Direkter Vergleich</p><h3 className="font-display mt-1 text-2xl font-medium">Zwei Werke, ein Blick</h3></div><Button variant="ghost" size="icon" onClick={() => setCompareIds([])} aria-label="Vergleich schließen"><X /></Button></div><div className="mt-5 grid grid-cols-2 gap-4 md:gap-8">{compareIds.map((id) => { const item = owned.find((entry) => entry.id === id); const work = item ? allWorks.find((candidate) => candidate.id === item.item_slug) : undefined; if (!work) return null; return <div key={id} className="min-w-0"><div className="aspect-[4/3] overflow-hidden rounded-md bg-muted"><img src={work.image} alt={work.title} className="h-full w-full object-contain" /></div><h4 className="mt-3 font-display text-lg font-medium">{work.title}</h4><p className="text-sm text-muted-foreground">{work.painter.name} · {work.year}</p><dl className="mt-4 space-y-2 text-sm"><div><dt className="text-xs text-muted-foreground">Technik</dt><dd>{work.technique}</dd></div><div><dt className="text-xs text-muted-foreground">Stil</dt><dd>{work.styles.join(" · ")}</dd></div><div><dt className="text-xs text-muted-foreground">Museum</dt><dd>{work.museum || "Privatsammlung / unbekannt"}</dd></div></dl></div>; })}</div></section>}
        </>}
      </section>

      <h2 className="font-display mt-16 mb-4 text-2xl font-medium">Epochen</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {epochs.map((e) => {
          const found = sets.epoch.has(e.slug);
          return (
            <Link
              key={e.slug}
              to="/epochen/$epoche"
              params={{ epoche: e.slug }}
              className={`rounded-md border p-4 transition-colors ${found ? "border-border bg-accent/40" : "border-dashed border-border text-muted-foreground hover:bg-accent/30"}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{e.name}</span>
                {found ? <Check className="h-4 w-4" /> : <Lock className="h-4 w-4 opacity-50" />}
              </div>
              <p className="mt-1 text-xs">{e.period}</p>
            </Link>
          );
        })}
      </div>

      <h2 className="font-display mt-14 mb-4 text-2xl font-medium">Maler</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allPainters.map((p) => {
          const found = sets.painter.has(p.slug);
          return (
            <Link
              key={p.slug}
              to="/maler/$slug"
              params={{ slug: p.slug }}
              className={`rounded-md border p-4 transition-colors ${found ? "border-border bg-accent/40" : "border-dashed border-border text-muted-foreground hover:bg-accent/30"}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{p.name}</span>
                {found ? <Check className="h-4 w-4" /> : <Lock className="h-4 w-4 opacity-50" />}
              </div>
              <p className="mt-1 text-xs">
                {p.life} · {p.epoch.name}
              </p>
            </Link>
          );
        })}
      </div>

      <h2 className="font-display mt-14 mb-4 text-2xl font-medium">Werke</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {allWorks.map((w) => {
          const found = sets.work.has(w.id);
          return (
            <Link key={w.id} to="/werke/$id" params={{ id: w.id }} className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-md border border-border bg-muted">
                <img
                  src={w.image}
                  alt={`${w.title} von ${w.painter.name}`}
                  loading="lazy"
                  className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${found ? "" : "opacity-30 grayscale"}`}
                />
              </div>
              <p className="mt-2 text-sm font-medium">{found ? w.title : "Noch nicht entdeckt"}</p>
              <p className="text-xs text-muted-foreground">{found ? w.painter.name : w.year}</p>
            </Link>
          );
        })}
      </div>

    </div>
  );
}

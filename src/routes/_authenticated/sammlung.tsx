import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Coins, GripVertical, ImagePlus, Lock, Scale, Settings, Star, UserRound, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useDiscoveries } from "@/lib/progress";
import { epochs, allPainters, allWorks } from "@/lib/art-data";
import { CollectionQuiz } from "@/components/CollectionQuiz";
import { useOwnedItems } from "@/lib/economy";
import { Button } from "@/components/ui/button";
import { CoinBadge } from "@/components/CoinBadge";
import { POINTS_PER_DISCOVERY, levelFor, levelTitle, useUserStats } from "@/lib/farm";
import { artRank, artRankClasses } from "@/lib/art-rarity";
import { PremiumLock } from "@/components/PremiumLock";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { LicenseNotice } from "@/components/LicenseNotice";
import { OwnPhotos } from "@/components/OwnPhotos";


export const Route = createFileRoute("/_authenticated/sammlung")({
  head: () => ({
    meta: [
      { title: "Meine Galerie — Kunstsammlung & Profil | Provenance" },
      {
        name: "description",
        content:
          "Deine persönliche Galerie mit ausgestellten Lieblingswerken, Profil und Kunstsammlung.",
      },
      { property: "og:title", content: "Meine Galerie | Provenance" },
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
  const access = usePremiumAccess();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: discoveries = [] } = useDiscoveries();
  const { data: owned = [] } = useOwnedItems();
  const { data: stats } = useUserStats();
  const totalPoints = (stats?.points ?? 0) + (discoveries.length ?? 0) * POINTS_PER_DISCOVERY;
  const level = levelFor(totalPoints);
  const [galleryOrder, setGalleryOrder] = useState<string[]>([]);

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileBusy, setProfileBusy] = useState(false);

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
        .select("display_name, username, avatar_url, featured_work_ids")
        .eq("id", user?.id ?? "")
        .maybeSingle();
      if (error) throw error;
      if (!data?.avatar_url) return { ...data, signedAvatarUrl: null };
      const { data: signed } = await supabase.storage.from("profile-images").createSignedUrl(data.avatar_url, 3600);
      return { ...data, signedAvatarUrl: signed?.signedUrl ?? null };
    },
  });

  useEffect(() => {
    setUsername(profile.data?.username ?? "");
    setAvatarUrl(profile.data?.signedAvatarUrl ?? null);
  }, [profile.data]);

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
  const featuredIds = profile.data?.featured_work_ids ?? [];
  const featuredWorks = featuredIds.flatMap((id) => {
    const item = owned.find((entry) => entry.item_slug === id);
    const work = allWorks.find((entry) => entry.id === id);
    return item && work ? [{ item, work }] : [];
  });

  async function saveProfile() {
    if (!user) return;
    const normalized = username.trim();
    if (!/^[a-zA-Z0-9_.-]{3,24}$/.test(normalized)) {
      setProfileMessage("Der Benutzername braucht 3–24 Zeichen: Buchstaben, Zahlen, Punkt, Strich oder Unterstrich.");
      return;
    }
    setProfileBusy(true); setProfileMessage("");
    const { error } = await supabase.from("profiles").update({ username: normalized }).eq("id", user.id);
    setProfileBusy(false);
    if (error) setProfileMessage(error.code === "23505" ? "Dieser Benutzername ist schon vergeben." : "Das Profil konnte nicht gespeichert werden.");
    else { setProfileMessage("Profil gespeichert."); void profile.refetch(); }
  }

  async function uploadAvatar(file: File | undefined) {
    if (!user || !file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) { setProfileMessage("Bitte wähle ein Bild mit höchstens 5 MB."); return; }
    setProfileBusy(true); setProfileMessage("");
    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${user.id}/avatar.${extension}`;
    const { error: uploadError } = await supabase.storage.from("profile-images").upload(path, file, { upsert: true, contentType: file.type });
    if (!uploadError) await supabase.from("profiles").update({ avatar_url: path }).eq("id", user.id);
    setProfileBusy(false);
    if (uploadError) setProfileMessage("Das Profilbild konnte nicht hochgeladen werden.");
    else { setProfileMessage("Profilbild gespeichert."); void profile.refetch(); }
  }

  async function toggleFeatured(workId: string) {
    if (!user) return;
    const next = featuredIds.includes(workId) ? featuredIds.filter((id) => id !== workId) : [...featuredIds.slice(-2), workId];
    const { error } = await supabase.from("profiles").update({ featured_work_ids: next }).eq("id", user.id);
    if (error) setProfileMessage("Die Ausstellung konnte nicht geändert werden.");
    else void profile.refetch();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm tracking-widest text-muted-foreground uppercase">Meine Galerie</p>
          <h1 className="font-display mt-2 text-4xl font-medium tracking-tight md:text-5xl">
            {name ? `Hallo, ${name}` : "Dein Katalog"}
          </h1>
        </div>
        <Button
          variant="outline"
          onClick={handleSignOut}
          className="rounded-full"
        >
          Abmelden
        </Button>
      </div>

      <section className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.24em] text-muted-foreground uppercase">Dein Fortschritt</p>
            <p className="font-display mt-1 text-xl font-medium">Level {level.level} · {levelTitle(level.level)}</p>
          </div>
          <div className="flex items-center gap-2">
            <CoinBadge />
            <Link
              to="/einstellungen"
              aria-label="Einstellungen"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-input transition-colors hover:bg-accent"
            >
              <Settings className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${level.progress}%` }} />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <span>{totalPoints} Punkte</span>
          <span>Serie: {stats?.streak ?? 0} Tage</span>
          <span>{owned.length} Werke</span>
          <Link to="/profil" className="text-foreground hover:underline">Ganzes Profil</Link>
        </div>
      </section>

      <section className="mt-10 grid gap-6 border-y border-border py-8 md:grid-cols-[auto_1fr_auto] md:items-center">
        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
          {avatarUrl ? <img src={avatarUrl} alt={`Profilbild von ${username || name}`} className="h-full w-full object-cover" /> : <UserRound className="h-9 w-9 text-muted-foreground" />}
          <label className="absolute inset-x-0 bottom-0 flex cursor-pointer items-center justify-center bg-foreground/75 py-1.5 text-primary-foreground" title="Profilbild ändern"><ImagePlus className="h-4 w-4" /><input type="file" accept="image/*" className="sr-only" disabled={profileBusy} onChange={(event) => uploadAvatar(event.target.files?.[0])} /></label>
        </div>
        <div><p className="text-[10px] tracking-[0.22em] text-muted-foreground uppercase">Dein Sammlerprofil</p><h2 className="font-display mt-1 text-2xl font-medium">{username ? `@${username}` : "Wähle deinen Benutzernamen"}</h2><p className="mt-1 text-sm text-muted-foreground">Profilbild und Name machen deine Galerie unverwechselbar.</p><span className="mt-3 inline-flex rounded-full border border-border px-3 py-1 text-xs">{access.isAdmin ? "Admin · Premium-Testzugang" : access.hasAccess ? `Premium · ${access.subscription?.price_id?.endsWith("yearly") ? "Jahresabo" : "Monatsabo"}` : "Free"}</span></div>
        <div className="w-full md:w-72"><label htmlFor="username" className="text-xs text-muted-foreground">Benutzername</label><div className="mt-1 flex gap-2"><input id="username" value={username} onChange={(event) => setUsername(event.target.value)} maxLength={24} placeholder="kunstfreund" className="min-w-0 flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-ring" /><Button onClick={saveProfile} disabled={profileBusy} className="rounded-full">Speichern</Button></div>{profileMessage && <p role="status" className="mt-2 text-xs text-muted-foreground">{profileMessage}</p>}</div>
      </section>

      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Epochen" value={`${sets.epoch.size}/${epochs.length}`} />
        <Stat label="Maler" value={`${sets.painter.size}/${allPainters.length}`} />
        <Stat label="Werke" value={`${sets.work.size}/${allWorks.length}`} />
        <Stat label="Ankäufe" value={`${owned.length}`} />
      </div>

      {!access.hasAccess && <div className="mt-14"><PremiumLock title="Deine private Galerie freischalten" description="Mit Premium kannst du ersteigerte Werke ausstellen, frei anordnen und direkt vergleichen. Profil und bisheriger Fortschritt bleiben erhalten." /></div>}

      <div className={access.hasAccess ? "" : "pointer-events-none select-none opacity-40"} aria-hidden={access.hasAccess ? undefined : "true"}><section className="mt-16">
        <div><p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Deine Ausstellung</p><h2 className="font-display mt-2 text-3xl font-medium">Lieblingswerke an der Wand</h2><p className="mt-2 text-sm text-muted-foreground">Stelle bis zu drei Ankäufe prominent aus.</p></div>
        {featuredWorks.length ? <div className="mt-7 grid gap-5 sm:grid-cols-3">{featuredWorks.map(({ item, work }) => { const rank = artRank(item.purchase_price); return <Link key={item.id} to="/werke/$id" params={{ id: work.id }} className="group"><div className="bg-muted p-3 shadow-sm"><div className="aspect-[4/3] overflow-hidden bg-background"><img src={work.image} alt={work.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" /></div></div><span className={`mt-3 inline-flex border px-2 py-1 text-[9px] tracking-[0.18em] uppercase ${artRankClasses(rank)}`}>{rank}</span><h3 className="font-display mt-2 text-xl font-medium">{work.title}</h3><p className="text-sm text-muted-foreground">{work.painter.name}</p></Link>; })}</div> : <div className="mt-7 border border-dashed border-border p-8 text-center text-sm text-muted-foreground">Wähle unten bei einem gekauften Werk den Stern, um es hier auszustellen.</div>}
      </section>

      <section className="mt-16 border-y border-border py-12">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Deine Ankäufe</p><h2 className="font-display mt-2 text-3xl font-medium">Galeriedepot</h2></div><Button asChild className="rounded-full"><Link to="/auktionshaus">Zum Auktionshaus</Link></Button></div>
        {owned.length === 0 ? <div className="mt-7 rounded-lg bg-coin-soft p-7"><Coins className="h-6 w-6 text-coin" /><p className="mt-3 font-display text-xl">Noch ist die Wand frei.</p><p className="mt-1 text-sm text-muted-foreground">Verdiene Coins auf deiner Reise und ersteigere dein erstes Werk zum Festpreis.</p></div> : <>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground"><p>Ziehe die Bilder an ihren Griffen auf deinen Wunschplatz.</p><p>{compareIds.length}/2 für den Vergleich gewählt</p></div>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">{orderedOwned.map((item) => { const work = allWorks.find((candidate) => candidate.id === item.item_slug); if (!work) return null; const selected = compareIds.includes(item.id); const featured = featuredIds.includes(work.id); const rank = artRank(item.purchase_price); return <article key={item.id} draggable onDragStart={() => setDraggedId(item.id)} onDragEnd={() => setDraggedId(null)} onDragOver={(event) => event.preventDefault()} onDrop={() => moveArtwork(item.id)} className={`group relative cursor-grab rounded-md border p-2 transition-colors active:cursor-grabbing ${selected ? "border-coin bg-coin-soft" : "border-transparent"}`}>
            <div className="absolute top-4 left-4 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-background/90 shadow-sm" aria-label="Bild verschieben"><GripVertical className="h-4 w-4" /></div>
            <button type="button" onClick={() => toggleCompare(item.id)} className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-background/90 shadow-sm" aria-label={selected ? "Aus Vergleich entfernen" : "Für Vergleich auswählen"}>{selected ? <Check className="h-4 w-4 text-coin" /> : <Scale className="h-4 w-4" />}</button>
            <Link to="/werke/$id" params={{ id: work.id }}><div className="aspect-[4/3] overflow-hidden rounded-md border-[6px] border-coin/50 bg-muted shadow-md"><img src={work.image} alt={work.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></div><p className="mt-3 font-medium">{work.title}</p><p className="text-xs text-muted-foreground">{work.painter.name} · {item.kind === "journey" ? "auf der Reise erlernt" : `${item.purchase_price} Coins`}</p></Link>
            <div className="mt-3 flex items-center justify-between gap-2"><span className={`border px-2 py-1 text-[9px] tracking-[0.16em] uppercase ${artRankClasses(rank)}`}>{rank}</span><Button type="button" variant={featured ? "default" : "outline"} size="sm" className="rounded-full" onClick={() => toggleFeatured(work.id)}><Star className={featured ? "fill-current" : ""} />{featured ? "Ausgestellt" : "Ausstellen"}</Button></div>
          </article>; })}</div>
          {compareIds.length === 2 && <section className="mt-10 border-t border-border pt-8"><div className="flex items-center justify-between gap-3"><div><p className="text-xs tracking-widest text-muted-foreground uppercase">Direkter Vergleich</p><h3 className="font-display mt-1 text-2xl font-medium">Zwei Werke, ein Blick</h3></div><Button variant="ghost" size="icon" onClick={() => setCompareIds([])} aria-label="Vergleich schließen"><X /></Button></div><div className="mt-5 grid grid-cols-2 gap-4 md:gap-8">{compareIds.map((id) => { const item = owned.find((entry) => entry.id === id); const work = item ? allWorks.find((candidate) => candidate.id === item.item_slug) : undefined; if (!work) return null; return <div key={id} className="min-w-0"><div className="aspect-[4/3] overflow-hidden rounded-md bg-muted"><img src={work.image} alt={work.title} className="h-full w-full object-contain" /></div><h4 className="mt-3 font-display text-lg font-medium">{work.title}</h4><p className="text-sm text-muted-foreground">{work.painter.name} · {work.year}</p><dl className="mt-4 space-y-2 text-sm"><div><dt className="text-xs text-muted-foreground">Technik</dt><dd>{work.technique}</dd></div><div><dt className="text-xs text-muted-foreground">Stil</dt><dd>{work.styles.join(" · ")}</dd></div><div><dt className="text-xs text-muted-foreground">Museum</dt><dd>{work.museum || "Privatsammlung / unbekannt"}</dd></div></dl></div>; })}</div></section>}
        </>}
      </section>

      <div className="mt-10"><CollectionQuiz ownedSlugs={owned.map((item) => item.item_slug)} /></div>


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
      <LicenseNotice context="Deine Sammlung enthält ausschließlich gemeinfreie Werke." /></div>

      <OwnPhotos />


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

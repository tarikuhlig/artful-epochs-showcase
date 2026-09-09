import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { MagnifierImage } from "@/components/MagnifierImage";
import { UnlockDialog, type UnlockInfo } from "@/components/UnlockDialog";

type OwnPhoto = {
  id: string;
  title: string;
  artist: string | null;
  note: string | null;
  location: string | null;
  image_path: string;
  url: string | null;
};

/** Eigene Fotos von Werken: lokal hochgeladen, privat gespeichert, ohne KI-Dienste. */
export function OwnPhotos() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [unlock, setUnlock] = useState<UnlockInfo | null>(null);

  const photos = useQuery({
    queryKey: ["user_artworks", user?.id],
    enabled: !!user,
    queryFn: async (): Promise<OwnPhoto[]> => {
      const { data, error } = await supabase
        .from("user_artworks")
        .select("id, title, artist, note, location, image_path")
        .order("created_at", { ascending: false });
      if (error) throw error;
      const rows = data ?? [];
      if (rows.length === 0) return [];
      const { data: signed } = await supabase.storage
        .from("user-artworks")
        .createSignedUrls(rows.map((row) => row.image_path), 3600);
      return rows.map((row, index) => ({ ...row, url: signed?.[index]?.signedUrl ?? null }));
    },
  });

  const save = useMutation({
    mutationFn: async () => {
      if (!user || !file) throw new Error("Bitte wähle ein Foto aus.");
      if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024)
        throw new Error("Bitte ein Bild mit höchstens 10 MB wählen.");
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${user.id}/${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await supabase.storage
        .from("user-artworks")
        .upload(path, file, { contentType: file.type });
      if (uploadError) throw new Error("Das Foto konnte nicht gespeichert werden.");
      const savedTitle = title.trim() || file.name.replace(/\.[^.]+$/, "");
      const savedArtist = artist.trim();
      const { error } = await supabase.from("user_artworks").insert({
        user_id: user.id,
        title: savedTitle,
        artist: artist.trim() || null,
        location: location.trim() || null,
        image_path: path,
      });
      if (error) throw new Error("Die Angaben konnten nicht gespeichert werden.");
      return { savedTitle, savedArtist };
    },
    onSuccess: async (saved) => {
      setTitle(""); setArtist(""); setLocation(""); setFile(null); setMessage("Foto gespeichert.");
      setUnlock({ title: saved.savedTitle, subtitle: saved.savedArtist ? `${saved.savedArtist} — dein eigenes Foto.` : "Dein eigenes Foto ist jetzt Teil deiner Sammlung." });
      await queryClient.invalidateQueries({ queryKey: ["user_artworks"] });
    },
    onError: (error: Error) => setMessage(error.message),
  });

  const remove = useMutation({
    mutationFn: async (photo: OwnPhoto) => {
      await supabase.storage.from("user-artworks").remove([photo.image_path]);
      const { error } = await supabase.from("user_artworks").delete().eq("id", photo.id);
      if (error) throw new Error("Das Foto konnte nicht entfernt werden.");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user_artworks"] });
    },
    onError: (error: Error) => setMessage(error.message),
  });

  if (!user) return null;

  return (
    <section className="mt-16 border-t border-border pt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Eigene Aufnahmen</p>
          <h2 className="font-display mt-2 text-3xl font-medium">Deine Museumsfotos</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Speichere eigene Fotos von Werken, die du im Museum gesehen hast — privat und nur für dich sichtbar.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 rounded-xl border border-border p-5 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex cursor-pointer items-center gap-2 rounded-full border border-dashed border-input px-4 py-2 text-sm">
          <Camera className="h-4 w-4" />
          <span className="truncate">{file ? file.name : "Foto wählen"}</span>
          <input type="file" accept="image/*" className="sr-only" onChange={(event) => { setFile(event.target.files?.[0] ?? null); setMessage(""); }} />
        </label>
        <input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} placeholder="Titel des Werks" className="rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-ring" />
        <input value={artist} onChange={(event) => setArtist(event.target.value)} maxLength={120} placeholder="Künstler (optional)" className="rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-ring" />
        <div className="flex gap-2">
          <input value={location} onChange={(event) => setLocation(event.target.value)} maxLength={120} placeholder="Ort (optional)" className="min-w-0 flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-ring" />
          <Button className="rounded-full" disabled={!file || save.isPending} onClick={() => save.mutate()}>
            {save.isPending ? "Speichert …" : "Hinzufügen"}
          </Button>
        </div>
      </div>
      {message && <p role="status" className="mt-3 text-xs text-muted-foreground">{message}</p>}

      {photos.data && photos.data.length > 0 ? (
        <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {photos.data.map((photo) => (
            <article key={photo.id} className="rounded-xl border border-border p-3">
              {photo.url ? (
                <MagnifierImage src={photo.url} alt={photo.title} />
              ) : (
                <div className="aspect-[4/3] rounded-lg bg-muted" />
              )}
              <div className="mt-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-display truncate text-lg font-medium">{photo.title}</h3>
                  <p className="truncate text-xs text-muted-foreground">
                    {[photo.artist, photo.location].filter(Boolean).join(" · ") || "Eigene Aufnahme"}
                  </p>
                </div>
                <Button variant="ghost" size="icon" aria-label="Foto entfernen" onClick={() => remove.mutate(photo)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-7 border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Noch keine eigenen Fotos — lade dein erstes Museumsfoto hoch.
        </p>
      )}
    </section>
  );
}

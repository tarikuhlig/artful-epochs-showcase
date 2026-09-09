import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UserRound } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

/** Einmalige Profil-Einrichtung direkt nach der ersten Anmeldung. */
export function ProfileSetup() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const profile = useQuery({
    queryKey: ["profile-setup", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error: err } = await supabase
        .from("profiles")
        .select("display_name, username")
        .eq("id", user!.id)
        .maybeSingle();
      if (err) throw err;
      return data ?? { display_name: null, username: null };
    },
  });

  if (!user || done || profile.isLoading || !profile.data) return null;
  if (profile.data.username) return null;

  function pick(next: File | null) {
    setFile(next);
    setPreview(next ? URL.createObjectURL(next) : null);
  }

  async function save() {
    if (!user) return;
    setError("");
    const normalized = username.trim().toLowerCase();
    if (!/^[a-z0-9_.]{3,24}$/.test(normalized)) {
      setError("Benutzername: 3–24 Zeichen, nur Buchstaben, Zahlen, Punkt und Unterstrich.");
      return;
    }
    setBusy(true);
    try {
      let avatarPath: string | null = null;
      if (file) {
        if (file.size > 5 * 1024 * 1024) throw new Error("Das Bild darf höchstens 5 MB groß sein.");
        const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
        avatarPath = `${user.id}/avatar.${extension}`;
        const { error: uploadError } = await supabase.storage
          .from("profile-images")
          .upload(avatarPath, file, { upsert: true, contentType: file.type });
        if (uploadError) throw uploadError;
      }
      const { error: err } = await supabase
        .from("profiles")
        .update({
          display_name: displayName.trim() || normalized,
          username: normalized,
          ...(avatarPath ? { avatar_url: avatarPath } : {}),
        })
        .eq("id", user.id);
      if (err) throw err;
      await supabase.auth.updateUser({ data: { display_name: displayName.trim() || normalized } });
      setDone(true);
      await queryClient.invalidateQueries();
    } catch (cause) {
      const raw = cause instanceof Error ? cause.message : "";
      setError(
        raw.includes("duplicate") || raw.includes("unique")
          ? "Dieser Benutzername ist schon vergeben."
          : raw || "Das Profil konnte nicht gespeichert werden.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[130] flex items-end justify-center bg-foreground/30 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-xl sm:p-8 sm:pb-8">
        <h2 className="font-display text-2xl font-medium">Richte dein Profil ein</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Wähle einen Namen und ein Bild — beides kannst du später in den Einstellungen ändern.
        </p>

        <div className="mt-6 flex items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full border border-border bg-muted">
            {preview ? (
              <img src={preview} alt="Vorschau des Profilbilds" className="h-full w-full object-cover" />
            ) : (
              <UserRound className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <label className="cursor-pointer text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            Profilbild wählen
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => pick(event.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        <div className="mt-5 grid gap-3">
          <input
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Anzeigename"
            className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Benutzername"
            className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setDone(true)}
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Später
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void save()}
            className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Einen Moment…" : "Profil speichern"}
          </button>
        </div>
      </div>
    </div>
  );
}

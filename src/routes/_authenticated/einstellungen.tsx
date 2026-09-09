import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Crown, LogOut, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { PremiumUpsell } from "@/components/PremiumUpsell";

export const Route = createFileRoute("/_authenticated/einstellungen")({
  head: () => ({
    meta: [
      { title: "Einstellungen — Profil & Konto | Provenance" },
      { name: "description", content: "Benutzername, Anzeigename, Profilbild, Passwort und Abo-Status in Provenance verwalten." },
      { property: "og:title", content: "Einstellungen | Provenance" },
      { property: "og:description", content: "Profil und Konto in Provenance anpassen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const access = usePremiumAccess();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const profile = useQuery({
    queryKey: ["profile-settings", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error: err } = await supabase
        .from("profiles")
        .select("display_name, username, avatar_url")
        .eq("id", user!.id)
        .maybeSingle();
      if (err) throw err;
      if (!data?.avatar_url) return { ...data, signedAvatarUrl: null as string | null };
      const { data: signed } = await supabase.storage.from("profile-images").createSignedUrl(data.avatar_url, 3600);
      return { ...data, signedAvatarUrl: signed?.signedUrl ?? null };
    },
  });

  useEffect(() => {
    if (!profile.data) return;
    setDisplayName(profile.data.display_name ?? "");
    setUsername(profile.data.username ?? "");
  }, [profile.data]);

  function reset() {
    setMessage("");
    setError("");
  }

  async function saveProfile() {
    if (!user) return;
    reset();
    const normalized = username.trim().toLowerCase();
    if (normalized && !/^[a-z0-9_.]{3,24}$/.test(normalized)) {
      setError("Benutzername: 3–24 Zeichen, nur Buchstaben, Zahlen, Punkt und Unterstrich.");
      return;
    }
    setBusy(true);
    try {
      const { error: err } = await supabase
        .from("profiles")
        .update({ display_name: displayName.trim() || null, username: normalized || null })
        .eq("id", user.id);
      if (err) throw err;
      await supabase.auth.updateUser({ data: { display_name: displayName.trim() } });
      await queryClient.invalidateQueries();
      setMessage("Profil gespeichert.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Das Profil konnte nicht gespeichert werden.");
    } finally {
      setBusy(false);
    }
  }

  async function uploadAvatar(file: File) {
    if (!user) return;
    reset();
    setBusy(true);
    try {
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = `${user.id}/avatar.${extension}`;
      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (uploadError) throw uploadError;
      const { error: err } = await supabase.from("profiles").update({ avatar_url: path }).eq("id", user.id);
      if (err) throw err;
      await profile.refetch();
      setMessage("Profilbild aktualisiert.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Das Bild konnte nicht hochgeladen werden.");
    } finally {
      setBusy(false);
    }
  }

  async function changePassword() {
    reset();
    if (password.length < 8) {
      setError("Das neue Passwort braucht mindestens 8 Zeichen.");
      return;
    }
    setBusy(true);
    try {
      const { error: err } = await supabase.auth.updateUser({ password, current_password: currentPassword } as never);
      if (err) throw err;
      setPassword("");
      setCurrentPassword("");
      setMessage("Passwort geändert.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Das Passwort konnte nicht geändert werden.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    queryClient.clear();
    void navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Konto</p>
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight">Einstellungen</h1>
      <p className="mt-3 text-sm text-muted-foreground">{user?.email}</p>

      <section className="mt-10 rounded-2xl border border-border p-6 sm:p-8">
        <h2 className="font-display text-2xl font-medium">Profil</h2>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
            {profile.data?.signedAvatarUrl ? (
              <img src={profile.data.signedAvatarUrl} alt="Dein Profilbild" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <UserRound className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="avatar" className="text-sm font-medium">Profilbild</label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              disabled={busy}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadAvatar(file);
              }}
              className="mt-2 block w-full text-sm text-muted-foreground file:mr-3 file:rounded-full file:border file:border-input file:bg-background file:px-4 file:py-2 file:text-sm"
            />
            <p className="mt-1 text-xs text-muted-foreground">JPG oder PNG, maximal 5 MB.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="display" className="text-sm font-medium">Anzeigename</label>
            <input
              id="display"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              maxLength={40}
              className="mt-2 w-full rounded-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="username" className="text-sm font-medium">Benutzername</label>
            <input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              maxLength={24}
              placeholder="kunstfreund"
              className="mt-2 w-full rounded-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>
        <Button onClick={saveProfile} disabled={busy} className="mt-5 rounded-full px-6">Profil speichern</Button>
      </section>

      <section className="mt-6 rounded-2xl border border-border p-6 sm:p-8">
        <h2 className="font-display text-2xl font-medium">Passwort ändern</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="current" className="text-sm font-medium">Aktuelles Passwort</label>
            <input
              id="current"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              autoComplete="current-password"
              className="mt-2 w-full rounded-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="next" className="text-sm font-medium">Neues Passwort</label>
            <input
              id="next"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              className="mt-2 w-full rounded-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>
        <Button onClick={changePassword} disabled={busy} variant="outline" className="mt-5 rounded-full px-6">Passwort speichern</Button>
      </section>

      {(message || error) && (
        <p role="status" className={`mt-5 text-sm ${error ? "text-destructive" : "text-muted-foreground"}`}>
          {error || message}
        </p>
      )}

      <section className="mt-6 rounded-2xl border border-border p-6 sm:p-8">
        <h2 className="font-display text-2xl font-medium">Abo</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {access.isAdmin
            ? "Admin · Premium-Testzugang"
            : access.hasAccess
              ? `Premium aktiv · ${access.subscription?.price_id?.endsWith("yearly") ? "Jahresabo" : "Monatsabo"}`
              : "Du nutzt Provenance Free."}
        </p>
        {!access.hasAccess && (
          <Button asChild className="mt-5 rounded-full px-6">
            <Link to="/premium"><Crown /> Premium freischalten</Link>
          </Button>
        )}
      </section>

      {!access.hasAccess && <div className="mt-6"><PremiumUpsell compact /></div>}

      <section className="mt-6 rounded-2xl border border-border p-6 sm:p-8">
        <h2 className="font-display text-2xl font-medium">Einführung</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Die kurze Führung durch Provenance noch einmal ansehen.
        </p>
        <Button
          variant="outline"
          className="mt-5 rounded-full px-6"
          onClick={async () => {
            if (!user) return;
            reset();
            await supabase.from("profiles").update({ tour_completed_at: null }).eq("id", user.id);
            await queryClient.invalidateQueries({ queryKey: ["app-tour", user.id] });
            setMessage("Die Einführung startet gleich.");
          }}
        >
          Einführung erneut ansehen
        </Button>
      </section>

      <section className="mt-6 rounded-2xl border border-border p-6 sm:p-8">
        <h2 className="font-display text-2xl font-medium">Abmelden</h2>
        <p className="mt-2 text-sm text-muted-foreground">Dein Fortschritt bleibt in deinem Konto gespeichert.</p>
        <Button onClick={logout} variant="outline" className="mt-5 rounded-full px-6"><LogOut /> Abmelden</Button>
      </section>
    </div>
  );
}

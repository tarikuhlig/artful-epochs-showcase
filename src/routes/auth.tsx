import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Anmelden — Fortschritt speichern | Provenance" },
      {
        name: "description",
        content:
          "Melde dich bei Provenance an, um deine Sammlung entdeckter Maler, Epochen und Werke sowie deine Quiz-Ergebnisse zu speichern.",
      },
      { property: "og:title", content: "Anmelden — Fortschritt speichern | Provenance" },
      {
        property: "og:description",
        content: "Konto anlegen und Kunstwissen dauerhaft festhalten.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) void navigate({ to: "/sammlung", replace: true });
  }, [loading, user, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      if (mode === "signup") {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: displayName },
          },
        });
        if (err) throw err;
        if (!data.session) {
          setInfo("Fast geschafft — bestätige bitte den Link in deiner E-Mail.");
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Etwas ist schiefgelaufen.");
    } finally {
      setBusy(false);
    }
  }

  async function handleOAuth(provider: "google" | "apple") {
    setError(null);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("Anmeldung nicht möglich. Bitte versuch es erneut.");
      return;
    }
    if (result.redirected) return;
    void navigate({ to: "/sammlung", replace: true });
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6 py-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        {mode === "signin" ? "Willkommen zurück" : "Konto anlegen"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Speichere deine Sammlung entdeckter Maler, Epochen und Werke sowie deine Quiz-Ergebnisse.
      </p>

      <div className="mt-8 grid gap-2">
        <button
          type="button"
          onClick={() => handleOAuth("google")}
          className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-5 text-sm font-medium transition-colors hover:bg-accent"
        >
          Mit Google fortfahren
        </button>
        <button
          type="button"
          onClick={() => handleOAuth("apple")}
          className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-5 text-sm font-medium transition-colors hover:bg-accent"
        >
          Mit Apple fortfahren
        </button>
      </div>

      <div className="my-6 flex items-center gap-3 text-xs tracking-widest text-muted-foreground uppercase">
        <span className="h-px flex-1 bg-border" />
        oder
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3">
        {mode === "signup" && (
          <div className="grid gap-1.5">
            <label htmlFor="name" className="text-sm font-medium">
              Anzeigename
            </label>
            <input
              id="name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        )}
        <div className="grid gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            E-Mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            Passwort
          </label>
          <input
            id="password"
            type="password"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        {info && <p className="text-sm text-muted-foreground">{info}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-2 inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {busy ? "Einen Moment…" : mode === "signin" ? "Anmelden" : "Registrieren"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(mode === "signin" ? "signup" : "signin");
          setError(null);
          setInfo(null);
        }}
        className="mt-6 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        {mode === "signin"
          ? "Noch kein Konto? Jetzt registrieren"
          : "Schon ein Konto? Zur Anmeldung"}
      </button>

      <Link
        to="/"
        className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}

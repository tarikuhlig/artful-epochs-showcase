import { useState } from "react";
import provenanceLogo from "@/assets/provenance-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { setStaySignedIn } from "@/lib/session-persistence";

/** Titelbild mit Anmeldung — erscheint beim Öffnen der App, vor dem Intro. */
export function TitleGate({ onDone }: { onDone: () => void }) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);
  const [stay, setStay] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setStaySignedIn(stay);
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
          setError("Fast geschafft — bestätige bitte den Link in deiner E-Mail.");
          return;
        }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
      }
      onDone();
    } catch (err) {
      const raw = err instanceof Error ? err.message : "";
      const map: Record<string, string> = {
        "Invalid login credentials": "E-Mail oder Passwort stimmt nicht.",
        "User already registered": "Für diese E-Mail gibt es schon ein Konto — melde dich einfach an.",
        "Email not confirmed": "Bitte bestätige zuerst den Link in deiner E-Mail.",
      };
      setError(
        map[raw] ??
          (raw.toLowerCase().includes("password")
            ? "Das Passwort passt nicht — mindestens 6 Zeichen, bitte erneut versuchen."
            : raw.toLowerCase().includes("email")
              ? "Diese E-Mail-Adresse wird nicht akzeptiert."
              : "Anmeldung gerade nicht möglich. Bitte versuch es noch einmal."),
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleOAuth(provider: "google" | "apple") {
    setError(null);
    setStaySignedIn(stay);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      const msg = result.error.message ?? "";
      console.error("[auth] OAuth fehlgeschlagen", provider, msg);
      setError(
        msg.includes("Popup was blocked")
          ? "Dein Browser hat das Anmeldefenster blockiert. Erlaube Pop-ups oder melde dich mit E-Mail an."
          : msg.includes("cancelled")
            ? "Die Anmeldung wurde abgebrochen."
            : msg.includes("timed out")
              ? "Die Anmeldung hat zu lange gedauert. Bitte versuch es noch einmal."
              : "Anmeldung nicht möglich. Bitte versuch es erneut oder nutze E-Mail und Passwort.",
      );
      return;
    }
    if (result.redirected) return;
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      setError("Anmeldung nicht abgeschlossen. Bitte versuch es noch einmal.");
      return;
    }
    onDone();
  }

  return (
    <div className="fixed inset-0 z-[110] overflow-y-auto bg-background">
      <div className="mx-auto flex min-h-full max-w-md flex-col justify-center px-6 py-12">
        <img
          src={provenanceLogo}
          alt="Provenance"
          width={1920}
          height={640}
          className="mx-auto w-[min(64vw,340px)]"
        />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Maler, Epochen und Meisterwerke entdecken — melde dich an, um deinen Fortschritt zu
          speichern.
        </p>

        <div className="mt-8 grid gap-2">
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            className="inline-flex h-11 items-center justify-center rounded-full border border-input bg-background px-5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Mit Google fortfahren
          </button>
          <button
            type="button"
            onClick={() => handleOAuth("apple")}
            className="inline-flex h-11 items-center justify-center rounded-full border border-input bg-background px-5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Mit Apple fortfahren
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Apple lässt die Anmeldung in der Vorschau oft nicht zu — öffne die App dafür in einem
            eigenen Browser-Tab.
          </p>
        </div>

        <label className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={stay}
            onChange={(event) => setStay(event.target.checked)}
            className="h-4 w-4 rounded border-input"
          />
          Angemeldet bleiben
        </label>


        <div className="my-6 flex items-center gap-3 text-xs tracking-widest text-muted-foreground uppercase">
          <span className="h-px flex-1 bg-border" />
          oder
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3">
          {mode === "signup" && (
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Anzeigename"
              required
              className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          )}
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail"
            required
            className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="password"
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort"
            required
            minLength={6}
            className="h-11 rounded-xl border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="mt-1 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Einen Moment…" : mode === "signin" ? "Anmelden" : "Registrieren"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
          }}
          className="mt-5 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {mode === "signin"
            ? "Noch kein Konto? Jetzt registrieren"
            : "Schon ein Konto? Zur Anmeldung"}
        </button>

        <button
          type="button"
          onClick={onDone}
          className="mt-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Ohne Konto ansehen
        </button>
      </div>
    </div>
  );
}

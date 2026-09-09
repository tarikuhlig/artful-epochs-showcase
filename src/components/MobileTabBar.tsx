import { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import {
  Compass,
  Map,
  Gavel,
  Images,
  MoreHorizontal,
  LogIn,
  X,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

const MORE: { to: "/studieren" | "/epochen" | "/museen" | "/kuenstler-des-tages" | "/moderne" | "/premium" | "/profil" | "/einstellungen"; label: string; authOnly?: boolean }[] = [
  { to: "/studieren", label: "Studieren" },
  { to: "/epochen", label: "Epochen" },
  { to: "/museen", label: "Museen" },
  { to: "/kuenstler-des-tages", label: "Künstler des Tages" },
  { to: "/moderne", label: "Moderne & Gegenwart" },
  { to: "/premium", label: "Premium" },
  { to: "/profil", label: "Profil", authOnly: true },
  { to: "/einstellungen", label: "Einstellungen", authOnly: true },
];


const itemClass =
  "flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors";
const activeClass = { className: "text-foreground" };

/** Feste Menüleiste unten — nur auf dem Handy sichtbar. */
export function MobileTabBar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => router.subscribe("onResolved", () => setOpen(false)), [router]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-[2px] md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-border bg-background px-4 pt-4 pb-[calc(6rem+env(safe-area-inset-bottom))]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="font-display text-lg font-medium">Mehr entdecken</p>
              <button
                type="button"
                aria-label="Schließen"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-input"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 grid gap-1">
              {MORE.filter((entry) => !entry.authOnly || user).map((entry) => (
                <Link
                  key={entry.to}
                  to={entry.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  activeProps={{ className: "bg-accent text-foreground" }}
                >
                  {entry.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav
        aria-label="Hauptmenü"
        className="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >
        <div className="flex items-stretch gap-1 px-2 py-1.5">
          <Link to="/" activeOptions={{ exact: true }} className={itemClass} activeProps={activeClass}>
            <Compass className="h-5 w-5" />
            Entdecken
          </Link>
          <Link to="/kunstpfad" className={itemClass} activeProps={activeClass}>
            <Map className="h-5 w-5" />
            Reise
          </Link>
          <Link to="/auktionshaus" className={itemClass} activeProps={activeClass}>
            <Gavel className="h-5 w-5" />
            Auktion
          </Link>
          {user ? (
          <Link to="/sammlung" className={itemClass} activeProps={activeClass}>
            <Images className="h-5 w-5" />
            Galerie
          </Link>
          ) : (
            <Link to="/auth" className={itemClass} activeProps={activeClass}>
              <LogIn className="h-5 w-5" />
              Anmelden
            </Link>
          )}

          <button type="button" onClick={() => setOpen((value) => !value)} className={itemClass}>
            <MoreHorizontal className="h-5 w-5" />
            Mehr
          </button>
        </div>
      </nav>
    </>
  );
}

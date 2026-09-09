import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, Settings, X } from "lucide-react";

import appCss from "../styles.css?url";
import provenanceLogo from "../assets/provenance-logo.png";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { PremiumBanner } from "@/components/PremiumUpsell";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-medium text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-medium text-foreground">Seite nicht gefunden</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Diese Seite existiert nicht oder wurde verschoben.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-medium tracking-tight text-foreground">
          Diese Seite konnte nicht geladen werden
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Etwas ist schiefgelaufen. Versuch es erneut oder geh zurück zur Startseite.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Erneut versuchen
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Zur Startseite
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { name: "theme-color", content: "#ffffff" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "Provenance" },
      { name: "application-name", content: "Provenance" },
      { name: "format-detection", content: "telephone=no" },

      { title: "Provenance — Kunstgeschichte lernen" },
      {
        name: "description",
        content:
          "Lerne die großen Maler und ihre Werke kennen — geordnet nach Epochen und als interaktive Reise.",
      },
      { name: "author", content: "Provenance" },
      { property: "og:title", content: "Provenance — Kunstgeschichte lernen" },
      {
        property: "og:description",
        content: "Maler, Epochen und Meisterwerke entdecken — klar und schön geordnet.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },

      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const NAV: {
  to: "/" | "/kunstpfad" | "/studieren" | "/epochen" | "/museen" | "/auktionshaus" | "/premium";
  label: string;
  exact?: boolean;
}[] = [
  { to: "/", label: "Entdecken", exact: true },
  { to: "/kunstpfad", label: "Reise" },
  { to: "/studieren", label: "Studieren" },
  { to: "/epochen", label: "Epochen" },
  { to: "/museen", label: "Museen" },
  { to: "/auktionshaus", label: "Auktionshaus" },
  { to: "/premium", label: "Premium" },
];

function SiteHeader() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return router.subscribe("onResolved", () => setOpen(false));
  }, [router]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link to="/" className="flex items-center">
          <img
            src={provenanceLogo}
            alt="Provenance"
            width={1920}
            height={640}
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact ?? false }}
              className="rounded-full px-4 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "bg-accent text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <div className="ml-2 flex items-center gap-1">
              <Link
                to="/atelier"
                className="inline-flex items-center rounded-full border border-input bg-background px-4 py-2 text-foreground transition-colors hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                Galerie
              </Link>
              <Link
                to="/einstellungen"
                aria-label="Einstellungen"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input text-foreground transition-colors hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                <Settings className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <Link
              to="/auth"
              className="ml-1 rounded-full bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90"
            >
              Anmelden
            </Link>
          )}
        </nav>

      </div>
    </header>
  );
}


function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
        <p>Provenance — Kunstgeschichte zum Lernen</p>
        <p>Bildnachweis: Wikimedia Commons (gemeinfreie Werke)</p>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <PaymentTestModeBanner />
      <SiteHeader />
      <PremiumBanner />
      <main>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
    </QueryClientProvider>
  );
}

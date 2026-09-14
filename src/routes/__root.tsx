import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Search, Settings } from "lucide-react";
import { GlobalSearchProvider, useGlobalSearch } from "@/components/GlobalSearch";
import { MobileTabBar } from "@/components/MobileTabBar";
import { AppTour } from "@/components/AppTour";
import { CollectionPopups } from "@/components/CollectionPopups";
import { ProfileSetup } from "@/components/ProfileSetup";
import { BackButton } from "@/components/BackButton";
import { ProvenanceLogo } from "@/components/ProvenanceLogo";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { PremiumBanner } from "@/components/PremiumUpsell";
import { CoinBadge } from "@/components/CoinBadge";
import { Toaster } from "@/components/ui/sonner";
import { ExternalArtProvider } from "@/components/ExternalArtModal";

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
  to: "/" | "/kunstpfad" | "/auktionshaus" | "/sammlung";
  label: string;
  exact?: boolean;
  authOnly?: boolean;
}[] = [
  { to: "/", label: "Entdecken", exact: true },
  { to: "/kunstpfad", label: "Reise" },
  { to: "/auktionshaus", label: "Auktionshaus" },
  { to: "/sammlung", label: "Galerie", authOnly: true },
];




function BrandHeader() {
  return (
    <div className="hidden border-b border-border bg-background pt-[env(safe-area-inset-top)] md:block">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-5 sm:py-6">
        <Link to="/" aria-label="Provenance Startseite" className="group inline-flex flex-col items-center">
          <div className="flex items-center gap-4">
            <span className="hidden h-px w-8 bg-gradient-to-r from-transparent via-border to-foreground/20 sm:block" />
            <ProvenanceLogo compact className="text-[2.5rem] leading-none sm:text-[2.9rem]" />
            <span className="hidden h-px w-8 bg-gradient-to-l from-transparent via-border to-foreground/20 sm:block" />
          </div>
          <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-foreground">
            Kunstgeschichte entdecken
          </span>
        </Link>
      </div>
    </div>
  );
}

function SiteHeader() {
  const { user } = useAuth();
  const search = useGlobalSearch();

  return (
    <header className="sticky top-0 z-50 hidden border-b border-border bg-background/85 pt-[env(safe-area-inset-top)] backdrop-blur-md md:block">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <nav aria-label="Desktop-Hauptmenü" className="flex flex-1 items-center justify-center gap-1 text-sm font-medium">
          {NAV.filter((item) => !item.authOnly || user).map((item) => (
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
        </nav>

        <div className="absolute right-4 flex items-center gap-1 sm:right-6">
          <button
            type="button"
            aria-label="Suche öffnen"
            onClick={search.open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input text-foreground transition-colors hover:bg-accent"
          >
            <Search className="h-4 w-4" />
          </button>
          {user ? (
            <>
              <CoinBadge className="mr-1" />
              <Link
                to="/einstellungen"
                aria-label="Einstellungen"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-input text-foreground transition-colors hover:bg-accent"
                activeProps={{ className: "bg-accent" }}
              >
                <Settings className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <Link
              to="/auth"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Anmelden
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}


/** Lupe und Coin-Stand oben rechts — nur auf dem Handy. */
function MobileQuickActions() {
  const search = useGlobalSearch();
  return (
    <div className="fixed top-[calc(env(safe-area-inset-top)+0.6rem)] right-3 z-[65] flex items-center gap-2 md:hidden">
      <button
        type="button"
        aria-label="Suche öffnen"
        onClick={search.open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/95 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent"
      >
        <Search className="h-4 w-4" />
      </button>
      <CoinBadge className="h-9 bg-background/95 px-3 shadow-sm backdrop-blur" />
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 pt-8 pb-[calc(6rem+env(safe-area-inset-bottom))] text-xs text-muted-foreground sm:flex-row md:pb-8">
        <p>Provenance — Kunstgeschichte zum Lernen</p>
        <Link to="/rechte" className="underline underline-offset-2 hover:text-foreground">
          Bildnachweis &amp; Rechte
        </Link>
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
      <GlobalSearchProvider>
      <ExternalArtProvider>
      {/* Platz für die feste Leiste oben auf dem Handy */}
      <div aria-hidden className="h-[calc(env(safe-area-inset-top)+3.25rem)] md:hidden" />
      <PaymentTestModeBanner />
      <BrandHeader />
      <SiteHeader />
      <PremiumBanner />
      {/* Ruhige Leiste oben auf dem Handy — verdeckt keine Inhalte mehr. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[calc(env(safe-area-inset-top)+3.25rem)] bg-background/85 backdrop-blur-md md:hidden"
      />
      <BackButton />
      {/* Suche und Coin-Stand jederzeit sichtbar — auf dem Handy oben rechts. */}
      <MobileQuickActions />
      <main>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <SiteFooter />
      <MobileTabBar />
      <ProfileSetup />
      <AppTour />
      <CollectionPopups />
      <Toaster position="bottom-center" />
      </ExternalArtProvider>
      </GlobalSearchProvider>
    </QueryClientProvider>
  );
}

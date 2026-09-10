import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ExternalLink, X } from "lucide-react";

export type ExternalArtTarget = {
  url: string;
  artist: string;
  title?: string | undefined;
  rightsHolder?: string | undefined;
};

type Ctx = { open: (target: ExternalArtTarget) => void; close: () => void };

const ExternalArtContext = createContext<Ctx | null>(null);

/** Öffnet die Museums-Ansicht — überall in der App verfügbar. */
export function useExternalArt() {
  const ctx = useContext(ExternalArtContext);
  if (!ctx) throw new Error("useExternalArt muss innerhalb von ExternalArtProvider genutzt werden");
  return ctx;
}

export function ExternalArtProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<ExternalArtTarget | null>(null);

  const open = useCallback((next: ExternalArtTarget) => setTarget(next), []);
  const close = useCallback(() => setTarget(null), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ExternalArtContext.Provider value={value}>
      {children}
      {target && <ExternalArtModal target={target} onClose={close} />}
    </ExternalArtContext.Provider>
  );
}

function ExternalArtModal({ target, onClose }: { target: ExternalArtTarget; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);



  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label={`${target.artist} beim Museum ansehen`}>
      <button
        type="button"
        aria-label="Museums-Ansicht schließen"
        onClick={onClose}
        className={`absolute inset-0 bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      />

      <div
        className={`absolute inset-x-0 bottom-0 flex h-[90vh] flex-col overflow-hidden rounded-t-2xl border border-border bg-background shadow-2xl transition-transform duration-300 ease-out ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <header className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <p className="font-display truncate text-lg font-medium">{target.artist}</p>
            {target.title && <p className="truncate text-sm text-muted-foreground">{target.title}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:bg-accent"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-5 py-2">
          <p className="truncate text-xs text-muted-foreground">
            {target.rightsHolder ? `Rechte: ${target.rightsHolder}` : "Abbildung beim Rechteinhaber"}
          </p>
          <button
            type="button"
            onClick={() => window.open(target.url, "_blank", "noopener,noreferrer")}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs transition-colors hover:bg-accent"
          >
            Lädt nicht korrekt? Direkt öffnen
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>

        {!loaded && slow && (
          <div className="border-b border-border bg-background px-5 py-3">
            <p className="text-xs text-muted-foreground">
              Diese Museumsseite erlaubt keine Anzeige in der App. Öffne sie mit dem Button oben
              direkt beim Rechteinhaber.
            </p>
          </div>
        )}

        <iframe
          ref={frameRef}
          src={target.url}
          onLoad={() => setLoaded(true)}
          title={`${target.artist}${target.title ? ` — ${target.title}` : ""}`}
          sandbox="allow-scripts allow-same-origin allow-popups"
          referrerPolicy="no-referrer"
          className="h-full w-full flex-1 border-0 bg-background"
        />

      </div>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { Minus, Plus, Search, SearchX } from "lucide-react";

/**
 * Bild mit Lupe.
 *
 * Das Werk bleibt immer vollständig sichtbar (object-contain). Der Ausschnitt
 * unter der Lupe behält exakt das Seitenverhältnis des Originals, weil die
 * tatsächliche Inhaltsfläche (ohne Letterbox-Ränder) gemessen wird.
 *
 * Positions-Updates laufen über requestAnimationFrame und direkte
 * DOM-Manipulation (translate3d), damit die Lupe ohne Re-Renders dem
 * Finger folgt.
 */

const LENS = 220;
const HALF = LENS / 2;
const MIN_ZOOM = 2;
const MAX_ZOOM = 5;
const TOUCH_OFFSET = -150;

type Content = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export function MagnifierImage({
  src,
  alt,
  zoom = 3,
  className = "",
  frameClassName = "",
}: {
  src: string;
  alt: string;
  zoom?: number;
  className?: string;
  frameClassName?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const lens = useRef<HTMLSpanElement>(null);
  const natural = useRef({ w: 0, h: 0 });
  const raf = useRef<number | null>(null);
  const pending = useRef<{ x: number; y: number; touch: boolean } | null>(null);
  const last = useRef<{ x: number; y: number; touch: boolean } | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ dist: number; zoom: number } | null>(null);

  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [factor, setFactor] = useState(() =>
    Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom)),
  );
  const factorRef = useRef(factor);
  factorRef.current = factor;

  /** Inhaltsfläche des Bildes im Rahmen (ohne Letterbox-Ränder). */
  const content = useCallback((): Content | null => {
    const box = image.current?.getBoundingClientRect();
    const { w, h } = natural.current;
    if (!box || !w || !h) return null;
    const scale = Math.min(box.width / w, box.height / h);
    const width = w * scale;
    const height = h * scale;
    return {
      left: box.left + (box.width - width) / 2,
      top: box.top + (box.height - height) / 2,
      width,
      height,
    };
  }, []);

  /** Höchster Zoom, der die echte Auflösung nicht überschreitet. */
  const ceiling = useCallback(() => {
    const c = content();
    if (!c) return MAX_ZOOM;
    const limit = natural.current.w / c.width;
    return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, limit));
  }, [content]);

  const paint = useCallback(() => {
    raf.current = null;
    const next = pending.current;
    const node = lens.current;
    const frameBox = frame.current?.getBoundingClientRect();
    const c = content();
    if (!next || !node || !frameBox || !c) return;

    const px = Math.max(0, Math.min(next.x - c.left, c.width));
    const py = Math.max(0, Math.min(next.y - c.top, c.height));
    const z = factorRef.current;

    const lensX = c.left - frameBox.left + px;
    const lensY = c.top - frameBox.top + py + (next.touch ? TOUCH_OFFSET : 0);

    node.style.transform = `translate3d(${lensX - HALF}px, ${lensY - HALF}px, 0)`;
    node.style.backgroundSize = `${c.width * z}px ${c.height * z}px`;
    node.style.backgroundPosition = `${HALF - px * z}px ${HALF - py * z}px`;
  }, [content]);

  const schedule = useCallback(
    (x: number, y: number, touch: boolean) => {
      pending.current = { x, y, touch };
      last.current = pending.current;
      if (raf.current === null) raf.current = requestAnimationFrame(paint);
    },
    [paint],
  );

  const redraw = useCallback(() => {
    if (!last.current) return;
    pending.current = last.current;
    if (raf.current === null) raf.current = requestAnimationFrame(paint);
  }, [paint]);

  useEffect(() => {
    redraw();
  }, [factor, redraw]);

  useEffect(
    () => () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    },
    [],
  );

  // Mausrad-Zoom (nicht passiv, damit die Seite nicht mitscrollt).
  useEffect(() => {
    const el = frame.current;
    if (!el || !active) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const dy =
        event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 100 : 1);
      setFactor((current) =>
        Math.min(ceiling(), Math.max(MIN_ZOOM, current * Math.exp(-dy * 0.0015))),
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [active, ceiling]);

  function pointerDown(event: React.PointerEvent) {
    if (!active) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinchStart.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y),
        zoom: factorRef.current,
      };
      return;
    }
    setVisible(true);
    schedule(event.clientX, event.clientY, event.pointerType !== "mouse");
  }

  function pointerMove(event: React.PointerEvent) {
    if (!active) return;
    if (pointers.current.has(event.pointerId)) {
      pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    }
    if (pointers.current.size === 2 && pinchStart.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const start = pinchStart.current;
      setFactor(
        Math.min(
          ceiling(),
          Math.max(MIN_ZOOM, (start.zoom * dist) / (start.dist || dist)),
        ),
      );
      return;
    }
    if (event.pointerType === "mouse" && event.buttons === 0 && !visible) {
      setVisible(true);
    }
    schedule(event.clientX, event.clientY, event.pointerType !== "mouse");
  }

  function release(event: React.PointerEvent) {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2) pinchStart.current = null;
    if (pointers.current.size === 0) setVisible(false);
  }

  function step(delta: number) {
    setFactor((current) =>
      Math.min(ceiling(), Math.max(MIN_ZOOM, Math.round((current + delta) * 10) / 10)),
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={frame}
        className={`relative rounded-lg bg-muted ${active ? "cursor-none touch-none select-none" : ""} ${frameClassName}`}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        onPointerLeave={release}
      >
        <img
          ref={image}
          src={src}
          alt={alt}
          onLoad={(event) => {
            natural.current = {
              w: event.currentTarget.naturalWidth,
              h: event.currentTarget.naturalHeight,
            };
            setFactor((current) => Math.min(ceiling(), Math.max(MIN_ZOOM, current)));
          }}
          className="h-full max-h-[70vh] w-full rounded-lg object-contain"
        />
        {active && (
          <span
            ref={lens}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 z-30 rounded-full border border-border/60 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition-opacity duration-150 ease-out will-change-transform"
            style={{
              width: LENS,
              height: LENS,
              opacity: visible ? 1 : 0,
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: "var(--color-background)",
            }}
          >
            <span className="absolute right-3 bottom-3 rounded-full bg-background/85 px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground">
              {factor.toFixed(1)}×
            </span>
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        {active && (
          <div className="flex items-center gap-1 rounded-full border border-border bg-background px-1 py-1">
            <button
              type="button"
              onClick={() => step(-0.5)}
              aria-label="Weniger vergrößern"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-accent"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-10 text-center text-xs text-muted-foreground">
              {factor.toFixed(1)}×
            </span>
            <button
              type="button"
              onClick={() => step(0.5)}
              aria-label="Stärker vergrößern"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-accent"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => {
            setActive((current) => !current);
            setVisible(false);
          }}
          aria-pressed={active}
          aria-label={active ? "Lupe ausschalten" : "Lupe einschalten"}
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-accent"
        >
          {active ? <SearchX className="h-5 w-5" /> : <Search className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}

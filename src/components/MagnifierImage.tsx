import { useRef, useState } from "react";
import { Search, SearchX } from "lucide-react";

/**
 * Bild mit Lupe: Der Zeiger (oder Finger) bewegt eine runde Lupe über das Werk
 * und vergrößert den Ausschnitt, damit Details entdeckt werden können.
 */
export function MagnifierImage({
  src,
  alt,
  zoom = 2.6,
  className = "",
}: {
  src: string;
  alt: string;
  zoom?: number;
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, bgX: 0, bgY: 0 });

  function move(clientX: number, clientY: number) {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    const x = Math.max(0, Math.min(clientX - box.left, box.width));
    const y = Math.max(0, Math.min(clientY - box.top, box.height));
    setPos({
      x,
      y,
      bgX: (x / box.width) * 100,
      bgY: (y / box.height) * 100,
    });
    setVisible(true);
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={frame}
        className={`relative overflow-hidden rounded-lg bg-muted ${active ? "cursor-none touch-none" : ""}`}
        onPointerMove={(event) => active && move(event.clientX, event.clientY)}
        onPointerDown={(event) => active && move(event.clientX, event.clientY)}
        onPointerLeave={() => setVisible(false)}
      >
        <img src={src} alt={alt} className="h-auto w-full object-contain" />
        {active && visible && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute h-40 w-40 rounded-full border-2 border-background shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
            style={{
              left: pos.x - 80,
              top: pos.y - 80,
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${zoom * 100}% ${zoom * 100}%`,
              backgroundPosition: `${pos.bgX}% ${pos.bgY}%`,
            }}
          />
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          setActive((current) => !current);
          setVisible(false);
        }}
        aria-pressed={active}
        className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-3.5 py-2 text-xs font-medium shadow-sm backdrop-blur-md transition-colors hover:bg-accent"
      >
        {active ? <SearchX className="h-4 w-4" /> : <Search className="h-4 w-4" />}
        {active ? "Lupe aus" : "Lupe"}
      </button>
      {active && (
        <p className="mt-2 text-xs text-muted-foreground">
          Bewege die Lupe über das Bild — auf dem Handy mit dem Finger ziehen.
        </p>
      )}
    </div>
  );
}

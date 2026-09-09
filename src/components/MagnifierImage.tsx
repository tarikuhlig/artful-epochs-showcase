import { useRef, useState } from "react";
import { Search, SearchX } from "lucide-react";

/**
 * Bild mit Lupe. Das Werk bleibt immer vollständig sichtbar (object-contain).
 * Der Lupenkreis darf über den Bildrand hinausragen und schwebt auf Touch-Geräten
 * deutlich über dem Finger, damit der Daumen das Detail nicht verdeckt.
 */
export function MagnifierImage({
  src,
  alt,
  zoom = 4.5,
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
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, bgX: 0, bgY: 0 });

  const lensSize = 200;
  const half = lensSize / 2;

  function move(clientX: number, clientY: number, pointerType: string) {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;

    const touch = pointerType === "touch" || pointerType === "pen";

    // Betrachteter Punkt: über die ganze Bildfläche von Rand zu Rand erreichbar.
    const pointX = Math.max(0, Math.min(clientX - box.left, box.width));
    const pointY = Math.max(0, Math.min(clientY - box.top, box.height));

    // Die Linse selbst darf aus dem Bild herausragen — sie wird nicht begrenzt.
    const offsetY = touch ? -150 : 0;

    setPos({
      x: pointX,
      y: pointY + offsetY,
      bgX: (pointX / box.width) * 100,
      bgY: (pointY / box.height) * 100,
    });
    setVisible(true);
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={frame}
        className={`relative rounded-lg bg-muted ${active ? "cursor-none touch-none select-none" : ""} ${frameClassName}`}
        onPointerMove={(event) =>
          active && move(event.clientX, event.clientY, event.pointerType)
        }
        onPointerDown={(event) => {
          if (!active) return;
          event.preventDefault();
          move(event.clientX, event.clientY, event.pointerType);
        }}
        onPointerUp={() => setVisible(false)}
        onPointerLeave={() => setVisible(false)}
      >
        <img
          src={src}
          alt={alt}
          className="h-full max-h-[70vh] w-full rounded-lg object-contain"
        />
        {active && visible && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute z-30 rounded-full border-2 border-background shadow-[0_12px_44px_rgba(0,0,0,0.3)]"
            style={{
              width: lensSize,
              height: lensSize,
              left: pos.x - half,
              top: pos.y - half,
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${zoom * 100}% ${zoom * 100}%`,
              backgroundPosition: `${pos.bgX}% ${pos.bgY}%`,
              backgroundColor: "hsl(var(--muted))",
            }}
          />
        )}
      </div>

      <div className="mt-3 flex items-center justify-end">
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

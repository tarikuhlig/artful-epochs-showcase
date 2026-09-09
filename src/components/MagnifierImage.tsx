import { useRef, useState } from "react";
import { Search, SearchX } from "lucide-react";

/**
 * Bild mit Lupe: Der Zeiger (oder Finger) bewegt eine runde Lupe über dem Werk.
 * Auf Touch-Geräten wird die Lupe versetzt über dem Finger angezeigt, damit der
 * Daumen das vergrößerte Detail nicht verdeckt. Der Ein-/Aus-Schalter steht
 * außerhalb des Bildes, damit das Werk unverdeckt bleibt.
 */
export function MagnifierImage({
  src,
  alt,
  zoom = 4.5,
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
  const [, setIsTouch] = useState(false);

  const lensSize = 160;
  const half = lensSize / 2;

  function move(clientX: number, clientY: number, pointerType: string) {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;

    const isTouchPointer = pointerType === "touch" || pointerType === "pen";
    setIsTouch(isTouchPointer);

    // Der betrachtete Punkt: über die ganze Bildfläche erreichbar, von Rand zu Rand.
    const pointX = Math.max(0, Math.min(clientX - box.left, box.width));
    const pointY = Math.max(0, Math.min(clientY - box.top, box.height));

    // Auf Touch-Geräten schwebt die Linse über dem Finger, damit der Daumen
    // das Detail nicht verdeckt — der betrachtete Punkt bleibt unverändert.
    const offsetY = isTouchPointer ? -120 : 0;
    const offsetX = isTouchPointer ? -10 : 0;

    const x = Math.max(half, Math.min(pointX + offsetX, box.width - half));
    const y = Math.max(half, Math.min(pointY + offsetY, box.height - half));

    setPos({
      x,
      y,
      bgX: (pointX / box.width) * 100,
      bgY: (pointY / box.height) * 100,
    });
    setVisible(true);
  }

  return (
    <div className={`${className}`}>
      <div
        ref={frame}
        className={`relative overflow-hidden rounded-lg bg-muted ${
          active ? "cursor-none touch-none" : ""
        }`}
        onPointerMove={(event) =>
          active && move(event.clientX, event.clientY, event.pointerType)
        }
        onPointerDown={(event) => {
          if (!active) return;
          event.preventDefault();
          move(event.clientX, event.clientY, event.pointerType);
        }}
        onPointerLeave={() => setVisible(false)}
      >
        <img src={src} alt={alt} className="h-auto w-full object-contain" />
        {active && visible && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full border-2 border-background shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
            style={{
              width: lensSize,
              height: lensSize,
              left: pos.x - half,
              top: pos.y - half,
              backgroundImage: `url(${src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${zoom * 100}% ${zoom * 100}%`,
              backgroundPosition: `${pos.bgX}% ${pos.bgY}%`,
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
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
        >
          {active ? (
            <SearchX className="h-4 w-4" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          {active ? "Lupe aus" : "Lupe"}
        </button>
      </div>
    </div>
  );
}

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule10, geoDistance } from "d3-geo";
import { feature } from "topojson-client";
import landTopo from "world-atlas/land-110m.json";

export type GlobeMarker = {
  id: string;
  label: string;
  sublabel?: string;
  lat: number;
  lon: number;
  weight: number;
};

const SIZE = 620;
/** Rundet Zahlen, damit Server- und Browser-Rendering exakt gleich sind. */
const r2 = (n: number) => Math.round(n * 100) / 100;
const round = (d: string) => d.replace(/-?\d+\.\d+/g, (m) => String(r2(Number(m))));
const R = 268;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const landFeature = feature(landTopo as any, (landTopo as any).objects.land) as any;
const graticule = geoGraticule10();

export function OldGlobe({
  markers,
  selectedId,
  onSelect,
}: {
  markers: GlobeMarker[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
}) {
  const [rotation, setRotation] = useState<[number, number]>([-10, -25]);
  const [hovered, setHovered] = useState<string | null>(null);
  const dragging = useRef<{ x: number; y: number } | null>(null);
  const target = useRef<[number, number] | null>(null);
  const rotRef = useRef<[number, number]>([-10, -25]);
  const idle = useRef(true);

  rotRef.current = rotation;

  // Beim Auswählen sanft zum Ort drehen
  useEffect(() => {
    if (!selectedId) return;
    const m = markers.find((x) => x.id === selectedId);
    if (!m) return;
    target.current = [-m.lon, -m.lat];
  }, [selectedId, markers]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 60) / 1000;
      last = now;
      const [l, p] = rotRef.current;
      if (target.current) {
        const [tl, tp] = target.current;
        let dl = ((tl - l + 540) % 360) - 180;
        const dp = tp - p;
        if (Math.abs(dl) < 0.15 && Math.abs(dp) < 0.15) {
          target.current = null;
          setRotation([tl, tp]);
        } else {
          const k = 1 - Math.exp(-4 * dt);
          setRotation([l + dl * k, p + dp * k]);
        }
      } else if (idle.current && !dragging.current && !reduced) {
        setRotation([l + dt * 3.2, p]);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const projection = useMemo(
    () =>
      geoOrthographic()
        .scale(R)
        .translate([SIZE / 2, SIZE / 2])
        .rotate([rotation[0], rotation[1]])
        .clipAngle(90),
    [rotation],
  );

  const path = useMemo(() => geoPath(projection), [projection]);
  const landPath = round(path(landFeature) ?? "");
  const gratPath = round(path(graticule) ?? "");
  const center: [number, number] = [-rotation[0], -rotation[1]];

  const onPointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    dragging.current = { x: e.clientX, y: e.clientY };
    idle.current = false;
    target.current = null;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const d = dragging.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    dragging.current = { x: e.clientX, y: e.clientY };
    setRotation(([l, p]) => [l + dx * 0.28, Math.max(-75, Math.min(75, p - dy * 0.28))]);
  }, []);

  const endDrag = useCallback(() => {
    dragging.current = null;
  }, []);

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full cursor-grab touch-none select-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        role="img"
        aria-label="Interaktiver Globus mit Museumsstandorten"
      >
        <defs>
          <radialGradient id="globe-ocean" cx="34%" cy="28%" r="78%">
            <stop offset="0%" stopColor="var(--globe-ocean-light)" />
            <stop offset="62%" stopColor="var(--globe-ocean)" />
            <stop offset="100%" stopColor="var(--globe-ocean-deep)" />
          </radialGradient>
          <radialGradient id="globe-shade" cx="34%" cy="28%" r="78%">
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(60,40,15,0.35)" />
          </radialGradient>
          <filter id="globe-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="n" />
            <feColorMatrix in="n" type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.16" />
            </feComponentTransfer>
          </filter>
        </defs>

        {/* Messingring */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R + 22}
          fill="none"
          stroke="var(--globe-ring)"
          strokeWidth={3}
          opacity={0.55}
        />
        {Array.from({ length: 72 }).map((_, i) => {
          const a = (i / 72) * Math.PI * 2;
          const r1 = R + 14;
          const rOuter = R + (i % 6 === 0 ? 22 : 18);
          return (
            <line
              key={i}
              x1={r2(SIZE / 2 + Math.cos(a) * r1)}
              y1={r2(SIZE / 2 + Math.sin(a) * r1)}
              x2={r2(SIZE / 2 + Math.cos(a) * rOuter)}
              y2={r2(SIZE / 2 + Math.sin(a) * rOuter)}
              stroke="var(--globe-ring)"
              strokeWidth={i % 6 === 0 ? 1.6 : 0.8}
              opacity={0.5}
            />
          );
        })}

        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="url(#globe-ocean)" />
        <path d={gratPath} fill="none" stroke="var(--globe-ink)" strokeWidth={0.5} opacity={0.22} />
        <path
          d={landPath}
          fill="var(--globe-land)"
          stroke="var(--globe-ink)"
          strokeWidth={0.7}
          strokeLinejoin="round"
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="var(--globe-land)"
          filter="url(#globe-grain)"
          opacity={0.5}
          style={{ mixBlendMode: "multiply" }}
        />
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="url(#globe-shade)" />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="var(--globe-ink)"
          strokeWidth={1.2}
          opacity={0.5}
        />

        {markers.map((m) => {
          const visible = geoDistance([m.lon, m.lat], center) < Math.PI / 2 - 0.02;
          if (!visible) return null;
          const pt = projection([m.lon, m.lat]);
          if (!pt) return null;
          const active = selectedId === m.id || hovered === m.id;
          const r = 3.4 + Math.min(m.weight, 8) * 0.55;
          return (
            <g
              key={m.id}
              transform={`translate(${r2(pt[0])},${r2(pt[1])})`}
              className="cursor-pointer"
              onPointerEnter={() => setHovered(m.id)}
              onPointerLeave={() => setHovered((h) => (h === m.id ? null : h))}
              onClick={() => {
                idle.current = false;
                onSelect(m.id);
              }}
            >
              <circle r={r + 8} fill="transparent" />
              {active && <circle r={r + 6} fill="var(--globe-marker)" opacity={0.18} />}
              <circle
                r={r}
                fill="var(--globe-marker)"
                stroke="var(--globe-marker-ring)"
                strokeWidth={1.4}
              />
              {active && (
                <g>
                  <line x1={0} y1={-r} x2={0} y2={-r - 16} stroke="var(--globe-marker)" strokeWidth={1} />
                  <text
                    x={0}
                    y={-r - 22}
                    textAnchor="middle"
                    className="font-display"
                    fontSize={14}
                    fill="var(--globe-ink)"
                  >
                    {m.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
      <p className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.25em] text-muted-foreground uppercase">
        Ziehen zum Drehen · Punkt antippen
      </p>
    </div>
  );
}

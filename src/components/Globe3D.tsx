import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { geoEquirectangular, geoPath } from "d3-geo";
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

const RADIUS = 1;
const MIN_DIST = 1.55;
const MAX_DIST = 4.2;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const landFeature = feature(landTopo as any, (landTopo as any).objects.land) as any;

function latLonToVec3(lat: number, lon: number, r = RADIUS) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

/** Erdtextur wird im Browser gezeichnet – kein externer Download nötig. */
function makeEarthTexture() {
  const w = 2048;
  const h = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  const ocean = ctx.createLinearGradient(0, 0, 0, h);
  ocean.addColorStop(0, "#cfd9e2");
  ocean.addColorStop(0.5, "#e3e9ee");
  ocean.addColorStop(1, "#cfd9e2");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, w, h);

  const projection = geoEquirectangular()
    .translate([w / 2, h / 2])
    .scale(w / (2 * Math.PI));
  const path = geoPath(projection, ctx);

  // Gradnetz
  ctx.strokeStyle = "rgba(90,110,130,0.22)";
  ctx.lineWidth = 1;
  for (let lon = -180; lon <= 180; lon += 15) {
    const x = ((lon + 180) / 360) * w;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let lat = -75; lat <= 75; lat += 15) {
    const y = ((90 - lat) / 180) * h;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  ctx.beginPath();
  path(landFeature);
  ctx.fillStyle = "#f6f1e7";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#8b7f6b";
  ctx.stroke();

  // feines Papierkorn
  const grain = ctx.getImageData(0, 0, w, h);
  for (let i = 0; i < grain.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 12;
    grain.data[i] = (grain.data[i] ?? 0) + n;
    grain.data[i + 1] = (grain.data[i + 1] ?? 0) + n;
    grain.data[i + 2] = (grain.data[i + 2] ?? 0) + n;
  }
  ctx.putImageData(grain, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

type Ctl = {
  rotX: number;
  rotY: number;
  velX: number;
  velY: number;
  dist: number;
  targetDist: number;
  target: { x: number; y: number } | null;
  dragging: boolean;
  spin: boolean;
};

function Globe({
  markers,
  selectedId,
  onSelect,
  ctl,
}: {
  markers: GlobeMarker[];
  selectedId?: string | null | undefined;
  onSelect: (id: string) => void;
  ctl: React.RefObject<Ctl>;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const texture = useMemo(() => makeEarthTexture(), []);
  const { camera } = useThree();

  useEffect(() => () => texture.dispose(), [texture]);

  // Fly-to: ausgewählte Stadt nach vorne drehen
  useEffect(() => {
    if (!selectedId) return;
    const m = markers.find((x) => x.id === selectedId);
    if (!m) return;
    const v = latLonToVec3(m.lat, m.lon);
    ctl.current.target = {
      y: -Math.atan2(v.x, v.z),
      x: (m.lat * Math.PI) / 180,
    };
    ctl.current.velX = 0;
    ctl.current.velY = 0;
  }, [selectedId, markers, ctl]);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const c = ctl.current;

    if (c.target) {
      const k = 1 - Math.exp(-5 * dt);
      let dy = ((c.target.y - c.rotY + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      const dx = c.target.x - c.rotX;
      if (Math.abs(dy) < 0.002 && Math.abs(dx) < 0.002) {
        c.rotY = c.target.y;
        c.rotX = c.target.x;
        c.target = null;
      } else {
        c.rotY += dy * k;
        c.rotX += dx * k;
      }
    } else if (!c.dragging) {
      c.rotY += c.velY * dt;
      c.rotX += c.velX * dt;
      const damp = Math.exp(-1.8 * dt);
      c.velY *= damp;
      c.velX *= damp;
      if (Math.abs(c.velY) < 0.02 && Math.abs(c.velX) < 0.02 && c.spin) c.rotY += dt * 0.08;
    }
    c.rotX = Math.max(-1.15, Math.min(1.15, c.rotX));

    c.dist += (c.targetDist - c.dist) * (1 - Math.exp(-8 * dt));
    camera.position.set(0, 0, c.dist);
    camera.lookAt(0, 0, 0);

    if (group.current) {
      group.current.rotation.y = c.rotY;
      group.current.rotation.x = c.rotX;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[RADIUS, 96, 96]} />
        <meshStandardMaterial map={texture} roughness={0.95} metalness={0} />
      </mesh>

      {markers.map((m) => {
        const pos = latLonToVec3(m.lat, m.lon, RADIUS * 1.008);
        const active = selectedId === m.id || hovered === m.id;
        const s = (0.014 + Math.min(m.weight, 8) * 0.0022) * (active ? 1.5 : 1);
        return (
          <group key={m.id} position={pos}>
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(m.id);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                setHovered((h) => (h === m.id ? null : h));
                document.body.style.cursor = "";
              }}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(m.id);
              }}
            >
              <sphereGeometry args={[s, 16, 16]} />
              <meshStandardMaterial
                color={active ? "#0f2ea8" : "#1b3fd6"}
                emissive={active ? "#0f2ea8" : "#000000"}
                emissiveIntensity={active ? 0.6 : 0}
                roughness={0.4}
              />
            </mesh>
            {/* größere unsichtbare Trefferfläche für Finger */}
            <mesh
              visible={false}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(m.id);
              }}
            >
              <sphereGeometry args={[Math.max(s * 2.6, 0.045), 8, 8]} />
              <meshBasicMaterial />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function Globe3D({
  markers,
  selectedId,
  onSelect,
}: {
  markers: GlobeMarker[];
  selectedId?: string | null | undefined;
  onSelect: (id: string) => void;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const ctl = useRef<Ctl>({
    rotX: 0.35,
    rotY: 0.3,
    velX: 0,
    velY: 0,
    dist: 3.2,
    targetDist: 2.9,
    target: null,
    dragging: false,
    spin: true,
  });
  const drag = useRef<{ x: number; y: number; t: number; moved: number } | null>(null);
  const pinch = useRef<number | null>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());

  // Wheel / Pinch zoom – nicht-passiver Listener, damit die Seite nicht scrollt
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      const c = ctl.current;
      c.targetDist = Math.max(MIN_DIST, Math.min(MAX_DIST, c.targetDist * Math.exp(dy * 0.0015)));
      c.spin = false;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) {
      const [a, b] = Array.from(pointers.current.values());
      if (a && b) pinch.current = Math.hypot(a.x - b.x, a.y - b.y);
      return;
    }
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, t: performance.now(), moved: 0 };
    ctl.current.dragging = true;
    ctl.current.spin = false;
    ctl.current.target = null;
    ctl.current.velX = 0;
    ctl.current.velY = 0;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointers.current.has(e.pointerId))
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = Array.from(pointers.current.values());
      if (!a || !b) return;
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const c = ctl.current;
      c.targetDist = Math.max(MIN_DIST, Math.min(MAX_DIST, c.targetDist * (pinch.current / d)));
      pinch.current = d;
      return;
    }

    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    const now = performance.now();
    const dt = Math.max((now - d.t) / 1000, 0.001);
    drag.current = { x: e.clientX, y: e.clientY, t: now, moved: d.moved + Math.abs(dx) + Math.abs(dy) };
    const c = ctl.current;
    c.rotY += dx * 0.006;
    c.rotX = Math.max(-1.15, Math.min(1.15, c.rotX + dy * 0.006));
    // Schwung merken – beim Loslassen dreht die Kugel weiter
    c.velY = (dx * 0.006) / dt;
    c.velX = (dy * 0.006) / dt;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (!drag.current) return;
    const idle = performance.now() - drag.current.t > 120;
    drag.current = null;
    ctl.current.dragging = false;
    if (idle) {
      ctl.current.velX = 0;
      ctl.current.velY = 0;
    }
    // Schwung begrenzen
    ctl.current.velY = Math.max(-6, Math.min(6, ctl.current.velY));
    ctl.current.velX = Math.max(-4, Math.min(4, ctl.current.velX));
  };

  const zoom = (factor: number) => {
    const c = ctl.current;
    c.targetDist = Math.max(MIN_DIST, Math.min(MAX_DIST, c.targetDist * factor));
  };

  return (
    <div className="relative w-full min-w-0 select-none">
      <div
        ref={wrap}
        className="aspect-square w-full max-w-full overflow-hidden cursor-grab touch-none active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        <Canvas
          camera={{ position: [0, 0, 3.2], fov: 42 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ touchAction: "none", width: "100%", height: "100%" }}
        >
          <ambientLight intensity={1.1} />
          <directionalLight position={[3, 2, 4]} intensity={1.4} />
          <directionalLight position={[-4, -1, -2]} intensity={0.35} color="#c8d4e6" />
          <Globe markers={markers} selectedId={selectedId} onSelect={onSelect} ctl={ctl} />
        </Canvas>
      </div>

      <div className="absolute right-2 bottom-4 flex flex-col gap-2 sm:right-4">
        <button
          type="button"
          aria-label="Näher heranzoomen"
          onClick={() => zoom(1 / 1.25)}
          className="h-10 w-10 rounded-full border border-input bg-background/90 text-lg text-foreground backdrop-blur transition-colors hover:bg-accent"
        >
          +
        </button>
        <button
          type="button"
          aria-label="Herauszoomen"
          onClick={() => zoom(1.25)}
          className="h-10 w-10 rounded-full border border-input bg-background/90 text-lg text-foreground backdrop-blur transition-colors hover:bg-accent"
        >
          −
        </button>
      </div>

      <p className="mt-2 text-center text-[10px] tracking-[0.2em] text-muted-foreground uppercase sm:text-[11px]">
        Ziehen und anstoßen · Scrollen oder zwei Finger zum Zoomen
      </p>
    </div>
  );
}

export default Globe3D;

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
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
const MIN_DIST = 2.45;
const MAX_DIST = 5;

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

/** Antiker Pergament-Globus – im Browser gezeichnet, kein externer Download nötig. */
function makeEarthTexture() {
  const w = 2048;
  const h = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  // Vergilbtes Pergament als Meer
  const ocean = ctx.createLinearGradient(0, 0, 0, h);
  ocean.addColorStop(0, "#cbb188");
  ocean.addColorStop(0.5, "#e6d3a8");
  ocean.addColorStop(1, "#cbb188");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, w, h);

  // Altersflecken
  for (let i = 0; i < 240; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = 20 + Math.random() * 120;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(120,88,48,${0.03 + Math.random() * 0.05})`);
    g.addColorStop(1, "rgba(120,88,48,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const projection = geoEquirectangular()
    .translate([w / 2, h / 2])
    .scale(w / (2 * Math.PI));
  const path = geoPath(projection, ctx);

  // Kompass-/Rhumbenlinien wie auf alten Portolankarten
  ctx.strokeStyle = "rgba(140,105,60,0.18)";
  ctx.lineWidth = 1;
  for (const cx of [w * 0.28, w * 0.72]) {
    const cy = h * 0.5;
    for (let a = 0; a < 32; a++) {
      const ang = (a / 32) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(ang) * w, cy + Math.sin(ang) * w);
      ctx.stroke();
    }
  }

  // Gradnetz
  ctx.strokeStyle = "rgba(120,90,50,0.3)";
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
  // Äquator und Wendekreise betont
  ctx.strokeStyle = "rgba(110,75,40,0.55)";
  ctx.lineWidth = 2.5;
  for (const lat of [0, 23.44, -23.44]) {
    const y = ((90 - lat) / 180) * h;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Landmassen in Sepia mit Tuschekontur
  ctx.beginPath();
  path(landFeature);
  ctx.fillStyle = "#c9a86d";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#5b4022";
  ctx.stroke();

  // Küstenschraffur
  ctx.save();
  ctx.beginPath();
  path(landFeature);
  ctx.clip();
  ctx.strokeStyle = "rgba(91,64,34,0.16)";
  ctx.lineWidth = 1;
  for (let x = -h; x < w; x += 9) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + h, h);
    ctx.stroke();
  }
  ctx.restore();

  // feines Papierkorn
  const grain = ctx.getImageData(0, 0, w, h);
  for (let i = 0; i < grain.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 16;
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
    <group>
      <group ref={group} rotation-z={-0.12}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[RADIUS, 96, 96]} />
          <meshStandardMaterial map={texture} roughness={0.82} metalness={0} />
        </mesh>

        {markers.map((m, index) => {
        const active = selectedId === m.id || hovered === m.id;
        const normal = latLonToVec3(m.lat, m.lon, 1).normalize();
        const pos = normal.clone().multiplyScalar(RADIUS * 0.995);
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          normal,
        );
        const len = (0.13 + Math.min(m.weight, 8) * 0.004) * (active ? 1.18 : 1);
        const head = (0.026 + Math.min(m.weight, 8) * 0.0015) * (active ? 1.28 : 1);
        const pick = (e: { stopPropagation: () => void }) => {
          e.stopPropagation();
          onSelect(m.id);
        };
        return (
          <group key={m.id} position={pos} quaternion={quat}>
            {/* Lange silberne Schmucknadel */}
            <mesh position={[0, len / 2, 0]}>
              <cylinderGeometry args={[0.0042, 0.002, len, 10]} />
              <meshStandardMaterial color="#d8cfbd" metalness={0.92} roughness={0.22} />
            </mesh>
            <group
              position={[0, len + head * 0.7, 0]}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(m.id);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                setHovered((h) => (h === m.id ? null : h));
                document.body.style.cursor = "";
              }}
              onClick={pick}
            >
              <mesh rotation-x={Math.PI / 2}>
                <cylinderGeometry args={[head * 1.14, head * 0.95, head * 0.42, index % 3 === 0 ? 12 : 24]} />
                <meshStandardMaterial
                  color={active ? "#1237c7" : index % 3 === 0 ? "#3199a6" : index % 3 === 1 ? "#c65c37" : "#caa14a"}
                  emissive={active ? "#1237c7" : "#000000"}
                  emissiveIntensity={active ? 0.34 : 0}
                  roughness={0.32}
                  metalness={index % 3 === 2 ? 0.72 : 0.18}
                />
              </mesh>
              <mesh position={[0, head * 0.26, 0]} rotation={[0, Math.PI / 4, 0]}>
                <octahedronGeometry args={[head * 0.6, 0]} />
                <meshStandardMaterial color="#e3c778" metalness={0.95} roughness={0.18} />
              </mesh>
              <mesh position={[0, head * 0.42, 0]}>
                <sphereGeometry args={[head * 0.22, 12, 12]} />
                <meshStandardMaterial color={active ? "#f7efe0" : "#614222"} metalness={0.65} roughness={0.2} />
              </mesh>
            </group>
            {/* größere unsichtbare Trefferfläche für Finger */}
            <mesh visible={false} position={[0, len * 0.8, 0]} onClick={pick}>
              <sphereGeometry args={[Math.max(head * 3, 0.05), 8, 8]} />
              <meshBasicMaterial />
            </mesh>
          </group>
        );
        })}
      </group>

      <GlobeStand />
    </group>
  );
}

function GlobeStand() {
  const wood = "#4a2614";
  const darkWood = "#24120b";
  const brass = "#9b7136";
  return (
    <group>
      {/* Fester Messingbügel und hölzerner Äquatorring wie beim Referenzglobus */}
      <mesh rotation={[0, Math.PI / 2, -0.12]} castShadow>
        <torusGeometry args={[RADIUS * 1.055, 0.025, 14, 128]} />
        <meshStandardMaterial color={brass} metalness={0.88} roughness={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[1.15, 0.07, 18, 128]} />
        <meshStandardMaterial color={darkWood} roughness={0.48} metalness={0.08} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.018, 10, 128]} />
        <meshStandardMaterial color={brass} metalness={0.82} roughness={0.28} />
      </mesh>

      {/* Gedrechselte Stützen */}
      {[
        [-0.86, 0.22],
        [0.86, 0.22],
        [-0.82, -0.42],
        [0.82, -0.42],
      ].map(([x, z], i) => (
        <group key={i} position={[x, -0.77, z]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.072, 0.09, 1.25, 20]} />
            <meshStandardMaterial color={wood} roughness={0.54} />
          </mesh>
          {[-0.42, -0.18, 0.22, 0.45].map((y) => (
            <mesh key={y} position-y={y} castShadow>
              <torusGeometry args={[0.09, 0.025, 10, 20]} />
              <meshStandardMaterial color={darkWood} roughness={0.48} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Schwerer runder Fuß mit konzentrischen Holzringen */}
      <mesh position-y={-1.47} castShadow receiveShadow>
        <cylinderGeometry args={[0.78, 0.86, 0.16, 64]} />
        <meshStandardMaterial color={wood} roughness={0.52} />
      </mesh>
      {[0.22, 0.42, 0.62].map((r) => (
        <mesh key={r} position-y={-1.382} rotation-x={Math.PI / 2}>
          <torusGeometry args={[r, 0.011, 8, 64]} />
          <meshStandardMaterial color={brass} metalness={0.35} roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, -1.31, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.18, 0.36, 24]} />
        <meshStandardMaterial color={darkWood} roughness={0.48} />
      </mesh>
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
    dist: 3.75,
    targetDist: 3.55,
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
          shadows
          camera={{ position: [0, 0, 3.75], fov: 42 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ touchAction: "none", width: "100%", height: "100%" }}
        >
           <ambientLight intensity={0.62} color="#ffe9c9" />
           <directionalLight position={[3.5, 3.5, 4]} intensity={1.75} color="#ffe1b5" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
           <directionalLight position={[-4, -1, -2]} intensity={0.4} color="#9b784e" />
           <Environment>
             <Lightformer intensity={1.6} position={[3, 4, 4]} scale={[4, 5, 1]} />
             <Lightformer intensity={0.55} color="#b98958" position={[-4, 1, 1]} rotation-y={Math.PI / 2} scale={[4, 3, 1]} />
           </Environment>
          <Globe markers={markers} selectedId={selectedId} onSelect={onSelect} ctl={ctl} />
           <mesh position={[0, -1.57, 0]} rotation-x={-Math.PI / 2} receiveShadow>
             <circleGeometry args={[1.15, 64]} />
             <shadowMaterial transparent opacity={0.24} />
           </mesh>
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

      <p className="mx-auto mt-2 w-fit rounded-full bg-background/80 px-3 py-1 text-center text-[10px] tracking-[0.2em] text-muted-foreground uppercase backdrop-blur sm:text-[11px]">
        Ziehen und anstoßen · Scrollen oder zwei Finger zum Zoomen
      </p>
    </div>
  );
}

export default Globe3D;

import { useEffect } from "react";
import { ProvenanceLogo } from "@/components/ProvenanceLogo";
import { allWorks } from "@/lib/art-data";

const TILES = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2 + i * 0.43;
  const radius = 26 + ((i * 13) % 30);
  return {
    work: allWorks[(i * 37) % allWorks.length]!,
    tx: `${Math.round(Math.cos(angle) * radius)}vw`,
    ty: `${Math.round(Math.sin(angle) * radius)}vh`,
    rot: `${((i * 47) % 24) - 12}deg`,
    delay: `${(i * 0.075).toFixed(3)}s`,
    size: 105 + ((i * 29) % 155),
  };
});

/** Vier Sekunden: beschleunigender Bilderstrahl, Wortmarke und ruhiger Tondo-Abschluss. */
export function IntroTunnel({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      aria-hidden
      className="intro-veil fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
      style={{ perspective: "1100px" }}
    >
      {TILES.map((t, i) => (
        <img
          key={i}
          src={t.work.image}
          alt=""
          className="tunnel-tile absolute top-1/2 left-1/2 rounded-sm border-[4px] border-card object-cover shadow-xl"
          style={
            {
              width: `${t.size}px`,
              height: `${Math.round(t.size * 1.2)}px`,
              "--tx": t.tx,
              "--ty": t.ty,
              "--rot": t.rot,
              "--delay": t.delay,
            } as React.CSSProperties
          }
        />
      ))}
      <div className="intro-wordmark absolute inset-0 z-10 flex items-center justify-center px-5">
        <ProvenanceLogo className="max-w-full" />
      </div>
      <div className="intro-tondo absolute z-20 flex aspect-square w-[min(46vw,230px)] items-center justify-center overflow-hidden rounded-full border border-foreground bg-background">
        <ProvenanceLogo mark className="-translate-y-[0.02em]" />
      </div>
    </div>
  );
}

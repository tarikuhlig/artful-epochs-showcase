import { useEffect, useState } from "react";
import provenanceLogo from "@/assets/provenance-logo.png";
import { allWorks } from "@/lib/art-data";

const TILES = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2 + i * 0.37;
  const radius = 30 + ((i * 13) % 26);
  return {
    work: allWorks[(i * 37) % allWorks.length]!,
    tx: `${Math.round(Math.cos(angle) * radius)}vw`,
    ty: `${Math.round(Math.sin(angle) * radius)}vh`,
    rot: `${((i * 47) % 24) - 12}deg`,
    delay: `${-(i * 0.14).toFixed(2)}s`,
    dur: `${(2.2 + ((i * 7) % 9) / 10).toFixed(2)}s`,
    size: 120 + ((i * 29) % 140),
  };
});

const DURATION = 2600;

export function IntroTunnel() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    console.log("intro-effect");
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("provenance-intro") === "done") return;
    sessionStorage.setItem("provenance-intro", "done");
    setShow(true);
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setLeaving(true), DURATION - 500);
    const t2 = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, DURATION);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden
      onClick={() => setShow(false)}
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      style={{ perspective: "900px" }}
    >
      {TILES.map((t, i) => (
        <img
          key={i}
          src={t.work.image}
          alt=""
          className="tunnel-tile absolute top-1/2 left-1/2 rounded-sm border-[5px] border-card object-cover shadow-[0_24px_60px_-24px_rgba(0,0,0,0.4)]"
          style={
            {
              width: `${t.size}px`,
              height: `${Math.round(t.size * 1.2)}px`,
              "--tx": t.tx,
              "--ty": t.ty,
              "--rot": t.rot,
              "--dur": t.dur,
              "--delay": t.delay,
            } as React.CSSProperties
          }
        />
      ))}
      <img
        src={provenanceLogo}
        alt="Provenance"
        width={1920}
        height={640}
        className={`relative z-10 w-[min(72vw,620px)] transition-all duration-500 ${
          leaving ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
        style={{ animation: "intro-float 2.6s ease-in-out" }}
      />
    </div>
  );
}

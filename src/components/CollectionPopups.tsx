import { useEffect, useState } from "react";
import { onCollected, type CollectedItem } from "@/lib/collection-events";
import { allPainters, allWorks, epochs } from "@/lib/art-data";
import { UnlockDialog, type UnlockInfo } from "@/components/UnlockDialog";

/** Wandelt ein gesammeltes Element in Text und Bild für das Glückwunsch-Fenster um. */
function describe(item: CollectedItem): UnlockInfo | null {
  if (item.kind === "painter") {
    const painter = allPainters.find((entry) => entry.slug === item.slug);
    if (!painter) return null;
    const work = allWorks.find((entry) => entry.painter.slug === painter.slug);
    return {
      title: painter.name,
      subtitle: `Künstler gesammelt · ${painter.life ?? ""}`.trim(),
      ...(work ? { image: work.image } : {}),
    };
  }
  if (item.kind === "work") {
    const work = allWorks.find((entry) => entry.id === item.slug);
    if (!work) return null;
    return { title: work.title, subtitle: `Werk gesammelt · ${work.painter.name}`, image: work.image };
  }
  if (item.kind === "epoch") {
    const epoch = epochs.find((entry) => entry.slug === item.slug);
    if (!epoch) return null;
    return { title: epoch.name, subtitle: `Epoche gesammelt · ${epoch.period}` };
  }
  return null;
}

/**
 * Zeigt überall in der App ein Glückwunsch-Fenster, sobald ein Künstler, Werk
 * oder eine Epoche neu in der Sammlung landet — beim Lernen wie beim Ankauf.
 */
export function CollectionPopups() {
  const [queue, setQueue] = useState<UnlockInfo[]>([]);

  useEffect(() => {
    return onCollected((item) => {
      const info = describe(item);
      if (!info) return;
      setQueue((current) => (current.some((entry) => entry.title === info.title) ? current : [...current, info]));
    });
  }, []);

  return <UnlockDialog unlock={queue[0] ?? null} onClose={() => setQueue((current) => current.slice(1))} />;
}

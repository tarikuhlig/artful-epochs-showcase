/**
 * Kleines Signal für neu gesammelte Inhalte (Künstler, Werke, Epochen, Museen).
 * Läuft rein im Browser über ein Fenster-Ereignis — ohne zusätzliche Abfragen.
 */
export type CollectedKind = "painter" | "work" | "epoch" | "museum";

export type CollectedItem = { kind: CollectedKind; slug: string };

const EVENT = "provenance:collected";

export function emitCollected(item: CollectedItem) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<CollectedItem>(EVENT, { detail: item }));
}

export function onCollected(handler: (item: CollectedItem) => void) {
  if (typeof window === "undefined") return () => {};
  const listener = (event: Event) => handler((event as CustomEvent<CollectedItem>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}

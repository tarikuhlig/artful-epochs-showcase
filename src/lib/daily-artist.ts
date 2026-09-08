import { allPainters, allWorks, styles } from "@/lib/art-data";

export function todayISO(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

/** Deterministische, über die ganze Sammlung streuende Reihenfolge der Künstler. */
const ORDER = [...allPainters]
  .map((painter, index) => ({
    painter,
    key: (index * 2654435761) % (allPainters.length * 97 + 13),
  }))
  .sort((a, b) => a.key - b.key)
  .map((entry) => entry.painter);

function dayIndex(dateISO: string) {
  const days = Math.floor(Date.parse(`${dateISO}T00:00:00Z`) / 86_400_000);
  return ((days % ORDER.length) + ORDER.length) % ORDER.length;
}

export function painterOfTheDay(dateISO = todayISO()) {
  return ORDER[dayIndex(dateISO)]!;
}

export function shiftDate(dateISO: string, days: number) {
  const date = new Date(`${dateISO}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return todayISO(date);
}

export function recentPainters(count = 6, dateISO = todayISO()) {
  return Array.from({ length: count }, (_, i) => {
    const iso = shiftDate(dateISO, -(i + 1));
    return { date: iso, painter: painterOfTheDay(iso) };
  });
}

export function worksOfPainter(slug: string) {
  const seen = new Set<string>();
  return allWorks.filter((work) => {
    if (work.painter.slug !== slug) return false;
    const key = work.title.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function styleLabel(slug: string) {
  return styles.find((style) => style.slug === slug)?.name ?? slug;
}

const FOCUS = [
  {
    title: "Schau auf die Handschrift",
    text: "Vergleiche zwei Werke dieses Künstlers: Wo ist der Pinsel schnell, wo geduldig? Die Handschrift verrät mehr über die Haltung als das Motiv.",
  },
  {
    title: "Suche das wiederkehrende Motiv",
    text: "Fast jeder Künstler hat ein Thema, das ihn nicht loslässt. Finde es in den Werken unten — und frage dich, warum es ihn festhält.",
  },
  {
    title: "Denke die Zeit mit",
    text: "Was geschah in diesen Lebensjahren politisch und technisch? Kunst ist immer auch eine Antwort auf ihre Gegenwart.",
  },
  {
    title: "Achte auf die Farbwahl",
    text: "Welche Farben tauchen immer wieder auf? Eine persönliche Palette ist ein Fingerabdruck — und oft eine bewusste Abgrenzung.",
  },
  {
    title: "Frage nach dem Bruch",
    text: "Wo weicht dieser Künstler von seinen Vorgängern ab? Genau dort beginnt meist das, was später als eigener Stil gilt.",
  },
];

export function focusOfTheDay(dateISO = todayISO()) {
  const seed = [...dateISO].reduce((acc, char) => acc * 31 + char.charCodeAt(0), 11);
  return FOCUS[Math.abs(seed) % FOCUS.length]!;
}

export function formatDate(dateISO: string) {
  return new Date(`${dateISO}T00:00:00Z`).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    timeZone: "UTC",
  });
}

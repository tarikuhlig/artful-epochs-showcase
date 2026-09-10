import { useMemo, useState } from "react";
import { glossary, type GlossaryEntry } from "@/lib/art-path-glossary";

/**
 * Zeigt einen Fließtext, in dem jeder bekannte Fachbegriff antippbar ist.
 * Ein Tipp öffnet die kurze Erklärung direkt darunter — niemand muss die
 * Reise verlassen, um ein Wort nachzuschlagen.
 */

const sorted = [...glossary].sort((a, b) => b.term.length - a.term.length);

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const pattern = new RegExp(`(?<![\\p{L}])(${sorted.map((entry) => escapeRegExp(entry.term)).join("|")})(?![\\p{L}])`, "giu");

function findEntry(word: string): GlossaryEntry | undefined {
  return sorted.find((entry) => entry.term.toLowerCase() === word.toLowerCase());
}

export function GlossaryText({ text, className }: { text: string; className?: string }) {
  const [open, setOpen] = useState<GlossaryEntry | null>(null);
  const parts = useMemo(() => text.split(pattern), [text]);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const entry = index % 2 === 1 ? findEntry(part) : undefined;
        if (!entry) return <span key={index}>{part}</span>;
        return (
          <button
            key={index}
            type="button"
            onClick={() => setOpen(open?.term === entry.term ? null : entry)}
            className="decoration-muted-foreground/60 underline decoration-dotted underline-offset-4 transition-colors hover:text-foreground"
            aria-label={`${entry.term} erklären`}
          >
            {part}
          </button>
        );
      })}
      {open && (
        <span className="mt-4 block rounded-lg bg-path-leaf p-4 text-sm leading-relaxed">
          <span className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">{open.kind === "ort" ? "Ort" : "Begriff"}</span>
          <span className="mt-1 block font-medium">{open.term}</span>
          <span className="mt-1 block text-muted-foreground">{open.text}</span>
        </span>
      )}
    </span>
  );
}

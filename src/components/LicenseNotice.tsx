import { ShieldCheck } from "lucide-react";

/**
 * Rechtssicherer Hinweis für alle Premium-/Bezahlbereiche:
 * abgebildet werden ausschließlich gemeinfreie Werke.
 */
export function LicenseNotice({ context }: { context?: string }) {
  return (
    <aside className="mt-14 flex gap-3 rounded-xl border border-border bg-muted/40 p-5 text-xs leading-relaxed text-muted-foreground">
      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
      <div>
        <p className="font-medium text-foreground">Urheberrecht &amp; Bildnachweis</p>
        <p className="mt-1">
          {context ? `${context} ` : ""}Alle hier gezeigten Abbildungen sind gemeinfrei
          (Public Domain) und stammen überwiegend von Wikimedia Commons; die Schutzfrist der
          Urheberrechte ist abgelaufen. Noch geschützte Kunst wird in Provenance grundsätzlich
          <strong className="text-foreground"> nicht abgebildet</strong>, sondern nur beschrieben und
          zur offiziellen Seite des Museums oder Nachlasses verlinkt (Bereich „Moderne &amp;
          Gegenwart“).
        </p>
        <p className="mt-2">
          Texte, Lernkarten und Quizfragen sind eigene redaktionelle Inhalte. Das Abo bezahlt die
          Lern- und Sammelfunktionen der App, nicht Bildrechte an einzelnen Werken. Hinweise zu einer
          Abbildung? Schreib uns — wir prüfen und entfernen sie umgehend.
        </p>
      </div>
    </aside>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/rechte")({
  head: () => ({
    meta: [
      { title: "Bildnachweis & Rechte — Provenance" },
      {
        name: "description",
        content:
          "Woher die Abbildungen in Provenance stammen, warum sie gemeinfrei sind und wie geschützte Kunst behandelt wird.",
      },
      { property: "og:title", content: "Bildnachweis & Rechte — Provenance" },
      {
        property: "og:description",
        content: "Gemeinfreie Abbildungen, eigene Texte, geschützte Kunst nur verlinkt.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RightsPage,
});

function RightsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pt-10 pb-16 sm:px-6">
      <h1 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
        Bildnachweis &amp; Rechte
      </h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-base font-medium text-foreground">Abbildungen</h2>
          <p className="mt-2">
            Alle in Provenance gezeigten Gemälde sind gemeinfrei (Public Domain): Die Schutzfrist
            ist abgelaufen. Die Reproduktionen stammen überwiegend von Wikimedia Commons sowie aus
            digitalen Sammlungen von Museen, die ihre Aufnahmen gemeinfreier Werke freigeben.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-foreground">Geschützte Kunst</h2>
          <p className="mt-2">
            Noch urheberrechtlich geschützte Kunst wird grundsätzlich nicht abgebildet. Im Bereich{" "}
            <Link to="/moderne" className="underline underline-offset-2 hover:text-foreground">
              Moderne &amp; Gegenwart
            </Link>{" "}
            findest du stattdessen eigene Beschreibungen, Analysen und einen direkten Weg zur
            offiziellen Seite des Museums oder Nachlasses.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-foreground">Texte und Lerninhalte</h2>
          <p className="mt-2">
            Biografien, Lernkarten, Quizfragen und Reisetexte sind eigene redaktionelle Inhalte. Ein
            Abo bezahlt die Lern-, Sammel- und Spielfunktionen der App, nicht Bildrechte an
            einzelnen Werken.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-foreground">Hinweis zu einer Abbildung?</h2>
          <p className="mt-2">
            Wenn du glaubst, dass eine Abbildung nicht gemeinfrei ist, schreib uns. Wir prüfen den
            Fall und entfernen das Bild umgehend.
          </p>
        </section>
      </div>
    </div>
  );
}

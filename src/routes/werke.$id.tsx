import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { findWork } from "@/lib/art-data";

export const Route = createFileRoute("/werke/$id")({
  loader: ({ params }) => {
    const work = findWork(params.id);
    if (!work) throw notFound();
    return work;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.title} (${loaderData.year}) — ${loaderData.painter.name} | Provenance`,
          },
          { name: "description", content: loaderData.description },
          {
            property: "og:title",
            content: `${loaderData.title} — ${loaderData.painter.name} | Provenance`,
          },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Werk nicht gefunden | Provenance" }, { name: "robots", content: "noindex" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  const work = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <Link
        to="/maler/$slug"
        params={{ slug: work.painter.slug }}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {work.painter.name}
      </Link>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.4fr_1fr]">
        <figure className="overflow-hidden rounded-2xl border border-border bg-muted">
          <img
            src={work.image}
            alt={`${work.title} von ${work.painter.name}`}
            className="h-auto w-full object-contain"
          />
        </figure>
        <div className="lg:sticky lg:top-8">
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            {work.year} · {work.epoch.name}
          </p>
          <h1 className="font-display mt-2 text-4xl font-medium tracking-tight md:text-5xl">
            {work.title}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {work.description}
          </p>
          <Link
            to="/maler/$slug"
            params={{ slug: work.painter.slug }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Mehr von {work.painter.name}
          </Link>
          <p className="mt-6 text-xs text-muted-foreground">
            Abbildung: Wikimedia Commons (gemeinfrei)
          </p>
        </div>
      </div>
    </div>
  );
}

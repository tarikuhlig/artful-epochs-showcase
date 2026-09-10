import { useEffect, useState } from "react";
import { Eye, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toolsForStation } from "@/lib/art-path-tools";

export function AtelierTools({
  stationIndex,
  workTitle,
  technique,
}: {
  stationIndex: number;
  workTitle: string;
  technique: string;
}) {
  const tools = toolsForStation(stationIndex);
  const [selected, setSelected] = useState(0);
  const current = tools[selected] ?? tools[0];

  useEffect(() => setSelected(0), [stationIndex]);
  if (!current) return null;

  return (
    <div className="mt-7 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
      <div className="order-1 flex min-h-64 items-center justify-center rounded-lg bg-muted/60 p-5 md:min-h-80">
        <img
          src={current.image}
          alt={current.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="aspect-square max-h-80 w-full object-contain"
        />
      </div>

      <div className="order-2 min-w-0">
        <div className="flex flex-wrap gap-2" aria-label="Werkzeuge dieser Station">
          {tools.map((item, index) => (
            <Button
              key={item.name}
              type="button"
              variant={selected === index ? "default" : "outline"}
              size="sm"
              onClick={() => setSelected(index)}
              className="h-auto min-h-10 rounded-full px-4 font-normal"
            >
              {item.name}
            </Button>
          ))}
        </div>

        <div key={current.name} className="animate-in fade-in mt-6 duration-300">
          <p className="font-display text-2xl font-medium">{current.name}</p>
          <p className="mt-2 leading-relaxed text-muted-foreground">{current.role}</p>

          <div className="mt-5 grid gap-4 text-sm leading-relaxed">
            <div className="flex items-start gap-3">
              <Hand className="mt-0.5 h-4 w-4 shrink-0" />
              <div><p className="font-medium">So wurde es benutzt</p><p className="mt-1 text-muted-foreground">{current.use}</p></div>
            </div>
            <div className="flex items-start gap-3 border-t border-border pt-4">
              <Eye className="mt-0.5 h-4 w-4 shrink-0" />
              <div><p className="font-medium">Spur im Werk</p><p className="mt-1 text-muted-foreground">In „{workTitle}“ zeigt sich das Werkzeug in der Arbeitsweise: {technique}</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
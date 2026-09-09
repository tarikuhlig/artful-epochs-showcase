import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Compass, Map, GraduationCap, Gavel, Images, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

type Step = { icon: LucideIcon; title: string; text: string };

const STEPS: Step[] = [
  {
    icon: Sparkles,
    title: "Willkommen bei Provenance",
    text: "Hier lernst du die großen Maler, ihre Epochen und ihre Werke kennen — geordnet, ruhig und Schritt für Schritt.",
  },
  {
    icon: Compass,
    title: "Entdecken",
    text: "Jeden Tag warten ein Werk des Tages und ein Künstler des Tages mit kurzem Lernstoff und zwei Fragen auf dich.",
  },
  {
    icon: Map,
    title: "Die Reise",
    text: "30 Stationen führen dich von der Gotik bis ins Bauhaus. Jede Station erklärt Farben, Materialien und Techniken — am Ende öffnet eine Frage die nächste Station.",
  },
  {
    icon: GraduationCap,
    title: "Studieren",
    text: "Unendlich viele Lernkarten, nach Epoche und Frageart einstellbar. Für richtige Antworten gibt es Coins.",
  },
  {
    icon: Gavel,
    title: "Auktionshaus & Sammlung",
    text: "Mit deinen Coins ersteigerst du Meisterwerke. Alles, was du kaufst oder auf der Reise lernst, landet in deiner Sammlung.",
  },
  {
    icon: Images,
    title: "Deine Galerie",
    text: "In der Galerie siehst du Level, Punkte, Coins, deine Serie und was dir noch bis zur Vollsammlung fehlt.",
  },
];

/** Einmalige Einführung nach der Anmeldung — auf allen Geräten. */
export function AppTour() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);
  const [closed, setClosed] = useState(false);

  const tour = useQuery({
    queryKey: ["app-tour", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("tour_completed_at")
        .eq("id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data?.tour_completed_at ?? null;
    },
  });

  if (!user || closed || tour.isLoading || tour.data) return null;

  async function finish() {
    setClosed(true);
    if (!user) return;
    await supabase
      .from("profiles")
      .update({ tour_completed_at: new Date().toISOString() })
      .eq("id", user.id);
    void queryClient.invalidateQueries({ queryKey: ["app-tour", user.id] });
  }

  const current = STEPS[step]!;
  const Icon = current.icon;
  const last = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[120] flex items-end justify-center bg-foreground/30 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md rounded-3xl border border-border bg-background p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-xl sm:p-8 sm:pb-8">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-border">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-medium">{current.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{current.text}</p>

        <div className="mt-6 flex items-center gap-1.5" aria-hidden>
          {STEPS.map((entry, index) => (
            <span
              key={entry.title}
              className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-foreground" : "bg-border"}`}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Schritt {step + 1} von {STEPS.length}
        </p>

        <div className="mt-6 grid grid-cols-[auto_1fr] items-center gap-3">
          <button
            type="button"
            onClick={() => void finish()}
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Überspringen
          </button>
          <div className="flex justify-end gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((value) => value - 1)}
                className="inline-flex h-10 items-center rounded-full border border-input px-5 text-sm font-medium transition-colors hover:bg-accent"
              >
                Zurück
              </button>
            )}
            <button
              type="button"
              onClick={() => (last ? void finish() : setStep((value) => value + 1))}
              className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {last ? "Los geht's" : "Weiter"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

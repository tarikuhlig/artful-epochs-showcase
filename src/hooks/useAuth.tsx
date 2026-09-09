import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setLoading(false);
    });
    const sync = () => {
      void supabase.auth.getSession().then(({ data: { session: current } }) => {
        setSession(current);
        setLoading(false);
      });
    };
    sync();
    // Auf iOS wird die Anmeldung oft in einem zweiten Tab abgeschlossen —
    // beim Zurückkehren die Sitzung erneut lesen.
    const onVisible = () => {
      if (document.visibilityState === "visible") sync();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", sync);
    return () => {
      data.subscription.unsubscribe();
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", sync);
    };
  }, []);

  return { session, user: (session?.user ?? null) as User | null, loading };
}

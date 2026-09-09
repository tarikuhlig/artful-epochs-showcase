import { supabase } from "@/integrations/supabase/client";

const STAY_KEY = "provenance-stay-signed-in";
const ACTIVE_KEY = "provenance-session-active";

/** Merkt sich, ob der Nutzer dauerhaft angemeldet bleiben möchte. */
export function setStaySignedIn(stay: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STAY_KEY, stay ? "1" : "0");
  sessionStorage.setItem(ACTIVE_KEY, "1");
}

export function getStaySignedIn() {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(STAY_KEY) !== "0";
}

export function markSessionActive() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ACTIVE_KEY, "1");
}

/**
 * Beendet die Sitzung beim Neustart der App nur dann, wenn der Nutzer
 * „Angemeldet bleiben“ abgewählt hat. Standard: dauerhaft angemeldet.
 */
export async function enforceSessionPersistence() {
  if (typeof window === "undefined") return;
  if (getStaySignedIn()) return;
  if (sessionStorage.getItem(ACTIVE_KEY) === "1") return;
  await supabase.auth.signOut();
}

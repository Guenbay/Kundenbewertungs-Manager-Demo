import { sampleReviews } from "@/lib/sample-reviews";
import type { Business, Review } from "@/lib/types";

const KEY = "kbm-demo-v1";

export interface DemoState {
  business: Business;
  reviews: Review[];
}

export function initialState(): DemoState {
  return {
    business: { name: "Musterbetrieb Weber", industry: "", contactEmail: "" },
    reviews: sampleReviews(),
  };
}

/** Daten bleiben ausschließlich im Browser dieses Geräts. */
export function loadState(): DemoState {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as DemoState;
  } catch {
    // Kein Zugriff auf localStorage (z. B. privater Modus) → Startzustand
  }
  return initialState();
}

export function saveState(state: DemoState) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignorieren – Demo funktioniert dann nur bis zum Neuladen
  }
}

export function clearState() {
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignorieren
  }
}

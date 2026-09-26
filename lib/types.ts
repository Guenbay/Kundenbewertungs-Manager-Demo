export type ReviewStatus = "open" | "answered";

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  /** ISO-Datum */
  date: string;
  status: ReviewStatus;
  reply: string;
  /** Nur bei Beispiel-Bewertungen: So hat die KI der Vollversion geantwortet. */
  showcaseReply?: string;
  isExample?: boolean;
}

export interface Business {
  name: string;
  industry: string;
  contactEmail: string;
}

export function isCritical(rating: number) {
  return rating <= 3;
}

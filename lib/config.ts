/**
 * Kontakt für "Vollversion anfragen". Über Umgebungsvariablen anpassbar
 * (Datei .env.local), ohne den Code zu ändern.
 */
export const CONTACT_URL =
  process.env.NEXT_PUBLIC_CONTACT_URL || "https://github.com/Guenbay";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

export function contactHref(): string {
  if (CONTACT_EMAIL) {
    const subject = encodeURIComponent("Anfrage Vollversion Kundenbewertungs-Manager");
    return `mailto:${CONTACT_EMAIL}?subject=${subject}`;
  }
  return CONTACT_URL;
}

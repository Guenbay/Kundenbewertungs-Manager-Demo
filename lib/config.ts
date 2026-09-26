/**
 * Kontakt für "Vollversion anfragen": öffnet ein vorausgefülltes GitHub-Issue in
 * diesem Repository. So landet die Anfrage direkt in der GitHub-Benachrichtigungs-
 * "Inbox" des Betreibers – ganz ohne eigenes Kontaktformular oder E-Mail-Adresse.
 * Über eine Umgebungsvariable (Datei .env.local) lässt sich stattdessen auch eine
 * feste URL oder E-Mail-Adresse hinterlegen, ohne den Code zu ändern.
 */
const ISSUE_URL =
  "https://github.com/Guenbay/Kundenbewertungs-Manager-Demo/issues/new" +
  "?template=vollversion-anfragen.yml";

export const CONTACT_URL = process.env.NEXT_PUBLIC_CONTACT_URL || ISSUE_URL;
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

export function contactHref(): string {
  if (CONTACT_EMAIL) {
    const subject = encodeURIComponent("Anfrage Vollversion Kundenbewertungs-Manager");
    return `mailto:${CONTACT_EMAIL}?subject=${subject}`;
  }
  return CONTACT_URL;
}

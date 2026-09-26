/**
 * Ziel des "Zur Vollversion"-Buttons: die Marketing-/Preisseite der echten
 * (privaten) App. Dort kann man direkt ein Paket wählen und sich registrieren –
 * kein Umweg mehr über ein Kontaktformular nötig.
 * Über eine Umgebungsvariable (Datei .env.local) lässt sich die Ziel-URL
 * anpassen, ohne den Code zu ändern.
 */
const APP_URL = "https://kundenbewertungs-manager.vercel.app/#preise";

export const CONTACT_URL = process.env.NEXT_PUBLIC_CONTACT_URL || APP_URL;

export function contactHref(): string {
  return CONTACT_URL;
}

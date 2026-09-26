import type { Business } from "@/lib/types";

/*
 * Demo-Vorlagen. Die Vollversion ersetzt diese Bausteine durch individuell
 * formulierte KI-Antworten, die auf den Inhalt jeder Bewertung eingehen.
 */

const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

function greeting(authorName: string) {
  const name = authorName.trim();
  return name && name.toLowerCase() !== "anonym" ? `Hallo ${name},` : "Guten Tag,";
}

function signature(business: Business) {
  return `Herzliche Grüße\nIhr Team von ${business.name || "Ihrem Unternehmen"}`;
}

function contactSentence(business: Business) {
  return business.contactEmail
    ? `Bitte schreiben Sie uns direkt an ${business.contactEmail}`
    : "Bitte melden Sie sich direkt per E-Mail über die Kontaktdaten auf unserer Website";
}

export function demoReply(review: { authorName: string; rating: number }, business: Business) {
  if (review.rating >= 4) {
    const body = pick([
      "was für eine schöne Rückmeldung – vielen Dank, dass Sie sich die Zeit dafür genommen haben! Genau dafür geben wir jeden Tag unser Bestes.",
      "Ihre Worte haben unserem ganzen Team ein Lächeln ins Gesicht gezaubert. Danke für Ihr Vertrauen!",
      "es freut uns sehr, dass Sie so zufrieden waren. Solches Feedback ist für uns die schönste Bestätigung.",
    ]);
    const closing = pick([
      "Wir freuen uns schon auf Ihren nächsten Besuch.",
      "Bis zum nächsten Mal – wir sind gerne wieder für Sie da.",
    ]);
    return `${greeting(review.authorName)} ${body} ${closing}\n\n${signature(business)}`;
  }

  return `${greeting(review.authorName)} vielen Dank für Ihr offenes Feedback. Es tut uns aufrichtig leid, dass Ihre Erfahrung nicht Ihren Erwartungen entsprochen hat. ${contactSentence(business)}, damit wir uns Ihr Anliegen persönlich ansehen und gemeinsam eine Lösung finden können.\n\n${signature(business)}`;
}

export function demoAppeal(review: { date: string }, reason: string) {
  const date = new Date(review.date).toLocaleDateString("de-DE", { dateStyle: "long" });
  const extra = reason.trim() ? ` Nach unseren Beobachtungen: ${reason.trim()}` : "";
  return `Empfohlene Meldekategorie: Spam / gefälschte Interaktion

Meldetext:
Wir bitten um Prüfung der Bewertung vom ${date}. In unseren Unterlagen findet sich kein Vorgang, der dieser Bewertung zugeordnet werden kann; ein tatsächlicher Kundenkontakt ist nicht erkennbar.${extra} Wir gehen daher davon aus, dass die Bewertung nicht auf einer echten Erfahrung mit unserem Unternehmen beruht und gegen die Richtlinien für Beiträge verstößt.

Hinweis:
Melde die Bewertung in deinem Google-Unternehmensprofil über „Bewertung melden“. Google entscheidet allein über die Entfernung.`;
}

/** Setzt Firmenname/E-Mail in die Beispiel-Antworten der Vollversion ein. */
export function fillShowcase(text: string, business: Business) {
  return text
    .replaceAll("{business}", business.name || "Ihrem Unternehmen")
    .replaceAll(
      "{contact}",
      business.contactEmail
        ? `an ${business.contactEmail}`
        : "über die E-Mail-Adresse auf unserer Website",
    );
}

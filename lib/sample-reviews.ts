import type { Review } from "@/lib/types";

const daysAgo = (n: number) => new Date(Date.now() - n * 864e5).toISOString();

/**
 * Beispiel-Bewertungen. Die "showcaseReply"-Texte zeigen, wie die KI der
 * Vollversion antwortet – individuell statt Vorlage.
 */
export function sampleReviews(): Review[] {
  return [
    {
      id: "ex-1",
      authorName: "Sabine K.",
      rating: 5,
      text: "Super freundliches Team! Ich hatte vorher große Bedenken, aber man hat sich richtig Zeit genommen und alles verständlich erklärt. Absolut empfehlenswert.",
      date: daysAgo(1),
      status: "open",
      reply: "",
      isExample: true,
      showcaseReply:
        "Hallo Sabine K., wie schön, dass sich Ihre anfänglichen Bedenken so schnell in Luft aufgelöst haben! Sich Zeit zu nehmen und alles verständlich zu erklären, ist uns ein echtes Herzensanliegen – dass Sie genau das gespürt haben, freut das ganze Team sehr. Wir freuen uns auf ein Wiedersehen!\n\nHerzliche Grüße\nIhr Team von {business}",
    },
    {
      id: "ex-2",
      authorName: "Markus T.",
      rating: 2,
      text: "Termin um 10 Uhr, dran gekommen um 11:15. Niemand hat Bescheid gesagt. So geht man nicht mit der Zeit von Kunden um.",
      date: daysAgo(2),
      status: "open",
      reply: "",
      isExample: true,
      showcaseReply:
        "Hallo Markus T., danke, dass Sie uns so offen schildern, wie Ihr Termin verlaufen ist. Über eine Stunde warten, ohne dass Ihnen jemand Bescheid gibt – wir verstehen gut, wie ärgerlich das ist, und es tut uns leid, dass Ihre Zeit so strapaziert wurde. Bitte schreiben Sie uns {contact}, damit wir nachvollziehen können, was an diesem Tag passiert ist, und uns persönlich bei Ihnen melden.\n\nFreundliche Grüße\nIhr Team von {business}",
    },
    {
      id: "ex-3",
      authorName: "Lena Hoffmann",
      rating: 4,
      text: "Kompetente Beratung und fairer Preis. Die Parkplatzsituation ist leider etwas schwierig.",
      date: daysAgo(4),
      status: "open",
      reply: "",
      isExample: true,
      showcaseReply:
        "Hallo Lena Hoffmann, danke für Ihre Rückmeldung – schön, dass Beratung und Preis Sie überzeugt haben! Den Hinweis zur Parkplatzsituation nehmen wir gerne mit; in der Seitenstraße gibt es meist noch freie Plätze. Bis zum nächsten Mal!\n\nHerzliche Grüße\nIhr Team von {business}",
    },
    {
      id: "ex-4",
      authorName: "Anonym",
      rating: 1,
      text: "Totale Abzocke!!! Finger weg!!!",
      date: daysAgo(5),
      status: "open",
      reply: "",
      isExample: true,
      showcaseReply:
        "Guten Tag, es tut uns leid zu lesen, dass Sie so unzufrieden sind. Leider können wir Ihrer Bewertung nicht entnehmen, worauf sich Ihr Eindruck bezieht – wir würden das aber gerne verstehen und klären. Bitte schreiben Sie uns {contact}, damit wir uns Ihr Anliegen persönlich ansehen können.\n\nFreundliche Grüße\nIhr Team von {business}",
    },
    {
      id: "ex-5",
      authorName: "Jürgen B.",
      rating: 5,
      text: "Wie immer top. Seit 10 Jahren Kunde und nie enttäuscht worden.",
      date: daysAgo(10),
      status: "answered",
      reply:
        "Hallo Jürgen B., zehn Jahre Treue – das ist für uns das schönste Kompliment! Danke für Ihr Vertrauen, wir freuen uns schon auf Ihren nächsten Besuch.\n\nHerzliche Grüße\nIhr Team",
      isExample: true,
    },
  ];
}

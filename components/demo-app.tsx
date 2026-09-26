"use client";

import { ExternalLink, RotateCcw, Settings, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { AddReviewForm } from "@/components/add-review-form";
import { BusinessSettings } from "@/components/business-settings";
import { ReviewCard } from "@/components/review-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { contactHref } from "@/lib/config";
import { clearState, initialState, loadState, saveState, type DemoState } from "@/lib/storage";
import type { Review } from "@/lib/types";

export function DemoApp() {
  const [state, setState] = useState<DemoState | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // Erst nach dem Laden im Browser rendern (Daten liegen in localStorage).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- einmaliges Laden aus localStorage
    setState(loadState());
  }, []);

  useEffect(() => {
    if (state) saveState(state);
  }, [state]);

  if (!state) return null;

  const { business, reviews } = state;
  const sorted = [...reviews].sort((a, b) =>
    a.status === b.status ? b.date.localeCompare(a.date) : a.status === "open" ? -1 : 1,
  );
  const openCount = reviews.filter((r) => r.status === "open").length;
  const average = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toLocaleString("de-DE", {
        maximumFractionDigits: 1,
      })
    : "–";

  const updateReview = (review: Review) =>
    setState((s) => s && { ...s, reviews: s.reviews.map((r) => (r.id === review.id ? review : r)) });
  const deleteReview = (id: string) =>
    setState((s) => s && { ...s, reviews: s.reviews.filter((r) => r.id !== id) });
  const addReview = (review: Review) =>
    setState((s) => s && { ...s, reviews: [review, ...s.reviews] });

  return (
    <div className="flex flex-1 flex-col">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
          <span className="flex items-center gap-2">
            <Sparkles className="size-4 shrink-0" />
            Kostenlose Demo mit Vorlagen. Die Vollversion schreibt jede Antwort individuell per KI.
          </span>
          <Button asChild size="sm" variant="secondary">
            <a href={contactHref()} target="_blank" rel="noreferrer">
              Vollversion anfragen
              <ExternalLink />
            </a>
          </Button>
        </div>
      </div>

      <header className="border-b">
        <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="grid">
            <span className="font-semibold">Kundenbewertungs-Manager</span>
            <span className="text-muted-foreground text-xs">{business.name || "Ihr Unternehmen"} · Demo</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowSettings((v) => !v)}>
            <Settings />
            Unternehmen
          </Button>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-4xl gap-6 px-4 py-8">
        {showSettings && (
          <Card>
            <CardHeader>
              <CardTitle>Unternehmensdaten</CardTitle>
              <CardDescription>Werden in die Antworten eingesetzt. Gespeichert nur in diesem Browser.</CardDescription>
            </CardHeader>
            <CardContent>
              <BusinessSettings
                business={business}
                onChange={(b) => setState((s) => s && { ...s, business: b })}
              />
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat title="Offene Bewertungen" value={String(openCount)} highlight={openCount > 0} />
          <Stat title="Bewertungen gesamt" value={String(reviews.length)} />
          <Stat title="Ø Sterne" value={average} />
        </div>

        <section className="grid gap-4">
          <h1 className="text-xl font-semibold">Google-Bewertungen</h1>
          <AddReviewForm onAdd={addReview} />
          {sorted.length === 0 ? (
            <p className="text-muted-foreground text-sm">Noch keine Bewertungen. Füge oben eine hinzu.</p>
          ) : (
            sorted.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                business={business}
                onChange={updateReview}
                onDelete={deleteReview}
              />
            ))
          )}
        </section>

        <UpgradeCard />

        <footer className="text-muted-foreground flex flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs">
          <span>Alle Daten bleiben in deinem Browser. Nichts wird an einen Server gesendet.</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (!window.confirm("Alle Demo-Daten zurücksetzen?")) return;
              clearState();
              setState(initialState());
            }}
          >
            <RotateCcw />
            Demo zurücksetzen
          </Button>
        </footer>
      </main>
    </div>
  );
}

function Stat({ title, value, highlight }: { title: string; value: string; highlight?: boolean }) {
  return (
    <Card className="gap-1 py-4">
      <CardHeader className="gap-1 px-4">
        <CardDescription>{title}</CardDescription>
        <CardTitle className={highlight ? "text-destructive text-2xl" : "text-2xl"}>{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}

function UpgradeCard() {
  const features = [
    "Individuelle KI-Antworten, die auf jede Bewertung konkret eingehen",
    "Deeskalierende Antworten auf Kritik – nie defensiv, immer mit Lösungsangebot",
    "KI-Prüfung bei Fake-Verdacht inkl. passender Google-Richtlinie",
    "Berufsgeheimnis-Regeln für Arztpraxen & Heilberufe eingebaut",
    "Online von überall nutzbar, mit eigenem Login",
    "In Vorbereitung: Bewertungen automatisch aus Google abrufen und direkt veröffentlichen",
  ];
  return (
    <Card className="border-violet-200 dark:border-violet-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-5 text-violet-600" />
          Die Vollversion
        </CardTitle>
        <CardDescription>Für Unternehmen, die jede Bewertung professionell beantworten wollen.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ul className="grid gap-2 text-sm">
          {features.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-violet-600">✓</span>
              {f}
            </li>
          ))}
        </ul>
        <Button asChild className="w-fit">
          <a href={contactHref()} target="_blank" rel="noreferrer">
            Vollversion anfragen
            <ExternalLink />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

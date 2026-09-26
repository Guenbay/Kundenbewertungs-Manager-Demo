"use client";

import { Check, Copy, Flag, Lock, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";

import { StarRating } from "@/components/star-rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useCopy } from "@/components/use-copy";
import { contactHref } from "@/lib/config";
import { demoAppeal, demoReply, fillShowcase } from "@/lib/templates";
import { isCritical, type Business, type Review } from "@/lib/types";

const dateFormat = new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" });

interface Props {
  review: Review;
  business: Business;
  onChange: (review: Review) => void;
  onDelete: (id: string) => void;
}

export function ReviewCard({ review, business, onChange, onDelete }: Props) {
  const [error, setError] = useState<string | null>(null);
  const replyCopy = useCopy();
  const isOpen = review.status === "open";
  const critical = isCritical(review.rating);

  async function copyReply() {
    if (!(await replyCopy.copy(review.reply))) {
      setError("Kopieren nicht möglich. Bitte Text manuell markieren und kopieren.");
    }
  }

  return (
    <Card className="gap-4">
      <CardHeader className="flex flex-wrap items-start justify-between gap-2">
        <div className="grid gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{review.authorName}</span>
            <StarRating rating={review.rating} />
          </div>
          <time dateTime={review.date} className="text-muted-foreground text-xs">
            {dateFormat.format(new Date(review.date))}
          </time>
        </div>
        <div className="flex items-center gap-2">
          {review.isExample && <Badge variant="secondary">Beispiel</Badge>}
          {isOpen && critical && (
            <Badge variant="outline" className="border-amber-300 text-amber-700 dark:text-amber-400">
              Kritisch
            </Badge>
          )}
          {isOpen ? (
            <Badge variant="destructive">Offen</Badge>
          ) : (
            <Badge className="bg-emerald-600 text-white">Beantwortet</Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground size-8"
            onClick={() => {
              if (window.confirm("Diese Bewertung löschen?")) onDelete(review.id);
            }}
            aria-label="Bewertung löschen"
            title="Bewertung löschen"
          >
            <Trash2 />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {review.text || (
            <span className="text-muted-foreground italic">Nur Sternebewertung, kein Text.</span>
          )}
        </p>

        {review.showcaseReply && isOpen && (
          <div className="grid gap-2 rounded-lg border border-violet-200 bg-violet-50 p-3 dark:border-violet-900 dark:bg-violet-950/40">
            <span className="flex items-center gap-1.5 text-xs font-medium text-violet-800 dark:text-violet-300">
              <Sparkles className="size-3.5" />
              So antwortet die KI der Vollversion auf diese Bewertung
            </span>
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {fillShowcase(review.showcaseReply, business)}
            </p>
          </div>
        )}

        {(review.reply || !isOpen) && (
          <div className="bg-muted/50 grid gap-2 rounded-lg border p-3">
            <span className="text-muted-foreground text-xs font-medium">
              {isOpen ? "Antwortentwurf (Demo-Vorlage) – vor dem Veröffentlichen anpassen" : "Ihre Antwort"}
            </span>
            {isOpen ? (
              <Textarea
                value={review.reply}
                onChange={(e) => onChange({ ...review, reply: e.target.value })}
                rows={5}
                className="bg-background"
                aria-label="Antwortentwurf"
              />
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-line">{review.reply}</p>
            )}
          </div>
        )}

        {error && (
          <p className="text-destructive text-sm" role="alert">
            {error}
          </p>
        )}

        {critical && <AppealPanel review={review} />}
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2">
        {isOpen && (
          <Button
            onClick={() => onChange({ ...review, reply: demoReply(review, business) })}
            variant={review.reply ? "outline" : "default"}
          >
            <Sparkles />
            {review.reply ? "Neue Vorlage" : "Antwort erstellen"}
          </Button>
        )}
        {review.reply && (
          <Button onClick={copyReply} variant="outline">
            {replyCopy.copied ? <Check /> : <Copy />}
            {replyCopy.copied ? "Kopiert!" : "Kopieren"}
          </Button>
        )}
        {isOpen && review.reply && (
          <Button variant="secondary" onClick={() => onChange({ ...review, status: "answered" })}>
            <Check />
            Als beantwortet markieren
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

function AppealPanel({ review }: { review: Review }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [appeal, setAppeal] = useState("");
  const appealCopy = useCopy();

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-muted-foreground hover:text-foreground flex w-fit items-center gap-1.5 text-xs underline-offset-4 hover:underline"
      >
        <Flag className="size-3.5" />
        Verdacht auf Fake- oder Konkurrenz-Bewertung? Meldetext für Google erstellen
      </button>
    );
  }

  return (
    <div className="grid gap-3 rounded-lg border border-dashed p-3">
      <div className="grid gap-1">
        <span className="flex items-center gap-1.5 text-sm font-medium">
          <Flag className="size-4" />
          Bewertung bei Google melden
        </span>
        <span className="text-muted-foreground text-xs">
          Ehrliche Kritik entfernt Google nicht – melde nur Bewertungen, die gegen die
          Google-Richtlinien verstoßen (z. B. kein echter Kunde, Konkurrenz, Beleidigung).
        </span>
      </div>
      <Textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows={3}
        maxLength={1000}
        placeholder="Warum ist die Bewertung unzulässig? z. B. „Keine Person dieses Namens in unseren Unterlagen.“"
        aria-label="Begründung"
      />
      {appeal && (
        <Textarea
          value={appeal}
          onChange={(e) => setAppeal(e.target.value)}
          rows={10}
          className="bg-background"
          aria-label="Meldetext"
        />
      )}
      <p className="text-muted-foreground flex items-start gap-1.5 text-xs">
        <Lock className="mt-0.5 size-3.5 shrink-0" />
        Demo-Vorlage. Die Vollversion prüft per KI, ob überhaupt ein Verstoß vorliegt, ordnet ihn
        der passenden Google-Richtlinie zu und formuliert die Begründung konkret.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => setAppeal(demoAppeal(review, reason))}>
          <Sparkles />
          {appeal ? "Neu erstellen" : "Meldetext erstellen"}
        </Button>
        {appeal && (
          <Button size="sm" variant="outline" onClick={() => appealCopy.copy(appeal)}>
            {appealCopy.copied ? <Check /> : <Copy />}
            {appealCopy.copied ? "Kopiert!" : "Kopieren"}
          </Button>
        )}
        <Button size="sm" variant="ghost" asChild>
          <a href={contactHref()} target="_blank" rel="noreferrer">
            Zur Vollversion
          </a>
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
          Schließen
        </Button>
      </div>
    </div>
  );
}

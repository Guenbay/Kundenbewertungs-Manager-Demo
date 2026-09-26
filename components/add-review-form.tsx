"use client";

import { Plus, Star, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Review } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AddReviewForm({ onAdd }: { onAdd: (review: Review) => void }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const today = new Date().toISOString().slice(0, 10);

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} className="w-fit">
        <Plus />
        Bewertung hinzufügen
      </Button>
    );
  }

  function submit(formData: FormData) {
    const date = String(formData.get("date") || today);
    onAdd({
      id: crypto.randomUUID(),
      authorName: String(formData.get("authorName") || "").trim() || "Anonym",
      rating,
      text: String(formData.get("text") || "").trim(),
      date: `${date}T12:00:00Z`,
      status: "open",
      reply: "",
    });
    setRating(0);
    setOpen(false);
  }

  return (
    <Card className="gap-4">
      <CardHeader className="flex items-start justify-between gap-2">
        <div className="grid gap-1.5">
          <CardTitle>Bewertung hinzufügen</CardTitle>
          <CardDescription>Kopiere eine Bewertung aus deinem Google-Profil hierher.</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Schließen">
          <X />
        </Button>
      </CardHeader>
      <CardContent>
        <form action={submit} className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="authorName">Name des Bewerters</Label>
              <Input id="authorName" name="authorName" placeholder="z. B. Markus T. (leer = Anonym)" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Datum der Bewertung</Label>
              <Input id="date" name="date" type="date" defaultValue={today} max={today} />
            </div>
          </div>

          <fieldset className="grid gap-2">
            <legend className="mb-2 text-sm font-medium">Sterne</legend>
            <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i)}
                  onMouseEnter={() => setHover(i)}
                  aria-label={`${i} ${i === 1 ? "Stern" : "Sterne"}`}
                  aria-pressed={rating === i}
                  className="rounded-sm p-0.5 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <Star
                    className={cn(
                      "size-7 transition-colors",
                      i <= (hover || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-muted-foreground/40",
                    )}
                  />
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-2">
            <Label htmlFor="text">Text der Bewertung</Label>
            <Textarea id="text" name="text" rows={4} placeholder="Leer lassen, wenn nur Sterne vergeben wurden." />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={rating === 0}>
              Speichern
            </Button>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

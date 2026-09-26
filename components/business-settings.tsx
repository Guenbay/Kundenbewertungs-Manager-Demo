"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Business } from "@/lib/types";

export function BusinessSettings({
  business,
  onChange,
}: {
  business: Business;
  onChange: (business: Business) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="grid gap-2">
        <Label htmlFor="bname">Name des Unternehmens</Label>
        <Input
          id="bname"
          value={business.name}
          onChange={(e) => onChange({ ...business, name: e.target.value })}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="bindustry">Branche</Label>
        <Input
          id="bindustry"
          value={business.industry}
          placeholder="z. B. Zahnarztpraxis"
          onChange={(e) => onChange({ ...business, industry: e.target.value })}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="bemail">Kontakt-E-Mail</Label>
        <Input
          id="bemail"
          type="email"
          value={business.contactEmail}
          placeholder="service@firma.de"
          onChange={(e) => onChange({ ...business, contactEmail: e.target.value })}
        />
      </div>
    </div>
  );
}

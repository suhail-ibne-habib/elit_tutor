"use client";

import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

type FieldProps = {
  name: string;
  label: string;
  error?: string;
  children: ReactNode;
};

export function Field({ name, label, error, children }: FieldProps) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      {children}
      {error ? <p className="mt-1 text-xs font-semibold text-destructive">{error}</p> : null}
    </div>
  );
}

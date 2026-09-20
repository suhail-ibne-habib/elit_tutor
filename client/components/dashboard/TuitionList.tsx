"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Tuition } from "@/lib/api";

type TuitionListProps = {
  tuitions: Tuition[];
  onDelete: (id: string) => void;
};

export function TuitionList({ tuitions, onDelete }: TuitionListProps) {
  if (tuitions.length === 0) {
    return <p className="text-sm text-muted-foreground">No tuition posts yet.</p>;
  }

  return (
    <div className="grid gap-3">
      {tuitions.map((tuition) => (
        <article key={tuition._id} className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-border p-4">
          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge>{tuition.type}</Badge>
              <Badge>{tuition.status}</Badge>
              <Badge>{tuition.postedByRole}</Badge>
            </div>
            <h4 className="font-bold">{tuition.title}</h4>
            <p className="text-sm text-muted-foreground">
              {tuition.classLevel} · {tuition.area} · BDT {tuition.salary}
            </p>
          </div>
          <Button variant="destructive" size="sm" onClick={() => onDelete(tuition._id)}>
            Delete
          </Button>
        </article>
      ))}
    </div>
  );
}

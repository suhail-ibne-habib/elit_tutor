"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Tuition } from "@/lib/api";

type TuitionListProps = {
  tuitions: Tuition[];
  emptyMessage?: string;
  onDelete?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
};

export function TuitionList({
  tuitions,
  emptyMessage = "No tuition posts yet.",
  onDelete,
  onApprove,
  onReject,
}: TuitionListProps) {
  if (tuitions.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-3">
      {tuitions.map((tuition) => (
        <article key={tuition._id} className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-border p-4">
          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge>{tuition.type}</Badge>
              <Badge>{tuition.status}</Badge>
              <Badge>{tuition.approvalStatus}</Badge>
              {tuition.postedByRole ? <Badge>{tuition.postedByRole}</Badge> : null}
            </div>
            <h4 className="font-bold">{tuition.title}</h4>
            <p className="text-sm text-muted-foreground">
              {tuition.classLevel} · {tuition.area} · BDT {tuition.salary}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Requester: {tuition.requesterName} · {tuition.requesterPhone}
              {tuition.requesterEmail ? ` · ${tuition.requesterEmail}` : ""}
            </p>
            {tuition.detail ? <p className="mt-2 text-sm text-muted-foreground">{tuition.detail}</p> : null}
          </div>
          <div className="flex flex-wrap gap-2">
            {onApprove && tuition.approvalStatus !== "approved" ? (
              <Button size="sm" onClick={() => onApprove(tuition._id)}>
                Approve
              </Button>
            ) : null}
            {onReject && tuition.approvalStatus !== "rejected" ? (
              <Button variant="outline" size="sm" onClick={() => onReject(tuition._id)}>
                Reject
              </Button>
            ) : null}
            {onDelete ? (
              <Button variant="destructive" size="sm" onClick={() => onDelete(tuition._id)}>
                Delete
              </Button>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

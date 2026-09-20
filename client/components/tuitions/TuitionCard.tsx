import Link from "next/link";
import type { Tuition } from "@/lib/api";

type TuitionCardProps = {
  tuition: Pick<Tuition, "title" | "type" | "classLevel" | "subjects" | "detail" | "area" | "salary" | "daysPerWeek" | "schedule">;
};

export function TuitionCard({ tuition }: TuitionCardProps) {
  const detail = tuition.detail || tuition.subjects.filter(Boolean).join(", ");

  return (
    <article className="tutor-card">
      <div className="mb-3 flex flex-wrap gap-2">
        <span className="badge">{tuition.type}</span>
        {tuition.classLevel ? <span className="badge">{tuition.classLevel}</span> : null}
      </div>
      <h3>{tuition.title}</h3>
      {detail ? <p>{detail}</p> : null}
      <div className="meta">
        <span>{tuition.area}</span>
        <span>BDT {Number(tuition.salary).toLocaleString()}</span>
        <span>{tuition.schedule || `${tuition.daysPerWeek} days / week`}</span>
      </div>
      <Link className="btn btn-primary" href="/register">
        Apply Now
      </Link>
    </article>
  );
}

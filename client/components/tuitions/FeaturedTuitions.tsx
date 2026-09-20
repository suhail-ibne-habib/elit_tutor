import Link from "next/link";
import { TuitionCard } from "@/components/tuitions/TuitionCard";
import { getPublicTuitions, type Tuition } from "@/lib/api";
import { tuitions as sampleTuitions } from "@/lib/data";

function sampleAsTuitions(): Tuition[] {
  return sampleTuitions.slice(0, 6).map((job, index) => ({
    _id: `sample-${index}`,
    title: job.title,
    type: job.type.toLowerCase() as Tuition["type"],
    classLevel: job.title,
    subjects: [],
    detail: job.detail,
    area: job.area,
    salary: Number(job.rate.replace(/[^\d]/g, "")) || 0,
    daysPerWeek: Number(job.schedule.split(" ")[0]) || 4,
    schedule: job.schedule,
    status: "open",
    postedByRole: "admin",
  }));
}

export async function FeaturedTuitions() {
  const live = (await getPublicTuitions()).filter((job) => job.status !== "closed").slice(0, 6);
  const jobs = live.length > 0 ? live : sampleAsTuitions();

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="section-head">
          <h2>Live tuitions</h2>
          <p>Open jobs from guardians and Elite. Apply if the class, area, and schedule match your profile.</p>
        </div>
        <div className="grid-3">
          {jobs.map((job) => (
            <TuitionCard key={job._id} tuition={job} />
          ))}
        </div>
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <Link className="btn btn-ghost" href="/tuitions">
            View all tuitions
          </Link>
        </div>
      </div>
    </section>
  );
}

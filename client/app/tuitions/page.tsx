import type { Metadata } from "next";
import SearchBarSuspense from "@/components/SearchBarSuspense";
import { TuitionCard } from "@/components/tuitions/TuitionCard";
import { getPublicTuitions } from "@/lib/api";

export const metadata: Metadata = {
  title: "Find Tuitions",
};

type TuitionsPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function TuitionsPage({ searchParams }: TuitionsPageProps) {
  const { q = "" } = await searchParams;
  const query = q.toLowerCase();
  const tuitions = await getPublicTuitions();
  const results = tuitions.filter((job) =>
    `${job.title} ${job.type} ${job.detail} ${job.area} ${job.classLevel}`.toLowerCase().includes(query),
  );

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="kicker">Live tuition jobs</div>
          <h1>Browse approved tuition jobs</h1>
          <p>Only staff-approved jobs appear here. Apply through the WhatsApp group option shown on each card.</p>
          <SearchBarSuspense kind="tuition" variant="filters" />
        </div>
      </section>
      <section className="section">
        <div className="container grid-3">
          {results.length === 0 ? <p className="lead">No tuition jobs matched that search. Try another subject or area.</p> : null}
          {results.map((job) => <TuitionCard key={job._id} tuition={job} />)}
        </div>
      </section>
    </main>
  );
}

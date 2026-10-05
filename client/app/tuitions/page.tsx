import type { Metadata } from "next";
import SearchBarSuspense from "@/components/SearchBarSuspense";
import { TuitionCard } from "@/components/tuitions/TuitionCard";
import { getPublicTuitions } from "@/lib/api";
import { site } from "@/lib/site";

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
          <div className="kicker">Find tuition</div>
          <h1>Choose the right tuition</h1>
          <p>Respected tutors, you can easily choose the right tuition from the approved listings below.</p>
          <div className="chips" style={{ marginTop: 16 }}>
            <a className="btn btn-primary" href={site.whatsappGroup} target="_blank" rel="noreferrer">
              Join our WhatsApp group
            </a>
            <a className="btn btn-outline" href={site.facebook} target="_blank" rel="noreferrer">
              Follow our Facebook page
            </a>
          </div>
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

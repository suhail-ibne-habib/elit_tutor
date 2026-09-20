import type { Metadata } from "next";
import Link from "next/link";
import SearchBarSuspense from "@/components/SearchBarSuspense";
import { tuitions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Find Tuitions",
};

type TuitionsPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function TuitionsPage({ searchParams }: TuitionsPageProps) {
  const { q = "" } = await searchParams;
  const query = q.toLowerCase();
  const results = tuitions.filter((job) =>
    `${job.title} ${job.type} ${job.detail} ${job.area}`.toLowerCase().includes(query),
  );

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="kicker">Live tuition jobs</div>
          <h1>Apply for a tuition</h1>
          <p>Browse current guardian requests and apply to jobs that match your subjects and travel area.</p>
          <SearchBarSuspense kind="tuition" variant="filters" />
        </div>
      </section>
      <section className="section">
        <div className="container grid-3">
          {results.length === 0 ? <p className="lead">No tuition jobs matched that search. Try another subject or area.</p> : null}
          {results.map((job) => (
            <article className="tutor-card" key={job.title}>
              <span className="badge">{job.type}</span>
              <h3>{job.title}</h3>
              <p>{job.detail}</p>
              <div className="meta">
                <span>{job.area}</span>
                <span>{job.rate}</span>
                <span>{job.schedule}</span>
              </div>
              <Link className="btn btn-primary" href="/register">
                Apply Now
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

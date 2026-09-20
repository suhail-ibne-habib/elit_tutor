import type { Metadata } from "next";
import Link from "next/link";
import SearchBarSuspense from "@/components/SearchBarSuspense";
import { tutors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Find Tutors",
};

type TutorsPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function TutorsPage({ searchParams }: TutorsPageProps) {
  const { q = "" } = await searchParams;
  const query = q.toLowerCase();
  const results = tutors.filter((tutor) =>
    `${tutor.name} ${tutor.subject} ${tutor.area} ${tutor.bio}`.toLowerCase().includes(query),
  );

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="kicker">Verified tutor directory</div>
          <h1>Find a home tutor</h1>
          <p>Filter by subject, class, and area to shortlist tutors who are ready for a demo class.</p>
          <SearchBarSuspense kind="tutor" variant="filters" />
        </div>
      </section>
      <section className="section">
        <div className="container grid-3">
          {results.length === 0 ? <p className="lead">No tutors matched that search. Try another subject or area.</p> : null}
          {results.map((tutor) => (
            <article className="tutor-card" key={tutor.name}>
              <div className="tutor-top">
                <img src={tutor.avatar} alt="" />
                <div>
                  <span className="badge">{tutor.badge}</span>
                  <h3>{tutor.name}</h3>
                  <p className="tiny">{tutor.subject}</p>
                </div>
              </div>
              <p>{tutor.bio}</p>
              <div className="meta">
                <span>{tutor.area}</span>
                <span>{tutor.rate}</span>
                <span>{tutor.rating}</span>
              </div>
              <Link className="btn btn-outline" href="/contact">
                Request Tutor
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

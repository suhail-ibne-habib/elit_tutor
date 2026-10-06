import type { Metadata } from "next";
import { TuitionCard } from "@/components/tuitions/TuitionCard";
import { WhatsAppJoin } from "@/components/tuitions/WhatsAppJoin";
import { getPublicTuitions } from "@/lib/api";

export const metadata: Metadata = {
  title: "Need Tuitions",
};

export default async function TuitionsPage() {
  const tuitions = await getPublicTuitions();

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="kicker">For tutors</div>
          <h1>Need tuitions</h1>
          <p>Looking for a tuition job? Browse the approved listings, then join the WhatsApp group to apply.</p>
          <WhatsAppJoin />
        </div>
      </section>
      <section className="section">
        <div className="container grid-3">
          {tuitions.length === 0 ? (
            <p className="lead">No tuition jobs are published yet. Join the WhatsApp group to hear when one opens.</p>
          ) : null}
          {tuitions.map((job) => (
            <TuitionCard key={job._id} tuition={job} />
          ))}
        </div>
      </section>
    </main>
  );
}

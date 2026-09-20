import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="kicker">About the platform</div>
          <h1>Built to make tutor hiring simple</h1>
          <p>
            Elite helps guardians post tuition needs and helps verified tutors find jobs that match their subjects,
            schedule, and location.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container grid-2">
          <img src="/assets/images/why-us.svg" alt="Elite matching illustration" />
          <div>
            <h2>A marketplace with a support desk</h2>
            <p className="lead">
              Elite is a long-form trust page for families: search, proof, method, guardian flow, testimonials, tutor
              hiring, and a clear next step. The goal is a faster, calmer hire.
            </p>
            <div className="checklist">
              <div className="check-item">
                <i>✓</i>
                <span>Guardians post a requirement instead of calling around.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>Tutors apply only to jobs that fit their profile.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>Support can help replace a tutor if the first match fails.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid-3">
          <article className="feature-card">
            <div className="icon icon-green">1</div>
            <h3>For guardians</h3>
            <p>Post class, subject, salary, and area. Review applications and start a demo.</p>
          </article>
          <article className="feature-card">
            <div className="icon icon-green">2</div>
            <h3>For tutors</h3>
            <p>Complete a profile, browse live jobs, and apply without relying on referrals.</p>
          </article>
          <article className="feature-card">
            <div className="icon icon-green">3</div>
            <h3>For students</h3>
            <p>Get consistent home or online classes with a tutor matched to the syllabus.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

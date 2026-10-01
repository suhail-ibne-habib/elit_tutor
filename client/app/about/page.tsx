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
          <h1>Built to make tuition requests simple</h1>
          <p>
            Elite helps people submit tuition needs while staff review, approve, and publish the right opportunities
            in one clean workflow.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container grid-2">
          <img src="/assets/images/why-us.svg" alt="Elite matching illustration" />
          <div>
            <h2>A publishing workflow with staff review</h2>
            <p className="lead">
              Elite is designed for faster, clearer tuition coordination. Requests come in through a structured form,
              staff review them, and approved jobs are published to the public board.
            </p>
            <div className="checklist">
              <div className="check-item">
                <i>✓</i>
                <span>Anyone can submit a tuition requirement without creating an account.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>Admin and editors approve jobs before they appear publicly.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>Approved listings stay organized and easy to follow.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container grid-3">
          <article className="feature-card">
            <div className="icon icon-green">1</div>
            <h3>Public requests</h3>
            <p>Submit class, subject, salary, and area through the request form.</p>
          </article>
          <article className="feature-card">
            <div className="icon icon-green">2</div>
            <h3>Staff dashboard</h3>
            <p>Admin and editors review, approve, reject, and manage posted requests.</p>
          </article>
          <article className="feature-card">
            <div className="icon icon-green">3</div>
            <h3>Published jobs</h3>
            <p>Approved tuitions appear on the public board with the latest details.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

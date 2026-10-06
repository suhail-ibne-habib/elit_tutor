import Link from "next/link";
import QuoteCard from "@/components/QuoteCard";
import StatCounter from "@/components/StatCounter";
import { FeaturedTuitions } from "@/components/tuitions/FeaturedTuitions";
import { guardianQuotes, tutorQuotes } from "@/lib/data";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="kicker">Elite Tuition Media, Bangladesh</div>
            <h1>Connecting the Right Tutor with the Right Student.</h1>
            <p className="lead">
              Guardians can request a suitable tutor. Tutors can choose approved tuition opportunities by class,
              subject, and location.
            </p>
            <div className="chips" style={{ marginTop: 24 }}>
              <span className="chip">English</span>
              <span className="chip">Mathematics</span>
              <span className="chip">Physics</span>
              <span className="chip">ICT</span>
              <span className="chip">Admission</span>
            </div>
          </div>
          <Link className="entry-card" href="/request-tuition">
            <img src="/assets/images/logo-mark.png" alt="" />
            <h3>Find a tutor</h3>
            <p>Guardians can request a tutor with class, subjects, location, salary, and contact number.</p>
            <span className="btn btn-primary">Open find tutor form</span>
          </Link>
        </div>
      </section>

      <section className="stats">
        <div className="container stats-row">
          <article className="stat-card">
            <div className="icon icon-green">★</div>
            <StatCounter value={17} suffix="+" />
            <span>Years of tuition support</span>
          </article>
          <article className="stat-card">
            <div className="icon icon-green">◎</div>
            <StatCounter value={90000} suffix="+" />
            <span>Supported families</span>
          </article>
          <article className="stat-card">
            <div className="icon icon-green">◉</div>
            <StatCounter value={72187} suffix="+" />
            <span>Published requests</span>
          </article>
          <article className="stat-card stat-highlight">
            <div>
              <strong>100%</strong>
              <span>Premium matching support</span>
            </div>
            <div className="check">✓</div>
          </article>
        </div>
      </section>

      <FeaturedTuitions />

      <section className="cta-band">
        <div className="container">
          <div className="cta-inner">
            <h2>Looking for a tutor?</h2>
            <p>Guardians can fill the find tutor form with class, subject, location, and budget.</p>
            <Link className="btn btn-primary btn-lg" href="/request-tuition">
              Find Tutor
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Our services</h2>
            <p>Home, online, school, college, and HSC tuition, plus matching for guardians and tutors.</p>
          </div>
          <div className="grid-3">
            {[
              ["Home Tuition", "One-to-one tuition at the student's home."],
              ["Online Tuition", "Live classes for students who prefer remote learning."],
              ["School & College Tuition", "Support matched to the class and syllabus."],
              ["HSC Tuition", "Focused help for higher secondary subjects."],
              ["Qualified Tutor Matching", "Tutors matched by class, subject, location, and budget."],
              ["Tuition Opportunities for Tutors", "Approved jobs tutors can choose from the public board."],
            ].map(([title, text]) => (
              <article className="feature-card" key={title}>
                <div className="icon icon-gold">✓</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <h2>How Elite works</h2>
            <p>A simple workflow for collecting tuition requests, reviewing them, and publishing the right opportunities.</p>
          </div>
          <div className="grid-4">
            <article className="feature-card">
              <div className="icon icon-gold">✓</div>
              <h3>Reviewed Requests</h3>
              <p>Each public tuition request is checked by staff before it appears on the site.</p>
            </article>
            <article className="feature-card">
              <div className="icon icon-gold">⚡</div>
              <h3>Fast Publishing</h3>
              <p>Approved requests are published quickly so opportunities stay current and useful.</p>
            </article>
            <article className="feature-card">
              <div className="icon icon-gold">◎</div>
              <h3>Staff Approval</h3>
              <p>Admin and editors manage approvals from one dedicated dashboard.</p>
            </article>
            <article className="feature-card">
              <div className="icon icon-gold">☎</div>
              <h3>Clear Communication</h3>
              <p>Published jobs include the details needed for fast follow-up and coordination.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section steps">
        <div className="container">
          <div className="section-head">
            <h2>How it works</h2>
            <p>Anyone can submit a request, and staff can review and publish it in a few simple steps.</p>
          </div>
          <div className="grid-4">
            {[
              ["1", "Post Requirement", "Share class, subject, salary, and preferred area."],
              ["2", "Staff Review", "Admin or editors check the request details from the dashboard."],
              ["3", "Publish Job", "Approved tuition requests appear on the public site."],
              ["4", "Connect Fast", "Interested people can follow the posted opportunity and WhatsApp updates."],
            ].map(([no, title, text]) => (
              <article className="step-card" key={no}>
                <span className="step-no">{no}</span>
                <div className="icon icon-green">{no}</div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <div>
            <div className="section-head" style={{ textAlign: "left", margin: "0 0 8px" }}>
              <h2>Why use Elite?</h2>
              <p>Elite is built for people who want an organized, premium process for publishing and discovering tuition needs.</p>
            </div>
            <div className="checklist">
              <div className="check-item">
                <i>✓</i>
                <span>Public request form with structured details and validation.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>Admin and editor approvals before anything goes live.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>Home, online, and group tuition options.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>Public tuition board plus WhatsApp-based follow-up options.</span>
              </div>
            </div>
          </div>
          <img src="/assets/images/why-us.svg" alt="Elite platform overview" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>What families say about us</h2>
            <p>Elite helps families submit clear requirements and find tuition support with less back-and-forth.</p>
          </div>
          <div className="grid-3">
            {guardianQuotes.map((item) => (
              <QuoteCard key={item.name} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="dark-cta">
            <h2>Need a tuition job?</h2>
            <p>Browse approved tuitions and apply through the WhatsApp group.</p>
            <Link className="btn btn-primary btn-lg" href="/tuitions">
              Need Tuitions
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>How to apply for a tuition?</h2>
            <p>Published jobs are reviewed by staff first, then shared publicly for fast follow-up.</p>
          </div>
          <div className="timeline">
            {[
              ["Submit your need", "A requester fills out the public tuition request form."],
              ["Staff review", "Admin or editors review the request from the dashboard."],
              ["Job goes live", "Approved requests appear on the public tuition board."],
              ["Connect fast", "Interested people can follow the published job and WhatsApp group updates."],
            ].map(([title, text]) => (
              <article className="time-item" key={title}>
                <div className="time-dot" />
                <div className="time-card">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>What our community says</h2>
            <p>People use Elite to keep tuition opportunities organized and easier to discover.</p>
          </div>
          <div className="grid-3">
            {tutorQuotes.map((item) => (
              <QuoteCard key={item.name} {...item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

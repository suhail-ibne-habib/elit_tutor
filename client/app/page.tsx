import Link from "next/link";
import { AuthHero } from "@/components/auth/AuthHero";
import QuoteCard from "@/components/QuoteCard";
import SearchBarSuspense from "@/components/SearchBarSuspense";
import StatCounter from "@/components/StatCounter";
import { FeaturedTuitions } from "@/components/tuitions/FeaturedTuitions";
import { guardianQuotes, tutorQuotes } from "@/lib/data";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="kicker">Trusted home tutoring marketplace</div>
            <h1>Tuition and Tutor Searching & Learning Platform</h1>
            <p className="lead">
              Find verified home tutors, post tuition needs, and start learning faster with Elite’s matching
              network across Bangladesh.
            </p>
            <SearchBarSuspense kind="tutor" />
            <div className="chips">
              <span className="chip">English</span>
              <span className="chip">Mathematics</span>
              <span className="chip">Physics</span>
              <span className="chip">ICT</span>
              <span className="chip">Admission</span>
            </div>
          </div>
          <AuthHero />
        </div>
      </section>

      <section className="stats">
        <div className="container stats-row">
          <article className="stat-card">
            <div className="icon icon-green">★</div>
            <StatCounter value={17} suffix="+" />
            <span>Years of tutoring support</span>
          </article>
          <article className="stat-card">
            <div className="icon icon-green">◎</div>
            <StatCounter value={90000} suffix="+" />
            <span>Happy guardians</span>
          </article>
          <article className="stat-card">
            <div className="icon icon-green">◉</div>
            <StatCounter value={72187} suffix="+" />
            <span>Verified tutors</span>
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
            <h2>Need a Home Tutor?</h2>
            <p>Tell us the class, subject, and area. Elite will match you with available professional tutors.</p>
            <Link className="btn btn-primary btn-lg" href="/tutors">
              Find a Tutor
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>We Provide Professional Tutors</h2>
            <p>
              From school to university admission, Elite connects families with subject specialists who teach at home
              or online.
            </p>
          </div>
          <div className="grid-4">
            <article className="feature-card">
              <div className="icon icon-gold">⌂</div>
              <h3>Home Tutoring</h3>
              <p>One-to-one lessons at your home with a verified local tutor.</p>
            </article>
            <article className="feature-card">
              <div className="icon icon-gold">▣</div>
              <h3>Online Tutoring</h3>
              <p>Flexible live classes for students who prefer remote learning.</p>
            </article>
            <article className="feature-card">
              <div className="icon icon-gold">≡</div>
              <h3>Group Tuition</h3>
              <p>Small batch coaching for classmates who want shared sessions.</p>
            </article>
            <article className="feature-card">
              <div className="icon icon-gold">✎</div>
              <h3>Exam Preparation</h3>
              <p>Focused support for SSC, HSC, admission, and university exams.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <h2>Our Tutoring Method</h2>
            <p>A simple platform that keeps guardians, students, and tutors aligned from the first request to the first class.</p>
          </div>
          <div className="grid-4">
            <article className="feature-card">
              <div className="icon icon-gold">✓</div>
              <h3>Verified Profiles</h3>
              <p>Every tutor is reviewed before they can apply for tuition jobs.</p>
            </article>
            <article className="feature-card">
              <div className="icon icon-gold">⚡</div>
              <h3>Fast Matching</h3>
              <p>Get relevant tutor applications based on subject, class, and area.</p>
            </article>
            <article className="feature-card">
              <div className="icon icon-gold">◎</div>
              <h3>Secure Process</h3>
              <p>Keep communication and hiring steps inside one trusted workflow.</p>
            </article>
            <article className="feature-card">
              <div className="icon icon-gold">☎</div>
              <h3>Support Team</h3>
              <p>Elite advisors help if you need a replacement or a better match.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section steps">
        <div className="container">
          <div className="section-head">
            <h2>How it works for Guardian</h2>
            <p>Post once, review applications, and start classes without hunting through random contacts.</p>
          </div>
          <div className="grid-4">
            {[
              ["1", "Post Requirement", "Share class, subject, salary, and preferred area."],
              ["2", "Get Tutor List", "Receive applications from available verified tutors."],
              ["3", "Select a Tutor", "Compare profiles, experience, and demo availability."],
              ["4", "Start Learning", "Confirm the schedule and begin the first class."],
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
              <h2>Why you take a Tutor from us?</h2>
              <p>Elite is built for families who want reliable tutors, clear communication, and a premium matching experience.</p>
            </div>
            <div className="checklist">
              <div className="check-item">
                <i>✓</i>
                <span>100% premium satisfaction support on every posted job.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>Verified tutors with subject and location filters.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>Home, online, and group tuition options.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>Replacement help if the first match is not the right fit.</span>
              </div>
            </div>
          </div>
          <img src="/assets/images/why-us.svg" alt="Guardian reviewing a matched tutor profile" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>What our valuable guardians say about us?</h2>
            <p>Parents use Elite to find consistent tutors without wasting weeks on trial and error.</p>
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
            <h2>Need tuition?</h2>
            <p>
              Join Elite as a tutor, complete your profile, and apply to live tuition jobs that match your subjects and
              preferred areas.
            </p>
            <Link className="btn btn-primary btn-lg" href="/tuitions">
              Browse Tuitions
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>How to apply for a tuition?</h2>
            <p>Tutors can start receiving relevant jobs after a short profile setup.</p>
          </div>
          <div className="timeline">
            {[
              ["Create your account", "Register with your email and choose the tutor role."],
              ["Complete your profile", "Add education, subjects, preferred areas, and expected salary."],
              ["Apply for jobs", "Filter live tuitions and send applications to matching guardians."],
              ["Get selected and teach", "Confirm the demo, lock the schedule, and start the tuition."],
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
            <h2>What our Tutors say about us?</h2>
            <p>Teachers use Elite to find stable tuitions without relying only on word of mouth.</p>
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

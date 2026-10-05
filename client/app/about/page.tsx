import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

const services = [
  "Home Tuition",
  "Online Tuition",
  "School & College Tuition",
  "HSC Tuition",
  "Qualified Tutor Matching",
  "Tuition Opportunities for Tutors",
];

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="kicker">About Elite Tuition Media</div>
          <h1>Connecting the Right Tutor with the Right Student.</h1>
          <p>
            Elite Tuition Media, Bangladesh is a trusted tuition service platform connecting students and guardians
            with suitable tutors across Bangladesh.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <p className="lead">
            We help guardians find qualified and suitable tutors based on class, subject, location, budget, and
            academic requirements. At the same time, we provide tutors with relevant tuition opportunities according
            to their qualifications and preferences.
          </p>
          <p className="lead" style={{ marginTop: 16 }}>
            Our goal is simple — Connecting the Right Tutor with the Right Student.
          </p>
          <p className="lead" style={{ marginTop: 16 }}>
            We focus on providing a reliable, organized, and convenient tuition-matching service for both guardians
            and tutors.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <h2>Our services</h2>
            <p>Elite Tuition Media, Bangladesh. Connecting the Right Tutor with the Right Student.</p>
          </div>
          <div className="grid-3">
            {services.map((service) => (
              <article className="feature-card" key={service}>
                <div className="icon icon-green">✓</div>
                <h3>{service}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

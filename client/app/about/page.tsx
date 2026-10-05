import type { Metadata } from "next";
import { site } from "@/lib/site";

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
        <div className="container grid-2">
          <img src="/assets/images/why-us.svg" alt="Elite Tuition Media" />
          <div>
            <h2>A reliable tuition-matching service</h2>
            <p className="lead">
              We help guardians find qualified and suitable tutors based on class, subject, location, budget, and
              academic requirements. At the same time, we provide tutors with relevant tuition opportunities according
              to their qualifications and preferences.
            </p>
            <div className="checklist">
              <div className="check-item">
                <i>✓</i>
                <span>Guardians can request a tutor with class, subject, location, and salary.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>Tutors can choose approved tuition opportunities from the public board.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>The service stays organized for both guardians and tutors.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <h2>Our services</h2>
            <p>{site.tagline}</p>
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

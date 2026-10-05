import type { Metadata } from "next";
import { TuitionForm } from "@/components/forms/TuitionForm";

export const metadata: Metadata = {
  title: "Request Tuition",
};

export default function RequestTuitionPage() {
  return (
    <main>
      <section className="section">
        <div className="container auth-page">
          <div>
            <div className="kicker">Request form for tutor</div>
            <h1>Request a tutor</h1>
            <p className="lead">
              Share the class, subjects, days, tutor gender, location, salary, and contact number. Staff review the
              request before it is published for tutors.
            </p>
            <div className="checklist">
              <div className="check-item">
                <i>✓</i>
                <span>No account is required to submit a request.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>Admin and editors approve requests before they go live.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>Only approved jobs appear on the public tuition board.</span>
              </div>
            </div>
          </div>
          <div className="auth-card request-card">
            <img className="logo-lg" src="/assets/images/logo-mark.png" alt="" />
            <h3>Request form for tutor</h3>
            <p className="tiny">No account is required. Approved requests appear on Find Tuition.</p>
            <TuitionForm />
          </div>
        </div>
      </section>
    </main>
  );
}

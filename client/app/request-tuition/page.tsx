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
            <div className="kicker">Public tuition request</div>
            <h1>Request a teacher</h1>
            <p className="lead">
              Fill in the tuition details and our staff will review the request before publishing it on the site.
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
            <h3>Tuition request form</h3>
            <p className="tiny">No account is required. Approved requests appear on the public board.</p>
            <TuitionForm />
          </div>
        </div>
      </section>
    </main>
  );
}

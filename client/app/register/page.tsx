import type { Metadata } from "next";
import { RegisterForm } from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <main>
      <section className="section">
        <div className="container auth-page">
          <div>
            <div className="kicker">Staff access only</div>
            <h1>Admin and editor accounts are invite-only</h1>
            <p className="lead">
              Public visitors can request tuition directly from the site. Only invited staff members need login
              accounts.
            </p>
            <div className="checklist">
              <div className="check-item">
                <i>✓</i>
                <span>Anyone can submit a tuition request without registration.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>Admins can invite editors from the dashboard.</span>
              </div>
            </div>
          </div>
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}

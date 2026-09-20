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
            <div className="kicker">Create your account</div>
            <h1>Join as a parent or teacher</h1>
            <p className="lead">
              Register once, then post tuition requirements or apply to jobs from the same Elite account.
            </p>
            <div className="checklist">
              <div className="check-item">
                <i>✓</i>
                <span>Parents can hire faster with verified applications.</span>
              </div>
              <div className="check-item">
                <i>✓</i>
                <span>Teachers can open a profile and apply to live jobs.</span>
              </div>
            </div>
          </div>
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}

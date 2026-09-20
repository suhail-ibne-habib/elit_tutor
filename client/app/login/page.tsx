import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main>
      <section className="section">
        <div className="container auth-page">
          <div>
            <div className="kicker">Welcome back</div>
            <h1>Login to Elite</h1>
            <p className="lead">
              Guardians can manage tuition posts. Tutors can apply to live jobs and update availability.
            </p>
            <img src="/assets/images/hero-device.svg" alt="Elite login preview" style={{ marginTop: 28 }} />
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}

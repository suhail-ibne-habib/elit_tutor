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
            <h1>Staff login</h1>
            <p className="lead">
              Admins and invited editors can review tuition requests, publish approved jobs, and manage the public
              listings.
            </p>
            <img src="/assets/images/hero-device.svg" alt="Elite login preview" style={{ marginTop: 28 }} />
          </div>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}

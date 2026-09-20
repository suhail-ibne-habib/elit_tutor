import type { Metadata } from "next";
import ContactForms from "@/components/ContactForms";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="kicker">Support</div>
          <h1>Talk to the Elite team</h1>
          <p>
            Need help posting a tuition, verifying a tutor profile, or replacing a match? Send a message and we will
            reply within a day.
          </p>
        </div>
      </section>
      <section className="section">
        <ContactForms />
      </section>
    </main>
  );
}

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
          <h1>Contact Elite Tuition Media</h1>
          <p>Call or WhatsApp 01989562718 for tuition details, tutor requests, and office information.</p>
        </div>
      </section>
      <section className="section">
        <ContactForms />
      </section>
    </main>
  );
}

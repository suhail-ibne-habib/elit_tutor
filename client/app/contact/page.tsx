import type { Metadata } from "next";
import ContactForms from "@/components/ContactForms";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main>
      <ContactForms />
    </main>
  );
}

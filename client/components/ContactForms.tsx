import { site } from "@/lib/site";

const displayPhone = "01989-562718";

export default function ContactForms() {
  return (
    <section className="contact-band">
      <div className="container contact-band-grid">
        <div>
          <p className="contact-kicker">Tuition and office details</p>
          <h1>Call us, let&apos;s talk</h1>
          <p>
            For a tutor request, a published tuition, or a visit to either Chittagong office, call or message us on
            WhatsApp.
          </p>
          <div className="contact-actions">
            <a className="btn contact-call" href={site.phoneHref}>
              Call
            </a>
            <a className="btn contact-whatsapp" href={site.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a className="btn btn-primary" href={site.whatsappGroup} target="_blank" rel="noreferrer">
              Join our WhatsApp group
            </a>
            <a className="btn contact-whatsapp" href={site.facebook} target="_blank" rel="noreferrer">
              Follow our Facebook page
            </a>
          </div>
        </div>
        <aside>
          <p className="contact-kicker">Call and WhatsApp</p>
          <a className="contact-number" href={site.phoneHref}>
            {displayPhone}
          </a>
          <ul>
            {site.offices.map((office) => (
              <li key={office}>{office}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

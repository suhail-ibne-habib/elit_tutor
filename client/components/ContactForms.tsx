import Link from "next/link";
import { site } from "@/lib/site";

export default function ContactForms() {
  return (
    <div className="container contact-wrap">
      <article className="info-card">
        <h3>Contact</h3>
        <p>
          Call: <a href={site.phoneHref}>{site.phone}</a>
        </p>
        <p>
          WhatsApp:{" "}
          <a href={site.whatsapp} target="_blank" rel="noreferrer">
            {site.phone}
          </a>
        </p>
        <p>
          Facebook:{" "}
          <a href={site.facebook} target="_blank" rel="noreferrer">
            Elite Tuition Media
          </a>
        </p>
        <Link className="btn btn-primary" href="/request-tuition" style={{ marginTop: 16 }}>
          Request form for tutor
        </Link>
      </article>
      <article className="info-card">
        <h3>Office</h3>
        {site.offices.map((office) => (
          <p key={office}>{office}</p>
        ))}
        <p className="tiny">For details, please call: {site.phone}</p>
      </article>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand" href="/">
            <img src="/assets/images/logo-mark.png" alt="Elite Tuition Media Bangladesh" />
          </Link>
          <p>{site.tagline}</p>
        </div>
        <div>
          <h4>Platform</h4>
          <ul>
            <li>
              <Link href="/request-tuition">Find Tutor</Link>
            </li>
            <li>
              <Link href="/tuitions">Need Tuitions</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href={site.phoneHref}>Call: {site.phone}</a>
            </li>
            <li>
              <a href={site.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp: {site.phone}
              </a>
            </li>
            <li>
              <a href={site.facebook} target="_blank" rel="noreferrer">
                Facebook page
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Office</h4>
          <ul>
            {site.offices.map((office) => (
              <li key={office}>{office}</li>
            ))}
            <li>For details, please call: {site.phone}</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Elite Tuition Media, Bangladesh.</span>
        <span>{site.tagline}</span>
      </div>
    </footer>
  );
}

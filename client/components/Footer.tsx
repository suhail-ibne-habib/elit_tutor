"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
          <p>A tuition request and approval platform for families, students, and Elite staff.</p>
        </div>
        <div>
          <h4>Platform</h4>
          <ul>
            <li>
              <Link href="/request-tuition">Request Tuition</Link>
            </li>
            <li>
              <Link href="/tuitions">Find Tuitions</Link>
            </li>
            <li>
              <Link href="/about">How Elite works</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/request-tuition">Request Form</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Office</h4>
          <ul>
            <li>Gulshan, Dhaka</li>
            <li>hello@elite.test</li>
            <li>+880 1700-000000</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Elite. All rights reserved.</span>
        <span>Request · Review · Publish</span>
      </div>
    </footer>
  );
}

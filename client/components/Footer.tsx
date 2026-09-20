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
            <img src="/assets/images/logo.svg" alt="" />
            Elite
          </Link>
          <p>A tuition and tutor searching platform for guardians, students, and professional tutors.</p>
        </div>
        <div>
          <h4>Platform</h4>
          <ul>
            <li>
              <Link href="/tutors">Find Tutors</Link>
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
              <Link href="/register">Register</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Office</h4>
          <ul>
            <li>Gulshan, Dhaka</li>
            <li>hello@elite-tutor.test</li>
            <li>+880 1700-000000</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Elite. All rights reserved.</span>
        <span>Tuition · Tutor · Learning</span>
      </div>
    </footer>
  );
}

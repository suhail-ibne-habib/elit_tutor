"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { useAuth } from "@/components/auth/AuthProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/tutors", label: "Find Tutors" },
  { href: "/tuitions", label: "Find Tuitions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container nav">
        <Link className="brand" href="/">
          <img src="/assets/images/logo.svg" alt="Elite logo" />
          Elite
        </Link>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <Link className={pathname === link.href ? "is-active" : ""} href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          {user ? (
            <>
              {user.role === "admin" ? (
                <Link className="btn btn-ghost" href="/dashboard">
                  Dashboard
                </Link>
              ) : null}
              <LogoutButton />
            </>
          ) : (
            <>
              <Link className="btn btn-ghost" href="/login">
                Login
              </Link>
              <Link className="btn btn-primary" href="/register">
                Get Started
              </Link>
            </>
          )}
        </div>
        <button
          className="menu-toggle"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          ☰
        </button>
      </div>
      <div className={`container mobile-panel${open ? " is-open" : ""}`}>
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        {user ? (
          <>
            {user.role === "admin" ? <Link href="/dashboard">Dashboard</Link> : null}
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link className="btn btn-primary" href="/register">
              Get Started
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

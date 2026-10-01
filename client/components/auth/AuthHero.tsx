"use client";

import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { useAuth } from "@/components/auth/AuthProvider";
import { LoginForm } from "@/components/forms/LoginForm";

export function AuthHero() {
  const { user } = useAuth();

  if (!user) {
    return (
      <LoginForm
        title="Welcome to Elite"
        intro="Staff members can sign in here to review, approve, and publish tuition requests."
      />
    );
  }

  return (
    <div className="auth-card">
      <img className="logo-lg" src="/assets/images/logo-mark.png" alt="" />
      <h3>Signed in</h3>
      <p className="tiny">
        {user.name} · {user.role}
      </p>
      <div className="mt-4 grid gap-3">
        {user.role === "admin" || user.role === "editor" ? (
          <Link className="btn btn-primary" href="/dashboard">
            Open dashboard
          </Link>
        ) : (
          <Link className="btn btn-primary" href="/request-tuition">
            Request tuition
          </Link>
        )}
        <LogoutButton className="w-full" />
      </div>
    </div>
  );
}

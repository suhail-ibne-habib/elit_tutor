"use client";

import Link from "next/link";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { useAuth } from "@/components/auth/AuthProvider";
import { LoginForm } from "@/components/forms/LoginForm";

export function AuthHero() {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm title="Welcome to Elite" intro="Login to post a tuition or apply as a tutor." />;
  }

  return (
    <div className="auth-card">
      <img className="logo-lg" src="/assets/images/logo.svg" alt="" />
      <h3>Signed in</h3>
      <p className="tiny">
        {user.name} · {user.role}
      </p>
      <div className="mt-4 grid gap-3">
        {user.role === "admin" ? (
          <Link className="btn btn-primary" href="/dashboard">
            Open dashboard
          </Link>
        ) : (
          <Link className="btn btn-primary" href="/tuitions">
            Browse tuitions
          </Link>
        )}
        <LogoutButton className="w-full" />
      </div>
    </div>
  );
}

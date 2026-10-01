"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (user.role !== "admin" && user.role !== "editor") {
      router.replace("/");
    }
  }, [loading, user, router]);

  if (loading || !user || (user.role !== "admin" && user.role !== "editor")) {
    return <p className="p-8 text-sm text-muted-foreground">Checking staff access...</p>;
  }

  return <>{children}</>;
}

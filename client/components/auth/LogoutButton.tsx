"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();
  const { logout } = useAuth();

  async function onLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <Button type="button" variant="outline" className={className} onClick={() => void onLogout()}>
      Logout
    </Button>
  );
}

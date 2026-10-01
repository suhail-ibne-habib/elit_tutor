import type { Metadata } from "next";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

export const metadata: Metadata = {
  title: "Staff dashboard",
};

export default function DashboardPage() {
  return <AdminDashboard />;
}

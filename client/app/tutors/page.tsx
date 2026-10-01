import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Browse Tuitions",
};

export default function TutorsPage() {
  redirect("/tuitions");
}

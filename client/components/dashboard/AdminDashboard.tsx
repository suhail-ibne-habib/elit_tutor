"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminGuard } from "@/components/dashboard/AdminGuard";
import { TuitionList } from "@/components/dashboard/TuitionList";
import { TuitionForm } from "@/components/forms/TuitionForm";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getError, useAuth } from "@/components/auth/AuthProvider";
import { tuitionApi, type Tuition } from "@/lib/api";

export function AdminDashboard() {
  const { user } = useAuth();
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [error, setError] = useState("");

  const loadTuitions = useCallback(async () => {
    try {
      const { data } = await tuitionApi.list();
      setTuitions(data.data);
    } catch (err) {
      setError(getError(err));
    }
  }, []);

  useEffect(() => {
    void loadTuitions();
  }, [loadTuitions]);

  async function onDelete(id: string) {
    try {
      await tuitionApi.remove(id);
      await loadTuitions();
    } catch (err) {
      setError(getError(err));
    }
  }

  const openCount = tuitions.filter((item) => item.status === "open").length;

  return (
    <AdminGuard>
      <div className="min-h-screen bg-secondary">
        <header className="border-b border-border bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-primary">Admin</p>
              <h1 className="text-xl font-extrabold">Elite dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{user?.email}</span>
              <LogoutButton />
            </div>
          </div>
        </header>

        <main className="mx-auto grid max-w-6xl gap-6 px-6 py-8">
          <section className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardDescription>Signed in as</CardDescription>
              <CardTitle>{user?.name}</CardTitle>
            </Card>
            <Card>
              <CardDescription>Total posts</CardDescription>
              <CardTitle>{tuitions.length}</CardTitle>
            </Card>
            <Card>
              <CardDescription>Open jobs</CardDescription>
              <CardTitle>{openCount}</CardTitle>
            </Card>
          </section>

          <Card>
            <CardTitle>Post a tuition</CardTitle>
            <CardDescription>Admin posts appear on the public tuition board.</CardDescription>
            <div className="mt-5">
              <TuitionForm onCreated={() => void loadTuitions()} />
            </div>
          </Card>

          <Card>
            <CardTitle>All tuitions</CardTitle>
            <CardDescription>Review and remove posts from parents or admin.</CardDescription>
            <div className="mt-5">
              {error ? <p className="mb-3 text-sm font-semibold text-destructive">{error}</p> : null}
              <TuitionList tuitions={tuitions} onDelete={(id) => void onDelete(id)} />
            </div>
          </Card>
        </main>
      </div>
    </AdminGuard>
  );
}

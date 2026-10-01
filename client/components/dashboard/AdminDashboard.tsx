"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import { AdminGuard } from "@/components/dashboard/AdminGuard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TuitionList } from "@/components/dashboard/TuitionList";
import { InviteEditorForm } from "@/components/forms/InviteEditorForm";
import { TuitionForm } from "@/components/forms/TuitionForm";
import { useAuth, getError } from "@/components/auth/AuthProvider";
import { staffApi, tuitionApi, type StaffUser, type Tuition } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

type Panel = "overview" | "pending" | "published" | "rejected" | "publish" | "editors";

const panelCopy: Record<Panel, { title: string; text: string }> = {
  overview: {
    title: "Dashboard",
    text: "Review requests, publish approved jobs, and manage staff access.",
  },
  pending: {
    title: "Pending requests",
    text: "Approve or reject public tuition requests before they go live.",
  },
  published: {
    title: "Published jobs",
    text: "Approved tuition jobs currently visible on the public site.",
  },
  rejected: {
    title: "Rejected requests",
    text: "Requests that staff decided not to publish.",
  },
  publish: {
    title: "Publish tuition",
    text: "Admin-created jobs appear immediately on the public tuition board.",
  },
  editors: {
    title: "Editors",
    text: "Create an editor account and share the credentials with your staff member.",
  },
};

export function AdminDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [panel, setPanel] = useState<Panel>("overview");
  const [query, setQuery] = useState("");
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [staffUsers, setStaffUsers] = useState<StaffUser[]>([]);
  const [error, setError] = useState("");

  const isAdmin = user?.role === "admin";

  const loadTuitions = useCallback(async () => {
    try {
      const { data } = await tuitionApi.listDashboard();
      setTuitions(data.data);
    } catch (err) {
      setError(getError(err));
    }
  }, []);

  const loadUsers = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const { data } = await staffApi.listUsers();
      setStaffUsers(data.users || []);
    } catch (err) {
      setError(getError(err));
    }
  }, [isAdmin]);

  useEffect(() => {
    void loadTuitions();
  }, [loadTuitions]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  async function onDelete(id: string) {
    try {
      await tuitionApi.remove(id);
      await loadTuitions();
    } catch (err) {
      setError(getError(err));
    }
  }

  async function onApprove(id: string) {
    try {
      await tuitionApi.approve(id);
      await loadTuitions();
    } catch (err) {
      setError(getError(err));
    }
  }

  async function onReject(id: string) {
    try {
      await tuitionApi.reject(id);
      await loadTuitions();
    } catch (err) {
      setError(getError(err));
    }
  }

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return tuitions;
    return tuitions.filter((item) =>
      `${item.title} ${item.classLevel} ${item.area} ${item.requesterName} ${item.requesterPhone}`.toLowerCase().includes(needle),
    );
  }, [query, tuitions]);

  const pending = filtered.filter((item) => item.approvalStatus === "pending");
  const published = filtered.filter((item) => item.approvalStatus === "approved");
  const rejected = filtered.filter((item) => item.approvalStatus === "rejected");
  const editors = staffUsers.filter((staff) => staff.role?.includes("editor"));
  const openCount = tuitions.filter((item) => item.status === "open" && item.approvalStatus === "approved").length;

  const nav = [
    { id: "overview" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "pending" as const, label: "Pending", icon: Clock3 },
    { id: "published" as const, label: "Published", icon: CheckCircle2 },
    { id: "rejected" as const, label: "Rejected", icon: XCircle },
    ...(isAdmin
      ? [
          { id: "publish" as const, label: "Publish", icon: Plus },
          { id: "editors" as const, label: "Editors", icon: Users },
        ]
      : []),
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#eef1f4] p-3 text-foreground dark:bg-zinc-950 md:p-6">
        <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-[1400px] overflow-hidden rounded-[28px] border border-border bg-background shadow-[0_24px_80px_rgba(15,23,42,0.12)] lg:grid-cols-[250px_1fr]">
          <aside className="flex flex-col border-b border-border bg-card px-4 py-5 lg:border-b-0 lg:border-r">
            <div className="mb-8 flex items-center gap-3 px-2">
              <img src="/assets/images/logo-mark.png" alt="" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-extrabold">Elite</p>
                <p className="text-xs text-muted-foreground">Staff workspace</p>
              </div>
            </div>

            <p className="px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Menu</p>
            <nav className="mt-3 grid gap-1">
              {nav.map((item) => {
                const Icon = item.icon;
                const active = panel === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPanel(item.id)}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold ${
                      active ? "bg-primary text-[#202020]" : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-auto pt-8">
              <p className="px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">General</p>
              <button
                type="button"
                onClick={() => void logout().then(() => router.push("/login"))}
                className="mt-3 flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold hover:bg-secondary"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </aside>

          <section className="min-w-0">
            <header className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-4 md:px-6">
              <label className="flex min-w-[220px] flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
                <Search size={16} className="text-muted-foreground" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search title, area, or requester"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </label>
              <ThemeToggle className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card" />
              <div className="flex items-center gap-3 rounded-full border border-border bg-card px-3 py-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-extrabold text-[#202020]">
                  {user?.name?.slice(0, 1) || "E"}
                </span>
                <span className="hidden sm:block">
                  <span className="block text-sm font-bold leading-4">{user?.name}</span>
                  <span className="block text-xs text-muted-foreground">{user?.email}</span>
                </span>
              </div>
            </header>

            <div className="grid gap-5 p-4 md:p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight">{panelCopy[panel].title}</h1>
                  <p className="mt-1 text-sm text-muted-foreground">{panelCopy[panel].text}</p>
                </div>
                {isAdmin ? (
                  <div className="flex gap-2">
                    <Button type="button" onClick={() => setPanel("publish")}>
                      Publish job
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setPanel("editors")}>
                      Invite editor
                    </Button>
                  </div>
                ) : null}
              </div>

              {error ? <p className="text-sm font-semibold text-destructive">{error}</p> : null}

              {panel === "overview" ? (
                <>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard label="Pending requests" value={pending.length} hint="Waiting for staff review" accent />
                    <StatCard label="Published jobs" value={published.length} hint="Visible on the public site" />
                    <StatCard label="Open jobs" value={openCount} hint="Approved and still open" />
                    <StatCard label="Rejected" value={rejected.length} hint="Not published" />
                  </div>

                  <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
                    <Card>
                      <CardTitle>Requests to review</CardTitle>
                      <CardDescription>Newest pending tuition requests.</CardDescription>
                      <div className="mt-5">
                        <TuitionList
                          tuitions={pending.slice(0, 4)}
                          emptyMessage="No pending requests match this search."
                          onApprove={(id) => void onApprove(id)}
                          onReject={(id) => void onReject(id)}
                          onDelete={(id) => void onDelete(id)}
                        />
                      </div>
                    </Card>
                    <Card>
                      <CardTitle>Staff</CardTitle>
                      <CardDescription>
                        Signed in as {user?.role}. {isAdmin ? `${editors.length} editor accounts.` : "Editor access."}
                      </CardDescription>
                      <div className="mt-5 grid gap-3">
                        <div className="rounded-2xl bg-primary px-4 py-4 text-[#202020]">
                          <p className="text-xs font-bold uppercase tracking-wide">Your role</p>
                          <p className="mt-1 text-2xl font-extrabold capitalize">{user?.role}</p>
                        </div>
                        {isAdmin
                          ? editors.slice(0, 4).map((staff) => (
                              <div key={staff.id} className="rounded-2xl border border-border px-4 py-3 text-sm">
                                <strong>{staff.name}</strong>
                                <div className="text-muted-foreground">{staff.email}</div>
                              </div>
                            ))
                          : null}
                      </div>
                    </Card>
                  </div>
                </>
              ) : null}

              {panel === "pending" ? (
                <Card>
                  <TuitionList
                    tuitions={pending}
                    emptyMessage="No pending requests match this search."
                    onApprove={(id) => void onApprove(id)}
                    onReject={(id) => void onReject(id)}
                    onDelete={(id) => void onDelete(id)}
                  />
                </Card>
              ) : null}

              {panel === "published" ? (
                <Card>
                  <TuitionList
                    tuitions={published}
                    emptyMessage="No published jobs match this search."
                    onDelete={(id) => void onDelete(id)}
                  />
                </Card>
              ) : null}

              {panel === "rejected" ? (
                <Card>
                  <TuitionList
                    tuitions={rejected}
                    emptyMessage="No rejected requests match this search."
                    onApprove={(id) => void onApprove(id)}
                    onDelete={(id) => void onDelete(id)}
                  />
                </Card>
              ) : null}

              {panel === "publish" && isAdmin ? (
                <Card>
                  <TuitionForm mode="admin" onCreated={() => void loadTuitions()} />
                </Card>
              ) : null}

              {panel === "editors" && isAdmin ? (
                <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                  <Card>
                    <CardTitle>Invite editor</CardTitle>
                    <CardDescription>The new editor can sign in with the email and password you set here.</CardDescription>
                    <div className="mt-5">
                      <InviteEditorForm onInvited={() => void loadUsers()} />
                    </div>
                  </Card>
                  <Card>
                    <CardTitle>Current editors</CardTitle>
                    <CardDescription>{editors.length} editor accounts</CardDescription>
                    <div className="mt-5 grid gap-2">
                      {editors.length === 0 ? <p className="text-sm text-muted-foreground">No editors invited yet.</p> : null}
                      {editors.map((staff) => (
                        <div key={staff.id} className="rounded-2xl border border-border px-4 py-3 text-sm">
                          <strong>{staff.name}</strong>
                          <div className="text-muted-foreground">{staff.email}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </AdminGuard>
  );
}

function StatCard({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: number;
  hint: string;
  accent?: boolean;
}) {
  return (
    <article className={`rounded-3xl border p-5 ${accent ? "border-transparent bg-primary text-[#202020]" : "border-border bg-card"}`}>
      <p className="text-sm font-semibold">{label}</p>
      <p className="mt-3 text-4xl font-extrabold tracking-tight">{value}</p>
      <p className={`mt-2 text-xs ${accent ? "text-[#202020]/70" : "text-muted-foreground"}`}>{hint}</p>
    </article>
  );
}

import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  withCredentials: true,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; error?: { message?: string } | string }
      | undefined;
    if (typeof data?.message === "string" && data.message) return data.message;
    if (typeof data?.error === "string" && data.error) return data.error;
    if (typeof data?.error === "object" && data.error?.message) return data.error.message;
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong.";
}

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  phone?: string;
  image?: string;
};

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const authApi = {
  signIn: (payload: { email: string; password: string }) => api.post("/api/auth/sign-in/email", payload),
  signOut: () => api.post("/api/auth/sign-out"),
  me: () => api.get<ApiEnvelope<{ user: AuthUser }>>("/api/session/me"),
};

export type Tuition = {
  _id: string;
  title: string;
  type: "home" | "online" | "group";
  classLevel: string;
  subjects: string[];
  detail: string;
  requesterName: string;
  requesterPhone: string;
  requesterEmail?: string;
  area: string;
  salary: number;
  daysPerWeek: number;
  schedule: string;
  status: "open" | "closed" | "filled";
  approvalStatus: "pending" | "approved" | "rejected";
  postedByRole: "admin" | "editor" | "";
  approvedBy?: string;
  approvedAt?: string | null;
  publishedAt?: string | null;
};

export const tuitionApi = {
  list: () => api.get<ApiEnvelope<Tuition[]>>("/api/tuitions"),
  listDashboard: (approvalStatus?: string) =>
    api.get<ApiEnvelope<Tuition[]>>("/api/tuitions/dashboard", {
      params: approvalStatus ? { approvalStatus } : undefined,
    }),
  createRequest: (payload: Record<string, unknown>) => api.post<ApiEnvelope<Tuition>>("/api/tuitions/requests", payload),
  createAdmin: (payload: Record<string, unknown>) => api.post<ApiEnvelope<Tuition>>("/api/tuitions", payload),
  approve: (id: string) => api.patch<ApiEnvelope<Tuition>>(`/api/tuitions/${id}/approval`, { approvalStatus: "approved" }),
  reject: (id: string) => api.patch<ApiEnvelope<Tuition>>(`/api/tuitions/${id}/approval`, { approvalStatus: "rejected" }),
  update: (id: string, payload: Record<string, unknown>) => api.patch<ApiEnvelope<Tuition>>(`/api/tuitions/${id}`, payload),
  remove: (id: string) => api.delete(`/api/tuitions/${id}`),
};

export type StaffUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  banned?: boolean;
};

export const staffApi = {
  inviteEditor: (payload: { name: string; email: string; password: string }) =>
    api.post("/api/auth/admin/create-user", { ...payload, role: "editor" }),
  listUsers: () => api.get<{ users: StaffUser[] }>("/api/auth/admin/list-users"),
};

export async function getPublicTuitions(): Promise<Tuition[]> {
  const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    const response = await fetch(`${base}/api/tuitions`, { cache: "no-store" });
    if (!response.ok) return [];
    const payload = (await response.json()) as ApiEnvelope<Tuition[]>;
    return Array.isArray(payload.data) ? payload.data : [];
  } catch {
    return [];
  }
}

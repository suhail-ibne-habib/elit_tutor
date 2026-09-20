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
  role: "admin" | "parent" | "teacher";
  phone?: string;
  image?: string;
};

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const authApi = {
  signUp: (payload: { name: string; email: string; password: string; role: "parent" | "teacher"; phone?: string }) =>
    api.post("/api/auth/sign-up/email", payload),
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
  area: string;
  salary: number;
  daysPerWeek: number;
  schedule: string;
  status: "open" | "closed" | "filled";
  postedByRole: "admin" | "parent";
};

export const tuitionApi = {
  list: () => api.get<ApiEnvelope<Tuition[]>>("/api/tuitions"),
  create: (payload: Record<string, unknown>) => api.post<ApiEnvelope<Tuition>>("/api/tuitions", payload),
  remove: (id: string) => api.delete(`/api/tuitions/${id}`),
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

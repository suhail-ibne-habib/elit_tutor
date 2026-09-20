"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppForm } from "@/components/forms/AppForm";
import { FormAlert } from "@/components/forms/FormAlert";
import { PasswordField } from "@/components/forms/fields/PasswordField";
import { TextField } from "@/components/forms/fields/TextField";
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/api";
import { loginSchema, type LoginValues } from "@/lib/validations";
import { getError, useAuth } from "@/components/auth/AuthProvider";

type LoginFormProps = {
  title?: string;
  intro?: string;
};

export function LoginForm({ title = "Sign in", intro }: LoginFormProps) {
  const router = useRouter();
  const { refresh, user } = useAuth();
  const [error, setError] = useState("");
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (user?.role === "admin") router.replace("/dashboard");
    else if (user) router.replace("/");
  }, [user, router]);

  async function onSubmit(values: LoginValues) {
    setError("");
    try {
      await authApi.signIn(values);
      const sessionUser = await refresh();
      router.push(sessionUser?.role === "admin" ? "/dashboard" : "/");
    } catch (err) {
      setError(getError(err));
    }
  }

  return (
    <div className="auth-card">
      <img className="logo-lg" src="/assets/images/logo.svg" alt="" />
      <h3>{title}</h3>
      {intro ? <p className="tiny">{intro}</p> : null}
      <AppForm form={form} onSubmit={onSubmit}>
        <TextField name="email" label="Email" type="email" placeholder="you@email.com" />
        <PasswordField name="password" label="Password" placeholder="••••••••" />
        <FormAlert error={error} />
        <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Signing in..." : "Login"}
        </Button>
      </AppForm>
      <p className="tiny">
        Need an account? <Link href="/register">Register</Link>
      </p>
    </div>
  );
}

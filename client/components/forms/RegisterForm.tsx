"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppForm } from "@/components/forms/AppForm";
import { FormAlert } from "@/components/forms/FormAlert";
import { PasswordField } from "@/components/forms/fields/PasswordField";
import { SelectField } from "@/components/forms/fields/SelectField";
import { TextField } from "@/components/forms/fields/TextField";
import { Button } from "@/components/ui/button";
import { authApi } from "@/lib/api";
import { registerSchema, type RegisterValues } from "@/lib/validations";
import { getError, useAuth } from "@/components/auth/AuthProvider";

export function RegisterForm() {
  const router = useRouter();
  const { refresh, user } = useAuth();
  const [error, setError] = useState("");
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "parent",
      password: "",
      confirm: "",
    },
  });

  useEffect(() => {
    if (user?.role === "admin") router.replace("/dashboard");
    else if (user) router.replace("/");
  }, [user, router]);

  async function onSubmit(values: RegisterValues) {
    setError("");
    try {
      await authApi.signUp({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
        phone: values.phone?.trim() || undefined,
      });
      const sessionUser = await refresh();
      router.push(sessionUser?.role === "admin" ? "/dashboard" : sessionUser ? "/" : "/login");
    } catch (err) {
      setError(getError(err));
    }
  }

  return (
    <div className="auth-card">
      <img className="logo-lg" src="/assets/images/logo.svg" alt="" />
      <h3>Create account</h3>
      <AppForm form={form} onSubmit={onSubmit}>
        <TextField name="name" label="Full name" placeholder="Your name" />
        <TextField name="email" label="Email" type="email" placeholder="you@email.com" />
        <TextField name="phone" label="Phone" placeholder="01XXXXXXXXX" />
        <SelectField
          name="role"
          label="I am a"
          options={[
            { value: "parent", label: "Parent / Guardian" },
            { value: "teacher", label: "Teacher" },
          ]}
        />
        <PasswordField name="password" label="Password" />
        <PasswordField name="confirm" label="Confirm password" placeholder="Repeat password" />
        <FormAlert error={error} />
        <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Creating account..." : "Register"}
        </Button>
      </AppForm>
      <p className="tiny">
        Already registered? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}

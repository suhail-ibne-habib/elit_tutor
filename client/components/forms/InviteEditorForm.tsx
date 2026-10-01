"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppForm } from "@/components/forms/AppForm";
import { FormAlert } from "@/components/forms/FormAlert";
import { PasswordField } from "@/components/forms/fields/PasswordField";
import { TextField } from "@/components/forms/fields/TextField";
import { Button } from "@/components/ui/button";
import { staffApi } from "@/lib/api";
import { inviteEditorSchema, type InviteEditorValues } from "@/lib/validations";
import { getError } from "@/components/auth/AuthProvider";

type InviteEditorFormProps = {
  onInvited?: () => void;
};

export function InviteEditorForm({ onInvited }: InviteEditorFormProps) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm<InviteEditorValues>({
    resolver: zodResolver(inviteEditorSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(values: InviteEditorValues) {
    setError("");
    setSuccess("");
    try {
      await staffApi.inviteEditor({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      form.reset();
      setSuccess("Editor account created.");
      onInvited?.();
    } catch (err) {
      setError(getError(err));
    }
  }

  return (
    <AppForm form={form} onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <TextField name="name" label="Editor name" placeholder="Editor name" />
      <TextField name="email" label="Editor email" type="email" placeholder="editor@email.com" />
      <PasswordField name="password" label="Temporary password" />
      <PasswordField name="confirm" label="Confirm password" />
      <div className="md:col-span-2 grid gap-3">
        <FormAlert error={error} success={success} />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Creating..." : "Invite editor"}
        </Button>
      </div>
    </AppForm>
  );
}

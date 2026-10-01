"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppForm } from "@/components/forms/AppForm";
import { FormAlert } from "@/components/forms/FormAlert";
import { SelectField } from "@/components/forms/fields/SelectField";
import { TextareaField } from "@/components/forms/fields/TextareaField";
import { TextField } from "@/components/forms/fields/TextField";
import { Button } from "@/components/ui/button";
import { tuitionApi } from "@/lib/api";
import { tuitionSchema, type TuitionValues } from "@/lib/validations";
import { getError } from "@/components/auth/AuthProvider";

type TuitionFormProps = {
  mode?: "request" | "admin";
  onCreated?: () => void;
};

export function TuitionForm({ mode = "request", onCreated }: TuitionFormProps) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm<TuitionValues>({
    resolver: zodResolver(tuitionSchema),
    defaultValues: {
      title: "",
      type: "home",
      classLevel: "",
      subjects: "",
      requesterName: "",
      requesterPhone: "",
      requesterEmail: "",
      area: "",
      salary: "",
      daysPerWeek: "4",
      schedule: "",
      detail: "",
    },
  });

  async function onSubmit(values: TuitionValues) {
    setError("");
    setSuccess("");
    try {
      const payload = {
        ...values,
        subjects: values.subjects.split(",").map((item) => item.trim()).filter(Boolean),
        salary: Number(values.salary),
        daysPerWeek: Number(values.daysPerWeek),
      };

      if (mode === "admin") {
        await tuitionApi.createAdmin(payload);
        setSuccess("Tuition published.");
      } else {
        await tuitionApi.createRequest(payload);
        setSuccess("Request submitted. Our staff will review it.");
      }

      form.reset();
      onCreated?.();
    } catch (err) {
      setError(getError(err));
    }
  }

  return (
    <AppForm form={form} onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <TextField name="title" label="Title" placeholder="Class 8 Mathematics" />
      </div>
      <SelectField
        name="type"
        label="Type"
        options={[
          { value: "home", label: "Home" },
          { value: "online", label: "Online" },
          { value: "group", label: "Group" },
        ]}
      />
      <TextField name="classLevel" label="Class" placeholder="SSC / Class 8" />
      <TextField name="subjects" label="Subjects" placeholder="Math, Physics" />
      <TextField name="requesterName" label="Requester name" placeholder="Guardian / requester name" />
      <TextField name="requesterPhone" label="Phone" placeholder="01XXXXXXXXX" />
      <TextField name="requesterEmail" label="Email (optional)" type="email" placeholder="you@email.com" />
      <TextField name="area" label="Area" placeholder="Dhanmondi" />
      <TextField name="salary" label="Salary (BDT)" type="number" />
      <TextField name="daysPerWeek" label="Days per week" type="number" />
      <TextField name="schedule" label="Schedule" placeholder="Evening, 4 days" />
      <div className="md:col-span-2">
        <TextareaField name="detail" label="Details" placeholder="Describe the tuition need, goals, or preferred teaching style" />
      </div>
      <div className="md:col-span-2 grid gap-3">
        <FormAlert error={error} success={success} />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? mode === "admin"
              ? "Publishing..."
              : "Submitting..."
            : mode === "admin"
              ? "Publish tuition"
              : "Submit request"}
        </Button>
      </div>
    </AppForm>
  );
}

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
  onCreated?: () => void;
};

export function TuitionForm({ onCreated }: TuitionFormProps) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm<TuitionValues>({
    resolver: zodResolver(tuitionSchema),
    defaultValues: {
      title: "",
      type: "home",
      classLevel: "",
      subjects: "",
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
      await tuitionApi.create({
        ...values,
        subjects: values.subjects.split(",").map((item) => item.trim()).filter(Boolean),
        salary: Number(values.salary),
        daysPerWeek: Number(values.daysPerWeek),
      });
      form.reset();
      setSuccess("Tuition posted.");
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
      <TextField name="area" label="Area" placeholder="Dhanmondi" />
      <TextField name="salary" label="Salary (BDT)" type="number" />
      <TextField name="daysPerWeek" label="Days per week" type="number" />
      <TextField name="schedule" label="Schedule" placeholder="Evening, 4 days" />
      <div className="md:col-span-2">
        <TextareaField name="detail" label="Details" placeholder="What should the tutor cover?" />
      </div>
      <div className="md:col-span-2 grid gap-3">
        <FormAlert error={error} success={success} />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Posting..." : "Post tuition"}
        </Button>
      </div>
    </AppForm>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppForm } from "@/components/forms/AppForm";
import { FormAlert } from "@/components/forms/FormAlert";
import { SelectField } from "@/components/forms/fields/SelectField";
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
      classLevel: "",
      subjects: "",
      daysPerWeek: "4",
      tutorGender: "any",
      area: "",
      salary: "",
      requesterPhone: "",
    },
  });

  async function onSubmit(values: TuitionValues) {
    setError("");
    setSuccess("");
    try {
      const payload = {
        classLevel: values.classLevel,
        subjects: values.subjects.split(",").map((item) => item.trim()).filter(Boolean),
        daysPerWeek: Number(values.daysPerWeek),
        tutorGender: values.tutorGender,
        area: values.area,
        salary: Number(values.salary),
        requesterPhone: values.requesterPhone,
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
      <TextField name="classLevel" label="Class" placeholder="Class 8 / SSC / HSC" />
      <TextField name="subjects" label="Subjects" placeholder="Math, Physics" />
      <TextField name="daysPerWeek" label="Days per week" type="number" />
      <SelectField
        name="tutorGender"
        label="Tutor gender"
        options={[
          { value: "any", label: "Any" },
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ]}
      />
      <TextField name="area" label="Location" placeholder="Chawkbazar, Chittagong" />
      <TextField name="salary" label="Salary" type="number" />
      <div className="md:col-span-2">
        <TextField name="requesterPhone" label="Contact no" placeholder="01989562718" />
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

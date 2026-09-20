"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Field } from "@/components/forms/fields/Field";
import { Textarea } from "@/components/ui/textarea";

type TextareaFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
};

export function TextareaField({ name, label, placeholder }: TextareaFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field name={name} label={label} error={fieldState.error?.message}>
          <Textarea id={name} placeholder={placeholder} {...field} value={field.value ?? ""} />
        </Field>
      )}
    />
  );
}

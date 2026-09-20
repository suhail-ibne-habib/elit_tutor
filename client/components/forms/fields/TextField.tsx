"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/forms/fields/Field";

type TextFieldProps = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
};

export function TextField({ name, label, type = "text", placeholder }: TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field name={name} label={label} error={fieldState.error?.message}>
          <Input id={name} type={type} placeholder={placeholder} {...field} value={field.value ?? ""} />
        </Field>
      )}
    />
  );
}

"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Field } from "@/components/forms/fields/Field";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

type SelectFieldProps = {
  name: string;
  label: string;
  options: Option[];
};

export function SelectField({ name, label, options }: SelectFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field name={name} label={label} error={fieldState.error?.message}>
          <select
            id={name}
            className={cn(
              "flex h-11 w-full rounded-xl border border-input bg-secondary px-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-green-100",
            )}
            {...field}
            value={field.value ?? ""}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      )}
    />
  );
}

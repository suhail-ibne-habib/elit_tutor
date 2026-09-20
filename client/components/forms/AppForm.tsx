"use client";

import type { ReactNode } from "react";
import { FormProvider, type FieldValues, type SubmitHandler, type UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

type AppFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  className?: string;
};

export function AppForm<T extends FieldValues>({ form, onSubmit, children, className }: AppFormProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid gap-4 text-left", className)}>
        {children}
      </form>
    </FormProvider>
  );
}

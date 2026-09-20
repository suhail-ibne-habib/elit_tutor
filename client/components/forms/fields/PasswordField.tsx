"use client";

import { TextField } from "./TextField";

type PasswordFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
};

export function PasswordField({ name, label, placeholder = "At least 6 characters" }: PasswordFieldProps) {
  return <TextField name={name} label={label} type="password" placeholder={placeholder} />;
}

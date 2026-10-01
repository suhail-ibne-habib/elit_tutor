import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const inviteEditorSchema = z
  .object({
    name: z.string().min(2, "Enter your full name."),
    email: z.string().email("Enter a valid email."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirm: z.string().min(6, "Confirm your password."),
  })
  .refine((values) => values.password === values.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

export const tuitionSchema = z.object({
  title: z.string().min(3, "Add a tuition title."),
  type: z.enum(["home", "online", "group"]),
  classLevel: z.string().min(1, "Class is required."),
  subjects: z.string().min(1, "Add at least one subject."),
  requesterName: z.string().min(2, "Requester name is required."),
  requesterPhone: z.string().min(7, "Phone is required."),
  requesterEmail: z.union([z.string().email("Enter a valid email."), z.literal("")]).optional(),
  area: z.string().min(2, "Area is required."),
  salary: z
    .string()
    .min(1, "Salary is required.")
    .refine((value) => Number(value) > 0, "Salary is required."),
  daysPerWeek: z
    .string()
    .min(1, "Days per week is required.")
    .refine((value) => {
      const days = Number(value);
      return days >= 1 && days <= 7;
    }, "Use 1 to 7 days."),
  schedule: z.string().optional(),
  detail: z.string().optional(),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type InviteEditorValues = z.infer<typeof inviteEditorSchema>;
export type TuitionValues = z.infer<typeof tuitionSchema>;

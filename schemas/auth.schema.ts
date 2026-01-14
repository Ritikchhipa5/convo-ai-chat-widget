import { ZodType, z } from "zod";

export type UserRegistrationProps = {
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
};

export type UserLoginProps = {
  email: string;
  password: string;
};

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.email({ message: "Incorrect email format" }),
  password: z
    .string()
    .min(8, { message: "Your password must be at least 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    }),
});

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
  .object({
    type: z.string().min(1),
    firstName: z.string().min(4, {
      message: "your first name must be at least 4 characters long",
    }),
    lastName: z
      .string()
      .min(4, { message: "your last name must be at least 4 characters long" }),
    email: z.email({ message: "Incorrect email format" }),
    confirmEmail: z.email(),
    password: z
      .string()
      .min(8, { message: "Your password must be at least 8 characters long" })
      .max(64, {
        message: "Your password can not be longer then 64 characters long",
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "password should contain only alphabets and numbers"
      ),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((schema) => schema.email === schema.confirmEmail, {
    message: "Your email is not match",
    path: ["confirmEmail"],
  });

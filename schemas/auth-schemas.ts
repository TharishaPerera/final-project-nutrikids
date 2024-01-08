import * as z from "zod";

/**
 * Login schema for login form
 */
export const LoginSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required!",
  }).email({
    message: "Invalid email address!",
  }),
  password: z.string().min(1, {
    message: "Password is required!",
  }),
  code: z.optional(z.string()),
});

/**
 * Registration schema for registration form
 */
export const RegisterSchema = z
  .object({
    email: z.string().min(1, {
      message: "Email is required!",
    }).email({
      message: "Invalid email address!",
    }),
    name: z.string().min(1, {
      message: "Name field is required!",
    }),
    password: z.string().min(8, {
      message: "Password should be minimum 8 characters!",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password field is required!",
    }),
    userType: z.string(),
    noOfChildren: z.string(),
    youngestAge: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords should be identical",
    path: ["confirmPassword"],
  });

/**
 * Password reset form schema
 */
export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

/**
 * New password form schema
 */
export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Minimum 8 characters required",
  }),
});

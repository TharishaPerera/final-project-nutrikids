import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

/**
 * User profile general form schema
 */
export const UserProfileSchema = z.object({
  name: z.string().min(1, {
    message: "Name field is required!",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required!",
    })
    .email({
      message: "Invalid email address!",
    }),
  image: z.any().optional(),
  twoFactorEnabled: z.boolean(),
});

/**
 * User profile password update form schema
 */
export const PasswordUpdateSchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Current password is required!",
    }),
    newPassword: z.string().min(8, {
      message: "New password should be minimum 8 characters!",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password field is required!",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords should be identical",
    path: ["confirmPassword"],
  });

/**
 * User profile pediatrician details update form schema
 */
export const ConsultantSchema = z.object({
  specializations: z.string().min(1, {
    message: "Specializations field is required!",
  }),
  description: z.string().min(1, {
    message: "Description field is required!",
  }),
  qualifications: z.string().min(1, {
    message: "Qualifications field is required!",
  }),
});

import * as z from "zod";

/**
 * User role update form schema
 */
export const UserRoleSchema = z.object({
  role: z.string().min(1, "Role is required"),
});

/**
 * User create form schema
 */
export const UserCreateSchema = z.object({
  email: z
    .string({
      required_error: "Email is required!",
    })
    .min(1, {
      message: "Email is required!",
    })
    .email({
      message: "Invalid email address!",
    }),
  name: z.string({
    required_error: "Name field is required!",
  }).min(1, {
    message: "Name field is required!",
  }),
  role: z.string({
    required_error: "User role is required!",
  }),
});

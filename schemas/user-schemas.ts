import * as z from "zod";

/**
 * User role update form schema
 */
export const UserRoleSchema = z.object({
  role: z.string().min(1, "Role is required"),
});

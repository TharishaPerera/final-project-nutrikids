import { z } from "zod";

/**
 * Children form schema
 */
export const NotificationFormSchema = z.object({
  title: z.string({
    required_error: "Title field is required!",
  }),
  description: z.string({
    required_error: "Description field is required!",
  }),
  targetUsers: z.enum(["100", "1000"], {
    required_error: "You have to select at least one target user roles",
  }),
});

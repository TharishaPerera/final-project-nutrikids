import { z } from "zod";

/**
 * Children form schema
 */
export const ChildrenFormSchema = z.object({
  name: z.string({
    required_error: "Name field is required!",
  }),
  dateOfBirth: z.date({
    required_error: "Date of birth field is required!",
  }),
  gender: z.string({
    required_error: "Gender field is required!",
  }),
});

import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

/**
 * User profile general form schema
 */
export const userProfileSchema = z.object({
  name: z.string().min(1, {
    message: "Name field is required!",
  }),
  email: z.string().min(1, {
    message: "Email is required!",
  }).email({
    message: "Invalid email address!",
  }),
  image: z.any().optional(),
  twoFactorEnabled: z.boolean(),
});
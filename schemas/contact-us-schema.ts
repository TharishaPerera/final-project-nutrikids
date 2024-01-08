import * as z from "zod";

/**
 * Contact us form schema
 */
export const contactUsSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

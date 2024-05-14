import { z } from "zod";

/**
 * Medical history schema
 */
export const MedicalHistorySchema = z.object({
  child: z.string({
    required_error: "Please select a child!",
  }),
  description: z.string({
    required_error: "Please enter a description!",
  }),
  files: z.array(z.string()).optional(),
});

import { z } from "zod";

/**
 * Availability form schema
 */
export const AvailabilityFormSchema = z.object({
  hospital: z.string({
    required_error: "Hospital field is required!",
  }),
  location: z
    .string({
      required_error: "Location field is required!",
    }),
  from: z.string({
    required_error: "Start time field is required!",
  }),
  to: z.string({
    required_error: "End time field is required!",
  }),
  dates: z.string({
    required_error: "Dates field is required!",
  }),
});

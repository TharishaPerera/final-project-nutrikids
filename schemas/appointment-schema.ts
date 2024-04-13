import { z } from "zod";

/**
 * Appointment schema
 */
export const AppointmentSchema = z.object({
  date: z.date({
    required_error: "Date is required!",
  }).optional(),
  child: z.string({
    required_error: "Please select a child!",
  }),
  timeSlot: z.string({
    required_error: "Please select a time slot!",
  }),
  notes: z.string().optional(),
});

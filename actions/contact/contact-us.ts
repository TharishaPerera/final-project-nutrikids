"use server"

import { contactUsSchema } from '@/schemas/contact-us-schema'
import * as z from 'zod'

export const sendContactEmail = async (values: z.infer<typeof contactUsSchema>) => {
    const validatedValues = contactUsSchema.safeParse(values);

    console.log(validatedValues)

    return { success: "Message sent successfully!" }
}
"use server"

import * as z from "zod"
import { RegisterSchema } from "@/schemas/auth-schemas"
import prisma from "@/lib/prisma"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/smtp"
import { hashPassword } from "@/lib/encrypt"
import { getRandomUserImage } from "@/lib/images"

/**
 * User registration 
 * @param values RegistrationSchema
 * @returns object
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { name, email, password, userType } = validatedFields.data
    const hashedPassword = await hashPassword(password)

    const existingUser = await getUserByEmail(email)
    
    if (existingUser) {
        return { error: "Email already in use!" }
    }

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            role: userType == "consultant" ? 10003 : 10001,
            image: getRandomUserImage()
        }
    })

    if (userType == "consultant") {
        await prisma.pediatrician.create({
            data: {
                userId: user.id
            }
        })
    }

    const verificationToken = await generateVerificationToken(email)

    // Send verification token email
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation email sent!" }
}

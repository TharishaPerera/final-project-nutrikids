"use server"

import { RegisterSchema } from "@/schemas/auth-schemas"
import * as z from "zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import { UserRole } from "@prisma/client"

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
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email)
    
    if (existingUser) {
        return { error: "Email already in use!" }
    }

    await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            role: userType as UserRole
        }
    })

    const verificationToken = await generateVerificationToken(email)

    // Send verification token email
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation email sent!" }
}

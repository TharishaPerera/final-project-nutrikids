"use server"

import { currentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { userProfileSchema } from "@/schemas/user-profile-schema"
import { z } from "zod"

export const updateGeneralDetails = async (values: z.infer<typeof userProfileSchema>) => {
    const validatedFields = userProfileSchema.safeParse(values)
    const session = await currentUser()
    console.log("SESSION: ", session);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { name, image, twoFactorEnabled } = validatedFields.data

    const user = await prisma.user.update({
        where: {
            id: session?.id
        },
        data: {
            name: name,
            isTwoFactorEnabled: twoFactorEnabled,
            image: image != "" ? image : null
        }
    })
    
    return { success: "General details updated successfully!" }
}
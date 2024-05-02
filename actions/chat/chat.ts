"use server"

import { currentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export const postMessage = async (message: string) => {
    "use server"

    const session = await currentUser()

}
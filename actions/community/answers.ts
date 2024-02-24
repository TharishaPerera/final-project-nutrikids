"use server"

import { NewAnswerSchema } from "@/schemas/community-schema"
import { z } from "zod"
import { headers } from 'next/headers';
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * Submit a answer / comment on a post
 * @param value NewAnswerSchema
 * @returns message object
 */
export const SubmitAnswer = async (value: z.infer<typeof NewAnswerSchema>) => {
    const validatedFields = NewAnswerSchema.safeParse(value)
    const headersList = headers();
    const url = headersList.get('referer')
    const parts = url?.split("/");
    const slug = parts && parts[parts.length - 1];
    const session = await currentUser();

    if (!session || !session.id) {
      return { error: "User id not found!" };
    }
    if (!validatedFields.success) {
      return { error: "Invalid inputs provided!" };
    }
    if (!slug) {
        return { error: "Post id not found!" };
    }

    const { answer } = validatedFields.data
    await prisma.comment.create({
        data: {
            postId: slug,
            userId: session.id,
            content: answer
        }
    })

    return { success: "Answer posted successfully!"}
}


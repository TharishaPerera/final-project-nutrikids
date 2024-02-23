"use server";

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NewPostSchema } from "@/schemas/new-post-schema";
import * as z from "zod";

/**
 *
 * @param values NewPostSchema
 * @returns message object
 */
export const createPost = async (values: z.infer<typeof NewPostSchema>) => {
  const validatedFields = NewPostSchema.safeParse(values);
  const session = await currentUser();

  if (!session || !session.id) {
    return { error: "User id not found!" };
  }

  if (!validatedFields.success) {
    return { error: "Invalid inputs provided!" };
  }

  const { title, content } = validatedFields.data;

  // TODO: handle media here

  const post = await prisma.post.create({
    data: {
      userId: session?.id,
      title: title,
      content: content,
    },
  });

  return { success: "Post created successfully!" };
};

/**
 * Get all community posts
 */
export const getAllPosts = async () => {
  try {
    const allPosts = await prisma.post.findMany({
      where: {
        status: {
          in: ["NEW", "APPROVED", "EDITED"], // TODO: Remove NEW status
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          include: {
            userRole: {
              select: {
                role: true,
              },
            },
          },
        },
        comment: true,
        _count: {
          select: {
            comment: true,
          },
        },
      },
    });
    return { data: allPosts };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
};

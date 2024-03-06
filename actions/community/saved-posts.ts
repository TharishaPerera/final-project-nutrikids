"use server";

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

/**
 * Retrieves the saved posts for a given user.
 *
 * @param {string} userId - The ID of the user
 * @return {Promise<SavedPost[]>} An array of saved posts with their associated post details
 */
export const getSavedPosts = async () => {
  const session = await currentUser();

  if (!session || !session.id) {
    return { error: "User id not found!" };
  }
  const posts = await prisma.savedPost.findMany({
    where: {
      userId: session.id,
    },
    include: {
      post: true,
    },
    orderBy: {
      post: {
        createdAt: "desc",
      },
    },
  });

  return { savedPosts: posts };
};

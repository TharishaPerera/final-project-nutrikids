"use server";

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { MyPostsInterface } from "@/interfaces/post-interfaces/saved-post-interfaces";

/**
 * Retrieves the saved posts for a given user.
 *
 * @param {string} userId - The ID of the user
 * @return {Promise<MyPostsInterface[]>} An array of saved posts with their associated post details
 */
export const getMyPosts = async () => {
  const session = await currentUser();

  if (!session || !session.id) {
    return { error: "User id not found!" };
  }

  const posts: MyPostsInterface[] = await prisma.post.findMany({
    where: {
      userId: session.id,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      content: true
    },
    orderBy: {
      createdAt: "desc",
    }
  });

  return { myPosts: posts };
};

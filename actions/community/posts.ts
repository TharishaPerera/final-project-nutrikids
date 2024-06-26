"use server";

import { AllPostsInterface } from "@/interfaces/post-interfaces/all-post-interface";
import { PostInterface } from "@/interfaces/post-interfaces/post-interface";
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NewPostSchema } from "@/schemas/community-schema";
import { Post, PostStatus } from "@prisma/client";
import * as z from "zod";

/**
 * Create a post on community
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

  const { title, content, media } = validatedFields.data;

  const post = await prisma.post.create({
    data: {
      userId: session?.id,
      title: title,
      content: content,
      media: media,
    },
  });

  return { success: "Post created successfully!", post: post.id };
};

/**
 * Update a post on community
 * @param values NewPostSchema
 * @returns message object
 */
export const updatePost = async (values: z.infer<typeof NewPostSchema>) => {
  const validatedFields = NewPostSchema.safeParse(values);
  const session = await currentUser();

  if (!session || !session.id) {
    return { error: "User id not found!" };
  }

  if (!validatedFields.success) {
    return { error: "Invalid inputs provided!" };
  }

  const { id, title, content, media } = validatedFields.data;

  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      userId: session?.id,
      title: title,
      content: content,
      media: media,
      status: PostStatus.EDITED,
    },
  });

  return { success: "Post updated successfully!", post: post.id };
};

/**
 * Get all community posts
 */
export const getAllPosts = async () => {
  try {
    const allPosts: AllPostsInterface[] = await prisma.post.findMany({
      where: {
        status: {
          in: ["APPROVED"],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            userRole: {
              select: {
                role: true,
              },
            },
          },
        },
        _count: {
          select: {
            comment: true,
          },
        },
      },
    });

    return { allPosts };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
};

/**
 * Get post by post id
 * @param id string
 * @returns post
 */
export const GetPostById = async (id: string) => {
  if (!id) {
    return { error: "Post id not found!" };
  }

  const post: PostInterface | null = await prisma.post.findFirst({
    where: {
      id: id,
    },
    include: {
      user: {
        select: {
          name: true,
          userRole: {
            select: {
              role: true,
            },
          },
        },
      },
      comment: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: {
            select: {
              name: true,
              userRole: {
                select: {
                  role: true,
                },
              },
            },
          },
        },
      },
      _count: {
        select: {
          comment: true,
        },
      },
    },
  });

  return { post };
};

/**
 * Save post for the current user
 * @param id string
 * @returns message object
 */
export const SaveUnsavePost = async (id: string) => {
  const session = await currentUser();

  if (!session || !session.id) {
    return { error: "User id not found!" };
  }
  if (!id) {
    return { error: "Post id not found!" };
  }

  // check if the post is already saved
  const savedPost = await prisma.savedPost.findFirst({
    where: {
      userId: session.id,
      postId: id,
    },
  });

  // if post is already saved delete id
  if (savedPost) {
    await prisma.savedPost.delete({
      where: {
        id: savedPost.id,
      },
    });

    return { success: "Post unsaved successfully!" };
  }

  // else save the post for current user
  await prisma.savedPost.create({
    data: {
      postId: id,
      userId: session.id,
    },
  });

  return { success: "Post saved successfully!" };
};

/**
 * Check current post is saved or not by the current user
 * @param id string
 * @returns saved boolean value
 */
export const IsCurrentPostSaved = async (id: string) => {
  const session = await currentUser();

  if (!session || !session.id) {
    return { error: "User id not found!" };
  }
  if (!id) {
    return { error: "Post id not found!" };
  }

  const isCurrentPostSaved = await prisma.savedPost.findFirst({
    where: {
      userId: session.id,
      postId: id,
    },
  });

  if (isCurrentPostSaved) {
    return { saved: true };
  } else {
    return { saved: false };
  }
};

// TODO: Add MarkPostHelpful
export const MarkPostHelpful = async (id: string) => {
  if (!id) {
    return { error: "Post id not found!" };
  }
};

export const DeletePost = async (id: string) => {
  const session = await currentUser();
  if (!session || !session.id) {
    return { error: "User id not found!" };
  }
  if (!id) {
    return { error: "Post id not found!" };
  }

  try {
    await prisma.post.delete({
      where: {
        id: id,
        userId: session.id,
      },
    });

    return { success: "Post deleted successfully!" };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when deleting post!" };
  }
};

/**
 * Get posts by status
 * @param status PostStatus
 * @returns posts
 */
export const GetPostsByStatus = async (status: PostStatus[]) => {
  const session = await currentUser();
  if (!session || !session.id) {
    return { error: "User id not found!" };
  }
  if (!status) {
    return { error: "Post status is not Specified!" };
  }

  try {
    const posts: Post[] = await prisma.post.findMany({
      where: {
        status: {
          in: status,
        },
      }
    })

    return { posts }
  } catch (error) {
    console.log(error)
    return { error: "Error occurred when retrieving posts!" };
  }
}

/**
 * Update post status
 * @param postId string
 * @param status PostStatus
 * @returns string
 */
export const UpdatePostStatus = async (postId: string, status: PostStatus) => {
  const session = await currentUser();
  if (!session || !session.id) {
    return { error: "User id not found!" };
  }
  if (!status) {
    return { error: "Post status is not Specified!" };
  }
  if (!postId) {
    return { error: "Post id is not found!" };
  }

  try {
    await prisma.post.update({
      data: {
        status: status
      },
      where: {
        id: postId
      }
    })

    return { success: "Post status updated successfully!" };
  } catch (error) {
    console.log(error)
    return { error: "Error occurred when retrieving posts!" };
  }
}
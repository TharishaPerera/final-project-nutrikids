import prisma from "@/lib/prisma";

/**
 * Get user by user email
 * @param email string
 * @returns string | null
 */
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  } catch {
    return null;
  }
};

/**
 * Get user by user id
 * @param id string
 * @returns // TODO: add user type from prisma
 */
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return user;
  } catch {
    return null;
  }
};

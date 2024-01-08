import prisma from "@/lib/prisma";

/**
 * Get users linked account by user id
 * @param userId string
 * @returns // TODO: add Account type from prisma schema
 */
export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: {
        userId: userId,
      },
    });

    return account;
  } catch {
    return null;
  }
};

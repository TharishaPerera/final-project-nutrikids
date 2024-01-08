import prisma from "@/lib/prisma";

/**
 * Get two factor confirmation by user id
 * @param userId string
 * @returns string | null
 */
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await prisma.twoFactorConfirmation.findUnique(
      {
        where: {
          userId: userId,
        },
      }
    );
    return twoFactorConfirmation;
  } catch {
    return null;
  }
};

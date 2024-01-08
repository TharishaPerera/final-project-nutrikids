import prisma from "@/lib/prisma";

/**
 * Get two factor token by token
 * @param token string
 * @returns string | null
 */
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findUnique({
      where: {
        token: token,
      },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

/**
 * Get two factor token by user email
 * @param email string
 * @returns string | null
 */
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: {
        email: email,
      },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

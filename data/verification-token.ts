import prisma from "@/lib/prisma";

/**
 * Get verification token by token
 * @param token string
 * @returns string | null
 */
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token: token,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

/**
 * Get verification token by user email
 * @param email string
 * @returns string | null
 */
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        email: email,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

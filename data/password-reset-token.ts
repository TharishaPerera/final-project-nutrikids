import prisma from "@/lib/prisma";

/**
 * Get password reset token by token
 * @param token string
 * @returns string | null
 */
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token: token,
      },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

/**
 * Get password reset token by user email
 * @param email string
 * @returns string | null
 */
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: {
        email: email,
      },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

"use server";

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  PasswordUpdateSchema,
  UserProfileSchema,
} from "@/schemas/user-profile-schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { hashPassword } from "@/lib/encrypt";

interface USerData {
  name: string;
  image: string | null;
  isTwoFactorEnabled?: boolean;
}

/**
 * Update general details of user profile
 * @param values UserProfileSchema
 * @returns object
 */
export const updateGeneralDetails = async (
  values: z.infer<typeof UserProfileSchema>
) => {
  const validatedFields = UserProfileSchema.safeParse(values);
  const session = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, image, twoFactorEnabled } = validatedFields.data;

  const userData: USerData = {
    name: name,
    image: image != "" ? image : null,
  };

  if (!session?.isOAuth) {
    userData.isTwoFactorEnabled = twoFactorEnabled;
  }

  const user = await prisma.user.update({
    where: {
      id: session?.id,
    },
    data: userData,
  });

  return { success: "General details updated successfully!" };
};

/**
 * Update password of user profile
 * @param values PasswordUpdateSchema
 * @returns object
 */
export const updatePassword = async (
  values: z.infer<typeof PasswordUpdateSchema>
) => {
  const validatedFields = PasswordUpdateSchema.safeParse(values);
  const session = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  const dbPassword = await prisma.user.findUnique({
    where: {
      id: session?.id,
    },
    select: {
      password: true,
    },
  });

  if (!dbPassword) {
    return { error: "Current user doesn't have a password!" };
  }
  const passwordMatch = await bcrypt.compare(
    currentPassword,
    dbPassword?.password!
  );
  if (!passwordMatch) {
    return { error: "Incorrect current password!" };
  }

  // update password
  const hashedPassword = await hashPassword(newPassword);
  await prisma.user.update({
    where: {
      id: session?.id,
    },
    data: {
      password: hashedPassword,
    },
  });
  return { success: "Password details updated successfully!" };
};

"use server";

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  ConsultantSchema,
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
  values: z.infer<typeof UserProfileSchema>,
  userId?: string
) => {
  const validatedFields = UserProfileSchema.safeParse(values);
  const session = await currentUser();

  const updateWhere = userId ?? session?.id;

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
      id: updateWhere,
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

/**
 * Update consultant details of user profile
 * @param values ConsultantSchema
 * @returns object
 */
export const updateConsultantDetails = async (
  values: z.infer<typeof ConsultantSchema>,
  pediatricianId?: string
) => {
  const validatedFields = ConsultantSchema.safeParse(values);
  const session = await currentUser();

  const updateWhere = pediatricianId ?? session?.id;

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { specializations, description, qualifications } = validatedFields.data;

  const consultantDetails = await prisma.pediatrician.update({
    where: {
      userId: updateWhere,
    },
    data: {
      specializations: specializations,
      description: description,
      qualifications: qualifications,
    },
  });

  return {
    success: "Pediatrician details updated successfully!",
    data: consultantDetails,
  };
};

/**
 * Get user details of user profile
 * @param id string
 * @returns object
 */
export const getUserDetails = async (id: string) => {
  if (!id) {
    return { error: "User not found!" };
  }

  try {
    const userDetails = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        name: true,
        image: true,
        email: true,
        telephone: true,
        isPediatrician: true,

        // TODO: include assistant details as well
        // isAssistant: true,
      },
    });

    return { userDetails };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
};

/**
 * Delete user account
 */
export const deleteAccount = async () => {
  const session = await currentUser();

  if (!session) {
    return { error: "User not found!" };
  }

  const { id } = session;

  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when deleting account!" };
  }
}
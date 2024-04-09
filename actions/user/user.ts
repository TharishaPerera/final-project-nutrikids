"use server";

import { getAccountByUserId } from "@/data/account";
import { UserProfileInterface, UserTableInterface } from "@/interfaces/user-interfaces/user-interfaces";
import { currentUser } from "@/lib/auth";
import { hashPassword } from "@/lib/encrypt";
import { getRandomUserImage } from "@/lib/images";
import prisma from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/smtp";
import { UpdateUserPasswordSchema } from "@/schemas/user-profile-schema";
import { UserCreateSchema } from "@/schemas/user-schemas";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

export const getAllUsers = async () => {
  try {
    const users: UserTableInterface[] = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        telephone: true,
        userRole: {
          select: {
            role: true,
          },
        },
        emailVerified: true,
      },
    });

    return { users };
  } catch (error: Prisma.PrismaClientKnownRequestError | Error | any) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
};

/**
 * Get user by user id
 * @param id string
 * @returns 
 */
export const getUserById = async (id: string) => {
  if (!id) {
    return { error: "User id not found!" };
  }

  try {
    const userDetails: UserProfileInterface | null = await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        name: true,
        image: true,
        email: true,
        telephone: true,
        isPediatrician: true,
        isTwoFactorEnabled: true,
      },
    });

    if (!userDetails) {
      return { error: "User not found!" };
    }

    // check if the user has an OAuth account
    const existingAccount = await getAccountByUserId(id)
    userDetails.isOAuth = !!existingAccount

    console.log(userDetails)
    return { userDetails };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
}

/**
 * Create new user
 * @param values UserCreateSchema
 * @returns success, userId or error
 */
export const createUser = async (values: z.infer<typeof UserCreateSchema>) => {
  try {
    const validatedFields = UserCreateSchema.safeParse(values);
    const session = await currentUser();
    if (!session || !session.id) {
      redirect("/auth/sign-in");
    }
    if (!validatedFields.success) {
      return { error: "Invalid inputs provided!" };
    }

    const { email, name, role } = validatedFields.data;

    let roleId;
    switch (role.toLowerCase()) {
      case "user":
        roleId = 10001;
        break;
      case "assistant":
        roleId = 10002;
        break;
      case "consultant":
        roleId = 10003;
        break;
      case "company_admin":
        roleId = 10004;
        break;
      case "super_admin":
        roleId = 10005;
        break;
      default:
        roleId = 10001;
        break;
    }

    // create user
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        role: roleId,
        password: await hashPassword(process.env.DEFAULT_USER_PASSWORD!),
        image: getRandomUserImage()
      },
    });

    // create pediatrician
    if (role.toLowerCase() == "consultant") {
      const pediatrician = await prisma.pediatrician.create({
        data: {
          userId: user.id,
        },
      });
    }

    // send welcome email
    if (user.email) {
      await sendWelcomeEmail(user.email);
    }

    return { success: "User created successfully!", userId: user.id };
  } catch (error: Prisma.PrismaClientKnownRequestError | Error | any) {
    console.log(error);
    if (error.code === "P2002") { // unique constraint violation
      return { error: "Email already exists!" };
    }
    return { error: "Error occurred when retrieving data!" };
  }
};

/**
 * Update password of user 
 * @param values UpdateUserPasswordSchema
 * @returns object
 */
export const updateUserPassword = async (
  values: z.infer<typeof UpdateUserPasswordSchema>,
  userId: string
) => {
  const validatedFields = UpdateUserPasswordSchema.safeParse(values);

  if (!userId) {
    return { error: "User id not found!" };
  }

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { newPassword } = validatedFields.data;

  // update password
  const hashedPassword = await hashPassword(newPassword);
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });
  return { success: "Password details updated successfully!" };
};
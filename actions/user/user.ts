"use server";

import { UserTableInterface } from "@/interfaces/user-interfaces/user-interfaces";
import { currentUser } from "@/lib/auth";
import { hashPassword } from "@/lib/encrypt";
import { getRandomUserImage } from "@/lib/images";
import prisma from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/smtp";
import { UserCreateSchema } from "@/schemas/user-schemas";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { chatRegisterUser } from "../pediatrician/chat";

/**
 * Get all users
 * @returns users UserTableInterface[]
 */
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
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
};

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

    // register user in the chat server
    chatRegisterUser({ username: name, email: email, role: role })

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

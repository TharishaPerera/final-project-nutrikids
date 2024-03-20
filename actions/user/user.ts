"use server";

import { UserTableInterface } from "@/interfaces/user-interfaces";
import prisma from "@/lib/prisma";

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

"use server";

import { UserRoleTableInterface } from "@/interfaces/user-interfaces/user-role-interfaces";
import prisma from "@/lib/prisma";

export const getAllUserRoles = async () => {
  try {
    const userRoles: UserRoleTableInterface[] = await prisma.userRole.findMany({
      select: {
        id: true,
        level: true,
        role: true
      },
    });

    return { userRoles };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
};
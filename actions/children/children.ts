"use server";

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ChildrenFormSchema } from "@/schemas/children-schema";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";

/**
 * Get current users children
 * @returns children
 */
export const getMyChildren = async () => {
  try {
    const session = await currentUser();
    if (!session || !session.id) {
      redirect("/auth/sign-in");
    }

    const children = await prisma.child.findMany({
      where: {
        parentId: session.id,
      },
    });

    return { children };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
};

/**
 * Add child to the system
 * @param values ChildrenFormSchema
 * @returns
 */
export const addNewChild = async (
  values: z.infer<typeof ChildrenFormSchema>
) => {
  try {
    const validatedFields = ChildrenFormSchema.safeParse(values);
    const session = await currentUser();
    if (!session || !session.id) {
      redirect("/auth/sign-in");
    }
    if (!validatedFields.success) {
      return { error: "Invalid inputs provided!" };
    }

    const { name, gender, dateOfBirth } = validatedFields.data;
    const child = await prisma.child.create({
      data: {
        name: name,
        gender: gender,
        dateOfBirth: dateOfBirth,
        parentId: session.id,
      },
    });

    return { success: "Child added to the system successfully!" };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when adding child!" };
  }
};

/**
 * Remove child from the system by child id
 * @param id string
 * @returns string
 */
export const removeChild = async (id: string) => {
  const session = await currentUser();
  if (!session || !session.id) {
    return { error: "User id not found!" };
  }
  if (!id) {
    return { error: "Child id not found!" };
  }
  try {
    const child = await prisma.child.delete({
      where: {
        id: id,
        parentId: session.id,
      },
    });

    return { success: "Child deleted successfully!" };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when deleting child!" };
  }
};

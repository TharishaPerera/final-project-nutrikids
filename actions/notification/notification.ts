"use server";

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NotificationFormSchema } from "@/schemas/notification-schema";
import { redirect } from "next/navigation";
import { z } from "zod";

/**
 * Create new notification
 * @param values ChildrenFormSchema
 * @returns
 */
export const CreateNewNotification = async (
  values: z.infer<typeof NotificationFormSchema>
) => {
  try {
    const validatedFields = NotificationFormSchema.safeParse(values);
    const session = await currentUser();
    if (!session || !session.id || session.level < 5000) {
      redirect("/auth/sign-in");
    }
    if (!validatedFields.success) {
      return { error: "Invalid inputs provided!" };
    }

    const { title, description, targetUsers } = validatedFields.data;
    await prisma.notification.create({
      data: {
        title: title,
        description: description,
        targetUsers: parseInt(targetUsers),
      },
    });

    return { success: "Notification created successfully!" };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred creating notification!" };
  }
};

/**
 * Get all notifications
 * @returns Notifications
 */
export const GetAllNotifications = async () => {
  try {
    const session = await currentUser();
    if (!session || !session.id || session.level < 5000) {
      redirect("/auth/sign-in");
    }
    const notifications = await prisma.notification.findMany({
      orderBy: {
        createdAt: "desc",
      }
    });
    return { notifications };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
}

/**
 * Get my notifications
 * @returns Notifications
 */
export const GetMyNotifications = async () => {
  try {
    const session = await currentUser();
    if (!session || !session.id) {
      redirect("/auth/sign-in");
    }
    const notifications = await prisma.notification.findMany({
      where: {
        targetUsers: {
          lte: session.level
        }
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });
    return { notifications };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
}
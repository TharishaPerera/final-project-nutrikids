"use server";

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendNotificationEmail } from "@/lib/smtp";
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

    const { title, description, targetUsers, type } = validatedFields.data;
    const notificationData = {
      title: title,
      description: description,
      targetUsers: parseInt(targetUsers),
      type: type,
    };
    await prisma.notification.create({
      data: notificationData,
    });

    if (type === "EMAIL") {
      if (targetUsers === "100") {
        // send to all users
        const allUserEmails = await prisma.user.findMany({
          select: {
            email: true,
            name: true,
          },
          where: {
            userRole: {
              role: {
                in: ["USER", "CONSULTANT"],
              },
            },
          },
        });

        SendEmailNotifications(allUserEmails, notificationData);
      } else if (targetUsers === "1000") {
        // send to all pediatricians
        const allPediatricianEmails = await prisma.user.findMany({
          select: {
            email: true,
            name: true,
          },
          where: {
            userRole: {
              role: "CONSULTANT",
            },
          },
        });

        SendEmailNotifications(allPediatricianEmails, notificationData);
      }
    }

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
      },
    });
    return { notifications };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
};

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
          lte: session.level,
        },
        type: "IN_APP",
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
};

/**
 * Send email notifications
 */
export const SendEmailNotifications = async (
  emails: { email: string | null; name: string | null }[],
  { title, description }: { title: string; description: string }
) => {
  if (emails.length > 0) {
    emails.forEach(async ({ email, name }, index) => {
      console.log(email, name);
      const emailData = {
        name: name,
        email: email,
        title: title,
        description: description,
      };
      sendNotificationEmail(emailData);
    });
  }
};

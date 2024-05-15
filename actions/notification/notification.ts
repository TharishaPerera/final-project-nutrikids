"use server"

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
          targetUsers: targetUsers,
        },
      });
  
      return { success: "Notification created successfully!" };
    } catch (error) {
      console.log(error);
      return { error: "Error occurred creating notification!" };
    }
  };
  
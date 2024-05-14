"use server";

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { MedicalHistorySchema } from "@/schemas/medical-history-schema";
import { redirect } from "next/navigation";
import { z } from "zod";

/**
 * Create new medical record
 * @param values MedicalHistorySchema
 * @returns string
 */
export const AddNewRecord = async (
  values: z.infer<typeof MedicalHistorySchema>
) => {
  try {
    const validatedFields = MedicalHistorySchema.safeParse(values);
    const session = await currentUser();
    if (!session || !session.id) {
      redirect("/auth/sign-in");
    }
    if (!validatedFields.success) {
      return { error: "Invalid inputs provided!" };
    }

    const { child, description, files } = validatedFields.data;

    await prisma.healthRecord.create({
      data: {
        childId: child,
        additionalNotes: description,
        documents: JSON.stringify(files),
      },
    });

    return { success: "Health record added successfully!" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
};

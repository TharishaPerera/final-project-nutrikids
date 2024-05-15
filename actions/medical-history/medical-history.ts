"use server";

import { MedicalHistoryForAdminsInterface, MedicalHistoryForParentsInterface } from "@/interfaces/medial-history-interfaces/medical-history-interfaces";
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

/**
 * Get medical records of children for parents
 * @returns healthRecords
 */
export const GetMedicalHistoryForParents = async () => {
  try {
    const session = await currentUser();
    if (!session || !session.id) {
      redirect("/auth/sign-in");
    }

    const healthRecords: MedicalHistoryForParentsInterface[] = await prisma.healthRecord.findMany({
      select: {
        additionalNotes: true,
        documents: true,
        createdAt: true,
        child: {
          select: {
            name: true,
          },
        },
      },
      where: {
        child: {
          parentId: session.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { healthRecords };
  } catch (error) {
    console.error(error);
    return {
      error:
        "Something went while retrieving medical history data. Please try again!",
    };
  }
};

/**
 * Get medical records of children for admins
 * @returns healthRecords
 */
export const GetMedicalHistoryForAdmins = async () => {
  try {
    const session = await currentUser();
    if (!session || !session.id) {
      redirect("/auth/sign-in");
    }

    const healthRecords: MedicalHistoryForAdminsInterface[] = await prisma.healthRecord.findMany({
      select: {
        additionalNotes: true,
        documents: true,
        createdAt: true,
        child: {
          select: {
            name: true,
            user: {
              select: {
                name: true,
                email: true,
              }
            }
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { healthRecords };
  } catch (error) {
    console.error(error);
    return {
      error:
        "Something went while retrieving medical history data. Please try again!",
    };
  }
};

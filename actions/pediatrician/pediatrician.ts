"use server"

import { AllPediatriciansInterface, OnePediatricianDetailsInterface } from "@/interfaces/user-interfaces/user-interfaces";
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation";

/**
 * Find all pediatricians for the pediatricians directory
 * @returns pediatricians AllPediatriciansInterface[]
 */
export const getAllPediatricians = async () => {
    const session = await currentUser();
    if (!session || !session.id) {
      redirect("/sign-in")
    }
    const pediatricians: AllPediatriciansInterface[] = await prisma.pediatrician.findMany({
        select: {
            pediatricianId: true,
            specializations: true,
            description: true,
            qualifications: true,
            user: {
                select: {
                    name: true,
                    image: true,
                    email: true,
                    telephone: true,
                }
            }
        },
        where: {
            specializations: { not: null },
            description: { not: null },
            qualifications: { not: null },
        }
    });

    return pediatricians;
};

/**
 * Find pediatrician details by id
 * @param pediatricianId string
 * @returns pediatrician 
 */
export const getPediatricianDetailsById = async (pediatricianId: string) => {
    const session = await currentUser();
    if (!session || !session.id) {
      redirect("/sign-in")
    }

    if (!pediatricianId) {
        return { error: "Pediatrician id not found!" };
    }

    const pediatrician: OnePediatricianDetailsInterface | null | undefined = await prisma.pediatrician.findFirst({
        select: {
            pediatricianId: true,
            specializations: true,
            description: true,
            qualifications: true,
            user: {
                select: {
                    name: true,
                    image: true,
                    email: true,
                    telephone: true,
                }
            },
            availability: {
                select: {
                    startTime: true,
                    endTime: true,
                    location: true,
                    dateOfWeek: true,
                    hospital: true
                }
            }
        },
        where: {
            pediatricianId: pediatricianId
        }
    });

    return { pediatrician }
}
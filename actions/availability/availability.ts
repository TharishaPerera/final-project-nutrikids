"use server"

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AvailabilityFormSchema } from "@/schemas/availability-schema";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getPediatricianDetailsByUserId } from "../pediatrician/pediatrician";

/**
 * Create new availability
 * @param values AvailabilityFormSchema
 * @returns 
 */
export const createAvailability = async (values: z.infer<typeof AvailabilityFormSchema>) => {
    try {
        const validatedFields = AvailabilityFormSchema.safeParse(values);
        const session = await currentUser();
        if (!session || !session.id) {
          redirect("/auth/sign-in");
        }
        if (!validatedFields.success) {
          return { error: "Invalid inputs provided!" };
        }

        // get pediatrician details
        const pediatrician = await getPediatricianDetailsByUserId(session.id)
        if (!pediatrician) {
            return { error: "current user is not a pediatrician!" };
        }
    
        const {  hospital, location, from, to, dates } = validatedFields.data;

        const availability = await prisma.availability.create({
            data: {
                pediatricianId: pediatrician.pediatrician?.pediatricianId!,
                hospital: hospital,
                location: location,
                startTime: from,
                endTime: to,
                dateOfWeek: dates
            }
        })

        return { success: "Availability created successfully!" };
    } catch (error: Prisma.PrismaClientKnownRequestError | Error | any) {
        console.log(error);
        return { error: "Error occurred when creating availability!" };
    }
}

/**
 * Get all availability by pediatrician
 * @returns availability
 */
export const getAllAvailabilitiesByPediatrician = async () => {
    try {
        const session = await currentUser();
        if (!session || !session.id) {
          redirect("/auth/sign-in");
        }

        // get pediatrician details
        const pediatrician = await getPediatricianDetailsByUserId(session.id)
        if (!pediatrician.pediatrician) {
            return { error: "current user is not a pediatrician!" };
        }

        const availability = await prisma.availability.findMany({
            where: {
                pediatricianId: pediatrician.pediatrician?.pediatricianId!,
            },
            orderBy: {
                hospital: "asc",
            },
        })

        return { availability };
    } catch (error: Prisma.PrismaClientKnownRequestError | Error | any) {
        console.log(error);
        return { error: "Error occurred when retrieving data!" };
    }
}

/**
 * Delete availability by id
 * @param id number
 * @returns string
 */
export const deleteAvailability = async (id: number) => {
    const session = await currentUser();
    if (!session || !session.id) {
      return { error: "User id not found!" };
    }
    if (!id) {
      return { error: "Availability id not found!" };
    }
    // get pediatrician details
    const pediatrician = await getPediatricianDetailsByUserId(session.id)
    if (!pediatrician.pediatrician) {
        return { error: "current user is not a pediatrician!" };
    }

    try {
      await prisma.availability.delete({
        where: {
          id: id,
          pediatricianId: pediatrician.pediatrician.pediatricianId,
        },
      });
  
      return { success: "Availability deleted successfully!" };
    } catch (error) {
      console.log(error);
      return { error: "Error occurred when deleting availability!" };
    }
  };
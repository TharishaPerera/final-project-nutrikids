"use server";

import {
  AllPediatriciansInterface,
  OnePediatricianDetailsInterface,
} from "@/interfaces/user-interfaces/user-interfaces";
import { generateTimeSlots, getFullDay } from "@/lib/appointment-utils";
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

/**
 * Find all pediatricians for the pediatricians directory
 * @returns pediatricians AllPediatriciansInterface[]
 */
export const getAllPediatricians = async () => {
  const session = await currentUser();
  if (!session || !session.id) {
    redirect("/sign-in");
  }
  const pediatricians: AllPediatriciansInterface[] = await prisma.pediatrician.findMany(
    {
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
          },
        },
      },
      where: {
        specializations: { not: null },
        description: { not: null },
        qualifications: { not: null },
      },
    }
  );

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
    redirect("/sign-in");
  }

  if (!pediatricianId) {
    return { error: "Pediatrician id not found!" };
  }

  const pediatrician:
    | OnePediatricianDetailsInterface
    | null
    | undefined = await prisma.pediatrician.findFirst({
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
        },
      },
      availability: {
        select: {
          startTime: true,
          endTime: true,
          location: true,
          dateOfWeek: true,
          hospital: true,
        },
        orderBy: {
          hospital: "asc",
        },
      },
    },
    where: {
      pediatricianId: pediatricianId,
    },
  });

  return { pediatrician };
};

/**
 * Find pediatrician details by user id
 * @param userId string
 * @returns pediatrician
 */
export const getPediatricianDetailsByUserId = async (userId: string) => {
  const session = await currentUser();
  if (!session || !session.id) {
    redirect("/sign-in");
  }

  if (!userId) {
    return { error: "User id not found!" };
  }

  const pediatrician:
    | OnePediatricianDetailsInterface
    | null
    | undefined = await prisma.pediatrician.findFirst({
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
        },
      },
      availability: {
        select: {
          startTime: true,
          endTime: true,
          location: true,
          dateOfWeek: true,
          hospital: true,
        },
        orderBy: {
          hospital: "asc",
        },
      },
    },
    where: {
      userId: userId,
    },
  });

  return { pediatrician };
};

/**
 * Generate timeslots by the selected date and pediatrician availability
 * @param date Date
 * @param pediatricianId string
 * @returns TimeSlots array
 */
export const getTimeSlotsByDay = async (date: Date, pediatricianId: string) => {
  try {
    const session = await currentUser();
    if (!session || !session.id) {
      redirect("/sign-in");
    }
    if (!pediatricianId) {
      return { error: "Pediatrician id not found!" };
    }
    if (!date) {
      return { error: "Please select a date to get time slots!" };
    }

    const startEndTimes = await prisma.availability.findMany({
      select: {
        startTime: true,
        endTime: true,
      },
      where: {
        dateOfWeek: getFullDay(date.getDay() + 1)?.toLowerCase(),
        pediatricianId: pediatricianId,
        location: "online",
      },
    });

    const selectedDate = new Date(date);

    // Generate time slots for each data item
    const result = startEndTimes
      .map(({ startTime, endTime }) =>
        generateTimeSlots(startTime!, endTime!, selectedDate)
      )
      .flat();

    // Sort the result array by startTimeUnix in ascending order
    result.sort((a, b) => a.startTimeUnix - b.startTimeUnix);

    return { timeslots: result };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
};

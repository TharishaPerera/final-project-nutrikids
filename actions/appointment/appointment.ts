"use server";

import { currentUser } from "@/lib/auth";
import { AppointmentSchema } from "@/schemas/appointment-schema";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createMeeting } from "./daily.co/meeting";
import { generateUniqueString } from "@/lib/appointment-utils";
import { MeetingInterface } from "@/interfaces/appointment-interfaces/appointment-interfaces";
import prisma from "@/lib/prisma";
import { AppointmentStatus, MeetingStatus, Prisma } from "@prisma/client";

/**
 * Create online appointment
 * @param values AppointmentSchema
 * @returns object
 */
export const createOnlineAppointment = async (
  values: z.infer<typeof AppointmentSchema>,
  pediatricianId: string
) => {
  try {
    const validatedFields = AppointmentSchema.safeParse(values);
    const session = await currentUser();
    if (!session || !session.id) {
      redirect("/auth/sign-in");
    }
    if (!validatedFields.success) {
      return { error: "Invalid inputs provided!" };
    }

    const { child, date, timeSlot, notes } = validatedFields.data;
    const [startTime, endTime] = timeSlot.split("-");

    // create appointment
    const appointment = await prisma.appointment.create({
      data: {
        pediatricianId: pediatricianId,
        childId: child,
        parentId: session.id,
        appointmentDate: date!,
        timeslot: timeSlot,
        additionalNotes: notes,
        status: "SCHEDULED",
      },
    });

    // create data object for meeting creation
    const meetingData: MeetingInterface = {
      name: generateUniqueString(parseInt(startTime)),
      privacy: "public",
      startTime: startTime,
      endTime: endTime,
    };

    // create meeting
    const dailyMeeting = await createMeeting(meetingData);

    if (!dailyMeeting) {
      return { error: "Failed to create meeting!" };
    }

    // save meeting in the database
    const meeting = await prisma.dailyMeeting.create({
      data: {
        id: dailyMeeting.meetingData?.id!,
        appointmentId: appointment.id,
        name: dailyMeeting.meetingData?.name!,
        startTime: new Date(dailyMeeting.meetingData?.config.nbf!),
        endTime: new Date(dailyMeeting.meetingData?.config.exp!),
        privacy: dailyMeeting.meetingData?.privacy!,
        url: dailyMeeting.meetingData?.url!,
        createdAt: dailyMeeting.meetingData?.created_at!,
        config: JSON.stringify(dailyMeeting.meetingData?.config),
        status: "CREATED",
      },
    });

    return {
      success: "Appointment created successfully!",
    };
  } catch (error: Prisma.PrismaClientKnownRequestError | Error | any) {
    console.error(error);
    if (error.code === "P2002") {
      // unique constraint violation
      return {
        error:
          "The selected time slot is already taken. Please select another!",
      };
    }
    return { error: "Error occurred when creating appointment!" };
  }
};

/**
 * Get all my appointments
 * @returns appointments
 */
export const getMyAppointments = async () => {
  try {
    const session = await currentUser();
    if (!session || !session.id) {
      redirect("/auth/sign-in");
    }

    // get appointments
    const appointments = await prisma.appointment.findMany({
      select: {
        id: true,
        additionalNotes: true,
        appointmentDate: true,
        timeslot: true,
        status: true,
        pediatrician: {
          select: {
            pediatricianId: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
            specializations: true,
          },
        },
        child: {
          select: {
            name: true,
          },
        },
        meeting: {
          select: {
            id: true,
            name: true,
            url: true,
            status: true,
          },
        },
      },
      where: {
        parentId: session.id,
      },
    });

    return { appointments };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
};

/**
 * Cancel appointment and meeting
 * @param id string
 * @returns string
 */
export const cancelAppointment = async (id: string) => {
  try {
    await prisma.appointment.update({
      where: {
        id: id,
      },
      data: {
        status: AppointmentStatus.CANCELLED,
      },
    });

    await prisma.dailyMeeting.update({
      where: {
        appointmentId: id,
      },
      data: {
        status: MeetingStatus.CANCELLED,
      },
    })

    return { success: "Appointment cancelled successfully!" };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when cancelling appointment!" };
  }
};

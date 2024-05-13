"use server";

import { AllAppointmentReportInterface } from "@/interfaces/report-interface/all-appointment-report";
import prisma from "@/lib/prisma";

export const GetAllAppointmentReport = async () => {
  try {
    const appointments: AllAppointmentReportInterface[] = await prisma.appointment.findMany({
      select: {
        id: true,
        appointmentDate: true,
        timeslot: true,
        status: true,
        pediatrician: {
          select: {
            specializations: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        child: {
          select: {
            name: true,
          },
        },
        parent: {
          select: {
            name: true,
            email: true,
          },
        },
        additionalNotes: true,
        meeting: {
          select: {
            url: true,
          },
        },
      },
    });

    return { appointments };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
};

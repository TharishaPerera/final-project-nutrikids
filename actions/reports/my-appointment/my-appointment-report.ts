"use server";

import {
  ConsultantAppointmentReportInterface,
  ParentAppointmentReportInterface,
} from "@/interfaces/report-interface/all-appointment-report";
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const GetMyAppointments = async () => {
  const session = await currentUser();
  if (!session || !session.id) {
    redirect("/auth/sign-in");
  }

  let appointments:
    | ConsultantAppointmentReportInterface[]
    | ParentAppointmentReportInterface[] = [];

  try {
    if (session.level == 1000) {
      appointments = await prisma.appointment.findMany({
        select: {
          id: true,
          appointmentDate: true,
          timeslot: true,
          status: true,
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
        where: {
            pediatrician: {
                userId: session.id
            }
        },
      });
    }
    if (session.level == 100) {
      appointments = await prisma.appointment.findMany({
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
          additionalNotes: true,
          meeting: {
            select: {
              url: true,
            },
          },
        },
        where: {
            parent: {
                id: session.id
            }
        }
      });
    }
    
    return { appointments };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
};

"use server"

import { Activities } from "@/components/common/dashboard-table";
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

/**
 * Get activities for dashboard for admins
 * @returns activities
 */
export const GetUpcomingActivitiesForAdmin = async () => {
    try {
        const session = await currentUser();
        if (!session || !session.id || session.level < 5000) {
          redirect("/auth/sign-in");
        }

        const activities: Activities[] = await prisma.appointment.findMany({
            take: 5,
            select: {
                appointmentDate: true,
                timeslot: true,
                child: {
                    select: {
                        name: true,
                    },
                },
                parent: {
                    select: {
                        name: true,
                        email: true,
                    }
                }
            },
            orderBy: {
                appointmentDate: "asc"
            },
        })

        return { activities }
    } catch (error) {
        console.log(error)
        return { error: "Error occurred while retrieving data!" }
    }
}

/**
 * Get activities for dashboard for admins
 * @returns activities
 */
export const GetUpcomingActivitiesForOthers = async () => {
    try {
        const session = await currentUser();
        if (!session || !session.id) {
          redirect("/auth/sign-in");
        }

        const activities: Activities[] = await prisma.appointment.findMany({
            take: 5,
            select: {
                appointmentDate: true,
                timeslot: true,
                child: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                appointmentDate: "asc"
            },
            where: {
                parentId: session.id
            }
        })

        return { activities }
    } catch (error) {
        console.log(error)
        return { error: "Error occurred while retrieving data!" }
    }
}
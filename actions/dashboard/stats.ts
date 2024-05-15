"use server"

import { AdminStatInterface, OtherStatInterface } from "@/components/common/stats";
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

/**
 * Get statistics for dashboard for admins
 * @returns adminStats
 */
export const GetStatForAdmin = async () => {
    try {
        const session = await currentUser();
        if (!session || !session.id || session.level < 5000) {
          redirect("/auth/sign-in");
        }

        const appointments = await prisma.appointment.count()
        const users = await prisma.user.count()
        const posts = await prisma.post.count()

        const data: AdminStatInterface = {
            appointment: appointments,
            users: users,
            posts: posts
        }

        return { adminStats: data }
    } catch (error) {
        console.log(error)
        return { error: "Error occurred while retrieving data!" }
    }
}

/**
 * Get statistics for dashboard for other users
 * @returns otherStats
 */
export const GetStatForOthers = async () => {
    try {
        const session = await currentUser();
        if (!session || !session.id) {
          redirect("/auth/sign-in");
        }

        const appointments = await prisma.appointment.count({
            where: {
                parentId: session.id
            }
        })
        const comments = await prisma.comment.count({
            where: {
                post: {
                    userId: session.id
                }
            }
        })
        const posts = await prisma.post.count({
            where: {
                userId: session.id
            }
        })

        const data: OtherStatInterface = {
            appointment: appointments,
            comments: comments,
            posts: posts
        }

        return { otherStats: data }
    } catch (error) {
        console.log(error)
        return { error: "Error occurred while retrieving data!" }
    }
}
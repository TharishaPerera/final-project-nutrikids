"use server";

import { AllUserReportInterface } from "@/interfaces/report-interface/all-user-report";
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

export const FindUsersByTypeOrAll = async (userType: string = "ALL") => {
  try {
    const session = await currentUser();
    if (!session || !session.id) {
      redirect("/sign-in");
    }

    let users: AllUserReportInterface[] = [];
    if (userType === "ALL") {
      console.log("All")
      users = await prisma.user.findMany({
        select: {
          name: true,
          email: true,
          telephone: true,
          isTwoFactorEnabled: true,
          subscription: {
            select: {
                subscriptionPlan: {
                    select: {
                        planName: true
                    }
                }
            }
          },
          userRole: {
            select: {
              role: true,
            },
          },
          emailVerified: true,
          createdAt: true
        },
      });
    } else {
      users = await prisma.user.findMany({
        where: {
          userRole: {
            role: userType,
          },
        },
        select: {
          name: true,
          email: true,
          telephone: true,
          isTwoFactorEnabled: true,
          subscription: {
            select: {
                subscriptionPlan: {
                    select: {
                        planName: true
                    }
                }
            }
          },
          userRole: {
            select: {
              role: true,
            },
          },
          emailVerified: true,
          createdAt: true
        },
      });
    }

    return { users };
  } catch (error) {
    console.log(error);
    return { error: "Error occurred when retrieving data!" };
  }
};

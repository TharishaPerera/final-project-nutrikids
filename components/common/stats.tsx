"use client"

import React, { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreditCard, Users } from "lucide-react";
import { StatCard } from "./stat-card";
import { useCurrentLevel } from "@/hooks/use-current-role";
import { Loader } from "./loader";
import { GetStatForAdmin, GetStatForOthers } from "@/actions/dashboard/stats";
import { toast } from "sonner";

export interface AdminStatInterface {
  appointment: number
  posts: number
  users: number
}

export interface OtherStatInterface {
  appointment: number
  posts: number
  comments: number
}

export const Stats = () => {
  const [adminStats, setAdminStats] = useState<AdminStatInterface>({
    appointment: 0,
    posts: 0,
    users: 0
  })

    const [otherStats, setOtherStats] = useState<OtherStatInterface>({
    appointment: 0,
    posts: 0,
    comments: 0
  })
  const userLevel = useCurrentLevel()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(() => {
      if (userLevel >= 5000) {
        GetStatForAdmin()
        .then((response) => {
          if (response.error) {
            toast.error(response.error)
          }
          if (response.adminStats) {
            setAdminStats(response.adminStats)
          }
        })
      }
      if (userLevel <= 1000) {
        GetStatForOthers()
        .then((response) => {
          if (response.error) {
            toast.error(response.error)
          }
          if (response.otherStats) {
            setOtherStats(response.otherStats)
          }
        })
      }
    })
  }, [])

  // if (isPending) {
  //   return <Loader />;
  // }

  return (
    <div className="px-0">
      <div className="px-0">
        <div className="w-full flex justify-center">
          <div className="w-full ">
            <Card className="border grid rounded-lg w-full">
              <CardHeader className="bg-secondary p-4 text-lg font-semibold border-b">
                Statistics
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row p-2 gap-2 w-full">
                {
                  userLevel <= 1000 && (
                    <>
                    <StatCard title="My Appointments" icon={<CreditCard className="h-4 w-4 text-muted-foreground" />} value={otherStats.appointment.toString()} description="All my appointments" />
                    <StatCard title="My Community Posts" icon={<CreditCard className="h-4 w-4 text-muted-foreground" />} value={otherStats.posts.toString()} description="All my community posts" />
                    <StatCard title="Community Interactions" icon={<CreditCard className="h-4 w-4 text-muted-foreground" />} value={otherStats.comments.toString()} description="Number of comments on my posts" />
                    </>
                  )
                }
                
                {
                  userLevel >= 5000 && (
                    <>
                    <StatCard title="Total Appointments" icon={<CreditCard className="h-4 w-4 text-muted-foreground" />} value={adminStats.appointment.toString()} description="All scheduled, completed and cancelled appointments" />
                    <StatCard title="Total Application Users" icon={<Users className="h-4 w-4 text-muted-foreground" />} value={adminStats.users.toString()} description="All application users who are registered in the system" />
                    <StatCard title="Total Community Posts" icon={<CreditCard className="h-4 w-4 text-muted-foreground" />} value={adminStats.posts.toString()} description="Total community posts shared in the platform" />
                    </>
                  )
                }
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
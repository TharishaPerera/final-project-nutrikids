"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GetUpcomingActivitiesForAdmin,
  GetUpcomingActivitiesForOthers,
} from "@/actions/dashboard/activities";
import { toast } from "sonner";
import { dateFormat, formatTimeSlot } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";
import { useCurrentLevel } from "@/hooks/use-current-role";

export interface Activities {
  appointmentDate: Date;
  timeslot: string;
  child: {
    name: string;
  };
  parent?: {
    name: string | null;
    email: string | null;
  };
}

export const DashboardTable = () => {
  const [activities, setActivities] = useState<Activities[]>([]);
  const [isPending, startTransition] = useTransition();
  const userLevel = useCurrentLevel();

  useEffect(() => {
    startTransition(() => {
      if (userLevel >= 5000) {
        GetUpcomingActivitiesForAdmin().then((response) => {
          if (response.error) {
            toast.error(response.error);
          }
          if (response.activities) {
            setActivities(response.activities);
          }
        });
      } else {
        GetUpcomingActivitiesForOthers().then((response) => {
          if (response.error) {
            toast.error(response.error);
          }
          if (response.activities) {
            setActivities(response.activities);
          }
        });
      }
    });
  }, []);

  const mounted = useMounted();

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="bg-secondary p-4 text-lg font-semibold border-b">
        Upcoming Activities
      </CardHeader>
      <CardContent className="p-2">
        {activities.length <= 0 && <div className="text-center p-4 text-sm text-muted-foreground">No upcoming activities</div>}
        {activities.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Appointment For</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time Slot</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity, index) => (
                <TableRow key={index}>
                  <TableCell className="py-2">
                    <div className="font-medium">{activity.child.name}</div>
                    {activity.parent && (
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {activity.parent.name} - {activity.parent.email}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="py-2">
                    {dateFormat(activity.appointmentDate, "D MMM, YYYY")}
                  </TableCell>
                  <TableCell className="py-2">
                    {formatTimeSlot(activity.timeslot)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

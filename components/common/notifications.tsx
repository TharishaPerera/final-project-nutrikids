"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { NotificationItem } from "./notification-item";
import { Notification } from "@prisma/client";
import { toast } from "sonner";
import { GetMyNotifications } from "@/actions/notification/notification";

export const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      GetMyNotifications()
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
          }
          if (response.notifications) {
            setNotifications(response.notifications);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again!");
        });
    });
  }, []);

  return (
    <div className="px-0">
      <div className="px-0">
        <div className="w-full flex justify-center">
          <div className="w-full">
            <Card className="border grid rounded-lg w-full">
              <CardHeader className="bg-secondary p-4 text-lg font-semibold border-b">
                Notifications
              </CardHeader>
              <CardContent className="p-2 gap-2">
                {notifications.length <= 0 && <div className="text-center p-4 text-sm text-muted-foreground">No notifications</div>}
                {notifications.length > 0 && notifications.map((notification) => (
                  <NotificationItem key={notification.id} {...notification} />
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

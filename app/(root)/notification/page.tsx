"use client"

import { GetAllNotifications } from '@/actions/notification/notification'
import { FormDialog } from '@/components/common/form-dialog'
import { Loader } from '@/components/common/loader'
import { PageTitle } from '@/components/common/page-title'
import { NewNotificationForm } from '@/components/form/notification/new-notification-form'
import { Button } from '@/components/ui/button'
import { Notification } from '@prisma/client'
import React, { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { columns } from './_components/columns'
import { DataTable } from '@/components/common/data-table'

const NotificationPage = () => {
  const [data, setData] = useState<Notification[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      GetAllNotifications()
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
          }
          if (response.notifications) {
            setData(response.notifications);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again!");
        });
    });
  }, []);

  if (isPending || !data) {
    return <Loader />;
  }

  return (
    <div className="px-2">
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Notifications" />
        <FormDialog
          title="Create New Notification"
          description="Add a new notification"
          form={<NewNotificationForm />}
        >
          <Button variant="default" size="sm">
            New Notification
          </Button>
        </FormDialog>
      </div>
      <DataTable data={data} columns={columns} searchPlaceholder="Search Titles..." searchKey="title" />
    </div>
  )
}

export default NotificationPage
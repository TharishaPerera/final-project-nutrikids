import { FormDialog } from '@/components/common/form-dialog'
import { PageTitle } from '@/components/common/page-title'
import { NewNotificationForm } from '@/components/form/notification/new-notification-form'
import { Button } from '@/components/ui/button'
import React from 'react'

const NotificationPage = () => {
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
      {/* <DataTable data={data} columns={columns} searchPlaceholder="Search Names..." searchKey="name" /> */}
    </div>
  )
}

export default NotificationPage
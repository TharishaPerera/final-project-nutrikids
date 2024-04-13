"use client"

import { DataTable } from '@/components/common/data-table'
import { FormDialog } from '@/components/common/form-dialog'
import { PageTitle } from '@/components/common/page-title'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState, useTransition } from 'react'
import { columns } from './_components/columns'
import { Child } from '@prisma/client'
import { getMyChildren } from '@/actions/children/children'
import { toast } from 'sonner'
import { Loader } from '@/components/common/loader'
import { ChildrenForm } from '@/components/form/children/children-form'

const ChildrenPage = () => {
  const [data, setData] = useState<Child[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      getMyChildren()
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
          }
          if (response.children) {
            setData(response.children);
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
        <PageTitle title="My Children" />
        <FormDialog
          title="Add New Child"
          description="Add your children to the system"
          form={<ChildrenForm />}
        >
          <Button variant="default" size="sm">
            New Child
          </Button>
        </FormDialog>
      </div>
      <DataTable data={data} columns={columns} searchPlaceholder="Search Names..." searchKey="name" />
    </div>
  )
}

export default ChildrenPage
"use client"

import { DataTable } from '@/components/common/data-table'
import { PageTitle } from '@/components/common/page-title'
import React, { useEffect, useState, useTransition } from 'react'
import { columns } from './_components/columns'
import { toast } from 'sonner'
import { getAllUserRoles } from '@/actions/user/user-role'
import { UserRoleTableInterface } from '@/interfaces/user-interfaces/user-role-interfaces'
import { Loader } from '@/components/common/loader'

const UserRolesPage = () => {
  const [data, setData] = useState<UserRoleTableInterface[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      getAllUserRoles()
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
          }
          if (response.userRoles) {
            setData(response.userRoles);
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
      <PageTitle title="Users Roles" />
    </div>
    <DataTable data={data} columns={columns} searchKey='role' searchPlaceholder='Search Role...' />
  </div>
  )
}

export default UserRolesPage
"use client";

import { DataTable } from "@/components/common/data-table";
import { UserTableInterface } from "@/interfaces/user-interfaces";
import { startTransition, useEffect, useState } from "react";
import { columns } from "./_components/columns";
import { getAllUsers } from "@/actions/user/user";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const UsersPage = () => {
  const [data, setData] = useState<UserTableInterface[]>([]);

  useEffect(() => {
    startTransition(() => {
      getAllUsers()
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
          }
          if (response.users) {
            setData(response.users);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again!");
        });
    });
  }, []);

  console.log(data);
  return (
    <div className="px-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Users</h1>
        <Button variant="default" size="sm">New User</Button>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default UsersPage;

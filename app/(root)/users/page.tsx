"use client";

import { DataTable } from "@/components/common/data-table";
import { UserTableInterface } from "@/interfaces/user-interfaces";
import { useEffect, useState, useTransition } from "react";
import { columns } from "./_components/columns";
import { getAllUsers } from "@/actions/user/user";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { Loader } from "@/components/common/loader";
import { cn } from "@/lib/utils";
import Link from "next/link";

const UsersPage = () => {
  const [data, setData] = useState<UserTableInterface[]>([]);
  const [isPending, startTransition] = useTransition();

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

  if (isPending || !data) {
    return <Loader />;
  }

  console.log(data);
  return (
    <div className="px-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Users</h1>
        <Link href="/users/create" className={cn(buttonVariants({ variant: "default", size: "sm" }))}>New User</Link>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default UsersPage;

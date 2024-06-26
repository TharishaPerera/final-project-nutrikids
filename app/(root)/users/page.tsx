"use client";

import { DataTable } from "@/components/common/data-table";
import { useEffect, useState, useTransition } from "react";
import { columns } from "./_components/columns";
import { getAllUsers } from "@/actions/user/user";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader } from "@/components/common/loader";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { PageTitle } from "@/components/common/page-title";
import { UserTableInterface } from "@/interfaces/user-interfaces/user-interfaces";
import { FormDialog } from "@/components/common/form-dialog";
import { UserCreateForm } from "@/components/form/user/user-create-form";

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

  return (
    <div className="px-2">
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="All Users" />
        <FormDialog
          title="Create New User"
          description="Register a new user in the platform"
          form={<UserCreateForm />}
        >
          <Button variant="default" size="sm">
            New User
          </Button>
        </FormDialog>
        {/* <Link href="/users/create" className={cn(buttonVariants({ variant: "default", size: "sm" }))}>New User</Link> */}
      </div>
      <DataTable
        data={data}
        columns={columns}
        searchPlaceholder="Search Names..."
        searchKey="name"
      />
    </div>
  );
};

export default UsersPage;

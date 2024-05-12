"use client";

import { FindUsersByTypeOrAll } from "@/actions/reports/all-user/all-user-report";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, dateFormat } from "@/lib/utils";
import { User } from "@prisma/client";
import { Search } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CSVLink } from "react-csv";
import { Loader } from "@/components/common/loader";
import { AllUserReportInterface } from "@/interfaces/report-interface/all-user-report";
import { PageTitle } from "@/components/common/page-title";

const AllUsersReport = () => {
  const [users, setUsers] = React.useState<AllUserReportInterface[]>([]);
  const [isPending, startTransition] = React.useTransition();
  const form = useForm({
    defaultValues: {
      userType: "ALL",
    },
  });

  const onSubmit = (value: any) => {
    console.log(value);
    startTransition(() => {
      FindUsersByTypeOrAll(value.userType).then((response) => {
        if (response.error) {
          toast.error(response.error);
        }
        if (response.users) {
          setUsers(response.users);
        }
      });
    });
  };

  if (isPending) {
    return <Loader />;
  }
  return (
    <div className="space-y-6 p-2">
      <PageTitle title="All Users Report" />
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between items-center">
        <div className="w-full md:w-2/5 lg:w-1/5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex space-x-2"
            >
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ALL">All Users</SelectItem>
                        <SelectItem value="USER">All Parents</SelectItem>
                        {/* <SelectItem value="ASSISTANT">
                          All Assistants
                        </SelectItem> */}
                        <SelectItem value="CONSULTANT">
                          All Consultants
                        </SelectItem>
                        {/* <SelectItem value="COMPANY_ADMIN">
                          All Company Admins
                        </SelectItem>
                        <SelectItem value="SUPER_ADMIN">
                          All Super Admins
                        </SelectItem> */}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="icon"
                variant="secondary"
                className=""
              >
                <Search className="w-5 h-5" />
              </Button>
            </form>
          </Form>
        </div>
        <CSVLink
          data={users}
          filename={"all-users.csv"}
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "w-full md:w-min"
          )}
        >
          Export CSV
        </CSVLink>
      </div>
      <Table>
        <TableCaption>A list of application users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-[150px]">Telephone</TableHead>
            <TableHead className="w-[150px]">Two Factor</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email ? user.email : "-"}</TableCell>
              <TableCell>{user.telephone ? user.telephone : "-"}</TableCell>
              <TableCell>
                {user.isTwoFactorEnabled == true ? "Enabled" : "Disabled"}
              </TableCell>
              <TableCell>
                {user.userRole?.role! ? user.userRole?.role! : "-"}
              </TableCell>
              <TableCell>
                {dateFormat(user.createdAt, "DD MMM, YYYY")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUsersReport;

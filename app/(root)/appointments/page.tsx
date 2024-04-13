"use client";

import { getMyAppointments } from "@/actions/appointment/appointment";
import { DataTable } from "@/components/common/data-table";
import { Loader } from "@/components/common/loader";
import { PageTitle } from "@/components/common/page-title";
import { buttonVariants } from "@/components/ui/button";
import { MyAppointmentsInterface } from "@/interfaces/appointment-interfaces/appointment-interfaces";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { columns } from "./_components/columns";

const AppointmentsPage = () => {
  // FIXME: add the correct interface for the data useState instead of any
  const [data, setData] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      getMyAppointments()
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
          }
          if (response.appointments) {
            setData(response.appointments);
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
        <PageTitle title="My Appointments" />
        <Link
          href="/pediatricians"
          className={cn(buttonVariants({ size: "sm", variant: "default" }))}
        >
          New Appointment
        </Link>
      </div>
      <DataTable
        data={data}
        columns={columns}
        searchPlaceholder="Search Child Name..."
        searchEnabled={false}
      />
    </div>
  );
};

export default AppointmentsPage;

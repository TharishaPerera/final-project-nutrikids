"use client";

import { GetAllAppointmentReport } from "@/actions/reports/all-appointment/all-appointment-report";
import { Loader } from "@/components/common/loader";
import { PageTitle } from "@/components/common/page-title";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AllAppointmentReportInterface } from "@/interfaces/report-interface/all-appointment-report";
import { cn, dateFormat } from "@/lib/utils";
import React, { useEffect, useState, useTransition } from "react";
import { CSVLink } from "react-csv";
import { toast } from "sonner";

const AllAppointmentsPage = () => {
  const [appointments, setAppointments] = useState<
    AllAppointmentReportInterface[]
  >([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      GetAllAppointmentReport().then((response) => {
        if (response.error) {
          toast.error(response.error);
        }
        if (response.appointments) {
          setAppointments(response.appointments);
        }
      });
    });
  }, []);

  if (isPending || !appointments) {
    return <Loader />;
  }
  return (
    <div className="space-y-6 p-2">
      <PageTitle title="All Appointments Report" />
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 justify-end items-center">
        <CSVLink
          data={appointments}
          filename={"all-appointments.csv"}
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "w-full md:w-min"
          )}
        >
          Export CSV
        </CSVLink>
      </div>
      <Table>
        <TableCaption>A list of appointments.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Appointment Date</TableHead>
            <TableHead>Time Slot</TableHead>
            <TableHead className="w-[150px]">Status</TableHead>
            <TableHead>Consultant</TableHead>
            <TableHead>Child</TableHead>
            <TableHead>Parent</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {dateFormat(appointment.appointmentDate, "DD MMM, YYYY")}
              </TableCell>
              <TableCell>{appointment.timeslot ?? "-"}</TableCell>
              <TableCell>{appointment.status ?? "-"}</TableCell>
              <TableCell>{appointment.pediatrician.user.name}</TableCell>
              <TableCell>{appointment.child.name}</TableCell>
              <TableCell>{appointment.parent.name}</TableCell>
              <TableCell>{appointment.additionalNotes ?? "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllAppointmentsPage;

"use client";

import { GetMyAppointments } from "@/actions/reports/my-appointment/my-appointment-report";
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
import { useCurrentLevel } from "@/hooks/use-current-role";
import {
  ConsultantAppointmentReportInterface,
  ParentAppointmentReportInterface,
} from "@/interfaces/report-interface/all-appointment-report";
import { cn, dateFormat } from "@/lib/utils";
import React, { useEffect, useState, useTransition } from "react";
import { CSVLink } from "react-csv";
import { toast } from "sonner";

const MyAppointmentsPage = () => {
  const userLevel = useCurrentLevel();
  const [appointments, setAppointments] = useState<(ConsultantAppointmentReportInterface | ParentAppointmentReportInterface)[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      GetMyAppointments().then((response) => {
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
      {/* <pre>{JSON.stringify(appointments, null, 2)}</pre> */}
      <PageTitle title="My Appointments Report" />
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
            <TableHead>Child</TableHead>
            {userLevel === 100 && <TableHead>Consultant</TableHead>}
            {userLevel === 1000 && <TableHead>Parent</TableHead>}
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
              <TableCell>{appointment.child.name}</TableCell>
              {userLevel === 100 && (
                <TableCell>{(appointment as ParentAppointmentReportInterface).pediatrician.user.name}</TableCell>
              )}
              {userLevel === 1000 && (
                <TableCell>{(appointment as ConsultantAppointmentReportInterface).parent.name}</TableCell>
              )}
              <TableCell>{appointment.additionalNotes ?? "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyAppointmentsPage;

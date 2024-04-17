"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, dateFormat } from "@/lib/utils";
import { MyAppointmentsInterface } from "@/interfaces/appointment-interfaces/appointment-interfaces";
import { formatUnixTimestampRange } from "@/lib/appointment-utils";
import { Link } from "next-view-transitions";
import { DeleteDialog } from "@/components/common/delete-dialog";
import { deleteMeeting } from "@/actions/appointment/daily.co/meeting";
import { toast } from "sonner";
import { MeetingStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { cancelAppointment } from "@/actions/appointment/appointment";

export const columns: ColumnDef<MyAppointmentsInterface>[] = [
  {
    accessorKey: "appointmentFor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Appointment For
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.child?.name}</span>;
    },
  },
  {
    accessorKey: "pediatrician",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pediatrician
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="capitalize">
          {row.original.pediatrician.user.name}
        </span>
      );
    },
  },
  {
    accessorKey: "specialization",
    header: "Specialization",
    cell: ({ row }) => {
      return (
        <span className="capitalize">
          {row.original.pediatrician.specializations}
        </span>
      );
    },
  },
  {
    accessorKey: "appointmentDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Appointment Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="capitalize">
          {dateFormat(row.original.appointmentDate, "dddd, MMMM D, YYYY")}
        </span>
      );
    },
  },
  {
    accessorKey: "timeslot",
    header: "Time Slot",
    cell: ({ row }) => {
      return (
        <span className="capitalize">
          {formatUnixTimestampRange(row.original.timeslot)}
        </span>
      );
    },
  },
  {
    accessorKey: "additionalNotes",
    header: "Notes",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.additionalNotes}</span>;
    },
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => {
  //     return (
  //       <span className="capitalize">
  //         {formatUnixTimestampRange(row.original.timeslot)}
  //       </span>
  //     );
  //   },
  // },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const appointmentId = row.original.id;
      const meetingUrl = row.original.meeting.url;
      const status = row.original.meeting.status;
      const meetingName = row.original.meeting.name;

      const handleCancel = () => {
        deleteMeeting(meetingName, appointmentId)
          .then((response) => {
            if (response.error) {
              toast.error(response.error);
            } else {
              toast.success(response.success);
              window.location.reload();
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("Something went wrong. Please try again later!");
          });
      };

      return (
        <div className="flex items-center space-x-2">
          {status === MeetingStatus.CREATED ? (
            <>
              <Link
                href={meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" })
                )}
              >
                Join
              </Link>
              <DeleteDialog
                title="Cancel appointment"
                onConfirm={handleCancel}
                description="Are you sure you want to cancel this appointment?"
                variant="destructive"
              >
                <Button size="sm" variant="destructive">
                  Cancel
                </Button>
              </DeleteDialog>
            </>
          ) : (
            <Badge variant="destructive" className="px-4 py-1">
              {status}
            </Badge>
          )}
        </div>
      );
    },
  },
];

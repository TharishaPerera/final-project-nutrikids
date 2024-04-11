"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Edit, ArrowUpDown, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Availability } from "@prisma/client";
import { DeleteDialog } from "@/components/common/delete-dialog";
import { deleteAvailability } from "@/actions/availability/availability";
import { toast } from "sonner";

export const columns: ColumnDef<Availability>[] = [
  {
    accessorKey: "hospital",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hospital
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }) => {
      return row.original.startTime;
    },
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }) => {
      return row.original.endTime;
    },
  },
  {
    accessorKey: "dateOfWeek",
    header: "Date of Week",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.dateOfWeek}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const availability = row.original;
      const handleDelete = () => {
        deleteAvailability(availability.id)
          .then((response) => {
            if (response.error) {
              toast.error(response.error);
            } else {
              toast.success(response.success);
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error(error);
          })
          .finally(() => {
            setTimeout(() => {
              window.location.reload();
            }, 1000)
          });
      };

      const handleEdit = () => {
        // TODO:
      };

      return (
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleEdit}
            size="icon"
            variant="secondary"
            className="rounded-full"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <DeleteDialog
            title="Delete you availability"
            onConfirm={handleDelete}
            description="Are you sure you want to delete your availability record?"
            variant="destructive"
          >
            <Button size="icon" variant="secondary" className="rounded-full">
              <Trash className="w-4 h-4" />
            </Button>
          </DeleteDialog>
        </div>
      );
    },
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Edit, ArrowUpDown, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Child } from "@prisma/client";
import { dateFormat } from "@/lib/utils";
import { DeleteDialog } from "@/components/common/delete-dialog";
import { removeChild } from "@/actions/children/children";
import { toast } from "sonner";

export const columns: ColumnDef<Child>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date of Birth
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="capitalize">
          {dateFormat(row.original.dateOfBirth, "dddd, MMMM D, YYYY")}
        </span>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.gender}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const childId = row.original.id;
      const handleDelete = () => {
        removeChild(childId)
          .then((response) => {
            if (response.error) {
              toast.error(response.error);
            } else {
              toast.success(response.success);
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("Something went wrong. Please try again later!");
          })
          .finally(() => {
            window.location.reload();
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
            title="Remove child from the system"
            onConfirm={handleDelete}
            description="Are you sure you want to remove your child?"
            variant="destructive"
          >
            <Button size="icon" variant="destructive" className="rounded-full">
              <Trash className="w-4 h-4" />
            </Button>
          </DeleteDialog>
        </div>
      );
    },
  },
];

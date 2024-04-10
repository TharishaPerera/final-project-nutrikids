"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Edit, ArrowUpDown, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Child } from "@prisma/client";
import { dateFormat } from "@/lib/utils";

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
      return <span className="capitalize">{dateFormat(row.original.dateOfBirth, 'dddd, MMMM D, YYYY')}</span>
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.gender}</span>
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const availability = row.original;
      const handleDelete = () => {
        // TODO:
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
          <Button
            onClick={handleDelete}
            size="icon"
            variant="secondary"
            className="rounded-full"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];

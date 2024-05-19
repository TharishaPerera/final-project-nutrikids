"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Notification } from "@prisma/client";
import { dateFormat } from "@/lib/utils";
import { DeleteDialog } from "@/components/common/delete-dialog";

export const columns: ColumnDef<Notification>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.title}</span>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.description}</span>;
    },
  },
  {
    accessorKey: "targetUsers",
    header: "Notification for",
    cell: ({ row }) => {
      const targetUsers = row.original.targetUsers;
      switch (targetUsers) {
        case 100:
          return <span className="capitalize">All Users</span>;
        case 1000:
          return <span className="capitalize">All Consultants</span>;
        default:
          return <span className="capitalize">-</span>;
      }
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.type}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      return <span className="capitalize">{dateFormat(row.original.createdAt, 'D MMM, YYYY at h:mm A')}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const childId = row.original.id;
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
          <DeleteDialog
            title="Delete notification"
            onConfirm={handleDelete}
            description="Are you sure you want to delete notification?"
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

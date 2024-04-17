"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

import {
  CopyIcon,
  Edit,
  MoreHorizontal,
  ArrowUpDown,
  Trash,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "next-view-transitions";
import { cn } from "@/lib/utils";
import { UserTableInterface } from "@/interfaces/user-interfaces/user-interfaces";

export const columns: ColumnDef<UserTableInterface>[] = [
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
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "telephone",
    header: "Contact",
    cell: ({ row }) => {
      return row.original.telephone ? row.original.telephone : "-";
    },
  },
  {
    accessorKey: "role",
    header: "User Role",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       User Role
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => {
      return (
        <Badge
          variant="outline"
          className="rounded-xl px-4 py-1 text-[11px] uppercase"
        >
          {row.original.userRole.role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "emailVerified",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email Verified
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      if (row.original.emailVerified) {
        return <span>Yes</span>;
      }
      return <span>No</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      const handleCopy = () => {
        navigator.clipboard.writeText(user.id);
        toast.success("User ID copied to clipboard");
      };

      const handleDelete = () => {
        // TODO:
      };

      return (
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleCopy}
            size="icon"
            variant="secondary"
            className="rounded-full"
          >
            <CopyIcon className="w-4 h-4" />
          </Button>
          <Link
            href={`/users/update/${user.id}`}
            className={cn(
              buttonVariants({ variant: "secondary", size: "icon" }),
              "rounded-full"
            )}
          >
            <Edit className="w-4 h-4" />
          </Link>
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

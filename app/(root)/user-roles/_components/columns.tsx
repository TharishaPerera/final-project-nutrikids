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
import { UserRoleTableInterface } from "@/interfaces/user-interfaces/user-role-interfaces";

export const columns: ColumnDef<UserRoleTableInterface>[] = [
  {
    accessorKey: "role",
    header: "User Role",
  },
  {
    accessorKey: "level",
    header: "Access Level",
  },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const user = row.original;

  //     const handleCopy = () => {
  //       navigator.clipboard.writeText(user.id);
  //       toast.success("User ID copied to clipboard");
  //     };

  //     const handleDelete = () => {
  //       // TODO:
  //     };

  //     return (
  //       <div className="flex items-center space-x-2">
  //         <Button
  //           onClick={handleCopy}
  //           size="icon"
  //           variant="secondary"
  //           className="rounded-full"
  //         >
  //           <CopyIcon className="w-4 h-4" />
  //         </Button>
  //         <Link
  //           href={`/users/${user.id}`}
  //           className={cn(
  //             buttonVariants({ variant: "secondary", size: "icon" }),
  //             "rounded-full"
  //           )}
  //         >
  //           <Edit className="w-4 h-4" />
  //         </Link>
  //         <Button
  //           onClick={handleDelete}
  //           size="icon"
  //           variant="secondary"
  //           className="rounded-full"
  //         >
  //           <Trash className="w-4 h-4" />
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];

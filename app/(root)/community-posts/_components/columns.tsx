"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Post, PostStatus } from "@prisma/client";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UpdatePostStatus } from "@/actions/community/posts";

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return row.original.title;
    },
  },
  {
    header: "View",
    cell: ({ row }) => {
      return (
        <Link
          target="_blank"
          href={`/community/posts/${row.original.id}`}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          View Post
        </Link>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { id, status } = row.original;

      const handleApprove = () => {
        UpdatePostStatus(id, PostStatus.APPROVED)
          .then((response) => {
            if (response.error) {
              toast.error(response.error);
            }
            if (response.success) {
              window.location.reload();
              toast.success(response.success);
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("Something went wrong. Please try again later!");
          });
      };

      const handleReject = () => {
        UpdatePostStatus(id, PostStatus.REJECTED)
          .then((response) => {
            if (response.error) {
              toast.error(response.error);
            }
            if (response.success) {
              window.location.reload();
              toast.success(response.success);
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("Something went wrong. Please try again later!");
          });
      };

      return (
        <div className="flex items-center space-x-2">
          {status === PostStatus.NEW || status === PostStatus.EDITED && (
            <>
              <Button
                onClick={handleApprove}
                size="sm"
                variant="secondary"
                className="rounded-md"
              >
                Approve
              </Button>
              <Button
                onClick={handleReject}
                size="sm"
                variant="destructive"
                className="rounded-md"
              >
                Reject
              </Button>
            </>
          )}
          {status === PostStatus.APPROVED && (
            <>
              <Button
                onClick={handleReject}
                size="sm"
                variant="destructive"
                className="rounded-md"
              >
                Reject
              </Button>
            </>
          )}
          {status === PostStatus.REJECTED && (
            <>
              <Button
                onClick={handleApprove}
                size="sm"
                variant="secondary"
                className="rounded-md"
              >
                Approve
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];

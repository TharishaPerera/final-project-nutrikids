"use client";

import { logout } from "@/actions/auth/logout";
import { deleteAccount } from "@/actions/profile/profile";
import { DeleteDialog } from "@/components/common/delete-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

export const DeleteAccountForm = () => {
  const handleDelete = () => {
    deleteAccount()
      .then((response) => {
        if (response) {
          toast.error(response.error);
        } else {
          logout();
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong. Please try again later.");
      });
  };
  return (
    <div className="flex justify-between items-center p-2">
      <p>Delete my account</p>
      <DeleteDialog
        title="Delete your account"
        onConfirm={handleDelete}
        description="Are you sure you want to delete your account?"
        variant="destructive"
      >
        <Button variant="destructive">Delete</Button>
      </DeleteDialog>
    </div>
  );
};

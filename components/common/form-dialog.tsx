import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FormDialogProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  form: React.ReactNode;
}

export const FormDialog: React.FC<FormDialogProps> = ({
  children,
  title,
  description,
  form
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {form}
      </DialogContent>
    </Dialog>
  );
};

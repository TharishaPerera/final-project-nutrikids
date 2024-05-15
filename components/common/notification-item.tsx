import { truncateText } from "@/lib/utils";
import { Notification } from "@prisma/client";
import { BellIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export const NotificationItem: React.FC<Notification> = ({
  id,
  title,
  description,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center p-4 rounded-lg hover:bg-secondary">
          <div>
            <BellIcon className="h-4 w-4" />
          </div>
          <div className="ml-3 grid gap-1 text-sm">
            <p className="font-medium">{title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {truncateText(description, 50)}
            </p>
          </div>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

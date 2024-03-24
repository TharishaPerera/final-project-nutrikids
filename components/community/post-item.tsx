import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { DeleteDialog } from "@/components/common/delete-dialog";
import { DeletePost } from "@/actions/community/posts";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader } from "@/components/common/loader";
import { cn } from "@/lib/utils";

interface PostItemProps {
  postId: string;
  title: string;
  content: string;
  actions?: boolean;
}

export const PostItem: React.FC<PostItemProps> = ({
  postId,
  title,
  content,
  actions = false,
}) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      DeletePost(postId)
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
          } else {
            toast.success("Post deleted successfully");
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again later.");
        })
        .finally(() => {
          window.location.reload();
        });
    });
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="flex justify-between space-x-2">
      <Link href={`/community/posts/${postId}`} className="w-full">
        <div className="border rounded-lg p-4 bg-secondary space-y-2">
          <h2 className="truncate font-medium text-md sm:text-lg">{title}</h2>
          <div className="line-clamp-2 text-xs sm:text-sm">{content}</div>
        </div>
      </Link>
      {actions && (
        <div className="flex flex-col space-y-2">
          <Link
            className={cn(
              buttonVariants({ variant: "secondary", size: "icon" }),
              "rounded-md"
            )}
            href={`/community/posts/edit/${postId}`}
          >
            <Edit className="h-4 w-4" />
          </Link>
          <DeleteDialog
            title="Delete your Post"
            onConfirm={handleDelete}
            description="Are you sure you want to delete this post?"
            variant="destructive"
          >
            <Button
              size="icon"
              variant="secondary"
              className="bg-red-300 dark:bg-red-800 text-secondary-foreground hover:bg-red-500 dark:hover:bg-red-500"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </DeleteDialog>
        </div>
      )}
    </div>
  );
};

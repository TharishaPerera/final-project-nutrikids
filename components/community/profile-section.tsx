"use client";

import Link from "next/link";
import { cn, getFirstLetters } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ProfileSection = () => {
  const user = useCurrentUser();
  const pathname = usePathname();
  const name = user?.name;
  const image = user?.image;
  const firstLetters = getFirstLetters(name!);

  return (
    // TODO: add community profile section
    <div className="w-full flex flex-col items-center justify-center space-y-4">
      <div>
        <Avatar className="h-36 w-36">
          <AvatarImage src={image!} alt="" />
          <AvatarFallback className="text-4xl tracking-widest">
            {firstLetters}
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <span className="text-lg tracking-wider font-medium">{name}</span>
      </div>
      <div className="space-y-2 w-full">
      <Link
          href="/community"
          className={cn(
            "bg-secondary text-secondary-foreground p-4 flex w-full items-center justify-center rounded-md text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700",
            pathname == "/community" &&
              "bg-slate-200 dark:bg-slate-700"
          )}
        >
          Feed
        </Link>
        <Link
          href="/community/saved-posts"
          className={cn(
            "bg-secondary text-secondary-foreground p-4 flex w-full items-center justify-center rounded-md text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700",
            pathname == "/community/saved-posts" &&
              "bg-slate-200 dark:bg-slate-700"
          )}
        >
          Saved Posts
        </Link>
      </div>
    </div>
  );
};

import React from "react";
import { Link } from "next-view-transitions";
import { useSession } from "next-auth/react";

import { ApplicationName, TopNavLinks } from "@/config/navlinks.config";
import { useLockBody } from "@/hooks/use-lockbody";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme/theme-toggler";

export const MobileMenu = () => {
  useLockBody();
  const { data: session } = useSession();

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md dark:shadow-gray-600 dark:bg-secondary">
        <div className="flex items-center justify-between px-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="uppercase font-semibold text-gray-700 dark:text-gray-200 tracking-widest">
              <span>{ApplicationName}</span>
            </span>
          </Link>
          <div>
            <ModeToggle />
          </div>
        </div>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {TopNavLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline underline-offset-2"
              )}
            >
              {item.label}
            </Link>
          ))}
          {session && (
            <Link
              href="/dashboard"
              className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline underline-offset-2"
            >
              Dashboard
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

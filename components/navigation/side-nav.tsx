"use client";

import Link from "next/link";
import React from "react";

import { SideNavLinks } from "@/config/navlinks.config";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useCurrentLevel } from "@/hooks/use-current-role";

const SideNav = () => {
  const pathname = usePathname();
  const userLevel = useCurrentLevel();

  return (
    <div className="space-y-3 mr-2">
      {SideNavLinks.map((link) => {
        if (userLevel >= link.level) {
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "bg-secondary text-secondary-foreground p-4 flex w-full items-center rounded-md text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700",
                pathname.includes(link.href.toString()) &&
                  "bg-slate-200 dark:bg-slate-700"
              )}
            >
              {link.label}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default SideNav;
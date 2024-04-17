"use client";

import React from "react";
import { Link } from "next-view-transitions";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import FloatingMenuButton from "@/components/navigation/floating-menu";
import { ApplicationName, SideNavLinks } from "@/config/navlinks.config";
import { useCurrentLevel } from "@/hooks/use-current-role";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileSideNav = () => {
  const pathname = usePathname();
  const userLevel = useCurrentLevel();
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <FloatingMenuButton />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <div className="uppercase text-md font-semibold text-gray-700 dark:text-gray-200 tracking-widest">
              <span>{ApplicationName}</span>
            </div>
          </SheetHeader>
          <div className="py-6 space-y-3">
            {SideNavLinks.map((link) => {
              if (link.level.includes(userLevel)) {
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSideNav;

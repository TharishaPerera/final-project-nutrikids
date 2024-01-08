"use client";

import React from "react";
import Link from "next/link";

import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import FloatingMenuButton from "@/components/navigation/floating-menu";
import { ApplicationName, SideNavLinks } from "@/config/navlinks.config";

const MobileSideNav = () => {
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
            {SideNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-secondary text-secondary-foreground p-4 flex w-full items-center rounded-md text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSideNav;

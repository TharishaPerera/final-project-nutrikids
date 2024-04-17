"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { UserMenu } from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/theme-toggler";
import {
  ApplicationName,
  TopNavLinks,
  showDashboardBtnLinks,
} from "@/config/navlinks.config";
import { MobileMenu } from "@/components/navigation/mobile-menu";

export const Navbar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <>
      <nav
        className={cn(
          "flex items-center h-16 w-full px-6 md:px-16 justify-between space-x-4 lg:space-x-6 shadow-sm border-b",
          className
        )}
        {...props}
      >
        {/* TODO: need to improve this styling with the links and the logo */}
        <div>
          <Link
            href="/"
            className="uppercase text-md hidden md:flex md:text-lg font-semibold text-gray-700 dark:text-gray-200 tracking-widest"
          >
            <span>{ApplicationName}</span>
          </Link>
          <div>
            <div
              className="flex text-md items-center space-x-2 md:hidden cursor-pointer"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? (
                <X />
              ) : (
                <span className="uppercase text-md font-semibold text-gray-700 dark:text-gray-200 tracking-widest">
                  Menu
                </span>
              )}
              {showMobileMenu && <MobileMenu />}
            </div>
          </div>
        </div>
        <div className="space-x-4 hidden md:flex">
          {TopNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-md",
                pathname.includes(link.href) && "underline underline-offset-8"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-end space-x-6">
          {session &&
            (showDashboardBtnLinks.includes(pathname) ||
              pathname.includes("/community/posts")) && (
              <Link
                href="/dashboard"
                className="hidden md:block text-sm md:text-md"
              >
                <Button variant="secondary">Dashboard</Button>
              </Link>
            )}

          {session ? (
            <UserMenu />
          ) : (
            <>
              <Link href="/auth/sign-in">
                <Button variant={"secondary"}>Sign In</Button>
              </Link>
              <div className="hidden md:block">
                <ModeToggle />
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

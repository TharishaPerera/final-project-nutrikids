"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Settings, User2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstLetters } from "@/lib/utils";
import { ModeToggle } from "@/components/theme/theme-toggler";
import { logout } from "@/actions/auth/logout";

export const UserMenu = () => {
  const { data: session } = useSession();
  const name = session?.user?.name;
  const email = session?.user?.email;
  const image = session?.user?.image;
  const firstLetters = getFirstLetters(name!);

  return (
    <div className="rounded-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={image!} alt="" />
              <AvatarFallback>{firstLetters}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/profile">
              <DropdownMenuItem>
                <User2 className="w-4 h-4 mr-2"/>
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/profile">
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Theme</span>
              <DropdownMenuShortcut><ModeToggle /></DropdownMenuShortcut>
            </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => logout()}>
            <span>Sign out</span>
            <DropdownMenuShortcut><LogOut className="w-4 h-4 mr-2" /></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

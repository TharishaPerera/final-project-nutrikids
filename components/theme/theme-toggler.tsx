"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const mounted = useMounted()

  return (
    <>
      {mounted && theme == "light" ? (
        <Button className={cn('rounded-full')} onClick={() => setTheme("dark")} variant={"ghost"} size={'icon'}> 
          <Moon className="w-4 h-4"/>
        </Button>
      ) : (
        <Button className={cn('rounded-full')} onClick={() => setTheme("light")} variant={"ghost"} size={'icon'}>
          <Sun className="w-4 h-4"/>
        </Button>
      )}
    </>
  );
}

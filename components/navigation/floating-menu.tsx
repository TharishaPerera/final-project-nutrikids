'use client'

import React from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingMenuButtonProps {
  screen?: string
}

const FloatingMenuButton: React.FC<FloatingMenuButtonProps> = ({ screen = 'md' }) => {
  const hiddenScreen = screen + ":hidden"

  return (
    <div className={cn(hiddenScreen, "fixed bottom-5 right-2 p-4")}>
      <span className="bg-primary text-primary-foreground rounded-lg w-7 h-7 p-1 flex items-center justify-center">
        <Menu />
      </span>
    </div>
  );
};

export default FloatingMenuButton;

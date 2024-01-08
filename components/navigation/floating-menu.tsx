'use client'

import React from "react";
import { Menu } from "lucide-react";

const FloatingMenuButton = () => {

  return (
    <div className="fixed bottom-5 right-2 p-4 md:hidden">
      <span className="bg-primary text-primary-foreground rounded-lg w-7 h-7 p-1 flex items-center justify-center">
        <Menu />
      </span>
    </div>
  );
};

export default FloatingMenuButton;

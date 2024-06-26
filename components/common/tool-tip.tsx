import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";
import React from "react";
import { buttonVariants } from "@/components/ui/button";

interface ToolTipProps {
  message: string
  size: 'default' | 'sm' | 'lg' | 'icon'
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  children: React.ReactNode
  className?: string
}

export const ToolTip: React.FC<ToolTipProps> = ({ children, message, size, variant, className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={cn(buttonVariants({ variant: variant, size: size}), className)}>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

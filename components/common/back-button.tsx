import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
    href?: string
    topLeft?: boolean
}

export const BackButton: React.FC<BackButtonProps> = ({ href, topLeft }) => {
  return (
    <>
      <Link
        href={href ?? '/'}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          topLeft && "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
    </>
  );
};
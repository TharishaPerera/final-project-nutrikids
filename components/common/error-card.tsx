import { Link } from "next-view-transitions";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface ErrorCardProps {
  title?: string;
  description?: string;
  url?: string;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({
  title = "Something went wrong!",
  description = "Sorry about that! Please visit our homepage to get where you need to go.",
  url = "/",
}) => {
  return (
    <div className=" block space-y-6 text-center">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
      </div>
      <div className="space-y-6">
        <h3 className="text-xl md:text-2xl ">{description}</h3>
        <div className="">
          <Link
            href={url}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            <>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          </Link>
        </div>
      </div>
    </div>
  );
};

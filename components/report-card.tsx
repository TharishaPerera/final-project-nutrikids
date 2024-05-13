import React from "react";
import { Link } from "next-view-transitions";

import {
  Card,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChartHorizontalBig } from "lucide-react";
import Image from "next/image";

interface ReportCardProps {
  name: string;
  description: string;
  href: string;
  icon: string | undefined;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  name,
  description,
  href,
  icon,
}) => {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="w-full flex justify-center items-center p-4">
          {/* <BarChartHorizontalBig className="h-16 w-16" /> */}
          <Image
            width={75}
            height={75}
            src="/assets/report/report-icon.png"
            alt="logo"
          />
        </div>
        <p className="font-semibold capitalize">{name}</p>
        <p className="font-normal capitalize text-sm">{description}</p>
      </CardHeader>
      <CardFooter>
        <Link href={href} className="w-full">
          <Button className="w-full">View</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

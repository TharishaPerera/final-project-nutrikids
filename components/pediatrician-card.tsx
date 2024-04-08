import React from "react";
import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PediatriciansCardProps {
  id: string;
  name: string | null | undefined;
  specialization: string | null | undefined;
  image: string | undefined;
}

export const PediatriciansCard: React.FC<PediatriciansCardProps> = ({
  id,
  name,
  specialization,
  image,
}) => {
  return (
    <Card className="text-center">
      <CardContent className="p-4 space-y-2">
        <div>
          <img
            src={image}
            className="w-full rounded-md"
            alt="pediatrician image"
          />
        </div>
        <div>
          <p className="font-semibold capitalize">{name}</p>
          <p className="font-normal capitalize">{specialization}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={"/pediatricians/" + id} className="w-full">
          <Button className="w-full">View</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

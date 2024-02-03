import React from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  title: string;
  description: string;
  features: string[];
  price: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  features,
  price,
}) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="items-center justify-start">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-x-2 mb-3 text-start"
              >
                <CheckCircle2 className="w-4 h-4 " />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Link href="/auth/sign-in" className="w-full">
            <Button variant="default" size="sm" className="w-full">
              Get
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
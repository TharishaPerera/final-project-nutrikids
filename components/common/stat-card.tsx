import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import React from "react";

interface StatCardProps {
    title: string
    icon: React.ReactNode
    value: string
    description?: string
}

export const StatCard: React.FC<StatCardProps> = ({ title, icon, value, description}) => {
  return (
    <Card className="w-full hover:bg-secondary">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-md lg:text-2xl font-bold">+{value}</div>
        {
            description && (
                <p className="text-xs text-muted-foreground">{description ?? '-'}</p>
            )
        }
      </CardContent>
    </Card>
  );
};

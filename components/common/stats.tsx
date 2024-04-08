import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export const Stats = () => {
  return (
    <div className="px-0">
      <div className="px-0">
        <div className="w-full flex justify-center">
          <div className="w-full ">
            <Card className="border grid rounded-lg w-full">
              <CardHeader className="bg-secondary p-4 text-lg font-semibold border-b">
                Statistics
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row p-2 gap-2 w-full">
                <Card className="w-full hover:bg-secondary">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-md lg:text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="w-full hover:bg-secondary">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-md lg:text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className="w-full hover:bg-secondary">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-md lg:text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
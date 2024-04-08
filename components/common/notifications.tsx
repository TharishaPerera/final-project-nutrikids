import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BellIcon } from "lucide-react";
import { truncateText } from "@/lib/utils";

export const Notifications = () => {
  return (
    <div className="px-0">
      <div className="px-0">
        <div className="w-full flex justify-center">
          <div className="w-full">
            <Card className="border grid rounded-lg w-full">
              <CardHeader className="bg-secondary p-4 text-lg font-semibold border-b">
                Notifications
              </CardHeader>
              <CardContent className="p-2 gap-2">
                <div className="flex items-center p-4 rounded-lg hover:bg-secondary">
                  <div>
                    <BellIcon className="h-4 w-4" />
                  </div>
                  <div className="ml-3 grid gap-1 text-sm">
                    <p className="font-medium">Everything</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {truncateText(
                        "Email digest, mentions & all activity. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        50
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 rounded-lg hover:bg-secondary">
                  <div>
                    <BellIcon className="h-4 w-4" />
                  </div>
                  <div className="ml-3 grid gap-1 text-sm">
                    <p className="font-medium">Everything</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {truncateText(
                        "Email digest, mentions & all activity. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        50
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

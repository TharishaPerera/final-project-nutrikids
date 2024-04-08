import { DashboardTable } from "@/components/common/dashboard-table";
import { Notifications } from "@/components/common/notifications";
import { Stats } from "@/components/common/stats";
import React from "react";

// TODO: Load dynamic data to the dashboard
const DashboardPage = async () => {
  return (
    <div className="flex flex-wrap gap-4 md:gap-0">
      <div className="w-full md:w-4/6 md:pr-2 space-y-4">
        <div>
          <Stats />
        </div>
        <div>
          <DashboardTable />
        </div>
      </div>
      <div className="w-full md:w-2/6 md:pl-2">
        <Notifications />
      </div>
    </div>
  );
};

export default DashboardPage;
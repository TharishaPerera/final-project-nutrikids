import React from "react";
import { Reports } from "@/config/reports.config";
import { currentUser } from "@/lib/auth";
import { ReportCard } from "@/components/report-card";
import { PageTitle } from "@/components/common/page-title";

const ReportsPage = async () => {
  const user = await currentUser();

  return (
    <div className="px-2">
      <div className="mb-6">
      <PageTitle title="Reports" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Reports.map((report, index) => {
          if (report.availableFor.includes(user?.level!)) {
            return <ReportCard key={index} {...report} />;
          }
        })}
      </div>
    </div>
  );
};

export default ReportsPage;

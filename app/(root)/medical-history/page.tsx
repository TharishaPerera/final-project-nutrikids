import { FormDialog } from "@/components/common/form-dialog";
import { PageTitle } from "@/components/common/page-title";
import { NewMedicalHistoryForm } from "@/components/form/medical-history/new-medical-history-form";
import { Button } from "@/components/ui/button";
import React from "react";

const HistoryPage = () => {
  return (
    <div className="px-2">
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Medical History" />
        <FormDialog
          title="Add Health Record"
          description="Add your childs' health records to the system"
          form={<NewMedicalHistoryForm />}
        >
          <Button variant="default" size="sm">
            New Record
          </Button>
        </FormDialog>
      </div>
      {/* table here */}
    </div>
  );
};

export default HistoryPage;

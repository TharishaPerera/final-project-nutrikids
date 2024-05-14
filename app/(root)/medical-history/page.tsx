"use client"

import { GetMedicalHistoryForParents } from "@/actions/medical-history/medical-history";
import { FormDialog } from "@/components/common/form-dialog";
import { Loader } from "@/components/common/loader";
import { PageTitle } from "@/components/common/page-title";
import { NewMedicalHistoryForm } from "@/components/form/medical-history/new-medical-history-form";
import { Button } from "@/components/ui/button";
import { MedicalHistoryForParentsInterface } from "@/interfaces/medial-history-interfaces/medical-history-interfaces";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { columns } from "./_components/columns";
import { DataTable } from "@/components/common/data-table";

const HistoryPage = () => {
  const [data, setData] = useState<MedicalHistoryForParentsInterface[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      GetMedicalHistoryForParents()
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
          }
          if (response.healthRecords) {
            setData(response.healthRecords);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again!");
        });
    });
  }, []);

  if (isPending || !data) {
    return <Loader />;
  }

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
      <DataTable data={data} columns={columns} searchEnabled={false} columnFilterEnable={false} />
    </div>
  );
};

export default HistoryPage;

"use client";

import {
  GetMedicalHistoryForAdmins,
  GetMedicalHistoryForParents,
} from "@/actions/medical-history/medical-history";
import { FormDialog } from "@/components/common/form-dialog";
import { Loader } from "@/components/common/loader";
import { PageTitle } from "@/components/common/page-title";
import { NewMedicalHistoryForm } from "@/components/form/medical-history/new-medical-history-form";
import { Button } from "@/components/ui/button";
import {
  MedicalHistoryForAdminsInterface,
  MedicalHistoryForParentsInterface,
} from "@/interfaces/medial-history-interfaces/medical-history-interfaces";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { columns } from "./_components/columns";
import { DataTable } from "@/components/common/data-table";
import { useCurrentLevel } from "@/hooks/use-current-role";
import { adminColumns } from "./_components/columns-admins";

const HistoryPage = () => {
  const [data, setData] = useState<
    (MedicalHistoryForParentsInterface | MedicalHistoryForAdminsInterface)[]
  >([]);
  const [isPending, startTransition] = useTransition();
  const userLevel = useCurrentLevel();

  useEffect(() => {
    startTransition(() => {
      if (userLevel >= 5000) {
        GetMedicalHistoryForAdmins()
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
      } else {
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
      }
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
      {userLevel >= 5000 ? (
        <DataTable
          data={data as MedicalHistoryForAdminsInterface[]}
          columns={adminColumns}
          searchEnabled={false}
          columnFilterEnable={false}
        />
      ) : (
        <DataTable
          data={data as MedicalHistoryForParentsInterface[]}
          columns={columns}
          searchEnabled={false}
          columnFilterEnable={false}
        />
      )}
    </div>
  );
};

export default HistoryPage;

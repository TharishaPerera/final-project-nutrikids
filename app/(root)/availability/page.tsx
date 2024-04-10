"use client"

import { getAllAvailabilitiesByPediatrician } from "@/actions/availability/availability";
import { DataTable } from "@/components/common/data-table";
import { FormDialog } from "@/components/common/form-dialog";
import { Loader } from "@/components/common/loader";
import { PageTitle } from "@/components/common/page-title";
import { NewAvailabilityForm } from "@/components/form/availability/new-availability-form";
import { Button } from "@/components/ui/button";
import { Availability } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { columns } from "./_components/columns";

const AvailabilityPage = () => {
  const [data, setData] = useState<Availability[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      getAllAvailabilitiesByPediatrician()
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
          }
          if (response.availability) {
            setData(response.availability);
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
        <PageTitle title="My Availability" />
        <FormDialog
          title="Add New Availability"
          description="Add your hospital availability to your profile."
          form={<NewAvailabilityForm />}
        >
          <Button variant="default" size="sm">
            New Availability
          </Button>
        </FormDialog>
      </div>
      <DataTable data={data} columns={columns} searchPlaceholder="Search Hospital..." searchKey="hospital" />
    </div>
  );
};

export default AvailabilityPage;

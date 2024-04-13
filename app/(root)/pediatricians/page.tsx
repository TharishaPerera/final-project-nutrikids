"use client";

import React, { useEffect, useState, useTransition } from "react";
import { ScrollPane } from "@/components/common/scroll-pane";
import { PediatriciansCard } from "@/components/pediatrician-card";
import { getAllPediatricians } from "@/actions/pediatrician/pediatrician";
import { toast } from "sonner";
import { AllPediatriciansInterface } from "@/interfaces/user-interfaces/user-interfaces";
import { Loader } from "@/components/common/loader";
import { InfoAlert } from "@/components/common/alerts";

const PediatriciansPage = () => {
  const [isPending, startTransition] = useTransition();
  const [pediatricians, setPediatricians] = useState<
    AllPediatriciansInterface[]
  >([]);
  useEffect(() => {
    startTransition(() => {
      getAllPediatricians()
        .then((data) => setPediatricians(data))
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again later!");
        });
    });
  }, []);

  if (isPending || !pediatricians) {
    return <Loader />;
  }

  return (
    <ScrollPane>
      <div>
        {pediatricians.length < 1 && (
          <div className="w-full flex justify-center">
            <InfoAlert message="No pediatricians available at the moment." />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {pediatricians.map((item, index) => (
          <div key={index}>
            <PediatriciansCard
              id={item.pediatricianId}
              name={item.user.name}
              specialization={item.specializations}
              image={item.user.image!}
            />
          </div>
        ))}
      </div>
    </ScrollPane>
  );
};

export default PediatriciansPage;

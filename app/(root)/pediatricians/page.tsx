import React from "react";

import { ScrollPane } from "@/components/common/scroll-pane";
import { PediatriciansCard } from "@/components/pediatrician-card";
import { pediatrician } from "@/testdata/pediatricians";

const PediatriciansPage = () => {
  return (
    <ScrollPane>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {pediatrician.map((item, index) => (
          <div key={index}>
            <PediatriciansCard
              id={item.id}
              name={item.name}
              specialization={item.specialization}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </ScrollPane>
  );
};

export default PediatriciansPage;
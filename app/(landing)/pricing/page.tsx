import React from "react";

import { PricingCard } from "@/components/common/pricing-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pricingPlans } from "@/config/pricing.config";
import { ApplicationName } from "@/config/navlinks.config";

const PricingPage = () => {
  return (
    <div className="py-10 md:py-24">
      <div className="">
        <div className=" block space-y-6 text-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-semibold">
              Pricing Plans
            </h1>
            <div className="justify-center font-medium md:w-2/4 mx-auto">
              At <span>{ApplicationName}</span>, we believe that providing support for parents should
              be accessible to all. We offer a range of pricing plans to cater
              to your specific needs.
            </div>
          </div>
          <div className="justify-center flex">
            <div className="w-full lg:w-2/3">
              <Tabs defaultValue="parent" className="">
                <TabsList className="w-full md:w-1/3">
                  <TabsTrigger value="parent" className="w-full">
                    Parent
                  </TabsTrigger>
                  <TabsTrigger value="consultant" className="w-full">
                    Consultant
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="parent">
                <h3 className="text-lg py-5">Enjoy a 14-day free trial on standard and pro plans!</h3>
                  <div className="grid gap-3 grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
                    <PricingCard
                      title={pricingPlans.parent.free.title}
                      description={pricingPlans.parent.free.description}
                      features={pricingPlans.parent.free.features}
                      price={pricingPlans.parent.free.price}
                    />
                    <PricingCard
                      title={pricingPlans.parent.standard.title}
                      description={pricingPlans.parent.standard.description}
                      features={pricingPlans.parent.standard.features}
                      price={pricingPlans.parent.standard.price}
                    />
                    <PricingCard
                      title={pricingPlans.parent.pro.title}
                      description={pricingPlans.parent.pro.description}
                      features={pricingPlans.parent.pro.features}
                      price={pricingPlans.parent.pro.price}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="consultant">
                  <h3 className="text-lg py-5">Enjoy a 14-day free trial on all plans!</h3>
                  <div className="grid gap-3 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                    <PricingCard
                      title={pricingPlans.consultant.standard.title}
                      description={pricingPlans.consultant.standard.description}
                      features={pricingPlans.consultant.standard.features}
                      price={pricingPlans.consultant.standard.price}
                    />
                    <PricingCard
                      title={pricingPlans.consultant.pro.title}
                      description={pricingPlans.consultant.pro.description}
                      features={pricingPlans.consultant.pro.features}
                      price={pricingPlans.consultant.pro.price}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

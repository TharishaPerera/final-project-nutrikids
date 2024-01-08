import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { about } from "@/config/site.config";
import { ApplicationName } from "@/config/navlinks.config";

const AboutUsPage = () => {
  return (
    <div className="py-10 md:py-20">
      <div className="">
        <div className=" block space-y-6 text-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-semibold"><span>{ApplicationName}</span></h1>
            <div className="justify-center font-medium md:w-2/4 mx-auto">
            <span>{ApplicationName}</span> is your go-to platform for all your parenting needs. We
              understand that raising children from infancy to their pre-teen
              years is a journey filled with questions, challenges, and
              wonderful moments. That is why we have created a nurturing online
              community that brings parents in Sri Lanka together with child
              specialists and nutritionists.
            </div>
          </div>
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-semibold">
              What We Offer
            </h1>
            <div className="justify-center font-medium md:w-2/4 mx-auto">
              <Accordion
                type="single"
                collapsible
                className="bg-secondary rounded-xl px-4"
              >
                {about.map((item, index) => (
                  <AccordionItem key={index} value={item.title}>
                    <AccordionTrigger className="font-md hover:no-underline">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-start">{item.description}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="justify-center font-medium md:w-2/4 mx-auto">
              At <span>{ApplicationName}</span>, we are here to support your child&apos;s every milestone,
              from their first steps to their first day of school. Our mission
              is to provide a safe, friendly, and informative space where you
              can connect, learn, and share your unique parenting journey.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage
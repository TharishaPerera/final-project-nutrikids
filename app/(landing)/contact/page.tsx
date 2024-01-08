import React from "react";
import { MailIcon, PhoneCall } from "lucide-react";

import { ContactUsForm } from "@/components/form/contact/contact-us-form";
import { contact } from "@/config/site.config";

const ContactUsPage = () => {
  return (
    <div className="py-10 md:py-24">
      <div className="">
        <div className=" block space-y-6 text-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-semibold">Get in Touch</h1>
            <div className="justify-center font-medium md:w-2/4 mx-auto">
              We are here to listen, support, and answer your questions. Your
              feedback and inquiries are important to us. Feel free to reach out
              through any of the following methods, and we will get back to you
              promptly:
            </div>
          </div>
          <div className="justify-center flex">
            <div className="w-full md:w-2/4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm ">
              <div className="bg-secondary rounded-lg flex items-center text-center justify-center p-2 md:p-4">
                <MailIcon className="w-5 h-5 mr-3" />
                {contact.email}
              </div>
              <div className="bg-secondary rounded-lg flex items-center text-center justify-center p-2 md:p-4">
                <PhoneCall className="w-5 h-5 mr-3" />
                {contact.phone}
              </div>
            </div>
          </div>
          <div className="justify-center flex">
            <div className="relative w-full md:w-2/4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or send us a message
                </span>
              </div>
            </div>
          </div>
          <div className="justify-center flex">
            <div className="w-full md:w-2/4">
              <ContactUsForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage
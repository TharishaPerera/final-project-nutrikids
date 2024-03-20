"use client";

import { PageTitle } from "@/components/common/page-title";
import { GeneralProfileForm } from "@/components/form/profile/general-profile-form";
import { PasswordForm } from "@/components/form/profile/password-form";
import React from "react";

const ProfilePage = () => {
  return (
    <div>
      <PageTitle title="Profile Details" />
      <div className="w-full mt-5">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="">
              <div>
                <h1 className="text-lg font-medium mb-4">General Details</h1>
                <GeneralProfileForm />
              </div>
              <div>
                <h1 className="text-lg font-medium mb-4">
                  Pediatrician Details
                </h1>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-medium mb-4">Password Details</h1>
              <PasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

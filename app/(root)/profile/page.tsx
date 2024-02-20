"use client";

import { GeneralProfileForm } from "@/components/form/profile/general-profile-form";
import React from "react";

const ProfilePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Profile Details</h1>
      <div className="w-full mt-5">
        <GeneralProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;

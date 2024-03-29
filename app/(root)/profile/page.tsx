import { getUserDetails } from "@/actions/profile/profile";
import { auth } from "@/auth";
import { ErrorAlert } from "@/components/common/alerts";
import { PageTitle } from "@/components/common/page-title";
import { ScrollPane } from "@/components/common/scroll-pane";
import { ConsultantForm } from "@/components/form/profile/consultant-form";
import { GeneralProfileForm } from "@/components/form/profile/general-profile-form";
import { PasswordForm } from "@/components/form/profile/password-form";
import React from "react";

const ProfilePage = async () => {
  const session = await auth();
  const { level } = session?.user!;

  const response = await getUserDetails(session?.user.id!);

  if (response.error) {
    return (
      <ErrorAlert message="An error occurred when fetching user details. Please try again." />
    );
  }

  return (
    <ScrollPane>
      <div>
        <PageTitle title="Profile Details" />
        <div className="w-full mt-5">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h1 className="text-lg font-medium mb-4">General Details</h1>
                <GeneralProfileForm />
              </div>
              <div>
                {level == 1000 && (
                  <>
                    <h1 className="text-lg font-medium mb-4">
                      Pediatrician Details
                    </h1>
                    <ConsultantForm
                      pediatrician={response.userDetails?.isPediatrician!}
                    />
                  </>
                )}
              </div>
              <div>
                <h1 className="text-lg font-medium mb-4">Password Details</h1>
                <PasswordForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollPane>
  );
};

export default ProfilePage;

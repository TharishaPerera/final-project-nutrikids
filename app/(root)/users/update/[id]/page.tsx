"use client"

import { getUserById } from '@/actions/user/user';
import { Loader } from '@/components/common/loader';
import { PageTitle } from '@/components/common/page-title';
import { ScrollPane } from '@/components/common/scroll-pane';
import { ConsultantForm } from '@/components/form/profile/consultant-form';
import { DeleteAccountForm } from '@/components/form/profile/delete-account-form';
import { PasswordForm } from '@/components/form/profile/password-form';
import { UpdateUserGeneralForm } from '@/components/form/user/update-user-general-form';
import { UpdateUserPasswordForm } from '@/components/form/user/update-user-password-form';
import { UserProfileInterface } from '@/interfaces/user-interfaces/user-interfaces';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner';

const UserPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  var parts = pathname.split("/");
  var userId = parts[parts.length - 1];
  const [user, setUser] = useState<UserProfileInterface>();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      getUserById(userId)
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
            router.replace("/users");
          }
          if (response.userDetails) {
            setUser(response.userDetails);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again!");
        });
    });
  }, []);

  if (isPending || !user) {
    return <Loader />;
  }
  
  return (
    <ScrollPane>
      <div>
        <PageTitle title="Update User" />
        <div className="w-full mt-5">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div>
                  <h1 className="text-lg font-medium mb-4">General Details</h1>
                  <UpdateUserGeneralForm user={user} />
                </div>
                <div>
                  <h1 className="text-lg font-medium mb-4">Account Settings</h1>
                  <DeleteAccountForm />
                </div>
              </div>
              {user.isPediatrician && (
                <div>
                  <h1 className="text-lg font-medium mb-4">
                    Pediatrician Details
                  </h1>
                  <ConsultantForm
                    pediatrician={user.isPediatrician}
                  />
                </div>
             )}
              {!user.isOAuth && (
                <div>
                  <h1 className="text-lg font-medium mb-4">Password Details</h1>
                  <UpdateUserPasswordForm user={user} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ScrollPane>
  );
}

export default UserPage
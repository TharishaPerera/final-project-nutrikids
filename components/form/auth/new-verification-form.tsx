"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BadgeCheck, XCircle } from "lucide-react";

import { newVerification } from "@/actions/auth/new-verification";
import { Loader } from "@/components/common/loader";

export const NewVerficationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("No token found!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError("Something went wrong. Try again later!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex items-center justify-center w-full">
      {!success && !error && <Loader size={35} />}
      {success && (
        <div className="flex items-center justify-center space-x-2">
          <BadgeCheck className="w-5 h-5" />
          <p>Email is successfully verified!</p>
        </div>
      )}
      {!success && error && (
        <div className="flex items-center justify-center space-x-2">
          <XCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

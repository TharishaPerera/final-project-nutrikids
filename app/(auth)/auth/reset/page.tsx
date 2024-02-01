import { PasswordResetForm } from "@/components/form/auth/password-reset-form";
import { BackButton } from "@/components/navigation/back-button";

const ForgotPassword = () => {
  return (
    <>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <BackButton href="/auth/sign-in" topLeft={true} />
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <PasswordResetForm />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

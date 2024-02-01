import { BackButton } from "@/components/navigation/back-button";
import { NewPasswordForm } from "@/components/form/auth/new-password-form";

const NewPasswordPage = () => {
  return (
    <>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <BackButton href="/auth/sign-in" topLeft={true} />
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <NewPasswordForm />
        </div>
      </div>
    </>
  );
};

export default NewPasswordPage;

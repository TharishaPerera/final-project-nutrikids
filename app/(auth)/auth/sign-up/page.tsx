import BackButton from "@/components/common/back-button";
import { UserSignupForm } from "@/components/form/auth/user-signup-form";

const RegisterPage = () => {
  return (
    <>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <BackButton href="/auth/sign-in" topLeft={true} />
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
          <UserSignupForm />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

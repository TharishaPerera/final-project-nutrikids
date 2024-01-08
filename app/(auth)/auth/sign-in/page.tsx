import BackButton from "@/components/common/back-button";
import { UserLoginForm } from "@/components/form/auth/user-auth-form";

const LoginPage = () => {
  return (
    <>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <BackButton topLeft={true} />
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <UserLoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;

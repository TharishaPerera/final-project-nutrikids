import { ComingSoon } from "@/components/common/coming-soon";
import { NewVerficationForm } from "@/components/form/auth/new-verification-form";
import { BackButton } from "@/components/navigation/back-button";

const NewVerficationPage = () => {
  return (
    <>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <BackButton href="/auth/sign-in" topLeft={true} />
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <NewVerficationForm />
        </div>
      </div>
    </>
  );
};

export default NewVerficationPage;

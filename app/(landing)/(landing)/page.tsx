"use client";

import { Link } from "next-view-transitions";

import { Button, buttonVariants } from "@/components/ui/button";
import { ApplicationName } from "@/config/navlinks.config";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const { theme } = useTheme();
  return (
    <div className="py-20 md:py-40">
      <div className="">
        {theme === "light" ? (
          <Image
            className="-z-10 w-full h-full hidden md:block"
            src="/assets/bg-black-sm.png"
            layout="fill"
            objectFit="cover"
            alt="logo"
          />
        ) : (
          <Image
            className="-z-10 w-full h-full hidden md:block"
            src="/assets/bg-white-sm.png"
            layout="fill"
            objectFit="cover"
            alt="logo"
          />
        )}
      </div>
      <div className="">
        <div className=" block space-y-6 text-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-semibold">
              Welcome to <span>{ApplicationName}</span>
            </h1>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold">
              Your Ultimate Parenting Companion
            </h3>
          </div>
          <div className="justify-center font-medium w-2/3 mx-auto">
            <h3 className=" text-md md:text-xl mb-8">
              Are you a parent looking for expert guidance and a supportive
              community to navigate the journey of raising healthy and happy
              kids? Look no further - <span>{ApplicationName}</span> is here to
              help!
            </h3>
            <Link
              href="/auth/sign-in"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "font-md md:text-lg"
              )}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

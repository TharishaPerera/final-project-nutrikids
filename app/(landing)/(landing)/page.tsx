"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ApplicationName } from "@/config/navlinks.config";
import Image from "next/image";
import { useTheme } from "next-themes";

const HomePage = () => {
  const { theme } = useTheme();
  return (
    <div className="py-20 md:py-40">
      <div className="">
        {
          theme === 'light' ? (
            <Image className="w-full h-full hidden md:block" src="/assets/bg-black.png" layout="fill" objectFit="cover" alt="logo" />
          ) : (
            <Image className="w-full h-full hidden md:block" src="/assets/bg-white.png" layout="fill" objectFit="cover" alt="logo" />
          )
        }
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
              kids? Look no further - <span>{ApplicationName}</span> is here to help!
            </h3>
            <Link href="/auth/sign-in" className="">
              <Button variant="default" size="lg" className="font-md md:text-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

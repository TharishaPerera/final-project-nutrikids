"use client";

import * as React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { RegisterSchema } from "@/schemas/auth-schemas";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Feather, Loader2 } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { register } from "@/actions/auth/register";
import { useSearchParams } from "next/navigation";
import { UserRole } from "@prisma/client";
import { useTheme } from "next-themes";
import Image from "next/image";

export const UserSignupForm = () => {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  if (urlError !== "") toast.error(urlError);

  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState("parent");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "",
      noOfChildren: "",
      youngestAge: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true);

    selectValue === "parent"
      ? (values.userType = "parent")
      : (values.userType = "consultant");

    const {
      name,
      email,
      password,
      userType,
      noOfChildren,
      youngestAge,
    } = values;

    if (userType == "parent") {
      if ((!noOfChildren || noOfChildren == "") || (!youngestAge || youngestAge == "")) {
        setIsLoading(false);
        return toast.error(
          "To register on this platform, you must have at least one child who is under 16 years old!"
        );
      } else if (
        parseInt(noOfChildren) < 1 ||
        parseInt(youngestAge) < 1 ||
        parseInt(youngestAge) > 16
      ) {
        setIsLoading(false);
        return toast.error(
          "You need at least one child aged 1-16 to register as a parent!"
        );
      }
    }
    // FIXME: improve validation

    // register
    register(values)
      .then((data) => {
        data.error && toast.error(data.error);
        data.success && toast.success(data.success);
      })
      .finally(() => {
        form.reset()
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        {theme === "light" ? (
          <Image
            className="mx-auto w-auto h-auto"
            src="/assets/feet-black.png"
            width={30}
            height={30}
            alt="logo"
          />
        ) : (
          <Image
            className="mx-auto w-auto h-auto"
            src="/assets/feet-white.png"
            width={30}
            height={30}
            alt="logo"
          />
        )}
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email, password and password confirmation to create an
          account.
        </p>
      </div>

      <div className={cn("grid gap-6")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="John Doe"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="name@example.com"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password Confirmation"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <Select
                    defaultValue={"parent"}
                    onValueChange={(value) => setSelectValue(value)}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Are you a" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="parent">A Parent</SelectItem>
                      <SelectItem value="consultant">A Consultant</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectValue == "parent" && (
              <>
                <FormField
                  control={form.control}
                  name="noOfChildren"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Number of children"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="youngestAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Age of the youngest child"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button
              type="submit"
              className={cn(buttonVariants(), "w-full")}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        {/* Google */}
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }))}
          onClick={() => {
            setIsGoogleLoading(true);
            signIn("google", {
              callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
            });
          }}
          disabled={isLoading || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaGoogle className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </button>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/auth/sign-in"
          className="hover:text-brand underline underline-offset-4"
        >
          Already have an account? Sign In
        </Link>
      </p>
    </>
  );
};

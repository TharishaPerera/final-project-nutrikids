"use client";

import * as React from "react";
import * as z from "zod";
import { Link } from "next-view-transitions";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { login } from "@/actions/auth/login";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Image from "next/image";
import { useTheme } from "next-themes";

export const UserLoginForm = () => {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  if (urlError !== "") toast.error(urlError);

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            toast.error(data.error);
          }
          if (data?.success) {
            form.reset();
            toast.success(data.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => {
          toast.error("Something went wrong! Please try again.");
        });
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
        <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to sign in to your account
        </p>
      </div>

      <div className={cn("grid gap-6")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {showTwoFactor && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="123456"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="name@example.com"
                          disabled={isPending}
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
                          type="password"
                          {...field}
                          placeholder="********"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                      <Button
                        variant="link"
                        size="sm"
                        asChild
                        className="px-0 text-sm font-normal text-muted-foreground"
                      >
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className={cn(buttonVariants(), "w-full")}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {showTwoFactor ? "Confirm" : "Sign In"}
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
          disabled={isPending || isGoogleLoading}
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
          href="/auth/sign-up"
          className="hover:text-brand underline underline-offset-4"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </p>
    </>
  );
};

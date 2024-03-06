"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { newPassword } from "@/actions/auth/new-password";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewPasswordSchema } from "@/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export const NewPasswordForm = () => {
  const { theme } = useTheme();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          form.reset();

          data?.error && toast.error(data?.error);

          if (data?.success) {
            toast.success(data?.success);

            // redirect to login page if success after 1s
            setTimeout(() => {
              redirect("/auth/sign-in");
            }, 1000);
          }
        })
        .catch((error) => {
          toast.error(error);
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
        <h1 className="text-2xl font-semibold tracking-tight">
          Reset Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter a new password for your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="spaec-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            Reset password
          </Button>
        </form>
      </Form>
    </>
  );
};

"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import Image from "next/image";
import { toast } from "sonner";
import { z } from "zod";

import { reset } from "@/actions/auth/reset";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResetSchema } from "@/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export const PasswordResetForm = () => {
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    startTransition(() => {
      reset(values)
        .then((data) => {
          data?.success && toast.success(data?.success);
          data?.error && toast.error(data?.error);

          form.reset();
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
          Enter your email to get a password reset link
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="username@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            Send password reset email
          </Button>
        </form>
      </Form>
    </>
  );
};

"use client";

import { updatePassword } from "@/actions/profile/profile";
import { updateUserPassword } from "@/actions/user/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserProfileInterface } from "@/interfaces/user-interfaces/user-interfaces";
import { UpdateUserPasswordSchema } from "@/schemas/user-profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const UpdateUserPasswordForm = ({ user }: { user: UserProfileInterface }) => {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof UpdateUserPasswordSchema>>({
    resolver: zodResolver(UpdateUserPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateUserPasswordSchema>) => {
    startTransition(() => {
      updateUserPassword(values, user.id!)
        .then((data) => {
          data?.error && toast.error(data.error);
          if (data.success) {
            toast.success(data.success);
            form.reset();
          }
        })
        .catch((error) => {
          console.error("An error occurred: ", error);
          toast.error("Something went wrong. Please try again later!");
        });
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full space-y-4 p-2">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="New Password"
                        disabled={isPending}
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
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex justify-end">
              <Button type="submit" disabled={isPending}>
                Update
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

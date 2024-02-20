"use client";

import { updateGeneralDetails } from "@/actions/profile/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn, getFirstLetters } from "@/lib/utils";
import { userProfileSchema } from "@/schemas/user-profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

export const GeneralProfileForm = () => {
  const user = useCurrentUser();
  const pathname = usePathname();
  const name = user?.name;
  const email = user?.email;
  const image = user?.image;
  const twoFactor = user?.isTwoFactorEnabled;
  const firstLetters = getFirstLetters(name!);
  const [isPending, startTransition] = React.useTransition();

  const generalForm = useForm<z.infer<typeof userProfileSchema>>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: name ?? "",
      email: email ?? "",
      image: image ?? "",
      twoFactorEnabled: twoFactor ?? false,
    },
  });

  const onSubmit = (values: z.infer<typeof userProfileSchema>) => {
    startTransition(() => {
      updateGeneralDetails(values)
        .then((data) => {
          data.error && toast.error(data.error);
          data.success && toast.success(data.success);
        })
        .catch(() => {
          toast.error("Something went wrong. Please try again later!");
        });
    });
  };
  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            <div>
              <h1 className="text-lg font-medium mb-4">General Details</h1>
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(onSubmit)}>
                  <div className="w-full space-y-4 p-2">
                    <div className="sm:flex justify-center sm:justify-start items-center sm:space-x-4 space-y-4">
                      <div className="m-2 flex justify-center sm:">
                        <Avatar className="h-36 w-36">
                          <AvatarImage src={image!} alt="" />
                          <AvatarFallback className="text-4xl tracking-widest">
                            {firstLetters}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="w-full">
                        <FormField
                          control={generalForm.control}
                          name="image"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-full"
                                  type="file"
                                  {...field}
                                  disabled={isPending}
                                  placeholder="John Doe"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <FormField
                        control={generalForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder="John Doe"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={generalForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={true}
                                placeholder="username@example.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={generalForm.control}
                        name="twoFactorEnabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-2">
                            <div className="space-y-0.5">
                              <FormLabel>
                                Enable Two Factor Authentication
                              </FormLabel>
                              <FormDescription>
                                Secure your account with two factor
                                authentication
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={isPending}
                              />
                            </FormControl>
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
            </div>
            <div></div>
          </div>
          <div>
            <h1 className="text-lg font-medium mb-4">Password Update</h1>
            Section 2
          </div>
        </div>
      </div>
    </>
  );
};

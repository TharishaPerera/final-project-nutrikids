"use client";

import { updateConsultantDetails } from "@/actions/profile/profile";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-current-user";
import { PediatricianDetailsInterface } from "@/interfaces/user-interfaces/user-interfaces";
import { ConsultantSchema } from "@/schemas/user-profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const ConsultantForm = ({
  pediatrician,
}: {
  pediatrician?: PediatricianDetailsInterface;
}) => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<PediatricianDetailsInterface>(pediatrician!);

  const form = useForm<z.infer<typeof ConsultantSchema>>({
    resolver: zodResolver(ConsultantSchema),
    defaultValues: {
      specializations: data?.specializations ?? "",
      description: data?.description ?? "",
      qualifications: data?.qualifications ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof ConsultantSchema>) => {
    startTransition(() => {
      updateConsultantDetails(values)
        .then((response) => {
          response.error && toast.error(response.error);
          response.success && toast.success(response.success);
        })
        .catch((error) => {
          console.error(error);
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
                name="specializations"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="List your specializations"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="qualifications"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder="List your qualifications"
                        className="resize-none"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex justify-end">
              <Button type="submit" disabled={isPending} className="mt-2">
                Update
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

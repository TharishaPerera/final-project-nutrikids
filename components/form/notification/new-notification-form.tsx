"use client";

import { CreateNewNotification } from "@/actions/notification/notification";
import { Loader } from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { NotificationFormSchema } from "@/schemas/notification-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const NewNotificationForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NotificationFormSchema>>({
    resolver: zodResolver(NotificationFormSchema),
    defaultValues: {
      targetUsers: "100", // default to all users
      type: "IN_APP",
    },
  });

  const onSubmit = (values: z.infer<typeof NotificationFormSchema>) => {
    console.log(values);
    startTransition(() => {
      CreateNewNotification(values).then((response) => {
        if (response.error) {
          toast.error(response.error);
        }
        if (response.success) {
          toast.success(response.success);
          form.reset();
          location.reload();
        }
      });
    });
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Notification title"
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
                    rows={5}
                    placeholder="Notification content"
                    className="resize-none"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="targetUsers"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Notify,</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="100" />
                        </FormControl>
                        <FormLabel className="font-normal">All users</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1000" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Only consultants
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Via,</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="IN_APP" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          In app notification
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="EMAIL" />
                        </FormControl>
                        <FormLabel className="font-normal">Email</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Create Notification
          </Button>
        </form>
      </Form>
    </div>
  );
};

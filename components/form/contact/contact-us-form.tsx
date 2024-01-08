"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { contactUsSchema } from "@/schemas/contact-us-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { sendContactEmail } from "@/actions/contact/contact-us";

interface ContactUsFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof contactUsSchema>;

export const ContactUsForm = ({ className, ...props }: ContactUsFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();


  const form = useForm<FormData>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: FormData) {
    startTransition(() => {
      sendContactEmail(values)
        .then((data) => {
          // FIXME: add return error object to the sendContactEmail method
          // if (data?.error) {
          //   form.reset();
          //   toast.error(data.error);
          // }
          if (data?.success) {
            form.reset();
            toast.success(data.success);
          }
        })
        .catch(() => {
          toast.error("Something went wrong! Please try again.")
        });
    });
  }

  return (
    <div>
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="John Doe"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="flex justify-start" />
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
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage className="flex justify-start" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Hey...."
                      disabled={isPending}
                      className="resize-none"
                      rows={7}
                    />
                  </FormControl>
                  <FormMessage className="flex justify-start" />
                </FormItem>
              )}
            />

            <Button type="submit" className={cn(buttonVariants(), "w-full")}>
              {isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send Message
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NewPostSchema } from "@/schemas/community-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, SendHorizonal, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createPost } from "@/actions/community/posts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// TODO: handle media on posts
export const NewPostForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof NewPostSchema>>({
    resolver: zodResolver(NewPostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPostSchema>) => {
    startTransition(() => {
      createPost(values)
        .then((data) => {
          data?.error && toast.error(data.error);
          if (data.success) {
            toast.success(data.success);
            form.reset();

            // reload page to update new post
            router.push(`/community/posts/${data.post}`)
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
          <div className="flex flex-col gap-2 border-b pb-2">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Question Title"
                        className="resize-none"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="What's on your mind?"
                        className="resize-none"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex justify-around md:justify-center space-x-4">
              <div
                className={cn(
                  buttonVariants({ variant: "secondary", size: "icon" }),
                  "rounded-lg cursor-pointer"
                )}
              >
                <ImagePlus className="w-5 h-5" />
              </div>
              <div
                className={cn(
                  buttonVariants({ variant: "secondary", size: "icon" }),
                  "rounded-lg cursor-pointer"
                )}
              >
                <Video className="w-5 h-5" />
              </div>
              <Button
                type="submit"
                size="icon"
                variant="secondary"
                className="rounded-lg"
                disabled={isPending}
              >
                <SendHorizonal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

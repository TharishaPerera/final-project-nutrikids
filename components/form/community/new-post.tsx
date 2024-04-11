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
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, SendHorizonal, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createPost, GetPostById, updatePost } from "@/actions/community/posts";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PostInterface } from "@/interfaces/post-interfaces/post-interface";
import { FormDialog } from "@/components/common/form-dialog";
import { SingleImageDropzone } from "@/components/common/image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";

interface NewPostFormProps {
  data?: PostInterface;
  type?: "create" | "update";
}

export const NewPostForm: React.FC<NewPostFormProps> = ({
  data,
  type = "create",
}) => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof NewPostSchema>>({
    resolver: zodResolver(NewPostSchema),
    defaultValues: {
      id: data ? data.id : "",
      title: data ? data.title : "",
      content: data ? data.content! : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof NewPostSchema>) => {
    // upload image to edgestore
    if (file) {
      setIsLoading(true);
      const res = await edgestore.myPublicImages.upload({
        file,
        input: { type: "post" },
      });
      values.media = res.url!;

      setIsLoading(false);
    }

    startTransition(() => {
      if (type === "update") {
        updatePost(values)
          .then((data) => {
            data?.error && toast.error(data.error);
            if (data.success) {
              toast.success(data.success);

              // reload page to update new post
              router.refresh();
            }
          })
          .catch((error) => {
            console.error("An error occurred: ", error);
            toast.error("Something went wrong. Please try again later!");
          });
      } else {
        createPost(values)
          .then((data) => {
            data?.error && toast.error(data.error);
            if (data.success) {
              toast.success(data.success);
              form.reset();

              // reload page to update new post
              router.push(`/community/posts/${data.post}`);
            }
          })
          .catch((error) => {
            console.error("An error occurred: ", error);
            toast.error("Something went wrong. Please try again later!");
          });
      }
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
                        disabled={isPending || isLoading}
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
                        // className="resize-none"
                        disabled={isPending || isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex justify-around md:justify-center space-x-4">
              <FormDialog
                title="Select an image to upload"
                description="We suggest to use 21:9 images"
                form={
                  <SingleImageDropzone
                    // width={400}
                    // height={200}
                    value={file}
                    dropzoneOptions={{
                      maxSize: 1 * 1024 * 1024, // 1MB
                    }}
                    onChange={(file) => {
                      setFile(file);
                    }}
                  />
                }
              >
                <Button variant="secondary" size="icon" disabled={isPending || isLoading}>
                  <ImagePlus className="w-5 h-5" />
                </Button>
              </FormDialog>
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
                disabled={isPending || isLoading}
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

"use client";

import { SubmitAnswer } from "@/actions/community/answers";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PostInterface } from "@/interfaces/post-interfaces/post-interface";
import { NewAnswerSchema } from "@/schemas/community-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface NewAnswerFormProps {
  onDataUpdate: (newData: PostInterface) => void;
}

export const NewAnswerForm: React.FC<NewAnswerFormProps> = ({ onDataUpdate }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof NewAnswerSchema>>({
    resolver: zodResolver(NewAnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const onSubmit = (value: z.infer<typeof NewAnswerSchema>) => {
    startTransition(() => {
      SubmitAnswer(value)
        .then((response) => {
          response?.error && toast.error(response.error);
          if (response.success) {
            toast.success(response.success);
            
            if (response?.post) {
              onDataUpdate(response.post);
            }
            
            form.reset();
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong. Please try again later!");
        });
    });
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-between gap-2"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Answer here"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="secondary"
            size="icon"
            className="rounded-lg"
            disabled={isPending}
          >
            <SendHorizonal className="w-5 h-5" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

"use client";

import { getMyChildren } from "@/actions/children/children";
import { AddNewRecord } from "@/actions/medical-history/medical-history";
import { Loader } from "@/components/common/loader";
import {
  FileState,
  MultiFileDropzone,
} from "@/components/common/multi-file-dropzone";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEdgeStore } from "@/lib/edgestore";
import { MedicalHistorySchema } from "@/schemas/medical-history-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Child } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const NewMedicalHistoryForm = () => {
  const [children, setChildren] = useState<Child[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [isPending, startTransition] = useTransition();
  const [uploadProgress, setUploadProgress] = useState(0);

  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof MedicalHistorySchema>>({
    resolver: zodResolver(MedicalHistorySchema),
  });

  useEffect(() => {
    startTransition(() => {
      getMyChildren()
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
          }
          if (response.children) {
            setChildren(response.children);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again!");
        });
    });
  }, []);

  const onSubmit = (values: z.infer<typeof MedicalHistorySchema>) => {
    values.files = urls;
    console.log("VALUES: ", values);
    startTransition(() => {
      AddNewRecord(values)
        .then((response) => {
          response.error && toast.error(response.error);
          response.success && toast.success(response.success);
        })
        .then(() => {
          form.reset();
          location.reload();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again later!");
        });
    });
  };

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  if (isPending) {
    return <Loader height="sm" />;
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <FormField
            control={form.control}
            name="child"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a child" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {!children ||
                      (children.length === 0 && (
                        <SelectItem value="notfound" disabled>
                          No children found in the system
                        </SelectItem>
                      ))}
                    {children.map((child) => (
                      <SelectItem key={child.id} value={child.id}>
                        {child.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    placeholder="Description on the medical record"
                    className="resize-none"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <MultiFileDropzone
              className="w-full"
              value={fileStates}
              onChange={(files) => {
                setFileStates(files);
              }}
              onFilesAdded={async (addedFiles) => {
                setFileStates([...fileStates, ...addedFiles]);
                await Promise.all(
                  addedFiles.map(async (addedFileState) => {
                    try {
                      const res = await edgestore.myProtectedFiles.upload({
                        file: addedFileState.file,
                        onProgressChange: async (progress) => {
                          setUploadProgress(progress);
                          updateFileProgress(addedFileState.key, progress);
                          if (progress === 100) {
                            // wait 1 second to set it to complete
                            // so that the user can see the progress bar at 100%
                            await new Promise((resolve) =>
                              setTimeout(resolve, 1000)
                            );
                            updateFileProgress(addedFileState.key, "COMPLETE");
                          }
                        },
                      });
                      setUrls([...urls, res.url]);
                    } catch (err) {
                      updateFileProgress(addedFileState.key, "ERROR");
                    }
                  })
                );
              }}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              isPending || (uploadProgress > 0 && uploadProgress != 100)
            }
          >
            Save Record
          </Button>
        </form>
      </Form>
    </>
  );
};

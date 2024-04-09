"use client";

import { createUser } from "@/actions/user/user";
import { getAllUserRoles } from "@/actions/user/user-role";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRoleTableInterface } from "@/interfaces/user-interfaces/user-role-interfaces";
import { UserCreateSchema } from "@/schemas/user-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const UserCreateForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [userRoles, setUserRoles] = useState<UserRoleTableInterface[]>([]);

  const form = useForm<z.infer<typeof UserCreateSchema>>({
    resolver: zodResolver(UserCreateSchema),
  });

  const onSubmit = (values: z.infer<typeof UserCreateSchema>) => {
    let userId: string;
    startTransition(() => {
      createUser(values)
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
          }
          if (response.success) {
            toast.success(response.success);
            userId = response.userId
            form.reset();
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again later!");
        })
        .finally(() => {
          router.push(`/users/update/${userId}`);
        });
    });
  };

  useEffect(() => {
    startTransition(() => {
      getAllUserRoles()
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
          }
          if (response.userRoles) {
            setUserRoles(response.userRoles);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again later!");
        });
    });
  }, []);

  if (isPending || !userRoles) {
    return <Loader />;
  }

  return (
    <>
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="John Doe"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userRoles.map((userRole) => (
                          <SelectItem key={userRole.id} value={userRole.role!}>
                            {userRole.role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

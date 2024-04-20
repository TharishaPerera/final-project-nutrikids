"use client";

import { createOnlineAppointment } from "@/actions/appointment/appointment";
import { getMyChildren } from "@/actions/children/children";
import { getTimeSlotsByDay } from "@/actions/pediatrician/pediatrician";
import { Loader } from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { Textarea } from "@/components/ui/textarea";
import { AppointmentSchema } from "@/schemas/appointment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Child } from "@prisma/client";
import { getDay } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface TimeSlotInterface {
  timeslot: string;
  startTimeUnix: number;
  endTimeUnix: number;
}

export const NewAppointmentForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  var parts = pathname.split("/");
  var pediatricianId = parts[parts.length - 1];

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeslots, setTimeslots] = useState<TimeSlotInterface[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
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

      getTimeSlots(date);
    });
  }, []);

  const getTimeSlots = (date: Date | undefined) => {
    if (!date) {
      // empty time slots
      setTimeslots([]);
      toast.info("Please select a date to get time slots!");
    } else {
      startTransition(() => {
        getTimeSlotsByDay(date, pediatricianId)
          .then((response) => {
            if (response.error) {
              toast.error(response.error);
            }
            if (response.timeslots) {
              setTimeslots(response.timeslots);
            }
          })
          .catch((error) => {
            console.error(error);
            toast.error("Something went wrong. Please try again!");
          });
      });
    }
  };

  const onSubmit = (values: z.infer<typeof AppointmentSchema>) => {
    startTransition(() => {
      values.date = date;
      if (!values.date || values.date == undefined) {
        values.date = new Date();
        setDate(values.date);
      }
      createOnlineAppointment(values, pediatricianId)
      .then((response) => {
        if (response.error) {
          console.error(response.error)
          toast.error(response.error);
        }
        if (response.success) {
          toast.success(response.success);
          form.reset();
          router.push('/appointments')
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong. Please try again later!");
      })
    });
  };

  if (isPending) {
    return <Loader height="sm" />;
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row items-center justify-center space-x-4 space-y-4 md:space-y-0"
        >
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date);
                getTimeSlots(date);
              }}
              disabled={(date) =>
                date < new Date(new Date().setDate(new Date().getDate() - 1))
              }
              className="rounded-md border w-full"
            />
          </div>
          <div className="w-full h-full flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="child"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {!timeslots ||
                          (timeslots.length === 0 && (
                            <SelectItem value="notfound" disabled>
                              No time slots available
                            </SelectItem>
                          ))}
                        {timeslots.map((timeslot) => (
                          <SelectItem
                            key={timeslot.startTimeUnix}
                            value={`${timeslot.startTimeUnix.toString()}-${timeslot.endTimeUnix.toString()}`}
                          >
                            {timeslot.timeslot}
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
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                      rows={6}
                        placeholder="Additional notes"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isPending || timeslots.length === 0}
            >
              Book Appointment
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

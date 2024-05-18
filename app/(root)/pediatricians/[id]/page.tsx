"use client";

import { Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollPane } from "@/components/common/scroll-pane";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { getPediatricianDetailsById } from "@/actions/pediatrician/pediatrician";
import { toast } from "sonner";
import { OnePediatricianDetailsInterface } from "@/interfaces/user-interfaces/user-interfaces";
import { Loader } from "@/components/common/loader";
import { FormDialog } from "@/components/common/form-dialog";
import { NewAppointmentForm } from "@/components/form/pediatrician/new-appointment-form";
import Chat from "@/components/chat/chat";

const PediatricianPage = () => {
  const timeslotDuration = process.env.TIMESLOT_DURATION;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<OnePediatricianDetailsInterface>();
  var parts = pathname.split("/");
  var pediatricianId = parts[parts.length - 1];

  useEffect(() => {
    startTransition(() => {
      // get pediatrician by id
      getPediatricianDetailsById(pediatricianId)
        .then((response) => {
          if (response?.error) {
            toast.error(response.error);
            router.push("/community");
          }
          if (response?.pediatrician) {
            setData(response.pediatrician);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again later!");
        });
    });
  }, []);

  const qualifications =
    data?.qualifications && data?.qualifications.split("\n");

  if (isPending || !data) {
    return <Loader />;
  }

  return (
    <ScrollPane>
      <div className="flex flex-col lg:flex-row lg:space-x-4 space-x-0 lg:space-y-0 space-y-4">
        <div className="lg:w-1/4 w-full order-1 space-y-4">
          <div>
            <img
              src={data?.user.image!}
              className="w-full rounded-md"
              alt="Picture of the author"
            />
          </div>
          <div className="mb-8">
            <p className="text-xl font-semibold">{data?.user.name}</p>
            <p className="mt-2 text-md text-gray-700 dark:text-gray-300">
              {data?.specializations}
            </p>
          </div>
          <div className="w-full space-y-3">
            <FormDialog
              title="Start New Chat"
              description={`Start a new chat with ${data?.user.name}`}
              form={<Chat pediatrician={data} />}
              className="max-w-2xl"
            >
              <Button className="w-full">Chat</Button>
            </FormDialog>

            <FormDialog
              title="Book Online Appointment"
              description={`Please note: an online appointment duration is ${
                timeslotDuration ?? 20
              } minutes`}
              form={<NewAppointmentForm />}
              className="max-w-2xl"
            >
              <Button className="w-full">Book Appointment</Button>
            </FormDialog>
          </div>
        </div>
        <div className="lg:w-3/4 w-full order-2 space-y-4">
          <div>
            <p className="text-xl font-semibold">Description</p>
            <p className="mt-4">
              {data?.description!.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index !== data.description!.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          </div>
          {qualifications && (
            <div className="">
              <p className="text-xl font-semibold">Qualifications</p>
              <ul className="mt-4 space-y-1">
                {qualifications.map((qualification, index) => (
                  <li key={index}>
                    <p className="text-md text-gray-700 dark:text-gray-300 flex items-center">
                      <Minus className="w-4 h-4 mr-3" /> {qualification}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <p className="text-xl font-semibold">Availability</p>
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hospital</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Days</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.availability &&
                    data.availability.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="capitalize">
                          {item.hospital}
                        </TableCell>
                        <TableCell className="capitalize">
                          {item.location}
                        </TableCell>
                        <TableCell>{item.startTime}</TableCell>
                        <TableCell>{item.endTime}</TableCell>
                        <TableCell className="capitalize">
                          {item.dateOfWeek}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </ScrollPane>
  );
};

export default PediatricianPage;

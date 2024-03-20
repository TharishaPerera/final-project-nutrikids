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

// TODO: add dynamic data using server actions
const PediatricianPage = () => {
  return (
    <ScrollPane>
      <div className="flex flex-col lg:flex-row lg:space-x-4 space-x-0 lg:space-y-0 space-y-4">
        <div className="lg:w-1/4 w-full order-1 space-y-4">
          <div>
            <img
              src="https://xsgames.co/randomusers/assets/avatars/male/73.jpg"
              className="w-full rounded-md"
              alt="Picture of the author"
            />
          </div>
          <div className="mb-8">
            <p className="text-xl font-semibold">Pediatrician Name</p>
            <p className="mt-2 text-md text-gray-700 dark:text-gray-300">
              Specialization
            </p>
          </div>
          <div className="w-full space-y-3">
            <Button className="w-full">Chat</Button>
            <Button className="w-full">Book Appointment</Button>
          </div>
        </div>
        <div className="lg:w-3/4 w-full order-2 space-y-4">
          <div>
            <p className="text-xl font-semibold">Description</p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque
              deleniti impedit perferendis dignissimos nemo reiciendis, quam eum
              veritatis voluptates beatae ab dolor officia deserunt atque, optio
              corporis dolorum ea iure rem sunt. Recusandae fugiat rem fugit
              asperiores hic delectus similique, voluptatibus consectetur
              perferendis, illum, amet veniam omnis laborum perspiciatis
              explicabo.
            </p>
          </div>
          <div className="">
            <p className="text-xl font-semibold">Qualifications</p>
            <ul className="mt-4 space-y-1">
              <li>
                <p className="text-md text-gray-700 dark:text-gray-300 flex items-center">
                  <Minus className="w-4 h-4 mr-3" /> Qualification 1
                </p>
              </li>
              <li>
                <p className="text-md text-gray-700 dark:text-gray-300 flex items-center">
                  <Minus className="w-4 h-4 mr-3" /> Qualification 2
                </p>
              </li>
              <li>
                <p className="text-md text-gray-700 dark:text-gray-300 flex items-center">
                  <Minus className="w-4 h-4 mr-3" /> Qualification 3
                </p>
              </li>
              <li>
                <p className="text-md text-gray-700 dark:text-gray-300 flex items-center">
                  <Minus className="w-4 h-4 mr-3" /> Qualification 4
                </p>
              </li>
              <li>
                <p className="text-md text-gray-700 dark:text-gray-300 flex items-center">
                  <Minus className="w-4 h-4 mr-3" /> Qualification 5
                </p>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xl font-semibold">Schedules</p>
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hospital</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Hostpital 1</TableCell>
                    <TableCell>Colombo</TableCell>
                    <TableCell>06:00 PM</TableCell>
                    <TableCell>11:00 PM</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Hostpital 1</TableCell>
                    <TableCell>Colombo</TableCell>
                    <TableCell>06:00 PM</TableCell>
                    <TableCell>11:00 PM</TableCell>
                  </TableRow>
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

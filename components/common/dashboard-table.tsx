import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const DashboardTable = () => {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="bg-secondary p-4 text-lg font-semibold border-b">
        Upcoming Activities
      </CardHeader>
      <CardContent className="p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Appointment For</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time Slot</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="py-2">
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className="py-2">2023-06-23</TableCell>
              <TableCell className="py-2">15:00 - 16:00</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="py-2">
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className="py-2">2023-06-23</TableCell>
              <TableCell className="py-2">15:00 - 16:00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2">
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className="py-2">2023-06-23</TableCell>
              <TableCell className="py-2">15:00 - 16:00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2">
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className="py-2">2023-06-23</TableCell>
              <TableCell className="py-2">15:00 - 16:00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2">
                <div className="font-medium">Liam Johnson</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  liam@example.com
                </div>
              </TableCell>
              <TableCell className="py-2">2023-06-23</TableCell>
              <TableCell className="py-2">15:00 - 16:00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

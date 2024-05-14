"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { MedicalHistoryForParentsInterface } from "@/interfaces/medial-history-interfaces/medical-history-interfaces";
import { getDownloadUrl } from "@edgestore/react/utils";
import { Download } from "lucide-react";

export const columns: ColumnDef<MedicalHistoryForParentsInterface>[] = [
  {
    accessorKey: "name",
    size: 500,
    minSize:1000,
    header: "Child Name",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.child.name}</span>;
    },
  },
  {
    accessorKey: "additionalNotes",
    header: "Description",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.additionalNotes}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const files = row.original.documents;
      let filesArray = [];
      if (files) {
        filesArray = JSON.parse(files);
      }
      const handleDownload = () => {
        filesArray.map((file: string) => {
          window.open(file, "_blank");
        });
      };

      if (filesArray.length === 0) {
        return (
          <p className="text-muted-foreground text-xs">No documents found</p>
        );
      }

      return (
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleDownload}
            size="sm"
            variant="default"
            className="rounded-md"
          >
            <Download className="w-5 h-5 mr-2"/> Documents
          </Button>
        </div>
      );
    },
  },
];

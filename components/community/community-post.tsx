import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import React from "react";
import Link from "next/link";
import { dateFormat } from "@/lib/utils";

interface CommunityPostProps {
  id: string;
  name: string | null;
  dateTime: Date;
  role: string;
  title: string;
  content: string;
  helpful: number;
  notHelpful: number;
  noComments: number;
}

export const CommunityPost: React.FC<CommunityPostProps> = ({
  id,
  name,
  dateTime,
  role,
  title,
  content,
  helpful,
  notHelpful,
  noComments,
}) => {
  return (
    <Link href={`/community/posts/${id}`}>
      <div className="border rounded-lg p-4 space-y-4 bg-secondary/30">
        <div className="flex justify-between">
          <div>
            <h1 className="text-sm font-medium capitalize">{name}</h1>
            <p className="text-xs">{dateFormat(dateTime)}</p>
          </div>
          <Badge
            variant="outline"
            className="rounded-xl px-4 py-1 text-xs uppercase bg-secondary"
          >
            {role}
          </Badge>
        </div>
        <Separator />
        <div>
          <h1 className="text-md md:text-lg font-medium">{title}</h1>
          <div className="text-sm md:text-md font-normal line-clamp-4">{content}</div>
        </div>
        <Separator />
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <div className="flex items-center">
              <ArrowBigUp className="w-6 h-6" />
              <p className="text-sm font-medium">{helpful}</p>
            </div>
            <div className="flex items-center">
              <ArrowBigDown className="w-6 h-6" />
              <p className="text-sm font-medium">{notHelpful}</p>
            </div>
          </div>
          <div className="text-sm flex space-x-2">
            <p>Answers</p>
            <p>{noComments}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

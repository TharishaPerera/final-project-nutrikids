import { CommentStatus } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { dateFormat } from "@/lib/utils";
import { BadgeCheck } from "lucide-react";

interface UserRole {
  role?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  password?: string;
  telephone?: string;
  role?: number;
  isTwoFactorEnabled?: boolean;
  subscriptionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userRole: UserRole;
}

interface Comment {
  id: string;
  userId: string;
  postId: string;
  parent?: number;
  status?: CommentStatus;
  content?: string;
  validity?: boolean;
  createdAt?: Date;
  user: User;
}

interface AnswerProps {
  answer: Comment;
  user: User;
}

export const Answer: React.FC<AnswerProps> = ({ answer, user }) => {
  return (
    <>
      <div className="border rounded-lg p-2">
        <div className="space-y-2">
          <div className="text-md">{answer.content}</div>
          <Separator />
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-sm font-medium capitalize">{user.name}</h1>
                <Badge
                  variant="outline"
                  className="rounded-xl px-4 py-1 text-[11px] uppercase"
                >
                  {user.userRole.role}
                </Badge>
              </div>
              <p className="text-xs">{dateFormat(answer.createdAt)}</p>
            </div>
            <div>{answer.validity && <BadgeCheck />}</div>
          </div>
        </div>
      </div>
    </>
  );
};

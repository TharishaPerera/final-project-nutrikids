import { CommentStatus } from "@prisma/client";

export interface User {
  name: string | null;
  userRole: {
    role: string;
  };
}

export interface Comment {
  id: number;
  userId: string;
  postId: string;
  parent: number | null;
  status: CommentStatus;
  content: string;
  validity: boolean;
  createdAt: Date;
  user: User;
}

export interface PostInterface {
  id: string;
  userId: string;
  title: string;
  media: string | null;
  content: string | null;
  isHelpfull: number;
  notHelpfull: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  comment: Comment[];
  _count: {
    comment: number;
  };
}

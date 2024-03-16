import { PostStatus } from "@prisma/client";

export interface AllPostsInterface {
  id: string;
  userId: string;
  title: string;
  media: string | null;
  content: string | null;
  isHelpfull: number;
  notHelpfull: number;
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: null | string;
    userRole: {
      role: string;
    };
  };
  _count: {
    comment: number;
  };
}

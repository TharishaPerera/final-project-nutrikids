"use client";

import { GetPostById } from "@/actions/community/posts";
import { InfoAlert, WarningAlert } from "@/components/common/alerts";
import { Loader } from "@/components/common/loader";
import { ToolTip } from "@/components/common/tool-tip";
import { Answer } from "@/components/community/answer";
import { NewAnswerForm } from "@/components/form/community/new-answer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { dateFormat } from "@/lib/utils";
import { CommentStatus, PostStatus } from "@prisma/client";
import { ArrowBigDown, ArrowBigUp, Bookmark } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { boolean, number, string } from "zod";

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

interface Count {
  comment: number;
}

interface Post {
  id: string;
  userId: string;
  title: string;
  media?: string;
  content?: string;
  isHelpfull?: number;
  notHelpfull?: number;
  status?: PostStatus;
  createdAt?: Date;
  updatedAt?: Date;
  user: User;
  comment?: Comment[];
  _count: Count;
}

const PostPage = () => {
  const router = useRouter()
  const [data, setData] = useState<Post | undefined | null>();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  var parts = pathname.split("/");
  var postId = parts[parts.length - 1];

  useEffect(() => {
    startTransition(() => {
      GetPostById(postId)
        .then((response) => {
          if (response?.error) {
            toast.error(response.error);
            router.push('/community')
          }
          setData(response.post);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again later!");
        });
    });
  }, []);

  if (isPending || !data) {
    return <Loader />;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-sm font-medium capitalize">{data.user.name}</h1>
          <p className="text-xs">{dateFormat(data.createdAt)}</p>
          {/* data.createdAt?.toDateString()} at {data.createdAt?.toLocaleTimeString() */}
        </div>
        <Badge
          variant="outline"
          className="rounded-xl px-4 py-1 text-xs uppercase"
        >
          {data.user.userRole.role}
        </Badge>
      </div>
      <Separator />
      <div className="flex justify-between items-center space-x-2">
        <h1 className="text-lg md:text-2xl">{data.title}</h1>
        <ToolTip message="Save Post" variant="secondary" size="icon">
          <Bookmark className="w-5 h-5 md:w-6 md:h-6 fill-black" />
        </ToolTip>
      </div>
      <div>
        <div className="text-md">{data.content}</div>
        {/* <div className="w-full">
          <AspectRatio ratio={21 / 9}>
            <Image
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
              alt="Image"
              fill={true}
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div> */}
      </div>
      <div className="border rounded-lg p-2 flex justify-between items-center">
        <div className="flex space-x-2">
          <ToolTip message="Mark Helpful" variant="secondary" size="sm">
            <ArrowBigUp className="w-6 h-6 mr-1" />
            {data.isHelpfull}
          </ToolTip>
          <ToolTip message="Mark Not Helpful" variant="secondary" size="sm">
            <ArrowBigDown className="w-6 h-6 mr-1" />
            {data.notHelpfull}
          </ToolTip>
        </div>
        <div>{data._count.comment} Answers</div>
      </div>
      <div className="border rounded-lg p-2 flex justify-between items-center">
        <NewAnswerForm />
      </div>
      <div>
        <h1 className="text-base md:text-lg font-medium">Answers</h1>
        {data.comment?.length! <= 0 && (
          <InfoAlert message="No answers available at the moment." />
        )}
        <div className="space-y-2">
          {data.comment?.map((answer, index) => (
            <Answer key={index} answer={answer} user={answer.user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;

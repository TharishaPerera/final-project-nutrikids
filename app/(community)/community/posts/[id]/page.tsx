"use client";

import {
  GetPostById,
  IsCurrentPostSaved,
  SaveUnsavePost,
} from "@/actions/community/posts";
import { InfoAlert, WarningAlert } from "@/components/common/alerts";
import { Loader } from "@/components/common/loader";
import { ToolTip } from "@/components/common/tool-tip";
import { Answer } from "@/components/community/answer";
import { NewAnswerForm } from "@/components/form/community/new-answer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PostInterface } from "@/interfaces/post-interfaces/post-interface";
import { cn, dateFormat } from "@/lib/utils";
import { ArrowBigDown, ArrowBigUp, Bookmark } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const PostPage = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [data, setData] = useState<PostInterface>();
  const [isPending, startTransition] = useTransition();
  const [isSaved, setIsSaved] = useState<boolean | undefined>(false);
  const pathname = usePathname();
  var parts = pathname.split("/");
  var postId = parts[parts.length - 1];

  const fillColor = theme == "light" ? "fill-black" : "fill-white";

  useEffect(() => {
    startTransition(() => {
      // get post by id
      GetPostById(postId)
        .then((response) => {
          if (response?.error) {
            toast.error(response.error);
            router.push("/community");
          }
          if (response?.post) {
            setData(response.post);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again later!");
        });

      // check current post is saved or not
      checkPostSaved();
    });
  }, []);

  const checkPostSaved = () => {
    IsCurrentPostSaved(postId)
      .then((response) => {
        setIsSaved(response.saved);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong. Please try again later!");
      });
  };

  const savePost = () => {
      SaveUnsavePost(postId)
        .then((response) => {
          response?.error && toast.error(response.error);
          response?.success && toast.success(response.success);

          setIsSaved(response.success ? !isSaved : isSaved);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong. Please try again later!");
        });
  };

  const handleDataUpdate = (data: PostInterface) => {
    setData(data);
  };

  const markHelpful = () => {
    startTransition(() => {
      // TODO:
    });
  };

  const markNotHelpful = () => {
    startTransition(() => {
      // TODO:
    });
  };

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
        <div onClick={savePost}>
          <ToolTip
            message={isSaved ? "Lose Post" : "Save Post"}
            variant="secondary"
            size="icon"
          >
            <Bookmark
              className={cn(isSaved ? fillColor : "", "w-5 h-5 md:w-6 md:h-6")}
            />
          </ToolTip>
        </div>
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
            <div onClick={markHelpful} className="flex items-center space-x-2">
              <ArrowBigUp className="w-6 h-6 mr-1" />
              {data.isHelpfull}
            </div>
          </ToolTip>
          <ToolTip message="Mark Not Helpful" variant="secondary" size="sm">
            <div
              onClick={markNotHelpful}
              className="flex items-center space-x-2"
            >
              <ArrowBigDown className="w-6 h-6 mr-1" />
              {data.notHelpfull}
            </div>
          </ToolTip>
        </div>
        <div>{data._count.comment} Answers</div>
      </div>
      <div className="border rounded-lg p-2 flex justify-between items-center">
        <NewAnswerForm onDataUpdate={handleDataUpdate} />
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

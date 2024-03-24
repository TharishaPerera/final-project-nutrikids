"use client";

import { GetPostById } from "@/actions/community/posts";
import { Loader } from "@/components/common/loader";
import { CommunityHeading } from "@/components/community/community-heading";
import { NewPostForm } from "@/components/form/community/new-post";
import { PostInterface } from "@/interfaces/post-interfaces/post-interface";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const EditPostPage = () => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<PostInterface>();
  const pathname = usePathname();
  var parts = pathname.split("/");
  var postId = parts[parts.length - 1];

  useEffect(() => {
    startTransition(() => {
      // get post by id
      GetPostById(postId)
        .then((response) => {
          if (response?.error) {
            toast.error(response.error);
          }
          if (response?.post) {
            setData(response.post);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again later!");
        });
    });
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <div className="w-full space-y-4 p-2">
      <CommunityHeading heading="Edit Post" />
      <div className="">
        <NewPostForm data={data} type="update" />
      </div>
    </div>
  );
};

export default EditPostPage;

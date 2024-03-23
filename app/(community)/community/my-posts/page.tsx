"use client";

import { getMyPosts } from "@/actions/community/my-posts";
import { InfoAlert } from "@/components/common/alerts";
import { Loader } from "@/components/common/loader";
import { PostItem } from "@/components/community/post-item";
import { MyPostsInterface } from "@/interfaces/post-interfaces/saved-post-interfaces";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const MyPostsPage = () => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<MyPostsInterface[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    startTransition(() => {
      getMyPosts()
        .then(
          (response: { error?: string; myPosts?: MyPostsInterface[] }) => {
            if (response.error) {
              toast.error(response.error);
            }
            if (response.myPosts) {
              const { myPosts } = response;
              setData(myPosts);
            }
          }
        )
        .catch((error: string) => {
          console.error(error);
          toast.error("Something went wrong. Please try again!");
        });
    });
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div>
      {data.length < 1 && (
        <div className="w-full flex justify-center">
          <InfoAlert message="No posts available at the moment." />
        </div>
      )}
      {data.length > 0 && (
        <div className="space-y-5">
          {data.map((post, index) => (
            <div key={index}>
              <PostItem
                postId={post.id}
                title={post.title}
                content={post.content!}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostsPage;

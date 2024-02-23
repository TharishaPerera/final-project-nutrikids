"use client";

import { getAllPosts } from "@/actions/community/posts";
import { Post } from "@prisma/client";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader } from "@/components/common/loader";
import { InfoAlert } from "@/components/common/alerts";
import { CommunityPost } from "@/components/community/community-post";

export const CommunityFeed = () => {
  const [data, setData] = useState<Post[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    startTransition(() => {
      getAllPosts()
        .then((data) => {
          data.error && toast.error(data.error);
          if (data.data) {
            setData(data.data);
          }
        })
        .catch((error) => {
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
              <CommunityPost
                id={post.id}
                name={post.user.name}
                dateTime={post.createdAt}
                role={post.user.userRole.role}
                title={post.title}
                content={post.content?.toString()!}
                helpful={post.isHelpfull}
                notHelpful={post.notHelpfull}
                noComments={post._count.comment}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

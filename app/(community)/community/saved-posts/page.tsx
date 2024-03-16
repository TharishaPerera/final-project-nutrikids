"use client";

import { getSavedPosts } from "@/actions/community/saved-posts";
import { InfoAlert } from "@/components/common/alerts";
import { Loader } from "@/components/common/loader";
import { SavedPost } from "@/components/community/saved-post";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export interface SavedPostInterface {
  id: number;
  userId: string;
  postId: string;
  post: {
    id: string;
    userId: string;
    title: string;
    media: string | null;
    content: string | null;
    isHelpfull: number | null;
    notHelpfull: number | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

const SavedPostsPage = () => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<SavedPostInterface[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    startTransition(() => {
      getSavedPosts()
        .then((response: { error?: string; savedPosts?: SavedPostInterface[]; }) => {
          if (response.error) {
            toast.error(response.error);
          } 
          if (response.savedPosts) {
            const { savedPosts } = response;
            setData(savedPosts);
          }
        })
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
              <SavedPost
                postId={post.post.id}
                title={post.post.title}
                content={post.post.content!}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPostsPage;

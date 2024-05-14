"use client"

import { GetPostsByStatus } from '@/actions/community/posts';
import { DataTable } from '@/components/common/data-table';
import { Loader } from '@/components/common/loader';
import { Post, PostStatus } from '@prisma/client';
import React, { useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner';
import { columns } from './columns';

const ApprovedPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      GetPostsByStatus([PostStatus.APPROVED])
        .then((response) => {
          if (response.error) {
            toast.error(response.error);
          }
          if (response.posts) {
            setPosts(response.posts);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Something went wrong. Please try again later!");
        });
    });
  }, []);

  if (isPending || !posts) {
    return <Loader />;
  }
  return (
    <div className="px-2 w-full">
      <DataTable data={posts} columns={columns} searchEnabled={false} columnFilterEnable={false} />
    </div>
  );
}

export default ApprovedPosts
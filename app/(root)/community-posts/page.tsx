import { PageTitle } from "@/components/common/page-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import PendingPosts from "./_components/pending";
import ApprovedPosts from "./_components/approved";
import RejectedPosts from "./_components/rejected";

const CommunityPostsPage = () => {
  return (
    <div className="px-2">
      <div className="mb-6">
        <PageTitle title="Community Posts" />
      </div>
      <div>
        <Tabs defaultValue="approved" >
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <TabsContent value="pending"><PendingPosts /></TabsContent>
          <TabsContent value="approved"><ApprovedPosts /></TabsContent>
          <TabsContent value="rejected"><RejectedPosts /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityPostsPage;

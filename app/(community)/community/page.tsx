import { CommunityFeed } from "@/components/community/community-feed-section";
import { CommunityHeading } from "@/components/community/community-heading";
import { NewPostForm } from "@/components/form/community/new-post";
import { ApplicationName } from "@/config/navlinks.config";

const CommunityPage = () => {
  return (
    <div className="w-full space-y-4 p-2">
      <CommunityHeading heading={`${ApplicationName} Community`} />
      <div className="">
        <NewPostForm />
      </div>
      <div>
        <CommunityFeed />
      </div>
    </div>
  );
};

export default CommunityPage;

import { CommunityFeed } from "@/components/community/community-feed-section";
import { NewPostForm } from "@/components/form/community/new-post";
import { ApplicationName } from "@/config/navlinks.config";

const CommunityPage = () => {
  return (
    <div className="w-full space-y-4 p-2">
      <h1 className="text-xl font-medium">{ApplicationName} Community</h1>
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

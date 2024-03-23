import Link from "next/link";

interface PostItemProps {
  postId: string;
  title: string;
  content: string;
}

export const PostItem: React.FC<PostItemProps> = ({
  postId,
  title,
  content,
}) => {
  return (
    <>
      <Link href={`/community/posts/${postId}`}>
        <div className="border rounded-lg p-4 bg-secondary space-y-2">
          <h2 className="truncate font-medium text-md sm:text-lg">{title}</h2>
          <div className="line-clamp-2 text-xs sm:text-sm">{content}</div>
        </div>
      </Link>
    </>
  );
};

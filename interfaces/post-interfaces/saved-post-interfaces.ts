
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
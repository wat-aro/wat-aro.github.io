type PostData = {
  title: string;
  published: string;
  tags?: string[];
};

export type Post = {
  data: PostData;
  content: string;
  slug: string;
};

export type PostWithoutContent = Omit<Post, 'content'>;
export type Post = {
  title: string;
  published: string;
  tags: string[];
  content: string;
  slug: string;
};

export type PostWithoutContent = Omit<Post, 'content'>;

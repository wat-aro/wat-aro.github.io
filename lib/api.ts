import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export type PostData = {
  title: string;
  published: string;
  tags: string[];
};

export type Post = {
  data: PostData;
  content: string;
  slug: string;
};

export const getPostByPath = (path: string): Post => {
  const fileContents = fs.readFileSync(path, 'utf-8');
  const { data, content } = matter(fileContents);
  const slug = path.split('/').splice(-1)[0].replace(/\.md$/, '');
  return { data, content, slug } as {
    data: PostData;
    content: string;
    slug: string;
  };
};

export const getPostBySlug = (
  path: string
): { data: PostData; content: string } => {
  const fullPath = join(process.cwd(), path);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(fileContents);
  return { data, content } as { data: PostData; content: string };
};

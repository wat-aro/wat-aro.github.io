import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const contentDirectory = join(process.cwd(), 'contents', 'posts');

export type PostData = {
  title: string;
  published: string;
  tags: string[];
};

export const getPostByPath = (
  path: string
): { data: PostData; content: string } => {
  const fileContents = fs.readFileSync(path, 'utf-8');
  const { data, content } = matter(fileContents);
  return { data, content } as { data: PostData; content: string };
};

export const getPostBySlug = (
  slug: string
): { data: PostData; content: string } => {
  const fullPath = join(contentDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(fileContents);
  return { data, content } as { data: PostData; content: string };
};

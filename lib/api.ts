import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

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
  path: string
): { data: PostData; content: string } => {
  const fullPath = join(process.cwd(), path);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(fileContents);
  return { data, content } as { data: PostData; content: string };
};

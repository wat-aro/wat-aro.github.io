import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const contentDirectory = join(process.cwd(), 'contents');

type Data = {
  title: string;
  published: string;
  tags: string[];
};

export const getPostBySlug = (
  slug: string
): { data: Data; content: string } => {
  const fullPath = join(contentDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const { data, content } = matter(fileContents);
  return { data, content } as { data: Data; content: string };
};

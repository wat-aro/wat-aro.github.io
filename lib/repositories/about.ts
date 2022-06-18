import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { Post } from '../post';

const find = async (): Promise<Post> => {
  const fileContents = fs.readFileSync(
    join(process.cwd(), 'contents', 'about.md'),
    'utf-8'
  );
  const { data, content } = matter(fileContents);
  return { data, content, slug: 'about' } as Post;
};

const AboutRepository = { find };

export default AboutRepository;

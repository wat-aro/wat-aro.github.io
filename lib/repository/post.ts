import fs from 'fs';
import { join } from 'path';
import { getFiles } from '../getFiles';
import matter from 'gray-matter';
import { Post } from '../post';

const postDir = join(process.cwd(), 'contents', 'posts');

const list = async (): Promise<Post[]> => {
  const files = await getFiles(postDir);
  return Promise.all(files.map((file) => findByPath(file)));
};

const findByPath = async (path: string): Promise<Post> => {
  const fileContents = fs.readFileSync(path, 'utf-8');
  const { data, content } = matter(fileContents);
  const slug = path.split('/').splice(-1)[0].replace(/\.md$/, '');
  return { data, content, slug } as Post;
};

const findBySlug = async (slug: string): Promise<Post> => {
  return findByPath(join(postDir, `${slug}.md`));
};

const PostRepository = { list, findByPath, findBySlug };

export default PostRepository;

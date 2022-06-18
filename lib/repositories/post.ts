import fs from 'fs';
import { join } from 'path';
import { getFiles } from '../getFiles';
import matter from 'gray-matter';
import { Post, PostWithoutContent } from '../post';

const postDir = join(process.cwd(), 'contents', 'posts');

const list = async (): Promise<PostWithoutContent[]> => {
  const files = await getFiles(postDir);
  return Promise.all(
    files.map(async (file) => {
      const { data, slug } = await findByPath(file);
      return { data, slug };
    })
  );
};

const listByTag = async (tag: string): Promise<PostWithoutContent[]> => {
  const posts = await list();
  return posts.filter((post) => post.data.tags?.includes(tag));
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

const PostRepository = { list, listByTag, findByPath, findBySlug };

export default PostRepository;

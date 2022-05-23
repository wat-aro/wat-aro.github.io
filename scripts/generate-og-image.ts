import { existsSync, mkdir, rm } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { getPostByPath } from '../lib/api';
import { getFiles } from '../lib/getFiles';
import { takeScreenshot } from '../lib/ogimage/takeScreenShot';

const cwd = process.cwd();
const ogImagePath = `${cwd}/public/og-images`;

const setup = async () => {
  if (existsSync(ogImagePath)) {
    await promisify(rm)(ogImagePath, { recursive: true });
  }
  await promisify(mkdir)(ogImagePath);
};

const generateOgImages = async () => {
  await setup();

  const contentsDir = join(process.cwd(), 'contents');
  const postsDir = join(contentsDir, 'posts');
  const files = await getFiles(postsDir);
  const posts = files.map((file) => ({
    ...getPostByPath(file),
    slug: file.split('/').splice(-1)[0].replace(/\.md$/, ''),
  }));

  posts.forEach(async (post) => {
    await takeScreenshot({ title: post.data.title, slug: post.slug });
  });
};

generateOgImages();

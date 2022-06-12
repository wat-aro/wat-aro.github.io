import { existsSync, mkdir, rm } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { getPostByPath } from '../lib/api';
import { getFiles } from '../lib/getFiles';
import { takeScreenshot } from '../lib/ogimage/takeScreenShot';

const generateOgImages = async () => {
  const start = process.argv[2];
  const end = process.argv[3];

  const contentsDir = join(process.cwd(), 'contents');
  const postsDir = join(contentsDir, 'posts');
  const files = await getFiles(postsDir);
  const posts = files.slice(Number(start), Number(end)).map((file) => ({
    ...getPostByPath(file),
    slug: file.split('/').splice(-1)[0].replace(/\.md$/, ''),
  }));

  Promise.all(
    posts.map((post) => {
      takeScreenshot({ title: post.data.title, slug: post.slug });
    })
  );
};

generateOgImages();

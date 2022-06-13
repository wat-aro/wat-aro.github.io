import fs from 'fs';
import { join } from 'path';
import { getPostByPath } from '../lib/api';
import { getFiles } from '../lib/getFiles';
import { takeScreenshot } from '../lib/ogimage/takeScreenShot';

const generateOgImages = async () => {
  const contentsDir = join(process.cwd(), 'contents');
  const postsDir = join(contentsDir, 'posts');
  const files = await getFiles(postsDir);
  const posts = files.map((file) => ({
    ...getPostByPath(file),
    slug: file.split('/').splice(-1)[0].replace(/\.md$/, ''),
  }));

  Promise.all(
    posts
      .filter((post) => !fs.existsSync(`public/og-images/${post.slug}.png`))
      .map((post) => {
        takeScreenshot({ title: post.data.title, slug: post.slug });
      })
  );
};

generateOgImages();

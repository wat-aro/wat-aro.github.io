import fs from 'fs';
import { takeScreenshot } from '../lib/ogimage/takeScreenShot';
import PostRepository from '../lib/repositories/post';

const generateOgImages = async () => {
  const posts = await PostRepository.list();

  for (const post of posts) {
    if (fs.existsSync(`public/og-images/${post.slug}.png`)) continue;
    await takeScreenshot({ title: post.title, slug: post.slug });
  }
};

generateOgImages();

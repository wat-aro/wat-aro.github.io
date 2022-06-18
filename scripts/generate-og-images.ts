import fs from 'fs';
import { takeScreenshot } from '../lib/ogimage/takeScreenShot';
import PostRepository from '../lib/repositories/post';

const generateOgImages = async () => {
  const posts = await PostRepository.list();

  Promise.all(
    posts
      .filter((post) => !fs.existsSync(`public/og-images/${post.slug}.png`))
      .map((post) => {
        takeScreenshot({ title: post.title, slug: post.slug });
      })
  );
};

generateOgImages();

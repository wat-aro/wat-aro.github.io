import PostRepository from '../lib/repositories/post';
import { takeScreenshot } from '../lib/ogimage/takeScreenShot';

const generateOgImages = async () => {
  const start = process.argv[2];
  const end = process.argv[3];

  const posts = await PostRepository.list();

  for (const post of posts.slice(Number(start), Number(end))) {
    await takeScreenshot({ title: post.title, slug: post.slug });
  }
};

generateOgImages();
